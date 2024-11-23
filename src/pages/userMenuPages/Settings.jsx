import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [userDetails, setUserDetails] = useState({
    fullname: '',
    email: '',
    phone_no: '',
    role: '',
    avatar_url: '',
  });
  const [initialDetails, setInitialDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const accessToken = Cookies.get('access_token');
  const userId = Cookies.get('user_id');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
          setInitialDetails(data);
          console.log('Fetched Details:', data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch user details');
        }
      } catch (err) {
        setError('Error fetching user details');
      }
    };

    fetchUserDetails();
  }, [userId, accessToken]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
    setIsEditing(true);
    setSuccess('');
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess('User details updated successfully');
        setInitialDetails(userDetails); // Save the updated details
        setIsEditing(false); // Stop editing after successful update
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update user details');
      }
    } catch (error) {
      setError('Error updating user details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setUserDetails(initialDetails); // Revert to initial state
    setIsEditing(false); // Hide Save and Cancel buttons
  };

  // Open the password change modal
  const handleChangePasswordClick = () => {
    setIsModalOpen(true);
  };

  // Handle the password change
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match!');
      return;
    }

    setPasswordError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userDetails.email, // Send the email fetched earlier
          new_password: newPassword, // Send the new password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Password changed successfully!');
        setIsModalOpen(false); // Close the modal on success
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to change password');
      }
    } catch (error) {
      setError('Error changing password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:p-10 py-1 lg:px-10 px-4">
      <div className="settings-header flex justify-between items-center">
        <h2 className="text-2xl">Settings</h2>
        <button className="bg-primary mb-4 text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300">
          Manage Plan
        </button>
      </div>

      {/* User Details Form */}
      <div className="px-4">
        <label className="block mb-2">Full Name</label>
        <input
          type="text"
          name="fullname"
          value={userDetails.fullname}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Phone Number</label>
        <input
          type="text"
          name="phone_no"
          value={userDetails.phone_no}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Role</label>
        <select
          name="role"
          value={userDetails.role}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      {/* Change Password Button */}
      <div className="px-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 transition duration-300"
          onClick={handleChangePasswordClick}
        >
          Change Password
        </button>
      </div>

      {/* Password Change Modal */}
      {isModalOpen && (
        <div className="modal bg-gray-700 bg-opacity-50 fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>

            <label className="block mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="border p-2 w-full mb-4"
            />

            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="border p-2 w-full mb-4"
            />

            {passwordError && (
              <p className="text-red-500 text-sm mb-4">{passwordError}</p>
            )}

            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handlePasswordChange}
                disabled={isLoading}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save and Cancel buttons */}
      {isEditing && (
        <div className="flex justify-end items-center space-x-4">
          <button
            onClick={handleCancel}
            className="border border-red-400 text-red-400 font-semibold py-2 px-4 hover:bg-red-400 hover:text-white transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            disabled={isLoading}
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Success or Error Messages */}
      {error && (
        <div className="mx-4 text-center w-full mb-4 p-2 bg-red-100 text-red-500 border border-red-400 rounded mt-4">
          {error}
        </div>
      )}
      {success && (
        <div className="mx-4 py-2 px-4 text-green-500 border border-green-500 text-center my-4 rounded">
          {success}
        </div>
      )}
    </div>
  );
};

export default Settings;
