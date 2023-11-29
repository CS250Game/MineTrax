// MainPage.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import styles from "./Home.module.css";
import { useRouter } from 'next/router';
import { signOut, getSession } from 'next-auth/react';
import UserInfo from '~/components/RetrieveInfo.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const MainPage = () => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [stats, setStats] = useState(null);
  const [selectedWorldID, setSelectedWorldID] = useState(null);

  const handleDataLoaded = (userData) => {
    // Extract and set the stats from user data
    const userStats = userData?.worlds[0]?.stats || [];
    setStats(userStats);

    // Set the selected world's ID
    const worldID = userData?.worlds[0]?.world_ID || null;
    setSelectedWorldID(worldID);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    // Redirect to the home page after signing out
    router.push('/');
  };

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  return (
    <div>
      <div className={styles.grayBar}>
        <div className={styles.logoText}>MineTrax</div>
        <img src="/MineTraxBackground.png" alt="Left Logo" className={styles.logo} />
        {session?.user && (
          <div className={styles.welcomeText}>
            Welcome, {session.user.name}
          </div>
        )}
        <Button variant="outline-dark" onClick={handleSignOut} className={styles.signOutButton}>
          Sign Out
        </Button>
      </div>
        
      <div className={styles.lowerBar}>
        {/* Render individual stats in a dropdown */}
        <NavDropdown title="User Stats" id="user-stats-dropdown" style={{ color: '#000000', fontWeight: 'bold' }}>
        <UserInfo onDataLoaded={handleDataLoaded} />
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

      {/* Display individual stats in a dropdown */}
      <NavDropdown title="Stats" id="stats-dropdown" style={{ color: '#000000', fontWeight: 'bold' }}>
        {stats &&
          stats.map((stat) => (
            <NavDropdown.Item key={stat.stat_ID} style={{ color: '#ff0000' }}>
              <div>
                {stat.stat_name}: {stat.stat_val}
              </div>
            </NavDropdown.Item>
          ))}
      </NavDropdown>

      {/* Display selected world's ID in a dropdown */}
      <NavDropdown title="Selected World" id="selected-world-dropdown" style={{ color: '#000000', fontWeight: 'bold' }}>
        <NavDropdown.Item style={{ color: '#ff0000' }}>
          <div>{selectedWorldID}</div>
        </NavDropdown.Item>
      </NavDropdown>
      </div>
      <Navbar bg="light" expand="lg">
        {/* Your Navbar content here */}
      </Navbar>
      {/* The rest of your content */}
      <div>
        {/* Additional content */}
      </div>
    </div>
  );
};

export default MainPage;
