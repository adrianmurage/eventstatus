import { Client, Databases, ID, Query } from "appwrite";
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("647b927f416135cd4ef0"); // Your project ID

const databases = new Databases(client);

export default async (req, res) => {
  const databaseID = process.env.APPWRITE_DATABASE_ID;
  const eventCollectionID = process.env.EVENT_COLLECTION_ID;
  const sessionCollectionId = process.env.SESSION_COLLECTION_ID;
  if (req.method.toUpperCase() == "GET") {
    const { id } = req.query;
    try {
      // If id is pecified in query param, return the document associated with that id
      if (id) {
        const document = await databases.getDocument(
          databaseID,
          eventCollectionID,
          id
        );
        return res.status(200).json({
          data: document,
          error: null,
        });
      }
      // Else return all documents
      const results = await databases.listDocuments(
        databaseID,
        eventCollectionID
      );
      res.status(200).json({
        data: results.documents,
        error: null,
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        error: error.message,
      });
    }
  }

  if (req.method.toUpperCase() == "POST") {
    const payload = JSON.parse(req.body || null);
    if (!payload) {
      return res.status(401).json({
        success: false,
        error: "Invalid data. Exoected event and session data.",
      });
    }
    const { eventData, sessionData } = payload;
    if (!eventData || !sessionData) {
      return res.status(401).json({
        success: false,
        error: "Invalid data. Expected event and session data.",
      });
    }
    try {
      // Create event
      const event = await databases.createDocument(
        databaseID,
        eventCollectionID,
        ID.unique(),
        eventData
      );
      if (event.error) throw Error(event.error);
      // // Create session
      for (const session of sessionData) {
        session.eventId = event.$id; // Add the event ID to each session
        await databases.createDocument(
          databaseID,
          sessionCollectionId,
          ID.unique(),
          session
        );
      }

      res.status(201).json({ success: true, error: null });
    } catch (error) {
      res.status(401).json({ success: false, error: error.toString() });
    }
  }

  if (req.method.toUpperCase() == "PATCH") {
    const payload = JSON.parse(req.body || null);
    const { id, data } = payload;
    if (!id || !data)
      return res
        .status(401)
        .json({ success: false, error: "Missing event ID and update data" });

    try {
      // Update event
      await databases.updateDocument(databaseID, eventCollectionID, id, data);
      res.status(201).json({ success: true, error: null });
    } catch (error) {
      res.status(401).json({ success: false, error: error.toString() });
    }
  }

  // Delete endpoint
  if (req.method.toUpperCase() == "DELETE") {
    const { eventId } = req.query;
    try {
      await databases.deleteDocument(databaseID, eventCollectionID, eventId);
      // delete sessions associated with the event
      const sessions = await databases.listDocuments(
        databaseID,
        sessionCollectionId,
        [Query.equal("eventId", [eventId])]
      );
      if (sessions) {
        const promises = sessions.documents.map(async (doc) => {
          return await databases.deleteDocument(
            databaseID,
            sessionCollectionId,
            doc.$id
          );
        });
        Promise.all(promises);
      }

      res.status(200).json({ success: true, error: null });
    } catch (error) {
      res.status(500).json({ success: false, error: error.toString() });
    }
  }
};
