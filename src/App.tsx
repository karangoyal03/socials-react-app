import React from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
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
function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="App">
        <Navigation/>
          <Routes>
            <Route path="/" element={<ProjectDetails />}></Route>
            <Route path="home/*" element={<HomePage />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="/search" element={<Search />} />
            <Route path="/movies" element={<WebSeries />} />
            <Route path="/details/:title" element={<Details />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
