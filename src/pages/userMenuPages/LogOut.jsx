/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutImage from '/image/logout.svg';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// Reusable Modal Component
const Modal = ({ show, onClose, onConfirm, isLoading }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 lg:w-96 text-center mx-8 py-8">
        <img
          src={LogoutImage}
          alt="Logout Icon"
          className="mx-auto mb-4 py-2"
        />
        <h2 className="lg:text-2xl lg:font-semibold mb-4">
          Are you sure you want to log out?
        </h2>
        <div className="flex justify-around gap-4">
          <button
            className="lg:w-1/2 w-full border border-red-400 text-red-400 font-semibold py-2 px-4 hover:bg-red-400 hover:text-white transition duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Logout Page Component
const Logout = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const navigate = useNavigate();

  const token = Cookies.get('access_token');

  useEffect(() => {
    // Show the modal when the component mounts
    setShowModal(true);
  }, []);

  const handleCancel = () => {
    setShowModal(false);
    navigate('/dashboard'); // Redirect to the dashboard or any other page
  };

  const handleConfirm = async () => {
    setIsLoading(true); // Start loading
    try {
      // Send POST request to logout route
      const response = await fetch(`${API_BASE_URL}/user/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });

      if (response.ok) {
        // Successfully logged out
        console.log('User logged out');
        navigate('/'); // Navigate to home or login page after logout
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoading(false); // Hide loading state after logout
      Cookies.remove('access_token'); // Remove access token from cookies
      Cookies.remove('token_id'); // Remove token ID from cookies
      Cookies.remove('refresh_token'); // Remove refresh token from cookies
      Cookies.remove('email'); // Remove email from cookies
      Cookies.remove('userId'); // Remove user ID from cookies
    }
  };

  return (
    <div>
      <Modal
        show={showModal}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        isLoading={isLoading} // Pass loading state to modal
      />
    </div>
  );
};

export default Logout;
