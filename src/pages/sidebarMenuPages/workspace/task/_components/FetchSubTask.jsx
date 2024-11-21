import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi';
import axios from 'axios';
import EditSubtaskModal from '../../subtask/_components/EditSubtaskModal';
import UpdateSubtaskStatusModal from '../../subtask/_components/UpdateSubtaskStatusModal';
import SubtaskReminderModal from '../../subtask/_components/SubtaskReminderModal';
import { Link } from 'react-router-dom';

const FetchSubTask = ({ taskId }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const [showDropdown, setShowDropdown] = useState(null); // Track which dropdown is open
  const dropdownRef = useRef(null);
  const [reminder, setReminder] = useState(null);
  const [assignUser, setAssignUser] = useState(null);
  const [editSubtask, setEditSubtask] = useState(null);
  const [subtaskStatus, setSubtaskStatus] = useState(null);

  // Fetch tasks on mount
  useEffect(() => {
    const fetchSubTasks = async () => {
      try {
        setIsLoading(true); // Set loading to true before starting the fetch request
        const response = await fetch(
          `${API_BASE_URL}/subtask/list-all-subtask-under-task?task_id=${taskId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch subtasks, no subtask available!');
        }

        const data = await response.json();
        setTasks(data); // Store the fetched tasks
        // console.log('SubTasks:', data); // Log tasks to ensure the data is available
      } catch (error) {
        console.error('Error fetching subtasks:', error);
        setError(error.message); // Set error message if fetch fails
      } finally {
        setIsLoading(false); // Stop loading indicator once fetch is complete
      }
    };

    fetchSubTasks();
  }, [taskId, accessToken, API_BASE_URL]);

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

  const toggleDropdown = subtaskId => {
    setShowDropdown(showDropdown === subtaskId ? null : subtaskId);
  };

  // logic to handle set reminder
  const handleSetReminder = subtaskId => {
    setReminder(subtaskId);
  };

  //   Logic to handle Assign user
  const handleAssignUser = subtaskId => {
    setAssignUser(subtaskId);
  };

  //   logic to handle edit subtask
  const handleEditSubtask = subtask => {
    setEditSubtask(subtask);
  };

  //   logic to handle update sub task status
  const handleUpdateStatus = subtask => {
    setSubtaskStatus(subtask);
  };

  //   logic to handle delete subtask
  const handleDeleteSubtask = async subtaskId => {
    if (window.confirm('Are you sure you want to delete this Subtask?')) {
      try {
        await axios.delete(
          `${API_BASE_URL}/subtask/delete-subtask?sub_task_id=${subtaskId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log('Subtask deleted successfully');
        window.location.reload(); // Trigger project data refresh
      } catch (err) {
        console.error('Error deleting Subtask:', err);
        setError('Failed to delete Subtask.');
      }
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="w-full py-1 px-2 border border-gray my-4 border-l-4 border-l-red-500">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {tasks.length > 0 ? (
        <ul className="py-2 lg:px-1 px-4 mb-12 grid space-y-2 lg:grid-cols-1 grid-cols-1">
          {tasks.map((task, index) => {
            // console.log('Rendering task:', task); // Log each task to ensure it's correctly populated
            return (
              <li
                key={task.sub_task_id}
                className="relative w-full border border-gray rounded  flex items-center space-x-2"
              >
                <Link
                  to={`/app/workspace/folders/projects/tasks/${task.task_id}/subtasks/${task.sub_task_id}`}
                  className="relative w-full flex justify-between items-center px-2 py-2 hover:bg-blue-50"
                >
                  <div className="flex flex-col gap-1">
                    <h1 className="lg:text-lg text-xs pr-8">
                      {index + 1}. {task.description}
                    </h1>
                  </div>
                </Link>

                <button
                  className="absolute z-40 right-4 lg:top-3 top-1.5"
                  onClick={() => toggleDropdown(task.sub_task_id)}
                >
                  <FiMoreHorizontal className="w-5 h-5 cursor-pointer" />
                </button>
                {showDropdown === task.sub_task_id && (
                  <ul
                    ref={dropdownRef}
                    className="absolute z-50 right-4 top-10 w-48 bg-white border rounded-lg shadow-lg"
                  >
                    <li
                      onClick={() => handleSetReminder(task.sub_task_id)}
                      className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                    >
                      Set Reminder
                    </li>

                    <li
                      onClick={() => handleAssignUser(task.sub_task_id)}
                      className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                    >
                      Assign User
                    </li>
                    <li
                      onClick={() => handleEditSubtask(task)}
                      className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                    >
                      Edit Subtask
                    </li>
                    <li
                      onClick={() => handleUpdateStatus(task)} // Pass folder ID here
                      className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                    >
                      Update Subtask Status
                    </li>
                    <li
                      onClick={() => handleDeleteSubtask(task.sub_task_id)}
                      className="flex w-full items-center space-x-2 p-2 text-red-500 text-sm hover:bg-blue-100 cursor-pointer"
                    >
                      Delete Subtask
                    </li>
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="px-8">No tasks found for this project.</p>
      )}

      {/* Render the SubtaskReminderModal if reminder is set */}
      {reminder && (
        <SubtaskReminderModal
          subTaskId={reminder}
          onClose={() => setReminder(null)}
        />
      )}

      {/* Render the AssignUserModal if assignUser is set */}
      {/* {assignUser && (
        <AssignUserModal
          subTaskId={assignUser}
          onClose={() => setAssignUser(null)}
        />
      )} */}
      {/* // Render the EditSubtaskModal if editSubtask is set */}
      {editSubtask && (
        <EditSubtaskModal
          subtask={editSubtask}
          onClose={() => setEditSubtask(null)}
        />
      )}

      {/* Render the UpdateSubtaskStatusModal if subtaskStatus is set */}
      {subtaskStatus && (
        <UpdateSubtaskStatusModal
          subtask={subtaskStatus}
          onClose={() => setSubtaskStatus(null)}
        />
      )}
    </div>
  );
};

export default FetchSubTask;
