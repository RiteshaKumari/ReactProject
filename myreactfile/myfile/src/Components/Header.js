import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus,faHome, faInfoCircle,faBook,faChalkboardTeacher,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.title}>
          OnlineCourses
        </Link>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <ul className={`${styles.navMenu} ${menuOpen ? styles.active : ''}`} style={{ marginBottom: "0px" }}>
         <li className={styles.navItem}>
        <NavLink to="/" className={styles.navLink} activeclassname={styles.active}>
          <span id='dataIcon'><FontAwesomeIcon icon={faHome} /> Home</span>
        </NavLink>
        </li>
       <li className={styles.navItem}>
        <NavLink to="/about" className={styles.navLink} activeclassname={styles.active}>
          <span id='dataIcon'><FontAwesomeIcon icon={faInfoCircle} /> About</span>
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to="/courses" className={styles.navLink} activeclassname={styles.active}>
        <span id='dataIcon'><FontAwesomeIcon icon={faBook} /> Courses</span>
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to="/chat" className={styles.navLink} activeclassname={styles.active}>
        <span id='dataIcon'><FontAwesomeIcon icon={faBook} /> Chat</span>
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to="/teacher" className={styles.navLink} activeclassname={styles.active}>
        <span id='dataIcon'> <FontAwesomeIcon icon={faChalkboardTeacher} /> Teacher </span>
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to="/contact" className={styles.navLink} activeclassname={styles.active}>
        <span id='dataIcon'> <FontAwesomeIcon icon={faEnvelope} /> Contact </span>
        </NavLink>
      </li>
          <li className={styles.navItem}>
            <NavLink to="/signin" className={styles.navLink} activeclassname={styles.active}>
            <span id='dataIcon'> <FontAwesomeIcon icon={faSignInAlt} />&nbsp;Signin </span>
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/signup" className={styles.navLink} activeclassname={styles.active}>
            <span id='dataIcon'> <FontAwesomeIcon icon={faUserPlus} /> &nbsp;Signup </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
