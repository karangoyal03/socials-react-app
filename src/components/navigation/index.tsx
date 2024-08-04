import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <div className="wd-account-screen">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Socials
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Back to Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
