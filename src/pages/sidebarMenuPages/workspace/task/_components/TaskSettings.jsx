import { useState, forwardRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import EditTaskModal from '../../task/_components/EditTaskModal';
import UpdatePriorityModal from '../../task/_components/UpdatePriorityModal';
import UpdateStatusModal from '../../task/_components/UpdateStatusModal';
import UpdateAccessModal from '../../task/_components/UpdateAccessModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddMemberModal from './AddMemberModal';
import TaskReminderModal from './TaskReminderModal';

const TaskSettings = forwardRef(({ task }, ref) => {
  // console.log('team details:', teamName);
  const [showDropdown, setShowDropdown] = useState(false);

  const [reminder, setReminder] = useState(null);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const [taskPriority, setTaskPriority] = useState(null);
  const [addUsers, setAddUsers] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const [ids, setIds] = useState(null);

  const access_token = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const GetIds = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/project/projects/${task.project_id}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const data = response.data; // Directly accessing the data
        setIds({
          teamSpaceId: data.team_space_id,
          projectId: data.project_id,
          folderId: data.folder_id,
        });
        // console.log('Ids:', {
        //   teamSpaceId: data.team_space_id,
        //   projectId: data.project_id,
        //   folderId: data.folder_id,
        // });
      } catch (error) {
        console.error('Error fetching Ids:', error);
      }
    };
    GetIds();
  }, [task.project_id, access_token, API_BASE_URL]);

  // logic to handle Reminder
  const handleReminder = taskId => {
    setReminder(taskId);
  };

  // logic to handle Update task access
  const handleUpdateAccess = taskId => {
    setTaskToUpdate(taskId);
  };

  // logic to handle update task status
  const handleUpdateStatus = taskId => {
    setTaskStatus(taskId);
  };

  // logic to handle update task priority
  const handleUpdatePriority = taskId => {
    setTaskPriority(taskId);
  };

  // logic to handle assign users
  const handleAddUsers = taskId => {
    setAddUsers(taskId);
  };

  // logic to handle Edit task
  const handleEditTask = task => {
    setEditTask(task);
  };

  // logic to handle delete task
  const handleDeleteTask = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_BASE_URL}/task/${task.task_id}/delete`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        console.log('Task deleted successfully');
        navigate(
          `/app/workspace/${ids.teamSpaceId}/folders/${ids.folder_id}/projects/${ids.projectId}`
        );

        window.location.reload(); // Trigger project data refresh
      } catch (err) {
        console.error('Error deleting task:', err);
        // setError('Failed to delete task.');
      }
    }
  };

  return (
    <div ref={ref} className="relative">
      <ul className="absolute z-50 right-4 top-10 w-40 bg-white border border-gray rounded-lg shadow-lg">
        <li
          onClick={() => handleReminder(task.task_id)} // Pass folder ID here
          className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
        >
          Add Reminder
        </li>

        <li
          onClick={() => handleUpdateAccess(task.task_id)} // Pass folder ID here
          className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
        >
          Update task access
        </li>

        <li
          onClick={() => handleUpdateStatus(task.task_id)} // Pass folder ID here
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

      {/* Render the TaskReminderModal if reminder is set */}
      {reminder && (
        <TaskReminderModal
          taskId={reminder} // Pass the task
          onClose={() => setReminder(null)} // Close modal on close
        />
      )}

      {/* Render the UpdateAccessModal if taskToUpdate is set */}
      {taskToUpdate && (
        <UpdateAccessModal
          taskId={taskToUpdate} // Pass the task
          onClose={() => setTaskToUpdate(null)} // Close modal on close
        />
      )}

      {/* Render the UpdateStatusModal if taskStatus is set */}
      {taskStatus && (
        <UpdateStatusModal
          taskId={taskStatus} // Pass the task
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

      {/* Render the AddUserModal if addUsers is set */}
      {addUsers && (
        <AddMemberModal
          taskId={addUsers} // Pass the task
          onClose={() => setAddUsers(null)} // Close modal on close
        />
      )}

      {/* Render the EditTaskModal if editTask is set */}
      {editTask && (
        <EditTaskModal task={editTask} onClose={() => setEditTask(null)} />
      )}
    </div>
  );
});

export default TaskSettings;
