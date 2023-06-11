import {
  Query,
  databaseID,
  databases,
  eventCollectionID,
  sessionCollectionID,
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
