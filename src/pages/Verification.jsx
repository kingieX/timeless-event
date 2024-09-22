import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import Logo from '/image/logo.svg';
import Cookies from 'js-cookie';

const VerificationPage = () => {
  const [phone_number, setPhoneNumber] = useState(''); // Store the phone number
  const [loading, setLoading] = useState(false); // Track loading state
  const [showVerificationMessage, setShowVerificationMessage] = useState(false); // Control visibility of verification message
  const [error, setError] = useState(null); // Handle errors
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL; // Load the base URL from .env

  // Retrieve email and password from cookies
  const email = Cookies.get('email');
  const password = Cookies.get('password');

  // Function to handle the complete POST request to register the user
  const handleRegisterUser = async () => {
    try {
      setLoading(true);

      const requestBody = {
        fullname: '', // Fill this as needed
        role: 'user',
        reason_for_use: 'work', // Fill this as needed
        email: email,
        phone_no: phone_number,
        is_active: false,
        provider: '', // Fill this as needed
        provider_id: '', // Fill this as needed
        avatar_url: '', // Fill this as needed
        password: password,
      };

      console.log('Request Body:', requestBody);

      // Make POST request to register the user
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json(); // Parse the response
      console.log('Server Response:', responseData); // Log the server's response

      if (response.ok) {
        // If the registration is successful, fetch the user ID using the email
        await handlePostRegistration();
      } else {
        // If registration fails due to email duplication or another error
        setError(
          'phone number already exist, please input a new phone number.'
        );
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to handle post-registration tasks
  const handlePostRegistration = async () => {
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

        // Store userId and phone_number in cookies
        Cookies.set('userId', userId, { secure: true, sameSite: 'Strict' });
        Cookies.set('phone_no', phone_number, {
          secure: true,
          sameSite: 'Strict',
        });

        // Send OTP to phone number using the userId
        await handleSendOtp(userId, phone_number);

        // Navigate to the OTP verification page
        navigate('/otp-verification');
      } else {
        setError('Failed to retrieve user after registration.');
      }
    } catch (error) {
      console.error('Error fetching user data after registration:', error);
      setError('An error occurred after registration.');
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
        setShowVerificationMessage(true); // Show verification message
      } else {
        setError('Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('An error occurred while sending OTP.');
    }
  };

  // Handle form submission
  const handleFormSubmit = async e => {
    e.preventDefault();

    if (phone_number && phone_number.length >= 8) {
      // Make a POST request to register user and then send OTP
      await handleRegisterUser();
    } else {
      alert('Please enter a valid phone number.');
    }
  };

  return (
    <>
      <div className="flex items-center shadow-md py-4 lg:px-8 px-4">
        {/* Logo and Name */}
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>

      <div className="flex justify-center items-center lg:min-h-screen">
        <div className="flex flex-col justify-center items-center bg-white py-8 lg:px-12 px-8 lg:border m-8 border-gray lg:shadow-lg rounded-md w-full max-w-md md:max-w-lg lg:max-w-2xl lg:mt-0 mt-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:mb-2 mb-2">
            Verify Your Account
          </h2>
          <p className="text-gray-600 text-center mb-6 text-base md:text-lg lg:text-xl">
            Enter your phone number to receive a 6-digit verification code.
          </p>
          <form className="w-full space-y-2" onSubmit={handleFormSubmit}>
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
              className="bg-primary text-black font-semibold py-2 px-4 w-full hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              disabled={loading}
            >
              {loading ? 'Sending Code...' : 'Send Code'}
            </button>
            {showVerificationMessage && (
              <p className="text-primary mt-1">Verification code sent</p>
            )}
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </form>
          <p className="lg:text-left text-center text-gray-700 mt-4">
            Already signed up?{' '}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Go to login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default VerificationPage;
