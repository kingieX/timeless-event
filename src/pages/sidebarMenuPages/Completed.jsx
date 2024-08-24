// import React from 'react'
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import Logo from '/image/completed.svg';

const Completed = () => {
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);

  const toggleTasks = () => setShowCompletedTasks(!showCompletedTasks);

  return (
    <div className="w-full lg:p-10 py-2 lg:px-8 px-4">
      {/* Header Section */}
      <div className="">
        <div
          className="flex flex-row items-center gap-2 cursor-pointer mb-4"
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
        {showCompletedTasks && (
          <div className="w-full flex flex-col justify-center items-center py-8">
            <img
              src={Logo}
              alt="empty project"
              className="lg:w-2/5 w-3/4 mb-4"
            />
            <h2 className="lg:text-2xl text-xl font-bold flex items-center">
              No activity at the moment
            </h2>
            <p className="lg:text-lg text-center text-sm text-gray-600">
              View changes made by you or your collaborator
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Completed;
