import React from 'react';
import SingleSessionCard from '../SingleSessionCard/SingleSessionCard';

function sessionList({ sessionList }) {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="space-y-8">
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
