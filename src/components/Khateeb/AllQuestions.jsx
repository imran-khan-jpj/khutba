import { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import { AppContext } from "../../App";
import { useHistory } from "react-router-dom";
import FurtherAnswer from "./FurtherAnswer";

const AllQuestions = () => {
  const { isLoggedIn, user, getAllQuestions, allQuestions, apiDomain } =
    useContext(AppContext);
  const history = useHistory();
  const [answer, setAnswer] = useState([]);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState(false);

  useEffect(() => {
    getAllQuestions();
    setTimeout(() => {
      setSuccess(false);
      setErr(false);
    }, 3000);
  }, [success, err]);

  if (!isLoggedIn) {
    history.push("/author/admin/login");
  }
  if (user.role !== "khateeb") {
    history.push("/author/admin/login");
  }

  const submitAnswer = (id) => {
    axios
      .post(`${apiDomain}/khateeb/question/${id}/answer`, {
        question: id,
        answer: answer,
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          setSuccessMsg("Answer Submitted Successfully!");
        }
      })
      .catch((err) => {
        setErr(true);
        setErrMsg(err.response.data.message);
      });
  };

  allQuestions.length && console.log(allQuestions);
  return (
    <div className="row" style={{ marginTop: "6rem" }}>
      <div className="col-lg-8 mx-auto">
        {allQuestions.length > 0 ? (
          allQuestions.map((question) => (
            <div className="card" style={{ width: "52rem" }} key={question.id}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{question.question}</li>

                <li className="list-group-item">
                  {question.answer === null ? (
                    <div className="row">
                      <textarea
                        className="form-control"
                        onChange={(e) => setAnswer(e.target.value)}
                      ></textarea>
                      <button
                        className="btn btn-primary"
                        onClick={() => submitAnswer(question.id)}
                      >
                        Submit Answer
                      </button>
                      {success && (
                        <p className="alert alert-success">{successMsg}</p>
                      )}
                      {err && <p className="alert alert-danger">{errMsg}</p>}
                    </div>
                  ) : (
                    `Answer : ${question.answer}`
                  )}
                </li>
                {question.furthers.length > 0 &&
                  question.furthers.map((further) => {
                    return <FurtherAnswer key={further.id} {...further} />;
                  })}
              </ul>
            </div>
          ))
        ) : (
          <div className="text-center">You have no any questions</div>
        )}
      </div>
    </div>
  );
};

export default AllQuestions;
