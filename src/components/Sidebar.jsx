/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserMenuModal from './SidebarModal';

// icons
import { IoAddCircleOutline, IoSearchOutline } from 'react-icons/io5';
import { HiOutlineInboxIn } from 'react-icons/hi';
import { TbMessage, TbMessages, TbMessage2Pin } from 'react-icons/tb';
import { PiCalendarStarDuotone, PiSidebarSimpleThin } from 'react-icons/pi';
import { BsCalendar4Event } from 'react-icons/bs';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { TiFolder } from 'react-icons/ti';
import { MdWorkOutline } from 'react-icons/md';
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoMdNotificationsOutline,
} from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';

const menuItems = [
  {
    name: 'Add event',
    icon: IoAddCircleOutline,
    link: '/app/add-event',
  },
  {
    name: 'Add task',
    icon: IoAddCircleOutline,
    link: '/app/add-task',
  },
  {
    name: 'Search',
    icon: IoSearchOutline,
    link: '/app/search',
  },
  {
    name: 'Inbox',
    icon: HiOutlineInboxIn,
    link: '#',
    subMenu: [
      {
        name: 'User messages',
        icon: TbMessage,
        link: '/app/inbox/user-messages',
      },
      {
        name: 'Team messages',
        icon: TbMessages,
        link: '/app/inbox/team-messages',
      },
      {
        name: 'Vendor messages',
        icon: TbMessage2Pin,
        link: '/app/inbox/vendor-messages',
      },
      {
        name: 'RSVP tracking',
        icon: PiCalendarStarDuotone,
        link: '/app/inbox/rsvp-tracking',
      },
    ],
  },
  {
    name: 'Today',
    icon: BsCalendar4Event,
    link: '/app/today',
  },
  {
    name: 'Upcoming',
    icon: MdOutlineCalendarMonth,
    link: '/app/upcoming',
  },
  {
    name: 'Completed',
    icon: FaRegCalendarCheck,
    link: '/app/completed',
  },
];

const Sidebar = ({ userData, onToggleSidebar, isSidebarOpen, workspaces }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // State to control the visibility of different modals
  const [isUserMenuModalOpen, setIsUserMenuModalOpen] = useState(false);

  // State to manage which submenu is open
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleUserMenuModal = () => {
    setIsUserMenuModalOpen(!isUserMenuModalOpen);
  };

  const toggleSubMenu = index => {
    setOpenSubMenus(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      onToggleSidebar();
    }
  };

  const isMenuActive = (menu, currentPath) => {
    if (menu.subMenu) {
      return menu.subMenu.some(subMenu => subMenu.link === currentPath);
    }
    return menu.link === currentPath;
  };

  // Username display length
  const maxLength = 10;

  return (
    <div
      className={`lg:bg-sidebar lg:bg-opacity-10 bg-white h-screen z-50 ${isSidebarOpen ? 'w-fit' : 'w-0'} transition-width duration-300`}
    >
      {isSidebarOpen && (
        <>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray">
            <div className="flex items-center hover:bg-blue-50">
              {userData.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt={userData.username}
                  className="w-9 h-9 rounded-full"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  <CgProfile className="w-6 h-6 text-black" />
                </div>
              )}

              <div className="flex ml-3 relative">
                <h4 className="font-semibold">
                  {userData.username.length > maxLength
                    ? `${userData.username.slice(0, maxLength)}...`
                    : userData.username}
                </h4>
                <button
                  className="text-gray-500 flex items-center"
                  onClick={toggleUserMenuModal}
                >
                  <IoMdArrowDropdown className="cursor-pointer w-6 h-6" />
                </button>

                {isUserMenuModalOpen && (
                  <UserMenuModal
                    toggleModal={toggleUserMenuModal}
                    onToggleSidebar={onToggleSidebar}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="notification" onClick={handleLinkClick}>
                <IoMdNotificationsOutline className="text-gray-500 mr-1 cursor-pointer w-6 h-6" />
              </Link>
              <PiSidebarSimpleThin
                className="text-gray-500 cursor-pointer w-6 h-6"
                onClick={onToggleSidebar}
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-full">
            {menuItems.map((menu, index) => (
              <div key={index}>
                {menu.subMenu ? (
                  <>
                    <div
                      className={`flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer ${
                        isMenuActive(menu, currentPath) ? 'bg-blue-100' : ''
                      }`}
                      onClick={() => toggleSubMenu(index)}
                    >
                      <menu.icon
                        className={`w-6 h-6 mr-4 ${isMenuActive(menu, currentPath) ? '' : ''}`}
                      />
                      <span
                        className={`${isMenuActive(menu, currentPath) ? '' : ''}`}
                      >
                        {menu.name}
                      </span>
                      <span className="ml-auto">
                        {openSubMenus[index] ? (
                          <IoMdArrowDropup className="w-6 h-6" />
                        ) : (
                          <IoMdArrowDropdown className="w-6 h-6" />
                        )}
                      </span>
                    </div>
                    {openSubMenus[index] && (
                      <div className="">
                        {menu.subMenu.map((subMenu, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subMenu.link}
                            onClick={handleLinkClick}
                          >
                            <div
                              className={`flex items-center pl-8 px-4 py-2 hover:bg-blue-50 cursor-pointer ${
                                currentPath === subMenu.link
                                  ? 'bg-blue-100 text-primary border-l-4 border-l-primary'
                                  : ''
                              }`}
                            >
                              <subMenu.icon
                                className={`w-6 h-6 mr-4 ${currentPath === subMenu.link ? 'text-primary' : ''}`}
                              />
                              <span
                                className={`${currentPath === subMenu.link ? 'text-primary' : ''}`}
                              >
                                {subMenu.name}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={menu.link} onClick={handleLinkClick}>
                    <div
                      className={`flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer ${
                        currentPath === menu.link
                          ? 'bg-blue-100 text-primary border-l-4 border-l-primary'
                          : ''
                      }`}
                    >
                      <menu.icon
                        className={`w-6 h-6 mr-4 ${currentPath === menu.link ? 'text-primary' : ''}`}
                      />
                      <span
                        className={`${currentPath === menu.link ? 'text-primary' : ''}`}
                      >
                        {menu.name}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            ))}

            {/* Workspace Section */}
            <div className="border-t border-gray mt-4">
              <Link
                to="/app/workspace"
                className="flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer"
              >
                <MdWorkOutline className="w-6 h-6 mr-4" />
                <span>Workspace</span>
                <IoAddCircleOutline className="w-6 h-6 ml-auto" />
              </Link>

              {/* Render dynamic workspaces */}
              {workspaces.map((workspace, index) => (
                <Link
                  key={index}
                  to={`/app/workspace/${workspace.id}`}
                  className="flex items-center pl-10 px-4 py-2 hover:bg-blue-50 cursor-pointer"
                >
                  <TiFolder className="w-6 h-6 mr-4" />
                  <span>{workspace.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
