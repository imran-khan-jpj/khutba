import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AppContext } from "../../App";

const AddKhateeb = () => {
  const { isLoggedIn, user, apiDomain, getAllKhateeb } = useContext(AppContext);
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [nameErr, setNameErr] = useState(false);
  const [nameErrMsg, setNameErrMsg] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const onSubmit = (data) => {
    setLoading(true);
    if (data.name === "" || data.name.length < 3) {
      setLoading(false);
      setNameErr(true);
      setNameErrMsg("Name cannot be empty or less than 3 chracters");
      return;
    } else if (data.email === "") {
      setLoading(false);
      setEmailErr(true);
      setEmailErrMsg("Email is invalid");
      return;
    } else if (data.password === "" || data.password.length < 6) {
      setLoading(false);
      setPasswordErr(true);
      setPasswordErrMsg("Password cannot be less then 6 characters");
      return;
    } else if (
      data.password_confirmation === "" ||
      data.password_confirmation !== data.password
    ) {
      setLoading(false);
      setPasswordErr(true);
      setPasswordErrMsg("password and repeat Password should be the same");
      return;
    }

    // console.log(data);
    axios
      .post(`${apiDomain}/admin/create-khateeb`, data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          getAllKhateeb();

          history.push("/admin/dashboard");
        }
      })
      .catch((err) => {
        setLoading(false);
        setEmailErr(true);
        setEmailErrMsg(err.response.data.message);
      });
  };

  useEffect(() => {
    const clearErrMsgs = setTimeout(() => {
      setNameErr(false);
      setEmailErr(false);
      setPasswordErr(false);
    }, 3000);

    return () => clearTimeout(clearErrMsgs);
  }, [nameErr, emailErr, passwordErr]);
  if (!isLoggedIn) {
    history.push("/author/admin/login");
  }
  if (user.role !== "admin") {
    history.push("/");
  }

  return (
    <div>
      <div className="row">
        <div className="d-flex mb-0">
          <div className="col-lg-3 text-end">
            <Link to="/" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-lg-6 text-center">
            <p>Login to system</p>
          </div>
        </div>
      </div>
      <div className="row border m-0 p-0">
        <div className="col-lg-6 offset-3">
          <main className="mb-3">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header bg-primary bg-gradient text-center text-white fw-bold fs-5">
                      Provide Details to Register Khateeb
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <input
                            type="hidden"
                            className="form-control"
                            placeholder="You Name"
                            {...register("role")}
                            defaultValue="khateeb"
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="You Name"
                            {...register("name")}
                          />
                          {nameErr && (
                            <p className="alert alert-danger mt-2">
                              {nameErrMsg}
                            </p>
                          )}
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
                            <p className="alert alert-danger mt-2">
                              {passwordErrMsg}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password2" className="form-label">
                            Repeat Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password2"
                            placeholder="Your Repeat Password"
                            {...register("password_confirmation")}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                          {loading ? "Loading" : "Add Khateeb"}
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
    </div>
  );
};

export default AddKhateeb;
