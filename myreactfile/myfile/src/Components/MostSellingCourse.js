import styles from './MostSellingCourse.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUsers} from 'react-icons/fa';

function MostSellingCourse() {
  const [course, setcourses] = useState([]);

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
      <h2 className={styles.title}>Our Best Selling Courses</h2>
      <div className={styles.courseList}>
        {course.map((course, index) => (
        <div key={index}  className={styles.courseCard}>
          <Link to={`/coursedetail/${course.courseName}/${course.courseID}`}>
              <img src={course.image} alt={course.title} className={styles.courseImage} />
         </Link>
          <span className={styles.courseTag}>{course.categoryName}</span>
          <div className={styles.courseInfo}>
          <Link to={`/coursedetail/${course.courseName}/${course.courseID}`}>  <h3 className={styles.courseTitle}>{course.courseName}</h3></Link>
            <p className={styles.courseDetails}>{course.noOfVideos} Lessons ( By: {course.instructor})</p>
            <p className={styles.courseReviews}>★★★★★ ({course.rating} Reviews)</p>
            <div style={{display:'flex',justifyContent:'space-between',alignItems: 'center'}}>
            <p className={styles.coursePrice}>Rs.{course.price}</p>
            <p className={styles.courseStudents}><FaUsers/> {course.noOfStudentEnrolled}Students</p>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default MostSellingCourse;
