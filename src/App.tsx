import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectDetails from "./components/landingpage";
import HomePage from "./components/homePage";
import SignUp from "./components/account/signup";
import Login from "./components/account/login";
import { Provider } from "react-redux";
import store from "./components/account/store";
import Search from "./components/search";
import Details from "./components/search/Details";
import Navigation from "./components/navigation";
import WebSeries from "./components/webseries/data";
import Profile from "./components/account/profile";
import AllUserProfiles from "./components/account/alluserprofiles";
import axios from "axios";
import { UserProvider } from "./components/context/userContext";
import UserProfile from "./components/account/userprofile";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <UserProvider>
        <Provider store={store}>
          <div className="App">
            <Navigation />
            <Routes>
              <Route path="/" element={<ProjectDetails />}></Route>
              <Route path="home/*" element={<HomePage />}></Route>
              <Route path="signup" element={<SignUp />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="/search" element={<Search />} />
              <Route path="/movies" element={<WebSeries />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/allprofiles" element={<AllUserProfiles />} />
              <Route path="/details/:title" element={<Details />} />
              <Route path="/userprofile" element={<UserProfile />} />
            </Routes>
          </div>
        </Provider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
