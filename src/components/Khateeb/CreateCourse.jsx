import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../App";

const CreateCourse = () => {
  const { isLoggedIn, user, apiDomain, getCourses } = useContext(AppContext);
  const history = useHistory();

  const [titleErr, setTitleErr] = useState(false);
  const [titleErrMsg, setTitleErrMsg] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [descriptionErrMsg, setDescriptionErrMsg] = useState("");
  const [createCourseErr, setCreateCourseErr] = useState(false);
  const [createCourseErrMsg, setCreateCourseErrMsg] = useState("");
  const [createCourseSuccess, setCreateCourseSuccess] = useState(false);
  const [createCourseSuccessMsg, setCreateCourseSuccessMsg] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.title === "") {
      setTitleErr(true);
      setTitleErrMsg("Title cannot be empty");
      return;
    } else if (data.description === "") {
      setDescriptionErr(true);
      setDescriptionErrMsg("Description Cannot be empty");
      return;
    }

    axios
      .post(`${apiDomain}/khateeb/create-course`, data)
      .then((res) => {
        if (res.status === 200) {
          getCourses();
          setCreateCourseSuccess(true);
          setCreateCourseSuccessMsg("Course Created Successfully");
        } else if (res.status === 403) {
          setCreateCourseErr(true);
          setCreateCourseErrMsg(res.data.err);
        }
      })
      .catch((err) => {
        console.log(err.response);
        // if (err.response.status === 422) {
        //   setCreateCourseErr(true);
        //   setCreateCourseErrMsg(err.response.data.errors.title);
        // }
      });
  };

  useEffect(() => {
    const hideErrMsg = setTimeout(() => {
      setTitleErr(false);
      setDescriptionErr(false);
      setCreateCourseErr(false);
      setCreateCourseSuccess(false);

      if (createCourseSuccess) {
        history.push("/khateeb/courses");
      }
    }, 3000);

    return () => clearTimeout(hideErrMsg);
  }, [titleErr, descriptionErr, createCourseErr, createCourseSuccess, history]);

  if (!isLoggedIn) {
    history.push("/author/admin/login");
  }
  if (user.role !== "khateeb") {
    history.push("/author/admin/login");
  }

  return (
    <div className="row">
      <main style={{ marginTop: "2rem" }}>
        <div className="col-lg-6 offset-2">
          <main className="mb-3">
            <div className="container">
              <div className="row justify-content-right">
                <div className="col-8 offset-4">
                  <div className="card">
                    <div className="card-header bg-primary bg-gradient text-center text-white fw-bold fs-5">
                      Add Course
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Title"
                            {...register("title")}
                          />
                          {titleErr && (
                            <p className="alert alert-danger mt-2">
                              {titleErrMsg}
                            </p>
                          )}
                        </div>
                        <div class="mb-3">
                          <label
                            for="exampleFormControlTextarea1"
                            class="form-label"
                          >
                            Description
                          </label>
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            {...register("description")}
                            placeholder="Description"
                          ></textarea>
                        </div>

                        {descriptionErr && (
                          <p className="alert alert-danger mt-2">
                            {descriptionErrMsg}
                          </p>
                        )}
                        {createCourseErr && (
                          <p className="alert alert-danger mt-2">
                            {createCourseErrMsg}
                          </p>
                        )}
                        {createCourseSuccess && (
                          <p className="alert alert-success mt-2">
                            {createCourseSuccessMsg}
                          </p>
                        )}
                        <button type="submit" className="btn btn-primary w-100">
                          Create Course
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
};

export default CreateCourse;
