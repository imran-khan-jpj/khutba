import { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { AppContext } from "../../App";
import axios from "../../axios";

const ViewLessons = () => {
  const { isLoggedIn, user, apiDomain } = useContext(AppContext);
  const [forMuslims, setForMuslims] = useState([]);
  const [forNonMuslims, setForNonMuslims] = useState([]);
  const [title, setTitle] = useState([]);
  const history = useHistory();
  const [explanation, setExplanation] = useState("");
  const [explanationForNonMuslim, setExplanationForNonMuslim] = useState("");
  const [answerReplyText, setAnswerReplyText] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { id } = useParams();

  useEffect(() => {
    getLessons();

    const hideMsg = setTimeout(() => {
      setSuccess(false);
      setErr(false);
    }, 3000);

    return () => clearTimeout(hideMsg);
  }, [success, err]);

  if (!isLoggedIn) {
    history.push("/");
  }

  if (user.role !== "khateeb") {
    history.push("/");
  }

  const getLessons = () => {
    axios
      .get(`${apiDomain}/khateeb/course/${id}/lessons`)
      .then((res) => {
        if (res.status === 200) {
          const { title, muslim_outline, nonmuslim_outline } = res.data;
          if (res.data.explanation !== "") {
            setExplanation(res.data.explanation);
          }
          if (res.data.explanationForNonMuslim !== "") {
            setExplanationForNonMuslim(
              res.data.explanationForNonMuslim.explanation
            );
          }
          setForMuslims(muslim_outline);
          setForNonMuslims(nonmuslim_outline);
          setTitle(title);
        }
      })
      .catch((err) => console.log(err));
  };
  const answerReply = (id) => {
    axios
      .post(`${apiDomain}/khateeb/explanation/reply/${id}`, {
        answer_reply: answerReplyText,
      })
      .then((res) => {
        if (res.status === 200) {
          getLessons();
          setSuccess(true);
          setSuccessMsg("Reply submitted");
        }
      })
      .catch((err) => {
        setErr(true);
        setErrMsg("something went wrong please try again");
      });
  };
  return (
    <div>
      <div className="row" style={{ marginTop: "4rem" }}>
        <div className="text-center">
          <h2>{title}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 p-5">
          <h2 className="text-center">Outline for Muslims</h2>

          <div className="card">
            <div className="card-header text-center">{title}</div>
            <ul className="list-group list-group-flush">
              {forMuslims.length ? (
                forMuslims.map((outline, index) => {
                  return (
                    <li className="list-group-item" key={index}>
                      {outline.type === "ayah"
                        ? `${outline.text} (${outline.surah}:${outline.ayah})`
                        : `${outline.text}(${outline.chapter}:${outline.hadees})`}
                    </li>
                  );
                })
              ) : (
                <Link
                  to={`/khateeb/${id}/add-lesson`}
                  className="btn btn-primary"
                >
                  Add Lesson
                </Link>
              )}
              {explanation !== "" && (
                <>
                  <li className="list-group-item bg-warning text-center">
                    Explanation by Khateeb
                  </li>
                  <li className="list-group-item bg-success text-light">
                    {explanation.explanation}
                  </li>
                  {explanation.replies.length > 0 && (
                    <>
                      {explanation.replies.map((reply) => {
                        return (
                          <li className="list-group-item" key={reply.id}>
                            <div>
                              <span className="text-success">
                                {reply.user_name}
                                {" : "}
                              </span>
                              {reply.reply}
                            </div>
                            {reply.answer_reply === null ? (
                              <div className="d-flex">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={answerReplyText}
                                  onChange={(e) =>
                                    setAnswerReplyText(e.target.value)
                                  }
                                />
                                <button
                                  className="btn btn-primary"
                                  onClick={() => answerReply(reply.id)}
                                >
                                  Answer
                                </button>
                              </div>
                            ) : (
                              <div>
                                <span className="text-success">
                                  {reply.answer_reply.answer_by}
                                  {" : "}
                                </span>
                                {reply.answer_reply.answer_reply}
                              </div>
                            )}
                          </li>
                        );
                      })}

                      {/* {explanation.reply.answer_reply === null ? (
                        <li className="list-group-item">
                          
                        </li>
                      ) : (
                        <li className="list-group-item">
                          {explanation.reply.answer_reply.answer_reply}
                        </li>
                      )} */}
                    </>
                  )}

                  {console.log(explanation.reply)}
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="col-lg-6 p-5">
          <h2 className="text-center">Outline for non Muslims</h2>
          <div className="card">
            <div className="card-header text-center">{title}</div>
            <ul className="list-group list-group-flush">
              {forNonMuslims.length ? (
                forNonMuslims.map((outline, index) => {
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
                <Link
                  to={`/khateeb/${id}/add-lesson`}
                  className="btn btn-primary"
                >
                  Add Lesson
                </Link>
              )}
              {explanationForNonMuslim.length > 0 && (
                <>
                  <li className="list-group-item bg-warning text-center">
                    Explanation by Khateeb
                  </li>
                  <li className="list-group-item bg-success text-light">
                    {explanationForNonMuslim}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLessons;
