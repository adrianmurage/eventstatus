import Sessions from "../../components/Sessions/Sessions";
import { getCapitalizedString, getDate } from "../../utils";

export default function Page({ event, sessions }) {
  if (!event) {
    return <div>No event was found</div>;
  }
  return (
    <div className="container max-w-xs mx-auto pt-6">
      <section className="mb-4">
        <h1 className="text-2xl mb-1">Welcome to {event.data.name}</h1>
        <h2 className="text-slate-700 text-lg dark:text-slate-300">
          {getDate(event.data.date)}
        </h2>
        <h2 className="text-slate-700 mb-2 dark:text-slate-300">
          {getCapitalizedString(event.data.venue)}
        </h2>
      </section>
      <section>
        {!sessions ? (
          <div>This event does not have any sessions</div>
        ) : (
          <Sessions sessions={sessions.data} />
        )}
      </section>
    </div>
  );
}
export async function getStaticPaths() {
  // Call API endpoint to get events
  const res = await fetch(`http://localhost:3000/api/events`);
  const events = await res.json();

  // Get the paths we want to prerender based on event ids
  const paths = events.data.map((event) => ({
    params: { id: event.$id },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  // Call an API endpoint to get events.
  const eventRepsponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events?id=${params.id}`
  );

  // Call an API endpoint to get sessions.

  const event = await eventRepsponse.json();
  const sessionResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/sessions?eventId=${params.id}`
  );
  const sessions = await sessionResponse.json();

  return {
    props: {
      event,
      sessions,
    },
  };
}
