import { useState } from 'react';

const EmailInputForm = () => {
  // State to hold multiple email inputs
  const [emails, setEmails] = useState([{ id: 1, value: '' }]);

  // Function to handle email input change
  const handleEmailChange = (id, value) => {
    const updatedEmails = emails.map(email =>
      email.id === id ? { ...email, value } : email
    );
    setEmails(updatedEmails);
  };

  // Function to add a new email input
  const handleAddEmail = () => {
    setEmails([...emails, { id: emails.length + 1, value: '' }]);
  };

  // Function to remove an email input
  const handleRemoveEmail = id => {
    setEmails(emails.filter(email => email.id !== id));
  };

  return (
    <div className="space-y-4">
      {emails.map(email => (
        <div key={email.id} className="flex items-center space-x-2">
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
        className="mt-4 text-primary hover:text-primary flex items-center space-x-2"
        onClick={handleAddEmail}
      >
        <span className="text-xl">+</span>
        <span>Add email</span>
      </button>
    </div>
  );
};

export default EmailInputForm;
