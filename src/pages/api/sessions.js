import { Client, Databases, Query } from 'appwrite';
const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('647b927f416135cd4ef0'); // Your project ID

const databases = new Databases(client);

export default async (req, res) => {
  const databaseID = process.env.APPWRITE_DATABASE_ID;
  const sessionCollectionId = process.env.SESSION_COLLECTION_ID;

  if (req.method.toUpperCase() == 'GET') {
    const { sessionId, eventId } = req.query;
    try {
      // If id is specified in query param, return the document associated with that id
      if (sessionId) {
        const session = await databases.getDocument(
          databaseID,
          sessionCollectionId,
          sessionId
        );
        return res.status(200).json({
          data: session,
          error: null,
        });
      }
      // Else return all documents for that event
      if (eventId) {
        const { documents } = await databases.listDocuments(
          databaseID,
          sessionCollectionId,
          [Query.equal('eventId', eventId)]
        );

        return res.status(200).json({ data: documents, error: null });
      }
      res.status(400).json({
        data: null,
        error: 'Either event ID or session ID must be provided',
      });
      return;
    } catch (error) {
      res.status(500).json({
        data: null,
        error: error.message,
      });
    }
  }

  if (req.method.toUpperCase() == 'PATCH') {
    const payload = req.body;
    const { data, sessionId } = payload;
    try {
      // Update session

      await databases.updateDocument(
        databaseID,
        sessionCollectionId,
        sessionId,
        data
      );

      res.status(201).json({ success: true, message: 'Updated!' });
    } catch (error) {
      res.status(401).json({ success: false, error: error.toString() });
    }
  }
  if (req.method.toUpperCase() == 'DELETE') {
    const { sessionId } = req.query;
    try {
      // Delete session document from session collection
      await databases.deleteDocument(
        databaseID,
        sessionCollectionId,
        sessionId
      );
      res.status(200).json({ success: true, message: 'Deleted!' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.toString() });
    }
  }
};
