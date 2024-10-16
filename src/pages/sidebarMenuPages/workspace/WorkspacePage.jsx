import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkspaceModal from './_components/WorkspaceModal';

const WorkspacePage = () => {
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const navigate = useNavigate();

  const openWorkspaceModal = () => {
    setIsWorkspaceModalOpen(true);
  };

  const closeWorkspaceModal = () => {
    setIsWorkspaceModalOpen(false);
  };

  const handleWorkspaceCreated = workspaceId => {
    // Logic to create the workspace and redirect to the new workspace page
    closeWorkspaceModal();
    navigate(`/app/workspace/${workspaceId}`);
  };

  return (
    <div className="flex flex-col items-start lg:px-12 px-8 lg:py-1">
      <h2 className="lg:text-4xl text-2xl font-semibold lg:mb-4 mb-4 lg:text-left text-center">
        WorkSpace
      </h2>
      <p className="mb-8 lg:text-xl text-slate-700">
        Create a new workspace that handles your personal team, projects, tasks
        and events.
      </p>
      <button
        onClick={openWorkspaceModal}
        className="bg-primary text-black font-semibold py-2 px-4 w- hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
      >
        Create Workspace
      </button>

      {isWorkspaceModalOpen && (
        <WorkspaceModal
          onClose={closeWorkspaceModal}
          onWorkspaceCreated={handleWorkspaceCreated}
        />
      )}
    </div>
  );
};

export default WorkspacePage;
