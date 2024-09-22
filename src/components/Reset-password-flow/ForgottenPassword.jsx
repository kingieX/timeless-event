import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import Cookies from 'js-cookie';

const ForgottenPassword = () => {
  const [phone_number, setPhoneNumber] = useState(''); // Store the phone number
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  // const [showVerificationMessage, setShowVerificationMessage] = useState(false); // Control visibility of verification message
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL; // Load the base URL from .env

  // Function to handle user validation
  const handleUserValidation = async () => {
    try {
      // Send GET request to retrieve user data by email
      const userResponse = await fetch(
        `${BASE_URL}/user/phone_no?phone_no=${phone_number}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();
        console.log('Full User Response Data:', userData); // Log the response for debugging

        // Extract the user_id from the response
        const userId = userData?.user_id; // Adjust based on the response structure

        // Check if user_id exists
        if (!userId) {
          console.error('User ID not found in the response.');
          setMessage('User ID not found in the response.');
          return; // Stop further execution if user_id is missing
        }

        // Store userId, email and phone_number in cookies
        Cookies.set('userId', userId, { secure: true, sameSite: 'Strict' });
        Cookies.set('email', userData?.email, {
          secure: true,
          sameSite: 'Strict',
        });
        Cookies.set('phone_no', phone_number, {
          secure: true,
          sameSite: 'Strict',
        });

        // Send OTP to phone number using the userId
        await handleSendOtp(userId, phone_number);

        // Navigate to the OTP verification page
        navigate('/verify');
      } else {
        setMessage(
          'Failed to validate user, is this phone number registered to an account?'
        );
      }
    } catch (error) {
      console.error('Error fetching user data after validation:', error);
      setMessage('An error occurred after validation.');
    }
  };

  // Function to send OTP
  const handleSendOtp = async (userId, phone_no) => {
    try {
      const otpResponse = await fetch(
        `${BASE_URL}/user/resend-otp?user_id=${userId}&phone_number=${phone_no}&otp_type=sms`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (otpResponse.ok) {
        setLoading(true);
        setMessage('A verification code has been sent to your phone number.');
      } else {
        setMessage('Failed to send OTP, Please enter a valid phone number.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('An error occurred while sending OTP.');
    }
  };

  // Handle form submission
  const handleForgotPassword = async e => {
    e.preventDefault();

    if (phone_number && phone_number.length >= 8) {
      // Make a POST request to register user and then send OTP
      await handleUserValidation();
    } else {
      // alert('Please enter a valid phone number.');
      setMessage('Please enter a valid phone number.');
    }
  };

  // const handleForgotPassword = e => {
  //   e.preventDefault();
  //   if (phone_number) {
  //     // Logic to send reset link or code
  //     setMessage('A verification code has been sent to your phone number.');
  //     setTimeout(() => {
  //       navigate('/verify'); // Navigate to verification page
  //     }, 2000);
  //   } else {
  //     setMessage('Please enter a valid phone number.');
  //   }
  // };

  // Determine message color based on content
  const messageClass =
    message === 'A verification code has been sent to your phone number.'
      ? 'text-green-600 text-center'
      : 'text-red-600 text-center';

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
            Enter your phone number below, and a code will be sent to reset your
            password.
          </p>
          <form onSubmit={handleForgotPassword} className="w-full">
            <div className="w-full flex justify-between items-center border border-gray p-2">
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
          {message && <p className={`mt-4 ${messageClass}`}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgottenPassword;
