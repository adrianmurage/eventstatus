import { useState } from 'react';

export default function NewEvent() {
  return (
    <>
      <div className="container max-w-xs mx-auto pt-6">
        {/* <EventDetailsForm /> */}
        <SessionDetailsForm />
      </div>
    </>
  );
}

function getCurrentDate() {
  const date = new Date();
  const ISODate = date.toISOString().substring(0, 10);

  return ISODate;
}

function SessionDetailsForm() {
  const [sessionName, setSessionName] = useState('');
  const [speakerName, setSpeakerName] = useState('');

  return (
    <>
      <p>Great, we have an event! Let's add sessions to your event.</p>
      <div className="divider"></div>
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">
              What is the name of this session?
            </span>
          </label>
          <input
            required
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={sessionName}
            onChange={(event) => {
              setSessionName(event.target.value);
            }}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">
              What is the name of the speaker for this session?
            </span>
          </label>
          <input
            required
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={speakerName}
            onChange={(event) => {
              setSpeakerName(event.target.value);
            }}
          />
        </div>
        <button type="button" className="btn capitalize btn-outline">
          <span className="text-2xl"> &#43;</span>
          Add another session
        </button>

        <div className="form-control space-y-6 pb-10 pt-5 ">
          <button type="button" className="btn capitalize">
            Back
          </button>
          <button type="submit" className="btn capitalize">
            Finish
          </button>
        </div>
      </form>
    </>
  );
}

function EventDetailsForm() {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');

  return (
    <>
      <p>Let's start with general details about your event</p>

      <div className="divider"></div>

      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What is the name of your event?</span>
          </label>
          <input
            required
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={eventName}
            onChange={(event) => {
              setEventName(event.target.value);
            }}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">
              Where will you be holding your event?
            </span>
          </label>
          <input
            required
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={eventLocation}
            onChange={(event) => {
              setEventLocation(event.target.value);
            }}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">
              What date will your event be held
            </span>
          </label>
          <input
            required
            type="date"
            className="input input-bordered w-full max-w-xs"
            min={getCurrentDate()}
            value={eventDate}
            onChange={(event) => {
              setEventDate(event.target.value);
            }}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What time does your event start?</span>
          </label>
          <input
            required
            type="time"
            className="input input-bordered w-full max-w-xs"
            value={eventStartTime}
            onChange={(event) => {
              setEventStartTime(event.target.value);
            }}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What time does your event end?</span>
          </label>
          <input
            required
            type="time"
            className="input input-bordered w-full max-w-xs"
            value={eventEndTime}
            onChange={(event) => {
              setEventEndTime(event.target.value);
            }}
          />
        </div>

        <div className="form-control space-y-6 pb-10 pt-5">
          <button type="button" className="btn capitalize">
            Cancel
          </button>
          <button type="submit" className="btn capitalize">
            Next
          </button>
        </div>
      </form>
    </>
  );
}
