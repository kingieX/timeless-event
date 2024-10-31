import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Use react-router-dom for URL params and navigation
import axios from 'axios';
import Logo from '/image/logo.png';
import FloatingLabelInput from '../../components/FloatingLabelInput';

const InvitePage = () => {
  const { team_id, invite_id } = useParams(); // Extract team_id and invite_id from URL
  const navigate = useNavigate(); // Navigation hook for redirection

  // console.log('Team id', team_id);
  // console.log('Invite id', invite_id);

  const [email, setEmail] = useState(''); // Store email input
  const [loading, setLoading] = useState(false); // Loading state for requests
  const [errorMessage, setErrorMessage] = useState(''); // Error messages
  const [successMessage, setSuccessMessage] = useState(''); // Success message if user found

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleEmailSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/email?email=${email}`
      );

      if (response.data.exists) {
        // User exists, join them to the team
        try {
          const inviteResponse = await axios.post(
            `${API_BASE_URL}/teamMember/invite/${team_id}/${invite_id}`
          );
          setSuccessMessage(
            'You have been added to the team successfully!, log in to check team.'
          );
          setTimeout(() => {
            navigate('/login'); // Redirect user to dashboard after success
          }, 2000); // Adjust redirection time if needed
        } catch (inviteError) {
          setErrorMessage(
            'Failed to add you to the team. Please try again later.'
          );
        }
      } else {
        // User does not exist
        setErrorMessage(
          'User does not exist. Please create an account to join the team.'
        );
      }
    } catch (error) {
      setErrorMessage('Error checking user status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect to registration page
  const handleCreateAccount = () => {
    navigate(`/team/user-register?team_id=${team_id}&invite_id=${invite_id}`);
  };

  return (
    <div>
      <div className="mb-6 flex items-center shadow-md py-4 lg:px-8 px-4">
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center lg:mt-24 mt-16">
        <div className="bg-white p-8 rounded-lg lg:shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Join the Team Invitation
          </h2>

          {successMessage ? (
            <p className="text-green-500 text-center mb-4">{successMessage}</p>
          ) : (
            <>
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <FloatingLabelInput
                    label="Email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary text-black font-semibold py-2 w-full px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
                    disabled={loading}
                  >
                    {loading ? 'Checking...' : 'Join Team'}
                  </button>
                </div>

                {/* if you don't have an account */}
                <div className="py-4 flex space-x-2">
                  <span className="">Don't have an account yet?</span>
                  <span
                    type="button"
                    onClick={handleCreateAccount}
                    className=" text-primary font-semibold hover:underline transition duration-200"
                  >
                    Create Account
                  </span>
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-center mb-4">
                    {errorMessage}
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvitePage;
