import React from 'react';
import './Home.css';

const Home = ({ onLoginClick, onSignupClick }) => (
  <div className="home-container">
    <header className="home-header">
      <h1>Personal Finance Tracker</h1>
      <p>Track your expenses, manage budgets, and gain insights into your financial health.</p>
      <div className="home-actions">
        <button className="home-btn" onClick={onLoginClick}>Login</button>
        <button className="home-btn home-btn-signup" onClick={onSignupClick}>Sign Up</button>
      </div>
    </header>
    <section className="home-features">
      <h2>Features</h2>
      <ul>
        <li>💸 Expense & Income Tracking</li>
        <li>📊 Analytics & Charts</li>
        <li>👥 Multi-user Groups</li>
        <li>🔔 Notifications & Reminders</li>
        <li>📁 Export/Import Data</li>
        <li>📱 Mobile Responsive</li>
      </ul>
    </section>
    <footer className="home-footer">
      <p>&copy; {new Date().getFullYear()} Personal Finance Tracker</p>
    </footer>
  </div>
);

export default Home;
