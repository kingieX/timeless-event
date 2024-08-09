// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Features from './pages/navigationPages/Features';
import Resources from './pages/navigationPages/Resources';
import Pricing from './pages/navigationPages/Pricing';
import Upgrade from './pages/navigationPages/Upgrade';
import Onboard1 from './pages/upboardingPages/Onboard1';
import Onboard2 from './pages/upboardingPages/Onboard2';
import Onboard3 from './pages/upboardingPages/Onboard3';
import Onboard4 from './pages/upboardingPages/Onboard4';
import Onboard5 from './pages/upboardingPages/Onboard5';
import Dashboard from './Dashboard';

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

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
