import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '/image/logo.svg';
import PhoneInputForm from '../../components/PhoneInputForm';
import EmailInputForm from '../../components/EmailInputForm';

const rolesOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'member', label: 'Member' },
];

const inviteOptions = [
  { value: 'email', label: 'Email address' },
  { value: 'sms', label: 'SMS' },
  { value: 'whatsapp', label: 'WhatsApp' },
];

const Onboard5 = () => {
  const [inviteLinkEnabled, setInviteLinkEnabled] = useState(false);
  const [inviteLink, setInviteLink] = useState(
    'https://timelessevent.com/auth/join?invite_code=ksdfkm'
  );
  const [newPeopleRole, setNewPeopleRole] = useState('');
  const [selectedInviteOption, setSelectedInviteOption] = useState(''); // Track the selected invite option

  const handleToggle = () => {
    setInviteLinkEnabled(!inviteLinkEnabled);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert('Invite link copied to clipboard!');
  };

  const navigate = useNavigate();

  const handleSkipClick = () => {
    navigate('/app');
  };

  const handleButtonClick = () => {
    navigate('/app');
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
        <div className="flex flex-col justify-center items-center lg:w-1/2  my-8 py-8 lg:pb-12 lg:px-12 lg:shadow-md lg:border lg:border-gray rounded-md">
          <h2 className="lg:text-4xl text-2xl font-semibold lg:mb-12 mb-8 text-center">
            Invite people to your team
          </h2>

          {/* Invite Link Section */}
          <div className="w-full mb-4">
            {/* <label className="block font-semibold text-gray-700 mb-2">
              Invite by link
            </label> */}
            <div className="flex items-center">
              <span className="mr-2 font-semibold">Enable invite link</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={inviteLinkEnabled}
                  onChange={handleToggle}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="w-full flex lg:flex-row flex-col lg:gap-0 gap-4 items-center mt-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className={`w-full flex-grow px-4 py-2 border focus:outline-none ${
                  inviteLinkEnabled
                    ? 'border-gray-300 bg-white'
                    : 'hidden opacity-50 cursor-not-allowed'
                }`}
                disabled={!inviteLinkEnabled}
              />
              <div className="w-full flex justify-center">
                <button
                  className={`w-full lg:ml-2 px-4 py-2 border border-primary text-primary  ${
                    inviteLinkEnabled
                      ? ' hover:bg-primary hover:text-black transition duration-300'
                      : 'hidden opacity-50 cursor-not-allowed'
                  }`}
                  onClick={handleCopyLink}
                  disabled={!inviteLinkEnabled}
                >
                  Copy link
                </button>
                <button
                  className={`w-full ml-2 px-4 py-2 border border-red-500 text-red-500  ${
                    inviteLinkEnabled
                      ? ' hover:bg-red-500 hover:text-white transition duration-300'
                      : 'hidden opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!inviteLinkEnabled}
                >
                  Reset link
                </button>
              </div>
            </div>
          </div>

          {/* Invite by Other Options */}
          <div className="w-full mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Invite option
            </label>
            <select
              id="options"
              value={selectedInviteOption} // Bind the selected option to state
              onChange={e => setSelectedInviteOption(e.target.value)} // Update state on change
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
            >
              {/* <option value="" disabled>
                Select invite option
              </option> */}
              {inviteOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Conditionally Render Forms Based on Selection */}
          <div className="w-full mb-2">
            {selectedInviteOption === 'sms' ||
            selectedInviteOption === 'whatsapp' ? (
              <PhoneInputForm />
            ) : selectedInviteOption === 'email' ? (
              <EmailInputForm />
            ) : null}
          </div>

          {/* New People Role Selection */}
          <div className="w-full flex justify-start items-center space-x-4 mb-8">
            <label className="block text-gray-700 mb-2">
              New people will be added as
            </label>
            <select
              value={newPeopleRole}
              onChange={e => setNewPeopleRole(e.target.value)}
              className="px-2 py-2 border border-gray-300 focus:outline-none focus:border-primary"
            >
              {rolesOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="lg:w-3/4 w-full flex justify-between gap-8">
            <button
              onClick={handleSkipClick}
              className="lg:w-1/2 w-full border border-primary text-primary font-semibold py-2 px-4 hover:bg-primary hover:text-black transition duration-300"
            >
              Skip
            </button>
            <button
              onClick={handleButtonClick}
              className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            >
              Send invites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard5;
