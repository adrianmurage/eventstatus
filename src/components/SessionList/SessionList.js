import React from 'react';
import SingleSessionCard from '../SingleSessionCard/SingleSessionCard';

function sessionList({ sessionList }) {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
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
