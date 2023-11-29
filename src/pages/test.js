import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import styles from "./Home.module.css";
import UserInfo from '~/components/RetrieveInfo.js';

const TestPage = () => {
  const [stats, setStats] = useState(null);

  const handleDataLoaded = (userData) => {
    // Extract and set the stats from user data
    const userStats = userData?.worlds[0]?.stats || [];
    setStats(userStats);
  };

  return (
    <div className={`${styles["bg-image2"]} ${styles["your-other-styles"]}`}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '0 20px', color: 'white' }}>
        <h1 style={{ fontSize: '20px', color: 'red', fontWeight: 'bold' }}>TESTING STAT DISPLAY</h1>
        <UserInfo onDataLoaded={handleDataLoaded} />

        {/* Render individual stats in a dropdown */}
        <NavDropdown title="User Stats" id="user-stats-dropdown" style={{ color: '#000000', fontWeight: 'bold' }}>
          {stats &&
            stats.map((stat) => (
              <NavDropdown.Item key={stat.stat_ID} style={{ color: '#ff0000' }}>
                <div>
                  <p>Stat Name: {stat.stat_name}</p>
                  <p>Stat Value: {stat.stat_val}</p>
                  {/* Add other Stat data here */}
                </div>
              </NavDropdown.Item>
            ))}
        </NavDropdown>
      </div>
    </div>
  );
};

export default TestPage;
