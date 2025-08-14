import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import ExportImport from './pages/ExportImport';
import Notifications from './pages/Notifications';
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
        <div>
          <Login onLogin={user => {
            setUser(user);
            setShowHome(false);
            setShowLogin(false);
            setShowSignup(false);
            fetchCategories(user.token);
          }} />
          <p style={{ textAlign: 'center' }}>
            Don't have an account?{' '}
            <button onClick={() => { setShowSignup(true); setShowLogin(false); setShowHome(false); }}>Sign Up</button>
            {' '}|{' '}
            <button onClick={() => { setShowHome(true); setShowLogin(false); setShowSignup(false); }}>Home</button>
          </p>
        </div>
      );
    }
    if (showSignup) {
      return (
        <div>
          <Signup onSignup={user => {
            setUser(user);
            setShowSignup(false);
            setShowLogin(false);
            setShowHome(false);
            fetchCategories(user.token);
          }} />
          <p style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <button onClick={() => { setShowLogin(true); setShowSignup(false); setShowHome(false); }}>Login</button>
            {' '}|{' '}
            <button onClick={() => { setShowHome(true); setShowLogin(false); setShowSignup(false); }}>Home</button>
          </p>
        </div>
      );
    }
  }

  return (
    <div className="app-container" style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <nav style={{ textAlign: 'center', marginBottom: 20 }}>
        <button onClick={() => { setShowGroups(false); setShowProfile(false); setShowCategories(false); setShowExportImport(false); setShowNotifications(false); }}>Dashboard</button>
        <button onClick={() => { setShowGroups(true); setShowProfile(false); setShowCategories(false); setShowExportImport(false); setShowNotifications(false); }} style={{ marginLeft: 10 }}>Groups</button>
        <button onClick={() => { setShowGroups(false); setShowProfile(true); setShowCategories(false); setShowExportImport(false); setShowNotifications(false); }} style={{ marginLeft: 10 }}>Profile</button>
        <button onClick={() => { setShowGroups(false); setShowProfile(false); setShowCategories(true); setShowExportImport(false); setShowNotifications(false); }} style={{ marginLeft: 10 }}>Categories</button>
        <button onClick={() => { setShowGroups(false); setShowProfile(false); setShowCategories(false); setShowExportImport(true); setShowNotifications(false); }} style={{ marginLeft: 10 }}>Export/Import</button>
        <button onClick={() => { setShowGroups(false); setShowProfile(false); setShowCategories(false); setShowExportImport(false); setShowNotifications(true); }} style={{ marginLeft: 10 }}>Notifications</button>
        <button onClick={() => { setUser(null); setShowHome(true); setShowLogin(false); setShowSignup(false); setCategories([]); }}>Logout</button>
      </nav>
      {showNotifications ? (
        <Notifications token={localStorage.getItem('token')} categories={categories} />
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
    </div>
  );
};

export default App;
