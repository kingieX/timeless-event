import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function FolderDetailPage() {
  const { folderId } = useParams();
  const [folder, setFolder] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const accessToken = Cookies.get('access_token');

  useEffect(() => {
    const fetchFolderDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/folder/${folderId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Get the token from cookies
          },
        });
        setFolder(response.data);
      } catch (error) {
        console.error('Error fetching folder details:', error);
      }
    };
    fetchFolderDetails();
  }, [folderId]);

  if (!folder) return <p>Loading...</p>;

  return (
    <div>
      <h1>{folder.name}</h1>
      <p>{folder.description}</p>
      {/* Add more folder details and actions here */}
    </div>
  );
}

export default FolderDetailPage;
