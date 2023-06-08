import { Client, Databases } from "appwrite";
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("647b927f416135cd4ef0"); // Your project ID

const databases = new Databases(client);

export default async (req, res) => {
  const payload = JSON.parse(req.body || null);
  const { id, data } = payload;
  const databaseID = process.env.APPWRITE_DATABASE_ID;
  const sessionCollectionId = process.env.SESSION_COLLECTION_ID;
  const eventCollectionID = process.env.EVENT_COLLECTION_ID;

  if (req.method.toUpperCase() == "GET") {
    const { sessionId, eventId } = req.query;

    try {
      // If id is specified in query param, return the document associated with that id
      if (sessionId) {
        const document = await databases.getDocument(
          databaseID,
          sessionCollectionId,
          sessionId
        );
        return res.status(200).json({
          data: document,
          error: null,
        });
      }
      // Else return all documents for that event
      if (eventId) {
        const event = await databases.getDocument(
          databaseID,
          eventCollectionID,
          eventId
        );
        const sessions = event.sessions;

        // Get all the sessions for that event
        const promises = sessions.map((id) => {
          return databases
            .getDocument(databaseID, sessionCollectionId, id)
            .then((session) => {
              if (session.speakers && session.speakers.length > 0) {
                const speakerPromises = session.speakers.map((speakerId) =>
                  databases.getDocument(
                    databaseID,
                    "647e14be764849dc8128",
                    speakerId
                  )
                );
                return Promise.all(speakerPromises).then((speakers) => {
                  session.speakers = speakers;
                  return session;
                });
              } else {
                return session;
              }
            })
            .catch((error) => {
              console.log(error);
              return [];
            });
        });

        const documents = await Promise.all(promises);

        return res.status(200).json({ data: documents, error: null });
      }
      res.status(400).json({
        data: null,
        error: "Either event ID or session ID must be provided",
      });
      return;
    } catch (error) {
      res.status(500).json({
        data: null,
        error: error.message,
      });
    }
  }

  if (req.method.toUpperCase() == "PATCH") {
    try {
      // Update session

      await databases.updateDocument(databaseID, sessionCollectionId, id, data);

      res.status(201).json({ success: true, message: "Updated!" });
    } catch (error) {
      res.status(401).json({ success: false, error: error.toString() });
    }
  }
};
