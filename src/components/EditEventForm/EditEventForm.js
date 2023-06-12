import React, { useState } from 'react';
import {
  formatDateForInput,
  formatTimeForInput,
  getCurrentDate,
  getISODateTime,
} from '../../utils/utils';
import { useRouter } from 'next/router';
import { CheckCircledIcon } from '@radix-ui/react-icons';

function EditEventForm({ eventDetails }) {
  const [eventData, setEventData] = useState({
    name: eventDetails.name,
    date: formatDateForInput(eventDetails.date),
    startTime: formatTimeForInput(eventDetails.startTime),
    endTime: formatTimeForInput(eventDetails.endTime),
    venue: eventDetails.venue,
  });

  //idle  | loading | success | error
  const [status, setStatus] = useState('idle');

  const router = useRouter();
  async function handleSubmit(event) {
    setStatus('loading');
    event.preventDefault();
    console.log(eventData);

    let payload = {
      data: {
        name: eventData.name,
        venue: eventData.venue,
        date: getISODateTime(eventData.date),
        startTime: getISODateTime(eventData.date, eventData.startTime),
        endTime: getISODateTime(eventData.date, eventData.endTime),
      },
      id: eventDetails.$id,
    };

    const endpoint = '../api/events';

    const JSONData = JSON.stringify(payload);

    console.log(payload);

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
            className="btn capitalize"
            onClick={() => {
              router.reload();
            }}
          >
            Ok
          </button>
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
        <h3 className="font-bold text-lg">Edit Event</h3>

        <div className="modal-action flex justify-center">
          <div className="flex flex-col justify-center">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name of event</span>
              </label>
              <input
                required
                disabled={status === 'loading'}
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={eventData.name}
                onChange={(event) => {
                  let newEventData = {
                    ...eventData,
                    name: event.target.value,
                  };
                  setEventData(newEventData);
                }}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Event Date</span>
              </label>
              <input
                required
                disabled={status === 'loading'}
                type="date"
                className="input input-bordered w-full max-w-xs"
                min={getCurrentDate()}
                value={eventData.date}
                onChange={(event) => {
                  let newEventData = {
                    ...eventData,
                    date: event.target.value,
                  };

                  setEventData(newEventData);
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
                className="input input-bordered w-full max-w-xs"
                value={eventData.startTime}
                onChange={(event) => {
                  let newEventData = {
                    ...eventData,
                    startTime: event.target.value,
                  };
                  setEventData(newEventData);
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
                className="input input-bordered w-full max-w-xs"
                value={eventData.endTime}
                onChange={(event) => {
                  let newEventData = {
                    ...eventData,
                    endTime: event.target.value,
                  };
                  setEventData(newEventData);
                }}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Venue</span>
              </label>
              <input
                required
                disabled={status === 'loading'}
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={eventData.venue}
                onChange={(event) => {
                  let newEventData = {
                    ...eventData,
                    venue: event.target.value,
                  };
                  setEventData(newEventData);
                }}
              />
            </div>
            <div className="form-control space-y-6 pb-10 pt-5">
              <button
                disabled={status === 'loading'}
                type="button"
                className="btn capitalize"
                onClick={() => {
                  window.my_modal_1.close();
                }}
              >
                Cancel
              </button>
              {status === 'idle' && (
                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className="btn capitalize"
                >
                  Save
                </button>
              )}
              {status === 'loading' && (
                <button className="btn">
                  <span className="loading loading-spinner"></span>
                  Saving
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditEventForm;
