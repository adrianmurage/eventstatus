import {
  ID,
  Query,
  bucketId,
  databaseID,
  databases,
  eventCollectionID,
  projectId,
  sessionCollectionID,
  storage,
} from "./appwrite";

export const getAllEvents = async () => {
  const { documents } = await databases.listDocuments(
    databaseID,
    eventCollectionID
  );
  return documents;
};

export const getEvent = async (eventId) => {
  const document = await databases.getDocument(
    databaseID,
    eventCollectionID,
    eventId
  );
  return document;
};
export const getAllSessionsInEvent = async (eventId) => {
  const { documents } = await databases.listDocuments(
    databaseID,
    sessionCollectionID,
    [Query.equal("eventId", eventId)]
  );

  return documents;
};

export const uploadImageToBucket = async (file) => {
  try {
    const response = await storage.createFile(bucketId, ID.unique(), file);
    const url = `https://cloud.appwrite.io/v1/storage/buckets/${response.bucketId}/files/${response.$id}/view?project=${projectId}`;
    return url;
  } catch (error) {
    return null;
  }
};
