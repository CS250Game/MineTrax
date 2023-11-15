import React, { useState, useEffect } from 'react';
import styles from "./Home.module.css";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import UserInfo from '~/components/RetrieveInfo.js'

const TestPage = () => {
    return (
      <div className={`${styles["bg-image2"]} ${styles["your-other-styles"]}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '0 20px', color: 'white' }}>
          <h1 style={{ fontSize: '20px', color: 'red', fontWeight: 'bold' }}>TESTING STAT DISPLAY</h1>
          <p style={{ textAlign: 'center' }}>
              <div><UserInfo /></div>
          </p>
        </div>
      </div>
    );

  
};

export default TestPage;