// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Features from './pages/navigationPages/Features';
import Resources from './pages/navigationPages/Resources';
import Pricing from './pages/navigationPages/Pricing';
import Upgrade from './pages/navigationPages/Upgrade';

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
      </Routes>
    </Router>
  );
};

export default App;
