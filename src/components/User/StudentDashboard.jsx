import React, { useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { AppContext } from "../../App";
import ReactDatatable from "@ashvin27/react-datatable";
import axios from "axios";

const StudentDashboard = () => {
  const {
    isLoggedIn,
    user,
    courses,
    apiDomain,
    getCourses,
    registeredCourses,
    unregisteredCourses,
  } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    getCourses();
  }, []);

  if (!isLoggedIn) {
    history.push("/student/login");
  }
  if (user.role !== "student") {
    history.push("/student/login");
  }

  const registerCourse = (course) => {
    axios
      .post(`${apiDomain}/student/register/${course.id}`, {
        course: course.id,
      })
      .then((res) => {
        if (res.status === 200) {
          getCourses();
          // console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const registeredColumns = [
    {
      key: "id",
      text: "index",
      align: "left",
    },
    {
      key: "title",
      text: "Title",
      align: "left",
    },
    {
      key: "description",
      text: "Description",
      align: "left",
    },

    {
      key: "action",
      text: "Action",

      cell: (record) => {
        return (
          <Link
            className="btn btn-primary btn-sm"
            to={`/student/${record.id}/lessons`}
            style={{ marginRight: "5px", width: "240px" }}
          >
            Show Lessons
          </Link>
        );
      },
      align: "right",
    },
  ];

  const unregisteredColumns = [
    {
      key: "id",
      text: "index",
      align: "left",
    },
    {
      key: "title",
      text: "Title",
      align: "left",
    },
    {
      key: "description",
      text: "Description",
      align: "left",
    },

    {
      key: "action",
      text: "Action",
      cell: (record) => {
        return (
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => registerCourse(record)}
              style={{ marginRight: "5px", width: "220px" }}
            >
              Register Course
            </button>
          </div>
        );
      },
    },
  ];

  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
  };

  return (
    <div>
      <div className="row" style={{ marginTop: "4rem" }}>
        <div className="col-lg-10 offset-2">
          <div className="row">
            <div className="col-7">Welcome, User {user.name}</div>
            <div className="col-5 pl-4">Total Course : {courses.length}</div>
          </div>
        </div>
      </div>
      {registeredCourses.length > 0 && (
        <span>
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <p className="alert alert-success">List Of Registered Courses</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <ReactDatatable
                config={config}
                records={registeredCourses}
                columns={registeredColumns}
              />
            </div>
          </div>
        </span>
      )}

      {unregisteredCourses.length > 0 && (
        <span>
          <div className="col-lg-8 mx-auto text-center">
            <p className="alert alert-danger">List Of UnRegistered Courses</p>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <ReactDatatable
                config={config}
                records={unregisteredCourses}
                columns={unregisteredColumns}
              />
            </div>
          </div>
        </span>
      )}
      {courses.length < 1 && (
        <div className="row">
          <div className="col-lg-8 alert alert-danger mx-auto text-center">
            There is not any courses is available
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
