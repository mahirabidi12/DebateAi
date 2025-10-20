import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
    const navigate = useNavigate();

    // This function will handle the logout logic.
    // For now, it clears the console and navigates to the homepage.
    const handleLogout = () => {
        // In a real app, you would clear tokens from localStorage/cookies here.
        console.log("User logged out");
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 w-full p-4 backdrop-blur-sm bg-black/30 border-b border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                        <h1 className="text-xl font-bold tracking-wider">DebateAi</h1>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 text-sm">
                        <Link to="/dashboard" className="text-white font-semibold transition-colors">Dashboard</Link>
                        <Link to="/analytics" className="text-gray-400 hover:text-white transition-colors">Analytics</Link>
                        <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">Profile</Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button onClick={handleLogout} className="text-sm font-medium bg-gray-800 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;

