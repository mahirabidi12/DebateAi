import React from 'react';
import { Link } from 'react-router-dom';
import AnimateOnScroll from '../components/ui/AnimateOnScroll.jsx';
import DashboardHeader from '../components/layouts/DashboardHeader.jsx';
import DashboardFooter from '../components/layouts/DashboardFooter.jsx'; // Updated import

// A reusable card component for the dashboard widgets, now in monochrome
const DashboardCard = ({ children, className = '' }) => (
    <div className={`bg-gray-900/50 border border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:border-gray-600 hover:bg-gray-900/70 hover:shadow-2xl hover:shadow-gray-500/5 ${className}`}>
        {children}
    </div>
);

// Icon components for visual flair
const BrainCircuitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5a3 3 0 1 0-5.993.129M12 5a3 3 0 1 0 5.993.129M12 12a3 3 0 1 0-5.993.129M12 12a3 3 0 1 0 5.993.129M12 19a3 3 0 1 0-5.993.129M12 19a3 3 0 1 0 5.993.129M20 12h-4M4 12h4m3-7V2m0 17v3m-4.6-4.6-2.8-2.8m12.8 0-2.8 2.8"/>
    </svg>
);

const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/>
        <path d="M7 12h4v4H7z"/>
        <path d="M12 8h4v8h-4z"/>
        <path d="M17 4h4v12h-4z"/>
    </svg>
);

const HistoryIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
        <path d="M12 7v5l4 2"/>
    </svg>
);

const DashboardPage = () => {
    // Mock data for previous debates
    const previousDebates = [
        "The Ethics of Artificial Intelligence",
        "Climate Change: A Hoax or a Global Crisis?",
        "Capitalism vs. Socialism: Which is Superior?",
        "The Role of Government in a Free Society",
        "Universal Basic Income: A Viable Solution?",
        "Space Exploration: A Worthy Investment?",
        "The Future of Work in an Automated World",
        "Privacy in the Digital Age",
    ];

    return (
        <div className="bg-black text-white min-h-screen flex flex-col font-sans bg-grid">
            <DashboardHeader />
            
            {/* Main Content Area */}
            <div className="flex flex-1 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Left Sidebar for History */}
                <aside className="w-1/4 max-w-xs border-r border-gray-800 p-4 flex-col flex-shrink-0 hidden md:flex">
                    <div className="flex-grow overflow-y-auto pr-2">
                         <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Debate History</h2>
                        <ul className="space-y-1">
                            {previousDebates.map((debate, index) => (
                                <li key={index}>
                                    <a href="#" className="block text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md py-2 px-2 transition-colors truncate">
                                        {debate}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="mt-auto pt-4 border-t border-gray-800">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-sm">U</div>
                            <span className="text-sm font-medium text-gray-300">User Name</span>
                        </div>
                    </div>
                </aside>

                {/* Main Dashboard Content */}
                <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <AnimateOnScroll>
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Dashboard</h1>
                            <p className="mt-2 text-lg text-gray-400">Your intellectual arena awaits. What will you conquer today?</p>
                        </AnimateOnScroll>
                        
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Start Debating Card */}
                            <AnimateOnScroll stagger={100} className="md:col-span-2">
                                 <DashboardCard className="bg-gradient-to-br from-gray-900/80 via-black/50 to-black/50 !border-gray-700/50 flex flex-col items-center justify-center text-center h-full">
                                    <div className="text-gray-400 mb-4"><BrainCircuitIcon /></div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Start a New Debate</h2>
                                    <p className="text-gray-400 mb-6 max-w-sm">Challenge the AI, explore new topics, and sharpen your argumentative skills.</p>
                                    <button className="bg-white text-black font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/5">
                                        Begin a Debate
                                    </button>
                                </DashboardCard>
                            </AnimateOnScroll>

                            {/* Analytics Card */}
                            <AnimateOnScroll stagger={200}>
                                <DashboardCard className="h-full">
                                    <div className="text-gray-400 mb-4"><ChartBarIcon /></div>
                                    <h2 className="text-xl font-bold text-white mb-2">Performance Analytics</h2>
                                    <p className="text-sm text-gray-400 mb-4">Track your progress, identify strengths, and pinpoint areas for improvement.</p>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center"><span className="text-gray-400">Win Rate:</span> <span className="font-bold text-green-400">78%</span></div>
                                        <div className="flex justify-between items-center"><span className="text-gray-400">Avg. Clarity:</span> <span className="font-bold text-blue-400">8.2/10</span></div>
                                        <div className="flex justify-between items-center"><span className="text-gray-400">Fallacies Detected:</span> <span className="font-bold text-yellow-400">12</span></div>
                                    </div>
                                    <Link to="/analytics">
                                        <button className="mt-6 w-full text-sm border border-gray-700 text-gray-300 font-semibold px-4 py-2 rounded-md hover:bg-gray-800 hover:border-gray-600 transition-colors">
                                            View Full Report
                                        </button>
                                    </Link>
                                </DashboardCard>
                            </AnimateOnScroll>

                            {/* Recent Activity Card */}
                             <AnimateOnScroll stagger={300}>
                                 <DashboardCard className="h-full">
                                    <div className="flex items-center mb-4">
                                        <div className="text-gray-400 mr-3"><HistoryIcon /></div>
                                        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                                    </div>
                                    <ul className="space-y-3">
                                        {previousDebates.slice(0, 3).map((debate, index) => (
                                            <li key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-800">
                                                <p className="text-sm text-gray-300 truncate">{debate}</p>
                                                <button className="text-xs text-gray-400 hover:text-white transition-colors ml-4 flex-shrink-0">View</button>
                                            </li>
                                        ))}
                                    </ul>
                                </DashboardCard>
                            </AnimateOnScroll>
                        </div>
                    </div>
                </main>
            </div>
            <DashboardFooter /> {/* Use the new dashboard footer */}
        </div>
    );
};

export default DashboardPage;

