import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = ({ token, categories = [] }) => {
  const [notifications, setNotifications] = useState({ reminders: [], alerts: [] });
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data);
    } catch {
      setMessage('Failed to fetch notifications');
    }
  };

  const handleSetBudget = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/notifications/set-budget`, { category, limit: Number(limit) }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategory('');
      setLimit('');
      setMessage('Budget limit set!');
      fetchNotifications();
    } catch {
      setMessage('Failed to set budget limit');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', padding: 20, borderRadius: 8 }}>
      <h2>Notifications</h2>
      <h3>Reminders</h3>
      <ul>
        {notifications.reminders.map((r, idx) => <li key={idx}>{r}</li>)}
      </ul>
      <h3>Alerts</h3>
      <ul>
        {notifications.alerts.map((a, idx) => <li key={idx}>{a}</li>)}
      </ul>
      <form onSubmit={handleSetBudget} style={{ marginTop: 20 }}>
        <select value={category} onChange={e => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input type="number" placeholder="Budget Limit" value={limit} onChange={e => setLimit(e.target.value)} required />
        <button type="submit">Set Budget Limit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Notifications;
