import { useState } from 'react';

const TeamMessage = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedMembers, setSelectedMembers] = useState('');
  const [messageBody, setMessageBody] = useState('');

  // Temporary custom data for teams and members
  const teams = [
    { id: 1, name: 'Team Alpha' },
    { id: 2, name: 'Team Beta' },
    { id: 3, name: 'Team Gamma' },
  ];

  const members = [
    { id: 1, name: 'Member One' },
    { id: 2, name: 'Member Two' },
    { id: 3, name: 'Member Three' },
  ];

  const handleSendMessage = () => {
    // Implement logic for sending a message
    console.log('Message Sent', { selectedTeam, selectedMembers, messageBody });
  };

  return (
    <div className="mt-12 mx-2 lg:mx-24 lg:px-24">
      <h2 className="text-xl font-semibold mb-2">Inbox</h2>
      <h3 className="text-lg mb-6">Send message to a team</h3>
      <form className="flex flex-col">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="team"
          >
            Select team
          </label>
          <select
            id="team"
            className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
            value={selectedTeam}
            onChange={e => setSelectedTeam(e.target.value)}
          >
            <option value="" disabled>
              Select a team
            </option>
            {teams.map(team => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="members"
          >
            Select members
          </label>
          <select
            id="members"
            className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
            value={selectedMembers}
            onChange={e => setSelectedMembers(e.target.value)}
          >
            <option value="" disabled>
              Select members
            </option>
            {members.map(member => (
              <option key={member.id} value={member.name}>
                {member.name}
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

export default TeamMessage;
