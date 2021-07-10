import React, { useState, useEffect, useContext } from "react";
import data from "../../data/ayahs.json";
import bukhari from "../../data/bukhari.json";
import muslim from "../../data/muslim.json";
import ReactDatatable from "@ashvin27/react-datatable";
import { useHistory, useParams } from "react-router-dom";
import axios from "../../axios";
import { AppContext } from "../../App";

const AddLesson = () => {
  const { isLoggedIn, user, apiDomain } = useContext(AppContext);
  const history = useHistory();

  const [surahNumber, setSurahNumber] = useState({ surahNumber: "" });
  const [ayahNumber, setAyahNumber] = useState({ ayahNumber: "" });
  const [results, setResults] = useState([]);
  const [addLessonArray, setAddLessonArray] = useState([]);
  const [hadeesBook, setHadeesBook] = useState("bukhari");
  const [volume, setVolume] = useState(0);
  const [chapter, setChapter] = useState(0);
  const [hadeesNumber, setHadeesNumber] = useState(0);
  const [showHadeesTable, setShowHadeesTable] = useState(false);
  const [showSurahTable, setShowSurahTable] = useState(true);
  const [explanation, setExplanation] = useState([]);
  const [saveLesson, setSaveLesson] = useState([]);
  const [submittedLesson, setSubmittedLesson] = useState(false);
  const [submittedLessonMsg, setSubmittedLessonMsg] = useState("");
  const [lessonFor, setLessonFor] = useState("muslim");
  const [showExplanation, setShowExplanation] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const hideMsg = setTimeout(() => {
      setSubmittedLesson(false);
    }, 3000);

    return () => clearTimeout(hideMsg);
  }, [submittedLesson]);

  const searchSurah = () => {
    setShowHadeesTable(false);
    setShowSurahTable(true);
    const combined = { ...surahNumber, ...ayahNumber };
    // console.log("COMBINED", combined);

    let getResults = [];
    if (combined.ayahNumber === "") {
      getResults = data.filter((ayat) => ayat.surah === combined.surahNumber);

      setResults(getResults);
    } else if (surahNumber !== "" && combined.ayaNumber !== "") {
      getResults = data.filter(
        (ayat) =>
          ayat.surah === combined.surahNumber &&
          ayat.ayah === combined.ayahNumber
      );
      setResults(getResults);
    }
    console.log(getResults);
  };

  const removeExplanation = () => {
    setExplanation("");
    setShowExplanation("");
  };

  const searchHadees = () => {
    setShowHadeesTable(true);
    setShowSurahTable(false);
    if (hadeesBook === "bukhari") {
      let foundedHadees = bukhari.filter(
        (item) =>
          item.volume === String(volume) &&
          item.chapter === String(chapter) &&
          item.hadees === String(hadeesNumber)
      );

      setResults(foundedHadees);
    } else {
      let foundedHadees = muslim.filter(
        (item) =>
          item.volume === String(volume) &&
          item.chapter === String(chapter) &&
          item.hadees === String(hadeesNumber)
      );

      setResults(foundedHadees);
    }
  };

  const insertLesson = (record) => {
    setAddLessonArray([...addLessonArray, record]);
  };

  const columns = [
    {
      key: "surah",
      text: "Surah",
      align: "left",
    },
    {
      key: "ayah",
      text: "Ayah",
      align: "left",
    },
    {
      key: "text",
      text: "Text",
      align: "left",
    },

    {
      key: "action",
      text: "Action",
      cell: (record) => {
        return (
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => insertLesson(record)}
              style={{ marginRight: "5px", width: "120px" }}
            >
              Add Lesson
            </button>
          </div>
        );
      },
    },
  ];

  const hadeesColumns = [
    {
      key: "volume",
      text: "Volume",
      align: "left",
    },
    {
      key: "chapter",
      text: "Chapter",
      align: "left",
    },
    {
      key: "hadees",
      text: "Hadees #",
      align: "left",
    },
    {
      key: "text",
      text: "Text",
      align: "left",
    },

    {
      key: "action",
      text: "Action",
      cell: (record) => {
        return (
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => insertLesson(record)}
              style={{ marginRight: "5px", width: "120px" }}
            >
              Add Lesson
            </button>
          </div>
        );
      },
    },
  ];

  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
  };

  const removeRecord = (text) => {
    let removedObj = addLessonArray.filter((item) => {
      return item.text !== text;
    });
    setAddLessonArray(removedObj);
  };
  const addExplanation = () => {
    setShowExplanation(explanation);
    const arrToSubmit = [...addLessonArray, { lessonExplanation: explanation }];

    setSaveLesson(arrToSubmit);
  };

  const sendSaveLesson = () => {
    const data = {
      content: JSON.stringify(addLessonArray),
      content_for: lessonFor,
      explanation: explanation,
    };

    // console.log(data);

    axios
      .post(`${apiDomain}/khateeb/course/${id}/add-lesson`, data)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setExplanation("");
          setShowExplanation("");
          setAddLessonArray([]);
          setSubmittedLesson(true);
          setSubmittedLessonMsg("Lesson Submitted Successfully");
        }
      })
      .catch((err) => console.log(err));
  };

  if (!isLoggedIn) {
    history.push("/author/admin/login");
  }
  if (user.role !== "khateeb") {
    history.push("/author/admin/login");
  }
  return (
    <div className="row" style={{ marginTop: "5rem" }}>
      <div className="text-center mb-4">
        Select Ayahs and Hadiths to add to lesson {/*course.name */}
      </div>
      <div className="row">
        <div className="col-3 mx-auto">
          <p className="text-center">Please Select Outline for</p>
          <select
            className="form-select mb-3"
            onChange={(e) => setLessonFor(e.target.value)}
          >
            <option value="muslim">Muslim</option>
            <option value="non-muslim">Non Muslim</option>
          </select>
        </div>
      </div>
      <div className="col-10 mx-auto border border-primary">
        <div>Find Surah</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Find Surah</th>
              <th scope="col">Find Ayat</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Surah Number"
                  autoComplete="off"
                  onChange={(e) =>
                    setSurahNumber({ surahNumber: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Leave Blank for full surah"
                  autoComplete="off"
                  onChange={(e) =>
                    setAyahNumber({ ayahNumber: e.target.value })
                  }
                />
              </td>
              <td>
                <button
                  type="button"
                  className={`btn ${
                    surahNumber.surahNumber < 1 ? "btn-danger" : "btn-primary"
                  } w-100`}
                  onClick={searchSurah}
                  disabled={surahNumber.surahNumber < 1}
                >
                  Search
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="col-3 border border-primary">
        <div>Search Keyword</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Search Keyword</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Leave Blank for full surah"
                  autoComplete="off"
                />
              </td>
              <td>
                <button type="submit" className="btn btn-primary w-100">
                  Search
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
      <div className="col-10 mx-auto border border-primary border-right-0 border-top-0">
        <div>Find Hadees</div>
        <table className="table">
          <thead>
            <tr>
              <th>Select Book</th>
              <th>Volume</th>
              <th>Chapter</th>
              <th>Hadees #</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  className="form-select"
                  onChange={(e) => setHadeesBook(e.target.value)}
                >
                  <option value="bukhari">Sahih Al Bukhari</option>
                  <option value="muslim">Sahih Muslim</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Volume Number"
                  autoComplete="off"
                  onChange={(e) => setVolume(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter chapter Number"
                  autoComplete="off"
                  onChange={(e) => setChapter(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Hadees Number"
                  autoComplete="off"
                  onChange={(e) => setHadeesNumber(e.target.value)}
                />
              </td>
              <td>
                <button
                  type="button"
                  className={`btn w-100 ${
                    volume < 1 || chapter < 1 || hadeesNumber < 1
                      ? "btn-danger"
                      : "btn-primary"
                  }`}
                  onClick={searchHadees}
                  disabled={volume < 1 || chapter < 1 || hadeesNumber < 1}
                >
                  Search
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="col-3  border-primary border border-top-0">
        <div>Search Keyword</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" colSpan="4">
                Search Keyword
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4">
                <select className="form-select">
                  <option value="bukhari">Sahih Al Bukhari</option>
                  <option value="muslim">Sahih Muslim</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Leave Blank for full surah"
                  autoComplete="off"
                />
              </td>
              <td>
                <button type="submit" className="btn btn-primary w-100">
                  Search
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
      <div className="row border">
        <div className="col-6 offset-1 pt-4">
          {showSurahTable && (
            <ReactDatatable
              config={config}
              records={results}
              columns={columns}
            />
          )}
          {showHadeesTable && (
            <ReactDatatable
              config={config}
              records={results}
              columns={hadeesColumns}
            />
          )}
        </div>
        <div className="col-4 pt-4">
          <div>Lesson Board</div>
          {addLessonArray.length > 0 &&
            addLessonArray.map((item) => {
              return (
                <div
                  className={`alert alert-dismissible ${
                    item.type === "ayah" ? "alert-primary" : "alert-success"
                  }`}
                  key={item.id}
                >
                  {item.text}

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => removeRecord(item.text)}
                  ></button>
                </div>
              );
            })}
          {showExplanation.length > 0 && (
            <p className="alert alert-warning alert-dismissible">
              {showExplanation}
              <button
                type="button"
                className="btn-close"
                onClick={removeExplanation}
              ></button>
            </p>
          )}
          <input
            type="text"
            className="form-control mb-2"
            aria-describedby="emailHelp"
            placeholder="Add Explanation (Optional)"
            autoComplete="off"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
          <button
            className="btn btn-info w-100 mb-2"
            onClick={addExplanation}
            disabled={addLessonArray.length < 1 || explanation.length < 1}
          >
            Add Explanation
          </button>
          {submittedLesson && (
            <p class="alert alert-success">{submittedLessonMsg}</p>
          )}
          <button className="btn btn-primary w-100" onClick={sendSaveLesson}>
            Save Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
