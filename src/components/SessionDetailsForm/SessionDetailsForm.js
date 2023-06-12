import React from 'react';
import { useState } from 'react';
import { getISODateTime } from '../../utils/utils';
import { useRouter } from 'next/router';

function SessionDetailsForm({
  formSubmissionProgress,
  setFormSubmissionProgress,
  sessionsDetailsArray,
  setSessionsDetailsArray,
  handleNewEventSubmit,
  eventDate,
}) {
  const [sessionName, setSessionName] = useState('Bootstrapping 101');
  const [sessionStartTime, setSessionStartTime] = useState('09:00');
  const [sessionEndTime, setSessionEndTime] = useState('10:00');
  const [sessionSlidesLink, setSessionSlidesLink] =
    useState('https://slides.com');
  const [sessionVenue, setSessionVenue] = useState('room 101');

  const [speakerName, setSpeakerName] = useState('Adrian Murage');
  const [speakerTitle, setSpeakerTitle] = useState('Founder 47 Places');
  const [speakerLinkedIn, setSpeakerLinkedIn] = useState(
    'https://linkedin.com'
  );
  const [speakerTwitter, setSpeakerTwitter] = useState('https://twitter.com');

  //idle  | loading | success | error
  const [status, setStatus] = useState('idle');

  const router = useRouter();

  const firstInputRef = React.useRef();

  if (formSubmissionProgress.activeForm !== 1) return;

  let currentSession = formSubmissionProgress.activeSessionSubmission;

  function addGuessToGlobalState() {
    let newSessionsDetailsArray = [...sessionsDetailsArray];

    // collect the session details into an object
    newSessionsDetailsArray[currentSession] = {
      name: sessionName,
      venue: sessionVenue,
      startTime:
        sessionStartTime === ''
          ? null
          : getISODateTime(eventDate, sessionStartTime),
      endTime:
        sessionEndTime === ''
          ? null
          : getISODateTime(eventDate, sessionEndTime),
      resourceLink: sessionSlidesLink,
      speakerName: speakerName,
      speakerTitle: speakerTitle,
      speakerLinkedin: speakerLinkedIn,
      speakerTwitter: speakerTwitter,
    };

    // add the session details to global state
    setSessionsDetailsArray(newSessionsDetailsArray);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    let currentSessionInfo = {
      name: sessionName,
      startTime: getISODateTime(eventDate, sessionStartTime),
      endTime: getISODateTime(eventDate, sessionEndTime),
      venue: sessionVenue,
      resourceLink: sessionSlidesLink,
      speakerName: speakerName,
      speakerTitle: speakerTitle,
      speakerLinkedin: speakerLinkedIn,
      speakerTwitter: speakerTwitter,
    };

    const result = await handleNewEventSubmit(currentSessionInfo);

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <>
        <p>Event Created!</p>
        <button
          onClick={() => {
            router.push('/');
          }}
          className="btn capitalize"
        >
          See my events
        </button>
      </>
    );
  }

  return (
    <>
      <p>Great, we have an event! Let's add sessions to your event.</p>
      <div className="divider"></div>
      <form
        className="space-y-6"
        onSubmit={(event) => {
          setStatus('loading');

          handleSubmit(event);
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
            ref={firstInputRef}
            required
            disabled={status === 'loading'}
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
            disabled={status === 'loading'}
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
            disabled={status === 'loading'}
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
            disabled={status === 'loading'}
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
            disabled={status === 'loading'}
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
            disabled={status === 'loading'}
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
            disabled={status === 'loading'}
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
            disabled={status === 'loading'}
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
            disabled={status === 'loading'}
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
          disabled={status === 'loading'}
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
            setSessionVenue('');

            //set the focus to the first input element
            firstInputRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest',
            });
            setTimeout(() => {
              firstInputRef.current.focus();
            }, 1000);
          }}
        >
          <span className="text-2xl"> &#43;</span>
          Add another session
        </button>

        <div className="form-control space-y-6 pb-10 pt-5 ">
          {status === 'idle' && (
            <button
              disabled={status === 'loading'}
              type="submit"
              className="btn capitalize"
            >
              Create Event
            </button>
          )}
          {status === 'loading' && (
            <button className="btn">
              <span className="loading loading-spinner"></span>
              Creating Event
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default SessionDetailsForm;
