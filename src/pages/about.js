// pages/about.js
import React from 'react';
import styles from "./Home.module.css";

const AboutPage = () => {
  return (
    <div className={`${styles["bg-image2"]} ${styles["your-other-styles"]}`}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '0 20px', color: 'white' }}>
      <h1 style={{ fontSize: '20px', color: 'red', fontWeight: 'bold'  }}>About Us</h1>
        <p style={{ textAlign: 'center' }}>
          This is our first project welcome to MineTrax.
          <div>
            Our names are Avery, Kaden, Gregory, Cooper, and Andrew
          </div>
          We are young developers with a dream to make the best game tracking software in the market.
          <div>
            We all love video games and coding.
          </div>
          We hope that this is useful and fun to use to help people connect on games everyone loves.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
