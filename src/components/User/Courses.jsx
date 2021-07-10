import axios from "axios";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../../App";

const Courses = () => {
  const { isLoggedIn, user, courses } = useContext(AppContext);
  const history = useHistory();

  const deleteCourse = (id) => {
    axios
      .post("domain.com", id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (!isLoggedIn) {
    history.push("/author/admin/login");
  }
  if (user.role !== "student") {
    history.push("/student/login");
  }
  return (
    <div className="row" style={{ marginTop: "4rem" }}>
      <div className="col-12">
        <main className="mb-3">
          <div className="container">
            <div className="row justify-content-right">
              <div className="col-12 mx-auto">
                <div className="card">
                  <div className="card-header bg-primary justify-content-between bg-gradient text-center text-white fw-bold fs-5 d-flex">
                    <div>List of All Courses</div>
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
                                <td className="text-center border">
                                  <Link
                                    to={`/student/${course.id}/register`}
                                    className="btn btn-primary btn-sm"
                                  >
                                    Register
                                  </Link>
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
