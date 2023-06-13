import EventCard from '../EventCard/EventCard';

function EventsList({ eventList }) {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="space-y-8">
          {eventList.map((singleEvent) => (
            <EventCard key={singleEvent.$id} eventDetails={singleEvent} />
          ))}
        </div>
      </section>
    </>
  );
}

export default EventsList;
