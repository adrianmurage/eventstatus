import { formatDateForInput } from '@/utils/utils';
import { getISODateTime } from '@/utils/utils';
import { formatTimeForInput } from '@/utils/utils';
import React, { useState } from 'react';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';

function EditSessionForm({ sessionDetails}) {
  const [eventDate, setEventDate] = useState(
    formatDateForInput(sessionDetails.startTime)
  );
  const [sessionData, setSessionData] = useState({
    name: sessionDetails.name,
    startTime: formatTimeForInput(sessionDetails.startTime),
    endTime: formatTimeForInput(sessionDetails.endTime),
    venue: sessionDetails.venue,
    resourceLink: sessionDetails.resourceLink,
    speakerName: sessionDetails.speakerName,
    speakerTitle: sessionDetails.speakerTitle,
    speakerLinkedin: sessionDetails.speakerLinkedin,
    speakerTwitter: sessionDetails.speakerTwitter,
  });

  const [status, setStatus] = useState('idle');

  const router = useRouter();

  async function handleSubmit(event) {
    setStatus('loading');
    event.preventDefault();

    let payload = {
      data: {
        name: sessionData.name,
        startTime: getISODateTime(eventDate, sessionData.startTime),
        endTime: getISODateTime(eventDate, sessionData.endTime),
        venue: sessionData.venue,
        resourceLink: sessionData.resourceLink,
        speakerName: sessionData.speakerName,
        speakerTitle: sessionData.speakerTitle,
        speakerLinkedin: sessionData.speakerLinkedin,
        speakerTwitter: sessionData.speakerTwitter,
      },
      sessionId: sessionDetails.$id,
    };

    const endpoint = '../../api/sessions';

    const JSONData = JSON.stringify(payload);
    console.log({ payload });
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONData,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
    console.log(result);
  }
  if (status === 'success') {
    return (
      <>
        <form
          method="dialog"
          className="modal-box flex  flex-col items-center	"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="flex space-x-2 items-center mb-4">
            <p className="">Changes Saved</p>
            <CheckCircledIcon />
          </div>
          <button
            type="button"
            className="btn capitalize btn-primary text-white"
            onClick={() => {
              router.reload();
            }}
          >
            Ok
          </button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </>
    );
  }
  return (
    <>
      <form
        method="dialog"
        className="modal-box"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <h2 className="font-bold text-lg">Edit Session</h2>
        <div className="modal-action flex flex-col justify-center">
          <h3 className="font-bold"> Session Information</h3>
          <div className="flex flex-col justify-center">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Session Name</span>
              </label>
              <input
                required
                disabled={status === 'loading'}
                type="text"
                className="input input-bordered w-full max-w-lg"
                value={sessionData.name}
                onChange={(event) => {
                  let newSessionData = {
                    ...sessionData,
                    name: event.target.value,
                  };
                  setSessionData(newSessionData);
                }}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Start Time</span>
              </label>
              <input
                required
                disabled={status === 'loading'}
                type="time"
                className="input input-bordered w-full max-w-lg"
                value={sessionData.startTime}
                onChange={(event) => {
                  let newSessionData = {
                    ...sessionData,
                    startTime: event.target.value,
                  };
                  setSessionData(newSessionData);
                }}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">End Time</span>
              </label>
              <input
                required
                disabled={status === 'loading'}
                type="time"
                className="input input-bordered w-full max-w-lg"
                value={sessionData.endTime}
                onChange={(event) => {
                  let newSessionData = {
                    ...sessionData,
                    endTime: event.target.value,
                  };
                  setSessionData(newSessionData);
                }}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Session Venue</span>
              </label>
              <input
                required
                disabled={status === 'loading'}
                type="text"
                className="input input-bordered w-full max-w-lg"
                value={sessionData.venue}
                onChange={(event) => {
                  let newSessionData = {
                    ...sessionData,
                    venue: event.target.value,
                  };
                  setSessionData(newSessionData);
                }}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Link to slides/resources</span>
              </label>
              <input
                required
                disabled={status === 'loading'}
                type="url"
                className="input input-bordered w-full max-w-lg"
                value={sessionData.resourceLink}
                onChange={(event) => {
                  let newSessionData = {
                    ...sessionData,
                    resourceLink: event.target.value,
                  };
                  setSessionData(newSessionData);
                }}
              />
              <label className="label">
                <span className="label-text-alt text-accent-content">
                  * Make sure the slides/resources are publicly viewable
                </span>
              </label>
            </div>

            <h3 className="font-bold"> Speaker Information</h3>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Speaker Name</span>
              </label>
              <input
                required
                disabled={status === 'loading'}
                type="text"
                className="input input-bordered w-full max-w-lg"
                value={sessionData.speakerName}
                onChange={(event) => {
                  let newSessionData = {
                    ...sessionData,
                    speakerName: event.target.value,
                  };
                  setSessionData(newSessionData);
                }}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Speaker's Job Title</span>
              </label>
              <input
                required
                disabled={status === 'loading'}
                type="text"
                className="input input-bordered w-full max-w-lg"
                value={sessionData.speakerTitle}
                onChange={(event) => {
                  let newSessionData = {
                    ...sessionData,
                    speakerTitle: event.target.value,
                  };
                  setSessionData(newSessionData);
                }}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Speaker's LinkedIn</span>
              </label>
              <input
                required
                disabled={status === 'loading'}
                type="url"
                className="input input-bordered w-full max-w-lg"
                value={sessionData.speakerLinkedin}
                onChange={(event) => {
                  let newSessionData = {
                    ...sessionData,
                    speakerLinkedin: event.target.value,
                  };
                  setSessionData(newSessionData);
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
                <span className="label-text">Speaker's Twitter</span>
              </label>
              <input
                required
                disabled={status === 'loading'}
                type="url"
                className="input input-bordered w-full max-w-lg"
                value={sessionData.speakerTwitter}
                onChange={(event) => {
                  let newSessionData = {
                    ...sessionData,
                    speakerTwitter: event.target.value,
                  };

                  setSessionData(newSessionData);
                }}
              />
              <label className="label">
                <span className="label-text-alt text-accent-content">
                  * use the full url: "https://twitter.com/username"
                </span>
              </label>
            </div>
            <div className="form-control space-y-6 pb-10 pt-5">
              <button
                disabled={status === 'loading'}
                type="button"
                className="btn capitalize btn-outline"
                onClick={() => {
                  window.window[
                    `edit_session_${sessionDetails.$id}_modal`
                  ].close();
                }}
              >
                Cancel
              </button>
              {status === 'idle' && (
                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className="btn capitalize btn-primary text-white"
                >
                  Save
                </button>
              )}
              {status === 'loading' && (
                <button
                  className="btn capitalize btn-primary text-white"
                  disabled={status === 'loading'}
                >
                  <span className="loading loading-spinner"></span>
                  Saving
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  );
}

export default EditSessionForm;
