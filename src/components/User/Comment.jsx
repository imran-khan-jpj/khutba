import { useContext, useState } from "react";
import { AppContext } from "../../App";
import axios from "../../axios";

const Comment = ({ explanationId, getLesson }) => {
  const { apiDomain } = useContext(AppContext);
  //   console.log(explanationId);
  const [text, setText] = useState("");

  const submitComment = (explanationId) => {
    axios
      .post(`${apiDomain}/student/explanation/reply/${explanationId}`, {
        reply: text,
      })
      .then((res) => {
        if (res.status === 200) {
          getLesson();
          setText("");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <li className="list-group-item">
      <div className="d-flex">
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => submitComment(explanationId)}
        >
          Comment
        </button>
      </div>
    </li>
  );
};

export default Comment;
