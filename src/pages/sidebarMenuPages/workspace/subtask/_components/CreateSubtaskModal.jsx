import React, { useState } from 'react';
import Cookies from 'js-cookie';

const CreateSubtaskModal = ({ taskId, onClose }) => {
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [shareLink, setShareLink] = useState(false);
  const [status, setStatus] = useState('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const requestBody = {
      description,
      frequency,
      share_link: shareLink.toString(), // Share link must be "true" or "false"
      status,
    };

    console.log('requestBody: ', requestBody);

    try {
      const response = await fetch(
        `${API_BASE_URL}/subtask/${taskId}/create-subtask`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSuccess('Subtask created successfully!');
        setTimeout(() => {
          onClose();
          window.location.reload(); // Trigger task data refresh
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create subtask');
      }
    } catch (error) {
      console.error('Error creating subtask:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 w-full m-8 overflow-y-auto h-[80vh] border border-gray max-w-xl rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create Subtask</h2>

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
              {/* You can add more frequency options here */}
            </select>
          </div>

          {/* Share Link Toggle */}
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-2">Share Link</label>
            <input
              type="checkbox"
              checked={shareLink}
              onChange={() => setShareLink(!shareLink)}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
          </div>

          {/* Status Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              disabled={isLoading}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
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
              {isLoading ? 'Creating...' : 'Create Subtask'}
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

export default CreateSubtaskModal;
