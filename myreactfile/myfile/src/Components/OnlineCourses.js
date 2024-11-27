import React , { useEffect, useState } from 'react';
import styles from './OnlineCourses.module.css';
import { FaBook, FaUser, FaUsers } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';


function OnlineCourses() {

  const [courses, setcourses] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await axios.get("https://localhost:7164/api/Home/getTopSixCourse");
        setcourses(Array.isArray(result.data) ? result.data : []);
        console.log(result.data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Get Your Course With Us</h1>
        <div className={styles.coursesGrid}>
          {courses.map((course, index) => (
            <div key={index} className={styles.courseCard}>
            <Link to={`/coursedetail/${course.courseName}/${course.courseID}`}>
  <img src={course.image} alt={course.title} className={styles.courseImage} />
</Link>
              <div className={styles.category}>{course.categoryName}</div>
              <div style={{display:'flex',justifyContent: 'space-between',flexWrap:'nowrap'}}>
              <div className={styles.detail}>
                  <FaBook className={styles.detailIcon} /> {course.noOfVideos} Lessons
                </div>
                <div className={styles.detail}>
                  <FaUser className={styles.detailIcon} /> Instructor: {course.instructor}
                </div>
              </div>
             
              <Link to={`/coursedetail/${course.courseName}/${course.courseID}`}>
  <h2 className={styles.title}>{course.courseName}</h2>
</Link>
              <div className={styles.detailsContainer}>
               
                <div className={styles.detail}>
                  {/* <FaStar className={styles.detailIcon} />*/} ⭐⭐⭐⭐⭐ ({course.rating} Reviews) 
                </div>
                <div style={{display:'flex',justifyContent: 'space-between',flexWrap:'nowrap'}}>
                <div className={styles.price}>
                  <span className={styles.detailIcon}>₹/Rs</span> {course.price.toFixed(2)}
            </div>
                <div className={styles.detail}>
                  <FaUsers className={styles.detailIcon} /> {course.noOfStudentEnrolled} Students
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default OnlineCourses;
