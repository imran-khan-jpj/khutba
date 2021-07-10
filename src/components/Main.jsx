import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <div className="row text-center text-dark" style={{ marginTop: "4rem" }}>
        <i className="bi bi-book-fill" style={{ fontSize: "92px" }}></i>
        <h1
          style={{
            fontWeight: "400",
            fontSize: "56px",
            lineHeight: "56px",
            color: "#333333",
          }}
        >
          Khateeb.Org
        </h1>
        <p
          style={{
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "20px",
            color: "#333333",
            marginTop: "3rem",
          }}
        >
          A new direction towards Islamic Knowledge
        </p>
      </div>
      <div className="row p-5 pt-0">
        <div
          className="col-lg-4 offset-lg-2 text-wrap"
          style={{
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "20px",
            color: "#333333",
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          E-learning is a rapidly growing environment of delivering education at
          geographically dispersed areas around the globe. The technology has
          removed the distances and any newly evolving technology is everywhere
          in no time. E-learning is playing the vital role to spread the vast
          quality knowledge by veteran tutors to those areas that lack good
          teaching and learning environment in their regional institutes.
        </div>
        <div
          className="col-lg-4"
          style={{
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "20px",
            color: "#333333",
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          Keeping in mind new ways of online learning environment, targeting
          massive number of knowledge seekers and lovers to get educated at
          homes, Khateeb.org is an enduring application developed with the aim
          of spreading Islamic knowledge in the form of courses being offered
          online that would target a massive group of people.
        </div>
      </div>
      <div className="row">
        <div className="col-6 text-end">
          <Link to="/student/login" className="btn btn-dark rounded-0 btn-sm">
            GET STARTED
          </Link>
        </div>
        <div className="col-6">
          <button className="btn btn-dark rounded-0 btn-sm pl-4 pr-4">
            TESTABLEMETHOD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
