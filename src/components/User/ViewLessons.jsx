import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import axios from "../../axios";
import Comment from "./Comment";

const ViewLessons = () => {
  const { isLoggedIn, user, apiDomain, registeredCourses } =
    useContext(AppContext);
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState("");
  const [explanation, setExplanation] = useState("");
  const [explanationId, setExplanationId] = useState(0);
  const [found, setFound] = useState(true);
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    getLesson();

    explanation !== "" &&
      explanation.replies.length > 0 &&
      explanation.replies.filter((reply) => {
        if (reply.user_name === user.name) {
          setFound(true);
        }

        console.log(found);
      });
  }, [found]);

  const getLesson = () => {
    let course = registeredCourses.filter(
      (c) => Number(c.id) === Number(id) && c
    );
    setCourse(course[0]);
    axios.get(`${apiDomain}/khateeb/course/${id}/lessons`).then((res) => {
      // console.log(res.data.explanation);
      setLessons(res.data.lessons);
      if (res.data.explanation !== "") {
        setExplanation(res.data.explanation);
        setExplanationId(res.data.explanation.id);

        // if(explanation.replies.filter(reply => reply.user_name === user.name)){
        //   console.log('found');
        // }else{
        //   console.log('not found');
        // }
      }
    });
  };

  if (!isLoggedIn) {
    history.push("/");
  }

  if (user.role !== "student") {
    history.push("/");
  }

  // console.log(found);

  return (
    <div>
      <div className="row" style={{ marginTop: "8rem" }}>
        <div className="text-center">
          <h2>{`Lessons for Course ${course.title}`}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card">
            <div className="card-header text-center">{course.title}</div>
            <ul className="list-group list-group-flush">
              {lessons.length > 0 ? (
                lessons.map((outline, index) => {
                  return (
                    <>
                      <li className="list-group-item" key={index}>
                        {outline.type === "ayah"
                          ? `${outline.text} (${outline.surah}:${outline.ayah})`
                          : `${outline.text}(${outline.chapter}:${outline.hadees})`}
                      </li>
                    </>
                  );
                })
              ) : (
                <p className="alert alert-danger text-center">
                  This course has no lessons
                </p>
              )}
              {explanation !== "" && (
                <li className="list-group-item bg-warning text-center">
                  Explanation by Khateeb
                </li>
              )}
              {explanation !== "" && (
                <>
                  <li className="list-group-item bg-success text-light">
                    {explanation.explanation}
                  </li>
                  <li className="list-group-item">
                    {explanation !== null && explanation.replies.length > 0 ? (
                      explanation.replies.map((reply) => {
                        return (
                          <>
                            <div key={reply.id} className="d-flex">
                              <div className="text-success mb-2">{`${reply.user_name} Asked :`}</div>
                              <div> {reply.reply}</div>
                            </div>
                            {reply.answer_reply !== null && (
                              <div className="">
                                <span className="text-success">
                                  {reply.answer_reply.answer_by}
                                  {" : "}
                                </span>
                                {reply.answer_reply.answer_reply}
                                <hr />
                              </div>
                            )}
                          </>
                        );
                      })
                    ) : (
                      <Comment
                        explanationId={explanationId}
                        getLesson={getLesson}
                      />
                    )}
                  </li>
                </>
              )}
              {found === false && (
                <Comment explanationId={explanationId} getLesson={getLesson} />
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLessons;
