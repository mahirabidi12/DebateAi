import { useState, useEffect } from 'react';

// This hook checks for the presence of the auth token cookie.
// It's used for quickly updating the UI without needing to validate the token.
export const useAuthStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            // Check if a cookie with the key 'token' exists and is not empty
            const token = document.cookie.split(';').some((item) => item.trim().startsWith('token=') && item.split('=')[1].length > 0);
            setIsLoggedIn(token);
        };
        
        checkAuth();

        // Re-check periodically in case of token expiration or changes in other tabs
        const interval = setInterval(checkAuth, 5000); 

        return () => clearInterval(interval);
    }, []);

    return isLoggedIn;
};

