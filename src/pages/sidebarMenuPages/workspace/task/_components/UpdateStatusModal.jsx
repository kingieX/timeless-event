import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UpdateStatusModal = ({ task, onClose }) => {
  // Initialize the status state correctly, checking if task.status exists
  const [status, setStatus] = useState(task?.status || 'not_started');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Ensure that status is updated when the task prop changes (useEffect)
  useEffect(() => {
    if (task?.status) {
      setStatus(task.status);
    }
  }, [task]); // Only rerun if the task prop changes

  const handleStatusChange = e => {
    setStatus(e.target.value); // Update the state when a new status is selected
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/task/${task.task_id}/update-task-status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ new_status: status }), // Correct body structure
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      setSuccess('Status updated successfully!');
      setTimeout(() => {
        onClose();
        window.location.reload(); // Trigger a refresh if necessary
      }, 2000);
    } catch (error) {
      console.error('Error updating status:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Update Task Status</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Task Status</label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="border border-gray-300 p-2 rounded w-full"
              disabled={isLoading}
            >
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>

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
              {isLoading ? 'Updating...' : 'Update Status'}
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

export default UpdateStatusModal;
