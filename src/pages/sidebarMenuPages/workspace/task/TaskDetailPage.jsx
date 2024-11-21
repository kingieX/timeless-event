import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BiTask } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import TaskSettings from './_components/TaskSettings';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoMdAlarm } from 'react-icons/io';
import FetchSubTask from './_components/FetchSubTask';
import CreateSubtaskModal from '../subtask/_components/CreateSubtaskModal';
import ViewReminderModal from './_components/ViewReminderModal';

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const [createSubtask, setCreateSubtask] = useState(null);
  const [viewReminder, setViewReminder] = useState(null);

  const menuRef = useRef(null);
  const [isTaskSettingsMenuOpen, setIsTaskSettingsMenuOpen] = useState(false);

  const [showSubTasks, setShowSubTasks] = useState(true);

  const toggleSubTasks = () => setShowSubTasks(!showSubTasks);

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
        // console.log('Task details:', data);
      } catch (error) {
        console.error('Error fetching task details:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId, accessToken, API_BASE_URL]);

  // logic to handle reminders
  const handleReminder = taskId => {
    setViewReminder(taskId);
  };

  // logic to create Subtask
  const handleCreateSubtask = taskId => {
    setCreateSubtask(taskId);
  };

  // ** settings dropdown **//
  // Toggle menu visibility
  const toggleMenu = taskId => {
    if (isTaskSettingsMenuOpen === taskId) {
      setIsTaskSettingsMenuOpen(null); // Close if already open
    } else {
      setIsTaskSettingsMenuOpen(taskId); // Open the clicked menu
    }
  };

  // Close modal or dropdown if a click happens outside the menu or dropdown
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsTaskSettingsMenuOpen(false); // Close the modal
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="w-full py-1 px-2 border border-gray my-4 border-l-4 border-l-red-500">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
        <div className="flex gap-4 justify-end px-4">
          {/* View reminder */}
          <div
            onClick={() => handleReminder(task.task_id)}
            className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
          >
            <IoMdAlarm className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">
              View Reminders
            </p>
          </div>
          {/* Creat Subtask */}
          <div
            onClick={() => handleCreateSubtask(task.task_id)}
            className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
          >
            <BiTask className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">
              Create Subtask
            </p>
          </div>

          {/* Settings */}
          <div
            onClick={() => toggleMenu(task.task_id)}
            className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
          >
            <CiSettings className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">Settings</p>
          </div>
          {isTaskSettingsMenuOpen === task.task_id && (
            <TaskSettings
              ref={menuRef} // Use the single ref for the team options dropdown
              isOpen={isTaskSettingsMenuOpen}
              taskId={task.task_id}
              taskName={task.title}
              task={task}
            />
          )}
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
                </div>
                <div className="flex lg:flex-row flex-col gap-2">
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
            <div className="pt-6 mx-auto bg-white">
              <div
                className="flex lg:px-2 px-4 items-center cursor-pointer"
                onClick={toggleSubTasks}
              >
                {showSubTasks ? (
                  <FaChevronUp className="mr-2 text-slate-600 w-3" />
                ) : (
                  <FaChevronDown className="mr-2 text-slate-600 w-3" />
                )}
                <h2 className="lg:text-lg font-semibold">Sub Tasks</h2>
              </div>

              {showSubTasks && <FetchSubTask taskId={taskId} task={task} />}
            </div>
          </>
        ) : (
          <p className="text-center">No task found with the given ID.</p>
        )}
      </div>

      {/* Render the ViewReminderModal if viewReminder is set */}
      {viewReminder && (
        <ViewReminderModal
          taskId={viewReminder}
          onClose={() => setViewReminder(null)}
        />
      )}

      {/* Render CreateSubtaskModal if createSubtask is set */}
      {createSubtask && (
        <CreateSubtaskModal
          taskId={createSubtask}
          onClose={() => setCreateSubtask(null)}
        />
      )}
    </div>
  );
};

export default TaskDetailPage;
