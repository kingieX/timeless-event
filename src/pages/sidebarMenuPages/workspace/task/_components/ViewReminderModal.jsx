import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { CiEdit } from 'react-icons/ci';
import EditReminderModal from '../../subtask/_components/EditReminderModal';

const ViewReminderModal = ({ taskId, onClose }) => {
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const [editReminder, setEditReminder] = useState(null);

  // Fetch reminders when modal opens
  useEffect(() => {
    const fetchReminders = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(
          `${API_BASE_URL}/reminder/tasks/${taskId}/reminders`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setReminders(data); // Set reminder data
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch reminders');
        }
      } catch (error) {
        console.error('Error fetching reminders:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReminders();
  }, [taskId]);

  //   logic to handle edit reminder
  const handleEditReminder = reminder => {
    setEditReminder(reminder);
  };

  //   logic to handle delete reminder
  const handleDeleteReminder = async reminderId => {
    if (window.confirm('Are you sure you want to delete this Reminder?')) {
      try {
        await axios.delete(
          `${API_BASE_URL}/reminder/${reminderId}/delete-reminder`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log('Reminder deleted successfully');
        window.location.reload(); // Trigger project data refresh
      } catch (err) {
        console.error('Error deleting Reminder:', err);
        setError('Failed to delete Reminder.');
      }
    }
  };

  const HandleClose = () => {
    onClose(); // Close modal after success
    setTimeout(() => {
      window.location.reload(); // Trigger project data refresh
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 w-full m-8 overflow-y-auto h-[80vh] border border-gray-300 max-w-xl rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">View Reminders</h2>

        {isLoading && <p>Loading reminders...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* List of reminder titles */}
        {!isLoading && !error && reminders.length > 0 ? (
          <ul className="space-y-2">
            {reminders.map(reminder => (
              <li key={reminder.reminder_id} className="border p-3 rounded-md">
                <p className="font-semibold">{reminder.title}</p>
                <div className="flex space-x-2">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleEditReminder(reminder)}
                  >
                    <CiEdit className="w-5 h-5 text-blue-600" />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDeleteReminder(reminder.reminder_id)}
                  >
                    <RiDeleteBin6Line className="w-5 h-5 text-red-500" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reminders found for this task.</p>
        )}

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={HandleClose}
            className="border mr-2 border-red-400 text-red-400 font-semibold py-2 px-4 hover:bg-red-400 hover:text-white transition duration-300"
          >
            Close
          </button>
        </div>
      </div>

      {/* Render the EditReminderModal if editReminder is set */}
      {editReminder && (
        <EditReminderModal
          reminder={editReminder}
          onClose={() => setEditReminder(null)}
        />
      )}
    </div>
  );
};

export default ViewReminderModal;
