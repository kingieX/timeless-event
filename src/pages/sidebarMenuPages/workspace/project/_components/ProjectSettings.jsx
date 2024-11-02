import { useState, forwardRef } from 'react';
import EditTeamModal from '../../_components/EditTeamModal';
import ConfirmationDialog from '../../_components/ConfirmationDialog';
import AddMemberModal from '../../../../create-team/AddMemberModal';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line, RiAddLine } from 'react-icons/ri';
import Cookies from 'js-cookie';
import EditProjectModal from './EditProjectModal';
import UpdateAccessModal from './UpdateAccessModal';

const ProjectSettings = forwardRef(
  ({ projectId, project, projectName, onProjectUpdated }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    // console.log('team details:', teamName);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showEditTeamModal, setShowEditTeamModal] = useState(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const [projectToUpdate, setProjectToUpdate] = useState(null);
    const [editProject, setEditProject] = useState(null);
    const [shareMember, setShareMember] = useState(null);

    const access_token = Cookies.get('access_token');
    const API_BASE_URL = import.meta.env.VITE_BASE_URL;

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

    //   console.log('Team id for deletion', teamId);

    // const handleDeleteTeam = () => {
    //   setIsLoading(true);
    //   // Send DELETE request to backend
    //   fetch(`${API_BASE_URL}/team/${team.team_id}`, {
    //     method: 'DELETE',
    //     headers: {
    //       Authorization: `Bearer ${access_token}`, // Pass token_id in the header
    //     },
    //   })
    //     .then(response => {
    //       if (response.ok) {
    //         setIsLoading(false);
    //         console.log('Team deleted successfully');
    //         setShowConfirmationDialog(false);
    //         window.location.reload(); // Reload the page

    //         // Handle success, possibly refresh the team list
    //       }
    //     })
    //     .catch(error => {
    //       console.error('Error deleting team:', error);
    //     });
    // };

    // logic to handle Update project access
    const handleUpdateAccess = projectId => {
      setProjectToUpdate(projectId);
    };

    // logic to handle share with members
    const handleShare = projectId => {
      setShareMember(projectId);
    };

    // logic to handle Edit project
    const handleEditProject = project => {
      setEditProject(project);
    };

    // logic to handle Delete project
    const handleDeleteProject = async projectId => {
      if (window.confirm('Are you sure you want to delete this project?')) {
        try {
          await axios.delete(`${API_BASE_URL}/project/delete/${projectId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log('Project deleted successfully');
          window.location.reload(); // Trigger project data refresh
        } catch (err) {
          console.error('Error deleting Project:', err);
          setError('Failed to delete Project.');
        }
      }
    };

    return (
      <div ref={ref} className="relative">
        <ul className="absolute z-50 right-4 top-10 w-40 bg-white border rounded-lg shadow-lg">
          <li
            onClick={() => handleUpdateAccess(project.project_id)} // Pass folder ID here
            className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
          >
            Update project access
          </li>

          <li
            onClick={() => handleShare(project.project_id)} // Pass folder ID here
            className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
          >
            Share with members
          </li>

          <li
            onClick={() => handleEditProject(project)}
            className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
          >
            Edit Project
          </li>

          <li
            onClick={() => handleDeleteProject(project.project_id)}
            className="flex w-full items-center space-x-2 p-2 text-red-500 text-sm hover:bg-blue-100 cursor-pointer"
          >
            Delete Project
          </li>
        </ul>

        {/* Confirmation Dialog */}
        {showConfirmationDialog && (
          <ConfirmationDialog
            isLoading={isLoading}
            onClose={() => setShowConfirmationDialog(false)}
            onConfirm={handleDeleteTeam}
            message={`Are you sure you want to delete ${teamName}?`}
          />
        )}

        {/* Render the UpdateAccessModal if projectToUpdate is set */}
        {projectToUpdate && (
          <UpdateAccessModal
            projectId={projectToUpdate} // Pass the project
            onClose={() => setProjectToUpdate(null)} // Close modal on close
          />
        )}

        {/* Render the EditProjectModal if editProject is set */}
        {editProject && (
          <EditProjectModal
            project={editProject}
            onClose={() => setEditProject(null)} // Close modal on close
          />
        )}

        {/* Render the ShareMemberModal if shareMember is set */}
        {shareMember && (
          <ShareMemberModal
            projectId={shareMember} // Pass the project
            onClose={() => setShareMember(null)} // Close modal on close
          />
        )}
      </div>
    );
  }
);

export default ProjectSettings;
