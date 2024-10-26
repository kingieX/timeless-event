import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const FolderList = () => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const accessToken = Cookies.get('access_token');

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        // Get access token from cookies

        // Make GET request to fetch folders
        const response = await axios.get(
          `${API_BASE_URL}/folder/folders/user`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Map response and set folders state
        setFolders(response.data);
      } catch (err) {
        console.error('Error fetching folders:', err);
        setError('Failed to fetch folders. Please try again.');
      }
    };

    fetchFolders();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {folders.length > 0 ? (
        <ul className="py-2 mb-4 grid lg:grid-cols-2 grid-cols-1 gap-4">
          {folders.map(folder => (
            <Link
              key={folder.folder_id}
              to={`/app/workspace/${folder.team_space_id}/folders/${folder.folder_id}`}
              className="flex justify-between items-center border rounded-lg p-4 hover:bg-blue-50"
            >
              <li className="">
                <div className="flex gap-4">
                  <IoFolderOpenOutline className="w-6 h-6 text-primary" />
                  <span>{folder.folder_name}</span>
                </div>
                {/* Add icons, actions, or other elements as needed */}
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No folders found.</p>
      )}
    </div>
  );
};

export default FolderList;
