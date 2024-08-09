/* eslint-disable react/prop-types */
// import React from 'react';

const SidebarModal = ({ toggleModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-64">
        <div className="flex flex-col">
          <button
            className="text-left py-2 px-4 hover:bg-gray-100"
            onClick={toggleModal}
          >
            0/7 tasks
          </button>
          <button
            className="text-left py-2 px-4 hover:bg-gray-100"
            onClick={toggleModal}
          >
            0/7 events
          </button>
          <button
            className="text-left py-2 px-4 hover:bg-gray-100"
            onClick={toggleModal}
          >
            Settings
          </button>
          <button
            className="text-left py-2 px-4 hover:bg-gray-100"
            onClick={toggleModal}
          >
            Activity Log
          </button>
          <button
            className="text-left py-2 px-4 hover:bg-gray-100"
            onClick={toggleModal}
          >
            What's new
          </button>
          <button
            className="text-left py-2 px-4 hover:bg-gray-100"
            onClick={toggleModal}
          >
            Log out
          </button>
        </div>
      </div>
      <div className="fixed inset-0" onClick={toggleModal}></div>
    </div>
  );
};

export default SidebarModal;
