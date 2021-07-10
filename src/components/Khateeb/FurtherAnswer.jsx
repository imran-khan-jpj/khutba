import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import axios from "../../axios";

const FurtherAnswer = (further) => {
  console.log(further);

  const { apiDomain, isLoggedIn, user, getAllQuestions } =
    useContext(AppContext);

  const [furtherAnswer, setFurtherAnswer] = useState("");

  const answerFurther = (id) => {
    axios
      .post(`${apiDomain}/question/further/answer/${id}`, {
        further: id,
        answer: furtherAnswer,
      })
      .then((res) => {
        if (res.status === 200) {
          setFurtherAnswer("");
          getAllQuestions();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <li key={further.id} className="list-group-item">
      <div>{further.further}</div>
      <div>
        {further.answer === null ? (
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              value={furtherAnswer}
              onChange={(e) => setFurtherAnswer(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => answerFurther(further.id)}
            >
              Submit
            </button>
          </div>
        ) : (
          <div>
            <span className="text-success">Answer</span> :{" "}
            {further.answer.answer}
          </div>
        )}
      </div>
    </li>
  );
};

export default FurtherAnswer;
