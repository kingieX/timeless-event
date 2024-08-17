/* eslint-disable react/prop-types */
import { useState } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const DateTimePicker = ({ selectedDate, setSelectedDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelection = date => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setShowCalendar(false);
  };

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow);
    setShowCalendar(false);
  };

  const handleNoDate = () => {
    setSelectedDate(null);
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      {/* <input
        type="text"
        value={selectedDate ? selectedDate.format('MMM DD, YYYY') : ''}
        placeholder="Type a due date"
        onFocus={() => setShowCalendar(true)}
        className="w-full px-3 py-2 border rounded"
      /> */}

      {/* {showCalendar && ( */}
      <div className="absolute z-50 right-0 -top-10 bg-white shadow-lg p-4 rounded mt-2">
        <ul className="space-y-1">
          <li
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={handleToday}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold">Today</span>
              <span>
                {new Date().toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
            </div>
          </li>
          <li
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={handleTomorrow}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold">Tomorrow</span>
              <span>
                {new Date(
                  new Date().setDate(new Date().getDate() + 1)
                ).toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
            </div>
          </li>
          <li
            className="cursor-pointer hover:bg-gray-100 p-2 rounded text-sm font-bold"
            onClick={handleNoDate}
          >
            <span>No Date</span>
          </li>
        </ul>

        <DateTime
          value={selectedDate}
          onChange={handleDateSelection}
          input={false}
          open={true}
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default DateTimePicker;
