import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Navbar = () => {
  const { isLoggedIn, user } = useContext(AppContext);

  return (
    <nav
      className="
    navbar navbar-expand-lg navbar-light
    bg-light
    d-lg-none d-xl-none
  "
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
          <Link to="/">Khateeb.org</Link>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {isLoggedIn && user.role === "student " ? (
                <span>
                  Welcome {user.role} <b>{user.name}</b>
                </span>
              ) : (
                <span>
                  <Link to="/student/login" className="nav-link">
                    Student Login
                  </Link>
                  <Link
                    to="/author/admin/login"
                    className="btn btn-primary me-2"
                  >
                    Author/Admin Login
                  </Link>
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
