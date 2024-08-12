import { useState } from 'react';

const UserMessage = () => {
  const [subject, setSubject] = useState('');
  const [recipient, setRecipient] = useState('');
  const [messageBody, setMessageBody] = useState('');

  // Temporary custom data for users
  const users = [
    { id: 1, name: 'User One' },
    { id: 2, name: 'User Two' },
    { id: 3, name: 'User Three' },
  ];

  const handleSendMessage = () => {
    // Implement logic for sending a message
    console.log('Message Sent', { subject, recipient, messageBody });
  };

  return (
    <div className="mt-12 mx-2 lg:mx-24 lg:px-24">
      <h2 className="text-xl font-semibold mb-2">Inbox</h2>
      <h3 className="text-lg mb-6">Send message to a user</h3>
      <form className="flex flex-col">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            id="subject"
            type="text"
            className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Enter subject"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="recipient"
          >
            To
          </label>
          <select
            id="recipient"
            className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="messageBody"
          >
            Message body
          </label>
          <textarea
            id="messageBody"
            className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
            value={messageBody}
            onChange={e => setMessageBody(e.target.value)}
            placeholder="Enter your message"
            rows="4"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            onClick={handleSendMessage}
          >
            Send message
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserMessage;
