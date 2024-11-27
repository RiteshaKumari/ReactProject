import React from 'react';
import { FaChalkboardTeacher, FaLaptop, FaBook, FaInfinity } from 'react-icons/fa'; // Importing icons
import styles from './Afterhero.module.css'; // Import the CSS module
import { Link } from 'react-router-dom';

function Afterhero() {
  return (
    <div className={styles['hero-section']}>
      <div className={styles['content-wrapper']}>
        <div className={styles['image-section']}>
          <img style={{height: '500px'}}
            src="images/HeroImg.png" // Replace with actual image path
            alt="Enrolled Learner"
            className={styles['hero-image']}
          />
          <div className={styles['enrollment-badge']}>
            <span>9394+</span>
            <p>Enrolled Learners</p>
          </div>
        </div>
        <div className={styles['text-section']}>
          <h2 style={{textAlign:'left'}}>WELCOME TO ONLINECOURSES</h2>
          <h1>Digital Online Academy: Your Path to Creative Excellence</h1>
          <p>
            Explore more and enjoy the process to sucess. Explore more and enjoy the process to sucess.
          </p>
          <ul className={styles['features-list']}>
            <li><FaChalkboardTeacher className={styles['icon']} /> Our Expert Trainers</li>
            <li><FaLaptop className={styles['icon']} /> Online Remote Learning</li>
            <li><FaBook className={styles['icon']} /> Easy to follow curriculum</li>
            <li><FaInfinity className={styles['icon']} /> Lifetime Access</li>
          </ul>
          <Link to="/courses">
            <button className={styles['find-courses-btn']}>
                Find Courses →
            </button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default Afterhero;
