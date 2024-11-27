import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faStar, faAward } from '@fortawesome/free-solid-svg-icons';
import styles from './Strip.module.css';

const Strip = () => {
  const features = [
    {
      icon: faChalkboardTeacher,
      title: 'Educator Support',
      description: 'Excedteur sint occaecat cupidatat non the proident sunt in culpa',
    },
    {
      icon: faStar,
      title: 'Top Instructor',
      description: 'Excedteur sint occaecat cupidatat non the proident sunt in culpa',
    },
    {
      icon: faAward,
      title: 'Award Winning',
      description: 'Excedteur sint occaecat cupidatat non the proident sunt in culpa',
    },
  ];

  return (
    <div className={styles.stripContainer}>
      {features.map((feature, index) => (
        <div className={styles.featureCard} key={index}>
          <FontAwesomeIcon icon={feature.icon} size="3x" className={styles.icon} />
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Strip;
