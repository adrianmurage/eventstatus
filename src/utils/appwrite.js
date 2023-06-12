import { Account, Client, DB, Databases, ID, Query } from "appwrite";
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("647b927f416135cd4ef0"); // Your project ID

const databases = new Databases(client);
const account = new Account(client);
const databaseID = process.env.APPWRITE_DATABASE_ID;
const eventCollectionID = process.env.EVENT_COLLECTION_ID;
const sessionCollectionID = process.env.SESSION_COLLECTION_ID;

export {
  DB,
  ID,
  Query,
  account,
  databaseID,
  databases,
  eventCollectionID,
  sessionCollectionID,
};
