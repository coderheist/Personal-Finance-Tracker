import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Groups = ({ token }) => {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState('');
  const [joinId, setJoinId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/groups`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGroups(res.data);
    } catch (err) {
      setError('Failed to fetch groups');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/groups/create`, { name }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName('');
      fetchGroups();
    } catch (err) {
      setError('Failed to create group');
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/groups/join`, { groupId: joinId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJoinId('');
      fetchGroups();
    } catch (err) {
      setError('Failed to join group');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', padding: 20, borderRadius: 8 }}>
      <h2>Your Groups</h2>
      <ul>
        {groups.map(g => (
          <li key={g._id}>{g.name} (ID: {g._id})</li>
        ))}
      </ul>
      <form onSubmit={handleCreate} style={{ marginTop: 20 }}>
        <input type="text" placeholder="New Group Name" value={name} onChange={e => setName(e.target.value)} required />
        <button type="submit">Create Group</button>
      </form>
      <form onSubmit={handleJoin} style={{ marginTop: 20 }}>
        <input type="text" placeholder="Group ID to Join" value={joinId} onChange={e => setJoinId(e.target.value)} required />
        <button type="submit">Join Group</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Groups;
