import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import EventsList from '@/components/EventsList/EventsList';
import Header from '@/components/Header/Header';
import { UseUser } from '@/hooks/User';
import { useRouter } from 'next/router';
import { databaseID, databases, eventCollectionID } from '../utils/appwrite';

export default function Home({ eventList }) {
  const { user, loading } = UseUser();
  const router = useRouter();
  if (loading) return;
  // Redirect unauthenticated users to signin page
  if (!loading && !user) {
    router.push('/');
    return;
  }
  return (
    <>
      <Header />
      <DashboardHeader />
      <EventsList eventList={eventList} />
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
