import {
  formatToHumanReadableDate,
  formatToHumanReadableTime,
} from '@/utils/utils';
import {
  CalendarIcon,
  ClockIcon,
  SewingPinFilledIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import StatusPill from '../StatusPill/StatusPill';

function EventCard({ eventDetails }) {
  console.log(eventDetails);
  return (
    <>
      <Link href={`/event/${eventDetails.$id}`}>
        <div className="card bg-base-100 drop-shadow-sm cursor-pointer text-left">
          <div className="card-body space-y-8 px-5 py-5">
            <h2 className="card-title text-xl capitalize leading-tight pr-6">
              {eventDetails.name}
            </h2>
            <div className="">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <ClockIcon />
                    <span>
                      {formatToHumanReadableTime(eventDetails.startTime)}
                    </span>
                    <span>-</span>
                    <span>
                      {formatToHumanReadableTime(eventDetails.endTime)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon />
                    <span className="capitalize">
                      {formatToHumanReadableDate(eventDetails.date)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SewingPinFilledIcon />
                    <span className="capitalize">{eventDetails.venue}</span>
                  </div>
                </div>
                <div className="">
                  <StatusPill
                    startTime={eventDetails.startTime}
                    endTime={eventDetails.endTime}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default EventCard;
