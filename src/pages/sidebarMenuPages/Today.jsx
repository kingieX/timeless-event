import React, { useState } from 'react';
import { FaCheckCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import DateTimePicker from '../../components/DateTimePicker';

const Today = () => {
  const [showTasks, setShowTasks] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleTasks = () => setShowTasks(!showTasks);
  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

  return (
    <div className="w-full h-screen lg:p-10 p-6">
      {/* Header Section */}
      <div className="flex">
        <div className="flex flex-col lg:gap-2">
          <h1 className="lg:text-2xl text-xl font-bold flex items-center">
            Today
          </h1>
          <div className="flex justify-start items-center space-x-2">
            <FaCheckCircle className="text-slate-500" />
            <p className="text-slate-600">7 tasks</p>
          </div>
        </div>
      </div>

      {/* Overdue Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between border-b border-b-gray pb-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleTasks}
          >
            {showTasks ? (
              <FaChevronUp className="mr-2 text-slate-600 w-3" />
            ) : (
              <FaChevronDown className="mr-2 text-slate-600 w-3" />
            )}
            <span className="lg:text-lg text-sm font-semibold">Overdue</span>
          </div>
          <button
            onClick={toggleDatePicker}
            className="text-primary px-2 py-2 text-sm font-semibold hover:bg-blue-100"
          >
            Reschedule tasks
          </button>
        </div>

        {showDatePicker && (
          <div className="mt-4 relative">
            <DateTimePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        )}

        {showTasks && (
          <div className="mt-4">
            {/* Tasks will go here */}
            <p>Task 1</p>
            <p>Task 2</p>
            <p>Task 3</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Today;
