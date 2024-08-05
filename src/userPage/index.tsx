import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from './client';
import { LoginResponse, User } from './types';
import './index.css';

const Users: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = { username, password };
      const response: LoginResponse = await loginUser(userData);
      console.log("response"+response);
      const { token, user } = response;
      console.log("token "+token + " user_id "+user._id);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);
      alert('Login successful!');

      // Fetch or create profile after successful login
      try {
        const profileResponse = await fetch(`/api/profile/${user._id}`);
        if (!profileResponse.ok) {
          // If profile does not exist, create a new one
          await fetch('/api/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId: user._id, username: user.username })
          });
        }
      } catch (error) {
        console.error("Error fetching or creating profile", error);
      }

      navigate('/profile');
    } catch (error) {
      console.error("Error logging in user", error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = { username, password, role };
      await registerUser(userData);
      alert('Registered successfully! Please login.');
      setIsRegistering(false);
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div className="form-container">
      {isRegistering ? (
        <div>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit">Register</button>
            </div>
            <p>
              Already have an account? <button type="button" onClick={() => setIsRegistering(false)}>Login</button>
            </p>
          </form>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
            <p>
              Don't have an account? <button type="button" onClick={() => setIsRegistering(true)}>Register</button>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Users;
