import Link from 'next/link';
import React from 'react';

function EventCard({ eventName, eventLink }) {
  return (
    <>
      <Link href={eventLink}>
        <div className="card w-96 bg-base-100 shadow-md cursor-pointer">
          <div className="card-body">
            <h2 className="card-title">{eventName}</h2>
          </div>
        </div>
      </Link>
    </>
  );
}

export default EventCard;
