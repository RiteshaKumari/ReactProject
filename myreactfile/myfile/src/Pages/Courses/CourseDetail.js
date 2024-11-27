import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUser, faCertificate, faBook, faClock, faLanguage, faUsers, faPhoneAlt, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './CourseDetail.module.css';
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {

  const { coursename,courseID } = useParams(); // Get the course ID from URL parameters
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 
  useEffect(() => {
    
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(`https://localhost:7164/api/Home/getCourseDetail/${courseID}/${coursename}`);
        
        if (response.status === 200) {
          setCourse(response.data[0]); // Assumes API returns an array with one course object
          setLoading(false);
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          // Redirect to "Page Not Found" if a 400 Bad Request response is received
          navigate('/pagenotfound');
         
        } else {
          navigate('/pagenotfound');
        }
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [courseID, coursename, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <img src={course.image} alt="Course" className={styles.mainImage} />
        <h1 className={styles.courseTitle}>{course.categoryName} : {course.courseName}</h1>
        <p className={styles.courseDescription}>
          {course.description}
        </p>
        
        <h2 className={styles.sectionHeading}>What You'll Learn</h2>
        <ul className={styles.courseFeatures}>
  {course.features.split('.').map((feature, index) => {
    // Trim each sentence and ignore empty strings in case of trailing full stops
    const trimmedFeature = feature.trim();
    return trimmedFeature ? <li key={index}>{trimmedFeature}.</li> : null;
  })}
</ul>
        
        <h2 className={styles.sectionHeading}>Why choose this course?</h2>
        <ul className={styles.courseBenefits}>
    
        {course.benefits.split('.').map((feature, index) => {
    // Trim each sentence and ignore empty strings in case of trailing full stops
    const trimmedFeature = feature.trim();
    return trimmedFeature ? <li key={index}>{trimmedFeature}.</li> : null;
  })}
          {/* <li>Tempor incididunt ut labore et dolore magna aliqua.</li>
          <li>Enim ad minim veniam quis nostrud exercitation.</li>
          <li>Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
          <li>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li> */}
        </ul>
      </div>

      <aside className={styles.sidebar}>
        <div className={styles.courseInfo}>
          <h3>Course Information</h3>
          <p><div><FontAwesomeIcon icon={faDollarSign} /> <strong>Price:</strong></div> ${course.price}</p>
          <p><div><FontAwesomeIcon icon={faUser} /> <strong>Instructor:</strong></div> {course.instructor}</p>
          <p><div><FontAwesomeIcon icon={faCertificate} /> <strong>Certifications:</strong></div> {course.certification}</p>
          <p><div><FontAwesomeIcon icon={faBook} /> <strong>Lessons:</strong></div> {course.noOfVideos}</p>
          <p><div><FontAwesomeIcon icon={faClock} /> <strong>Duration:</strong></div> {course.duration}</p>
          <p><div><FontAwesomeIcon icon={faLanguage} /> <strong>Language:</strong></div> {course.language}</p>
          <p><div><FontAwesomeIcon icon={faUsers} /> <strong>Students:</strong></div> {course.noOfStudentEnrolled}</p>
        </div>
        <div className={styles.contact}>
          <h3>Contact Us</h3>
          <p><div><FontAwesomeIcon icon={faPhoneAlt} /> <strong>24/7 Support:</strong></div> {course.instructorMobile}</p>
          <p><div><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong></div> {course.instructorEmail}</p>
          <p><div><FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Location:</strong></div> {course.instructorName}</p>
        </div>
        <button className={styles.enrollButton}>Enroll Now</button>
      </aside>
    </div>
  );
};

export default CourseDetail;
