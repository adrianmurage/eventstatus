import React from 'react';
import { useState } from 'react';
import { getISODateTime } from '../../utils';

function SessionDetailsForm({
  formSubmissionProgress,
  setFormSubmissionProgress,
  sessionsDetailsArray,
  setSessionsDetailsArray,
  handleNewEventSubmit,
  eventDate,
}) {
  const [sessionName, setSessionName] = useState('');
  const [sessionStartTime, setSessionStartTime] = useState('');
  const [sessionEndTime, setSessionEndTime] = useState('');
  const [sessionSlidesLink, setSessionSlidesLink] = useState('');
  const [sessionVenue, setSessionVenue] = useState('');

  const [speakerName, setSpeakerName] = useState('');
  const [speakerTitle, setSpeakerTitle] = useState('');
  const [speakerLinkedIn, setSpeakerLinkedIn] = useState('');
  const [speakerTwitter, setSpeakerTwitter] = useState('');

  if (formSubmissionProgress.activeForm !== 1) return;

  let currentSession = formSubmissionProgress.activeSessionSubmission;

  function addGuessToGlobalState() {
    let newSessionsDetailsArray = [...sessionsDetailsArray];

    // collect the session details into an object
    newSessionsDetailsArray[currentSession] = {
      name: sessionName,
      venue: sessionVenue,
      startTime: getISODateTime(eventDate,sessionStartTime),
      endTime: getISODateTime(eventDate, sessionEndTime),
      resourceLink: sessionSlidesLink,
      speakerName: speakerName,
      speakerTitle: speakerTitle,
      speakerLinkedIn: speakerLinkedIn,
      speakerTwitter: speakerTwitter,
    };

    // add the session details to global state
    setSessionsDetailsArray(newSessionsDetailsArray);
  }

  function handleSubmit() {
    let currentSessionInfo = {
      name: sessionName,
      startTime: getISODateTime(eventDate,sessionStartTime),
      endTime: getISODateTime(eventDate, sessionEndTime),
      venue: sessionVenue,
      sessionSlidesLink: sessionSlidesLink,
      speakerName: speakerName,
      speakerTitle: speakerTitle,
      speakerLinkedIn: speakerLinkedIn,
      speakerTwitter: speakerTwitter,
    };

    handleNewEventSubmit(currentSessionInfo);
  }

  return (
    <>
      <p>Great, we have an event! Let's add sessions to your event.</p>
      <div className="divider"></div>
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <h2 className="font-bold">General Session Information</h2>

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
              What time does the session start?
            </span>
          </label>
          <input
            required
            type="time"
            className="input input-bordered w-full max-w-xs"
            value={sessionStartTime}
            onChange={(event) => {
              setSessionStartTime(event.target.value);
            }}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What time does the session end?</span>
          </label>
          <input
            required
            type="time"
            className="input input-bordered w-full max-w-xs"
            value={sessionEndTime}
            onChange={(event) => {
              setSessionEndTime(event.target.value);
            }}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Where is the session being held?</span>
          </label>
          <input
            required
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={sessionVenue}
            onChange={(event) => {
              setSessionVenue(event.target.value);
            }}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">
              Where can attendees find the slides for the session?
            </span>
          </label>
          <input
            required
            type="url"
            className="input input-bordered w-full max-w-xs"
            value={sessionSlidesLink}
            onChange={(event) => {
              setSessionSlidesLink(event.target.value);
            }}
          />
          <label className="label">
            <span className="label-text-alt text-accent-content">
              * Make sure the slides are publicly viewable
            </span>
          </label>
        </div>

        <h2 className="font-bold">Speaker Information</h2>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What is the speaker's name?</span>
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

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What is the speaker's job title?</span>
          </label>
          <input
            required
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={speakerTitle}
            onChange={(event) => {
              setSpeakerTitle(event.target.value);
            }}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What is the speaker's LinkedIn?</span>
          </label>
          <input
            required
            type="url"
            className="input input-bordered w-full max-w-xs"
            value={speakerLinkedIn}
            onChange={(event) => {
              setSpeakerLinkedIn(event.target.value);
            }}
          />
          <label className="label">
            <span className="label-text-alt text-accent-content">
              * use the full url: "https://www.linkedin.com/in/username/"
            </span>
          </label>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What is the speaker's Twitter?</span>
          </label>
          <input
            required
            type="url"
            className="input input-bordered w-full max-w-xs"
            value={speakerTwitter}
            onChange={(event) => {
              setSpeakerTwitter(event.target.value);
            }}
          />
          <label className="label">
            <span className="label-text-alt text-accent-content">
              * use the full url: "https://twitter.com/username"
            </span>
          </label>
        </div>

        <button
          type="button"
          value="add another session"
          className="btn capitalize btn-outline"
          onClick={() => {
            addGuessToGlobalState();

            // update which session we're on
            let updatedSessionNumber =
              formSubmissionProgress.activeSessionSubmission + 1;

            let newFormSubmissionProgress = {
              ...formSubmissionProgress,
              activeSessionSubmission: updatedSessionNumber,
            };

            setFormSubmissionProgress(newFormSubmissionProgress);

            // clear the local state of the form inputs
            setSessionName('');
            setSessionStartTime('');
            setSessionEndTime('');
            setSessionSlidesLink('');
            setSpeakerName('');
            setSpeakerTitle('');
            setSpeakerLinkedIn('');
            setSpeakerTwitter('');
          }}
        >
          <span className="text-2xl"> &#43;</span>
          Add another session
        </button>

        <div className="form-control space-y-6 pb-10 pt-5 ">
          <button type="submit" value="finish" className="btn capitalize">
            Finish
          </button>
        </div>
      </form>
    </>
  );
}

export default SessionDetailsForm;
