import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import EnhancedVendorDashboard from './components/EnhancedVendorDashboard';
import HostDashboard from './components/HostDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="flex justify-between items-center py-6 px-8 bg-white shadow-md">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              <span className="text-2xl font-bold text-accent">LetsHost</span>
            </Link>
          </div>
          <div className="space-x-6">
            <Link to="/" className="text-gray-700 hover:text-accent transition-colors">Home</Link>
            <Link to="/venues" className="text-gray-700 hover:text-accent transition-colors">Venues</Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-accent transition-colors">How It Works</Link>
            <Link to="/vendor-dashboard" className="text-gray-700 hover:text-accent transition-colors">Vendor Dashboard</Link>
            <Link to="/host-dashboard" className="text-gray-700 hover:text-accent transition-colors">Host Dashboard</Link>
            <button className="bg-accent hover:bg-accent-dark px-4 py-2 rounded-full text-white transition-colors">Login</button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/vendor-dashboard" element={<EnhancedVendorDashboard />} />
          <Route path="/host-dashboard" element={<HostDashboard />} />
          {/* Add more routes as needed */}
          <Route path="/venues" element={<div>Venues Page</div>} />
          <Route path="/how-it-works" element={<div>How It Works Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
