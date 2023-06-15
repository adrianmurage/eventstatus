import EventDetailsHeader from '@/components/EventDetailsHeader/EventDetailsHeader';
import Header from '@/components/Header/Header';
import SessionList from '@/components/SessionList/SessionList';
import { Query } from 'appwrite';
import {
  databaseID,
  databases,
  eventCollectionID,
  sessionCollectionID,
} from '../../utils/appwrite';

export default function EventPage({ eventId, eventData, sessionData }) {
  return (
    <>
      <Header />
      <EventDetailsHeader eventDetails={eventData} />
      <SessionList eventData={eventData} sessionList={sessionData.documents} />
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { eventID } = params;

  const eventData = await databases.getDocument(
    databaseID,
    eventCollectionID,
    eventID
  );

  const sessionData = await databases.listDocuments(
    databaseID,
    sessionCollectionID,
    [Query.equal('eventId', eventID)]
  );

  return {
    props: {
      eventID,
      eventData,
      sessionData,
    },
  };
};
