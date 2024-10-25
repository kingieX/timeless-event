import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';
import CodeInput from '../CodeInput';
import Cookies from 'js-cookie'; // Assuming you're using js-cookie for cookie handling

const PasswordResetVerification = () => {
  // const [code, setCode] = useState(Array(6).fill('')); // Initialize the code as an array of 6 empty strings
  const [codeSent, setCodeSent] = useState(false); // Track if code was sent
  // const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null); // Error handling for resend OTP
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [countdown, setCountdown] = useState(0); // Timer countdown for the resend code button
  const [showVerificationMessage, setShowVerificationMessage] = useState(false); // Control visibility of verification message
  const [verificationCode, setVerificationCode] = useState(''); // Store the verification code
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL; // Load the base URL from .env

  // Extract userId and email from cookies
  const userId = Cookies.get('userId');
  const email = Cookies.get('email');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (codeSent) {
      setShowVerificationMessage(false); // Hide the message when the countdown ends
    }
  }, [countdown, codeSent]);

  // Function to send OTP using userId and email from cookies
  const handleSendOtp = async () => {
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

      if (otpResponse.ok) {
        // setLoading(true);
        setCountdown(60); // Start 60 seconds countdown
        setCodeSent(true);
        setShowVerificationMessage(true); // Show verification message
        console.log(`Code sent to ${email}`);
      } else {
        setError('Failed to send OTP.');
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('An error occurred while sending OTP.');
    }
  };

  // Function to verify OTP using query parameters
  const handleVerification = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Make a request using query parameters for OTP verification
      const response = await fetch(
        `${BASE_URL}/user/verify-otp?user_id=${userId}&otp_code=${verificationCode}&otp_type=sms`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log('email verified successfully');
        navigate('/reset-password');
      } else {
        console.error('Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }

    setIsSubmitting(false); // Reset submission state
  };

  // Function to refresh OTP (resend the code)
  const handleRefreshCode = async () => {
    handleSendOtp(); // Call the resend OTP function using userId and email from cookies
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:mb-2 mb-2">
            Verify Your Identity
          </h2>
          <p className="text-slate-600 text-center mb-6 text-base md:text-lg lg:text-xl">
            Enter the code sent to your phone number to verify your identity.
          </p>
          <form onSubmit={handleVerification}>
            {/* Use the reusable CodeInput component */}
            <CodeInput
              codeLength={6}
              onCodeChange={setVerificationCode} // Update the verification code state
            />

            <button
              type="submit"
              className={`w-full bg-primary text-black font-semibold py-2 px-4 mt-4 transition duration-300 text-base md:text-lg lg:text-xl md:py-3 lg:py-4
                ${isSubmitting ? 'bg-gray cursor-not-allowed' : 'hover:bg-transparent hover:border hover:border-primary hover:text-primary'}`}
              disabled={isSubmitting} // Disable the button during submission
            >
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </button>
          </form>
          <p
            className="mt-2 text-primary hover:underline cursor-pointer"
            onClick={handleRefreshCode}
          >
            Resend Code
          </p>
          {showVerificationMessage && (
            <p className="text-green-500 text-center mt-1">
              Verification code sent to {email}
            </p>
          )}
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetVerification;
