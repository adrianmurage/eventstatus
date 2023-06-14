import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { getCurrentDate } from '../../utils/utils';

function EventDetailsForm({
  formSubmissionProgress,
  setFormSubmissionProgress,
  eventDetails,
  setEventDetails,
}) {
  const router = useRouter();
  const handleCancel = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  };
  if (formSubmissionProgress.activeForm !== 0) return;

  return (
    <>
      <p>Let's start with general details about your event</p>

      <div className="divider"></div>

      <form
        className="space-y-6 max-w-lg mx-auto"
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
            autoFocus
            type="text"
            className="input input-bordered w-full max-w-lg"
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
            className="input input-bordered w-full max-w-lg"
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
            className="input input-bordered w-full max-w-lg"
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
            className="input input-bordered w-full max-w-lg"
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
            className="input input-bordered w-full max-w-lg"
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
          <button
            type="button"
            className="btn capitalize btn-outline"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn capitalize btn-primary text-white"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
}

export default EventDetailsForm;
