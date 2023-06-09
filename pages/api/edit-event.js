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
  const eventCollectionID = process.env.EVENT_COLLECTION_ID;

  try {
    // Update event

    await databases.updateDocument(databaseID, eventCollectionID, id, data);

    res.status(201).json({ success: true, message: "Updated!" });
  } catch (error) {
    res.status(401).json({ success: false, error: error.toString() });
  }
};
