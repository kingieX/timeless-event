import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import Cookies from 'js-cookie';

const AddEvent = () => {
  const [title, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setDueDate] = useState('');
  const [eventTime, setDueTime] = useState('');
  const [location, setLocation] = useState('');
  const [isVirtual, setIsVirtual] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [projects, setProjects] = useState([]); // Store project data
  const [selectedProjectId, setSelectedProjectId] = useState(''); // Store selected project_id
  const navigate = useNavigate();

  const accessToken = Cookies.get('access_token');
  const userId = Cookies.get('user_id');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch projects when the component mounts
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
          // Map the data to an array of project names and ids, along with other ids
          const projectList = data.map(project => ({
            project_name: project.project_name,
            project_id: project.project_id,
            team_space_id: project.team_space_id,
            folder_id: project.folder_id,
          }));
          setProjects(projectList); // Store the projects
        } else {
          throw new Error('Failed to fetch projects');
        }
      } catch (error) {
        setError(error.message);
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

    // Format event_date and event_time
    const formattedEventDate = eventDate; // eventDate is already in "YYYY-MM-DD" format
    const formattedEventTime = `${eventDate}T${eventTime}:00Z`; // Combine date and time to match "YYYY-MM-DDTHH:MM:SSZ" format

    const requestBody = {
      title,
      description,
      event_date: formattedEventDate,
      event_time: formattedEventTime,
      location,
      is_virtual: isVirtual,
      project_id: selectedProjectId, // Use the selected project ID
    };

    console.log('Request Body:', requestBody);

    try {
      const response = await fetch(`${API_BASE_URL}/event/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess('Event created successfully!');

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
        throw new Error(errorData.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center lg:mt-2 mt-4 mx-4">
      <div className="bg-white w-full max-w-xl py-4 mb-10 lg:border border-gray rounded-lg lg:shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Add an Event</h2>
        <hr className="hidden lg:block mb-4 border-gray" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-start lg:px-12"
        >
          <div className="w-full mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="eventName"
            >
              Event Name
            </label>
            <input
              id="eventName"
              type="text"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={title}
              onChange={e => setEventName(e.target.value)}
              placeholder="Enter event name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="w-full mb-4 flex lg:flex-row flex-col gap-4">
            <div className="lg:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dueDate"
              >
                Date
              </label>
              <div className="flex items-center w-full px-2 py-2 border border-gray focus-within:border-primary">
                <input
                  id="dueDate"
                  type="date"
                  className="w-full text-sm flex-grow outline-none pl-1"
                  value={eventDate}
                  onChange={e => setDueDate(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="lg:w-1/3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dueTime"
              >
                Time
              </label>
              <div className="flex items-center w-full px-2 py-2 border border-gray focus-within:border-primary">
                <input
                  id="dueTime"
                  type="time"
                  className="w-full text-sm flex-grow outline-none pl-1"
                  value={eventTime}
                  onChange={e => setDueTime(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <div className="flex items-center w-full px-4 py-2 border border-gray focus-within:border-primary">
                <input
                  id="location"
                  type="text"
                  className="w-full flex-grow outline-none pr-2"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Enter location"
                  required
                  disabled={isLoading}
                />
                <CiLocationOn className="text-slate-500 w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter description"
              rows="4"
              required
              disabled={isLoading}
            ></textarea>
          </div>

          {/* Project Select Dropdown */}
          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectSelect"
            >
              Select Project
            </label>
            <select
              id="projectSelect"
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(e.target.value)}
              className="w-full px-4 py-2 border border-gray focus:outline-none focus:border-primary"
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

          {/* virtual check box */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={isVirtual}
              onChange={e => setIsVirtual(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Is this event virtual?</label>
          </div>

          <div className="w-full flex justify-center gap-8">
            <button
              type="submit"
              className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Event'}
            </button>
          </div>

          {/* Display Success or Error Messages */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
