// import React from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { PiDotsSixVerticalLight, PiDotsThreeOutlineThin } from 'react-icons/pi';
import { AiOutlineEdit } from 'react-icons/ai';
import { CiCalendar } from 'react-icons/ci';
import { BsCalendar2 } from 'react-icons/bs';

import Logo from '/image/completed.svg';
import { Link } from 'react-router-dom';
import EditTaskModal from '../workspace/task/_components/EditTaskModal';
import TaskReminderModal from '../workspace/task/_components/TaskReminderModal';
import UpdateAccessModal from '../workspace/task/_components/UpdateAccessModal';
import UpdateStatusModal from '../workspace/task/_components/UpdateStatusModal';
import UpdatePriorityModal from '../workspace/task/_components/UpdatePriorityModal';

const UpcomingTasks = () => {
  const [showUpcomingTasks, setShowUpcomingTasks] = useState(true);
  const [tasks, setTasks] = useState([]); // Renamed to `tasks` for clarity
  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const [showDropdown, setShowDropdown] = useState(null); // Track which dropdown is open
  const dropdownRef = useRef(null);
  const [editTask, setEditTask] = useState(null);
  const [reminder, setReminder] = useState(null);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const [taskPriority, setTaskPriority] = useState(null);

  const toggleTasks = () => setShowUpcomingTasks(!showUpcomingTasks);

  // Fetch all tasks
  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/task/task/get-all-task-not_started`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch all tasks');
        }

        const data = await response.json();
        setTasks(data); // Set the fetched tasks
        console.log('All Tasks:', data);
      } catch (error) {
        console.error('Error fetching all tasks:', error);
      }
    };

    fetchAllTasks();
  }, [accessToken, API_BASE_URL]);

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

  // logic to handle edit task
  const handleEditTask = task => {
    setEditTask(task);
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

  // Helper function to get status label and color
  const getStatusInfo = status => {
    switch (status) {
      case 'just_started':
        return { text: 'Just Started', color: 'bg-slate-200 text-slate-600' };
      case 'in_progress':
        return { text: 'In Progress', color: 'bg-blue-200 text-blue-600' };
      case 'completed':
        return { text: 'Completed', color: 'bg-green-200 text-green-600' };
      case 'on_hold':
        return { text: 'On Hold', color: 'bg-yellow-200 text-yellow-600' };
      default:
        return { text: 'Unknown', color: 'bg-gray-300 text-gray-500' };
    }
  };

  return (
    <>
      <div className=" py-4 px-4">
        <div
          className="flex flex-row items-center gap-2 cursor-pointer mb-4"
          onClick={toggleTasks}
        >
          <h1 className="lg:text-xl text-sm flex items-center">
            Upcoming Tasks
          </h1>
          {showUpcomingTasks ? (
            <FaChevronUp className="mr-2 text-slate-600 w-3" />
          ) : (
            <FaChevronDown className="mr-2 text-slate-600 w-3" />
          )}
        </div>

        {showUpcomingTasks && (
          <div>
            {/* Task List */}
            {tasks && tasks.length > 0 ? (
              tasks.map(task => {
                const { text, color } = getStatusInfo(task.status); // Get status info
                return (
                  <div
                    key={task.id}
                    className="w-full flex flex-col justify-between items-start py-2 px-4 pr-8 border-b border-t border-t-gray border-b-gray group relative"
                  >
                    {/* First line */}
                    <div className="flex -ml-8">
                      <div>
                        <PiDotsSixVerticalLight className="w-8 h-6 opacity-0 lg:group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* <div className="flex justify-center items-center w-5 h-5 rounded-full border">
                  <IoCheckmark className="w-4 h-4 cursor-pointer opacity-0 hover:opacity-100 transition-opacity" />
                </div> */}
                        <div className="flex justify-center items-center mx-2">
                          {/* Task Title */}
                          <Link
                            to={`/app/workspace/${task.task_id}/folders/${task.task_id}/projects/${task.task_id}/tasks/${task.task_id}`}
                          >
                            <h3 className="text-sm hover:underline">
                              {task.title}
                            </h3>
                          </Link>
                        </div>
                        {/* Hover Icons */}
                        <div className="flex justify-center items-center space-x-2 lg:opacity-0 group-hover:opacity-100 transition-opacity absolute lg:top-4 top-2 right-4">
                          <AiOutlineEdit
                            onClick={() => handleEditTask(task)}
                            className="text-slate-700 cursor-pointer lg:w-6 lg:h-6 w-5 h-5 hover:text-slate-500"
                          />
                          <CiCalendar
                            onClick={() => handleSetReminder(task.task_id)} // Pass folder ID here
                            className="text-slate-700 cursor-pointer lg:w-6 lg:h-6 w-5 h-5 hover:text-slate-500"
                          />
                          {/* <FaRegMessage className="text-slate-700 cursor-pointer w-4 h-4" /> */}
                          <PiDotsThreeOutlineThin
                            onClick={() => toggleDropdown(task.task_id)}
                            className="text-slate-700 cursor-pointer lg:w-6 lg:h-6 w-5 h-5 hover:text-slate-500"
                          />
                          {showDropdown === task.task_id && (
                            <ul
                              ref={dropdownRef}
                              className="absolute z-50 right-4 top-10 w-40 bg-white border rounded-lg shadow-lg"
                            >
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
                                onClick={() =>
                                  handleUpdatePriority(task.task_id)
                                } // Pass folder ID here
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
                                onClick={() => handleDeleteTask(task.task_id)}
                                className="flex w-full items-center space-x-2 p-2 text-red-500 text-sm hover:bg-blue-100 cursor-pointer"
                              >
                                Delete task
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Second line */}
                    <div className="mx-2 mt-1">
                      <p className="text-xs text-slate-500">
                        {task.description}
                      </p>
                    </div>

                    {/* Third line */}
                    <div className="w-full flex justify-between mt-2 mx-2">
                      <div className="flex items-center justify-start gap-1 text-xs text-primary">
                        <BsCalendar2 className="" />
                        <span className="font-semibold">Due: </span>
                        <span>
                          {new Date(task.due_date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          })}
                        </span>
                      </div>
                      {/* Status Display */}
                      {/* <div className="w-full flex justify-between mt-2 mx-2"> */}
                      <div className="text-xs text-slate-500">
                        <span className="font-semibold">Status: </span>
                        <span className={`px-2 py-1 rounded-full ${color}`}>
                          {text}
                        </span>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full flex flex-col justify-center items-center py-8">
                <img
                  src={Logo}
                  alt="empty project"
                  className="lg:w-1/4 w-1/2 mb-4"
                />
                <h2 className="lg:text-2xl text-xl font-bold flex items-center">
                  No Upcoming tasks available
                </h2>
                <p className="lg:text-lg text-center text-sm text-gray-600">
                  Create tasks to view them here
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Render the EditTaskModal if editTask is set */}
      {editTask && (
        <EditTaskModal task={editTask} onClose={() => setEditTask(null)} />
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
    </>
  );
};

export default UpcomingTasks;
