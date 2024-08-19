import { IoCheckmarkCircleOutline } from 'react-icons/io5';

import { Link } from 'react-router-dom';
import Overdue from '../../components/Overdue';

const Today = () => {
  // Get the current date
  const today = new Date();
  const options = { month: 'short', day: 'numeric', weekday: 'long' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className="w-full lg:p-10 py-6 lg:px-8 px-4">
      {/* Header Section */}
      <div className="flex">
        <div className="flex flex-col lg:gap-2">
          <h1 className="lg:text-2xl text-xl font-bold flex items-center">
            Today
          </h1>
          <div className="flex justify-start items-center space-x-2">
            <IoCheckmarkCircleOutline className="text-slate-500" />
            <p className="text-slate-600">7 tasks</p>
          </div>
        </div>
      </div>

      {/* Overdue Section */}
      <Overdue />

      {/* Add Task & Add Event Section */}
      <div className="mt-6 flex flex-col py-4">
        <h2 className="lg:text-sm text-sm font-semibold px-2">
          {formattedDate}
        </h2>
        <span className="border-b border-b-gray pb-2"></span>
        <div className="flex flex-col space-y-1 py-2 px-4">
          <Link
            to="/app/add-task"
            className="text-sm text-slate-600 hover:text-primary"
          >
            + Add task
          </Link>
          <Link
            to="/app/add-event"
            className="text-sm text-slate-600 hover:text-primary"
          >
            + Add event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Today;
