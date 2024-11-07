import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const EditSubtaskModal = ({ subtask, onClose }) => {
  const [description, setDescription] = useState(subtask.description);
  const [frequency, setFrequency] = useState(subtask.frequency || 'Daily');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    setDescription(subtask.description);
    setFrequency(subtask.frequency || 'Daily');
  }, [subtask]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const requestBody = {
      description,
      frequency,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/subtask/update-subtask?sub_task_id=${subtask.sub_task_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSuccess('Subtask updated successfully!');

        setTimeout(() => {
          onClose();
          window.location.reload(); // Trigger subtask data refresh
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update subtask');
      }
    } catch (error) {
      console.error('Error updating subtask:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 w-full m-8 overflow-y-auto h-[80vh] border border-gray max-w-xl rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Subtask</h2>

        <form onSubmit={handleSubmit}>
          {/* Description Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
              disabled={isLoading}
            />
          </div>

          {/* Frequency Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Frequency</label>
            <select
              value={frequency}
              onChange={e => setFrequency(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              disabled={isLoading}
            >
              <option value="Hourly">Hourly</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
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
              {isLoading ? 'Updating...' : 'Update Subtask'}
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

export default EditSubtaskModal;
