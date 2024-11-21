import React, { useState } from 'react';
import Cookies from 'js-cookie';

const UpdateAccessModal = ({ projectId, onClose }) => {
  const [accessLevel, setAccessLevel] = useState('public'); // Default access level
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleAccessChange = e => {
    setAccessLevel(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/project/projects/${projectId}/access`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ access: accessLevel }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update access');
      }

      setSuccess('Access updated successfully!');
      setTimeout(() => {
        onClose();
        window.location.reload(); // Trigger project data refresh
      }, 2000);
    } catch (error) {
      console.error('Error updating access:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Update Project Access</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Access Level</label>
            <select
              value={accessLevel}
              onChange={handleAccessChange}
              className="border border-gray-300 p-2 rounded w-full"
              disabled={isLoading}
            >
              <option value="private">Private</option>
              <option value="restricted">Restricted</option>
              <option value="public">Public</option>
              <option value="team_only">Team Only</option>
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
              {isLoading ? 'Updating...' : 'Update Access'}
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

export default UpdateAccessModal;
