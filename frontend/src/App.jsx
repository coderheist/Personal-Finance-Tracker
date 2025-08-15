import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import ExportImport from './pages/ExportImport';
import Notifications from './pages/Notifications';
import ScheduledTransactions from './pages/ScheduledTransactions';
import Home from './pages/Home';
import './index.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showHome, setShowHome] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showExportImport, setShowExportImport] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showScheduled, setShowScheduled] = useState(false);

  useEffect(() => {
    // Always start with Home page
    setShowHome(true);
    setShowLogin(false);
    setShowSignup(false);
    setShowGroups(false);
    setShowProfile(false);
    setShowCategories(false);
    setShowExportImport(false);
    setShowNotifications(false);
    setShowScheduled(false);

    // Try to restore user from token
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
      setShowHome(false);
      fetchCategories(token);
    }
  }, []);

  const fetchCategories = async (token) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/categories`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCategories(data);
    } catch {
      setCategories([]);
    }
  };

  const handleCategoryChange = () => {
    const token = localStorage.getItem('token');
    if (token) fetchCategories(token);
  };

  if (!user) {
    if (showHome) {
      return <Home 
        onLoginClick={() => { setShowLogin(true); setShowHome(false); setShowSignup(false); }}
        onSignupClick={() => { setShowSignup(true); setShowHome(false); setShowLogin(false); }}
      />;
    }
    if (showLogin) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <Login onLogin={user => {
              setUser(user);
              setShowHome(false);
              setShowLogin(false);
              setShowSignup(false);
              fetchCategories(user.token);
            }} />
            <div className="text-center mt-6 space-x-4">
              <span className="text-gray-600">Don't have an account?</span>
              <button 
                onClick={() => { setShowSignup(true); setShowLogin(false); setShowHome(false); }}
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors duration-200"
              >
                Sign Up
              </button>
              <span className="text-gray-400">|</span>
              <button 
                onClick={() => { setShowHome(true); setShowLogin(false); setShowSignup(false); }}
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors duration-200"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (showSignup) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <Signup onSignup={user => {
              setUser(user);
              setShowSignup(false);
              setShowLogin(false);
              setShowHome(false);
              fetchCategories(user.token);
            }} />
            <div className="text-center mt-6 space-x-4">
              <span className="text-gray-600">Already have an account?</span>
              <button 
                onClick={() => { setShowLogin(true); setShowSignup(false); setShowHome(false); }}
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors duration-200"
              >
                Login
              </button>
              <span className="text-gray-400">|</span>
              <button 
                onClick={() => { setShowHome(true); setShowLogin(false); setShowSignup(false); }}
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors duration-200"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-2 mr-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">Finance Tracker</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <button 
                onClick={() => { setShowGroups(false); setShowProfile(false); setShowCategories(false); setShowExportImport(false); setShowNotifications(false); setShowScheduled(false); }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  !showGroups && !showProfile && !showCategories && !showExportImport && !showNotifications && !showScheduled
                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => { setShowGroups(true); setShowProfile(false); setShowCategories(false); setShowExportImport(false); setShowNotifications(false); setShowScheduled(false); }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  showGroups
                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Groups
              </button>
              <button 
                onClick={() => { setShowGroups(false); setShowProfile(true); setShowCategories(false); setShowExportImport(false); setShowNotifications(false); setShowScheduled(false); }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  showProfile
                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Profile
              </button>
              <button 
                onClick={() => { setShowGroups(false); setShowProfile(false); setShowCategories(true); setShowExportImport(false); setShowNotifications(false); setShowScheduled(false); }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  showCategories
                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Categories
              </button>
              <button 
                onClick={() => { setShowGroups(false); setShowProfile(false); setShowCategories(false); setShowExportImport(false); setShowNotifications(false); setShowScheduled(true); }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  showScheduled
                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Scheduled
              </button>
              <button 
                onClick={() => { setShowGroups(false); setShowProfile(false); setShowCategories(false); setShowExportImport(true); setShowNotifications(false); setShowScheduled(false); }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  showExportImport
                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Export/Import
              </button>
              <button 
                onClick={() => { setShowGroups(false); setShowProfile(false); setShowCategories(false); setShowExportImport(false); setShowNotifications(true); setShowScheduled(false); }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  showNotifications
                    ? 'bg-purple-100 text-purple-700 shadow-sm'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Notifications
              </button>
            </div>

            {/* Logout Button */}
            <button 
              onClick={() => { setUser(null); setShowHome(true); setShowLogin(false); setShowSignup(false); setCategories([]); }}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        {showNotifications ? (
          <Notifications token={localStorage.getItem('token')} categories={categories} />
        ) : showScheduled ? (
          <ScheduledTransactions token={localStorage.getItem('token')} categories={categories} />
        ) : showExportImport ? (
          <ExportImport transactions={[]} />
        ) : showCategories ? (
          <Categories token={localStorage.getItem('token')} onCategoryChange={handleCategoryChange} />
        ) : showProfile ? (
          <Profile token={localStorage.getItem('token')} />
        ) : showGroups ? (
          <Groups token={localStorage.getItem('token')} />
        ) : (
          <Dashboard user={user} categories={categories} />
        )}
      </main>
    </div>
  );
};

export default App;
