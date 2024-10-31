import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import EditFolderModal from './EditFolderModal'; // Import EditFolderModal
import ShareFolderModal from './ShareFolderModal';
import AddUsersModal from './AddUsersModal';

const FolderList = () => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null); // Track which dropdown is open
  const [editFolder, setEditFolder] = useState(null); // Track folder being edited
  const [folderToShare, setFolderToShare] = useState(null); // Track folder to be shared
  const [usersToAdd, setUsersToAdd] = useState(null); // Track folder to add users
  const dropdownRef = useRef(null);

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
        console.log('Fetched folders:', response.data);
      } catch (err) {
        console.error('Error fetching folders:', err);
        setError('Failed to fetch folders. Please try again.');
      }
    };

    fetchFolders();
  }, []);

  // function to close deopdown when clicked outside of the page
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(null); // Close dropdown if clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddUsers = folderId => {
    setUsersToAdd(folderId); // Set folder ID to add users
  };

  const handleShareFolder = folderId => {
    setFolderToShare(folderId); // Set folder ID to be shared
  };

  const handleEditFolder = folder => {
    setEditFolder(folder); // Set folder to be edited
  };

  const handleDeleteFolder = async folderId => {
    if (window.confirm('Are you sure you want to delete this folder?')) {
      try {
        await axios.delete(`${API_BASE_URL}/folder/${folderId}/delete-folder`, {
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
                className="absolute z-40 right-4 top-4"
                onClick={() => toggleDropdown(folder.folder_id)}
              >
                <FiMoreVertical className="w-5 h-5 cursor-pointer" />
              </button>
              {showDropdown === folder.folder_id && (
                <ul
                  ref={dropdownRef}
                  className="absolute z-50 right-4 top-10 w-40 bg-white border rounded-lg shadow-lg"
                >
                  <li
                    onClick={() => handleShareFolder(folder.folder_id)} // Pass folder ID here
                    className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Share to user
                  </li>

                  <li
                    onClick={() => handleAddUsers(folder.folder_id)} // Pass folder ID here
                    className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Add users to folder
                  </li>

                  <li
                    onClick={() => handleEditFolder(folder)}
                    className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Edit Folder
                  </li>

                  <li
                    onClick={() => handleDeleteFolder(folder.folder_id)}
                    className="flex w-full items-center space-x-2 p-2 text-red-500 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Delete Folder
                  </li>
                </ul>
              )}
            </div>
          ))}
        </ul>
      ) : (
        <p>No folders found.</p>
      )}

      {/* Render the AddUsersModal if usersToAdd is set */}
      {usersToAdd && (
        <AddUsersModal
          folderId={usersToAdd} // Pass the folder ID
          onClose={() => setUsersToAdd(null)} // Close modal on close
        />
      )}

      {/* Render the ShareFolderModal if folderToShare is set */}
      {folderToShare && (
        <ShareFolderModal
          folderId={folderToShare} // Pass the folder ID
          onClose={() => setFolderToShare(null)} // Close modal on close
        />
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
