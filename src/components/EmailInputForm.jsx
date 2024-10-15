import { useState, useEffect } from 'react';

const EmailInputForm = ({ onContactsChange }) => {
  const [emails, setEmails] = useState([{ id: Date.now(), value: '' }]);

  // Update parent component with the concatenated email addresses
  useEffect(() => {
    const emailAddresses = emails
      .map(email => email.value)
      .filter(email => email !== '')
      .join(',');
    onContactsChange(emailAddresses);
  }, [emails, onContactsChange]);

  const handleEmailChange = (id, value) => {
    const updatedEmails = emails.map(email =>
      email.id === id ? { ...email, value } : email
    );
    setEmails(updatedEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, { id: Date.now(), value: '' }]); // Generate unique id using Date.now()
  };

  const handleRemoveEmail = id => {
    setEmails(emails.filter(email => email.id !== id));
  };

  return (
    <div className="space-y-2">
      {emails.map(email => (
        <div key={email.id} className="flex items-center space-x-4">
          <input
            type="email"
            value={email.value}
            placeholder="Enter your email"
            onChange={e => handleEmailChange(email.id, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
          />

          {emails.length > 1 && (
            <button
              className="text-red-500 hover:text-red-700 text-xl"
              onClick={() => handleRemoveEmail(email.id)}
            >
              &times;
            </button>
          )}
        </div>
      ))}

      <button
        className="mt- text-primary hover:underline flex items-center space-x-2"
        onClick={handleAddEmail}
      >
        <span>+ Add email</span>
      </button>
    </div>
  );
};

export default EmailInputForm;
