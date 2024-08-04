import React from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProjectDetails from "./components/landingpage";
import HomePage from "./components/homePage";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProjectDetails />}></Route>
          <Route path="home" element={<HomePage />}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
