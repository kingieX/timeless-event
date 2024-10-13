import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import { PiSidebarSimpleThin } from 'react-icons/pi';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Redirect from './components/Redirect';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [currentPageTitle, setCurrentPageTitle] = useState('');
  const [workspaces, setWorkspaces] = useState([]); // Workspaces state

  const fullname = Cookies.get('fullname');
  const user_id = Cookies.get('user_id'); // Assuming you have user_id stored in cookies
  const access_token = Cookies.get('access_token'); // Assuming access_token is stored in cookies

  const userData = {
    username: fullname,
    profileImage: '',
  };

  // Fetch workspaces linked to the user
  const fetchWorkspaces = async () => {
    try {
      if (!access_token) {
        // Redirect to login page if access token is not available
        navigate('/');
      }

      const API_BASE_URL = import.meta.env.VITE_BASE_URL; // Update with your base URL from environment variables
      const response = await fetch(
        `${API_BASE_URL}/teamspace/creator?user_id=${user_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`, // Pass access_token in headers
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch workspaces');
      }

      if (!response.ok) {
        // Handle 404 status when no workspaces are found
        console.log('No workspaces found');
        setWorkspaces([]);
        return;
      }

      if (response.ok) {
        const data = await response.json(); // Parse JSON response
        // console.log('Fetched data:', data);
        setWorkspaces(data); // Set the workspaces from API
      }

      // save workspace id in cookies
      // `workspaces` is an array of objects containing `team_space_id`
      const workspaceIds = workspaces.map(workspace => workspace.team_space_id);
      // Save the array as a JSON string in the cookies
      const workspace_ids = Cookies.set(
        'workspace_ids',
        JSON.stringify(workspaceIds)
      );
      // console.log('workspace id:', workspace_ids);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      setWorkspaces([]); // Fallback in case of error
    }
  };

  useEffect(() => {
    fetchWorkspaces(); // Fetch workspaces when the component mounts
  }, []);

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
      case '/app/notification':
        setCurrentPageTitle('Notifications');
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
          } sidebar md:translate-x-0 fixed inset-y-0 left-0 z-30`}
        >
          {/* Pass the fetched workspaces to the Sidebar */}
          <Sidebar
            userData={userData}
            onToggleSidebar={handleToggleSidebar}
            isSidebarOpen={isSidebarOpen}
            workspaces={workspaces} // Dynamically render workspaces here
          />
        </div>

        <div className="flex flex-col flex-grow overflow-hidden">
          <div
            ref={stickyHeaderRef}
            className={`fixed bg-white w-full h-16 shadow-sm z-10 p-4 transition-transform duration-300 ${
              isHeaderSticky ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <h1 className="text-2xl text-center font-bold">
              {currentPageTitle}
            </h1>
          </div>

          <div ref={headerRef} className="p-4 mt-8 lg:mt-0">
            <h1 className="text-2xl text-center font-bold"></h1>
          </div>

          <div
            className={`flex-grow transition-all duration-300 ease-in-out ${
              isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
            } outlet px-4 mt-8 lg:mt-4 overflow-y-auto`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
