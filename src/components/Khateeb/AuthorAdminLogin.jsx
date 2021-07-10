import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { AppContext } from "../../App";

const AuthorAdminLogin = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUser,
    apiDomain,
    getAllKhateeb,
    getCourses,
    getQuestionaires,
  } = useContext(AppContext);
  const history = useHistory();

  const { register, handleSubmit } = useForm();
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    if (data.email === "") {
      setLoading(false);
      setEmailErr(true);
      setEmailErrMsg("Invalid Email input");
      return;
    } else if (data.password === "" || data.password.length < 5) {
      setLoading(false);
      setPasswordErr(true);
      setPasswordErrMsg("Password must b greater than 5 character");
      return;
    }

    axios.get("http://localhost:8000/sanctum/csrf-cookie").then((response) => {
      axios
        .post(`${apiDomain}/login`, data)
        .then((res) => {
          setUser(res.data.user);
          console.log(res.data.user.role);
          if (res.data.user.role === "admin") {
            setLoading(false);
            setIsLoggedIn(true);
            getAllKhateeb();
            history.push("/admin/dashboard");
          } else if (res.data.user.role === "khateeb") {
            setIsLoggedIn(true);
            setLoading(false);
            // getAllQuestions();
            getQuestionaires();
            getCourses();
            history.push("/khateeb/courses");
          }
        })
        .catch((err) => {
          setLoading(false);
          setEmailErr(true);
          setEmailErrMsg(err.response.data.message);
        });
    });
  };

  useEffect(() => {
    const hideErrMsg = setTimeout(() => {
      setEmailErr(false);
      setPasswordErr(false);
    }, 3000);

    return () => clearTimeout(hideErrMsg);
  }, [passwordErr, emailErr]);

  // const getAllQuestions = () => {
  //   axios
  //     .get("domain.com/khateeb/questions")
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setQuestions(res.data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  if (isLoggedIn) {
    history.push("/");
  }
  return (
    <div>
      <div className="row">
        <main className="d-flex mb-0">
          <div className="col-lg-3 text-end">
            <Link to="/" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-lg-6 text-center">
            <p>Login to system</p>
          </div>
        </main>
      </div>
      <div className="col-lg-6 offset-3">
        <main className="mb-3">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header bg-primary bg-gradient text-center text-white fw-bold fs-5">
                    Author/Admin Login
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          defaultValue="test"
                          {...register("role")}
                        >
                          <option value="khateeb">Khateeb</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Ex: hilmi@bisabos.com"
                          {...register("email")}
                        />
                        {emailErr && (
                          <p className="alert alert-danger mt-2">
                            {emailErrMsg}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password1" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password1"
                          placeholder="Your Password"
                          {...register("password")}
                        />
                        {passwordErr && (
                          <p className=" alert alert-danger mt-2">
                            {passwordErrMsg}
                          </p>
                        )}
                      </div>
                      <button type="submit" className="btn btn-primary w-100">
                        {loading ? "Loading" : "Login"}
                      </button>
                    </form>
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

export default AuthorAdminLogin;
