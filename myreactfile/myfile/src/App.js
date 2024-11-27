import React from 'react';
import { BrowserRouter as Router, Route, Routes,useParams,Navigate} from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Teacher from './Pages/Teacher/Teacher';
import Courses from './Pages/Courses/Courses';
import Header from './Components/Header';
import Footer from './Components/Footer';
import PageNotFound from './Components/PageNotFound';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import CourseDetail from './Pages/Courses/CourseDetail';
import TeacherDetail from './Pages/Teacher/TeacherDetail';
import Signin from './Pages/Security/Signin'
import Signup from './Pages/Security/Signup'
import Chat from './Components/Chat';


function App() {
  function ValidatedCourseDetail() {
    const { coursename, courseID } = useParams();
  
    // Define the regex patterns
    const isValidCoursename = /^[a-zA-Z]+$/.test(coursename); // Only letters
    const isValidCourseID = /^[0-9]+$/.test(courseID); // Only numbers
  
    // Check if both parameters are valid; if not, redirect to PageNotFound
    if (!isValidCoursename || !isValidCourseID) {
      return <Navigate to="/pagenotfound" />;
    }
  
    // If valid, render the CourseDetail component
    return <CourseDetail />;
  }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teacherdetail/:instructorID" element={<TeacherDetail />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/coursedetail/:coursename/:courseID" element={<ValidatedCourseDetail />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/pagenotfound" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
