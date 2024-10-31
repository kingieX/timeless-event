import { useState } from 'react';
import Cookies from 'js-cookie';

const AddUsersModal = ({ folderId, onClose }) => {
  const [userInputs, setUserInputs] = useState([{ email: '', role: 'editor' }]); // Default role
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const access_token = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const inputs = [...userInputs];
    inputs[index][name] = value;
    setUserInputs(inputs);
  };

  const handleAddUserInput = () => {
    setUserInputs([...userInputs, { email: '', role: 'editor' }]); // Add a new input field
  };

  const handleRemoveUserInput = index => {
    const inputs = userInputs.filter((_, i) => i !== index);
    setUserInputs(inputs);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const requests = userInputs.map(async user => {
        // Fetch user_id by email
        const userResponse = await fetch(
          `${API_BASE_URL}/user/email?email=${user.email}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error(`User not found: ${user.email}`);
        }

        const userData = await userResponse.json();
        const userId = userData.user_id;

        return {
          user_id: userId,
          user_role: user.role,
        };
      });

      // Wait for all user requests to resolve
      const userAssignments = await Promise.all(requests);

      // Prepare the request body as an array
      const requestBody = userAssignments; // No wrapping in an object

      // Share the folder
      const shareResponse = await fetch(
        `${API_BASE_URL}/folder/${folderId}/assign-users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(requestBody), // Send as a plain array
        }
      );

      if (shareResponse.ok) {
        setSuccess('Users added successfully!');
        setUserInputs([{ email: '', role: 'editor' }]); // Reset the form
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        const errorData = await shareResponse.json();
        throw new Error(errorData.message || 'Failed to add users');
      }
    } catch (error) {
      console.error('Error adding users:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 mx-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Users to Folder</h2>

        <form onSubmit={handleSubmit}>
          {userInputs.map((input, index) => (
            <div key={index} className="flex mb-4">
              <div className="flex-1 mr-2">
                <label className="block text-gray-700 mb-2">User Email</label>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={e => handleInputChange(index, e)}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex-1 mr-2">
                <label className="block text-gray-700 mb-2">User Role</label>
                <select
                  name="role"
                  value={input.role}
                  onChange={e => handleInputChange(index, e)}
                  className="border border-gray-300 p-2 rounded w-full"
                  disabled={isLoading}
                >
                  <option value="owner">Owner</option>
                  <option value="manager">Manager</option>
                  <option value="task_lead">Task Lead</option>
                  <option value="contributor">Contributor</option>
                  <option value="editor">Editor</option>
                  <option value="reviewer">Reviewer</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveUserInput(index)}
                className="mt-8 text-red-500 hover:underline"
                disabled={isLoading}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddUserInput}
            className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Users'}
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddUsersModal;
