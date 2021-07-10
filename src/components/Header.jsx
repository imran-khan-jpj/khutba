import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import axios from "../axios";

const Header = () => {
  const { isLoggedIn, user, setUser, setIsLoggedIn } = useContext(AppContext);

  // console.log(isLoggedIn);

  const logout = () => {
    axios
      .post("http://localhost:8000/logout")
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(false);
          setUser("");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="bg-body border-bottom border-primary fixed-top">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 d-none d-lg-block text-center">
            <Link to="/">Khateeb.org</Link>
          </div>
          <div className="col-md-3 d-none d-lg-block text-center"></div>
          <div className="col-md-6 d-none d-lg-block text-end">
            {isLoggedIn && user.role === "student" && (
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <Link to="/student/dashboard" className="btn btn-primary">
                  Dashboard
                </Link>
                {/* <Link to="/student/courses" className="btn btn-primary">
                  courses
                </Link> */}
                <Link to="/student/your-questions" className="btn btn-primary">
                  Your Questions
                </Link>
                <Link to="/student/all-questions" className="btn btn-primary">
                  All Questions
                </Link>
                <Link to="/student/questionaires" className="btn btn-primary">
                  Questionaires
                </Link>
                <span className="dropdown btn-group">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link
                        to="/student/change-password"
                        className="dropdown-item"
                      >
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </span>
              </div>
            )}
            {isLoggedIn && user.role === "khateeb" && (
              <span className="btn-group">
                <Link to="/khateeb/courses" className="btn btn-primary">
                  Dashboard
                </Link>
                <Link to="/khateeb/questions" className="btn btn-primary">
                  Question Portal
                </Link>
                <Link to="/khateeb/questionaires" className="btn btn-primary">
                  Questionaires
                </Link>
                <span className="dropdown btn-group">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link
                        to="/khateeb/change-password"
                        className="dropdown-item"
                      >
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </span>
              </span>
            )}
            {isLoggedIn && user.role === "admin" && (
              <span className="btn-group">
                <Link to="/admin/dashboard" className="btn btn-primary">
                  Dashboard
                </Link>
                <Link to="/admin/add-khateeb" className="btn btn-primary">
                  Add Khateeb
                </Link>
                <span className="dropdown btn-group">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link
                        to="/admin/change-password"
                        className="dropdown-item"
                      >
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </span>
              </span>
            )}

            {!isLoggedIn && (
              <span className="btn-group">
                <Link to="/student/login" className="btn btn-light me-2">
                  Student Login
                </Link>
                <Link to="/author/admin/login" className="btn btn-primary me-2">
                  Author/Admin Login
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>

      {/*navbar on mobile */}
      <Navbar />
    </header>
  );
};

export default Header;
