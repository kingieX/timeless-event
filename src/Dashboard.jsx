import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { PiSidebarSimpleThin } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const userData = {
    username: 'User name',
    profileImage: '/path/to/profile-image.jpg', // Dynamically passed image path
  };

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

  const handleClick = () => {
    navigate('/upgrade-team');
  };

  return (
    <>
      <div className="flex">
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
            className="fixed top-4 left-4 p-2 bg-gray-100 rounded-full shadow-lg z-20"
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

        <div className="flex flex-col flex-grow lg:justify-center items-center py-16">
          {/* Main Content */}
          <h2 className="lg:text-6xl text-4xl font-semibold lg:mb-12 mb-8 text-center">
            What’s New
          </h2>
          <div className="lg:w-1/4 flex lg:justify-between justify-center space-x-4">
            <button
              onClick={handleClick}
              className="border border-primary text-primary font-semibold py-2 px-4 hover:bg-primary hover:text-black transition duration-300"
            >
              Upgrade Team
            </button>
            <button
              onClick={handleClick}
              className="border border-primary text-primary font-semibold py-2 px-4 hover:bg-primary hover:text-black transition duration-300"
            >
              Sync
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
