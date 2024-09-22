import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';
import FloatingLabelInput from '../FloatingLabelInput';
import Cookies from 'js-cookie'; // Assuming you're using js-cookie for cookie handling

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Handle the password reset form submission
  const handleResetPassword = async e => {
    e.preventDefault();

    // Retrieve email from cookies
    const email = Cookies.get('email');
    if (!email) {
      setErrorMessage('Email not found in cookies.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const requestBody = {
        email: email,
        password: newPassword,
      };

      // POST request to reset the password
      const response = await fetch(`${API_BASE_URL}/user/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Navigate to success page if the password was successfully reset
        navigate('/success');
      } else {
        const responseData = await response.json();
        setErrorMessage(responseData?.message || 'Failed to reset password.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center shadow-md py-4 lg:px-8 px-4">
        {/* Logo and Name */}
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>

      <div className="lg:min-h-screen flex items-center justify-center">
        <div className="flex flex-col justify-center bg-white py-0 lg:py-10 lg:px-16 px-8 lg:border m-8 border-gray lg:shadow-lg rounded-md w-full max-w-md md:max-w-lg lg:max-w-2xl lg:mt-0 mt-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:mb-8 mb-6">
            Reset Your Password
          </h2>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <FloatingLabelInput
              id="new-password"
              type="password"
              label="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <FloatingLabelInput
              id="confirm-password"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-black font-semibold py-2 px-4 lg:mt-8 mt-2 w-full hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            >
              Reset Password
            </button>
          </form>
          {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
