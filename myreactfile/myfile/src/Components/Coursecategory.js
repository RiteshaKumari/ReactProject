import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHeart, faChartLine, faPaintBrush, faLock, faCode, faFlask, faCamera } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Coursecategory.css';

// Helper function to get the icon based on category name
const getIcon = (categoryName) => {
  switch (categoryName) {
    case 'Business':
      return faBriefcase;
    case 'Lifestyle':
      return faHeart;
    case 'Marketing':
      return faChartLine;
    case 'Design':
      return faPaintBrush;
    case 'CyberSecurity':
      return faLock;
    case 'Development':
      return faCode;
    case 'Data Science':
      return faFlask;
    case 'Photoshop':
      return faCamera;
    default:
      return faBriefcase; // Default icon if no match is found
  }
};

const Coursecategory = () => {
  const [Category, setCategory] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await axios.get("https://localhost:7164/api/Home/getCategory");
        setCategory(Array.isArray(result.data) ? result.data : []);
        console.log(result.data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

  return (
    <section className="course-category">
      <h2>Top Categories You Want to Learn</h2>
      <div className="category-container">
        {Category.map((category, index) => (
          <div className="category" key={index}>
            <FontAwesomeIcon icon={getIcon(category.categoryName)} size="2x" className="category-icon" />
            <div>
              <h3>{category.categoryName}</h3>
              <p>{category.courses} Courses</p>
            </div>
          </div>
        ))}
      </div>
      
      <Link to="/courses">
        <button className="find-courses">
          Find Courses →
        </button>
      </Link>
    </section>
  );
};

export default Coursecategory;
