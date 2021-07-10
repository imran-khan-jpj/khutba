import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="row" style={{ marginTop: "6rem" }}>
      <div className="col-10 mx-auto  text-center">
        <div>Oooops! Not Found</div>
        <Link to="/" className="btn btn-primary">
          Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
