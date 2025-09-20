import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const AuthPage = ({ setPage, initialState }) => {
    const [isLoginView, setIsLoginView] = useState(initialState === 'login');
    const [containerClass, setContainerClass] = useState('fade-in');

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
                    <LoginForm toggleView={toggleView} setPage={setPage}/>
                ) : (
                    <SignupForm toggleView={toggleView} setPage={setPage}/>
                )}
            </main>
        </div>
    );
};
