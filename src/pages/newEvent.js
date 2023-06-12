import { UseUser } from '@/hooks/User';
import { useRouter } from 'next/router';
import { useState } from 'react';
import EventDetailsForm from '../components/EventDetailsForm/EventDetailsForm';
import SessionDetailsForm from '../components/SessionDetailsForm/SessionDetailsForm';
import { getISODateTime } from '../utils/utils';

export default function NewEvent() {
  const [formSubmissionProgress, setFormSubmissionProgress] = useState({
    activeForm: 0,
    activeSessionSubmission: 0,
  });
  const [eventDetails, setEventDetails] = useState({
    eventName: 'micro conf',
    eventLocation: 'nairobi',
    eventDate: '2023-12-12',
    eventStartTime: '08:00',
    eventEndTime: '18:00',
  });
  const [sessionsDetailsArray, setSessionsDetailsArray] = useState([]);

  async function handleNewEventSubmit(currentSessionInfo) {
    let eventInfo = {
      eventData: {
        name: eventDetails.eventName,
        venue: eventDetails.eventLocation,
        date: getISODateTime(eventDetails.eventDate),
        startTime: getISODateTime(
          eventDetails.eventDate,
          eventDetails.eventStartTime
        ),
        endTime: getISODateTime(
          eventDetails.eventDate,
          eventDetails.eventEndTime
        ),
      },
      sessionData: [...sessionsDetailsArray, currentSessionInfo],
    };
    console.log(eventInfo);

    const endpoint = 'api/events';

    const JSONData = JSON.stringify(eventInfo);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONData,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    return result;
  }

  return (
    <>
      <div className="container max-w-xs mx-auto pt-6">
        <EventDetailsForm
          formSubmissionProgress={formSubmissionProgress}
          setFormSubmissionProgress={setFormSubmissionProgress}
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
        />
        <SessionDetailsForm
          formSubmissionProgress={formSubmissionProgress}
          setFormSubmissionProgress={setFormSubmissionProgress}
          sessionsDetailsArray={sessionsDetailsArray}
          setSessionsDetailsArray={setSessionsDetailsArray}
          handleNewEventSubmit={handleNewEventSubmit}
          eventDate={eventDetails.eventDate}
        />
      </div>
    </>
  );
}
