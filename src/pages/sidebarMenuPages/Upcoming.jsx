// import React from 'react'

import Overdue from '../../components/Overdue';

const Upcoming = () => {
  return (
    <div className="w-full lg:p-10 py-6 lg:px-8 px-4">
      {/* Header Section */}
      <div className="">
        <div className="flex flex-row items-center gap-2 cursor-pointer mb-4">
          <h1 className="lg:text-2xl text-xl font-bold flex items-center">
            Upcoming
          </h1>
        </div>
      </div>

      {/* dates */}
      <div>
        <h2>August</h2>
      </div>

      {/* overdue */}
      <Overdue />
    </div>
  );
};

export default Upcoming;
