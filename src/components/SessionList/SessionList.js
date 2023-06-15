import AddSessionForm from '../AddSessionForm/AddSessionForm';
import SingleSessionCard from '../SingleSessionCard/SingleSessionCard';

function sessionList({ sessionList, eventData }) {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-10">
        <div className="space-y-3">
          {sessionList.length > 0 ? (
            <h2 className="text-xl font-bold">
              This event has {sessionList.length} sessions
            </h2>
          ) : (
            <h2 className="text-xl font-bold mb-10 ">
              You haven't added any sessions yet :(
            </h2>
          )}
          <button
            className="btn btn-primary text-white capitalize"
            onClick={() => {
              window.add_session_modal.showModal();
            }}
          >
            <span className="text-2xl"> &#43;</span>
            Add Session
          </button>
          <dialog id="add_session_modal" className="modal">
            <AddSessionForm eventData={eventData} />
          </dialog>
        </div>
        <div className="grid gap-4 md:grid md:grid-cols-2 md:gap-3 lg:gap-5	">
          {sessionList.map((singleSession) => (
            <SingleSessionCard
              key={singleSession.$id}
              sessionDetails={singleSession}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default sessionList;
