import axios from "../../axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useParams } from "react-router-dom";

const ViewQuestionairesQuestions = () => {
  const { apiDomain, getQuestionaires } = useContext(AppContext);
  const { course_id, questionaire_id } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestionsAnswers();
  }, []);

  const getQuestionsAnswers = () => {
    axios
      .get(`${apiDomain}/khateeb/${course_id}/${questionaire_id}/getQuestions`)
      .then((res) => {
        if (res.status === 200) {
          setQuestions(res.data.questions);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteQuestion = (id) => {
    axios.delete(`${apiDomain}/khateeb/delete/${id}`).then((res) => {
      if (res.status === 200) {
        getQuestionsAnswers();
        getQuestionaires();
      }
    });
  };

  return (
    <div className="row" style={{ marginTop: "4rem" }}>
      <div className="col-12">
        <main className="mb-3">
          <div className="row justify-content-right">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-primary d-flex justify-content-between  bg-gradient text-center text-white fw-bold fs-5">
                  <div>List of Questions with Answers</div>
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Question</th>
                        <th scope="col">Correct</th>
                        <th scope="col">Incorrect</th>
                        <th scope="col">Incorrect</th>
                        <th scope="col">Incorrect</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.length > 0 &&
                        questions.map((question, index) => {
                          return (
                            <tr key={question.id}>
                              <th scope="row">{index + 1}</th>
                              <td>{question.question}</td>
                              <td className="bg-success">
                                {question.correct_answer}
                              </td>
                              <td className="bg-danger">
                                {question.incorrect_answer1}
                              </td>
                              <td className="bg-danger">
                                {question.incorrect_answer2}
                              </td>
                              <td className="bg-danger">
                                {question.incorrect_answer3}
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteQuestion(question.id)}
                                >
                                  Delete
                                </button>
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
        </main>
      </div>
    </div>
  );
};

export default ViewQuestionairesQuestions;
