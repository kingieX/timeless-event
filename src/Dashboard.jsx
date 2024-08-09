import { useState } from 'react';
import Sidebar from './components/Sidebar';
import { PiSidebarSimpleThin } from 'react-icons/pi';
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const userData = {
    username: 'User name',
    profileImage: '/path/to/profile-image.jpg', // Dynamically passed image path
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard flex">
      {/* Sidebar Toggle Button */}
      {!isSidebarOpen && (
        <button
          className="fixed top-4 left-4 p-2 bg-gray-100 rounded-full shadow-lg z-10"
          onClick={handleToggleSidebar}
        >
          <PiSidebarSimpleThin className="text-gray-500 w-6 h-6" />
        </button>
      )}

      <Sidebar
        userData={userData}
        onToggleSidebar={handleToggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="content flex-grow">{/* Main Content */}</div>
    </div>
  );
};

export default Dashboard;
