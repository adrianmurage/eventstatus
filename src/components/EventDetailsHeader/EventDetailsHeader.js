import {
  formatToHumanReadableDate,
  formatToHumanReadableTime,
} from '@/utils/utils';
import {
  CalendarIcon,
  ClockIcon,
  SewingPinFilledIcon,
} from '@radix-ui/react-icons';
import StatusPill from '../StatusPill/StatusPill';
import EditEventDropdown from '../EditEventDropdown/EditEventDropdown';
import EditEventForm from '../EditEventForm/EditEventForm';

function EventDetailsHeader({ eventDetails }) {
  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-6 lg:px-8 pt-24 pb-14 flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold capitalize">
              {eventDetails.name}
            </h2>
            <EditEventDropdown />
          </div>
          <div>
            <div className="flex justify-between items-end">
              <div>
                <div className="flex items-center space-x-2">
                  <ClockIcon />
                  <span>
                    {formatToHumanReadableTime(eventDetails.startTime)}
                  </span>
                  <span>-</span>
                  <span>{formatToHumanReadableTime(eventDetails.endTime)}</span>
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
        <dialog id="edit_event_modal" className="modal">
          <EditEventForm eventDetails={eventDetails} />
        </dialog>
      </section>
    </>
  );
}

export default EventDetailsHeader;
