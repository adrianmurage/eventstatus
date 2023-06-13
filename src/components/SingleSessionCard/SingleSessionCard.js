import Link from 'next/link';
import React from 'react';

function SingleSessionCard({ sessionDetails }) {
  console.log({ sessionDetails });
  return (
    <>
      <Link href={`/event/session/${sessionDetails.$id}`}>
        <div className="card bg-base-100 drop-shadow-sm cursor-pointer text-left">
          <div className="card-body space-y-6 px-5 py-5">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title text-lg capitalize">
                  {sessionDetails.name}
                </h2>
                <p className="text-sm">
                  <span>By </span> <span>{sessionDetails.speakerName}</span>
                </p>
              </div>
              {sessionDetails.speakerImage && (
                <div className="avatar">
                  <div className="w-14 mask mask-squircle">
                    <img src={`${sessionDetails.speakerImage}`} />
                  </div>
                </div>
              )}
              {!sessionDetails.speakerImage && (
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content mask mask-squircle w-14">
                    <span className="text-3xl">
                      {sessionDetails.speakerName.charAt(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default SingleSessionCard;
