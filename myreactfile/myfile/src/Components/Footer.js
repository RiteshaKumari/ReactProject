import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaDribbble, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLink } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* Brand and About Section */}
        <div className={styles.footerSection}>
          <h2>Eduna</h2>
          <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.</p>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://dribbble.com" aria-label="Dribbble" target="_blank" rel="noopener noreferrer">
              <FaDribbble />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
        
        {/* Links Section */}
        <div className={styles.footerSection}>
          <h3><FaLink /> Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/courses">Our Courses</Link></li>
            <li><Link to="/pricing">Pricing Plan</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/news">Our News</Link></li>
            <li><Link to="/faq">FAQ's</Link></li>
          </ul>
        </div>
        
        {/* Contact Section */}
        <div className={styles.footerSection}>
          <h3><FaPhone /> Contact</h3>
          <p><FaPhone /> 24/7 Support: +532 321 33 33</p>
          <p><FaEnvelope /> Email: <a href="mailto:riteshak246@gmail.com">ritesha@gmail.com</a></p>
          <p><FaMapMarkerAlt /> Location: 32/Jenin, London</p>
        </div>
        
        {/* Subscription Section */}
        <div className={styles.footerSection}>
          <h3>Subscribe</h3>
          <p>Enter your email address to register for our newsletter subscription</p>
          <form>
            <input type="email" placeholder="Enter email" aria-label="Email address" required />
            <button type="submit">Subscribe Now</button>
          </form>
        </div>
      </div>
      
      {/* Footer Bottom Section */}
      <div className={styles.footerBottom}>
        <p>&copy; 2024 | Developed by Ritesha Kumari. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
