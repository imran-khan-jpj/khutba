import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../../App";

const AddQuestions = () => {
  const { isLoggedIn, user, apiDomain, getQuestionaires } =
    useContext(AppContext);
  const history = useHistory();
  const { course_id, questionaire_id } = useParams();

  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [incorrectAnswer1, setIncorrectAnswer1] = useState("");
  const [incorrectAnswer2, setIncorrectAnswer2] = useState("");
  const [incorrectAnswer3, setIncorrectAnswer3] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [editQ, setEditQ] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const hideMsg = setTimeout(() => {
      setSuccess(false);
      setErr(false);
      if (success) {
        setData([]);
        history.push("/khateeb/courses");
      }
    }, 3000);

    return () => clearTimeout(hideMsg);
  }, [success, err]);

  const submitQuestions = () => {
    setLoading(true);
    // console.log(data);

    axios
      .post(
        `${apiDomain}/khateeb/course/${course_id}/questionaire/${questionaire_id}/add-questions`,
        { data: data }
      )
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setSuccess(true);
          setSuccessMsg("Questions Submitted");
          getQuestionaires();
        } else {
          setLoading(false);
          setErr(true);
          setErrMsg("something Went wrong please try again");
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const saveQuestion = () => {
    if (question.length < 1) {
      alert("Question Field is Required");
      return;
    } else if (correctAnswer.length < 1) {
      alert("Correct Field is Required");
      return;
    } else if (incorrectAnswer1.length < 1) {
      alert("Incorrect Answer First Field is Required");
      return;
    } else if (incorrectAnswer2.length < 1) {
      alert("Incorrect Answer Second Field is Required");
      return;
    } else if (incorrectAnswer3.length < 1) {
      alert("Incorrect Answer Third Field is Required");
      return;
    }

    if (editQ.length > 0) {
      setData(
        data.map((item) => {
          if (item.question === editQ) {
            return {
              ...item,
              question: question,
              correct_answer: correctAnswer,
              incorrect_answer1: incorrectAnswer1,
              incorrect_answer2: incorrectAnswer2,
              incorrect_answer3: incorrectAnswer3,
            };
          }
          return item;
        })
      );

      setEditQ("");
    } else {
      let tempQuestion = {
        question: question,
        correct_answer: correctAnswer,
        incorrect_answer1: incorrectAnswer1,
        incorrect_answer2: incorrectAnswer2,
        incorrect_answer3: incorrectAnswer3,
        course_id: course_id,
        questionaire_id: questionaire_id,
      };
      setData([...data, tempQuestion]);
    }

    setQuestion("");
    setCorrectAnswer("");
    setIncorrectAnswer1("");
    setIncorrectAnswer2("");
    setIncorrectAnswer3("");
  };

  const editQuestion = (question) => {
    setEditQ(question.question);
    setQuestion(question.question);
    setCorrectAnswer(question.correct_answer);
    setIncorrectAnswer1(question.incorrect_answer1);
    setIncorrectAnswer2(question.incorrect_answer2);
    setIncorrectAnswer3(question.incorrect_answer3);
  };
  const deleteQuestion = (question) => {
    const removedQuestion = data.filter((q) => q.question !== question);
    // console.log(removedQuestion);
    setData(removedQuestion);
  };
  if (!isLoggedIn) {
    history.push("/author/admin/login");
  }
  if (user.role !== "khateeb") {
    history.push("/author/admin/login");
  }

  // const getQuestions = () => {
  //   axios
  //     .get(
  //       `${apiDomain}/course/${course_id}/questionaire/${questionaire_id}/getQuestions`
  //     )
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div style={{ marginTop: "4rem" }} className="">
      <div className="col-10 mx-auto">
        <div>Create Question</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" colSpan="2">
                Create Question
              </th>
              <th scope="col">
                <span className="text-success">Correct Answer</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2">
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
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Correct Answer"
                  autoComplete="off"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="" className="text-danger">
                  Incorrect Answer 1
                </label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Incorrect Answer 1"
                  autoComplete="off"
                  value={incorrectAnswer1}
                  onChange={(e) => setIncorrectAnswer1(e.target.value)}
                />
              </td>
              <td>
                <label htmlFor="" className="text-danger">
                  Incorrect Answer 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Incorrect Answer 2"
                  autoComplete="off"
                  value={incorrectAnswer2}
                  onChange={(e) => setIncorrectAnswer2(e.target.value)}
                />
              </td>
              <td>
                <label htmlFor="" className="text-danger">
                  Incorrect Answer 3
                </label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Incorrect Answer 3"
                  autoComplete="off"
                  value={incorrectAnswer3}
                  onChange={(e) => setIncorrectAnswer3(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button
                  className="btn btn-primary w-100"
                  onClick={saveQuestion}
                >
                  Save Question
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-10 mx-auto">
          {data.length > 0 &&
            data.map((question, index) => {
              return (
                <div className="card" key={index}>
                  <div className="card-header">{question.question}</div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-10 border">
                        <button className="btn btn-success">
                          {question.correct_answer}
                        </button>
                        <button className="btn btn-danger">
                          {question.incorrect_answer1}
                        </button>
                        <button className="btn btn-danger">
                          {question.incorrect_answer2}
                        </button>
                        <button className="btn btn-danger">
                          {question.incorrect_answer3}
                        </button>
                      </div>
                      <div className="col-2 border">
                        <button
                          className="btn btn-primary"
                          onClick={() => editQuestion(question)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteQuestion(question.question)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {data.length > 0 && (
            <button onClick={submitQuestions} className="btn btn-primary">
              {loading ? "Loading" : "Submit Questions"}
            </button>
          )}

          {err && <div className="alert alert-danger">{errMsg}</div>}
          {success && <div className="alert alert-success">{successMsg}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddQuestions;
