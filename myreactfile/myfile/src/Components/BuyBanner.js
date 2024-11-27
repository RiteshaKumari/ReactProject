import React from 'react';
import styles from './BuyBanner.module.css';

function BuyBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.textSection}>
          <h2>Get Started Now</h2>
          <h1>Affordable Online Courses & Learning Opportunities</h1>
          <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit. Excepteur sint occaecat.</p>
          <button className={styles.startButton}>Start Learning Today</button>
        </div>
        <div className={styles.imageSection}>
          <img src="images/girl2.png" alt="Person promoting online courses" style={{height:'313px'}}/>
        </div>
      </div>
    </div>
  );
}

export default BuyBanner;
