import { Client, Databases, ID } from "appwrite";
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("647b927f416135cd4ef0"); // Your project ID

const databases = new Databases(client);

export default async (req, res) => {
  const payload = JSON.parse(req.body || null);
  const { eventData, sessionData } = payload;
  const databaseID = process.env.APPWRITE_DATABASE_ID;
  const eventCollectionID = process.env.EVENT_COLLECTION_ID;
  const sessionCollectionId = process.env.SESSION_COLLECTION_ID;

  try {
    // Create event
    const event = await databases.createDocument(
      databaseID,
      eventCollectionID,
      ID.unique(),
      eventData
    );
    if (event.error) throw Error(event.error);
    const sessionIds = [];
    // // Create session
    for (const session of sessionData) {
      session.eventId = event.$id; // Add the event ID to each session
      const sessionDoc = await databases.createDocument(
        databaseID,
        sessionCollectionId,
        ID.unique(),
        session
      );
      sessionIds.push(sessionDoc.$id); // Add session ID to the array (to be added to the event collection to denormalize it)
    }

    await databases.updateDocument(
      event.$databaseId,
      event.$collectionId,
      event.$id,
      {
        sessions: sessionIds,
      }
    );

    res
      .status(201)
      .json({ success: true, message: "Event created successfully" });
  } catch (error) {
    res.status(401).json({ success: false, error: error.toString() });
  }
};
