import { useState, forwardRef } from 'react';
import EditTeamModal from '../../_components/EditTeamModal';
import ConfirmationDialog from '../../_components/ConfirmationDialog';
import AddMemberModal from '../../../../create-team/AddMemberModal';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line, RiAddLine } from 'react-icons/ri';
import Cookies from 'js-cookie';
import EditTaskModal from '../../task/_components/EditTaskModal';
import UpdatePriorityModal from '../../task/_components/UpdatePriorityModal';
import UpdateStatusModal from '../../task/_components/UpdateStatusModal';
import UpdateAccessModal from '../../task/_components/UpdateAccessModal';

const TaskSettings = forwardRef(
  ({ taskId, task, taskName, onTaskUpdated }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    // console.log('team details:', teamName);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showEditTeamModal, setShowEditTeamModal] = useState(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const [taskToUpdate, setTaskToUpdate] = useState(null);
    const [taskStatus, setTaskStatus] = useState(null);
    const [taskPriority, setTaskPriority] = useState(null);
    const [editTask, setEditTask] = useState(null);

    const access_token = Cookies.get('access_token');
    const API_BASE_URL = import.meta.env.VITE_BASE_URL;

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

    //   console.log('Team id for deletion', teamId);

    const handleDeleteTeam = () => {
      setIsLoading(true);
      // Send DELETE request to backend
      fetch(`${API_BASE_URL}/team/${team.team_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${access_token}`, // Pass token_id in the header
        },
      })
        .then(response => {
          if (response.ok) {
            setIsLoading(false);
            console.log('Team deleted successfully');
            setShowConfirmationDialog(false);
            window.location.reload(); // Reload the page

            // Handle success, possibly refresh the team list
          }
        })
        .catch(error => {
          console.error('Error deleting team:', error);
        });
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

    return (
      <div ref={ref} className="relative">
        <ul className="absolute z-50 right-4 top-10 w-40 bg-white border border-gray rounded-lg shadow-lg">
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

        {/* Add Member Modal */}
        {showAddMemberModal && (
          <AddMemberModal
            onClose={() => setShowAddMemberModal(false)}
            teamId={teamId}
            teamName={teamName}
          />
        )}

        {/* Edit Team Modal */}
        {showEditTeamModal && (
          <EditTeamModal
            onClose={() => setShowEditTeamModal(false)}
            teamId={teamId}
            team={team}
            onTeamUpdated={onTeamUpdated}
          />
        )}

        {/* Confirmation Dialog */}
        {/* {showConfirmationDialog && (
          <ConfirmationDialog
            isLoading={isLoading}
            onClose={() => setShowConfirmationDialog(false)}
            onConfirm={handleDeleteTeam}
            message={`Are you sure you want to delete ${teamName}?`}
          />
        )} */}

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

        {/* Render the EditTaskModal if editTask is set */}
        {editTask && (
          <EditTaskModal task={editTask} onClose={() => setEditTask(null)} />
        )}
      </div>
    );
  }
);

export default TaskSettings;
