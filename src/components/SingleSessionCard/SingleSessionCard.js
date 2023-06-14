import { formatToHumanReadableTime } from '@/utils/utils';
import {
  ClockIcon,
  Link1Icon,
  LinkedInLogoIcon,
  SewingPinFilledIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';
import EditSessionForm from '../EditSessionForm/EditSessionForm';
import EditSessionDropdown from '../EditSessionDropdown/EditSessionDropdown';

function SingleSessionCard({ sessionDetails }) {
  console.log({ sessionDetails });
  return (
    <>
      <div className="card bg-base-100 drop-shadow-sm text-left">
        <div className="card-body px-5 py-5">
          <div>
            <div className="flex justify-end">
              <EditSessionDropdown sessionID={sessionDetails.$id} />
              <dialog
                id={`edit_session_${sessionDetails.$id}_modal`}
                className="modal"
              >
                <EditSessionForm sessionDetails={sessionDetails} />
              </dialog>
            </div>
          </div>
          <div className=" space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title text-xl capitalize pr-4 leading-tight">
                  {sessionDetails.name}
                </h2>
                <p className="text-sm pr-9">
                  <span>
                    By {sessionDetails.speakerName} |{' '}
                    {sessionDetails.speakerTitle}
                  </span>
                </p>
                <div className="flex space-x-2 pt-2 items-center">
                  {sessionDetails.speakerLinkedin && (
                    <a href={sessionDetails.speakerLinkedin}>
                      <LinkedInLogoIcon
                        className="mr-2  hover:hover:text-slate-500"
                        width={30}
                        height={30}
                      />
                    </a>
                  )}
                  {sessionDetails.speakerTwitter && (
                    <a href={sessionDetails.speakerTwitter}>
                      <TwitterLogoIcon
                        className=" hover:text-slate-500"
                        width={27}
                        height={27}
                      />
                    </a>
                  )}
                </div>
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
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <ClockIcon />
                <span>
                  {formatToHumanReadableTime(sessionDetails.startTime)}
                </span>
                <span>-</span>
                <span>{formatToHumanReadableTime(sessionDetails.endTime)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SewingPinFilledIcon />
                <span className="capitalize">{sessionDetails.venue}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Link1Icon />
                <span className="underline text-sm underline-offset-2">
                  <a href={sessionDetails.resourceLink}>
                    {sessionDetails.resourceLink}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleSessionCard;
