import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { email, password });
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        // Optionally fetch user profile here if needed
        onLogin({ token: res.data.token, ...res.data.user });
        setError('');
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || `Login failed: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError(`Error: ${err.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', padding: 20, background: '#fff', borderRadius: 8 }}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
