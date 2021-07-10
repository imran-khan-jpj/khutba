import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../../App";

const Course = () => {
  const { isLoggedIn, user, courses } = useContext(AppContext);
  const history = useHistory();
  const [course, setCourse] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getCourse = course.map((course) => course.id === id);

    setCourse(getCourse);
  }, []);

  console.log(id);

  if (!isLoggedIn) {
    history.push("/");
  }
  if (user.role !== "khateeb" || user.role !== "khateeb") {
    history.push("/");
  }

  return (
    <div className="card">
      <div className="card-header">{Course.title}</div>
      <div className="card-body">
        <p className="card-text">{course.description}</p>
        {user.role === "khateeb" && (
          <Link to={`khateeb/${course.id}/edit`} className="btn btn-primary">
            Edit Course
          </Link>
        )}
      </div>
    </div>
  );
};

export default Course;
