import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = ({ token, categories = [] }) => {
  const [notifications, setNotifications] = useState({ reminders: [], alerts: [] });
  const [upcomingScheduled, setUpcomingScheduled] = useState([]);
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
    fetchUpcomingScheduled();
    // eslint-disable-next-line
  }, []);

  const fetchUpcomingScheduled = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/scheduled-transactions/upcoming`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUpcomingScheduled(data);
      }
    } catch (error) {
      console.error('Error fetching upcoming scheduled transactions:', error);
      setUpcomingScheduled([]);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Notifications
          </h1>
          <p className="text-gray-600 text-lg">Stay on top of your budget limits and financial goals</p>
        </div>

        {/* Scheduled Transaction Reminders Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Scheduled Transaction Reminders
          </h2>
          {upcomingScheduled.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-500">No upcoming scheduled transactions</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingScheduled.map((scheduled, idx) => {
                const daysUntil = Math.ceil((new Date(scheduled.scheduledDate) - new Date()) / (1000 * 60 * 60 * 24));
                const isToday = daysUntil === 0;
                const isSoon = daysUntil <= 3;
                
                return (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl border-l-4 ${
                    isToday 
                      ? 'bg-orange-50 border-orange-500' 
                      : isSoon 
                      ? 'bg-yellow-50 border-yellow-500' 
                      : 'bg-blue-50 border-blue-500'
                  }`}>
                    <div className="flex items-center">
                      <svg className={`w-5 h-5 mr-3 ${
                        isToday ? 'text-orange-600' : isSoon ? 'text-yellow-600' : 'text-blue-600'
                      }`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            scheduled.type === 'income' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {scheduled.type.charAt(0).toUpperCase() + scheduled.type.slice(1)}
                          </span>
                          <span className="font-bold text-gray-800">₹{scheduled.amount.toLocaleString()}</span>
                        </div>
                        <p className="text-gray-700 font-medium">{scheduled.description}</p>
                        <p className="text-gray-500 text-sm">{scheduled.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        isToday ? 'text-orange-600' : isSoon ? 'text-yellow-600' : 'text-blue-600'
                      }`}>
                        {isToday ? 'Due today!' : `${daysUntil} days`}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(scheduled.scheduledDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Reminders Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Reminders
          </h2>
          {notifications.reminders.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-500">No reminders at the moment</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.reminders.map((reminder, idx) => (
                <div key={idx} className="flex items-center p-4 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800 font-medium">{reminder}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Alerts
          </h2>
          {notifications.alerts.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-500">All good! No budget alerts</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.alerts.map((alert, idx) => (
                <div key={idx} className="flex items-center p-4 bg-red-50 rounded-2xl border-l-4 border-red-500">
                  <svg className="w-5 h-5 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800 font-medium">{alert}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Set Budget Limit Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
            Set Budget Limit
          </h2>
          
          <form onSubmit={handleSetBudget} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)} 
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Limit</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  value={limit} 
                  onChange={e => setLimit(e.target.value)} 
                  required 
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-lg font-medium bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-lg"
            >
              Set Budget Limit
            </button>
          </form>
        </div>

        {message && (
          <div className={`mt-6 px-6 py-4 rounded-2xl ${
            message.includes('Failed') 
              ? 'bg-red-100 border border-red-400 text-red-700' 
              : 'bg-green-100 border border-green-400 text-green-700'
          }`}>
            <div className="flex items-center">
              {message.includes('Failed') ? (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
