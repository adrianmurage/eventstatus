import Sessions from "../../components/Sessions/Sessions";
import { getAllEvents, getAllSessionsInEvent, getEvent } from "../../utils/db";
import { getCapitalizedString, getDate } from "../../utils/utils";

export default function Page({ event, sessions }) {
  if (!event) {
    return <div>No event was found</div>;
  }
  return (
    <div className="container max-w-xs mx-auto pt-6">
      <section className="mb-4">
        <h1 className="text-2xl mb-1">Welcome to {event.name}</h1>
        <h2 className="text-slate-700 text-lg dark:text-slate-300">
          {getDate(event.date)}
        </h2>
        <h2 className="text-slate-700 mb-2 dark:text-slate-300">
          {getCapitalizedString(event.venue)}
        </h2>
      </section>
      <section>
        {!sessions ? (
          <div>This event does not have any sessions</div>
        ) : (
          <Sessions sessions={sessions} />
        )}
      </section>
    </div>
  );
}
export async function getStaticPaths() {
  // Get all events
  const events = await getAllEvents();
  console.log(events);
  // Get the paths we want to prerender based on event ids
  const paths = events.map((event) => ({
    params: { id: event.$id },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  // Get an event
  const event = await getEvent(params.id);

  // Get sessions
  const sessions = await getAllSessionsInEvent(params.id);

  return {
    props: {
      event,
      sessions,
    },
  };
}
