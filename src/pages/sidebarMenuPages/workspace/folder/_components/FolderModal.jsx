import { useState } from 'react';

const FolderModal = ({ onClose }) => {
  const [folderName, setFolderName] = useState('');

  const handleFolderNameChange = e => {
    setFolderName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // We'll handle the POST request to add the folder here later
    console.log('Folder Name:', folderName);
    closeModal(); // Close modal after submitting
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
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 py-2 px-4 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-primary text-white rounded"
            >
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FolderModal;
