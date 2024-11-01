import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BiTask } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/task/${taskId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch task details');
        }

        const data = await response.json();
        setTask(data);
        console.log('Task details:', data);
      } catch (error) {
        console.error('Error fetching task details:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId, accessToken, API_BASE_URL]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        {/* Navigation */}
        <div className="flex space-x-1 lg:text-sm text-xs">
          <Link
            to={`/app/workspace/${task.project.team_space_id}`}
            className="text-slate-700 hover:underline cursor-pointer"
          >
            Workspace
          </Link>
          <span className="text-slate-700"> / </span>
          <Link
            to={`/app/workspace/${task.project.team_space_id}/folders/${task.project.folder_id}`}
            className="text-slate-700 hover:underline cursor-pointer"
          >
            Folder
          </Link>
          <span className="text-slate-700"> / </span>
          <Link
            to={`/app/workspace/${task.project.team_space_id}/folders/${task.project.folder_id}/projects/${task.project.project_id}`}
            className="text-slate-700 hover:underline cursor-pointer"
          >
            Project
          </Link>
          <span className="text-slate-700"> / </span>
          <p className="font-bold">{task.title}</p>
        </div>
        {/* Task options */}
        <div className="flex gap-4 justify-end px-4">
          <div className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer">
            <BiTask className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">
              Create Subtask
            </p>
          </div>
          <div className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer">
            <CiSettings className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">Settings</p>
          </div>
        </div>
      </div>

      {/* Task details */}
      <div className="lg:py-4 py-1 px-4 lg:px-16">
        {task ? (
          <>
            <div className="flex flex-col space-y-2">
              {/* Title */}
              <h1 className="lg:text-4xl text-2xl font-bold">{task.title}</h1>

              {/* Subtitles */}
              <div className="text-sm text-slate-700">
                <div className="flex flex-col lg:flex-row lg:items-center items-start lg:gap-2 ">
                  <p>
                    <strong>Priority:</strong> {task.priority}
                  </p>
                  <p>
                    <strong>Status:</strong> {task.status}
                  </p>
                  <p>
                    <strong>Access Level:</strong> {task.access}
                  </p>
                  <p>
                    <span className="font-semibold">Due Date: </span>
                    {new Date(task.due_date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p>
                    <span className="font-semibold">Created on: </span>
                    {new Date(task.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p>
                    <span className="font-semibold">Updated on: </span>
                    {new Date(task.updated_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              {/* Description */}
              <p className="mb-4 text-sm text-slate-700 font-semibold">
                Description:{' '}
                <span className="font-normal">{task.description}</span>
              </p>
            </div>

            {/* Sub tasks */}
          </>
        ) : (
          <p>No task found with the given ID.</p>
        )}
      </div>
    </>
  );
};

export default TaskDetailPage;
