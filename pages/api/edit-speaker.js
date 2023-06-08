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
  const speakerCollectionId = process.env.SPEAKER_COLLECTION_ID;

  if (req.method.toUpperCase() == "GET") {
    const { id } = req.query;
    try {
      // If id is pecified in query param, return the document associated with that id
      if (id) {
        const document = await databases.getDocument(
          databaseID,
          speakerCollectionId,
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
        speakerCollectionId
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

  if (req.method.toUpperCase() == "PATCH") {
    try {
      // Update event

      await databases.updateDocument(databaseID, speakerCollectionId, id, data);

      res.status(201).json({ success: true, message: "Updated!" });
    } catch (error) {
      res.status(401).json({ success: false, error: error.toString() });
    }
  }
};
