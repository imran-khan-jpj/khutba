import { useContext, useState } from "react";
import { AppContext } from "../../App";
import axios from "../../axios";

const AskFurther = ({ id }) => {
  const { apiDomain, getStudentQuestions } = useContext(AppContext);
  //   console.log(id);
  const [further, setFurther] = useState("");

  const askFurther = (id) => {
    // console.log(id);
    axios
      .post(`${apiDomain}/student/question/${id}/further`, {
        question: id,
        further: further,
      })
      .then((res) => {
        setFurther("");
        if (res.status === 200) {
          getStudentQuestions();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <li className="list-group-item d-flex">
      <input
        type="text"
        className="form-control"
        placeholder="Ask Further"
        value={further}
        onChange={(e) => setFurther(e.target.value)}
      />
      <button
        className="btn btn-primary"
        disabled={further.length < 1}
        onClick={() => askFurther(id)}
      >
        Ask
      </button>
    </li>
  );
};

export default AskFurther;
