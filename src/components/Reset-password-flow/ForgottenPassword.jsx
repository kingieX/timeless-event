import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';
import FloatingLabelInput from '../FloatingLabelInput';

const ForgottenPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = e => {
    e.preventDefault();
    if (email) {
      // Logic to send reset link or code
      setMessage('A verification code has been sent to your email.');
      setTimeout(() => {
        navigate('/verify'); // Navigate to verification page
      }, 2000);
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  // Determine message color based on content
  const messageClass =
    message === 'A verification code has been sent to your email.'
      ? 'text-green-600'
      : 'text-red-600';

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

      <div className="flex items-center justify-center lg:min-h-screen">
        <div className="flex flex-col justify-center items- bg-white py-0 lg:py-10 lg:px-16 px-8 lg:border m-8 border-gray lg:shadow-lg rounded-md w-full max-w-md md:max-w-lg lg:max-w-2xl lg:mt-0 mt-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:mb-2 mb-2">
            Forgot Your Password?
          </h2>
          <p className="text-slate-600 text-center mb-6 text-base md:text-lg lg:text-xl">
            Enter your email address below, and a code will be sent to reset
            your password.
          </p>
          <form onSubmit={handleForgotPassword} className="w-full">
            <FloatingLabelInput
              id="email"
              type="email"
              label="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-black font-semibold py-2 px-4 lg:mt-6 mt-4 w-full hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            >
              Reset Password
            </button>
          </form>
          <p className="lg:text-left text-center text-gray-700 mt-2">
            Remember Password?{' '}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              login
            </Link>
          </p>
          {message && <p className={`mt-4 ${messageClass}`}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgottenPassword;
