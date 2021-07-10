import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../App";
import AskFurther from "./AskFurther";

const YourQuestions = () => {
  const { getStudentQuestions, isLoggedIn, user, apiDomain, studentQuestions } =
    useContext(AppContext);
  const history = useHistory();

  const [question, setQuestion] = useState("");
  const [further, setFurther] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getStudentQuestions();
    const hideMsg = setTimeout(() => {
      setSuccess(false);
      setErr(false);
    }, 3000);

    return () => clearTimeout(hideMsg);
  }, [success, err]);

  const submitQuestion = () => {
    if (question.length > 0) {
      axios
        .post(`${apiDomain}/student/create-question`, { question: question })
        .then((res) => {
          if (res.status === 200) {
            setQuestion("");
            setSuccess(true);
            setSuccessMsg("Question Submitted");
            getStudentQuestions();
          } else {
            setErr(true);
            setErrMsg("some thing went wrong please try again.");
          }
          // console.log(res);
        })
        .catch((err) => {
          setErr(true);
          setErr(err.data.errors.message);
        });
    } else {
      alert("Pleae Enter Question");
    }
  };

  const askFurther = (id) => {
    console.log(id);
    axios
      .post(`${apiDomain}/student/question/${id}/further`, {
        question: id,
        further: further,
      })
      .then((res) => {
        setFurther("");
        if (res.status === 200) {
          getStudentQuestions();
        }
      })
      .catch((err) => console.log(err));
  };

  if (!isLoggedIn) {
    history.push("/student/login");
  }

  if (user.role !== "student") {
    history.push("/student/login");
  }

  return (
    <div>
      <div className="row" style={{ marginTop: "6rem" }}>
        <div className="col-lg-8 mx-auto">
          <div className="col-lg-12">
            {err && (
              <div className="alert alert-danger text-center">{errMsg}</div>
            )}
            {success && (
              <div className="alert alert-success text-center">
                {successMsg}
              </div>
            )}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Your Question</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter Question"
                      autoComplete="off"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`btn btn-primary w-100`}
                      onClick={submitQuestion}
                      disabled={question.length < 1}
                    >
                      Submit Question
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          {studentQuestions.length > 0 ? (
            studentQuestions.map((question) => (
              <div className="card mb-3" style={{ width: "52rem" }}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-success text-light">
                    <div className="d-flex justify-content-between">
                      <div>Q: {question.question}</div>
                      {question.answer === null && <p>Not Answered Yet.</p>}
                    </div>
                  </li>
                  {question.answer !== null && (
                    <>
                      <li className="list-group-item">
                        <span className="text-success">Answer : </span>
                        {question.answer}
                      </li>
                    </>
                  )}
                  {question.furthers.length > 0 &&
                    question.furthers.map((further) => {
                      return (
                        <li className="list-group-item">
                          <div>{further.further}</div>
                          <div>
                            {further.answer !== null && (
                              <div>
                                <span className="text-success">Answer</span> :{" "}
                                {further.answer.answer}
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  <AskFurther id={question.id} />
                </ul>
              </div>
            ))
          ) : (
            <p className="alert alert-danger text-center">
              You have not any question submitted
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourQuestions;
