// import React from 'react';

// const Header = () => {
//     const handleNavClick = (e) => {
//         e.preventDefault();
//         const targetId = e.currentTarget.getAttribute('href');
//         const targetElement = document.querySelector(targetId);
//         if (targetElement) {
//             targetElement.scrollIntoView({ behavior: 'smooth' });
//         }
//     };

//     return (
//         <header className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-sm bg-black/30">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between items-center">
//                     <div className="flex items-center space-x-2">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
//                         <h1 className="text-xl font-bold tracking-wider">DebateAi</h1>
//                     </div>
//                     <nav className="hidden md:flex items-center space-x-6 text-sm">
//                         <a href="#features" onClick={handleNavClick} className="hover:text-gray-300 transition-colors">Features</a>
//                         <a href="#pricing" onClick={handleNavClick} className="hover:text-gray-300 transition-colors">Pricing</a>
//                         <a href="#faq" onClick={handleNavClick} className="hover:text-gray-300 transition-colors">FAQ</a>
//                         <a href="#community" onClick={handleNavClick} className="hover:text-gray-300 transition-colors">Community</a>
//                     </nav>
//                     <div className="flex items-center space-x-4">
//                         <button className="text-sm font-medium hover:text-gray-300 transition-colors duration-300">Login</button>
//                         <button className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">Get Started</button>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;


import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const handleNavClick = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        // This only works for the landing page.
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-sm bg-black/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                        <h1 className="text-xl font-bold tracking-wider">DebateAi</h1>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 text-sm">
                        <a href="#features" onClick={handleNavClick} className="hover:text-gray-300 transition-colors">Features</a>
                        <a href="#pricing" onClick={handleNavClick} className="hover:text-gray-300 transition-colors">Pricing</a>
                        <a href="#faq" onClick={handleNavClick} className="hover:text-gray-300 transition-colors">FAQ</a>
                        <a href="#community" onClick={handleNavClick} className="hover:text-gray-300 transition-colors">Community</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="text-sm font-medium hover:text-gray-300 transition-colors duration-300">Login</Link>
                        <Link to="/signup" className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">Get Started</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

