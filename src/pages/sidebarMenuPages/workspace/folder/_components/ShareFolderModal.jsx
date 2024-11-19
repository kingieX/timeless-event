import { useState } from 'react';
import Cookies from 'js-cookie';

const ShareFolderModal = ({ folderId, onClose }) => {
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('editor'); // Default role
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const access_token = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleRoleChange = e => {
    setUserRole(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Fetch user_id by email
      const userResponse = await fetch(
        `${API_BASE_URL}/user/email?email=${email}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (!userResponse.ok) {
        throw new Error('User not found'); // Handle user not found
      }

      const userData = await userResponse.json();
      const userId = userData.user_id;

      // Prepare the request body as per the new requirement
      const requestBody = {
        users: [
          {
            user_id: userId,
            user_role: userRole,
          },
        ],
      };

      // Share the folder
      const shareResponse = await fetch(
        `${API_BASE_URL}/folder/${folderId}/share-folder-to-users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (shareResponse.ok) {
        setSuccess('Folder shared successfully!');
        // Optionally reset form or close modal
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        const errorData = await shareResponse.json();
        throw new Error(errorData.message || 'Failed to share folder');
      }
    } catch (error) {
      console.error('Error sharing folder:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Share Folder</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">User Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="border border-gray-300 p-2 rounded w-full"
              required
              disabled={isLoading} // Disable input when loading
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">User Role</label>
            <select
              value={userRole}
              onChange={handleRoleChange}
              className="border border-gray-300 p-2 rounded w-full"
              disabled={isLoading} // Disable select when loading
            >
              <option value="owner">Owner</option>
              <option value="manager">Manager</option>
              <option value="task_lead">Task Lead</option>
              <option value="contributor">Contributor</option>
              <option value="editor">Editor</option>
              <option value="reviewer">Reviewer</option>
            </select>
          </div>
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={onClose}
              className="border mr-2 border-red-400 text-red-400 font-semibold py-2 px-4 hover:bg-red-400 hover:text-white transition duration-300"
              disabled={isLoading} // Disable when loading
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              disabled={isLoading} // Disable when loading
            >
              {isLoading ? 'Sharing...' : 'Share Folder'}
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

export default ShareFolderModal;
