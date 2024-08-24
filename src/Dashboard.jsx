import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import { PiSidebarSimpleThin } from 'react-icons/pi';
import { Outlet, useLocation } from 'react-router-dom';

const userData = {
  username: 'Kingsley',
  profileImage: '',
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [currentPageTitle, setCurrentPageTitle] = useState('');

  const headerRef = useRef(null);
  const stickyHeaderRef = useRef(null);
  const location = useLocation();

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      setIsSidebarOpen(!mobileView);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Intersection Observer to detect when the header is out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  // Update the page title dynamically based on the route
  useEffect(() => {
    switch (location.pathname) {
      case '/app/upcoming':
        setCurrentPageTitle('Upcoming');
        break;
      case '/app/today':
        setCurrentPageTitle('Today');
        break;
      case '/app/completed':
        setCurrentPageTitle('Completed');
        break;
      default:
        setCurrentPageTitle('');
        break;
    }
  }, [location.pathname]);

  return (
    <>
      <div className="flex lg:items-start justify-center items-center">
        {isSidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-10"
            onClick={handleToggleSidebar}
          ></div>
        )}

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
          } md:translate-x-0 fixed inset-y-0 left-0 z-30`}
        >
          <Sidebar
            userData={userData}
            onToggleSidebar={handleToggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
        </div>

        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Sticky Header */}
          <div
            ref={stickyHeaderRef}
            className={`fixed bg-white w-full h-16 shadow-sm z-10 p-4 transition-transform duration-300 ${
              isHeaderSticky ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            {/* Render dynamic title */}
            <h1 className="text-2xl text-center font-bold">
              {currentPageTitle}
            </h1>
          </div>

          {/* Actual Header that triggers sticky behavior */}
          <div ref={headerRef} className="p-4 mt-8 lg:mt-0">
            <h1 className="text-2xl text-center font-bold">
              {/* {currentPageTitle} */}
            </h1>
          </div>

          {/* All Pages Content Outlets */}
          <div
            className={`flex-grow transition-all duration-300 ease-in-out ${
              isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
            } p-4 mt-8 lg:mt-4 overflow-y-auto`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
