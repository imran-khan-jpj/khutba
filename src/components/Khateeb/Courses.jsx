import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../../App";

const Courses = () => {
  const { isLoggedIn, user, courses, getCourses, apiDomain } =
    useContext(AppContext);
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const hideMsg = setTimeout(() => {
      if (success) {
        console.log("calling");
        getCourses();
      } else {
        console.log("not calling");
      }

      setSuccess(false);
      setErr(false);
    }, 3000);

    return () => clearTimeout(hideMsg);
  }, [success, err]);

  const deleteCourse = (id) => {
    axios
      .delete(`${apiDomain}/khateeb/course/${id}/destroy`)
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          setSuccessMsg("Course Deleted Successfully");
        }
      })
      .catch((err) => {
        setErr(true);
        setErrMsg(err.response.data.message);
      });
  };

  if (!isLoggedIn) {
    history.push("/author/admin/login");
  }
  if (user.role !== "khateeb") {
    history.push("/author/admin/login");
  }
  return (
    <div className="row" style={{ marginTop: "4rem" }}>
      <div className="col-12">
        <main className="mb-3">
          <div className="container">
            <div className="row justify-content-right">
              <div className="col-12 mx-auto">
                <div className="card">
                  {success && (
                    <p className="alert alert-success">{successMsg}</p>
                  )}
                  {err && <p className="alert alert-success">{errMsg}</p>}
                  <div className="card-header bg-primary justify-content-between bg-gradient text-center text-white fw-bold fs-5 d-flex">
                    <div>List of All Courses</div>
                    <div>
                      <Link
                        to="/khateeb/create-course"
                        className="btn btn-warning"
                      >
                        Create Course
                      </Link>
                      {/* <button >Create Course</button> */}
                    </div>
                  </div>
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="col-1">
                            #
                          </th>
                          <th scope="col" className="col-2">
                            Title
                          </th>
                          <th scope="col" className="col-4">
                            Description
                          </th>
                          <th scope="col" className="text-center col-5">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.length > 0 &&
                          courses.map((course) => {
                            return (
                              <tr>
                                <th scope="row">{course.id}</th>
                                <td>{course.title}</td>
                                <td>{course.description}</td>
                                <td className="text-center border btn-group">
                                  <Link
                                    to={`/khateeb/${course.id}/add-lesson`}
                                    className="btn btn-primary btn-sm"
                                  >
                                    Add Lesson
                                  </Link>
                                  <Link
                                    to={`/khateeb/course/${course.id}/view/lessons`}
                                    className="btn btn-warning btn-sm"
                                  >
                                    View Lessons
                                  </Link>
                                  <Link
                                    to={`/khateeb/${course.id}/create-questionaire`}
                                    className="btn btn-primary btn-sm"
                                  >
                                    Create Questionaire
                                  </Link>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteCourse(course.id)}
                                  >
                                    Del
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;
