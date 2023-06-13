import SessionCard from "../SessionCard/SessionCard";
function Sessions({ sessions }) {
  return (
    <div>
      {sessions.map((session) => {
        return (
          <div
            key={session.$id}
            className="overflow-hidden transition-height duration-200"
          >
            <SessionCard
              name={session.name}
              venue={session.venue}
              endTime={session.endTime}
              startTime={session.startTime}
              speakerTitle={session.speakerTitle}
              speakerTwitter={session.speakerTwitter}
              speakerLinkedin={session.speakerLinkedin}
              speakerName={session.speakerName}
              resourceLink={session.resourceLink}
              speakerImage={session.speakerImage}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Sessions;
