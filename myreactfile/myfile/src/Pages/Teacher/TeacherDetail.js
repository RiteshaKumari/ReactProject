import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaStar } from 'react-icons/fa';
import { BsPeople } from 'react-icons/bs';
import { FaFacebook, FaTwitter, FaGlobe, FaInstagram } from 'react-icons/fa';
import styles from './TeacherDetail.module.css';
import { useParams , useNavigate} from "react-router-dom";
import axios from 'axios';

function TeacherDetail() {
  const [teacher, setteacher] = useState({});
  const { instructorID } = useParams(); 
  const navigate = useNavigate(); 
  useEffect(() => {

    const loadCategories = async () => {
      try {
        const result = await axios.get(`https://localhost:7164/api/Home/GetTeacherDetail/${instructorID}`);
        setteacher(Array.isArray(result.data) ? result.data[0] : result.data);
        console.log(result.data);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          navigate('/pagenotfound');
         
        } else {
          navigate('/pagenotfound');
        }
        console.error("Failed to load categories:", err);
      }
    };
    loadCategories();
  }, [instructorID, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img src={teacher?.instructorImage} alt="Teacher" className={styles.image} />
        <div className={styles.reviewInfo}>
          <div className={styles.reviewItem}>
            <FaStar className={styles.icon} />
            <span>{teacher?.rating} Reviews</span>
          </div>
          <div className={styles.reviewItem}>
            <BsPeople className={styles.icon} />
            <span>{teacher?.students} Students</span>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <h2 className={styles.name}>{teacher?.instructorName}</h2>
        <h3 className={styles.position}>{teacher?.categoryName}</h3>
        <p className={styles.description}>
          Our teachers are not just instructors; they are mentors, innovators, and lifelong learners dedicated to shaping the future. With expertise spanning across disciplines, they bring real-world experience, in-depth knowledge, and a passion for teaching to every class. Each teacher is committed to helping students reach their highest potential, providing guidance, support, and inspiration every step of the way.
        </p>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <FaPhoneAlt className={styles.contactIcon} />
            <div>
              <span className={styles.contactLabel}>24 / 7 Support : </span>
              <span className={styles.contactText}>{teacher?.instructorMobile}</span>
            </div>
          </div>
          <div className={styles.contactItem}>
            <FaEnvelope className={styles.contactIcon} />
            <div>
              <span className={styles.contactLabel}>Send Message : &nbsp;</span>
              <span className={styles.contactText}>{teacher?.instructorEmail}</span>
            </div>
          </div>
        </div>
        <div className={styles.socialIcons}>
          <FaFacebook />
          <FaTwitter />
          <FaGlobe />
          <FaInstagram />
        </div>
      </div>
      <div className={styles.about}>
        <h3>About Me</h3>
        <p>
          {teacher?.teacherDetail
            ? teacher.teacherDetail
                .split('.')
                .filter(sentence => sentence.trim()) // Remove any empty entries
                .map((sentence, index) => (
                  <span key={index}>
                    {sentence.trim()}
                    {index < teacher.teacherDetail.split('.').length - 1 && '.'}{' '}
                  </span>
                ))
            : 'No details available.' // Fallback content if teacherDetail is undefined or empty
          }
        </p>
      </div>
    </div>
  );
}

export default TeacherDetail;
