import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import "./App.css";
import Footer from "./components/Footer";
import Login from "./components/User/Login";
import AuthorAdminLogin from "./components/Khateeb/AuthorAdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import NotFound from "./components/NotFound";
import AddKhateeb from "./components/Admin/AddKhateeb";
import AllKhateeb from "./components/Admin/AllKhateeb";
import ChangePassword from "./components/Admin/ChangePassword";
import KhateebChangePassword from "./components/Khateeb/ChangePassword";
import StudentChangePassword from "./components/User/ChangePassword";
import CreateCourse from "./components/Khateeb/CreateCourse";
import CreateQuestionaire from "./components/Khateeb/CreateQuestionaire";
import Courses from "./components/Khateeb/Courses";
import AddLesson from "./components/Khateeb/AddLesson";
import AddQuestions from "./components/Khateeb/AddQuestions";
import Questionaires from "./components/Khateeb/Questionaires";
import StudentQuestionaires from "./components/User/Questionaires";
import Questionaire from "./components/User/Questionaire";
import YourQuestions from "./components/User/YourQuestions";
import ShowResults from "./components/User/ShowResults";
import AllQuestions from "./components/User/AllQuestions";
import AllQuestionsKhateeb from "./components/Khateeb/AllQuestions";
import StudentDashboard from "./components/User/StudentDashboard";
import ViewQuestionairesQuestions from "./components/Khateeb/ViewQuestionairesQuestions";
import ViewStudentLesson from "./components/User/ViewLessons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewLessons from "./components/Khateeb/ViewLessons";

export const AppContext = React.createContext();

function App() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allKhateebs, setAllKhateebs] = useState([]);
  const [studentQuestions, setStudentQuestions] = useState([]);
  const [questionaires, setQuestionaires] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionaireQuestions, setQuestionaireQuestions] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [unregisteredCourses, setUnregisteredCourses] = useState([]);
  const [takenQuestionaires, setTakenQuestionaires] = useState([]);
  const [pendingQuestionaires, setPendingQuestionaires] = useState([]);
  const apiDomain = "http://localhost:8000/api";

  useEffect(() => {
    axios
      .post("http://localhost:8000/logout")
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(false);
          setUser("");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const getCourses = () => {
    axios
      .get(`${apiDomain}/courses`)
      .then((res) => {
        if (res.status === 200) {
          setCourses(res.data.courses);
          setRegisteredCourses(res.data.registered);
          setUnregisteredCourses(res.data.unregistered);
        }
      })
      .catch((err) => console.log(err));
  };

  const getAllKhateeb = () => {
    axios
      .get(`${apiDomain}/admin/all-khateeb`)
      .then((res) => {
        if (res.status === 200) {
          setAllKhateebs(res.data.khateebs);
        }
      })
      .catch((err) => console.log(err));
  };

  const getStudentQuestions = () => {
    axios
      .get(`${apiDomain}/student/your-questions`)
      .then((res) => {
        if (res.status === 200) {
          setStudentQuestions(res.data.questions);
        }
      })
      .catch((err) => console.log(err));
  };

  const getAllQuestions = () => {
    axios
      .get(`${apiDomain}/student/all-questions`)
      .then((res) => {
        if (res.status === 200) {
          setAllQuestions(res.data.questions);
        }
      })
      .catch((err) => console.log(err));
  };

  const getQuestionaires = () => {
    axios.get(`${apiDomain}/khateeb/questionaires`).then((res) => {
      if (res.status === 200) {
        if (user.role === "khateeb") {
          setQuestionaires(res.data.questionaires);
        } else if (user.role === "student") {
          setTakenQuestionaires(res.data.taken);
          setPendingQuestionaires(res.data.pending);
        }
      }
    });
  };

  const data = {
    courses,
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    allKhateebs,
    setAllKhateebs,
    setStudentQuestions,
    studentQuestions,
    questionaireQuestions,
    setQuestionaireQuestions,
    questions,
    setQuestions,
    questionaires,
    setQuestionaires,
    apiDomain,
    getAllKhateeb,
    getCourses,
    getQuestionaires,
    registeredCourses,
    unregisteredCourses,
    getStudentQuestions,
    getAllQuestions,
    allQuestions,
    takenQuestionaires,
    pendingQuestionaires,
  };

  return (
    <AppContext.Provider value={data}>
      <div className="App">
        <Header style={{ marginBottom: "8rem" }} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          {/*Student Routes*/}
          <Route path="/student/login">
            <Login />
          </Route>
          <Route path="/student/questionaire/:id">
            <Questionaire />
          </Route>
          <Route path="/student/q/:id/showResult">
            <ShowResults />
          </Route>
          <Route path="/student/change-password">
            <StudentChangePassword />
          </Route>
          <Route path="/student/:id/lessons">
            <ViewStudentLesson />
          </Route>
          <Route path="/student/questionaires">
            <StudentQuestionaires />
          </Route>
          <Route path="/student/your-questions">
            <YourQuestions />
          </Route>
          <Route path="/student/all-questions">
            <AllQuestions />
          </Route>
          <Route path="/student/dashboard">
            <StudentDashboard />
          </Route>

          {/*Admin Routes*/}
          <Route path="/author/admin/login">
            <AuthorAdminLogin />
          </Route>
          <Route path="/admin/dashboard">
            <AdminDashboard />
          </Route>
          <Route path="/admin/add-khateeb">
            <AddKhateeb />
          </Route>
          <Route path="/admin/all-khateebs">
            <AllKhateeb />
          </Route>
          <Route path="/admin/change-password">
            <ChangePassword />
          </Route>
          {/*End Admin Routes*/}
          {/*Start Khateeb Routes*/}
          <Route path="/khateeb/courses">
            <Courses />
          </Route>
          <Route path="/khateeb/create-course">
            <CreateCourse />
          </Route>
          <Route path="/khateeb/:id/add-lesson">
            <AddLesson />
          </Route>
          <Route path="/khateeb/course/:id/view/lessons">
            <ViewLessons />
          </Route>
          <Route path="/khateeb/change-password">
            <KhateebChangePassword />
          </Route>
          <Route path="/khateeb/course/:course_id/questionaire/:questionaire_id/add-questions">
            <AddQuestions />
          </Route>
          <Route path="/khateeb/course/:course_id/questionaire/:questionaire_id/view/questions">
            <ViewQuestionairesQuestions />
          </Route>
          <Route path="/khateeb/:id/create-questionaire">
            <CreateQuestionaire />
          </Route>
          <Route path="/khateeb/questionaires">
            <Questionaires />
          </Route>
          <Route path="/khateeb/questions">
            <AllQuestionsKhateeb />
          </Route>
          {/*End Khateeb Routes*/}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
