import React, { useState } from 'react';
import Cookies from 'js-cookie';

const AssignUserModal = ({ subTaskId, onClose }) => {
  const [emails, setEmails] = useState(['']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const removeEmailField = index => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const checkUserExists = async email => {
    const response = await fetch(`${API_BASE_URL}/user/email?email=${email}`);
    if (!response.ok) {
      throw new Error('User not found.');
    }
    const data = await response.json();
    return data.user_id;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const userIds = await Promise.all(
        emails.map(email => email.trim() && checkUserExists(email.trim()))
      );

      const body = JSON.stringify(userIds.filter(Boolean));

      const response = await fetch(
        `${API_BASE_URL}/subtask/assign-users?sub_task_id=${subTaskId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to assign users.');
      }

      setSuccess('Users assigned successfully!');
      setTimeout(() => {
        onClose();
        window.location.reload(); // Optional: refresh the task data
      }, 2000);
    } catch (error) {
      console.error('Error assigning users:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Members to Task</h2>

        <form onSubmit={handleSubmit}>
          {emails.map((email, index) => (
            <div key={index} className="flex mb-4">
              <input
                type="email"
                value={email}
                onChange={e => handleEmailChange(index, e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Enter user email"
                required
              />
              <button
                type="button"
                onClick={() => removeEmailField(index)}
                className="ml-2 bg-red-500 text-white rounded p-2"
                disabled={isLoading || emails.length === 1}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addEmailField}
            className="mb-4 bg-blue-500 text-white rounded p-2"
            disabled={isLoading}
          >
            Add Another User
          </button>

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
              disabled={isLoading || emails.length === 0}
            >
              {isLoading ? 'Assigning...' : 'Assign Users'}
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AssignUserModal;
