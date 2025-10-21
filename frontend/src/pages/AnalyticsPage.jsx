// import React from 'react';
// import { Link } from 'react-router-dom';

// const AnalyticsPage = () => {
//     return (
//         <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center font-sans p-4">
//             <div className="text-center">
//                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 mx-auto mb-4"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
//                 <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Analytics Page</h1>
//                 <p className="mt-4 text-lg text-gray-400">This page is under construction.</p>
//                 <p className="mt-2 text-gray-500">Come back soon to see detailed insights into your debate performance!</p>
//                 <Link to="/dashboard">
//                     <button className="mt-8 bg-indigo-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-600 transition-colors">
//                         Back to Dashboard
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default AnalyticsPage;






// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import DashboardHeader from '../components/layouts/DashboardHeader.jsx';
// import AnimateOnScroll from '../components/ui/AnimateOnScroll.jsx';

// const ClarityScoreChart = ({ score }) => {
//     const radius = 50;
//     const circumference = 2 * Math.PI * radius;
//     const offset = circumference - (score / 10) * circumference;

//     return (
//         <div className="relative w-40 h-40">
//             <svg className="w-full h-full" viewBox="0 0 120 120">
//                 <circle
//                     className="text-gray-800"
//                     strokeWidth="10"
//                     stroke="currentColor"
//                     fill="transparent"
//                     r={radius}
//                     cx="60"
//                     cy="60"
//                 />
//                 <circle
//                     className="text-blue-500"
//                     strokeWidth="10"
//                     strokeDasharray={circumference}
//                     strokeDashoffset={offset}
//                     strokeLinecap="round"
//                     stroke="currentColor"
//                     fill="transparent"
//                     r={radius}
//                     cx="60"
//                     cy="60"
//                     style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
//                     transform="rotate(-90 60 60)"
//                 />
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-3xl font-bold text-white">{score}</span>
//                 <span className="text-sm text-gray-400">/10</span>
//             </div>
//         </div>
//     );
// };

// const AnalyticsPage = () => {
//     const { debateId } = useParams();
//     const [analysis, setAnalysis] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!debateId) {
//              const fetchOverallAnalytics = async () => {
//                 // This is where you would fetch the user's central analytics
//                 // For now, we'll just show a message.
//                 setIsLoading(false);
//                 // In the future, you would set the overall analysis state here.
//             };
//             fetchOverallAnalytics();
//             return;
//         }

//         const fetchAnalysis = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/${debateId}`, { credentials: 'include' });
//                 if (!response.ok) throw new Error("Failed to fetch debate data.");
                
//                 const debateData = await response.json();
//                 if (debateData.analytics) {
//                     setAnalysis(debateData.analytics);
//                 } else {
//                     setError("Analysis for this debate is not yet available.");
//                 }

//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchAnalysis();
//     }, [debateId]);

//     const renderLoading = () => (
//         <div className="text-center">
//             <div className="w-8 h-8 border-4 border-gray-800 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
//             <h2 className="text-xl font-semibold text-gray-300">Loading Analysis...</h2>
//         </div>
//     );

//     const renderError = () => (
//         <div className="text-center p-4 bg-red-900/20 border border-red-800 rounded-lg">
//             <h2 className="text-xl font-semibold text-red-400">Error</h2>
//             <p className="text-gray-400 mt-2">{error}</p>
//             <Link to="/dashboard" className="mt-4 inline-block bg-gray-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600">
//                 Back to Dashboard
//             </Link>
//         </div>
//     );

//     const renderOverallAnalytics = () => (
//          <div className="text-center">
//             <h1 className="text-4xl font-bold">Overall Analytics</h1>
//             <p className="text-gray-400 mt-4">This section will show your aggregated performance across all debates. Feature coming soon!</p>
//              <Link to="/dashboard" className="mt-8 inline-block bg-indigo-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-600">
//                 Return to Dashboard
//             </Link>
//         </div>
//     );
    
//     const renderDebateAnalysis = () => (
//         <>
//             <AnimateOnScroll className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 <div className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 flex flex-col items-center justify-center">
//                     <h3 className="text-lg font-semibold text-gray-400 mb-4">Clarity Score</h3>
//                     <ClarityScoreChart score={analysis.clarityScore} />
//                 </div>
//                  <div className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 text-center">
//                     <h3 className="text-lg font-semibold text-gray-400 mb-2">Conciseness</h3>
//                     <p className="text-4xl font-bold">{analysis.concisenessScore}<span className="text-2xl text-gray-500">/10</span></p>
//                 </div>
//                 <div className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 text-center">
//                     <h3 className="text-lg font-semibold text-gray-400 mb-2">Relevance</h3>
//                     <p className="text-4xl font-bold">{analysis.relevanceScore}<span className="text-2xl text-gray-500">/10</span></p>
//                 </div>
//             </AnimateOnScroll>
            
//             <AnimateOnScroll stagger={100} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 mb-8">
//                 <h3 className="text-2xl font-bold mb-4">Summary</h3>
//                 <p className="text-gray-400 text-lg">{analysis.summary}</p>
//             </AnimateOnScroll>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                  <AnimateOnScroll stagger={200} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
//                     <h3 className="text-2xl font-bold mb-4 text-green-400">Strengths</h3>
//                     <ul className="space-y-3">
//                         {analysis.strengths.map((item, i) => <li key={i} className="text-lg text-gray-300">- {item}</li>)}
//                     </ul>
//                 </AnimateOnScroll>
//                  <AnimateOnScroll stagger={300} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
//                     <h3 className="text-2xl font-bold mb-4 text-yellow-400">Areas for Improvement</h3>
//                      <ul className="space-y-3">
//                         {analysis.areasForImprovement.map((item, i) => <li key={i} className="text-lg text-gray-300">- {item}</li>)}
//                     </ul>
//                 </AnimateOnScroll>
//             </div>

//             {analysis.logicalFallacies && analysis.logicalFallacies.length > 0 && (
//                 <AnimateOnScroll stagger={400} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 mt-8">
//                     <h3 className="text-2xl font-bold mb-4 text-red-400">Logical Fallacies Detected</h3>
//                     <div className="space-y-4">
//                         {analysis.logicalFallacies.map((item, i) => (
//                             <div key={i} className="border-l-4 border-red-800 pl-4">
//                                 <p className="font-semibold text-lg">{item.fallacy}</p>
//                                 <p className="text-gray-400 italic my-1">"{item.quote}"</p>
//                                 <p className="text-gray-500">{item.explanation}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </AnimateOnScroll>
//             )}
//         </>
//     );

//     return (
//         <div className="bg-black text-white min-h-screen font-sans">
//             <DashboardHeader />
//             <main className="max-w-5xl mx-auto p-4 sm:p-10 w-full">
//                 <div className="mb-8">
//                     <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">&larr; Back to Dashboard</Link>
//                     <h1 className="text-4xl font-extrabold tracking-tight mt-2">{debateId ? "Debate Analysis" : "Overall Performance"}</h1>
//                 </div>

//                 {isLoading ? renderLoading() : error ? renderError() : (
//                     analysis ? renderDebateAnalysis() : renderOverallAnalytics()
//                 )}
//             </main>
//         </div>
//     );
// };

// export default AnalyticsPage;



import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/layouts/DashboardHeader.jsx';
import AnimateOnScroll from '../components/ui/AnimateOnScroll.jsx';

// --- Helper Components ---

const ScoreChart = ({ score, label }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 10) * circumference;
    const color = score >= 8 ? 'text-green-500' : score >= 5 ? 'text-yellow-500' : 'text-red-500';

    return (
        <div className="flex flex-col items-center justify-center bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-400 mb-4">{label}</h3>
            <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle className="text-gray-800" strokeWidth="8" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
                    <circle className={color} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" style={{ transition: 'stroke-dashoffset 0.8s ease-out' }} transform="rotate(-90 60 60)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{score.toFixed(1)}</span>
                </div>
            </div>
        </div>
    );
};

const HistoryIcon = () => ( <svg className="w-4 h-4 mr-3 text-gray-600 group-hover:text-gray-300 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg> );

// --- Main Analytics Page ---

const AnalyticsPage = () => {
    const { debateId } = useParams();
    const navigate = useNavigate();
    
    // State for specific debate analysis
    const [debateAnalysis, setDebateAnalysis] = useState(null);
    const [debateTitle, setDebateTitle] = useState('');

    // State for overall analytics
    const [overallAnalytics, setOverallAnalytics] = useState(null);
    const [debateHistory, setDebateHistory] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Always fetch overall analytics and history for the sidebar
                const [overallRes, historyRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/analytics`, { credentials: 'include' }),
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getAllDebates`, { method: 'POST', headers: {'Content-Type': 'application/json'}, credentials: 'include' })
                ]);

                if (!overallRes.ok) throw new Error("Failed to load overall analytics.");
                if (!historyRes.ok) throw new Error("Failed to load debate history.");

                setOverallAnalytics(await overallRes.json());
                setDebateHistory(await historyRes.json());

                // If a specific debate is requested, fetch its analysis
                if (debateId) {
                    const debateRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/${debateId}`, { credentials: 'include' });
                    if (!debateRes.ok) throw new Error("Failed to fetch debate data.");
                    
                    const debateData = await debateRes.json();
                    if (debateData.analytics) {
                        setDebateAnalysis(debateData.analytics);
                        setDebateTitle(debateData.title);
                    } else {
                        // This case is for when analysis is still being generated
                        setError("Analysis for this debate is not yet available. Please check back shortly.");
                    }
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [debateId]);

    const calculateAverage = (scores) => {
        if (!scores || scores.length === 0) return 0;
        const total = scores.reduce((acc, score) => acc + score, 0);
        return total / scores.length;
    };

    const avgClarity = useMemo(() => calculateAverage(overallAnalytics?.clarityScores), [overallAnalytics]);
    const avgConciseness = useMemo(() => calculateAverage(overallAnalytics?.concisenessScores), [overallAnalytics]);
    const avgRelevance = useMemo(() => calculateAverage(overallAnalytics?.relevanceScores), [overallAnalytics]);


    const renderLoading = () => (
        <div className="flex-1 flex items-center justify-center text-center">
            <div className="w-8 h-8 border-4 border-gray-800 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        </div>
    );

    const renderError = () => (
        <div className="flex-1 flex items-center justify-center text-center p-4">
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-8">
                <h2 className="text-xl font-semibold text-red-400">An Error Occurred</h2>
                <p className="text-gray-400 mt-2">{error}</p>
                <button onClick={() => navigate('/dashboard')} className="mt-6 bg-gray-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600">
                    Back to Dashboard
                </button>
            </div>
        </div>
    );

    const renderOverallAnalytics = () => (
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
            <h1 className="text-4xl font-extrabold tracking-tight">Overall Performance</h1>
            <p className="mt-2 text-lg text-gray-400">Your average scores across all debates.</p>
             {overallAnalytics && overallAnalytics.totalDebates > 0 ? (
                <AnimateOnScroll className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ScoreChart score={avgClarity} label="Avg. Clarity" />
                    <ScoreChart score={avgConciseness} label="Avg. Conciseness" />
                    <ScoreChart score={avgRelevance} label="Avg. Relevance" />
                </AnimateOnScroll>
            ) : (
                <div className="mt-8 text-center py-12 bg-[#0A0A0A] border border-gray-900 rounded-2xl">
                    <p className="text-gray-500">No debates analyzed yet. Complete a debate to see your stats!</p>
                </div>
            )}
        </main>
    );
    
    const renderDebateAnalysis = () => (
         <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
             <h1 className="text-4xl font-extrabold tracking-tight">{debateTitle}</h1>
             <p className="mt-2 text-lg text-gray-400">A detailed breakdown of your performance in this debate.</p>
             <div className="mt-8">
                <AnimateOnScroll className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <ScoreChart score={debateAnalysis.clarityScore} label="Clarity Score" />
                    <ScoreChart score={debateAnalysis.concisenessScore} label="Conciseness Score" />
                    <ScoreChart score={debateAnalysis.relevanceScore} label="Relevance Score" />
                </AnimateOnScroll>
                
                <AnimateOnScroll stagger={100} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 mb-8">
                    <h3 className="text-2xl font-bold mb-4">Summary</h3>
                    <p className="text-gray-400 text-lg">{debateAnalysis.summary}</p>
                </AnimateOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimateOnScroll stagger={200} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
                        <h3 className="text-2xl font-bold mb-4 text-green-400">Strengths</h3>
                        <ul className="space-y-3">
                            {debateAnalysis.strengths.map((item, i) => <li key={i} className="text-lg text-gray-300">- {item}</li>)}
                        </ul>
                    </AnimateOnScroll>
                    <AnimateOnScroll stagger={300} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
                        <h3 className="text-2xl font-bold mb-4 text-yellow-400">Areas for Improvement</h3>
                        <ul className="space-y-3">
                            {debateAnalysis.areasForImprovement.map((item, i) => <li key={i} className="text-lg text-gray-300">- {item}</li>)}
                        </ul>
                    </AnimateOnScroll>
                </div>

                {debateAnalysis.logicalFallacies && debateAnalysis.logicalFallacies.length > 0 && (
                    <AnimateOnScroll stagger={400} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 mt-8">
                        <h3 className="text-2xl font-bold mb-4 text-red-400">Logical Fallacies Detected</h3>
                        <div className="space-y-4">
                            {debateAnalysis.logicalFallacies.map((item, i) => (
                                <div key={i} className="border-l-4 border-red-800 pl-4">
                                    <p className="font-semibold text-lg">{item.fallacy}</p>
                                    <p className="text-gray-400 italic my-1">"{item.quote}"</p>
                                    <p className="text-gray-500">{item.explanation}</p>
                                </div>
                            ))}
                        </div>
                    </AnimateOnScroll>
                )}
            </div>
         </main>
    );

    return (
        <div className="bg-black text-white min-h-screen flex flex-col font-sans">
            <DashboardHeader />
            <div className="flex flex-1 w-full max-w-screen-2xl mx-auto">
                 <aside className="w-1/4 max-w-xs border-r border-gray-900 p-4 pt-10 flex-col flex-shrink-0 hidden md:flex">
                    <div className="flex-grow overflow-y-auto pr-2 relative [mask-image:linear-gradient(to_bottom,white_90%,transparent_100%)]">
                         <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Analyzed Debates</h2>
                        
                        {isLoading ? (
                            <p className="text-gray-400 text-center">Loading history...</p>
                        ) : debateHistory.length > 0 ? (
                            <ul className="space-y-1">
                                {debateHistory.filter(d => d.analytics).map((debate, index) => ( // Only show debates with analytics
                                    <AnimateOnScroll key={debate._id} stagger={index * 50}>
                                        <Link 
                                            to={`/analytics/${debate._id}`} 
                                            className={`group flex items-center text-lg rounded-md py-2 px-2 transition-colors truncate ${debateId === debate._id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
                                        >
                                            <HistoryIcon />
                                            <span>{debate.title}</span>
                                        </Link>
                                    </AnimateOnScroll>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-center px-4">No analyzed debates yet.</p>
                        )}
                    </div>
                </aside>

                {isLoading ? renderLoading() : error ? renderError() : (
                    debateId ? (debateAnalysis ? renderDebateAnalysis() : renderError()) : renderOverallAnalytics()
                )}
            </div>
        </div>
    );
};

export default AnalyticsPage;

