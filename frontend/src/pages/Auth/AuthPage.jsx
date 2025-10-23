import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const AuthPage = ({ initialState = 'signup' }) => {
    const location = useLocation();
    const [isLoginView, setIsLoginView] = useState(initialState === 'login' || location.pathname === '/login');
    const [containerClass, setContainerClass] = useState('fade-in');

    useEffect(() => {
        setIsLoginView(location.pathname === '/login');
    }, [location.pathname]);

    const toggleView = () => {
        setContainerClass('');
        setTimeout(() => {
            setIsLoginView(prev => !prev);
            setContainerClass('fade-in');
        }, 150);
    };
    
    return (
        <div className="bg-black text-gray-200 min-h-screen w-full flex items-center justify-center p-4">
            <main id="auth-container-inner" className={`w-full max-w-sm ${containerClass}`}>
                {isLoginView ? (
                    <LoginForm toggleView={toggleView} />
                ) : (
                    <SignupForm toggleView={toggleView} />
                )}
            </main>
        </div>
    );
};
