import { databaseID, databases, eventCollectionID } from '../../utils/appwrite';

export default function EventPage() {
  return <p>hi</p>;
}

export const getServerSidePaths = async () => {
  // return a list of possible paths for events
    const getAllEvents = async ()=>{

        const results = await databases.listDocuments(databaseID, eventCollectionID);
        const eventList = results.documents;
      
        return eventList.map((singleEvent) => {
          return {
            params: {
              id: singleEvent.$id,
            },
          };
        });
    }
};
export const getServerSideProps = async () => {
  // fetch necesarry data for the event using params.id
};
