import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';
import FloatingLabelInput from '../FloatingLabelInput';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = e => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      navigate('/success');
    } else {
      setErrorMessage('Passwords do not match.');
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
        <div className="flex flex-col justify-center items- bg-white py-0 lg:py-10 lg:px-16 px-8 lg:border m-8 border-gray lg:shadow-lg rounded-md w-full max-w-md md:max-w-lg lg:max-w-2xl lg:mt-0 mt-20">
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
