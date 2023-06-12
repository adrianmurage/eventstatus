import Link from 'next/link';
import { databases, databaseID, eventCollectionID } from '../utils/appwrite';
import EventCard from '../components/EventCard/EventCard';
import LogOut from '@/components/LogOut/LogOut';
import { UseUser } from '@/hooks/User';
import { useRouter } from 'next/router';

export default function Home({ eventList }) {
  console.log(eventList);
  const { user, loading } = UseUser();
  const router = useRouter();
  if (loading) return;
  // Redirect unauthenticated users to signin page
  if (!loading && !user) {
    router.push('/auth/signin');
    return;
  }
  return (
    <>
      <LogOut />
      <Link href="/newEvent">
        <button className="btn">New Event</button>
      </Link>
      <div className="space-y-4">
        {eventList.map((singleEvent) => (
          <EventCard
            key={singleEvent.$id}
            eventName={singleEvent.name}
            eventLink={`/event/${singleEvent.$id}`}
          />
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
