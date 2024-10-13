import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Logo from '/image/logo.svg';
import PhoneInputForm from '../../components/PhoneInputForm';
import EmailInputForm from '../../components/EmailInputForm';

const rolesOptions = [
  { value: 'owner', label: 'Owner' },
  { value: 'manager', label: 'Manager' },
  { value: 'task_lead', label: 'Team lead' },
  { value: 'contributor', label: 'Contributor' },
  { value: 'editor', label: 'Editor' },
  { value: 'reviewer', label: 'Reviewer' },
];

const inviteOptions = [
  { value: 'email', label: 'Email address' },
  { value: 'sms', label: 'SMS' },
  { value: 'whatsapp', label: 'WhatsApp' },
];

const AddMemberModal = ({ onClose, teamId, teamName }) => {
  const [inviteLinkEnabled, setInviteLinkEnabled] = useState(false);
  const [inviteLink, setInviteLink] = useState(
    'https://example.com/auth/join?invite_code=example123'
  );
  const [activeInviteOption, setActiveInviteOption] = useState('email');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg m-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center">
          <img src={Logo} alt="Logo" className="w-8" />
        </div>

        <h2 className="mt-6 text-2xl font-bold">Invite your team members</h2>
        <p className="text-sm text-slate-500">
          Invite your team members to join {teamName}.
        </p>

        {/* Invite Options */}
        <div className="flex space-x-4 mt-4">
          {inviteOptions.map(option => (
            <button
              key={option.value}
              className={`py-2 px-4 rounded-lg border ${
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
          {activeInviteOption === 'email' && <EmailInputForm />}
          {activeInviteOption === 'sms' && <PhoneInputForm method="sms" />}
          {activeInviteOption === 'whatsapp' && (
            <PhoneInputForm method="whatsapp" />
          )}
        </div>

        {/* Toggle Invite Link */}
        <div className="flex items-center mt-4">
          {/* <input
            type="checkbox"
            checked={inviteLinkEnabled}
            onChange={e => setInviteLinkEnabled(e.target.checked)}
            className="mr-2"
          />
          <label>Generate Invite Link</label> */}
          <span className="mr-2 font-semibold">Enable invite link</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={inviteLinkEnabled}
              //   onChange={handleToggle}
              onChange={e => setInviteLinkEnabled(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        {inviteLinkEnabled && (
          <div className="mt-4">
            <input
              type="text"
              value={inviteLink}
              onChange={e => setInviteLink(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
            />
          </div>
        )}

        <div className="mt-6 flex space-x-2 justify-end">
          <button
            className="border border-red-500 px-4 py-2 text-red-500 hover:border-red-800 hover:text-red-800"
            onClick={onClose}
          >
            Skip
          </button>
          <button className="bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300">
            Send Invites
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
