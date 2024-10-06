import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';
import Cookies from 'js-cookie'; // Importing cookie handling

const roleOptions = [
  { value: 'owner', label: 'I own or run the company' },
  {
    value: 'leader',
    label: 'I lead a team within the company or organisation',
  },
  { value: 'team_member', label: 'I’m a team member' },
];

const BASE_URL = import.meta.env.VITE_BASE_URL; // Load the base URL from .env

const Onboard2 = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(''); // State to store selected role
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  // Function to handle form submission
  const handleButtonClick = async () => {
    // Retrieve stored data from cookies
    const userId = Cookies.get('userId');
    const email = Cookies.get('email');
    const password = Cookies.get('password');
    const fullName = Cookies.get('fullName');
    const phoneNo = Cookies.get('phone_no');

    // Log the data retrieved from cookies
    console.log('Data from Cookies:', {
      email,
      password,
      fullName,
      phoneNo,
    });

    // Ensure that all required data is available
    if (!email || !password || !fullName || !phoneNo) {
      console.error('Required fields are missing.');
      return;
    }

    // Set loading state to true
    setIsSubmitting(true);

    // Prepare the data to send in the POST request
    const postData = {
      // email: email,
      // password: password,
      fullname: fullName,
      role: role,
      phone_no: phoneNo,
      reason_for_use: 'work',
      is_active: true,
      provider: '',
      provider_id: '',
      avatar_url: '',
    };

    console.log('Request Body:', postData);

    try {
      // Send a POST request to the register route
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token_id}`, // Pass token_id in the header
        },
        body: JSON.stringify(postData),
      });

      const NewpostData = await response.json(); // Parse the response
      console.log('Server Response:', NewpostData); // Log the server's response

      if (response.ok) {
        // If successful, navigate to the next page
        navigate('/signup/create-team');
        console.log('successfully updated the user data');
      } else {
        console.error('Error in registration:', await response.text());
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      // Set loading state back to false
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center shadow-md py-4 lg:px-8 px-4">
        {/* Logo and Name */}
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center mx-6">
        <div className="flex flex-col justify-center items-center lg:w-1/2 my-8 py-8 lg:pb-28 lg:shadow-md lg:border lg:border-gray rounded-md">
          <h2 className="lg:text-4xl text-2xl font-semibold lg:mb-12 mb-8 text-center">
            Customize your experience
          </h2>
          <div className="lg:w-3/4 w-full mb-12">
            <label className="block text-gray-700">What is your role?</label>
            <select
              id="options"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
            >
              {roleOptions.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleButtonClick}
            className={`lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 mb-4 ${
              isSubmitting
                ? 'bg-gray-300 cursor-not-allowed'
                : 'hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboard2;
