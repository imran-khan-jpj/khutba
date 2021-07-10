import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../../App";

const Questionaires = () => {
  const {
    isLoggedIn,
    user,
    getQuestionaires,
    takenQuestionaires,
    pendingQuestionaires,
  } = useContext(AppContext);

  const history = useHistory();
  if (!isLoggedIn) {
    history.push("/student/login");
  }

  if (user.role !== "student") {
    history.push("/student/login");
  }

  useEffect(() => {
    getQuestionaires();
  }, []);

  return (
    <div className="row" style={{ marginTop: "4rem" }}>
      <div className="col-12">
        <main className="mb-3">
          <div className="container">
            <div className="row justify-content-right">
              <div className="col-10 offset-1">
                <div className="card">
                  <div className="card-header bg-primary d-flex justify-content-between  bg-gradient text-center text-white fw-bold fs-5">
                    <div>List of taken Questionaires</div>
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
                          <th scope="col">Questionaire Name</th>
                          <th scope="col">Form Course</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {takenQuestionaires.length > 0 ? (
                          takenQuestionaires.map((questionaire, index) => {
                            return (
                              <tr key={questionaire.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{questionaire.title}</td>
                                <td>{questionaire.course.title}</td>
                                <td>
                                  <Link
                                    className="btn btn-sm btn-primary"
                                    to={`/student/q/${questionaire.id}/showResult`}
                                  >
                                    Show Results
                                  </Link>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr className="alert alert-danger text-center">
                            <td colSpan="5">
                              There is no taken Questionaire Available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="col-12">
        <main className="mb-3">
          <div className="container">
            <div className="row justify-content-right">
              <div className="col-10 offset-1">
                <div className="card">
                  <div className="card-header bg-primary d-flex justify-content-between  bg-gradient text-center text-white fw-bold fs-5">
                    <div>List of Pending Questionaires</div>
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
                          <th scope="col">Questionaire Name</th>
                          <th scope="col">Form Course</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingQuestionaires.length > 0 ? (
                          pendingQuestionaires.map((questionaire, index) => {
                            return (
                              <tr key={questionaire.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{questionaire.title}</td>
                                <td>{questionaire.course.title}</td>
                                <td>
                                  {questionaire.questionaire_questions.length >
                                  0 ? (
                                    <Link
                                      className="btn btn-sm btn-primary"
                                      to={`/student/questionaire/${questionaire.id}`}
                                    >
                                      Take
                                    </Link>
                                  ) : (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      disabled={true}
                                    >
                                      No Questions Available
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr className="alert alert-danger text-center">
                            <td colSpan="5">
                              There is no Pending Questionaire Available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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

export default Questionaires;
