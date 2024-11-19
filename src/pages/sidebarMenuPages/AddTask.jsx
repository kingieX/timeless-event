import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiAlarmOn } from 'react-icons/ci';
import Cookies from 'js-cookie';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState('pending');
  const [comment, setComment] = useState('');
  const [accessLevel, setAccessLevel] = useState('public');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [projects, setProjects] = useState([]); // Store project data
  const [selectedProjectId, setSelectedProjectId] = useState(''); // Store selected project ID
  const [showReminderModal, setShowReminderModal] = useState(false); // Control modal visibility

  const accessToken = Cookies.get('access_token');
  const userId = Cookies.get('user_id');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // Fetch Projects on Page Load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/project/users/${userId}/projects`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const projectList = data.map(project => ({
            project_name: project.project_name,
            project_id: project.project_id,
          }));
          setProjects(projectList); // Store the projects in state
        } else {
          throw new Error('Failed to fetch projects');
          setError('Failed to fetch projects');
        }
      } catch (error) {
        setError(
          'Failed to fetch projects, please ensure to create a project before adding task.'
        );
      }
    };

    fetchProjects();
  }, [userId, accessToken, API_BASE_URL]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (!selectedProjectId) {
      setError('Please select a project.');
      setIsLoading(false);
      return;
    }

    const requestBody = {
      title: taskName,
      description: comment,
      priority,
      status,
      access: accessLevel,
      due_date: dueDate,
      project_id: selectedProjectId, // Include the selected project_id in the request
    };

    try {
      const response = await fetch(`${API_BASE_URL}/task/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess('Task added successfully!');

        // Find the selected project in the projects list
        const selectedProject = projects.find(
          project => project.project_id === selectedProjectId
        );

        if (selectedProject) {
          // Navigate using the project details to the correct URL
          setTimeout(() => {
            navigate(
              `/app/workspace/${selectedProject.team_space_id}/folders/${selectedProject.folder_id}/projects/${selectedProject.project_id}`
            ); // Navigate to the correct workspace/project URL
          }, 2000);
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      // setError(error.message);
      setError(
        'Failed to fetch projects, please ensure to create a project before adding task.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mb-8 mx-4">
      <div className="bg-white w-full max-w-xl py-4 lg:border border-gray rounded-lg lg:shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Add Task</h2>
        <hr className="hidden lg:block mb-4 border-gray" />
        <form
          className="flex flex-col justify-center items-center lg:px-12"
          onSubmit={handleSubmit}
        >
          {/* Task Name */}
          <div className="w-full mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="taskName"
            >
              Task Name
            </label>
            <input
              id="taskName"
              type="text"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              placeholder="Enter task name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="w-full mb-4 flex lg:flex-row flex-col gap-4">
            {/* Due Date */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Due Date/Time
              </label>
              <input
                type="datetime-local"
                value={dueDate.slice(0, 16)} // Adjusting format for datetime-local input
                onChange={e => setDueDate(e.target.value)}
                className="flex items-center text-sm w-full px-2 py-2 border border-gray focus-within:border-primary cursor-pointer"
                required
                disabled={isLoading}
              />
            </div>

            {/* Priority */}
            <div className="lg:w-full relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="priority"
              >
                Priority
              </label>
              <select
                value={priority}
                onChange={e => setPriority(Number(e.target.value))}
                className="w-full px-4 py-2 border text-sm border-gray text-left focus-within:border-primary flex items-center"
                required
                disabled={isLoading}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Project */}
            <div className="lg:w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="projectSelect"
              >
                Select Project
              </label>
              <select
                value={selectedProjectId}
                onChange={e => setSelectedProjectId(e.target.value)}
                className="w-full px-4 py-2 border text-sm border-gray text-left focus-within:border-primary flex items-center"
                required
                disabled={isLoading}
              >
                <option value="">Select a Project</option>
                {projects.map(project => (
                  <option key={project.project_id} value={project.project_id}>
                    {project.project_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comment */}
          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Enter comment"
              rows="2"
              required
              disabled={isLoading}
            ></textarea>
          </div>

          <div className="w-full mb-4 flex lg:flex-row flex-col gap-4">
            <div className="lg:w-1/3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Access Level
              </label>
              <select
                value={accessLevel}
                onChange={e => setAccessLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray text-left text-sm focus-within:border-primary flex items-center"
                required
                disabled={isLoading}
              >
                <option value="private">Private</option>
                <option value="restricted">Restricted</option>
                <option value="public">Public</option>
                <option value="team_only">Team Only</option>
              </select>
            </div>

            <div className="lg:w-1/3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full px-4 py-2 border text-sm border-gray text-left focus-within:border-primary flex items-center"
                required
                disabled={isLoading}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center gap-8 my-4">
            <button
              type="submit"
              className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Task'}
            </button>
          </div>

          {/* Display Success or Error Messages */}
          {error && (
            <div className="py-1 px-2 border border-gray border-l-4 border-l-red-500">
              <p className="text-red-500 text-center text-sm">{error}</p>
            </div>
          )}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddTask;
