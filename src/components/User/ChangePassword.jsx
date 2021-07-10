import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../App";
import { useForm } from "react-hook-form";
import axios from "axios";

const ChangePassword = () => {
  const { register, handleSubmit } = useForm();
  const { user, isLoggedIn, apiDomain } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [oldPasswordErr, setOldPasswordErr] = useState("");
  const [oldPasswordErrMsg, setOldPasswordErrMsg] = useState("");
  const [newPasswordErr, setNewPasswordErr] = useState("");
  const [newPasswordErrMsg, setNewPasswordErrMsg] = useState("");
  const [repeatPasswordErr, setRepeatPasswordErr] = useState("");
  const [repeatPasswordErrMsg, setRepeatPasswordErrMsg] = useState("");
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const history = useHistory();

  useEffect(() => {
    const hideErrMsgs = setTimeout(() => {
      setOldPasswordErr(false);
      setNewPasswordErr(false);
      setRepeatPasswordErr(false);
      setErr(false);
      setSuccess(false);
      if (success) {
        history.push("/student/login");
      }
    }, 3000);

    return () => clearTimeout(hideErrMsgs);
  }, [
    oldPasswordErr,
    newPasswordErr,
    repeatPasswordErr,
    err,
    success,
    history,
  ]);

  const onSubmit = (data) => {
    setLoading(true);

    if (data.old_password === "" || data.old_password.length < 6) {
      setLoading(false);
      setOldPasswordErr(true);
      setOldPasswordErrMsg("Invaid Old Password");
      return;
    } else if (data.password === "" || data.password.length < 6) {
      setLoading(false);
      setNewPasswordErr(true);
      setNewPasswordErrMsg("New password should be greater than 5 characters");
      return;
    } else if (
      data.password_confirmation === "" ||
      data.password_confirmation !== data.password
    ) {
      setLoading(false);
      setRepeatPasswordErr(true);
      setRepeatPasswordErrMsg("New And Repeat  Password Should be the same");
      return;
    }
    // console.log(data);
    axios
      .post(`${apiDomain}/khateeb/change-password`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setLoading(false);
          setSuccess(true);
          setSuccessMsg(res.data.success);
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 422) {
          setErr(true);
          setErrMsg(err.response.data.errors.password);
        } else {
          setLoading(false);
          setErr(true);
          setErrMsg(err.response.data.err);
        }
      });
  };

  if (!isLoggedIn) {
    history.push("/login");
  }

  if (user.role !== "student") {
    history.push("/");
  }
  return (
    <div style={{ marginTop: "4rem" }}>
      <div className="row m-0 p-0">
        <div className="col-lg-6 offset-3">
          <main className="mb-3">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header bg-primary bg-gradient text-center text-white fw-bold fs-5">
                      Change Password
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                          <label htmlFor="password1" className="form-label">
                            Old Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password1"
                            placeholder="Your Password"
                            {...register("old_password")}
                            required
                          />
                          {oldPasswordErr && (
                            <p className="alert alert-danger">
                              {oldPasswordErrMsg}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password2" className="form-label">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password2"
                            placeholder="New Password"
                            {...register("password")}
                            required
                          />
                          {newPasswordErr && (
                            <p className="alert alert-danger">
                              {newPasswordErrMsg}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password2" className="form-label">
                            Repeat New Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password3"
                            placeholder="Repeat New Password"
                            {...register("password_confirmation")}
                            required
                          />
                          {repeatPasswordErr && (
                            <p className="alert alert-danger">
                              {repeatPasswordErrMsg}
                            </p>
                          )}
                        </div>
                        {err && <p className="alert alert-danger">{errMsg}</p>}
                        {success && (
                          <p className="alert alert-success">{successMsg}</p>
                        )}
                        <button type="submit" className="btn btn-primary w-100">
                          {loading ? "Loading" : "Change Password"}{" "}
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

export default ChangePassword;
