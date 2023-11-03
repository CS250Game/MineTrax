// MainPage.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import styles from "./Home.module.css";
import { useRouter } from 'next/router';
import { signOut, getSession } from 'next-auth/react';

const MainPage = () => {
const router = useRouter();
const [session, setSession] = useState(null);


const handleSignOut = async () => {
    await signOut({callbackUrl:'/'}); 
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
            {/* Add your dropdown menus or other content here */}
            <NavDropdown title="DropDown" id="basic-nav-dropdown" style= {{color: '#fefefe', fontWeight: 'bold'}}>
                <NavDropdown.Item style={{ color: '#ff0000' }}>Action</NavDropdown.Item>
                {/* Add more dropdown items */}
            </NavDropdown>
            <NavDropdown title="DropDown" id="basic-nav-dropdown" style= {{color: '#bebebe', fontWeight: 'bold'}}>
            <NavDropdown.Item style={{ color: '#ff0000' }}>Action</NavDropdown.Item>

                {/* Dropdown items with inline style */}
            </NavDropdown>
            <NavDropdown title="DropDown" id="basic-nav-dropdown" style= {{color: '#000000', fontWeight: 'bold'}}>
            <NavDropdown.Item style={{ color: '#ff0000' }}>Action</NavDropdown.Item>
                {/* Dropdown items with inline style */}
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