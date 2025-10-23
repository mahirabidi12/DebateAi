import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimateOnScroll from '../components/ui/AnimateOnScroll.jsx';
import DashboardHeader from '../components/layouts/DashboardHeader.jsx';
import DashboardFooter from '../components/layouts/DashboardFooter.jsx';
import AnimatedText from '../components/ui/AnimatedText.jsx';

// Modal for starting a new debate
const DebateModal = ({ isOpen, onClose, prefillTopic = '' }) => {
    const [debateTitle, setDebateTitle] = useState('');
    const [debateTopic, setDebateTopic] = useState(prefillTopic);
    const [debateDuration, setDebateDuration] = useState('5 Minutes');
    const [stance, setStance] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setDebateTopic(prefillTopic);
    }, [prefillTopic, isOpen]);

    const isFormValid = debateTitle && debateTopic && stance;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;
        setIsLoading(true);

        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/debate/createDebate`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    title: debateTitle,
                    topic: debateTopic,
                    duration: parseInt(debateDuration),
                    stance: stance,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create debate');
            }

            const data = await response.json();
            onClose(); 
            navigate(`/debate/${data._id}`);

        } catch (error) {
            console.error("Error creating debate:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-8 w-full max-w-lg animate-fade-in-up"
                style={{ animationDuration: '300ms' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Configure Your Debate</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="debateTitle" className="block text-lg font-medium text-gray-400 mb-2">Debate Title</label>
                        <input type="text" id="debateTitle" placeholder="e.g., 'My First AI Debate'" className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-3 text-lg focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all" value={debateTitle} onChange={(e) => setDebateTitle(e.target.value)} />
                    </div>
                     <div>
                        <label htmlFor="debateTopic" className="block text-lg font-medium text-gray-400 mb-2">Topic</label>
                        <input type="text" id="debateTopic" placeholder="e.g., 'The Ethics of Artificial Intelligence'" className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-3 text-lg focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all" value={debateTopic} onChange={(e) => setDebateTopic(e.target.value)} />
                    </div>
                     <div>
                        <label htmlFor="debateDuration" className="block text-lg font-medium text-gray-400 mb-2">Time Duration</label>
                        <select id="debateDuration" className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-3 text-lg appearance-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all" value={debateDuration} onChange={(e) => setDebateDuration(e.target.value)}>
                            <option>5 Minutes</option>
                            <option>10 Minutes</option>
                            <option>15 Minutes</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-lg font-medium text-gray-400 mb-2">Stance</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className={`text-center w-full border font-semibold p-4 rounded-md transition-colors text-lg ${stance === 'for' ? 'bg-white text-black border-white' : 'bg-[#111] hover:bg-gray-900 border-gray-800 text-gray-200'}`} onClick={() => setStance('for')}>
                                For the Motion
                            </button>
                             <button type="button" className={`text-center w-full border font-semibold p-4 rounded-md transition-colors text-lg ${stance === 'against' ? 'bg-white text-black border-white' : 'bg-[#111] hover:bg-gray-900 border-gray-800 text-gray-200'}`} onClick={() => setStance('against')}>
                                Against the Motion
                            </button>
                        </div>
                    </div>
                    <div className="pt-4">
                         <button type="submit" disabled={!isFormValid || isLoading} className={`w-full font-semibold px-8 py-3 rounded-md transition-all duration-300 transform text-lg ${isFormValid && !isLoading ? 'bg-white text-black hover:bg-gray-200 hover:scale-105 shadow-lg shadow-white/5' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
                            {isLoading ? 'Creating Debate...' : 'Start Debate'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ExploreTopicsModal = ({ isOpen, onClose, onSelectTopic }) => {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            const fetchTopics = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getDebateTopics`, {
                         method: 'GET',
                         credentials: 'include'
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.message || 'Failed to fetch topics.');
                    }
                    setTopics(data.result);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchTopics();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-8 w-full max-w-2xl animate-fade-in-up" style={{ animationDuration: '300ms' }} onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Explore Debate Topics</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                {isLoading ? (
                    <div className="text-center p-8 flex justify-center items-center">
                         <div className="w-8 h-8 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="text-center p-8 text-red-400">{error}</div>
                ) : (
                    <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                        {topics && topics.map((topic, index) => (
                            <li key={index} className="flex justify-between items-center bg-[#111] p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                                <span className="text-lg text-gray-300 flex-1 pr-4">{topic}</span>
                                <button onClick={() => onSelectTopic(topic)} className="bg-white text-black font-semibold px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors flex-shrink-0">
                                    Start Debate
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const DashboardCard = ({ children, className = '', isGlow = false }) => (
    <div className={`group bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 transition-all duration-300 hover:border-gray-800 hover:bg-[#111] hover:shadow-2xl hover:shadow-black transform hover:-translate-y-1 ${className} ${isGlow ? 'relative overflow-hidden' : ''}`}>
        {isGlow && <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_180deg_at_50%_50%,#111_0deg,#333_90deg,#111_180deg,#333_270deg,#111_360deg)] animate-spin-slow opacity-10 group-hover:opacity-20 transition-opacity"></div>}
        <div className="relative z-10 h-full flex flex-col">
            {children}
        </div>
    </div>
);

const AnimatedStat = ({ value, label, suffix = '', isN_A = false }) => {
    const [currentValue, setCurrentValue] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        if (isN_A) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let start = 0;
                const end = parseFloat(value);
                if (start === end) {
                    setCurrentValue(end.toFixed(1));
                    return;
                }
                let duration = 1500;
                let startTime = null;

                const animate = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    const nextValue = progress * (end - start) + start;
                    setCurrentValue(nextValue.toFixed(1));
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        setCurrentValue(end.toFixed(1));
                    }
                };
                requestAnimationFrame(animate);
                observer.unobserve(ref.current);
            }
        }, { threshold: 0.5 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [value, isN_A]);

    return (
        <div ref={ref} className="flex justify-between items-center text-lg">
            <span className="text-gray-400">{label}:</span>
            {isN_A ? (
                <span className="font-bold text-xl text-gray-500">N/A</span>
            ) : (
                <span className={`font-bold text-xl text-gray-100`}>{currentValue}{suffix}</span>
            )}
        </div>
    );
};

const HistoryIcon = () => ( <svg className="w-4 h-4 mr-3 text-gray-600 group-hover:text-gray-300 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg> );
const BoltIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> );
const ChartBarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 12h4v4H7z"/><path d="M12 8h4v8h-4z"/><path d="M17 4h4v12h-4z"/></svg> );

const DashboardPage = () => {
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
    const [prefillTopic, setPrefillTopic] = useState('');
    const [debates, setDebates] = useState([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const [historyError, setHistoryError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoadingHistory(true);
            try {
                const [historyRes, analyticsRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getAllDebates`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include' }),
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/analytics`, { credentials: 'include' })
                ]);

                if (!historyRes.ok) throw new Error('Failed to fetch debate history.');
                if (!analyticsRes.ok) throw new Error('Failed to fetch analytics.');

                setDebates(await historyRes.json());
                setAnalytics(await analyticsRes.json());

            } catch (error) {
                setHistoryError(error.message);
            } finally {
                setIsLoadingHistory(false);
            }
        };

        fetchAllData();
    }, []);
    
    const handleSelectTopic = (topic) => {
        setIsExploreModalOpen(false);
        setPrefillTopic(topic);
        setIsConfigModalOpen(true);
    };

    const filteredDebates = debates.filter(debate =>
        debate.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const calculateAverage = (scores) => {
        if (!scores || scores.length === 0) return 0;
        return scores.reduce((acc, score) => acc + score, 0) / scores.length;
    };

    const avgClarity = useMemo(() => calculateAverage(analytics?.clarityScores), [analytics]);
    const avgConciseness = useMemo(() => calculateAverage(analytics?.concisenessScores), [analytics]);
    const totalDebates = useMemo(() => analytics?.totalDebates || 0, [analytics]);

    return (
        <div className="bg-black text-white min-h-screen flex flex-col font-sans">
            <DashboardHeader />
            <DebateModal isOpen={isConfigModalOpen} onClose={() => setIsConfigModalOpen(false)} prefillTopic={prefillTopic} />
            <ExploreTopicsModal isOpen={isExploreModalOpen} onClose={() => setIsExploreModalOpen(false)} onSelectTopic={handleSelectTopic} />
            
            <div className="flex flex-1 w-full max-w-screen-2xl mx-auto">
                <aside className="w-1/4 max-w-xs border-r border-gray-900 p-4 pt-10 flex-col flex-shrink-0 hidden md:flex">
                    <div className="flex-grow overflow-y-auto pr-2 relative [mask-image:linear-gradient(to_bottom,white_90%,transparent_100%)]">
                         <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Debate History</h2>
                         <input 
                            type="text" 
                            placeholder="Search history..." 
                            className="w-full bg-[#111] border border-gray-800 rounded-md px-3 py-2 text-lg mb-4 focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                         />
                        
                        {isLoadingHistory ? (
                            <p className="text-gray-400 text-center">Loading history...</p>
                        ) : historyError ? (
                            <p className="text-red-500 text-center">{historyError}</p>
                        ) : debates.length === 0 ? (
                             <p className="text-gray-500 text-center px-4">You have no debate history yet.</p>
                        ) : filteredDebates.length > 0 ? (
                            <ul className="space-y-1">
                                {filteredDebates.map((debate, index) => (
                                    <AnimateOnScroll key={debate._id} stagger={index * 50}>
                                        <Link to={`/debate/${debate._id}`} className="group flex items-center text-lg text-gray-400 hover:text-white hover:bg-gray-900 rounded-md py-2 px-2 transition-colors truncate">
                                            <HistoryIcon />
                                            <span>{debate.title}</span>
                                        </Link>
                                    </AnimateOnScroll>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-center px-4">No debates found.</p>
                        )}
                    </div>
                </aside>

                <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
                    <AnimateOnScroll>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight text-gray-100">
                            Welcome to your <br className="hidden md:block" /> <AnimatedText text="Intellectual Arena" />
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                            Your dashboard awaits. What will you conquer today?
                        </p>
                    </AnimateOnScroll>
                    
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <AnimateOnScroll stagger={100} className="lg:col-span-3 group">
                             <DashboardCard className="!border-gray-800" isGlow={true}>
                                <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">Start a New Debate</h2>
                                        <p className="text-lg text-gray-400 mb-6 max-w-sm">Challenge the AI, explore new topics, and sharpen your argumentative skills.</p>
                                    </div>
                                    <button 
                                        onClick={() => { setPrefillTopic(''); setIsConfigModalOpen(true); }}
                                        className="bg-white text-black font-semibold px-8 py-3 rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/5 flex-shrink-0"
                                    >
                                        Begin a Debate
                                    </button>
                                </div>
                            </DashboardCard>
                        </AnimateOnScroll>

                        <AnimateOnScroll stagger={200} className="lg:col-span-2">
                             <DashboardCard className="h-full">
                                <div className="flex items-center text-gray-400 mb-4"><ChartBarIcon /><h2 className="text-xl font-bold text-white ml-3">Performance Snapshot</h2></div>
                                <p className="text-lg text-gray-400 mb-4">A quick look at your overall progress.</p>
                                {isLoadingHistory ? <p className="text-gray-500">Loading stats...</p> : (
                                    <div className="space-y-3 mb-4">
                                        <AnimatedStat value={totalDebates} label="Total Debates" isN_A={totalDebates === 0} />
                                        <AnimatedStat value={avgClarity} label="Avg. Clarity" suffix="/10" isN_A={totalDebates === 0} />
                                        <AnimatedStat value={avgConciseness} label="Avg. Conciseness" suffix="/10" isN_A={totalDebates === 0} />
                                    </div>
                                )}
                                <div className="mt-auto">
                                   <Link to="/analytics" className="block mt-2">
                                        <button className="w-full text-lg border border-gray-800 text-gray-300 font-semibold px-4 py-2 rounded-md hover:bg-gray-900 hover:border-gray-700 hover:text-white transition-colors">
                                            View Full Report
                                        </button>
                                    </Link>
                                </div>
                            </DashboardCard>
                        </AnimateOnScroll>

                         <AnimateOnScroll stagger={300}>
                             <DashboardCard className="h-full">
                                <div className="flex items-center text-gray-400 mb-4"><BoltIcon /><h2 className="text-xl font-bold text-white ml-3">Quick Actions</h2></div>
                                <div className="flex flex-col space-y-3 flex-grow">
                                    <button onClick={() => setIsExploreModalOpen(true)} className="w-full text-left text-lg bg-[#111] hover:bg-gray-900 border border-gray-800 text-gray-200 font-medium p-4 rounded-md transition-colors flex-grow">
                                        Explore Topics
                                    </button>
                                     <button className="w-full flex justify-between items-center text-left text-lg bg-transparent border border-gray-800 text-gray-500 font-medium px-4 py-3 rounded-md transition-colors opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-gray-300">
                                        <span>Training Ground</span>
                                        <span className="text-xs bg-gray-800 text-gray-500 font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
                                    </button>
                                    <button className="w-full flex justify-between items-center text-left text-lg bg-transparent border border-gray-800 text-gray-500 font-medium px-4 py-3 rounded-md transition-colors opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-gray-300">
                                        <span>Challenge a Friend</span>
                                        <span className="text-xs bg-gray-800 text-gray-500 font-semibold px-2 py-0.5 rounded-full">Coming Soon</span>
                                    </button>
                                    <button className="w-full flex justify-between items-center text-left text-lg bg-transparent border border-gray-800 text-gray-500 font-medium px-4 py-3 rounded-md transition-colors opacity-70 hover:opacity-100 hover:bg-gray-900 hover:text-gray-300">
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

