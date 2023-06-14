import EventCard from '../EventCard/EventCard';

function EventsList({ eventList }) {
  let listOfEvents = [...eventList];
  let reversedListOfEvents = listOfEvents.reverse();
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid gap-4 md:grid md:grid-cols-2 md:gap-3 lg:gap-5">
          {reversedListOfEvents.map((singleEvent) => (
            <EventCard key={singleEvent.$id} eventDetails={singleEvent} />
          ))}
        </div>
      </section>
    </>
  );
}

export default EventsList;
