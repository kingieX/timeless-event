import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { PiSidebarSimpleThin } from 'react-icons/pi';
import { Outlet } from 'react-router-dom';

// Profile data
const userData = {
  username: 'User name',
  profileImage: '/path/to/profile-image.jpg',
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Effect to handle the responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      setIsSidebarOpen(!mobileView); // Hide sidebar by default on mobile
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex lg:items-start justify-center items-center">
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-10"
            onClick={handleToggleSidebar}
          ></div>
        )}

        {/* Sidebar Toggle Button */}
        {(!isSidebarOpen || (!isMobile && isSidebarOpen)) && (
          <button
            className="fixed top-4 left-4 p-2 bg-gray-100 rounded-sm shadow-sm z-20 hover:bg-slate-100"
            onClick={handleToggleSidebar}
          >
            <PiSidebarSimpleThin className="text-gray-500 w-6 h-6" />
          </button>
        )}

        <div
          className={`${
            isSidebarOpen ? 'translate-x-0' : ''
          } md:translate-x-0 fixed md:static inset-y-0 left-0 z-30`}
        >
          <Sidebar
            userData={userData}
            onToggleSidebar={handleToggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
        </div>

        <div className="flex flex-col flex-grow">
          <div className="lg:hidden block fixed bg-white w-full h-16 shadow-sm z-10 -p-4"></div>
          {/* All Pages Content Outlets */}
          <div className="p-4 mt-8 lg:mt-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
