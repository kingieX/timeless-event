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

// Reset Password Logic
import VerificationPage from './pages/Verification';
import LoginVerificationPage from './pages/LoginVerification';
import ForgottenPassword from './components/Reset-password-flow/ForgottenPassword';

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
import UserMessage from './pages/sidebarMenuPages/inbox/UserMessage';
import TeamMessage from './pages/sidebarMenuPages/inbox/TeamMessage';
import VendorMessage from './pages/sidebarMenuPages/inbox/VendorMessage';
import RsvpTracking from './pages/sidebarMenuPages/inbox/RsvpTracking';
import Today from './pages/sidebarMenuPages/Today';
import Upcoming from './pages/sidebarMenuPages/Upcoming';
import Completed from './pages/sidebarMenuPages/Completed';
import Notification from './pages/Notification';

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
import PasswordResetVerification from './components/Reset-password-flow/PasswordResetVerification';
import ResetPassword from './components/Reset-password-flow/ResetPassword';
import SuccessPage from './components/Reset-password-flow/SuccessPage';
import VerifyOTP from './pages/VerifyOTP';

// Workspace routes imports
import WorkspacePage from './pages/sidebarMenuPages/workspace/WorkspacePage';
// import MyWork from './pages/sidebarMenuPages/workspace/MyWork';
// import MyHome from './pages/sidebarMenuPages/workspace/MyHome';
import WorkspaceDetailPage from './pages/sidebarMenuPages/workspace/WorkspaceDetailPage';
import InvitePage from './pages/invite-team/InvitePage';
import RegistrationPage from './pages/invite-team/RegistrationPage';
import UserVerification from './pages/invite-team/UserVerification';
import SendOTP from './pages/invite-team/_components/SendOTP';
import TeamSuccessPage from './pages/invite-team/_components/SuccessPage';

const App = () => {
  return (
    <Router>
      {/* Include this line to apply the scroll behavior */}
      <ScrollToTop offset={50} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        {/* login process */}
        <Route path="/login" element={<Login />} />
        <Route path="/loginverification" element={<LoginVerificationPage />} />

        <Route path="/features" element={<Features />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/upgrade" element={<Upgrade />} />

        {/* Onborading routes */}
        <Route path="/signup/onboard" element={<Onboard1 />} />
        <Route path="/signup/customize-experience" element={<Onboard2 />} />
        <Route path="/signup/create-workspace" element={<Onboard3 />} />
        <Route path="/signup/create-team" element={<Onboard4 />} />
        <Route path="/signup/team-invite" element={<Onboard5 />} />
        <Route path="/verification" element={<VerificationPage />} />

        {/* Reset Password */}
        <Route path="/forgot-password" element={<ForgottenPassword />} />
        <Route path="/otp-verification" element={<VerifyOTP />} />
        <Route path="/verify" element={<PasswordResetVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/success" element={<SuccessPage />} />

        {/* onvite page */}
        <Route path="/invite/:team_id/:invite_id" element={<InvitePage />} />
        <Route path="/team/user-register" element={<RegistrationPage />} />
        <Route path="/team/user-verification" element={<UserVerification />} />
        <Route path="/team/send-otp" element={<SendOTP />} />
        <Route path="/team/success-page" element={<TeamSuccessPage />} />

        {/* Outlet route */}
        <Route path="/app/*" element={<Dashboard />}>
          {/* Default content to render when just "/dashboard" is accessed */}
          <Route index element={<MainContent />} />

          {/* notificatio */}
          <Route path="notification" element={<Notification />} />

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

          {/* Workspace route */}
          {/* Workspace routes */}
          <Route path="workspace" element={<WorkspacePage />} />
          <Route
            path="workspace/:workspaceId"
            element={<WorkspaceDetailPage />}
          />

          {/* <Route path="workspace/my-work" element={<MyWork />} /> */}
          {/* <Route path="workspace/my-home" element={<MyHome />} /> */}

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
