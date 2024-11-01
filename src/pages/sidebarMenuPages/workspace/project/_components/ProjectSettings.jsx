import { useState, forwardRef } from 'react';
import EditTeamModal from '../../_components/EditTeamModal';
import ConfirmationDialog from '../../_components/ConfirmationDialog';
import AddMemberModal from '../../../../create-team/AddMemberModal';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line, RiAddLine } from 'react-icons/ri';
import Cookies from 'js-cookie';

const ProjectSettings = forwardRef(
  ({ projectId, project, projectName, onProjectUpdated }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    // console.log('team details:', teamName);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showEditTeamModal, setShowEditTeamModal] = useState(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

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

    return (
      <div ref={ref} className="relative">
        {/* <button onClick={toggleDropdown}>
          <BsThreeDotsVertical className="w-5 h-5 cursor-pointer" />
        </button> */}

        {/* {showDropdown && ( */}
        <ul className="absolute w-40 right-0 mt-4 bg-white border border-slate-300 rounded shadow-lg z-10">
          <li
            onClick={() => setShowAddMemberModal(true)}
            className="flex items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
          >
            <RiAddLine size={20} />
            <span>Add Member</span>
          </li>
          <li
            onClick={() => setShowEditTeamModal(true)}
            className="flex items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
          >
            <CiEdit size={20} />
            <span>Edit Team</span>
          </li>
          {/* <li
            onClick={() => setShowConfirmationDialog(true)}
            className="flex items-center space-x-2 p-2 text-red-500 text-sm hover:bg-blue-100 cursor-pointer"
          >
            <RiDeleteBin6Line size={20} />
            <span>Delete Team</span>
          </li> */}
        </ul>
        {/* )} */}

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
      </div>
    );
  }
);

export default ProjectSettings;
