// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

// pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Features from './pages/navigationPages/Features';
import Resources from './pages/navigationPages/Resources';
import Pricing from './pages/navigationPages/Pricing';
import Upgrade from './pages/navigationPages/Upgrade';

// Onboarding pages
import Onboard1 from './pages/upboardingPages/Onboard1';
import Onboard2 from './pages/upboardingPages/Onboard2';
import Onboard3 from './pages/upboardingPages/Onboard3';
import Onboard4 from './pages/upboardingPages/Onboard4';
import Onboard5 from './pages/upboardingPages/Onboard5';

// outlets
import Dashboard from './Dashboard';
// default dashboard page
import MainContent from './pages/sidebarMenuPages/MainContent';

// sidebar menus
import AddEvent from './pages/sidebarMenuPages/AddEvent';
import AddTask from './pages/sidebarMenuPages/AddTask';
import Search from './pages/sidebarMenuPages/Search';
import SendNotification from './pages/sidebarMenuPages/Completed';
import UserMessage from './pages/sidebarMenuPages/inbox/UserMessage';
import TeamMessage from './pages/sidebarMenuPages/inbox/TeamMessage';
import VendorMessage from './pages/sidebarMenuPages/inbox/VendorMessage';
import RsvpTracking from './pages/sidebarMenuPages/inbox/RsvpTracking';
import Today from './pages/sidebarMenuPages/Today';
import Upcoming from './pages/sidebarMenuPages/Upcoming';
import MyWork from './pages/sidebarMenuPages/myProject/MyWork';
import MyHome from './pages/sidebarMenuPages/myProject/MyHome';

// userMenu
import Task from './pages/userMenuPages/Task';
import Event from './pages/userMenuPages/Event';
import Settings from './pages/userMenuPages/Settings';
import AddTeam from './pages/userMenuPages/AddTeam';
import AddGuest from './pages/userMenuPages/AddGuest';
import AddVendor from './pages/userMenuPages/AddVendor';
import ActivityLog from './pages/userMenuPages/ActivityLog';
import Print from './pages/userMenuPages/Print';
import ContactSupport from './pages/userMenuPages/resources/ContactSupport';
import FAQs from './pages/userMenuPages/resources/Faqs';
import Integrations from './pages/userMenuPages/resources/Integrations';
import UserGuide from './pages/userMenuPages/resources/UserGuide';
import DownloadApp from './pages/userMenuPages/resources/DownloadApp';
import WhatsNew from './pages/userMenuPages/WhatsNew';
import UpgradeTeam from './pages/userMenuPages/UpgradeTeam';
import Sync from './pages/userMenuPages/Sync';
import LogOut from './pages/userMenuPages/LogOut';
import Completed from './pages/sidebarMenuPages/Completed';

const App = () => {
  return (
    <Router>
      {/* Include this line to apply the scroll behavior */}
      <ScrollToTop offset={50} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/upgrade" element={<Upgrade />} />

        {/* Onborading routes */}
        <Route path="/signup/onboard" element={<Onboard1 />} />
        <Route path="/signup/customize-experience" element={<Onboard2 />} />
        <Route path="/signup/create-team" element={<Onboard3 />} />
        <Route path="/signup/about-team" element={<Onboard4 />} />
        <Route path="/signup/invite" element={<Onboard5 />} />

        {/* Outlet route */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          {/* Default content to render when just "/dashboard" is accessed */}
          <Route index element={<MainContent />} />

          {/* Sidebar menus routes */}
          <Route path="add-event" element={<AddEvent />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="search" element={<Search />} />
          <Route path="completed" element={<Completed />} />
          <Route path="inbox/user-messages" element={<UserMessage />} />
          <Route path="inbox/team-messages" element={<TeamMessage />} />
          <Route path="inbox/vendor-messages" element={<VendorMessage />} />
          <Route path="inbox/rsvp-tracking" element={<RsvpTracking />} />
          <Route path="today" element={<Today />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="my-project/my-work" element={<MyWork />} />
          <Route path="my-project/my-home" element={<MyHome />} />

          {/* userMenu routes */}
          <Route path="tasks" element={<Task />} />
          <Route path="events" element={<Event />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-team" element={<AddTeam />} />
          <Route path="add-guest" element={<AddGuest />} />
          <Route path="add-vendor" element={<AddVendor />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="print" element={<Print />} />
          <Route path="contact-support" element={<ContactSupport />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="user-guide" element={<UserGuide />} />
          <Route path="download-app" element={<DownloadApp />} />
          <Route path="whats-new" element={<WhatsNew />} />
          <Route path="upgrade-team" element={<UpgradeTeam />} />
          <Route path="sync" element={<Sync />} />
          <Route path="log-out" element={<LogOut />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
