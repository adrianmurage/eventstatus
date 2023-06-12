import { Query } from 'appwrite';
import {
  databaseID,
  databases,
  eventCollectionID,
  sessionCollectionID,
} from '../../utils/appwrite';
import EventCard from '../../components/EventCard/EventCard';
import EditEventForm from '../../components/EditEventForm/EditEventForm';
import { useState } from 'react';

export default function EventPage({ eventId, eventData, sessionData }) {
  console.log({ eventId });
  console.log({ eventData });
  console.log({ sessionData });

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
      <h2>{eventData.name}</h2>
      {Object.keys(relevantData).map((key) => (
        <div className="flex space-x-10 text-right" key={key}>
          <div className="text-right">{key} </div>
          <div>{relevantData[key]}</div>
        </div>
      ))}
      <button
        className="btn capitalize"
        onClick={() => window.edit_event_modal.showModal()}
      >
        Edit event
      </button>
      <dialog id="edit_event_modal" className="modal">
        <EditEventForm eventDetails={eventData} />
      </dialog>
      {sessionData.documents.map((session) => (
        <EventCard
          key={session.$id}
          eventName={session.name}
          eventLink={`/event/session/${session.$id}`}
        />
      ))}
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
