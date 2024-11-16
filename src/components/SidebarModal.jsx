import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const menuGroups = [
  // Your existing menu groups here
  [
    {
      name: 'View tasks',
      link: 'tasks',
      logo: '/image/modal-assets/btn1.svg',
    },
    {
      name: 'View events',
      link: 'events',
      logo: '/image/modal-assets/btn2.svg',
    },
  ],
  [
    {
      name: 'Settings',
      link: 'settings',
      logo: '/image/modal-assets/btn3.svg',
    },
    {
      name: 'Create a Team',
      link: 'add-team',
      logo: '/image/modal-assets/btn4.svg',
    },
    {
      name: 'Add Guest Reminder',
      link: 'add-guest',
      logo: '/image/modal-assets/btn5.svg',
    },
    {
      name: 'Send instant reminder',
      link: 'instant-reminder',
      logo: '/image/modal-assets/btn6.svg',
    },
  ],
  [
    {
      name: 'Activity Log',
      link: 'activity-log',
      logo: '/image/modal-assets/btn7.svg',
    },
    // { name: 'Print', link: 'print', logo: '/image/modal-assets/btn8.svg' }, // Print menu item
    {
      name: 'Resources',
      link: '#',
      logo: '/image/modal-assets/btn9.svg',
      subMenu: [
        {
          name: 'Contact Support',
          link: 'contact-support',
          logo: '/image/modal-assets/btn10.svg',
        },
        { name: 'FAQs', link: 'faqs', logo: '/image/modal-assets/btn11.svg' },
        {
          name: 'Integrations',
          link: 'integrations',
          logo: '/image/modal-assets/btn12.svg',
        },
        {
          name: 'User guide',
          link: 'user-guide',
          logo: '/image/modal-assets/btn13.svg',
        },
        {
          name: 'Download app',
          link: 'download-app',
          logo: '/image/modal-assets/btn14.svg',
        },
      ],
    },
  ],
  [
    // {
    //   name: "What's new",
    //   link: 'whats-new',
    //   logo: '/image/modal-assets/btn15.svg',
    // },
    // {
    //   name: 'Upgrade team',
    //   link: 'upgrade-team',
    //   logo: '/image/modal-assets/btn16.svg',
    // },
    // { name: 'Sync', link: 'sync', logo: '/image/modal-assets/btn17.svg' },
    {
      name: 'Log out',
      link: 'log-out',
      logo: '/image/modal-assets/btn18.svg',
    },
  ],
];

const UserMenuModal = ({ toggleModal, onToggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const handleToggleMenu = index => {
    setOpenMenus(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const printPage = () => {
    const sidebar = document.querySelector('.sidebar'); // Assuming your sidebar has a class of 'sidebar'
    const outlet = document.querySelector('.outlet'); // Assuming your outlet has a class of 'outlet'

    // Hide the sidebar
    sidebar.style.display = 'none';

    // Print the outlet content
    window.print();

    // After printing, show the sidebar again
    sidebar.style.display = '';
  };

  const handleMenuClick = (menuName, link) => {
    setActiveMenu(menuName);
    toggleModal(); // Close the modal

    // Use the `onToggleSidebar` correctly
    if (window.innerWidth < 768 && onToggleSidebar) {
      onToggleSidebar(); // Safely call the function if it's defined
    }

    if (link === 'print') {
      printPage(); // Call the printPage function if "Print" is clicked
    } else {
      navigate(link); // Navigate to the page for other links
    }
  };

  if (onToggleSidebar) {
    onToggleSidebar();
  }

  return (
    <>
      {/* Overlay to close the modal when clicked outside */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={toggleModal}
      ></div>

      <div className="fixed left-0 lg:mt-6 border border-gray bg-white rounded-lg shadow-md w-72 z-50">
        <div className="flex flex-col py-2 overflow-y-auto max-h-full">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.map((menu, menuIndex) => (
                <div key={menuIndex}>
                  {menu.subMenu ? (
                    <div>
                      <button
                        className={`text-left py-2 px-4 hover:bg-blue-100 w-full flex justify-between items-center ${
                          activeMenu === menu.name
                            ? 'bg-blue-100 text-blue-600'
                            : ''
                        }`}
                        onClick={() =>
                          handleToggleMenu(`${groupIndex}-${menuIndex}`)
                        }
                      >
                        <div className="flex">
                          <img
                            src={menu.logo}
                            alt={`${menu.name} logo`}
                            className="w-5 h-5 mr-2"
                          />
                          {menu.name}
                        </div>
                        {openMenus[`${groupIndex}-${menuIndex}`] ? (
                          <IoMdArrowDropup className="w-4 h-4" />
                        ) : (
                          <IoMdArrowDropdown className="w-4 h-4" />
                        )}
                      </button>
                      {openMenus[`${groupIndex}-${menuIndex}`] && (
                        <div className="ml-4">
                          {menu.subMenu.map((subMenu, subIndex) => (
                            <div
                              key={subIndex}
                              className={`text-left py-2 px-4 hover:bg-blue-100 w-full flex items-center ${
                                activeMenu === subMenu.name
                                  ? 'bg-blue-100 text-blue-600'
                                  : ''
                              }`}
                              onClick={() =>
                                handleMenuClick(subMenu.name, subMenu.link)
                              }
                            >
                              <img
                                src={subMenu.logo}
                                alt={`${subMenu.name} logo`}
                                className="w-5 h-5 mr-2"
                              />
                              {subMenu.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`text-left py-1 px-4 hover:bg-blue-100 w-full flex items-center ${
                        activeMenu === menu.name
                          ? 'bg-blue-100 text-blue-600'
                          : ''
                      }`}
                      onClick={() => handleMenuClick(menu.name, menu.link)}
                    >
                      <img
                        src={menu.logo}
                        alt={`${menu.name} logo`}
                        className="w-5 h-5 mr-2"
                      />
                      {menu.name}
                    </div>
                  )}
                </div>
              ))}
              {groupIndex < menuGroups.length - 1 && (
                <hr className="border-t border-gray" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserMenuModal;
