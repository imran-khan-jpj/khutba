import { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { AppContext } from "../../App";
import axios from "../../axios";

const ShowResults = () => {
  const { isLoggedIn, user, apiDomain } = useContext(AppContext);
  const [results, setResults] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getResultOfQuestionaire();
  }, []);

  if (!isLoggedIn) {
    history.push("/student/login");
  }
  if (user.role !== "student") {
    history.push("/student/login");
  }

  let correctAnswers = 0;
  let IncorrectAnswers = 0;
  const getResultOfQuestionaire = () => {
    axios
      .get(`${apiDomain}/student/questionaire/${id}/getResult`)
      .then((res) => {
        if (res.status === 200) {
          setResults(res.data.res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row" style={{ marginTop: "4rem" }}>
      <div className="col-12">
        <main className="mb-3">
          <div className="container">
            <div className="row justify-content-right">
              <div className="col-10 offset-1">
                <div className="card">
                  <div className="card-header bg-primary d-flex justify-content-between  bg-gradient text-center text-white fw-bold fs-5">
                    <div>
                      Result of Questionaire{" "}
                      {results.length > 0 && results[0].questionaire.title}
                    </div>
                    <div>
                      <Link to="/student/dashboard" className="btn btn-warning">
                        Dashboard
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Question</th>
                          <th scope="col">Correct Answer</th>
                          <th scope="col">Your Answer</th>
                          <th scope="col">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.length > 0 &&
                          results.map((question, index) => {
                            return (
                              <tr key={question.id}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                  {question.questionaire_question.question}
                                </td>
                                <td>
                                  {
                                    question.questionaire_question
                                      .correct_answer
                                  }
                                </td>
                                <td>{question.answer}</td>
                                <td
                                  className={`${
                                    question.questionaire_question
                                      .correct_answer === question.answer
                                      ? "bg-success"
                                      : "bg-danger"
                                  }`}
                                >
                                  {question.questionaire_question
                                    .correct_answer === question.answer ? (
                                    <span className="text-light">TRUE</span>
                                  ) : (
                                    <span className="text-light">FALSE</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {results.length > 0 && (
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <p>Total Questions {results.length}</p>
                <p>
                  {results.map((question) => {
                    question.questionaire_question.correct_answer ===
                    question.answer
                      ? correctAnswers++
                      : IncorrectAnswers++;
                  })}
                  Your Correct Answers {correctAnswers}
                </p>
                <p>Your Incorrect Answers are {IncorrectAnswers}</p>
                <p>
                  You Got {Math.round((100 / results.length) * correctAnswers)}{" "}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowResults;
