import React from 'react';

function EventCard({ eventName }) {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title">{eventName}</h2>
        </div>
      </div>
    </>
  );
}

export default EventCard;
