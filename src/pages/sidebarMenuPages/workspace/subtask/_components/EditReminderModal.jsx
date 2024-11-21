import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { RiDeleteBin6Line } from 'react-icons/ri';

const EditReminderModal = ({ reminder, onClose }) => {
  const [title, setTitle] = useState(reminder.title);
  const [message, setMessage] = useState(reminder.message);
  const [medium, setMedium] = useState(reminder.medium);
  const [reminderTimes, setReminderTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReminder, setIsLoadingReminder] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const reminderId = reminder.reminder_id;

  // Fetch reminder times when the modal opens
  useEffect(() => {
    const fetchReminderTimes = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/reminder/${reminderId}/reminder-times`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setReminderTimes(data);
          //   console.log('Reminder Times:', data);
        } else {
          throw new Error(data.message || 'Failed to fetch reminder times');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReminderTimes();
  }, [reminderId, accessToken]);

  // Update reminder
  const handleUpdateReminder = async e => {
    e.preventDefault();
    setIsLoadingReminder(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/reminder/${reminderId}/update-reminder`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            medium,
          }),
        }
      );

      if (response.ok) {
        setSuccess('Reminder updated successfully!');
        setTimeout(() => {
          onClose();
        }, 2000);
        // console.log('Reminder Response: ', response);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update reminder');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoadingReminder(false);
    }
  };

  // Handle adding/updating reminder times
  const handleUpdateReminderTimes = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/reminder/${reminderId}/update-reminder-times`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reminderTimes),
        }
      );

      if (response.ok) {
        setSuccess('Reminder times updated successfully!');
        setTimeout(() => {
          onClose();
        }, 2000);
        // console.log('Reminder Times Response: ', response);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update reminder times');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete reminder time
  const handleDeleteReminderTime = async reminderTimeId => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/reminder/${reminderTimeId}/delete-reminder-time`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        setReminderTimes(
          reminderTimes.filter(time => time.reminder_time_id !== reminderTimeId)
        );
        setSuccess('Reminder time deleted successfully!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete reminder time');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //   format the date-time being rendered
  const formatDateTimeForInput = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 w-full m-8 overflow-y-auto h-[90vh] max-w-xl border rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Reminder</h2>

        <form onSubmit={handleUpdateReminder}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="border text-slate-600 border-gray-300 p-2 rounded w-full"
              disabled
            />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
              disabled={isLoading}
            />
          </div>

          {/* Medium */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Medium</label>
            <select
              value={medium}
              onChange={e => setMedium(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              disabled={isLoading}
            >
              <option value="sms">SMS</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="browser">Browser</option>
              <option value="mobile_app">Mobile App</option>
            </select>
          </div>

          {/* Reminder Times */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Reminder Times
            </label>
            {reminderTimes.length === 0 ? (
              <p className="text-sm italic text-center">
                No reminder times found for this reminder.
              </p>
            ) : (
              <div>
                {reminderTimes.map((time, index) => (
                  <div
                    key={time.reminder_time_id}
                    className="flex items-center mb-2"
                  >
                    <input
                      type="datetime-local"
                      //   value={time.reminder_time}
                      value={formatDateTimeForInput(time.reminder_time)}
                      onChange={e =>
                        handleReminderTimeChange(index, e.target.value)
                      }
                      className="border border-gray-300 p-2 rounded w-full"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteReminderTime(time.reminder_time_id)
                      }
                      className="ml-2 text-red-500 hover:text-red-700"
                      disabled={isLoading}
                    >
                      <RiDeleteBin6Line className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
              //   <ul className="mt-2">
              //     {reminderTimes.map(time => (
              //       <li
              //         key={time.reminder_time_id}
              //         className="flex justify-between items-center text-gray-600"
              //       >
              //         <span>{new Date(time.reminder_time).toLocaleString()}</span>
              //         <button
              //           type="button"
              //           onClick={() =>
              //             handleDeleteReminderTime(time.reminder_time_id)
              //           }
              //           className="text-red-500 hover:text-red-700"
              //         >
              //           <RiDeleteBin6Line className="w-5 h-5 text-red-500" />
              //         </button>
              //       </li>
              //     ))}
              //   </ul>
            )}
            <button
              type="button"
              onClick={handleUpdateReminderTimes}
              className="mt-4 border border-blue-600 text-blue-600 py-2 px-4 hover:bg-blue-100"
              disabled={isLoading || reminderTimes.length === 0}
            >
              Update Reminder Times
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={onClose}
              className="border mr-2 border-red-400 text-red-400 font-semibold py-2 px-4 hover:bg-red-400 hover:text-white transition duration-300"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              disabled={isLoading}
            >
              {isLoadingReminder ? 'Updating...' : 'Update Reminder'}
            </button>
          </div>

          {/* Display Success or Error Messages */}
          {error && (
            <div className="py-1 px-2 border border-gray my-4 border-l-4 border-l-red-500">
              <p className="text-red-500 text-center text-sm">{error}</p>
            </div>
          )}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditReminderModal;
