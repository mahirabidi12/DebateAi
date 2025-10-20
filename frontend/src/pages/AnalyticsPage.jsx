import React from 'react';
import { Link } from 'react-router-dom';

const AnalyticsPage = () => {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center font-sans p-4">
            <div className="text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 mx-auto mb-4"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Analytics Page</h1>
                <p className="mt-4 text-lg text-gray-400">This page is under construction.</p>
                <p className="mt-2 text-gray-500">Come back soon to see detailed insights into your debate performance!</p>
                <Link to="/dashboard">
                    <button className="mt-8 bg-indigo-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-600 transition-colors">
                        Back to Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AnalyticsPage;
