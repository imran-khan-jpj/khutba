import axios from "../../axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import SingleQuestion from "./SingleQuestion";

const Questionnaire = () => {
  const { isLoggedIn, user, apiDomain } = useContext(AppContext);
  const history = useHistory();
  const [questionaireQuestions, setQuestionaireQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const { id } = useParams();

  // console.log(questionaireQuestions);

  if (!isLoggedIn) {
    history.push("/student/login");
  }

  if (user.role !== "student") {
    history.push("/student/login");
  }

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = () => {
    axios
      .get(`${apiDomain}/student/questionaire/${id}/questionaireQuestions`)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          setQuestionaireQuestions(res.data.questions);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginTop: "6rem" }}>
      {questionaireQuestions.length > 0 && (
        <SingleQuestion
          id={id}
          question={questionaireQuestions[currentQuestion]}
          setCurrentQuestion={setCurrentQuestion}
          questions={questionaireQuestions}
          currentQuestion={currentQuestion}
        />
      )}
    </div>
  );
};

export default Questionnaire;
