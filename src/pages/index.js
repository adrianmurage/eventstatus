import Link from 'next/link';
import { databases, databaseID, eventCollectionID } from '../utils/appwrite';
import EventCard from '../components/EventCard/EventCard';

export default function Home({ eventList }) {
  console.log(eventList);
  return (
    <>
      <Link href="/newEvent">
        <button className="btn">New Event</button>
      </Link>
      <div className="space-y-4">
        {eventList.map((singleEvent) => (
          <EventCard key={singleEvent.$id} eventName={singleEvent.name} />
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const results = await databases.listDocuments(
      databaseID,
      eventCollectionID
    );

    const eventList = results.documents;

    return { props: { eventList } };
  } catch (error) {
    const eventList = error.message;

    return { props: { eventList } };
  }
};
