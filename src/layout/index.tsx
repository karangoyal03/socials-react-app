import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../dashboard';
import './index.css';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Dashboard />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
