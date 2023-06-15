import React from 'react';
import SingleSessionCard from '../SingleSessionCard/SingleSessionCard';
import EditSessionForm from '../EditSessionForm/EditSessionForm';
EditSessionForm;

function sessionList({ sessionList }) {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {sessionList.length > 0 ? (
          <h2 className='text-xl font-bold mb-10'>This event has {sessionList.length} sessions</h2>
        ) : (
          <h2 className='text-xl font-bold mb-10'>You haven't added any sessions yet :(</h2>
        )}
        <div className="grid gap-4 md:grid md:grid-cols-2 md:gap-3 lg:gap-5	">
          {sessionList.map((singleSession) => (
            <>
              <SingleSessionCard
                key={singleSession.$id}
                sessionDetails={singleSession}
              />
            </>
          ))}
        </div>
      </section>
    </>
  );
}

export default sessionList;
