import axios from 'axios';
import Cookies from 'js-cookie';

// Base URL for the folder API
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const BASE_URL = `${API_BASE_URL}/folder`;

// Retrieve Access Tokem from Cookies
const accessToken = Cookies.get('access_token');

// Axios instance for reusable configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`, // Get the token from cookies
  },
});

// Function to handle API errors
const handleApiError = error => {
  if (error.response) {
    console.error(
      'Error: ${error.response.status} - ${error.response.data.message}'
    );
  } else if (error.request) {
    console.error('No response from server.');
  } else {
    console.error('Error', error.message);
  }
  throw error;
};

// Function to create a new folder
export const createFolder = async (folderName, user_id, workspaceId) => {
  try {
    const requestBody = {
      folder_name: folderName,
      user_id: user_id,
      team_space_id: workspaceId,
    };

    const response = await apiClient.post('/', requestBody);
    console.log('Folder created successfully:', response.data);
    return response.data; // Returns the created folder's details
  } catch (error) {
    handleApiError(error);
  }
};
