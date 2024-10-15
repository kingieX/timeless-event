import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FiTag } from 'react-icons/fi';
import { CiAlarmOn } from 'react-icons/ci';
import ReminderModal from '../../components/ReminderModal';
import { MdOutlineLowPriority } from 'react-icons/md';

// Dynamic options for the modal
const groupOptions = [
  { value: 'Group 1', label: 'Group 1' },
  { value: 'Group 2', label: 'Group 2' },
  // Add more groups as needed
];

const deliveryMediumOptions = [
  { value: 'sms', label: 'SMS' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
  // Add more options as needed
];

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState('');
  const [labels, setLabels] = useState('');
  const [comment, setComment] = useState('');
  const [location, setLocation] = useState('');
  const [priorityOpen, setPriorityOpen] = useState(false);

  const [showReminderModal, setShowReminderModal] = useState(false); // Control modal visibility
  const [reminderSettings, setReminderSettings] = useState(null); // Store reminder settings
  const navigate = useNavigate();

  const priorityOptions = [
    {
      value: 'Priority 1',
      label: 'Priority 1',
      icon: <FiTag className="text-red-500 w-4 h-4" />,
    },
    {
      value: 'Priority 2',
      label: 'Priority 2',
      icon: <FiTag className="text-orange-500 w-4 h-4" />,
    },
    {
      value: 'Priority 3',
      label: 'Priority 3',
      icon: <FiTag className="text-yellow-500 w-4 h-4" />,
    },
    {
      value: 'Priority 4',
      label: 'Priority 4',
      icon: <FiTag className="text-green-500 w-4 h-4" />,
    },
  ];

  const handleDueDateChange = date => {
    setDueDate(date);
  };

  const handleDueTimeChange = e => {
    setDueTime(e.target.value);
  };

  // const handleRemindersChange = date => {
  //   setReminders(date);
  // };

  const handleCancel = () => {
    navigate('/dashboard'); // Redirects to the dashboard
  };

  const handleAddTask = () => {
    // You can add logic to handle form submission here
    // For now, we'll just navigate to the task page
    navigate('/dashboard/tasks');
  };

  const togglePriorityDropdown = () => {
    setPriorityOpen(!priorityOpen);
  };

  const selectPriority = option => {
    setPriority(option.label);
    setPriorityOpen(false); // Close the dropdown after selection
  };

  // Handle modal close
  const handleReminderSave = settings => {
    setReminderSettings(settings);
  };

  return (
    <div className="flex justify-center items-center mt-4 mx-4">
      {/* Reminder Modal */}
      {/* {showReminderModal && (
        <ReminderModal
          onClose={() => setShowReminderModal(false)}
          onSave={handleReminderSave}
          groupOptions={groupOptions}
          deliveryMediumOptions={deliveryMediumOptions}
        />
      )} */}

      <div className="bg-white w-full max-w-xl py-4 lg:border border-gray rounded-lg lg:shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Add Task</h2>
        <hr className="hidden lg:block mb-4 border-gray" />
        <form className="flex flex-col justify-center items-center lg:px-12">
          <div className="w-full mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="taskName"
            >
              Task Name
            </label>
            <input
              id="taskName"
              type="text"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              placeholder="Enter task name"
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

            <div className="lg:w-1/3 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="priority"
              >
                Priority
              </label>
              <div
                className="flex items-center w-full px-2 py-2 border border-gray focus-within:border-primary cursor-pointer"
                onClick={togglePriorityDropdown}
              >
                <MdOutlineLowPriority className="text-slate-500 w-6 h-6" />
                <span className="w-full text-sm flex-grow outline-none pl-2 text-slate-500">
                  {priority || 'priority'}
                </span>
                <IoMdArrowDropdown className="w-6 h-6 text-slate-500" />
              </div>
              {priorityOpen && (
                <ul className="absolute w-full mt-1 bg-white border border-gray shadow-md z-10">
                  {priorityOptions.map((option, index) => (
                    <li
                      key={index}
                      className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectPriority(option)}
                    >
                      {option.icon}
                      <span className="ml-2">{option.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Enter comment"
              rows="2"
            ></textarea>
          </div>

          <div className="w-full mb-4 flex lg:flex-row flex-col gap-4">
            <div className="lg:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {/* Reminders */}
              </label>
              <button
                type="button"
                className="w-full px-4 py-2 border border-gray text-left focus-within:border-primary flex items-center"
                onClick={() => setShowReminderModal(true)} // This will open the modal
              >
                <CiAlarmOn className="text-slate-500 w-6 h-6" />
                <span className="ml-2 text-sm">Reminder</span>
              </button>
            </div>

            <div className="lg:w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                {/* Location */}
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

            <div className="lg:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="labels"
              >
                {/* Labels */}
              </label>
              <div className="flex items-center w-full px-2 py-2 border border-gray focus-within:border-primary">
                <FiTag className="text-slate-500 w-6 h-6" />
                <input
                  id="labels"
                  type="text"
                  className="w-full text-sm flex-grow outline-none pl-1"
                  value={labels}
                  onChange={e => setLabels(e.target.value)}
                  placeholder="Enter labels"
                />
              </div>
            </div>
          </div>

          <div className="lg:w-3/4 w-full flex justify-center gap-8 my-4">
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
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
