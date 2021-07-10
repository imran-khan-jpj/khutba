import axios from "../../axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../App";

const SingleQuestion = ({
  question,
  setCurrentQuestion,
  questions,
  currentQuestion,
  id,
}) => {
  const { isLoggedIn, user, apiDomain } = useContext(AppContext);
  const history = useHistory();
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const setUserAnswer = (e) => {
    if (currentQuestion + 1 === questions.length) {
      setDisabledBtn(true);
    } else if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    }

    userAnswers.push({
      questionaire_id: id,
      questionaire_question_id: question.id,
      question: question.question,
      answer: e.target.value,
    });
  };

  const submitExam = () => {
    setLoading(true);
    axios
      .post(`${apiDomain}/student/submit-answers`, { data: userAnswers })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setTimeout(() => {
            history.push("/student/dashboard/");
          }, 3000);
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
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <p>{"Question Id"}</p>
            <p> Total Question : {questions.length}</p>
          </div>
          <div className="card-body">
            <h5 className="card-title"> {question.question}</h5>
            <div className="row">
              <div className="col-lg-6">
                <button
                  className={`btn w-100 mb-2 text-start ${
                    disabledBtn ? "btn-danger" : "btn-primary"
                  }`}
                  onClick={setUserAnswer}
                  value={question.answers[0]}
                  disabled={disabledBtn}
                >
                  A : {question.answers[0]}
                </button>
              </div>
              <div className="col-lg-6">
                <button
                  className={`btn w-100 mb-2 text-start ${
                    disabledBtn ? "btn-danger" : "btn-primary"
                  }`}
                  onClick={setUserAnswer}
                  value={question.answers[1]}
                  disabled={disabledBtn}
                >
                  B : {question.answers[1]}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <button
                  className={`btn w-100 mb-2 text-start ${
                    disabledBtn ? "btn-danger" : "btn-primary"
                  }`}
                  onClick={setUserAnswer}
                  value={question.answers[2]}
                  disabled={disabledBtn}
                >
                  C : {question.answers[2]}
                </button>
              </div>
              <div className="col-lg-6">
                <button
                  className={`btn w-100 mb-2 text-start ${
                    disabledBtn ? "btn-danger" : "btn-primary"
                  }`}
                  onClick={setUserAnswer}
                  value={question.answers[3]}
                  disabled={disabledBtn}
                >
                  D : {question.answers[3]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {disabledBtn && (
        <div className="row mt-2">
          <div className="col-lg-8 mx-auto text-center">
            <button className="btn btn-primary" onClick={submitExam}>
              {loading ? "Loading" : "Submit Exam"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleQuestion;
