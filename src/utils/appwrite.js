import { Account, Client, DB, Databases, ID, Query, Storage } from "appwrite";
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("647b927f416135cd4ef0"); // Your project ID

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);
const databaseID = process.env.APPWRITE_DATABASE_ID;
const eventCollectionID = process.env.EVENT_COLLECTION_ID;
const sessionCollectionID = process.env.SESSION_COLLECTION_ID;
const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

export {
  DB,
  ID,
  Query,
  account,
  bucketId,
  databaseID,
  databases,
  eventCollectionID,
  projectId,
  sessionCollectionID,
  storage,
};
