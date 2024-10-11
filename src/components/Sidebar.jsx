import { useState } from 'react';
import { IoMdNotificationsOutline, IoMdArrowDropdown } from 'react-icons/io';
import { PiSidebarSimpleThin } from 'react-icons/pi';
import UserInfo from './_sidebar-components/UserInfo';
import MenuItem from './_sidebar-components/MenuItem';
import WorkspaceList from './_sidebar-components/WorkspaceList';
import menuItems from './_sidebar-components/menuItems';

const Sidebar = ({ userData, onToggleSidebar, isSidebarOpen, workspaces }) => {
  const [isUserMenuModalOpen, setIsUserMenuModalOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleUserMenuModal = () =>
    setIsUserMenuModalOpen(!isUserMenuModalOpen);
  const toggleSubMenu = index =>
    setOpenSubMenus(prev => ({ ...prev, [index]: !prev[index] }));

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      onToggleSidebar();
    }
  };

  return (
    <div
      className={`lg:bg-sidebar lg:bg-opacity-10 bg-white h-screen z-50 ${isSidebarOpen ? 'w-fit' : 'w-0'} transition-width duration-300`}
    >
      {isSidebarOpen && (
        <>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray">
            <UserInfo
              userData={userData}
              isUserMenuModalOpen={isUserMenuModalOpen}
              toggleUserMenuModal={toggleUserMenuModal}
            />
            <div className="flex items-center space-x-2">
              <IoMdNotificationsOutline className="text-gray-500 mr-1 cursor-pointer w-6 h-6" />
              <PiSidebarSimpleThin
                className="text-gray-500 cursor-pointer w-6 h-6"
                onClick={onToggleSidebar}
              />
            </div>
          </div>

          {/* Make this section scrollable */}
          <div className="overflow-y-auto max-h-full px-4 py-2 pb-12">
            {menuItems.map((menu, index) => (
              <MenuItem
                key={index}
                menu={menu}
                index={index}
                isSubMenuOpen={openSubMenus[index]}
                toggleSubMenu={toggleSubMenu}
                currentPath={location.pathname}
                handleLinkClick={handleLinkClick}
              />
            ))}

            <WorkspaceList workspaces={workspaces} />
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
