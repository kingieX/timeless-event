import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const ShareMemberModal = ({ projectId, teamId, onClose }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [accessLevels] = useState([
    'owner',
    'manager',
    'task_lead',
    'contributor',
    'editor',
    'reviewer',
    'viewer',
  ]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch team members on mount
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/teamMember/${teamId}/members`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setError('Failed to load team members.');
      }
    };

    fetchTeamMembers();
  }, [API_BASE_URL, teamId, accessToken]);

  const handleMemberChange = (memberId, accessLevel) => {
    setSelectedMembers(prev => {
      const exists = prev.find(item => item.team_member_id === memberId);
      if (exists) {
        return prev.map(item =>
          item.team_member_id === memberId
            ? { ...item, access_level: accessLevel }
            : item
        );
      } else {
        return [
          ...prev,
          { team_member_id: memberId, access_level: accessLevel },
        ];
      }
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/project/${projectId}/share`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ team_members: selectedMembers }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to share members');
      }

      setSuccess('Members shared successfully!');
      setTimeout(() => {
        onClose();
        window.location.reload(); // Optional: refresh the project data
      }, 2000);
    } catch (error) {
      console.error('Error sharing members:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Share Project Members</h2>

        <form onSubmit={handleSubmit}>
          {teamMembers.map((member, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 mb-2">
                {member.user.fullname}
              </label>
              <select
                onChange={e =>
                  handleMemberChange(member.team_member_id, e.target.value)
                }
                className="border border-gray-300 p-2 rounded w-full"
                disabled={isLoading}
              >
                <option value="">Select Access Level</option>
                {accessLevels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={onClose}
              className="border mr-2 border-red-400 text-red-400 font-semibold py-2 px-4 hover:bg-red-400 hover:text-white transition duration-300"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              disabled={isLoading || selectedMembers.length === 0}
            >
              {isLoading ? 'Sharing...' : 'Share Members'}
            </button>
          </div>
          {error && (
            <div className="py-1 px-2 border border-gray my-4 border-l-4 border-l-red-500">
              <p className="text-red-500 text-center text-sm">{error}</p>
            </div>
          )}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default ShareMemberModal;
