import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Signup.module.css';
import axios from 'axios';

function Signup() {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      agreeToTerms: false, // For the checkbox
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required.')
        .max(50, 'Username cannot exceed 50 characters.'),
      email: Yup.string()
        .required('Email is required.')
        .email('Invalid email address.'),
      password: Yup.string()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters long.'),
      agreeToTerms: Yup.boolean()
        .oneOf([true], 'You must accept the Terms and Conditions.'),
    }),
    onSubmit: async (values,{resetForm}) => {
      try {
        // Simulate an API call
        await axios.post('https://localhost:7164/api/Home/saveAdminDetail',  {
          name: values.username,
          email: values.email,
          password: values.password,
        });
        alert('Registration successful!');
        resetForm();
        // Here you can redirect the user or perform other actions
      } catch (error) {
        console.error('Error during signup:', error);
        alert('Error during signup: ' + error.message);
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Sign Up</h2>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className={styles.error}>{formik.errors.username}</div>
            ) : null}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.error}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.error}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className={styles.options}>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formik.values.agreeToTerms}
                onChange={formik.handleChange}
              />
              <span className={styles.checkmark}></span>
              I agree to the <Link to="/terms" className={styles.termsLink}>Terms and Conditions</Link>
            </label>
            {formik.touched.agreeToTerms && formik.errors.agreeToTerms ? (
              <div className={styles.error}>{formik.errors.agreeToTerms}</div>
            ) : null}
          </div>
          <button type="submit" className={styles.button}>Sign Up</button>
          <p className={styles.loginText}>
            Already have an account? <Link to="/signin" className={styles.loginLink}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
