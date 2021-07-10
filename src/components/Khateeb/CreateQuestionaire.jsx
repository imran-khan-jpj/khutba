import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../../App";

const CreateQuestionaire = () => {
  const { isLoggedIn, user, apiDomain, getQuestionaires } =
    useContext(AppContext);
  const { id } = useParams();

  const [titleErr, setTitleErr] = useState(false);
  const [questionaireForErr, setQuestionaireForErr] = useState(false);
  const [titleErrMsg, setTitleErrMsg] = useState("");
  const [questionaireForErrMsg, setQuestionaireForErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const history = useHistory();
  const onSubmit = (data) => {
    if (data.religion === "null") {
      setQuestionaireForErr(true);
      setQuestionaireForErrMsg("Please Select Questionare For");
      return;
    } else if (data.title === "") {
      setTitleErr(true);
      setTitleErrMsg("Title cannot be empty");
      return;
    }

    data.course_id = id;
    setLoading(true);
    axios
      .post(`${apiDomain}/khateeb/${id}/create-questionaire`, data)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setSuccess(true);
          setSuccessMsg("Questionaire Created Successfully");
          getQuestionaires();
        }
      })
      .catch((err) => {
        setLoading(false);
      });
    // console.log(data);
  };

  useEffect(() => {
    const hideErrMsg = setTimeout(() => {
      setTitleErr(false);
      setQuestionaireForErr(false);
      setSuccess(false);

      if (success) {
        history.push("/khateeb/courses");
      }
    }, 3000);

    return () => clearTimeout(hideErrMsg);
  }, [titleErr, success, history, questionaireForErr]);

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
                      Create New Questionaire
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="mb-3">
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            {...register("religion")}
                          >
                            <option value="null">
                              Please select Questionare for
                            </option>
                            <option value="muslim">For Muslim</option>
                            <option value="non-muslim">For Non-Muslim</option>
                          </select>
                          {questionaireForErr && (
                            <p className="alert alert-danger mt-2">
                              {questionaireForErrMsg}
                            </p>
                          )}
                        </div>
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
                          {success && (
                            <p className="alert alert-success mt-2">
                              {successMsg}
                            </p>
                          )}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                          {loading ? "Loading" : "Create Questionaire"}
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

export default CreateQuestionaire;
