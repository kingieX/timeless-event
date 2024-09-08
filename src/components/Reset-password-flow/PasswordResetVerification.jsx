import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';
import CodeInput from '../CodeInput';

const PasswordResetVerification = () => {
  const [code, setCode] = useState(Array(6).fill('')); // Initialize the code as an array of 6 empty strings
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const navigate = useNavigate();

  // Handle form submission and verification
  const handleVerification = e => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // const verificationCode = code.join(''); // Convert the array of code digits to a single string
      // if (verificationCode === '123456') {
      // Replace with actual verification logic
      navigate('/reset-password');
      // } else {
      setErrorMessage(
        'Invalid code. Please try again. Code is 123456 for testing purposes'
      );
      // }
    }, 2000);
  };

  // Handle resending the code
  const resendCode = () => {
    alert('Code resent to your email.');
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
            Enter the code sent to your email or phone number to verify your
            identity.
          </p>
          <form onSubmit={handleVerification}>
            {/* Use the reusable CodeInput component */}
            <CodeInput code={code} setCode={setCode} onCodeChange={setCode} />

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
            onClick={resendCode}
          >
            Resend Code
          </p>
          {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetVerification;
