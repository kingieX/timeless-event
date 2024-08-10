// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import SendNotification from './pages/sidebarMenuPages/SendNotification';
import UserMessage from './pages/sidebarMenuPages/inbox/UserMessage';
import TeamMessage from './pages/sidebarMenuPages/inbox/TeamMessage';
import VendorMessage from './pages/sidebarMenuPages/inbox/VendorMessage';
import RsvpTracking from './pages/sidebarMenuPages/inbox/RsvpTracking';
import Today from './pages/sidebarMenuPages/Today';
import Upcoming from './pages/sidebarMenuPages/Upcoming';
import MyWork from './pages/sidebarMenuPages/myProject/MyWork';
import MyHome from './pages/sidebarMenuPages/myProject/MyHome';

const App = () => {
  return (
    <Router>
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
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Default content to render when just "/dashboard" is accessed */}
          <Route index element={<MainContent />} />

          {/* Sidebar menus routes */}
          <Route path="add-event" element={<AddEvent />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="search" element={<Search />} />
          <Route path="send-notifications" element={<SendNotification />} />
          <Route path="inbox/user-messages" element={<UserMessage />} />
          <Route path="inbox/team-messages" element={<TeamMessage />} />
          <Route path="inbox/vendor-messages" element={<VendorMessage />} />
          <Route path="inbox/rsvp-tracking" element={<RsvpTracking />} />
          <Route path="today" element={<Today />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="my-project/my-work" element={<MyWork />} />
          <Route path="my-project/my-home" element={<MyHome />} />
        </Route>

        {/* userMenu routes */}
      </Routes>
    </Router>
  );
};

export default App;
