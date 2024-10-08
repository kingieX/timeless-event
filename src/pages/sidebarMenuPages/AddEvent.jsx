import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';

const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleDueDateChange = date => {
    setDueDate(date);
  };

  const handleDueTimeChange = e => {
    setDueTime(e.target.value);
  };

  const handleCancel = () => {
    navigate('/dashboard'); // Redirects to the dashboard
  };

  const handleAddEvent = () => {
    // You can add logic to handle form submission here
    // For now, we'll just navigate to the event page
    navigate('/dashboard/events');
  };

  return (
    <div className="flex justify-center items-center lg:mt-12 mt-4 mx-4">
      <div className="bg-white w-full max-w-xl py-4 lg:border border-gray rounded-lg lg:shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Add an Event</h2>
        <hr className="hidden lg:block mb-4 border-gray" />
        <form className="flex flex-col justify-center items-center lg:px-12">
          <div className="w-full mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="eventName"
            >
              Event Name
            </label>
            <input
              id="eventName"
              type="text"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={eventName}
              onChange={e => setEventName(e.target.value)}
              placeholder="Enter event name"
            />
          </div>

          <div className="w-full mb-4 flex lg:flex-row flex-col gap-4">
            <div className="lg:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dueDate"
              >
                Date
              </label>
              <div className="flex items-center w-full px-2 py-2 border border-gray focus-within:border-primary">
                <input
                  id="dueDate"
                  type="date"
                  className="w-full text-sm flex-grow outline-none pl-1"
                  value={dueDate}
                  onChange={handleDueDateChange}
                />
              </div>
            </div>

            <div className="lg:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dueTime"
              >
                Time
              </label>
              <div className="flex items-center w-full px-2 py-2 border border-gray focus-within:border-primary">
                <input
                  id="dueTime"
                  type="time"
                  className="w-full text-sm flex-grow outline-none pl-1"
                  value={dueTime}
                  onChange={handleDueTimeChange}
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <div className="flex items-center w-full px-4 py-2 border border-gray focus-within:border-primary">
                <input
                  id="location"
                  type="text"
                  className="w-full flex-grow outline-none pr-2"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Enter location"
                />
                <CiLocationOn className="text-slate-500 w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter description"
              rows="4"
            ></textarea>
          </div>

          <div className="lg:w-3/4 w-full flex justify-center gap-8">
            <button
              type="button"
              className="lg:w-1/2 w-full border border-red-400 text-red-400 font-semibold py-2 px-4 hover:bg-red-400 hover:text-white transition duration-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              onClick={handleAddEvent}
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
