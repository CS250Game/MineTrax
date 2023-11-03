import React, { useState, useEffect } from 'react';
import styles from "./Home.module.css";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const TestPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/userData'); // Replace with your API endpoint
        if (response.ok) {
          const user = await response.json();
          setUserData(user);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={`${styles["bg-image2"]} ${styles["your-other-styles"]}`}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '0 20px', color: 'white' }}>
        <h1 style={{ fontSize: '20px', color: 'red', fontWeight: 'bold' }}>About Us</h1>
        <p style={{ textAlign: 'center' }}>
          {userData ? (
            <>
              <div>UUID: {userData.UUID}</div>
              <div>Our names are</div>
              <div>We are young developers with a dream to make the best game tracking software in the market.</div>
              <div>We all love video games and coding.</div>
              <div>We hope that this is useful and fun to use to help people connect on games everyone loves.</div>
            </>
          ) : (
            <div>Loading user data...</div>
          )}
        </p>
      </div>
    </div>
  );
};

export default TestPage;