import React from 'react';
import Dashboard from './pages/Dashboard';
import './index.css'; // make sure global styles are loaded

const App = () => {
  return (
    <div className="app-container" style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Dashboard />
    </div>
  );
};

export default App;
