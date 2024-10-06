/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// WorkspaceModalContext.js
import { createContext, useContext, useState } from 'react';

const WorkspaceModalContext = createContext();

// export const useWorkspaceModalContext = () => useContext(WorkspaceModalContext);

export const WorkspaceModalProvider = ({ children }) => {
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState([]); // Centralized workspace state

  const toggleWorkspaceModal = () => {
    setIsWorkspaceModalOpen(prev => !prev);
  };

  const addWorkspace = newWorkspace => {
    setWorkspaces(prevWorkspaces => [...prevWorkspaces, newWorkspace]);
  };

  return (
    <WorkspaceModalContext.Provider
      value={{
        isWorkspaceModalOpen,
        toggleWorkspaceModal,
        workspaces,
        addWorkspace,
      }}
    >
      {children}
    </WorkspaceModalContext.Provider>
  );
};

// Custom hook to use the workspace modal context
export const useWorkspaceModalContext = () => {
  return useContext(WorkspaceModalContext);
};
