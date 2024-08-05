import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Your Profile</Link></li>
          <li><Link to="/users">Login/Register</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
