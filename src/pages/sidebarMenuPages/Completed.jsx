// import React from 'react'
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Completed = () => {
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);

  const toggleTasks = () => setShowCompletedTasks(!showCompletedTasks);

  return (
    <div className="w-full lg:p-10 py-6 lg:px-8 px-4">
      {/* Header Section */}
      <div className="flex">
        <div
          className="flex flex-row justify-center items-center lg:gap-2 cursor-pointer"
          onClick={toggleTasks}
        >
          <h1 className="lg:text-2xl text-xl font-bold flex items-center">
            Activity: All projects
          </h1>
          {showCompletedTasks ? (
            <FaChevronUp className="mr-2 text-slate-600 w-3" />
          ) : (
            <FaChevronDown className="mr-2 text-slate-600 w-3" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Completed;
