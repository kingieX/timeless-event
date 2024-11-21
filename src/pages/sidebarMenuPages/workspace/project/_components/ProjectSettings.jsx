import { useState, forwardRef } from 'react';
import Cookies from 'js-cookie';
import EditProjectModal from './EditProjectModal';
import UpdateAccessModal from './UpdateAccessModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShareMemberModal from './ShareMemberModal';

const ProjectSettings = forwardRef(
  (
    { sharedMembers, projectId, project, projectName, onProjectUpdated },
    ref
  ) => {
    // console.log('members details:', sharedMembers);
    const [showDropdown, setShowDropdown] = useState(false);

    const [projectToUpdate, setProjectToUpdate] = useState(null);
    const [editProject, setEditProject] = useState(null);
    const [shareMember, setShareMember] = useState(null);

    const access_token = Cookies.get('access_token');
    // console.log('project: ', project);
    const API_BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

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
    const handleDeleteProject = async () => {
      if (window.confirm('Are you sure you want to delete this project?')) {
        try {
          await axios.delete(
            `${API_BASE_URL}/project/delete/${project.project_id}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          console.log('Project deleted successfully');

          navigate(
            `/app/workspace/${project.team_space_id}/folders/${project.folder_id}`
          );

          window.location.reload(); // Trigger project data refresh
        } catch (err) {
          console.error('Error deleting Project:', err);
          // setError('Failed to delete Project.');
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

          {/* <li
            onClick={() => handleShare(project.project_id)} // Pass folder ID here
            className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
          >
            Share with members
          </li> */}

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
            members={sharedMembers}
            onClose={() => setShareMember(null)} // Close modal on close
          />
        )}
      </div>
    );
  }
);

export default ProjectSettings;
