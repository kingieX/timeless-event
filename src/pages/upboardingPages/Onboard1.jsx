import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Cookies from 'js-cookie';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Logo from '/image/logo.png';

const Onboard1 = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    // Ensure the phone number starts with a '+'
    let formattedPhoneNo = phone_number.trim();
    if (!formattedPhoneNo.startsWith('+')) {
      formattedPhoneNo = `+${formattedPhoneNo}`;
    }

    setIsSubmitting(true);
    // Store fullName in cookies
    Cookies.set('fullName', fullName);
    Cookies.set('phone_number', formattedPhoneNo);

    // Navigate to the next page
    navigate('/signup/customize-experience');
    setIsSubmitting(false);
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
      <div className="flex flex-col justify-center items-center">
        <div className="lg:w-1/2 my-12 lg:mt-24 py-12 lg:px-12 lg:shadow-md lg:border lg:border-gray rounded-md">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Let’s get to know you better
          </h2>
          <div className="w-full mb-8">
            <FloatingLabelInput
              label="Enter your name"
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </div>
          <div className="w-full border py-2 mb-8">
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
            onClick={handleSubmit}
            className="bg-primary text-black font-semibold py-2 px-4 w-full hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Onboard1;
