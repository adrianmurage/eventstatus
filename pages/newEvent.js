import { useState } from 'react';

export default function NewEvent() {
  const [formSubmissionProgress, setFormSubmissionProgress] = useState({
    activeForm: 1,
    activeSessionSubmission: 0,
  });
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventLocation: '',
    eventDate: '',
    eventStartTime: '',
    eventEndTime: '',
  });
  const [sessionsDetailsArray, setSessionsDetailsArray] = useState([]);

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
        />
      </div>
    </>
  );
}

function getCurrentDate() {
  const date = new Date();
  const ISODate = date.toISOString().substring(0, 10);

  return ISODate;
}

function EventDetailsForm({
  formSubmissionProgress,
  setFormSubmissionProgress,
  eventDetails,
  setEventDetails,
}) {
  if (formSubmissionProgress.activeForm !== 0) return;

  return (
    <>
      <p>Let's start with general details about your event</p>

      <div className="divider"></div>

      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();

          let newFormSubmissionProgress = {
            ...formSubmissionProgress,
            activeForm: 1,
          };
          setFormSubmissionProgress(newFormSubmissionProgress);
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
            value={eventDetails.eventName}
            onChange={(event) => {
              let newEventDetails = {
                ...eventDetails,
                eventName: event.target.value,
              };
              setEventDetails(newEventDetails);
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
            value={eventDetails.eventLocation}
            onChange={(event) => {
              let newEventDetails = {
                ...eventDetails,
                eventLocation: event.target.value,
              };
              setEventDetails(newEventDetails);
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
            value={eventDetails.eventDate}
            onChange={(event) => {
              let newEventDetails = {
                ...eventDetails,
                eventDate: event.target.value,
              };

              setEventDetails(newEventDetails);
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
            value={eventDetails.eventStartTime}
            onChange={(event) => {
              let newEventDetails = {
                ...eventDetails,
                eventStartTime: event.target.value,
              };
              setEventDetails(newEventDetails);
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
            value={eventDetails.eventEndTime}
            onChange={(event) => {
              let newEventDetails = {
                ...eventDetails,
                eventEndTime: event.target.value,
              };
              setEventDetails(newEventDetails);
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

function SessionDetailsForm({
  formSubmissionProgress,
  setFormSubmissionProgress,
  sessionsDetailsArray,
  setSessionsDetailsArray,
}) {
  const [sessionName, setSessionName] = useState('');
  const [sessionStartTime, setSessionStartTime] = useState('');
  const [sessionEndTime, setSessionEndTime] = useState('');
  const [sessionSlidesLink, setSessionSlidesLink] = useState('');

  const [speakerName, setSpeakerName] = useState('');
  const [speakerTitle, setSpeakerTitle] = useState('');
  const [speakerLinkedIn, setSpeakerLinkedIn] = useState('');
  const [speakerTwitter, setSpeakerTwitter] = useState('');

  const [speakersList, setSpeakersList] = useState([]);

  if (formSubmissionProgress.activeForm !== 1) return;

  let currentSession = formSubmissionProgress.activeSessionSubmission;

  return (
    <>
      <p>Great, we have an event! Let's add sessions to your event.</p>
      <div className="divider"></div>
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          console.log(event.submitter);

          console.log('submitted');
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

        {/* Open the modal using ID.showModal() method */}
        <button className="btn" onClick={() => window.my_modal_1.showModal()}>
          Add a speaker
        </button>
        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Add a speaker</h3>
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
                <span className="label-text">
                  What is the speaker's job title?
                </span>
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
                <span className="label-text">
                  What is the speaker's LinkedIn?
                </span>
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
                <span className="label-text">
                  What is the speaker's Twitter?
                </span>
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

            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                type="button"
                onClick={() => window.my_modal_1.close()}
                className="btn"
              >
                Close
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </dialog>

        <button
          type="button"
          value="add another session"
          className="btn capitalize btn-outline"
          onClick={() => {
            let newSessionsDetailsArray = [...sessionsDetailsArray];

            newSessionsDetailsArray[currentSession] = {
              sessionName: sessionName,
              speakerName: speakerName,
            };

            setSessionsDetailsArray(newSessionsDetailsArray);
            // update which session we're on
            let updatedSessionNumber =
              formSubmissionProgress.activeSessionSubmission + 1;

            let newFormSubmissionProgress = {
              ...formSubmissionProgress,
              activeSessionSubmission: updatedSessionNumber,
            };

            setFormSubmissionProgress(newFormSubmissionProgress);

            setSessionName('');
            setSpeakerName('');

            // collect the session details into an object
            // add the session details to global state
            // clear the local state of the form inputs
          }}
        >
          <span className="text-2xl"> &#43;</span>
          Add another session
        </button>

        <div className="form-control space-y-6 pb-10 pt-5 ">
          {/* <button
            type="button"
            className="btn capitalize"
            onClick={() => {
              if (formSubmissionProgress.activeSessionSubmission === 0) {
                let newFormSubmissionProgress = {
                  ...formSubmissionProgress,
                  activeForm: 0,
                };
                setFormSubmissionProgress(newFormSubmissionProgress);
              }
            }}
          >
            Back
          </button> */}
          <button type="submit" value="finish" className="btn capitalize">
            Finish
          </button>
        </div>
      </form>
    </>
  );
}
