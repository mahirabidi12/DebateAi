// // import React, { useState, useEffect, useRef } from 'react';
// // import { Link } from 'react-router-dom';
// // import AnimateOnScroll from '../components/ui/AnimateOnScroll.jsx';
// // import DashboardHeader from '../components/layouts/DashboardHeader.jsx';
// // import DashboardFooter from '../components/layouts/DashboardFooter.jsx';
// // import AnimatedText from '../components/ui/AnimatedText.jsx'; // Using the typing animation

// // // A reusable card component for the dashboard widgets, now with a darker theme
// // const DashboardCard = ({ children, className = '', isGlow = false }) => (
// //     <div className={`group bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 transition-all duration-300 hover:border-gray-800 hover:bg-[#111] hover:shadow-2xl hover:shadow-black transform hover:-translate-y-1 ${className} ${isGlow ? 'relative overflow-hidden' : ''}`}>
// //         {isGlow && <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_180deg_at_50%_50%,#111_0deg,#333_90deg,#111_180deg,#333_270deg,#111_360deg)] animate-spin-slow opacity-10 group-hover:opacity-20 transition-opacity"></div>}
// //         <div className="relative z-10 h-full flex flex-col">
// //             {children}
// //         </div>
// //     </div>
// // );

// // // Animated number for stats - now monochrome
// // const AnimatedStat = ({ value, label, suffix = '' }) => {
// //     const [currentValue, setCurrentValue] = useState(0);
// //     const ref = useRef(null);

// //     useEffect(() => {
// //         const observer = new IntersectionObserver(([entry]) => {
// //             if (entry.isIntersecting) {
// //                 let start = 0;
// //                 const end = value;
// //                 if (start === end) {
// //                     setCurrentValue(end);
// //                     return;
// //                 };
// //                 let duration = 1500;
// //                 let startTime = null;

// //                 const animate = (currentTime) => {
// //                     if (!startTime) startTime = currentTime;
// //                     const progress = Math.min((currentTime - startTime) / duration, 1);
// //                     const nextValue = parseFloat((progress * (end - start) + start).toFixed(1));
// //                     setCurrentValue(nextValue);
// //                     if (progress < 1) {
// //                         requestAnimationFrame(animate);
// //                     }
// //                 };
// //                 requestAnimationFrame(animate);
// //                 observer.unobserve(ref.current);
// //             }
// //         }, { threshold: 0.5 });
// //         if (ref.current) observer.observe(ref.current);
// //         return () => ref.current && observer.unobserve(ref.current);
// //     }, [value]);

// //     return (
// //         <div ref={ref} className="flex justify-between items-center text-sm">
// //             <span className="text-gray-400">{label}:</span>
// //             <span className={`font-bold text-lg text-gray-100`}>{currentValue}{suffix}</span>
// //         </div>
// //     );
// // };


// // // Simple SVG line chart with a monochrome gradient
// // const ProgressChart = () => (
// //     <svg className="w-full h-20" viewBox="0 0 100 40" preserveAspectRatio="none">
// //         <path d="M 0 30 C 10 10, 20 10, 30 20 S 40 30, 50 25 S 60 20, 70 15 S 80 10, 90 20 S 100 30, 100 30" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round"/>
// //         <defs>
// //             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
// //                 <stop offset="0%" stopColor="#6b7280" stopOpacity="0" />
// //                 <stop offset="100%" stopColor="#d1d5db" stopOpacity="1" />
// //             </linearGradient>
// //         </defs>
// //     </svg>
// // );


// // // Icon components for visual flair
// // const ChartBarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 12h4v4H7z"/><path d="M12 8h4v8h-4z"/><path d="M17 4h4v12h-4z"/></svg> );
// // const HistoryIcon = () => ( <svg className="w-4 h-4 mr-3 text-gray-600 group-hover:text-gray-300 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg> );
// // const BoltIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> );


// // const DashboardPage = () => {
// //     // Mock data for previous debates
// //     const previousDebates = [ "The Ethics of Artificial Intelligence", "Climate Change: A Hoax or a Global Crisis?", "Capitalism vs. Socialism: Which is Superior?", "The Role of Government in a Free Society", "Universal Basic Income: A Viable Solution?", "Space Exploration: A Worthy Investment?", "The Future of Work in an Automated World", "Privacy in the Digital Age", ];

// //     return (
// //         <div className="bg-black text-white min-h-screen flex flex-col font-sans">
// //             <DashboardHeader />
            
// //             <div className="flex flex-1 w-full max-w-screen-2xl mx-auto">
// //                 <aside className="w-1/4 max-w-xs border-r border-gray-900 p-4 pt-10 flex-col flex-shrink-0 hidden md:flex">
// //                     <div className="flex-grow overflow-y-auto pr-2 relative [mask-image:linear-gradient(to_bottom,white_90%,transparent_100%)]">
// //                          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Debate History</h2>
// //                          <input type="text" placeholder="Search history..." className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-1.5 text-sm mb-4 focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all"/>
// //                         <ul className="space-y-1">
// //                             {previousDebates.map((debate, index) => (
// //                                 <AnimateOnScroll key={index} stagger={index * 50}>
// //                                     <a href="#" className="group flex items-center text-sm text-gray-400 hover:text-white hover:bg-gray-900 rounded-md py-2 px-2 transition-colors truncate">
// //                                         <HistoryIcon />
// //                                         <span>{debate}</span>
// //                                     </a>
// //                                 </AnimateOnScroll>
// //                             ))}
// //                         </ul>
// //                     </div>
// //                 </aside>

// //                 <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
// //                     <AnimateOnScroll>
// //                         <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight text-gray-100">
// //                             Welcome to your <br className="hidden md:block" /> <AnimatedText text="Intellectual Arena" />
// //                         </h1>
// //                         <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl animate-fade-in-up" style={{ animationDelay: '500ms' }}>
// //                             Your dashboard awaits. What will you conquer today?
// //                         </p>
// //                     </AnimateOnScroll>
                    
// //                     <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
// //                         <AnimateOnScroll stagger={100} className="lg:col-span-3 group">
// //                              <DashboardCard className="!border-gray-800" isGlow={true}>
// //                                 <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
// //                                     <div>
// //                                         <h2 className="text-2xl font-bold text-white mb-2">Start a New Debate</h2>
// //                                         <p className="text-gray-400 mb-6 max-w-sm">Challenge the AI, explore new topics, and sharpen your argumentative skills.</p>
// //                                     </div>
// //                                     <button className="bg-white text-black font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/5 flex-shrink-0">
// //                                         Begin a Debate
// //                                     </button>
// //                                 </div>
// //                             </DashboardCard>
// //                         </AnimateOnScroll>

// //                         <AnimateOnScroll stagger={200} className="lg:col-span-2">
// //                             <DashboardCard className="h-full">
// //                                 <div className="flex items-center text-gray-400 mb-4"><ChartBarIcon /><h2 className="text-xl font-bold text-white ml-3">Performance Analytics</h2></div>
// //                                 <p className="text-sm text-gray-400 mb-4">Track your progress, identify strengths, and pinpoint areas for improvement.</p>
// //                                 <div className="space-y-3 mb-4">
// //                                     <AnimatedStat value={78} label="Win Rate" suffix="%" />
// //                                     <AnimatedStat value={8.2} label="Avg. Clarity" suffix="/10" />
// //                                     <AnimatedStat value={12} label="Fallacies Detected" />
// //                                 </div>
// //                                 <div className="mt-auto">
// //                                   <ProgressChart />
// //                                    <Link to="/analytics" className="block mt-2">
// //                                         <button className="w-full text-sm border border-gray-800 text-gray-300 font-semibold px-4 py-2 rounded-md hover:bg-gray-900 hover:border-gray-700 hover:text-white transition-colors">
// //                                             View Full Report
// //                                         </button>
// //                                     </Link>
// //                                 </div>
// //                             </DashboardCard>
// //                         </AnimateOnScroll>

// //                          <AnimateOnScroll stagger={300}>
// //                              <DashboardCard className="h-full">
// //                                 <div className="flex items-center text-gray-400 mb-4"><BoltIcon /><h2 className="text-xl font-bold text-white ml-3">Quick Actions</h2></div>
// //                                 <div className="flex flex-col space-y-3">
// //                                     <button className="w-full text-left text-sm bg-[#111] hover:bg-gray-900 border border-gray-800 text-gray-200 font-medium p-4 rounded-md transition-colors">
// //                                         Explore Topics
// //                                     </button>
// //                                      <button className="w-full flex justify-between items-center text-left text-sm bg-transparent border border-gray-800 text-gray-500 font-medium px-4 py-3 rounded-md transition-colors opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-gray-300">
// //                                         <span>Training Ground</span>
// //                                         <span className="text-xs bg-gray-800 text-gray-500 font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
// //                                     </button>
// //                                     <button className="w-full flex justify-between items-center text-left text-sm bg-transparent border border-gray-800 text-gray-500 font-medium px-4 py-3 rounded-md transition-colors opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-gray-300">
// //                                         <span>Challenge a Friend</span>
// //                                         <span className="text-xs bg-gray-800 text-gray-500 font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
// //                                     </button>
// //                                     <button className="w-full flex justify-between items-center text-left text-sm bg-transparent border border-gray-800 text-gray-500 font-medium px-4 py-3 rounded-md transition-colors opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-gray-300">
// //                                         <span>Review Last Debate</span>
// //                                         <span className="text-xs bg-gray-800 text-gray-500 font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
// //                                     </button>
// //                                 </div>
// //                             </DashboardCard>
// //                         </AnimateOnScroll>
// //                     </div>
// //                 </main>
// //             </div>
// //             <DashboardFooter />
// //         </div>
// //     );
// // };

// // export default DashboardPage;


// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import AnimateOnScroll from '../components/ui/AnimateOnScroll.jsx';
// import DashboardHeader from '../components/layouts/DashboardHeader.jsx';
// import DashboardFooter from '../components/layouts/DashboardFooter.jsx';
// import AnimatedText from '../components/ui/AnimatedText.jsx'; // Using the typing animation

// // A reusable card component for the dashboard widgets, now with a darker theme
// const DashboardCard = ({ children, className = '', isGlow = false }) => (
//     <div className={`group bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 transition-all duration-300 hover:border-gray-800 hover:bg-[#111] hover:shadow-2xl hover:shadow-black transform hover:-translate-y-1 ${className} ${isGlow ? 'relative overflow-hidden' : ''}`}>
//         {isGlow && <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_180deg_at_50%_50%,#111_0deg,#333_90deg,#111_180deg,#333_270deg,#111_360deg)] animate-spin-slow opacity-10 group-hover:opacity-20 transition-opacity"></div>}
//         <div className="relative z-10 h-full flex flex-col">
//             {children}
//         </div>
//     </div>
// );

// // Animated number for stats - now monochrome
// const AnimatedStat = ({ value, label, suffix = '' }) => {
//     const [currentValue, setCurrentValue] = useState(0);
//     const ref = useRef(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver(([entry]) => {
//             if (entry.isIntersecting) {
//                 let start = 0;
//                 const end = value;
//                 if (start === end) {
//                     setCurrentValue(end);
//                     return;
//                 };
//                 let duration = 1500;
//                 let startTime = null;

//                 const animate = (currentTime) => {
//                     if (!startTime) startTime = currentTime;
//                     const progress = Math.min((currentTime - startTime) / duration, 1);
//                     const nextValue = parseFloat((progress * (end - start) + start).toFixed(1));
//                     setCurrentValue(nextValue);
//                     if (progress < 1) {
//                         requestAnimationFrame(animate);
//                     }
//                 };
//                 requestAnimationFrame(animate);
//                 observer.unobserve(ref.current);
//             }
//         }, { threshold: 0.5 });
//         if (ref.current) observer.observe(ref.current);
//         return () => ref.current && observer.unobserve(ref.current);
//     }, [value]);

//     return (
//         <div ref={ref} className="flex justify-between items-center text-sm">
//             <span className="text-gray-400">{label}:</span>
//             <span className={`font-bold text-lg text-gray-100`}>{currentValue}{suffix}</span>
//         </div>
//     );
// };


// // Simple SVG line chart with a monochrome gradient
// const ProgressChart = () => (
//     <svg className="w-full h-20" viewBox="0 0 100 40" preserveAspectRatio="none">
//         <path d="M 0 30 C 10 10, 20 10, 30 20 S 40 30, 50 25 S 60 20, 70 15 S 80 10, 90 20 S 100 30, 100 30" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round"/>
//         <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#6b7280" stopOpacity="0" />
//                 <stop offset="100%" stopColor="#d1d5db" stopOpacity="1" />
//             </linearGradient>
//         </defs>
//     </svg>
// );


// // Icon components for visual flair
// const ChartBarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 12h4v4H7z"/><path d="M12 8h4v8h-4z"/><path d="M17 4h4v12h-4z"/></svg> );
// const HistoryIcon = () => ( <svg className="w-4 h-4 mr-3 text-gray-600 group-hover:text-gray-300 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg> );
// const BoltIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> );


// const DashboardPage = () => {
//     // Mock data for previous debates
//     const previousDebates = [ "The Ethics of Artificial Intelligence", "Climate Change: A Hoax or a Global Crisis?", "Capitalism vs. Socialism: Which is Superior?", "The Role of Government in a Free Society", "Universal Basic Income: A Viable Solution?", "Space Exploration: A Worthy Investment?", "The Future of Work in an Automated World", "Privacy in the Digital Age", ];

//     return (
//         <div className="bg-black text-white min-h-screen flex flex-col font-sans">
//             <DashboardHeader />
            
//             <div className="flex flex-1 w-full max-w-screen-2xl mx-auto">
//                 <aside className="w-1/4 max-w-xs border-r border-gray-900 p-4 pt-10 flex-col flex-shrink-0 hidden md:flex">
//                     <div className="flex-grow overflow-y-auto pr-2 relative [mask-image:linear-gradient(to_bottom,white_90%,transparent_100%)]">
//                          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Debate History</h2>
//                          <input type="text" placeholder="Search history..." className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-1.5 text-sm mb-4 focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all"/>
//                         <ul className="space-y-1">
//                             {previousDebates.map((debate, index) => (
//                                 <AnimateOnScroll key={index} stagger={index * 50}>
//                                     <a href="#" className="group flex items-center text-sm text-gray-400 hover:text-white hover:bg-gray-900 rounded-md py-2 px-2 transition-colors truncate">
//                                         <HistoryIcon />
//                                         <span>{debate}</span>
//                                     </a>
//                                 </AnimateOnScroll>
//                             ))}
//                         </ul>
//                     </div>
//                 </aside>

//                 <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
//                     <AnimateOnScroll>
//                         <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight text-gray-100">
//                             Welcome to your <br className="hidden md:block" /> <AnimatedText text="Intellectual Arena" />
//                         </h1>
//                         <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl animate-fade-in-up" style={{ animationDelay: '500ms' }}>
//                             Your dashboard awaits. What will you conquer today?
//                         </p>
//                     </AnimateOnScroll>
                    
//                     <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
//                         <AnimateOnScroll stagger={100} className="lg:col-span-3 group">
//                              <DashboardCard className="!border-gray-800" isGlow={true}>
//                                 <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
//                                     <div>
//                                         <h2 className="text-2xl font-bold text-white mb-2">Start a New Debate</h2>
//                                         <p className="text-gray-400 mb-6 max-w-sm">Challenge the AI, explore new topics, and sharpen your argumentative skills.</p>
//                                     </div>
//                                     <button className="bg-white text-black font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/5 flex-shrink-0">
//                                         Begin a Debate
//                                     </button>
//                                 </div>
//                             </DashboardCard>
//                         </AnimateOnScroll>

//                         <AnimateOnScroll stagger={200} className="lg:col-span-2">
//                             <DashboardCard className="h-full">
//                                 <div className="flex items-center text-gray-400 mb-4"><ChartBarIcon /><h2 className="text-xl font-bold text-white ml-3">Performance Analytics</h2></div>
//                                 <p className="text-sm text-gray-400 mb-4">Track your progress, identify strengths, and pinpoint areas for improvement.</p>
//                                 <div className="space-y-3 mb-4">
//                                     <AnimatedStat value={78} label="Win Rate" suffix="%" />
//                                     <AnimatedStat value={8.2} label="Avg. Clarity" suffix="/10" />
//                                     <AnimatedStat value={12} label="Fallacies Detected" />
//                                 </div>
//                                 <div className="mt-auto">
//                                   <ProgressChart />
//                                    <Link to="/analytics" className="block mt-2">
//                                         <button className="w-full text-sm border border-gray-800 text-gray-300 font-semibold px-4 py-2 rounded-md hover:bg-gray-900 hover:border-gray-700 hover:text-white transition-colors">
//                                             View Full Report
//                                         </button>
//                                     </Link>
//                                 </div>
//                             </DashboardCard>
//                         </AnimateOnScroll>

//                          <AnimateOnScroll stagger={300}>
//                              <DashboardCard className="h-full">
//                                 <div className="flex items-center text-gray-400 mb-4"><BoltIcon /><h2 className="text-xl font-bold text-white ml-3">Quick Actions</h2></div>
//                                 <div className="flex flex-col space-y-3">
//                                     <button className="w-full text-left text-sm bg-[#111] hover:bg-gray-900 border border-gray-800 text-gray-200 font-medium p-4 rounded-md transition-colors">
//                                         Explore Topics
//                                     </button>
//                                      <button className="w-full flex justify-between items-center text-left text-sm bg-transparent border border-gray-800 text-gray-500 font-medium px-4 py-3 rounded-md transition-colors opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-gray-300">
//                                         <span>Training Ground</span>
//                                         <span className="text-xs bg-gray-800 text-gray-500 font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
//                                     </button>
//                                     <button className="w-full flex justify-between items-center text-left text-sm bg-transparent border border-gray-800 text-gray-500 font-medium px-4 py-3 rounded-md transition-colors opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-gray-300">
//                                         <span>Challenge a Friend</span>
//                                         <span className="text-xs bg-gray-800 text-gray-500 font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
//                                     </button>
//                                     <button className="w-full flex justify-between items-center text-left text-sm bg-transparent border border-gray-800 text-gray-500 font-medium px-4 py-3 rounded-md transition-colors opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-gray-300">
//                                         <span>Review Last Debate</span>
//                                         <span className="text-xs bg-gray-800 text-gray-500 font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
//                                     </button>
//                                 </div>
//                             </DashboardCard>
//                         </AnimateOnScroll>
//                     </div>
//                 </main>
//             </div>
//             <DashboardFooter />
//         </div>
//     );
// };

// export default DashboardPage;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimateOnScroll from '../components/ui/AnimateOnScroll.jsx';
import DashboardHeader from '../components/layouts/DashboardHeader.jsx';
import DashboardFooter from '../components/layouts/DashboardFooter.jsx';
import AnimatedText from '../components/ui/AnimatedText.jsx'; // Using the typing animation

// A reusable card component for the dashboard widgets, now with a darker theme
const DashboardCard = ({ children, className = '', isGlow = false }) => (
    <div className={`group bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 transition-all duration-300 hover:border-gray-800 hover:bg-[#111] hover:shadow-2xl hover:shadow-black transform hover:-translate-y-1 ${className} ${isGlow ? 'relative overflow-hidden' : ''}`}>
        {isGlow && <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_180deg_at_50%_50%,#111_0deg,#333_90deg,#111_180deg,#333_270deg,#111_360deg)] animate-spin-slow opacity-10 group-hover:opacity-20 transition-opacity"></div>}
        <div className="relative z-10 h-full flex flex-col">
            {children}
        </div>
    </div>
);

// Animated number for stats - now monochrome
const AnimatedStat = ({ value, label, suffix = '' }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let start = 0;
                const end = value;
                if (start === end) {
                    setCurrentValue(end);
                    return;
                };
                let duration = 1500;
                let startTime = null;

                const animate = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    const nextValue = parseFloat((progress * (end - start) + start).toFixed(1));
                    setCurrentValue(nextValue);
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
                observer.unobserve(ref.current);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => ref.current && observer.unobserve(ref.current);
    }, [value]);

    return (
        <div ref={ref} className="flex justify-between items-center text-sm">
            <span className="text-gray-400">{label}:</span>
            <span className={`font-bold text-lg text-gray-100`}>{currentValue}{suffix}</span>
        </div>
    );
};


// Simple SVG line chart with a monochrome gradient
const ProgressChart = () => (
    <svg className="w-full h-20" viewBox="0 0 100 40" preserveAspectRatio="none">
        <path d="M 0 30 C 10 10, 20 10, 30 20 S 40 30, 50 25 S 60 20, 70 15 S 80 10, 90 20 S 100 30, 100 30" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round"/>
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6b7280" stopOpacity="0" />
                <stop offset="100%" stopColor="#d1d5db" stopOpacity="1" />
            </linearGradient>
        </defs>
    </svg>
);


// Icon components for visual flair
const ChartBarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 12h4v4H7z"/><path d="M12 8h4v8h-4z"/><path d="M17 4h4v12h-4z"/></svg> );
const HistoryIcon = () => ( <svg className="w-4 h-4 mr-3 text-gray-600 group-hover:text-gray-300 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg> );
const BoltIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> );


const DashboardPage = () => {
    // Mock data for previous debates
    const previousDebates = [ "The Ethics of Artificial Intelligence", "Climate Change: A Hoax or a Global Crisis?", "Capitalism vs. Socialism: Which is Superior?", "The Role of Government in a Free Society", "Universal Basic Income: A Viable Solution?", "Space Exploration: A Worthy Investment?", "The Future of Work in an Automated World", "Privacy in the Digital Age", ];

    return (
        <div className="bg-black text-white min-h-screen flex flex-col font-sans">
            <DashboardHeader />
            
            <div className="flex flex-1 w-full max-w-screen-2xl mx-auto">
                <aside className="w-1/4 max-w-xs border-r border-gray-900 p-4 pt-10 flex-col flex-shrink-0 hidden md:flex">
                    <div className="flex-grow overflow-y-auto pr-2 relative [mask-image:linear-gradient(to_bottom,white_90%,transparent_100%)]">
                         <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Debate History</h2>
                         <input type="text" placeholder="Search history..." className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-1.5 text-sm mb-4 focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all"/>
                        <ul className="space-y-1">
                            {previousDebates.map((debate, index) => (
                                <AnimateOnScroll key={index} stagger={index * 50}>
                                    <a href="#" className="group flex items-center text-sm text-gray-400 hover:text-white hover:bg-gray-900 rounded-md py-2 px-2 transition-colors truncate">
                                        <HistoryIcon />
                                        <span>{debate}</span>
                                    </a>
                                </AnimateOnScroll>
                            ))}
                        </ul>
                    </div>
                </aside>

                <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
                    <AnimateOnScroll>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight text-gray-100">
                            Welcome to your <br className="hidden md:block" /> <AnimatedText text="Intellectual Arena" />
                        </h1>
                        <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                            Your dashboard awaits. What will you conquer today?
                        </p>
                    </AnimateOnScroll>
                    
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <AnimateOnScroll stagger={100} className="lg:col-span-3 group">
                             <DashboardCard className="!border-gray-800" isGlow={true}>
                                <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">Start a New Debate</h2>
                                        <p className="text-gray-400 mb-6 max-w-sm">Challenge the AI, explore new topics, and sharpen your argumentative skills.</p>
                                    </div>
                                    <button className="bg-white text-black font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/5 flex-shrink-0">
                                        Begin a Debate
                                    </button>
                                </div>
                            </DashboardCard>
                        </AnimateOnScroll>

                        <AnimateOnScroll stagger={200} className="lg:col-span-2">
                            <DashboardCard className="h-full">
                                <div className="flex items-center text-gray-400 mb-4"><ChartBarIcon /><h2 className="text-xl font-bold text-white ml-3">Performance Analytics</h2></div>
                                <p className="text-sm text-gray-400 mb-4">Track your progress, identify strengths, and pinpoint areas for improvement.</p>
                                <div className="space-y-3 mb-4">
                                    <AnimatedStat value={78} label="Win Rate" suffix="%" />
                                    <AnimatedStat value={8.2} label="Avg. Clarity" suffix="/10" />
                                    <AnimatedStat value={12} label="Fallacies Detected" />
                                </div>
                                <div className="mt-auto">
                                  <ProgressChart />
                                   <Link to="/analytics" className="block mt-2">
                                        <button className="w-full text-sm border border-gray-800 text-gray-300 font-semibold px-4 py-2 rounded-md hover:bg-gray-900 hover:border-gray-700 hover:text-white transition-colors">
                                            View Full Report
                                        </button>
                                    </Link>
                                </div>
                            </DashboardCard>
                        </AnimateOnScroll>

                         <AnimateOnScroll stagger={300}>
                             <DashboardCard className="h-full">
                                <div className="flex items-center text-gray-400 mb-4"><BoltIcon /><h2 className="text-xl font-bold text-white ml-3">Quick Actions</h2></div>
                                <div className="flex flex-col space-y-3">
                                    <button className="w-full text-left text-sm bg-[#111] hover:bg-gray-900 border border-gray-800 text-gray-200 font-medium p-4 rounded-md transition-colors">
                                        Explore Topics
                                    </button>
                                     <button className="w-full flex justify-between items-center text-left text-sm bg-transparent border border-gray-800 text-gray-500 font-medium px-4 py-3 rounded-md transition-colors opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-gray-300">
                                        <span>Training Ground</span>
                                        <span className="text-xs bg-gray-800 text-gray-500 font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
                                    </button>
                                    <button className="w-full flex justify-between items-center text-left text-sm bg-transparent border border-gray-800 text-gray-500 font-medium px-4 py-3 rounded-md transition-colors opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-gray-300">
                                        <span>Challenge a Friend</span>
                                        <span className="text-xs bg-gray-800 text-gray-500 font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
                                    </button>
                                    <button className="w-full flex justify-between items-center text-left text-sm bg-transparent border border-gray-800 text-gray-500 font-medium px-4 py-3 rounded-md transition-colors opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-gray-300">
                                        <span>Review Last Debate</span>
                                        <span className="text-xs bg-gray-800 text-gray-500 font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
                                    </button>
                                </div>
                            </DashboardCard>
                        </AnimateOnScroll>
                    </div>
                </main>
            </div>
            <DashboardFooter />
        </div>
    );
};

export default DashboardPage;

