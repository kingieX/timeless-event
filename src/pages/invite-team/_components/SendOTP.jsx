import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Logo from '/image/logo.png';
import CodeInput from '../../../components/CodeInput';

const SendOTP = () => {
  const [codeSent, setCodeSent] = useState(false); // Track if code was sent
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [countdown, setCountdown] = useState(0); // Timer countdown for the resend code button
  const [showVerificationMessage, setShowVerificationMessage] = useState(false); // Control visibility of verification message
  const [verificationCode, setVerificationCode] = useState(''); // Store the verification code
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error handling for resend OTP
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Extract userId and phone_no from cookies
  const userId = Cookies.get('userId');
  const phone_no = Cookies.get('phone_no');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (codeSent) {
      setShowVerificationMessage(false); // Hide the message when the countdown ends
    }
  }, [countdown, codeSent]);

  // Function to send OTP using userId and phone_no from cookies
  const handleSendOtp = async () => {
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
        setCountdown(60); // Start 60 seconds countdown
        setCodeSent(true);
        setShowVerificationMessage(true); // Show verification message
        console.log(`Code sent to +${phone_no}`);
      } else {
        setError('Failed to send OTP.');
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('An error occurred while sending OTP.');
    }
  };

  // Function to verify OTP and then update user data
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step 1: Verify OTP
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
        console.log('OTP verified successfully');

        // Step 2: Update user data to set is_active to true
        const postData = { is_active: true };

        const updateResponse = await fetch(`${BASE_URL}/user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        if (updateResponse.ok) {
          console.log('User updated successfully');
          // Step 3: Navigate to the success page
          navigate('/team/success-page');
        } else {
          console.error('Failed to update user');
        }
      } else {
        console.error('Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error during verification or updating:', error);
    }

    setIsSubmitting(false); // Reset submission state
  };

  // Function to refresh OTP (resend the code)
  const handleRefreshCode = async () => {
    handleSendOtp(); // Call the resend OTP function using userId and phone_no from cookies
  };

  return (
    <>
      <div className="fixed z-20 w-full bg-white flex items-center shadow-md py-4 lg:px-8 px-4">
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
            Enter the 6-digit verification code sent to your phone number.
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-2">
            <>
              <CodeInput
                codeLength={6}
                onCodeChange={setVerificationCode} // Update the verification code state
              />
              <button
                type="button"
                onClick={handleRefreshCode}
                className="text-primary text-sm mt-2 hover:underline"
                disabled={countdown > 0} // Disable refresh until countdown is over
              >
                {countdown > 0 ? `${countdown}s` : 'Resend OTP'}
              </button>
            </>
            <button
              type="submit"
              className={`w-full bg-primary text-black font-semibold py-2 px-4 transition duration-300 text-base md:text-lg lg:text-xl md:py-3 lg:py-4
                ${isSubmitting ? 'bg-gray cursor-not-allowed' : 'hover:bg-transparent hover:border hover:border-primary hover:text-primary'}`}
              disabled={isSubmitting} // Disable the button during submission
            >
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </button>
            {showVerificationMessage && (
              <p className="text-green-500 mt-1">
                Verification code sent to +{phone_no}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SendOTP;
