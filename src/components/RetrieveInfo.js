
import React, { useState, useEffect } from 'react';

const UserInfo = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the API endpoint
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/userData'); // The API endpoint URL
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
    <div>
      {userData ? (
        <div>
          <h1>User Data</h1>
          <p>UUID: {userData.UUID}</p>
          <p>Username: {userData.username}</p>
          {userData.worlds.length > 0 ? (
            <div>
              <h2>Worlds</h2>
              <ul>
                {userData.worlds.map((world) => (
                  <li key={world.world_ID}>
                    <p>World Name: {world.world_name}</p>
                    <p>Date Created: {world.date_created}</p>
                    {world.stats.length > 0 ? (
                      <div>
                        <h3>Stats</h3>
                        <ul>
                          {world.stats.map((stat) => (
                            <li key={stat.stat_ID}>
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
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserInfo;
