// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const DashboardHeader = () => {
//     const navigate = useNavigate();
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     const handleLogout = () => {
//         console.log("User logged out");
//         navigate('/');
//     };

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     return (
//         <header className="sticky top-0 z-50 w-full p-4 backdrop-blur-sm bg-black/50 border-b border-gray-900">
//             <div className="flex justify-between items-center w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <Link to="/" className="flex items-center space-x-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
//                     <h1 className="text-xl font-bold tracking-wider">DebateAi</h1>
//                 </Link>
//                 <nav className="hidden md:flex items-center space-x-6 text-sm">
//                     <Link to="/dashboard" className="text-white font-semibold transition-colors">Dashboard</Link>
//                     <Link to="/analytics" className="text-gray-400 hover:text-white transition-colors">Analytics</Link>
//                 </nav>
//                 <div className="relative" ref={dropdownRef}>
//                     <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center font-bold text-sm text-gray-300 border-2 border-gray-700 hover:border-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-gray-600">
//                         U
//                     </button>
//                     {dropdownOpen && (
//                         <div className="absolute right-0 mt-2 w-48 bg-[#0A0A0A] border border-gray-800 rounded-md shadow-lg py-1 z-50 animate-fade-in-up" style={{ animationDuration: '200ms' }}>
//                             <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
//                                 <svg className="w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
//                                 Profile
//                             </Link>
//                              <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-red-900/50 hover:text-red-400 transition-colors">
//                                 <svg className="w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
//                                 Logout
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default DashboardHeader;


// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';

// const DashboardHeader = () => {
//     const navigate = useNavigate();
//     const location = useLocation(); // Hook to get the current page location
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     const handleLogout = () => {
//         // In a real app, you would also make an API call to invalidate the session/token
//         console.log("User logged out");
//         navigate('/');
//     };

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     const getLinkClass = (path) => {
//         return location.pathname.startsWith(path) 
//             ? 'text-white font-semibold' 
//             : 'text-gray-400 hover:text-white';
//     };

//     return (
//         <header className="sticky top-0 z-50 w-full p-4 backdrop-blur-sm bg-black/50 border-b border-gray-900">
//             <div className="flex justify-between items-center w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <Link to="/dashboard" className="flex items-center space-x-2">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
//                     <h1 className="text-xl font-bold tracking-wider">DebateAi</h1>
//                 </Link>
//                 <nav className="hidden md:flex items-center space-x-6 text-sm transition-colors">
//                     <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
//                     <Link to="/analytics" className={getLinkClass('/analytics')}>Analytics</Link>
//                 </nav>
//                 <div className="relative" ref={dropdownRef}>
//                     <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center font-bold text-sm text-gray-300 border-2 border-gray-700 hover:border-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-gray-600">
//                         U
//                     </button>
//                     {dropdownOpen && (
//                         <div className="absolute right-0 mt-2 w-48 bg-[#0A0A0A] border border-gray-800 rounded-md shadow-lg py-1 z-50 animate-fade-in-up" style={{ animationDuration: '200ms' }}>
//                             <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
//                                 <svg className="w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
//                                 Profile
//                             </Link>
//                              <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-900/50 transition-colors">
//                                 <svg className="w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
//                                 Logout
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default DashboardHeader;



import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const DashboardHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        console.log("User logged out");
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    const getLinkClass = (path) => {
        return location.pathname.startsWith(path) 
            ? 'text-white font-semibold' 
            : 'text-gray-400 hover:text-white';
    };

    return (
        <header className="sticky top-0 z-50 w-full p-4 backdrop-blur-sm bg-black/50 border-b border-gray-900">
            <div className="flex justify-between items-center w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/dashboard" className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    <h1 className="text-xl font-bold tracking-wider">DebateAi</h1>
                </Link>
                <nav className="hidden md:flex items-center space-x-6 text-sm transition-colors">
                    <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
                    <Link to="/analytics" className={getLinkClass('/analytics')}>Analytics</Link>
                </nav>
                <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center font-bold text-sm text-gray-300 border-2 border-gray-700 hover:border-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-gray-600">
                        U
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#0A0A0A] border border-gray-800 rounded-md shadow-lg py-1 z-50 animate-fade-in-up" style={{ animationDuration: '200ms' }}>
                            <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
                                <svg className="w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                Profile
                            </Link>
                             <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-900/50 transition-colors">
                                <svg className="w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;

