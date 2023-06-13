import EventDetailsHeader from '@/components/EventDetailsHeader/EventDetailsHeader';
import Header from '@/components/Header/Header';
import { Query } from 'appwrite';
import {
  databaseID,
  databases,
  eventCollectionID,
  sessionCollectionID,
} from '../../utils/appwrite';
import SessionList from '@/components/SessionList/SessionList';

export default function EventPage({ eventId, eventData, sessionData }) {
  const { date, startTime, endTime, venue } = eventData;

  const timeOptions = { hour: 'numeric', minute: 'numeric' };

  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

  const relevantData = {
    date: new Date(date).toLocaleDateString(undefined, dateOptions),
    startTime: new Date(startTime).toLocaleTimeString(undefined, timeOptions),
    endTime: new Date(endTime).toLocaleTimeString(undefined, timeOptions),
    venue,
  };

  return (
    <>
      <Header />
      <EventDetailsHeader eventDetails={eventData} />
      <SessionList sessionList={sessionData.documents} />
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
