import { useState } from 'react';
import Cookies from 'js-cookie';
// import { createFolder } from '../../../../../../routes/folder-routes';

const FolderModal = ({ onClose, workspaceData, workspaceId }) => {
  const [folderName, setFolderName] = useState('');
  const [isLoading, setIsLoading] = useState(false); // loading state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const access_token = Cookies.get('access_token'); // Assuming the token is in cookies
  const user_id = Cookies.get('user_id'); // Assuming the user_id is in cookies
  const API_BASE_URL = import.meta.env.VITE_BASE_URL; // Base URL for your API

  const handleFolderNameChange = e => {
    setFolderName(e.target.value);
  };

  // const handleSubmit = (async e => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError(''); // Reset error message
  //   setSuccess(''); // Reset success message

  //   try {
  //     const newFolder = await createFolder(folderName, user_id, workspaceId);
  //     console.log('Created Folder:', newFolder);
  //     if (response.ok) {
  //       const result = await response.json();
  //       setSuccess('Folder created successfully!');
  //       // Optionally reset form or close modal
  //       setFolderName(''); // Reset folder name
  //       setTimeout(() => {
  //         onClose();
  //       }, 2000);
  //     } else {
  //       setError('Failed to create folder');
  //     }
  //   } catch (error) {
  //     setError(error.message); // Set error message to display
  //   } finally {
  //     setIsLoading(false);
  //   }
  // })();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Reset error message
    setSuccess(''); // Reset success message

    const requestBody = {
      folder_name: folderName,
      user_id: user_id,
      team_space_id: workspaceId, // Get workspaceId from prop
    };

    try {
      const response = await fetch(`${API_BASE_URL}/folder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`, // Send token in Authorization header
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess('Folder created successfully!');
        console.log('Folder created:', result);

        // Optionally reset form or close modal
        setFolderName(''); // Reset folder name
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create folder');
      }
    } catch (error) {
      console.error('Error creating folder:', error);
      setError(error.message); // Set error message to display
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create Folder</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Folder Name</label>
            <input
              type="text"
              value={folderName}
              onChange={handleFolderNameChange}
              className="border border-gray-300 p-2 rounded w-full"
              required
              disabled={isLoading} // Disable input when loading
            />
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
              {isLoading ? 'Creating...' : 'Create Folder'}
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

export default FolderModal;
