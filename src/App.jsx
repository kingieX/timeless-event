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
      </Routes>
    </Router>
  );
};

export default App;
