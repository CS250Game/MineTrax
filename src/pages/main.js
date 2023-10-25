// MainPage.js
import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import styles from "./Home.module.css";
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const MainPage = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' }); 
        // Redirect to the home page after signing out
    };

    useEffect(() => {
        console.log('MainPage component is mounted');
        // Additional logic if needed
    }, []);

    return (
        <div>
            <div className={styles.grayBar}>
                <div className={styles.logoText}>MineTrax</div>
                <Button variant="outline-dark" onClick={handleSignOut}>
                    Sign Out
                </Button>
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
