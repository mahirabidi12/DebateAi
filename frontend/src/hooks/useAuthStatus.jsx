import { useState, useEffect } from 'react';

// A simple hook to check for the presence of the auth token cookie.
// Note: This does not validate the token, it only checks if it exists for UI purposes.
export const useAuthStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = document.cookie.split(';').some((item) => item.trim().startsWith('token='));
            setIsLoggedIn(token);
        };
        checkAuth();
        // Optional: you could add an interval here to re-check if needed,
        // but for now, checking on component mount is sufficient.
    }, []);

    return isLoggedIn;
};
