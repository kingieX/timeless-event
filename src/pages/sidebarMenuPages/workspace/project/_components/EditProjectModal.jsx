import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const EditProjectModal = ({ project, onClose, onUpdate }) => {
  const [projectName, setProjectName] = useState(project.project_name);
  const [description, setDescription] = useState(project.description);
  const [color, setColor] = useState(project.color);
  const [access, setAccess] = useState(project.access);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    setProjectName(project.project_name);
    setDescription(project.description);
    setColor(project.color);
    setAccess(project.access);
  }, [project]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const requestBody = {
      project_name: projectName,
      description,
      color,
      access,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/project/update/${project.project_id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSuccess('Project updated successfully!');
        // onUpdate(result); // Call the onUpdate callback

        setTimeout(() => {
          onClose();
          window.location.reload(); // Trigger project data refresh
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 w-full m-8 overflow-y-auto h-[90vh] max-w-xl rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Color</label>
            <select
              value={color}
              onChange={e => setColor(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              disabled={isLoading}
            >
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Access Level</label>
            <select
              value={access}
              onChange={e => setAccess(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              disabled={isLoading}
            >
              <option value="private">Private</option>
              <option value="restricted">Restricted</option>
              <option value="public">Public</option>
              <option value="team_only">Team Only</option>
            </select>
          </div>
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
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Project'}
            </button>
          </div>
          {/* Display Success or Error Messages */}
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

export default EditProjectModal;
