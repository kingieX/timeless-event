import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import Cookies to access the token
import PhoneInputForm from '../../components/PhoneInputForm';
import EmailInputForm from '../../components/EmailInputForm';
import { IoMdClose } from 'react-icons/io';

const inviteOptions = [
  { value: 'sms', label: 'SMS' },
  { value: 'email', label: 'Email address' },
  { value: 'whatsapp', label: 'WhatsApp' },
];

const AddMemberModal = ({ onClose, teamId, teamName }) => {
  const [inviteLinkEnabled, setInviteLinkEnabled] = useState(true);
  const [activeInviteOption, setActiveInviteOption] = useState('sms');
  const [contacts, setContacts] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Retrieve access_token from cookies
  const accessToken = Cookies.get('access_token');
  // console.log(accessToken);

  const handleSendInvites = async () => {
    setIsLoading(true); // Start loading
    setSuccessMessage('');
    setErrorMessage('');

    // Check for valid contacts before sending
    if (!contacts || contacts.length === 0) {
      setErrorMessage('Please provide at least one contact.');
      setIsLoading(false);
      return;
    }

    // Create the request body
    const requestBody = {
      invite_type: activeInviteOption,
      enable_link: inviteLinkEnabled,
      contacts: contacts,
      invite_status: 'success',
    };

    console.log('Request body:', requestBody);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/teamMember/${teamId}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSuccessMessage('Invites sent successfully!');
      // console.log('Invite Sent:', response.data);

      // Delay modal close by 2 seconds to give feedback
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      // Improved error logging and feedback
      const errorMessage =
        error.response?.data?.message ||
        'Failed to send invites. Please try again.';
      setErrorMessage(errorMessage);
      console.error('Error sending invite:', error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-2xl px-6 py-4 rounded-lg m-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="mt-6 text-2xl font-bold">
              Invite your team members
            </h2>
            <p className="text-sm text-slate-500">
              Invite your team members to join {teamName}.
            </p>
          </div>
          <IoMdClose size={25} onClick={onClose} />
        </div>

        <div className="py-4 overflow-y-auto max-h-[60vh] px-4">
          {/* Invite Options */}
          <div className="flex space-x-2 mt-4">
            {inviteOptions.map(option => (
              <button
                key={option.value}
                className={`py-2 px-4 text-sm rounded-lg border ${
                  activeInviteOption === option.value
                    ? 'bg-primary text-white'
                    : 'text-primary'
                }`}
                onClick={() => setActiveInviteOption(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {activeInviteOption === 'email' && (
              <EmailInputForm onContactsChange={setContacts} />
            )}
            {activeInviteOption === 'sms' && (
              <PhoneInputForm onContactsChange={setContacts} />
            )}
            {activeInviteOption === 'whatsapp' && (
              <PhoneInputForm
                method="whatsapp"
                onContactsChange={setContacts}
              />
            )}
          </div>

          {/* Toggle Invite Link */}
          <div className="flex items-center mt-4">
            <span className="mr-2 font-semibold">Enable invite link</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={inviteLinkEnabled}
                onChange={e => setInviteLinkEnabled(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="mt-4 text-green-500 font-semibold">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="py-1 px-2 border border-gray my-4 border-l-4 border-l-red-500">
              <p className="text-red-500 text-center text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Button Loader */}
          <div className="mt-6 flex space-x-2 justify-end">
            <button
              className="border border-red-500 px-4 py-2 text-red-500 hover:border-red-800 hover:text-red-800"
              onClick={handleSkip}
              disabled={isLoading}
            >
              Skip
            </button>
            <button
              className={`bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300 flex items-center ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSendInvites}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-black mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                'Send Invites'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;

// const rolesOptions = [
//     { value: 'owner', label: 'Owner' },
//     { value: 'manager', label: 'Manager' },
//     { value: 'task_lead', label: 'Team lead' },
//     { value: 'contributor', label: 'Contributor' },
//     { value: 'editor', label: 'Editor' },
//     { value: 'reviewer', label: 'Reviewer' },
//   ];
