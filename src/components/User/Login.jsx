import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AppContext } from "../../App";
import axios from "../../axios";
const Login = () => {
  const {
    setUser,
    setIsLoggedIn,
    isLoggedIn,
    getQuestionaires,
    getCourses,
    apiDomain,
  } = useContext(AppContext);
  const { register, handleSubmit, reset } = useForm();

  const signupDefaultValues = {
    name: "",
    signupEmail: "",
    signupPassword: "",
    repeatPassword: "",
  };
  const history = useHistory();

  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [nameErrMsg, setNameErrMsg] = useState("");
  const [signupEmailErr, setSignupEmailErr] = useState(false);
  const [signupEmailErrMsg, setSignupEmailErrMsg] = useState("");
  const [signupPasswordErr, setSignupPasswordErr] = useState(false);
  const [signupPasswordErrMsg, setSignupPasswordErrMsg] = useState("");
  const [repeatPasswordErr, setRepeatPasswordErr] = useState(false);
  const [repeatPasswordErrMsg, setRepeatPasswordErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const studentLogin = (data) => {
    setLoginLoading(true);
    if (data.email === "") {
      setEmailErr(true);
      setEmailErrMsg("Invalid Email");
      setLoginLoading(false);
      return;
    } else if (data.password === "") {
      setLoginLoading(false);
      setPasswordErr(true);
      setPasswordErrMsg("Password must b greater than 5 character");
      return;
    }

    // const sendData = {
    //   role: "student",
    //   email: data.email,
    //   password: data.password,
    // };

    const sendData = {
      role: "student",
      email: data.email,
      password: data.password,
    };
    axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then((response) => {
        axios
          .post(`${apiDomain}/student/login`, sendData)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              setLoginLoading(false);
              setIsLoggedIn(true);
              setUser(res.data.user);
              getCourses();
              getQuestionaires();
              history.push("/student/dashboard");
            }
          })
          .catch((err) => {
            console.log(err.response);
            setLoginLoading(false);
            console.log(err.response.data.message);
            setEmailErr(true);
            setEmailErrMsg(err.response.data.message);
          });
      })
      .catch((err) => console.log(err));
  };

  const studentSignup = (data) => {
    setSignupLoading(true);
    if (data.name === "" || data.name.length < 3) {
      setNameErr(true);
      setNameErrMsg("Name can't be empty or less then 3 chracter");
      setSignupLoading(false);
      return;
    } else if (data.signupEmail === "") {
      setSignupEmailErr(true);
      setSignupEmailErrMsg("Invaid Email");
      setSignupLoading(false);
      return;
    } else if (data.signupPassword === "" || data.signupPassword.length < 5) {
      setSignupPasswordErr(true);
      setSignupPasswordErrMsg("Password sholud be greater then 5 characters");
      setSignupLoading(false);
      return;
    } else if (
      data.repeatPassword === "" ||
      data.repeatPassword !== data.signupPassword
    ) {
      setRepeatPasswordErr(true);
      setRepeatPasswordErrMsg(
        "Password and Repeat Password should be the same."
      );
      setSignupLoading(false);
      return;
    }
    const sendData = {
      name: data.name,
      email: data.signupEmail,
      password: data.signupPassword,
      password_confirmation: data.repeatPassword,
      religion: data.religion,
      role: "student",
    };

    axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then((res) => {
        axios
          .post(`${apiDomain}/register`, sendData)
          .then((res) => {
            if (res.status === 201) {
              setSignupLoading(false);
              setSuccess(true);
              setSuccessMsg(res.data.msg);
              reset(signupDefaultValues);
            }
          })
          .catch((err) => {
            setSignupLoading(false);
            let errorsObject = err.response.data.errors;
            let error = Object.keys(errorsObject)[0];

            if (error === "name") {
              setNameErr(true);
              setNameErrMsg(err.response.data.errors.name);
            } else if (error === "email") {
              setSignupEmailErr(true);
              setSignupEmailErrMsg(err.response.data.errors.email);
            } else if (error === "password") {
              setSignupPasswordErr(true);
              setSignupPasswordErrMsg(err.response.data.errors.password[0]);
            }
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const hideErrMsg = setTimeout(() => {
      setEmailErr(false);
      setPasswordErr(false);
      setNameErr(false);
      setSignupEmailErr(false);
      setSignupPasswordErr(false);
      setRepeatPasswordErr(false);
      setSuccess(false);
    }, 3000);

    return () => clearTimeout(hideErrMsg);
  }, [
    passwordErr,
    emailErr,
    nameErr,
    signupEmailErr,
    signupPasswordErr,
    repeatPasswordErr,
    success,
  ]);

  if (isLoggedIn) {
    history.push("/");
  }

  return (
    <div style={{ marginTop: "5rem" }}>
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
      <div className="row">
        <div className="col-lg-6">
          <main class="mb-3">
            <div class="container">
              <div class="row justify-content-right">
                <div class="col-8 offset-4">
                  <div class="card">
                    <div class="card-header bg-primary bg-gradient text-center text-white fw-bold fs-5">
                      Login
                    </div>
                    <div class="card-body">
                      <form onSubmit={handleSubmit(studentLogin)}>
                        <div class="mb-3">
                          <label for="email" class="form-label">
                            Email address
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Ex: hilmi@bisabos.com"
                            {...register("email")}
                          />
                          {emailErr && (
                            <p className="alert alert-danger mt-2">
                              {emailErrMsg}
                            </p>
                          )}
                        </div>
                        <div class="mb-3">
                          <label for="password1" class="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
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
                        <div class="d-flex text-center justify-content-between">
                          <div class="form-check mb-3"></div>
                          <Link to="/ds;a">Forgot Password</Link>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">
                          {loginLoading ? `Loading` : `Login`}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="col-lg-6">
          <main class="mb-3">
            <div class="container">
              <div class="row">
                <div class="col-8">
                  <div class="card">
                    <div class="card-header bg-primary bg-gradient text-center text-white fw-bold fs-5">
                      Don't have account{" "}
                      <span className="text-warning">Signup</span> here
                    </div>
                    <div class="card-body">
                      <form onSubmit={handleSubmit(studentSignup)}>
                        <div class="mb-3">
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            {...register("religion")}
                          >
                            <option selected value="muslim">
                              Register as Muslim
                            </option>
                            <option value="non-muslim">
                              Register as Non-Muslim
                            </option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="name" class="form-label">
                            Your Name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="name"
                            placeholder="You Name"
                            // required
                            {...register("name")}
                          />
                          {nameErr && (
                            <p className=" alert alert-danger mt-2">
                              {nameErrMsg}
                            </p>
                          )}
                        </div>
                        <div class="mb-3">
                          <label for="email" class="form-label">
                            Email address
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Ex: hilmi@bisabos.com"
                            // required
                            {...register("signupEmail")}
                          />
                          {signupEmailErr && (
                            <p className=" alert alert-danger mt-2">
                              {signupEmailErrMsg}
                            </p>
                          )}
                        </div>
                        <div class="mb-3">
                          <label for="password1" class="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            placeholder="Your Password"
                            // required
                            {...register("signupPassword")}
                          />
                          {signupPasswordErr && (
                            <p className=" alert alert-danger mt-2">
                              {signupPasswordErrMsg}
                            </p>
                          )}
                        </div>
                        <div class="mb-3">
                          <label for="password2" class="form-label">
                            Repeat Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="password2"
                            placeholder="Your Repeat Password"
                            {...register("repeatPassword")}
                            // required
                          />
                          {repeatPasswordErr && (
                            <p className=" alert alert-danger mt-2">
                              {repeatPasswordErrMsg}
                            </p>
                          )}
                        </div>
                        <button type="submit" class="btn btn-primary w-100">
                          {signupLoading ? "Loading" : "Sign up"}
                        </button>
                        {success && (
                          <p className="alert alert-success mt-2">
                            {successMsg}
                          </p>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;
