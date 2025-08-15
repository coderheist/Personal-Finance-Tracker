import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ token }) => {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [edit, setEdit] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
  axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProfile(res.data))
    .catch(err => {
      setProfile({ name: '', email: '' });
      setMessage(err.response?.data?.message || 'Failed to fetch profile');
    });
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/user/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setEdit(false);
      setMessage('Profile updated!');
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data?.message || `Update failed: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        setMessage('No response from server. Please check your connection.');
      } else {
        setMessage(`Error: ${err.message}`);
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/user/change-password`, { oldPassword, newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOldPassword('');
      setNewPassword('');
      setMessage('Password changed!');
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data?.message || `Password change failed: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        setMessage('No response from server. Please check your connection.');
      } else {
        setMessage(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Profile
          </h1>
          <p className="text-gray-600 text-lg">Manage your account settings and preferences</p>
        </div>

        {/* Profile Information Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Personal Information
          </h2>

          {edit ? (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEdit(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Full Name</label>
                  <p className="text-lg font-medium text-gray-800">{profile.name || 'Not provided'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Email Address</label>
                  <p className="text-lg font-medium text-gray-800">{profile.email || 'Not provided'}</p>
                </div>
              </div>
              
              <button
                onClick={() => setEdit(true)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
            </svg>
            Change Password
          </h2>
          
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-lg bg-gray-50 focus:bg-white"
                required
                minLength="6"
              />
              <p className="text-gray-500 text-sm mt-2">Password must be at least 6 characters long</p>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-lg"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mt-6 px-6 py-4 rounded-2xl ${
            message.includes('failed') || message.includes('Error') || message.includes('Failed')
              ? 'bg-red-100 border border-red-400 text-red-700' 
              : 'bg-green-100 border border-green-400 text-green-700'
          }`}>
            <div className="flex items-center">
              {message.includes('failed') || message.includes('Error') || message.includes('Failed') ? (
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

export default Profile;
