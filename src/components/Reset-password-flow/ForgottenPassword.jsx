import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.png';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import Cookies from 'js-cookie';
import FloatingLabelInput from '../FloatingLabelInput';

const ForgottenPassword = () => {
  const [phone_number, setPhoneNumber] = useState(''); // Store the phone number
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  // const [showVerificationMessage, setShowVerificationMessage] = useState(false); // Control visibility of verification message
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL; // Load the base URL from .env

  // Function to handle user validation
  const handleUserValidation = async () => {
    try {
      // Send GET request to retrieve user data by email
      const userResponse = await fetch(
        `${BASE_URL}/user/email?email=${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // console.log(email);

      if (userResponse.ok) {
        const userData = await userResponse.json();
        console.log('Full User Response Data:', userData); // Log the response for debugging

        // Extract the user_id from the response
        const userId = userData?.user_id; // Adjust based on the response structure

        // Check if user_id exists
        if (!userId) {
          console.error('User ID not found in the response.');
          setError('User ID not found in the response.');
          return; // Stop further execution if user_id is missing
        }

        // Store userId, email and phone_number in cookies
        Cookies.set('userId', userId, { secure: true, sameSite: 'Strict' });
        Cookies.set('email', userData?.email, {
          secure: true,
          sameSite: 'Strict',
        });

        setMessage('A verification code has been sent to your email.');
        // Send OTP to email using the userId
        await handleSendOtp(userId, email);

        // Navigate to the OTP verification page
        setTimeout(() => {
          navigate('/verify');
        }, 2000);
      } else {
        setError(
          'Failed to validate user, is this phone number registered to an account?'
        );
      }
    } catch (error) {
      console.error('Error fetching user data after validation:', error);
      setError('An error occurred after validation.');
    }
  };

  // Function to send OTP
  const handleSendOtp = async (userId, email) => {
    setLoading(true);

    try {
      const otpResponse = await fetch(
        `${BASE_URL}/user/resend-otp?user_id=${userId}&email=${email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('email gotten for ForgottenPassword', email);

      if (otpResponse.ok) {
        setLoading(true);
        setMessage('A verification code has been sent to your email.');
      } else {
        setError('Failed to send OTP, Please enter a valid email.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('An error occurred while sending OTP.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle form submission
  const handleForgotPassword = async e => {
    e.preventDefault();

    await handleUserValidation();
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

      <div className="flex items-center justify-center lg:min-h-screen">
        <div className="flex flex-col justify-center items- bg-white py-0 lg:py-10 lg:px-16 px-8 lg:border m-8 border-gray lg:shadow-lg rounded-md w-full max-w-md md:max-w-lg lg:max-w-2xl lg:mt-0 mt-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:mb-2 mb-2">
            Forgot Your Password?
          </h2>
          <p className="text-slate-600 text-center mb-6 text-base md:text-lg lg:text-xl">
            Enter your email below, and a code will be sent to reset your
            password.
          </p>
          <form onSubmit={handleForgotPassword} className="w-full">
            {/* <div className="w-full flex justify-between items-center border border-gray p-2">
              <PhoneInput
                country={'ng'}
                value={phone_number}
                onChange={setPhoneNumber}
                inputClass="text-xl w-full"
                buttonClass=""
                inputStyle={{
                  width: '100%',
                  border: 'none',
                  paddingLeft: '58px',
                }} // Removed border, padded for the flag and code
              />
            </div> */}
            <div className="w-full flex justify-between items-center mb-4">
              <FloatingLabelInput
                label="Email"
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-black font-semibold py-2 px-4 lg:mt-6 mt-4 w-full hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            >
              {/* Reset Password */}
              {loading ? 'Sending Code...' : 'Send Code'}
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
          {message && (
            <p className="mt-4 text-center text-green-600">{message}</p>
          )}
          {error && <p className="mt-4 text-center text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgottenPassword;
