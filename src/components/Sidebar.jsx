/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { PiSidebarSimpleThin } from 'react-icons/pi';
import UserMenuModal from './SidebarModal';

const menuItems = [
  {
    name: 'Add event',
    icon: '/image/sidebar-assets/btn1.svg',
    link: '/dashboard/add-event',
  },
  {
    name: 'Add task',
    icon: '/image/sidebar-assets/btn1.svg',
    link: '/dashboard/add-task',
  },
  {
    name: 'Search',
    icon: '/image/sidebar-assets/btn2.svg',
    link: '/dashboard/search',
  },
  {
    name: 'Inbox',
    icon: '/image/sidebar-assets/btn4.svg',
    link: '#',
    subMenu: [
      {
        name: 'User messages',
        icon: '/image/sidebar-assets/btn5.svg',
        link: '/dashboard/inbox/user-messages',
      },
      {
        name: 'Team messages',
        icon: '/image/sidebar-assets/btn5.svg',
        link: '/dashboard/inbox/team-messages',
      },
      {
        name: 'Vendor messages',
        icon: '/image/sidebar-assets/btn6.svg',
        link: '/dashboard/inbox/vendor-messages',
      },
      {
        name: 'RSVP tracking',
        icon: '/image/sidebar-assets/btn7.svg',
        link: '/dashboard/inbox/rsvp-tracking',
      },
    ],
  },
  {
    name: 'Today',
    icon: '/image/sidebar-assets/btn8.svg',
    link: '/dashboard/today',
  },
  {
    name: 'Upcoming',
    icon: '/image/sidebar-assets/btn9.svg',
    link: '/dashboard/upcoming',
  },
  {
    name: 'Completed',
    icon: '/image/sidebar-assets/btn3.svg',
    link: '/dashboard/completed',
  },
  {
    name: 'My Projects',
    icon: '/image/sidebar-assets/btn10.svg',
    link: '#',
    subMenu: [
      {
        name: 'My work',
        icon: '/image/sidebar-assets/btn11.svg',
        link: '/dashboard/my-project/my-work',
      },
      {
        name: 'My home',
        icon: '/image/sidebar-assets/btn12.svg',
        link: '/dashboard/my-project/my-home',
      },
    ],
  },
];

const Sidebar = ({ userData, onToggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to manage which submenu is open
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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

  return (
    <div
      className={`bg-sidebar h-screen z-50 ${isSidebarOpen ? 'w-fit' : 'w-0'} transition-width duration-300`}
    >
      {isSidebarOpen && (
        <>
          <div className="bg-sidebar flex items-center justify-between p-4 border-b border-gray">
            <div className="flex items-center">
              <img
                src={userData.profileImage}
                alt={userData.username}
                className="w-10 h-10 rounded-full bg-accent"
              />
              <div className="flex ml-3 relative">
                <h4 className="font-semibold">{userData.username}</h4>
                <button
                  className="text-gray-500 flex items-center"
                  onClick={toggleModal}
                >
                  <IoMdArrowDropdown className="cursor-pointer w-6 h-6" />
                </button>

                {isModalOpen && (
                  <UserMenuModal
                    toggleModal={toggleModal}
                    onToggleSidebar={onToggleSidebar}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="notification">
                <IoMdNotificationsOutline className="text-gray-500 mr-1 cursor-pointer w-6 h-6" />
              </Link>
              <PiSidebarSimpleThin
                className="text-gray-500 cursor-pointer w-6 h-6"
                onClick={onToggleSidebar}
              />
            </div>
          </div>

          <div className="overflow-y-auto bg-sidebar max-h-full">
            {menuItems.map((menu, index) => (
              <div key={index}>
                {menu.subMenu ? (
                  <>
                    <div
                      className={`flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer ${
                        isMenuActive(menu, currentPath)
                          ? 'bg-blue-100 border-l-4 border-l-primary'
                          : ''
                      }`}
                      onClick={() => toggleSubMenu(index)}
                    >
                      <img
                        src={menu.icon}
                        alt={`${menu.name} icon`}
                        className="w-6 h-6 mr-4"
                      />
                      <span>{menu.name}</span>
                      <span className="ml-auto">
                        {openSubMenus[index] ? (
                          <IoMdArrowDropup className="w-6 h-6" />
                        ) : (
                          <IoMdArrowDropdown className="w-6 h-6" />
                        )}
                      </span>
                    </div>
                    {openSubMenus[index] && (
                      <div className="ml-8">
                        {menu.subMenu.map((subMenu, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subMenu.link}
                            onClick={handleLinkClick}
                          >
                            <div
                              className={`flex items-center px-4 py-2 hover:bg-blue-100 cursor-pointer ${
                                currentPath === subMenu.link
                                  ? 'bg-blue-100'
                                  : ''
                              }`}
                            >
                              <img
                                src={subMenu.icon}
                                alt={`${subMenu.name} icon`}
                                className="w-6 h-6 mr-4"
                              />
                              <span>{subMenu.name}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={menu.link} onClick={handleLinkClick}>
                    <div
                      className={`flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer ${
                        currentPath === menu.link
                          ? 'bg-blue-100 border-l-4 border-l-primary'
                          : ''
                      }`}
                    >
                      <img
                        src={menu.icon}
                        alt={`${menu.name} icon`}
                        className="w-6 h-6 mr-4"
                      />
                      <span>{menu.name}</span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
