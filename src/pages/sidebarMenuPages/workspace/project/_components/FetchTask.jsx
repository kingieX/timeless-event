import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import UpdateAccessModal from '../../task/_components/UpdateAccessModal';
import UpdateStatusModal from '../../task/_components/UpdateStatusModal';
import UpdatePriorityModal from '../../task/_components/UpdatePriorityModal';
import EditTaskModal from '../../task/_components/EditTaskModal';
import axios from 'axios';
import TaskReminderModal from '../../task/_components/TaskReminderModal';

const FetchTask = ({ projectId, project }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const accessToken = Cookies.get('access_token');
  // console.log('Access token:', accessToken);
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const [showDropdown, setShowDropdown] = useState(null); // Track which dropdown is open
  const dropdownRef = useRef(null);
  const [reminder, setReminder] = useState(null);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const [taskPriority, setTaskPriority] = useState(null);
  const [editTask, setEditTask] = useState(null);

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

  // function to close dropdown when clicked outside of the page
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(null); // Close dropdown if clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = taskId => {
    setShowDropdown(showDropdown === taskId ? null : taskId);
  };

  // logic to handle set Reminder
  const handleSetReminder = taskId => {
    setReminder(taskId);
  };

  // logic to handle Update task access
  const handleUpdateAccess = task => {
    setTaskToUpdate(task);
  };

  // logic to handle update task status
  const handleUpdateStatus = task => {
    setTaskStatus(task);
  };

  // logic to handle update task priority
  const handleUpdatePriority = taskId => {
    setTaskPriority(taskId);
  };

  // logic to handle Edit task
  const handleEditTask = task => {
    setEditTask(task);
  };

  // logic to handle delete task
  const handleDeleteTask = async taskId => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_BASE_URL}/task/${taskId}/delete`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('Task deleted successfully');
        window.location.reload(); // Trigger project data refresh
      } catch (err) {
        console.error('Error deleting task:', err);
        setError('Failed to delete task.');
      }
    }
  };

  if (isLoading) {
    // return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="w-full py-2 px-2 border border-gray my-4 border-l-4 border-l-red-500">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className=" mb-12">
      {tasks.length > 0 ? (
        <ul className="py-2 lg:px-8 px-4 mb-12 grid lg:grid-cols-1 grid-cols-1">
          {tasks.map(task => (
            <li
              key={task.task_id}
              className="relative w-full flex items-center space-x-2"
            >
              <Link
                to={`/app/workspace/${project.team_space_id}/folders/${project.folder_id}/projects/${project.project_id}/tasks/${task.task_id}`}
                className="relative w-full flex justify-between items-center border-b border-gray p-2 hover:bg-blue-50"
              >
                <div className="flex flex-col gap-1">
                  <h1 className="lg:text-lg text-xs font-">{task.title}</h1>
                  <div className="flex space-x-2 text-xs text-primary">
                    <p>
                      <span className="font-semibold">Access: </span>
                      {task.access}
                    </p>
                    <p>
                      <span className="font-semibold">Due: </span>
                      {new Date(task.due_date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </p>
                    <span className="text-xs">
                      ({task.status}) {/* Assuming `status` is a property */}
                    </span>
                  </div>
                </div>
              </Link>
              <button
                className="absolute z-40 right-4 top-7"
                onClick={() => toggleDropdown(task.task_id)}
              >
                <FiMoreVertical className="w-5 h-5 cursor-pointer" />
              </button>
              {showDropdown === task.task_id && (
                <ul
                  ref={dropdownRef}
                  className="absolute z-50 right-4 top-10 w-40 bg-white border rounded-lg shadow-lg"
                >
                  <li
                    onClick={() => handleSetReminder(task.task_id)} // Pass folder ID here
                    className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Set Reminder
                  </li>

                  <li
                    onClick={() => handleUpdateAccess(task)} // Pass folder ID here
                    className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Update task access
                  </li>

                  <li
                    onClick={() => handleUpdateStatus(task)} // Pass folder ID here
                    className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Update task status
                  </li>

                  <li
                    onClick={() => handleUpdatePriority(task.task_id)} // Pass folder ID here
                    className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Update task priority
                  </li>

                  <li
                    onClick={() => handleAddUsers(task.task_id)} // Pass folder ID here
                    className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Assign user
                  </li>

                  <li
                    onClick={() => handleEditTask(task)}
                    className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Edit task
                  </li>

                  <li
                    onClick={() => handleDeleteTask(task.task_id)}
                    className="flex w-full items-center space-x-2 p-2 text-red-500 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Delete task
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-8">No tasks found for this project.</p>
      )}

      {/* Render the ReminderModal if reminder is set */}
      {reminder && (
        <TaskReminderModal
          taskId={reminder} // Pass the task
          onClose={() => setReminder(null)} // Close modal on close
        />
      )}

      {/* Render the UpdateAccessModal if taskToUpdate is set */}
      {taskToUpdate && (
        <UpdateAccessModal
          task={taskToUpdate} // Pass the task
          onClose={() => setTaskToUpdate(null)} // Close modal on close
        />
      )}

      {/* Render the UpdateStatusModal if taskStatus is set */}
      {taskStatus && (
        <UpdateStatusModal
          task={taskStatus} // Pass the task
          onClose={() => setTaskStatus(null)} // Close modal on close
        />
      )}

      {/* Render the UpdatePriorityModal if taskPriority is set */}
      {taskPriority && (
        <UpdatePriorityModal
          taskId={taskPriority} // Pass the task
          onClose={() => setTaskPriority(null)} // Close modal on close
        />
      )}

      {/* Render the EditTaskModal if editTask is set */}
      {editTask && (
        <EditTaskModal task={editTask} onClose={() => setEditTask(null)} />
      )}
    </div>
  );
};

export default FetchTask;
