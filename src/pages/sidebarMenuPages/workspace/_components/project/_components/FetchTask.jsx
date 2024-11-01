import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FetchTask = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    //   Route to fetch Tasks
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/task/${projectId}/projects`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch tasks, no tasks found');
        }

        const data = await response.json();
        setTasks(data); // Set tasks data
        console.log('Tasks:', data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError(error.message);
      }
    };

    fetchTasks();
  }, [projectId, accessToken, API_BASE_URL]);

  if (isLoading) {
    // return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="lg:text-lg font-semibold">
        Tasks
        {/* ({folder.shared_users.length}) */}
      </h2>
      {tasks.length > 0 ? (
        <ul className="py-2 mb-12 grid lg:grid-cols-2 grid-cols-1 gap-4">
          {tasks.map(task => (
            <li
              key={task.task_id}
              className="relative w-full flex items-center space-x-2"
            >
              <Link
                to={`/app/workspace/${project.team_space_id}/folders/${project.folder_id}/tasks/${task.task_id}`}
                className="w-full flex justify-between items-center border rounded-lg p-4 hover:bg-blue-50"
              >
                <div className="flex flex-col">
                  <h1 className="lg:text-xl text-lg font-semibold">
                    {task.title}
                  </h1>
                  <span className="text-sm text-slate-500">
                    ({task.status}) {/* Assuming `status` is a property */}
                  </span>
                </div>
              </Link>
              {/* Additional buttons for task options can go here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found for this project.</p>
      )}
    </div>
  );
};

export default FetchTask;
