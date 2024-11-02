import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiAlarmOn } from 'react-icons/ci';
import Cookies from 'js-cookie';
// import ReminderModal from '../../components/ReminderModal';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState('pending');
  const [comment, setComment] = useState('');
  const [accessLevel, setAccessLevel] = useState('public');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showReminderModal, setShowReminderModal] = useState(false); // Control modal visibility
  const [reminderSettings, setReminderSettings] = useState(null); // Store reminder settings

  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  // const handleRemindersChange = date => {
  //   setReminders(date);
  // };

  // const handleCancel = () => {
  //   navigate('/dashboard'); // Redirects to the dashboard
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const requestBody = {
      title: taskName,
      description: comment,
      priority,
      status,
      access: accessLevel,
      due_date: dueDate,
      project_id: projectId,
    };

    console.log('requestBody: ', requestBody);

    try {
      const response = await fetch(`${API_BASE_URL}/task/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess('Task added successfully!');

        setTimeout(() => {
          navigate('/dashboard/tasks');
          window.location.reload(); // Trigger task data refresh
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle modal close
  const handleReminderSave = settings => {
    setReminderSettings(settings);
  };

  return (
    <div className="flex justify-center items-center mb-8 mx-4">
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
        <form
          className="flex flex-col justify-center items-center lg:px-12"
          onSubmit={handleSubmit}
        >
          {/* Taks name */}
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
              required
              disabled={isLoading}
            />
          </div>

          <div className="w-full mb-4 flex lg:flex-row flex-col gap-4">
            {/* due date */}
            <div className=" mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Due Date/Time
              </label>
              <input
                type="datetime-local"
                value={dueDate.slice(0, 16)} // Adjusting format for datetime-local input
                onChange={e => setDueDate(e.target.value)}
                className="flex items-center text-sm w-full px-2 py-2 border border-gray focus-within:border-primary cursor-pointer"
                required
                disabled={isLoading}
              />
            </div>

            <div className="lg:w-full relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="priority"
              >
                Priority
              </label>
              <select
                value={priority}
                onChange={e => setPriority(Number(e.target.value))}
                className="w-full px-4 py-2 border text-sm border-gray text-left focus-within:border-primary flex items-center"
                required
                disabled={isLoading}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
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
              required
              disabled={isLoading}
            ></textarea>
          </div>

          <div className="w-full mb-4 flex lg:flex-row flex-col gap-4">
            <div className="lg:w-1/3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Access Level
              </label>
              <select
                value={accessLevel}
                onChange={e => setAccessLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray text-left text-sm focus-within:border-primary flex items-center"
                required
                disabled={isLoading}
              >
                <option value="private">Private</option>
                <option value="restricted">Restricted</option>
                <option value="public">Public</option>
                <option value="team_only">Team Only</option>
              </select>
            </div>

            <div className="lg:w-1/3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full px-4 py-2 border text-sm border-gray text-left focus-within:border-primary flex items-center"
                required
                disabled={isLoading}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="lg:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Reminders
              </label>
              <button
                type="button"
                className="w-full px-4 py-2 border border-gray text-left focus-within:border-primary flex items-center"
                onClick={() => setShowReminderModal(true)} // This will open the modal
              >
                <CiAlarmOn className="text-slate-500 w-5 h-5" />
                <span className="ml-2 text-sm">Set Reminder</span>
              </button>
            </div>
          </div>

          <div className="w-full flex justify-center gap-8 my-4">
            {/* <button
              type="button"
              className="lg:w-1/2 w-full border border-red-400 text-red-400 font-semibold py-2 px-4 hover:bg-red-400 hover:text-white transition duration-300"
              onClick={handleCancel}
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Task'}
            </button>
          </div>

          {/* Display Success or Error Messages */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddTask;
