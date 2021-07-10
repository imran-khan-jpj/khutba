import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../App";
import AllKhateeb from "./AllKhateeb";

const AdminDashboard = () => {
  const history = useHistory();
  const { isLoggedIn, user } = useContext(AppContext);
  if (!isLoggedIn) {
    history.push("/author/admin/login");
  }
  if (user.role !== "admin") {
    history.push("/");
  }

  return (
    <div className="row" style={{ marginTop: "4rem" }}>
      <div className="col-lg-8 mx-auto">
        <div className="row">
          <div className="col-7">Welcome, Admin {user.name}</div>
          {isLoggedIn && user.role === "admin" && <AllKhateeb />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
