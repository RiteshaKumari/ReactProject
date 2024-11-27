import React, { useEffect, useState }from 'react';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';
import styles from '.././../Components/CorsePagination.module.css';

function Teacher() {

  const [teacher, setteacher] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await axios.get("https://localhost:7164/api/Home/GetAllTeacher");
        setteacher(Array.isArray(result.data) ? result.data : []);
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

  // Filter teacher based on search term
  const filteredteacher = teacher.filter(teacher =>
    teacher.instructorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages based on filtered results
  const totalPages = Math.max(Math.ceil(filteredteacher.length / itemsPerPage), 1);

  // Ensure current page is within bounds
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentteacher = filteredteacher.slice(startIndex, endIndex);

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
      <h1 className={styles.header}>Your Teachers</h1>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search name..." 
        value={searchTerm} 
        onChange={e => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to the first page when searching
        }} 
        className={styles.searchInput} 
      />

      <div className={styles.coursesGrid}>
        {currentteacher.map((course, index) => (
          <div key={index} className={styles.courseCard}>
         <a href={`/teacherdetail/${course.instructorID}`} >  <img src={course.instructorImage} alt={course.title} className={styles.courseImage} /></a> 
            <div className={styles.category}>{course.categoryName}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
            <div className={styles.detail}>
              {Array.from({ length: course.rating }, (_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
              <div className={styles.detail}>
                  <FaUsers className={styles.detailIcon} /> {course.students} Students
                </div>
            </div>
            <a href={`/teacherdetail/${course.instructorID}`} >  <h2 className={styles.title}>{course.instructorName}</h2> </a>
          
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && renderPagination()}
    </div>
  );
}

export default Teacher
