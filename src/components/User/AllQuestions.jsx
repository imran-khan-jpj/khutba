import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../App";

const AllQuestions = () => {
  const { getAllQuestions, isLoggedIn, user, allQuestions } =
    useContext(AppContext);
  const history = useHistory();

  const [further, setFurther] = useState("");

  useEffect(() => {
    getAllQuestions();
    const hideMsg = setTimeout(() => {}, 3000);

    return () => clearTimeout(hideMsg);
  }, []);

  const askFurther = (id) => {
    axios
      .patch(`domain.com/student/question/${id}/`, {
        data: { qustion: id, further: "further" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (!isLoggedIn) {
    history.push("/student/login");
  }

  if (user.role !== "student") {
    history.push("/student/login");
  }

  return (
    <div style={{ marginTop: "6rem" }}>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-4">List of Questions of All Users</div>
          {allQuestions.length > 0 ? (
            allQuestions.map((question) => (
              <div className="card" style={{ width: "52rem" }}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
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
                      <li className="list-group-item d-flex">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ask Further"
                          onChange={(e) => setFurther(e.target.value)}
                        />
                        <button
                          className="btn btn-primary"
                          disabled={further.length < 1}
                          onClick={() => askFurther(question.id)}
                        >
                          Ask
                        </button>
                      </li>
                    </>
                  )}
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

export default AllQuestions;
