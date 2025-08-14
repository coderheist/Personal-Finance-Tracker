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
    <div style={{ maxWidth: 400, margin: '2rem auto', background: '#fff', padding: 20, borderRadius: 8 }}>
      <h2>Profile</h2>
      {edit ? (
        <form onSubmit={handleUpdate}>
          <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} required />
          <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} required />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <button onClick={() => setEdit(true)}>Edit Profile</button>
        </div>
      )}
      <form onSubmit={handleChangePassword} style={{ marginTop: 20 }}>
        <input type="password" placeholder="Old Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
        <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
