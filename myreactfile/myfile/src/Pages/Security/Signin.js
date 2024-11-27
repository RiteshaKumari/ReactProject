import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Signin.module.css';
import axios from 'axios';

function Signin() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required.')
        .email('Invalid email address.'),
      password: Yup.string()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters long.'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post("https://localhost:7164/api/Home/AdminLogin", {
          email: values.email,
          password: values.password,
        });

        if (response.status === 200) {
          alert("Login successful!");
          resetForm();
          navigate('/AdminPage');
        } else {
          alert("Login failed: Please check your credentials and try again.");
        }
      } catch (err) {
        console.error("Error while logging in:", err);
        const errorMessage = err.response?.data?.message || "An unexpected error occurred. Please try again later.";
        alert(errorMessage);
        resetForm();
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Sign In</h2>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
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

          <button type="submit" className={styles.button}>Sign In</button>
          <p className={styles.signupText}>
            Don't have an account? <Link to="/signup" className={styles.signupLink}>Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
