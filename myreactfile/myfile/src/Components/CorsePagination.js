import React, { useEffect, useState } from 'react';
import styles from './CorsePagination.module.css';
import { FaBook, FaUser, FaUsers } from 'react-icons/fa';
import axios from 'axios';


function CorsePagination() {

  const [courses, setcourses] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await axios.get("https://localhost:7164/api/Home/getAllCourse");
        setcourses(Array.isArray(result.data) ? result.data : []);
        console.log(result.data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages based on filtered results
  const totalPages = Math.max(Math.ceil(filteredCourses.length / itemsPerPage), 1);

  // Ensure current page is within bounds
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const renderPagination = () => {
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <span 
          key={i} 
          className={`${styles.pageNumber} ${currentPage === i ? styles.active : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </span>
      );
    }

    return (
      <div className={styles.pagination}>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {paginationButtons}
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Your Courses</h1>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search courses..." 
        value={searchTerm} 
        onChange={e => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to the first page when searching
        }} 
        className={styles.searchInput} 
      />

      <div className={styles.coursesGrid}>
        {currentCourses.map((course, index) => (
          <div key={index} className={styles.courseCard}>
         <a href={`/coursedetail/${course.courseName}/${course.courseID}`} >  <img src={course.image} alt={course.title} className={styles.courseImage} /></a> 
            <div className={styles.category}>{course.categoryName}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
              <div className={styles.detail}>
                <FaBook className={styles.detailIcon} /> {course.noOfVideos} Lessons
              </div>
              <div className={styles.detail}>
                <FaUser className={styles.detailIcon} /> Instructor: {course.instructor}
              </div>
            </div>
            <a href={`/coursedetail/${course.courseName}/${course.courseID}`} >  <h2 className={styles.title}>{course.courseName}</h2> </a>
            <div className={styles.detailsContainer}>
              <div className={styles.detail}>
                ⭐⭐⭐⭐⭐ ({course.rating} Reviews) 
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
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

      {/* Pagination Buttons */}
      {totalPages > 1 && renderPagination()}
    </div>
  );
}

export default CorsePagination;
