import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './homePage';
import Profile from './profilePage';
import Layout from './layout';
import Users from './userPage';
import WebSeries from './webSeries';
import Details from './webSeries/details';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:profileId" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/webseries" element={<WebSeries />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
