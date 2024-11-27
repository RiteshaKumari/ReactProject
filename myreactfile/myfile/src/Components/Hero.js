import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './Hero.module.css'


function UncontrolledExample() {
  return (
    <Carousel interval={1000} indicators={true} controls={true}> {/* Slide every 1 second */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/slider1.jpg"
          height="500px"
          alt="First slide"
        />
        <Carousel.Caption className={styles.blackcaption}>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/slider2.jpg"
          height="500px"
          alt="Second slide"
        />
        <Carousel.Caption className={styles.blackcaption}>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/slider3.jpg"
          height="500px"
          alt="Third slide"
        />
        <Carousel.Caption className={styles.blackcaption}>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
