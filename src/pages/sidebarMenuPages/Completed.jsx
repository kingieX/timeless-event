// import React from 'react'

import CompletedEvents from './_components/CompletedEvents';
import CompletedTasks from './_components/CompletedTasks';

const Completed = () => {
  return (
    <div className="w-full lg:p-10 py-2 lg:px-8 px-4">
      {/* Header Section */}
      <h1 className="lg:text-2xl text-xl font-bold flex items-center">
        Activity:
      </h1>

      <div>
        <CompletedTasks />
      </div>
      <div>
        <CompletedEvents />
      </div>
    </div>
  );
};

export default Completed;
