import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/signup`, { name, email, password });
      if ((res.status === 200 || res.status === 201) && res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setSuccess('Signup successful! Redirecting to dashboard...');
        setError('');
        onSignup && onSignup({ token: res.data.token, ...res.data.user });
      } else {
        setError('Unexpected response from server.');
        setSuccess('');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || `Signup failed: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError(`Error: ${err.message}`);
      }
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', padding: 20, background: '#fff', borderRadius: 8 }}>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
