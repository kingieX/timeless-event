import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import Cookies from 'js-cookie';

const Onboard1 = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Store fullName in cookies
    Cookies.set('fullName', fullName);

    // Navigate to the next page
    navigate('/signup/customize-experience');
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="lg:w-1/2 my-8 py-12 lg:shadow-md lg:border lg:border-gray rounded-md">
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
        <button
          onClick={handleSubmit}
          className={`w-full bg-primary text-white py-2 ${isSubmitting ? 'bg-gray-300 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Onboard1;
