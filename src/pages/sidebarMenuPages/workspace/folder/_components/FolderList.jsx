import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import EditFolderModal from './EditFolderModal'; // Import EditFolderModal

const FolderList = () => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null); // Track which dropdown is open
  const [editFolder, setEditFolder] = useState(null); // Track folder being edited

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const accessToken = Cookies.get('access_token');

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/folder/folders/user`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setFolders(response.data);
      } catch (err) {
        console.error('Error fetching folders:', err);
        setError('Failed to fetch folders. Please try again.');
      }
    };

    fetchFolders();
  }, []);

  const handleEditFolder = folder => {
    setEditFolder(folder); // Set folder to be edited
  };

  const handleDeleteFolder = async folderId => {
    if (window.confirm('Are you sure you want to delete this folder?')) {
      try {
        await axios.delete(`${API_BASE_URL}/folder/${folderId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setFolders(folders.filter(folder => folder.folder_id !== folderId));
        console.log('Folder deleted successfully');
      } catch (err) {
        console.error('Error deleting folder:', err);
        setError('Failed to delete folder.');
      }
    }
  };

  const toggleDropdown = folderId => {
    setShowDropdown(showDropdown === folderId ? null : folderId);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {folders.length > 0 ? (
        <ul className="py-2 mb-12 grid lg:grid-cols-2 grid-cols-1 gap-4">
          {folders.map(folder => (
            <div key={folder.folder_id} className="relative">
              <Link
                to={`/app/workspace/${folder.team_space_id}/folders/${folder.folder_id}`}
                className="flex justify-between items-center border rounded-lg p-4 hover:bg-blue-50"
              >
                <div className="flex gap-4 items-center">
                  <IoFolderOpenOutline className="w-6 h-6 text-primary" />
                  <span>{folder.folder_name}</span>
                </div>
              </Link>
              <button
                className="absolute right-4 top-4"
                onClick={() => toggleDropdown(folder.folder_id)}
              >
                <FiMoreVertical className="w-5 h-5 cursor-pointer" />
              </button>
              {showDropdown === folder.folder_id && (
                <div className="absolute z-50 right-4 top-10 w-40 bg-white border rounded-lg shadow-lg">
                  <button
                    // onClick={() => handleEditFolder(folder)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                  >
                    Assign to user
                  </button>

                  <button
                    onClick={() => handleEditFolder(folder)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                  >
                    Edit Folder
                  </button>

                  <button
                    onClick={() => handleDeleteFolder(folder.folder_id)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600 cursor-pointer"
                  >
                    Delete Folder
                  </button>
                </div>
              )}
            </div>
          ))}
        </ul>
      ) : (
        <p>No folders found.</p>
      )}

      {/* Render the EditFolderModal if editFolder is set */}
      {editFolder && (
        <EditFolderModal
          folder={editFolder}
          onClose={() => setEditFolder(null)} // Close modal on close
          onUpdate={updatedFolder => {
            setFolders(
              folders.map(folder =>
                folder.folder_id === updatedFolder.folder_id
                  ? updatedFolder
                  : folder
              )
            );
            setEditFolder(null); // Close modal after update
          }}
        />
      )}
    </div>
  );
};

export default FolderList;
