import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../../App";

const Questionaires = () => {
  const { isLoggedIn, user, questionaires, getQuestionaires } =
    useContext(AppContext);

  const history = useHistory();
  if (!isLoggedIn) {
    history.push("/author/admin/login");
  }

  if (user.role !== "khateeb") {
    history.push("/authour/admin/login");
  }

  useEffect(() => {
    getQuestionaires();
  }, []);

  // const deleteQuestionaire = (id) => {
  //   axios
  //     .delete(`${domain}/questionaire/${id}`)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="row" style={{ marginTop: "4rem" }}>
      <div className="col-12">
        <main className="mb-3">
          <div className="container">
            <div className="row justify-content-right">
              <div className="col-10 offset-1">
                <div className="card">
                  <div className="card-header bg-primary d-flex justify-content-between  bg-gradient text-center text-white fw-bold fs-5">
                    <div>List of all Questionaires</div>
                    <div>
                      <Link to="/khateeb/courses" className="btn btn-warning">
                        Dashboard
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Title</th>
                          <th scope="col">Course Name</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questionaires.length > 0 &&
                          questionaires.map((questionaire) => {
                            return (
                              <tr key={questionaire.id}>
                                <th scope="row">{questionaire.id}</th>
                                <td>{questionaire.title}</td>
                                <td>
                                  <Link
                                    to={`/khateeb/course/${questionaire.course.id}/view/lessons`}
                                  >
                                    {questionaire.course.title}
                                  </Link>
                                </td>
                                <td>
                                  {questionaire.questionaire_questions.length >
                                    0 && (
                                    <Link
                                      to={`/khateeb/course/${questionaire.course.id}/questionaire/${questionaire.id}/view/questions`}
                                      className="btn btn-warning btn-sm"
                                    >
                                      view
                                    </Link>
                                  )}

                                  <Link
                                    to={`/khateeb/course/${questionaire.course.id}/questionaire/${questionaire.id}/add-questions`}
                                    className="btn btn-primary btn-sm"
                                  >
                                    Add Questions
                                  </Link>
                                  {/* <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                      deleteQuestionaire(questionaire.id)
                                    }
                                  >
                                    Delete
                                  </button> */}
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
    </div>
  );
};

export default Questionaires;
