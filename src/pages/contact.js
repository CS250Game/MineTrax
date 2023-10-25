// pages/contact.js
import React from 'react';
import styles from "./Home.module.css";
import { useRouter } from 'next/router';
const ContactPage = () => {
  const largerFontSize = '50px';
  const smallerFontSize = '30px';
  const emailColor = 'green';
  const mainEmailColor = 'red';
  const ContactUsColor = 'blue';
  const router = useRouter(); 
  const handleReturnToLogin = () => {
    router.push('/');
  };
  return (
    <div className={`${styles["bg-image2"]} ${styles["your-other-styles"]}`}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '0 20px', color: 'white' }}>
        <h1 style={{ fontSize: largerFontSize, color: ContactUsColor, fontWeight: 'bold' }}>Contact Us</h1>
        <p style={{ textAlign: 'center', fontSize: largerFontSize }}>
          <span style={{ fontSize: smallerFontSize, color: mainEmailColor }}>MineTrax1234@gmail.com</span>
          <div>
            <h1 style={{ fontSize: smallerFontSize }}>Meet The Team</h1>
          </div>
          <span style={{ fontSize: smallerFontSize, color: emailColor }}>kaden: kaden.stone@snhu.edu</span>
          <div>
            <span style={{ fontSize: smallerFontSize, color: emailColor }}>Avery: avery.bertrand@snhu.edu</span>
          </div>
          <span style={{ fontSize: smallerFontSize, color: emailColor }}>Cooper: cooper.brien@snhu.edu</span>
          <div>
            <span style={{ fontSize: smallerFontSize, color: emailColor }}>Gregory: gregorybell3@snhu.edu</span>
            <div>
              <span style={{ fontSize: smallerFontSize, color: emailColor }}>Andrew: andreww.wall2@snhu.edu</span>
            </div>
          </div>
        </p>
        <button
          onClick={handleReturnToLogin}
          style={{ marginTop: '20px', padding: '10px 20px', border: '1px solid white', borderRadius: '5px', cursor: 'pointer', background: 'none', color: 'white', textDecoration: 'underline' }}
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
