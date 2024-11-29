import { useState, forwardRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SubtaskReminderModal from './SubtaskReminderModal';
import EditSubtaskModal from './EditSubtaskModal';
import UpdateSubtaskStatusModal from './UpdateSubtaskStatusModal';
import AssignUserModal from './AssignUserModal';

const SubtaskSettings = forwardRef(({ subtask }, ref) => {
  //   console.log('subtask details:', subtask);
  const [showDropdown, setShowDropdown] = useState(false);

  const [reminder, setReminder] = useState(null);
  const [assignUser, setAssignUser] = useState(null);
  const [editSubtask, setEditSubtask] = useState(null);
  const [subtaskStatus, setSubtaskStatus] = useState(null);

  const [ids, setIds] = useState(null);

  const access_token = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  //   useEffect(() => {
  //     const GetIds = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${API_BASE_URL}/project/projects/${task.project_id}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${access_token}`,
  //             },
  //           }
  //         );
  //         const data = response.data; // Directly accessing the data
  //         setIds({
  //           teamSpaceId: data.team_space_id,
  //           projectId: data.project_id,
  //           folderId: data.folder_id,
  //         });
  //         // console.log('Ids:', {
  //         //   teamSpaceId: data.team_space_id,
  //         //   projectId: data.project_id,
  //         //   folderId: data.folder_id,
  //         // });
  //       } catch (error) {
  //         console.error('Error fetching Ids:', error);
  //       }
  //     };
  //     GetIds();
  //   }, [task.project_id, access_token, API_BASE_URL]);

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

  return (
    <div ref={ref} className="relative">
      <ul className="absolute z-50 right-4 top-10 w-48 bg-white border rounded-lg shadow-lg">
        <li
          onClick={() => handleSetReminder(subtask.sub_task_id)}
          className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
        >
          Set Reminder
        </li>

        <li
          onClick={() => handleAssignUser(subtask.sub_task_id)}
          className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
        >
          Assign User
        </li>
        <li
          onClick={() => handleEditSubtask(subtask)}
          className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
        >
          Edit Subtask
        </li>
        <li
          onClick={() => handleUpdateStatus(subtask)} // Pass folder ID here
          className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
        >
          Update Subtask Status
        </li>
        {/* <li
          onClick={() => handleDeleteSubtask(subtask.sub_task_id)}
          className="flex w-full items-center space-x-2 p-2 text-red-500 text-sm hover:bg-blue-100 cursor-pointer"
        >
          Delete Subtask
        </li> */}
      </ul>

      {/* Render the SubtaskReminderModal if reminder is set */}
      {reminder && (
        <SubtaskReminderModal
          subTaskId={reminder}
          onClose={() => setReminder(null)}
        />
      )}

      {/* Render the AssignUserModal if assignUser is set */}
      {assignUser && (
        <AssignUserModal
          subTaskId={assignUser}
          onClose={() => setAssignUser(null)}
        />
      )}
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
});

export default SubtaskSettings;
