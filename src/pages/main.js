// MainPage.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, FormControl, Button, Form } from 'react-bootstrap'; // Added imports for Form, FormControl, and Button
import styles from "./Home.module.css";
import { useRouter } from 'next/router';
import { signOut, getSession } from 'next-auth/react';
import UserInfo from '~/components/RetrieveInfo.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
var mc_username = 'ScoopTheCoop23';
const MainPage = () => {
  
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [stats, setStats] = useState(null);
  const [selectedWorldID, setSelectedWorldID] = useState(null);
  const [username, setUsername] = useState('ScoopTheCoop23');
  const [userData, setUserData] = useState(null);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUsername(event.target.value);
    console.log('Updated Username:', username);
    
  try {
    const response = await fetch(`/api/userData?username=${username}`);
    if (response.ok) {
      const userData = await response.json();
      setUserData(userData);
      handleDataLoaded(userData);
    } else {
      console.error('Error fetching user data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  };
  

  

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
        <Form inline>
              <FormControl
                type="text"
                placeholder="Search Username"
                className={styles.searchBar}
                value={username}
                onChange={handleInputChange}
              />
              <Button
                variant="outline-dark"
                className={styles.searchButton}
                type = "button"
                onClick={handleSubmit}
              >
              Search
              </Button>
            </Form>
        <Button variant="outline-dark" onClick={handleSignOut} className={styles.signOutButton}>
          Sign Out
        </Button>
      </div>
        
      <div className={styles.lowerBar}>
        {/* Render individual stats in a dropdown */}
        <NavDropdown title="User Stats" id="user-stats-dropdown" style={{ color: '#000000', fontWeight: 'bold' }}>
        <UserInfo onClick={handleDataLoaded}/>
          {/*{stats &&
            stats.map((stat) => (
              <NavDropdown.Item key={stat.stat_id} style={{ color: '#ff0000' }}>
                <div>
                  <p>Stat Name: {stat.stat_name}</p>
                  <p>Stat Value: {stat.stat_val}</p>
                  {/* Add other Stat data here }
                </div>
              </NavDropdown.Item>
            ))}*/}
            {/* Displaying user info */}
          {userData && (
            <NavDropdown.Item key={userData.uuid} style={{ color: '#ff0000' }}>
              <div>
                <p>Username: {userData.username}</p>
                <p>UUID: {userData.uuid}</p>
                {userData.worlds.length > 0 ? (
            <div>
              <h2>Worlds</h2>
              <ul>
                {userData.worlds.map((world) => (
                  <li key={world.world_id}>
                    <p>World Name: {world.world_name}</p>
                    <p>Date Created: {world.date_created}</p>
                    {world.stats.length > 0 ? (
                      <div>
                        <h3>Stats</h3>
                        <ul>
                          {world.stats.map((stat) => (
                            <li key={stat.stat_id}>
                              <p>Stat Name: {stat.stat_name}</p>
                              <p>Stat Value: {stat.stat_val}</p>
                              {/* Add other Stat data here */}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p>No stats found for this world.</p>
                    )}

                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No worlds found for this user.</p>
          )}
                {/* Add other user data here */}
              </div>
            </NavDropdown.Item>
          )}
          {/* Your other dropdown content */}
        </NavDropdown>

      {/* Display individual stats in a dropdown */}
      <NavDropdown title="Stats" id="stats-dropdown" style={{ color: '#000000', fontWeight: 'bold' }}>
        {stats &&
          stats.map((stat) => (
            <NavDropdown.Item key={stat.stat_id} style={{ color: '#ff0000' }}>
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

export const getMCUSER = () => {
  // Return the username
  return mc_username;
};

export default MainPage;
