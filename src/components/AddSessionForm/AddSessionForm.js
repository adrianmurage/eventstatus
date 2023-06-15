import { formatDateForInput, getISODateTime } from '@/utils/utils';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';
import { useState } from 'react';

function AddSessionForm({ eventData }) {
  const [sessionDetails, setSessionDetails] = useState({
    name: '',
    startTime: '',
    endTime: '',
    venue: '',
    resourceLink: '',
    speakerName: '',
    speakerTitle: '',
    speakerLinkedin: '',
    speakerTwitter: '',
  });
  const [eventDate, setEventDate] = useState(
    formatDateForInput(eventData.date)
  );
  const [status, setStatus] = useState('idle');
  const router = useRouter();

  async function handleSubmit(event) {
    // setStatus('loading');
    event.preventDefault();

    let payload = {
      sessionData: {
        name: sessionDetails.name,
        startTime: getISODateTime(eventDate, sessionDetails.startTime),
        endTime: getISODateTime(eventDate, sessionDetails.endTime),
        venue: sessionDetails.venue,
        resourceLink: sessionDetails.resourceLink,
        speakerName: sessionDetails.speakerName,
        speakerTitle: sessionDetails.speakerTitle,
        speakerLinkedin: sessionDetails.speakerLinkedin,
        speakerTwitter: sessionDetails.speakerTwitter,
      },
      eventId: eventData.$id,
    };

    console.log({payload})

    const endpoint = '../api/sessions';

    const JSONData = JSON.stringify(payload);
    console.log({ payload });
    const options = {
      method: 'POST',
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
        <h2 className="font-bold text-lg">Add New Session</h2>
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
                value={sessionDetails.name}
                onChange={(event) => {
                  let newSessionDetails = {
                    ...sessionDetails,
                    name: event.target.value,
                  };
                  setSessionDetails(newSessionDetails);
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
                value={sessionDetails.startTime}
                onChange={(event) => {
                  let newSessionDetails = {
                    ...sessionDetails,
                    startTime: event.target.value,
                  };
                  setSessionDetails(newSessionDetails);
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
                value={sessionDetails.endTime}
                onChange={(event) => {
                  let newSessionDetails = {
                    ...sessionDetails,
                    endTime: event.target.value,
                  };
                  setSessionDetails(newSessionDetails);
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
                value={sessionDetails.venue}
                onChange={(event) => {
                  let newSessionDetails = {
                    ...sessionDetails,
                    venue: event.target.value,
                  };
                  setSessionDetails(newSessionDetails);
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
                value={sessionDetails.resourceLink}
                onChange={(event) => {
                  let newSessionDetails = {
                    ...sessionDetails,
                    resourceLink: event.target.value,
                  };
                  setSessionDetails(newSessionDetails);
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
                value={sessionDetails.speakerName}
                onChange={(event) => {
                  let newSessionDetails = {
                    ...sessionDetails,
                    speakerName: event.target.value,
                  };
                  setSessionDetails(newSessionDetails);
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
                value={sessionDetails.speakerTitle}
                onChange={(event) => {
                  let newSessionDetails = {
                    ...sessionDetails,
                    speakerTitle: event.target.value,
                  };
                  setSessionDetails(newSessionDetails);
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
                value={sessionDetails.speakerLinkedin}
                onChange={(event) => {
                  let newSessionDetails = {
                    ...sessionDetails,
                    speakerLinkedin: event.target.value,
                  };
                  setSessionDetails(newSessionDetails);
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
                value={sessionDetails.speakerTwitter}
                onChange={(event) => {
                  let newSessionDetails = {
                    ...sessionDetails,
                    speakerTwitter: event.target.value,
                  };

                  setSessionDetails(newSessionDetails);
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
                  window.add_session_modal.close();
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

export default AddSessionForm;
