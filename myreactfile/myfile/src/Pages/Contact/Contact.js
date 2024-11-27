import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Contact.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import axios from 'axios';

function Contact() {

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      msg: '',
      privacyPolicy: false, 
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Full name is required.')
        .max(100, 'Name cannot exceed 100 characters.'),
      email: Yup.string()
        .required('Email is required.')
        .email('Invalid email address.'),
      msg: Yup.string()
        .required('Message is required.')
        .max(500, 'Message cannot exceed 500 characters.'),
      privacyPolicy: Yup.boolean()
        .oneOf([true], 'You must accept the Privacy Policy.'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("https://localhost:7164/api/Home/SaveMsg", {
          name: values.name,
          email: values.email,
          msg: values.msg,
        });
        alert("User message sent successfully!");
        resetForm(); // Reset form values after submission
      } catch (err) {
        console.error("Error while saving:", err);
        const errorMessage = err.response?.data?.message || "An error occurred while saving your message.";
        alert("Error while saving: " + errorMessage);
      }
    },
  });

  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.h2}>Contact With Us</h2>
      <div className={styles.contactDetails}>
        <div className={styles.contactCard}>
          <div className={styles.iconBackground}>
            <i className="fas fa-phone-alt"></i>
          </div>
          <p>+64 939-39-0239</p>
        </div>
        <div className={styles.contactCard}>
          <div className={styles.iconBackground}>
            <i className="fas fa-envelope"></i>
          </div>
          <p>helloeduna@gmail.com</p>
        </div>
        <div className={styles.contactCard}>
          <div className={styles.iconBackground}>
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <p>1234 East 27th Street,<br/>New York, NY 101010</p>
        </div>
      </div>
      <div className={styles.contactFormSection}>
        <img src="images/girl1.png" alt="Person with book and coffee" className={styles.contactImage} />
        <div className={styles.contactForm}>
          <h3 className={styles.h2}>Have questions?</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Full name"
                className={styles.formInput}
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className={styles.error}>{formik.errors.name}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.formInput}
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error}>{formik.errors.email}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <textarea
                placeholder="How can we help you? Feel free to get in touch!"
                className={styles.formInput}
                name="msg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.msg}
              />
              {formik.touched.msg && formik.errors.msg && (
                <div className={styles.error}>{formik.errors.msg}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <input
                type="checkbox"
                id="privacyPolicy"
                name="privacyPolicy"
                checked={formik.values.privacyPolicy}
                onChange={formik.handleChange}
              />
              <label htmlFor="privacyPolicy"> I agree to the Privacy Policy.</label>
              {formik.touched.privacyPolicy && formik.errors.privacyPolicy && (
                <div className={styles.error}>{formik.errors.privacyPolicy}</div>
              )}
            </div>
            <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
