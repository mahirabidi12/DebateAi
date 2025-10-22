// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import DashboardHeader from '../components/layouts/DashboardHeader.jsx';
// import AnimateOnScroll from '../components/ui/AnimateOnScroll.jsx';
// import AnimatedText from '../components/ui/AnimatedText.jsx';


// // --- Helper & UI Components ---

// const AnimatedStat = ({ value, label, suffix = '' }) => {
//     const [currentValue, setCurrentValue] = useState(0);
//     const ref = useRef(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver(([entry]) => {
//             if (entry.isIntersecting) {
//                 let start = 0;
//                 const end = parseFloat(value);
//                 if (start === end) {
//                     setCurrentValue(end.toFixed(1));
//                     return;
//                 };
//                 let duration = 1500;
//                 let startTime = null;

//                 const animate = (currentTime) => {
//                     if (!startTime) startTime = currentTime;
//                     const progress = Math.min((currentTime - startTime) / duration, 1);
//                     const nextValue = progress * (end - start) + start;
//                     setCurrentValue(nextValue.toFixed(1));
//                     if (progress < 1) {
//                         requestAnimationFrame(animate);
//                     } else {
//                         setCurrentValue(end.toFixed(1));
//                     }
//                 };
//                 requestAnimationFrame(animate);
//                 observer.unobserve(ref.current);
//             }
//         }, { threshold: 0.5 });

//         if (ref.current) observer.observe(ref.current);

//         return () => {
//             if (ref.current) {
//                 // eslint-disable-next-line react-hooks/exhaustive-deps
//                 observer.unobserve(ref.current);
//             }
//         };
//     }, [value]);

//     return (
//         <div ref={ref}>
//             <p className="text-gray-400 text-sm">{label}</p>
//             <p className="text-4xl font-bold text-white">{currentValue}{suffix}</p>
//         </div>
//     );
// };

// const ScoreChart = ({ score, label }) => {
//     const [displayScore, setDisplayScore] = useState(0);
//     const radius = 50;
//     const circumference = 2 * Math.PI * radius;
//     const offset = circumference - (displayScore / 10) * circumference;
//     const color = score >= 8 ? 'text-green-500' : score >= 5 ? 'text-yellow-500' : 'text-red-500';

//     useEffect(() => {
//        const timeout = setTimeout(() => setDisplayScore(score), 100);
//        return () => clearTimeout(timeout);
//     }, [score]);

//     return (
//         <div className="flex flex-col items-center justify-center bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 transform transition-transform duration-300 hover:-translate-y-1">
//             <h3 className="text-lg font-semibold text-gray-400 mb-4">{label}</h3>
//             <div className="relative w-32 h-32">
//                 <svg className="w-full h-full" viewBox="0 0 120 120">
//                     <circle className="text-gray-800" strokeWidth="8" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
//                     <circle className={color} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} transform="rotate(-90 60 60)" />
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="text-3xl font-bold text-white"><AnimatedStat value={score} /></span>
//                 </div>
//             </div>
//         </div>
//     );
// };


// const TrendChart = ({ data, label }) => {
//     const svgRef = useRef(null);

//     useEffect(() => {
//         if (!svgRef.current || data.length === 0) return;
        
//         const svg = svgRef.current;
//         const width = svg.clientWidth;
//         const height = svg.clientHeight;
//         const padding = 20;

//         const xScale = val => (val / (data.length - 1)) * (width - 2 * padding) + padding;
//         const yScale = val => height - padding - ((val / 10) * (height - 2 * padding));

//         const points = data.map((val, i) => `${xScale(i)},${yScale(val)}`).join(' ');

//         // Animate the line drawing
//         const path = svg.querySelector('polyline');
//         if(path) {
//             const length = path.getTotalLength();
//             path.style.strokeDasharray = length;
//             path.style.strokeDashoffset = length;
//             setTimeout(() => { path.style.transition = 'stroke-dashoffset 1.5s ease-out'; path.style.strokeDashoffset = 0; }, 100);
//         }

//     }, [data]);

//     if (data.length === 0) return null;

//     const points = data.map((val, i) => `${(i / (data.length - 1)) * 100},${100 - (val * 10)}`).join(' ');
    
//     return (
//         <div className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
//             <h3 className="text-lg font-semibold text-gray-400 mb-4">{label}</h3>
//             <div className="h-48">
//                 <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
//                     <polyline
//                         fill="none"
//                         stroke="url(#trendGradient)"
//                         strokeWidth="2"
//                         points={points}
//                     />
//                     <defs>
//                         <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#4f46e5" />
//                             <stop offset="100%" stopColor="#a855f7" />
//                         </linearGradient>
//                     </defs>
//                 </svg>
//             </div>
//         </div>
//     )
// };


// const HistoryIcon = () => ( <svg className="w-4 h-4 mr-3 text-gray-600 group-hover:text-gray-300 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg> );

// // --- Main Analytics Page ---

// const AnalyticsPage = () => {
//     const { debateId } = useParams();
//     const navigate = useNavigate();
    
//     const [debateAnalysis, setDebateAnalysis] = useState(null);
//     const [debateTitle, setDebateTitle] = useState('');
//     const [overallAnalytics, setOverallAnalytics] = useState(null);
//     const [debateHistory, setDebateHistory] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const [overallRes, historyRes] = await Promise.all([
//                     fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/analytics`, { credentials: 'include' }),
//                     fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getAllDebates`, { method: 'POST', headers: {'Content-Type': 'application/json'}, credentials: 'include' })
//                 ]);

//                 if (!overallRes.ok) throw new Error("Failed to load overall analytics.");
//                 if (!historyRes.ok) throw new Error("Failed to load debate history.");

//                 setOverallAnalytics(await overallRes.json());
//                 setDebateHistory(await historyRes.json());

//                 if (debateId) {
//                     const debateRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/${debateId}`, { credentials: 'include' });
//                     if (!debateRes.ok) throw new Error("Failed to fetch debate data.");
                    
//                     const debateData = await debateRes.json();
//                     if (debateData.analytics) {
//                         setDebateAnalysis(debateData.analytics);
//                         setDebateTitle(debateData.title);
//                     } else {
//                         setError("Analysis for this debate is still generating. Please check back in a moment.");
//                     }
//                 }

//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, [debateId]);

//     const calculateAverage = (scores) => {
//         if (!scores || scores.length === 0) return 0;
//         const total = scores.reduce((acc, score) => acc + score, 0);
//         return total / scores.length;
//     };

//     const avgClarity = useMemo(() => calculateAverage(overallAnalytics?.clarityScores), [overallAnalytics]);
//     const avgConciseness = useMemo(() => calculateAverage(overallAnalytics?.concisenessScores), [overallAnalytics]);
//     const avgRelevance = useMemo(() => calculateAverage(overallAnalytics?.relevanceScores), [overallAnalytics]);
    
//     const last5ClarityScores = useMemo(() => overallAnalytics?.clarityScores.slice(-5) || [], [overallAnalytics]);


//     const renderLoading = () => (
//         <div className="flex-1 flex items-center justify-center text-center">
//             <div className="w-8 h-8 border-4 border-gray-800 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
//         </div>
//     );

//     const renderError = () => (
//         <div className="flex-1 flex items-center justify-center text-center p-4">
//             <div className="bg-[#111] border border-red-800/50 rounded-lg p-8">
//                 <h2 className="text-xl font-semibold text-red-400">An Error Occurred</h2>
//                 <p className="text-gray-400 mt-2">{error}</p>
//                 <button onClick={() => navigate('/dashboard')} className="mt-6 bg-gray-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600">
//                     Back to Dashboard
//                 </button>
//             </div>
//         </div>
//     );

//     const renderOverallAnalytics = () => (
//          <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
//             <AnimateOnScroll>
//                 <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Your <AnimatedText text="Performance Hub" /></h1>
//                 <p className="mt-2 text-lg text-gray-400">An overview of your progress across all debates.</p>
//             </AnimateOnScroll>

//              {overallAnalytics && overallAnalytics.totalDebates > 0 ? (
//                 <>
//                     <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//                          <AnimateOnScroll className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
//                             <AnimatedStat value={overallAnalytics.totalDebates} label="Total Debates" />
//                         </AnimateOnScroll>
//                         <AnimateOnScroll stagger={100} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
//                             <AnimatedStat value={avgClarity} label="Average Clarity" suffix="/10" />
//                         </AnimateOnScroll>
//                         <AnimateOnScroll stagger={200} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
//                              <AnimatedStat value={avgRelevance} label="Average Relevance" suffix="/10" />
//                         </AnimateOnScroll>
//                     </div>
//                     <AnimateOnScroll stagger={300} className="mt-8">
//                         <TrendChart data={last5ClarityScores} label="Clarity Score Trend (Last 5 Debates)" />
//                     </AnimateOnScroll>
//                 </>
//             ) : (
//                 <div className="mt-8 text-center py-16 bg-[#0A0A0A] border border-gray-900 rounded-2xl">
//                     <p className="text-gray-500 text-lg">No debates analyzed yet. Complete a debate to see your stats!</p>
//                 </div>
//             )}
//         </main>
//     );
    
//     const renderDebateAnalysis = () => (
//          <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
//              <AnimateOnScroll>
//                 <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight"><AnimatedText text={debateTitle} /></h1>
//                 <p className="mt-2 text-lg text-gray-400">A detailed breakdown of your performance in this debate.</p>
//              </AnimateOnScroll>
//              <div className="mt-8">
//                 <AnimateOnScroll className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                     <ScoreChart score={debateAnalysis.clarityScore} label="Clarity" />
//                     <ScoreChart score={debateAnalysis.concisenessScore} label="Conciseness" />
//                     <ScoreChart score={debateAnalysis.relevanceScore} label="Relevance" />
//                 </AnimateOnScroll>
                
//                 <AnimateOnScroll stagger={100} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 mb-8">
//                     <h3 className="text-2xl font-bold mb-4">AI Coach Summary</h3>
//                     <p className="text-gray-400 text-lg">{debateAnalysis.summary}</p>
//                 </AnimateOnScroll>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     <AnimateOnScroll stagger={200} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
//                         <h3 className="text-2xl font-bold mb-4 text-green-400">Key Strengths</h3>
//                         <ul className="space-y-4">
//                             {debateAnalysis.strengths.map((item, i) => <li key={i} className="flex items-start text-lg text-gray-300"><span className="text-green-500 mr-3 mt-1">✓</span> {item}</li>)}
//                         </ul>
//                     </AnimateOnScroll>
//                     <AnimateOnScroll stagger={300} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
//                         <h3 className="text-2xl font-bold mb-4 text-yellow-400">Improvement Areas</h3>
//                          <ul className="space-y-4">
//                             {debateAnalysis.areasForImprovement.map((item, i) => <li key={i} className="flex items-start text-lg text-gray-300"><span className="text-yellow-500 mr-3 mt-1">!</span> {item}</li>)}
//                         </ul>
//                     </AnimateOnScroll>
//                 </div>

//                 {debateAnalysis.logicalFallacies && debateAnalysis.logicalFallacies.length > 0 && (
//                     <AnimateOnScroll stagger={400} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 mt-8">
//                         <h3 className="text-2xl font-bold mb-4 text-red-400">Logical Fallacies Detected</h3>
//                         <div className="space-y-6">
//                             {debateAnalysis.logicalFallacies.map((item, i) => (
//                                 <div key={i} className="border-l-4 border-red-800/50 pl-4">
//                                     <p className="font-semibold text-lg text-red-400">{item.fallacy}</p>
//                                     <p className="text-gray-400 italic my-1">"{item.quote}"</p>
//                                     <p className="text-gray-500">{item.explanation}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </AnimateOnScroll>
//                 )}
//             </div>
//          </main>
//     );

//     return (
//         <div className="bg-black text-white min-h-screen flex flex-col font-sans">
//             <DashboardHeader />
//             <div className="flex flex-1 w-full max-w-screen-2xl mx-auto">
//                  <aside className="w-1/4 max-w-xs border-r border-gray-900 p-4 pt-10 flex-col flex-shrink-0 hidden md:flex">
//                     <div className="flex-grow overflow-y-auto pr-2 relative [mask-image:linear-gradient(to_bottom,white_90%,transparent_100%)]">
//                          <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Analyzed Debates</h2>
                        
//                         {isLoading ? (
//                             <p className="text-gray-400 text-center">Loading...</p>
//                         ) : debateHistory.length > 0 ? (
//                             <ul className="space-y-1">
//                                 {debateHistory.filter(d => d.analytics).map((debate, index) => (
//                                     <AnimateOnScroll key={debate._id} stagger={index * 50}>
//                                         <Link 
//                                             to={`/analytics/${debate._id}`} 
//                                             className={`group flex items-center text-lg rounded-md py-2 px-2 transition-colors truncate ${debateId === debate._id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
//                                         >
//                                             <HistoryIcon />
//                                             <span>{debate.title}</span>
//                                         </Link>
//                                     </AnimateOnScroll>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p className="text-gray-500 text-center px-4">No analyzed debates yet.</p>
//                         )}
//                     </div>
//                 </aside>

//                 {isLoading ? renderLoading() : error ? renderError() : (
//                     debateId ? (debateAnalysis ? renderDebateAnalysis() : renderError()) : renderOverallAnalytics()
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AnalyticsPage;



 import React, { useState, useEffect, useMemo, useRef } from 'react';
 import { useParams, Link, useNavigate } from 'react-router-dom';
 import DashboardHeader from '../components/layouts/DashboardHeader.jsx';
 import AnimateOnScroll from '../components/ui/AnimateOnScroll.jsx';
 import AnimatedText from '../components/ui/AnimatedText.jsx';
 import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

 // --- Helper & UI Components ---

 const AnimatedStatCard = ({ value, label, trend = null, description = '', format = 'number' }) => {
     const [currentValue, setCurrentValue] = useState(0);
     const ref = useRef(null);

     useEffect(() => {
         const observer = new IntersectionObserver(([entry]) => {
             if (entry.isIntersecting) {
                 let start = 0;
                 const end = parseFloat(value);
                 if (start === end && format !== 'percent') { // Percent needs to animate from 0
                     setCurrentValue(format === 'number' ? end : `${end.toFixed(1)}%`);
                     return;
                 };
                 let duration = 1500;
                 let startTime = null;

                 const animate = (currentTime) => {
                     if (!startTime) startTime = currentTime;
                     const progress = Math.min((currentTime - startTime) / duration, 1);
                     let nextValue = progress * (end - start) + start;

                     if (format === 'number') {
                         setCurrentValue(Math.round(nextValue)); // Round whole numbers
                     } else if (format === 'score') {
                          setCurrentValue(nextValue.toFixed(1)); // Keep one decimal for scores
                     } else if (format === 'percent') {
                         setCurrentValue(`${nextValue.toFixed(1)}%`); // Format as percentage
                     } else {
                          setCurrentValue(nextValue.toFixed(1));
                     }


                     if (progress < 1) {
                         requestAnimationFrame(animate);
                     } else {
                         // Ensure final value is accurate
                         if (format === 'number') setCurrentValue(end);
                         else if (format === 'score') setCurrentValue(end.toFixed(1));
                         else if (format === 'percent') setCurrentValue(`${end.toFixed(1)}%`);
                         else setCurrentValue(end.toFixed(1));
                     }
                 };
                 requestAnimationFrame(animate);
                 observer.unobserve(ref.current);
             }
         }, { threshold: 0.5 });

         if (ref.current) observer.observe(ref.current);

         return () => {
             if (ref.current) {
                 // eslint-disable-next-line react-hooks/exhaustive-deps
                 observer.unobserve(ref.current);
             }
         };
     }, [value, format]);

     const trendColor = trend > 0 ? 'text-green-500' : trend < 0 ? 'text-red-500' : 'text-gray-500';
     const trendIcon = trend > 0 ? '▲' : trend < 0 ? '▼' : '-';

     return (
         <div ref={ref} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 transform transition-transform duration-300 hover:-translate-y-1 hover:border-gray-800">
             <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
             <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-white">{currentValue}</p>
                 {trend !== null && (
                    <span className={`text-sm font-semibold ${trendColor}`}>{trendIcon} {Math.abs(trend)}%</span>
                 )}
             </div>
             {description && <p className="text-xs text-gray-500 mt-2">{description}</p>}
         </div>
     );
 };

 const CustomTooltip = ({ active, payload, label }) => {
   if (active && payload && payload.length) {
     return (
       <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-md p-3 shadow-lg">
         <p className="text-sm text-gray-400">{`Debate #${label + 1}`}</p> {/* Assuming label is index */}
         {payload.map((entry, index) => (
           <p key={index} style={{ color: entry.color }} className="text-sm font-semibold">
             {`${entry.name}: ${entry.value.toFixed(1)}`}
           </p>
         ))}
       </div>
     );
   }
   return null;
 };

 const TrendChart = ({ data, dataKey, name, color }) => {
     if (!data || data.length < 2) {
         return (
             <div className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 h-72 flex items-center justify-center">
                 <p className="text-gray-600">Not enough data for trend analysis.</p>
             </div>
         );
     }
     // Format data for Recharts - use index as x-axis label for simplicity
     const chartData = data.map((value, index) => ({ name: index, [dataKey]: value }));

     return (
         <div className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 h-72">
             <h3 className="text-lg font-semibold text-gray-400 mb-4">{name} Trend (Last {data.length} Debates)</h3>
             <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: -10 }}> {/* Adjust margins */}
                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                     <XAxis dataKey="name" hide={true} /> {/* Hide X axis labels (index) */}
                     <YAxis domain={[0, 10]} stroke="#6b7280" />
                     <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#4b5563', strokeWidth: 1, strokeDasharray: '3 3' }} />
                     <Line
                         type="monotone"
                         dataKey={dataKey}
                         name={name}
                         stroke={color}
                         strokeWidth={2}
                         dot={{ r: 3, fill: color }}
                         activeDot={{ r: 6, stroke: '#1f2937', strokeWidth: 2 }}
                         isAnimationActive={true}
                         animationDuration={1500}
                     />
                 </LineChart>
             </ResponsiveContainer>
         </div>
     );
 };

 const FallacyDistributionChart = ({ fallacies }) => {
      if (!fallacies || fallacies.length === 0) return null;

      const fallacyCounts = fallacies.reduce((acc, item) => {
          acc[item.fallacy] = (acc[item.fallacy] || 0) + 1;
          return acc;
      }, {});

      const chartData = Object.entries(fallacyCounts).map(([name, value]) => ({ name, count: value }));
      const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57', '#a4de6c'];

      return (
         <div className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 h-72">
             <h3 className="text-lg font-semibold text-gray-400 mb-4">Common Fallacies</h3>
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false}/>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={120} tick={{ fill: '#9ca3af', fontSize: 12 }}/>
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff10' }}/>
                      <Bar dataKey="count" fill="#8884d8" barSize={20}>
                           {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                      </Bar>
                  </BarChart>
              </ResponsiveContainer>
         </div>
      );
 };


 const HistoryIcon = () => ( <svg className="w-4 h-4 mr-3 text-gray-600 group-hover:text-gray-300 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg> );
 const OverallIcon = () => (<svg className="w-4 h-4 mr-3 text-gray-600 group-hover:text-gray-300 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>);

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
             // Reset specific debate state when navigating
             setDebateAnalysis(null);
             setDebateTitle('');
             try {
                 // Always fetch overall analytics and history for the sidebar
                 const [overallRes, historyRes] = await Promise.all([
                     fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/analytics`, { credentials: 'include' }),
                     fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getAllDebates`, { method: 'POST', headers: {'Content-Type': 'application/json'}, credentials: 'include' })
                 ]);

                 if (!overallRes.ok) throw new Error("Failed to load overall analytics.");
                 if (!historyRes.ok) throw new Error("Failed to load debate history.");

                 setOverallAnalytics(await overallRes.json());
                 // Filter history to only include debates that *have* analytics
                 const fullHistory = await historyRes.json();
                 setDebateHistory(fullHistory.filter(d => d.analytics)); // Filter here

                 // If a specific debate is requested, fetch its analysis
                 if (debateId) {
                      // Find the specific debate data from the already fetched history
                     const specificDebate = fullHistory.find(d => d._id === debateId);
                      if (specificDebate) {
                           setDebateTitle(specificDebate.title);
                          if (specificDebate.analytics) {
                              setDebateAnalysis(specificDebate.analytics);
                          } else {
                               setError("Analysis for this debate is still generating or unavailable. Please check back shortly.");
                          }
                      } else {
                          // Debate ID exists but wasn't found in user's history (or has no analytics yet)
                          setError("Debate not found or analysis is pending.");
                      }

                 }

             } catch (err) {
                  console.error("Error fetching analytics data:", err);
                 setError(err.message);
             } finally {
                 setIsLoading(false);
             }
         };

         fetchData();
     }, [debateId]); // Rerun when debateId changes

     const calculateAverage = (scores) => {
         if (!scores || scores.length === 0) return 0;
         const total = scores.reduce((acc, score) => acc + (score || 0), 0); // Handle potential null/undefined scores
         return total / scores.length;
     };

      const calculateTrend = (scores, numPoints = 5) => {
          if (!scores || scores.length < 2) return null; // Need at least two points for a trend
          const relevantScores = scores.slice(-numPoints);
          if (relevantScores.length < 2) return null;
          const first = relevantScores[0];
          const last = relevantScores[relevantScores.length - 1];
          if (first === 0) return last > 0 ? 100 : 0; // Avoid division by zero, show 100% increase if started at 0
          return ((last - first) / first) * 100; // Percentage change
      };

     // Memoized calculations for overall stats
     const avgClarity = useMemo(() => calculateAverage(overallAnalytics?.clarityScores), [overallAnalytics]);
     const avgConciseness = useMemo(() => calculateAverage(overallAnalytics?.concisenessScores), [overallAnalytics]);
     const avgRelevance = useMemo(() => calculateAverage(overallAnalytics?.relevanceScores), [overallAnalytics]);
     const avgArgumentStrength = useMemo(() => calculateAverage(overallAnalytics?.argumentStrengthScores), [overallAnalytics]);
     const avgEvidenceUsage = useMemo(() => calculateAverage(overallAnalytics?.evidenceUsageScores), [overallAnalytics]);
     const avgRebuttalEffectiveness = useMemo(() => calculateAverage(overallAnalytics?.rebuttalEffectivenessScores), [overallAnalytics]);
     const avgFallacies = useMemo(() => calculateAverage(overallAnalytics?.fallacyCounts), [overallAnalytics]);

     // Trends (simplified: change between first and last of the recent scores)
     const clarityTrend = useMemo(() => calculateTrend(overallAnalytics?.clarityScores), [overallAnalytics]);

     // Data for charts (last 10 debates or fewer)
     const last10Clarity = useMemo(() => overallAnalytics?.clarityScores?.slice(-10) || [], [overallAnalytics]);
     const last10ArgStrength = useMemo(() => overallAnalytics?.argumentStrengthScores?.slice(-10) || [], [overallAnalytics]);
     const last10Fallacies = useMemo(() => overallAnalytics?.fallacyCounts?.slice(-10) || [], [overallAnalytics]);


     const renderLoading = () => (
         <div className="flex-1 flex items-center justify-center text-center">
             <div className="w-8 h-8 border-4 border-gray-800 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-gray-400">Loading Analytics...</p>
         </div>
     );

     const renderError = () => (
         <div className="flex-1 flex items-center justify-center text-center p-4">
             <div className="bg-[#111] border border-red-800/50 rounded-lg p-8 max-w-md">
                 <h2 className="text-xl font-semibold text-red-400">Could Not Load Analytics</h2>
                 <p className="text-gray-400 mt-2">{error || "An unknown error occurred."}</p>
                 <button onClick={() => navigate('/dashboard')} className="mt-6 bg-gray-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">
                     Back to Dashboard
                 </button>
             </div>
         </div>
     );

     const renderOverallAnalytics = () => (
          <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
             <AnimateOnScroll>
                 <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Your <AnimatedText text="Performance Hub" /></h1>
                 <p className="mt-2 text-lg text-gray-400">An overview of your progress across all debates.</p>
             </AnimateOnScroll>

              {overallAnalytics && overallAnalytics.totalDebates > 0 ? (
                 <>
                     {/* Key Metrics Row */}
                     <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <AnimateOnScroll>
                             <AnimatedStatCard value={overallAnalytics.totalDebates} label="Total Debates" description="Number of completed & analyzed debates" />
                         </AnimateOnScroll>
                          <AnimateOnScroll stagger={100}>
                              <AnimatedStatCard value={avgClarity} label="Avg. Clarity" format="score" trend={clarityTrend} description="Average score /10" />
                          </AnimateOnScroll>
                           <AnimateOnScroll stagger={200}>
                               <AnimatedStatCard value={avgArgumentStrength} label="Avg. Arg Strength" format="score" description="Average score /10" />
                           </AnimateOnScroll>
                           <AnimateOnScroll stagger={300}>
                               <AnimatedStatCard value={avgFallacies} label="Avg. Fallacies" format="score" description="Average count per debate" />
                           </AnimateOnScroll>
                     </div>

                     {/* Trend Charts Row */}
                     <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <AnimateOnScroll stagger={400}>
                             <TrendChart data={last10Clarity} dataKey="clarity" name="Clarity" color="#3b82f6" />
                          </AnimateOnScroll>
                           <AnimateOnScroll stagger={500}>
                               <TrendChart data={last10ArgStrength} dataKey="strength" name="Argument Strength" color="#a855f7" />
                           </AnimateOnScroll>
                           {/* Add more charts if needed, e.g., Fallacy count */}
                            <AnimateOnScroll stagger={600} className="lg:col-span-2">
                                <TrendChart data={last10Fallacies} dataKey="fallacies" name="Fallacy Count" color="#ef4444" />
                            </AnimateOnScroll>
                     </div>
                 </>
             ) : (
                 <AnimateOnScroll className="mt-12 text-center py-16 bg-[#0A0A0A] border border-gray-900 rounded-2xl">
                     <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                       <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m-9 4h12M3 7h18M5 7h14v10H5z" />
                     </svg>
                     <h3 className="mt-2 text-lg font-medium text-gray-400">No debates analyzed yet</h3>
                     <p className="mt-1 text-gray-500">Complete a debate to see your performance statistics.</p>
                     <div className="mt-6">
                       <button onClick={() => navigate('/dashboard')} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-black">
                         Start New Debate
                       </button>
                     </div>
                 </AnimateOnScroll>
             )}
         </main>
     );

     const renderDebateAnalysis = () => (
          <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
              <AnimateOnScroll>
                 <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight"><AnimatedText text={debateTitle || 'Debate Analysis'} /></h1>
                 <p className="mt-2 text-lg text-gray-400">Detailed breakdown for this specific debate.</p>
              </AnimateOnScroll>

              <div className="mt-8">
                  {/* Score Cards */}
                  <AnimateOnScroll className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                       <AnimatedStatCard value={debateAnalysis.clarityScore} label="Clarity" format="score" description="/ 10"/>
                       <AnimatedStatCard value={debateAnalysis.concisenessScore} label="Conciseness" format="score" description="/ 10"/>
                       <AnimatedStatCard value={debateAnalysis.relevanceScore} label="Relevance" format="score" description="/ 10"/>
                       <AnimatedStatCard value={debateAnalysis.argumentStrengthScore} label="Arg. Strength" format="score" description="/ 10"/>
                       <AnimatedStatCard value={debateAnalysis.evidenceUsageScore} label="Evidence Use" format="score" description="/ 10"/>
                       <AnimatedStatCard value={debateAnalysis.rebuttalEffectivenessScore} label="Rebuttal" format="score" description="/ 10"/>
                 </AnimateOnScroll>

                 {/* Summary */}
                 <AnimateOnScroll stagger={100} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 mb-8">
                     <h3 className="text-2xl font-bold mb-4">AI Coach Summary</h3>
                     <p className="text-gray-400 text-lg whitespace-pre-line">{debateAnalysis.summary}</p>
                 </AnimateOnScroll>

                 {/* Strengths & Improvements */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                     <AnimateOnScroll stagger={200} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
                         <h3 className="text-2xl font-bold mb-4 text-green-400">Key Strengths</h3>
                         {debateAnalysis.strengths.length > 0 ? (
                             <ul className="space-y-4">
                                 {debateAnalysis.strengths.map((item, i) => <li key={i} className="flex items-start text-lg text-gray-300"><span className="text-green-500 mr-3 mt-1">✓</span> {item}</li>)}
                             </ul>
                         ) : <p className="text-gray-500 italic">No specific strengths highlighted in this analysis.</p>}
                     </AnimateOnScroll>
                     <AnimateOnScroll stagger={300} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6">
                         <h3 className="text-2xl font-bold mb-4 text-yellow-400">Improvement Areas</h3>
                          {debateAnalysis.areasForImprovement.length > 0 ? (
                             <ul className="space-y-4">
                                 {debateAnalysis.areasForImprovement.map((item, i) => <li key={i} className="flex items-start text-lg text-gray-300"><span className="text-yellow-500 mr-3 mt-1 font-bold">!</span> {item}</li>)}
                             </ul>
                          ) : <p className="text-gray-500 italic">No specific areas for improvement highlighted.</p>}
                     </AnimateOnScroll>
                 </div>

                 {/* Logical Fallacies */}
                 {debateAnalysis.logicalFallacies && debateAnalysis.logicalFallacies.length > 0 && (
                     <AnimateOnScroll stagger={400} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 mt-8">
                         <h3 className="text-2xl font-bold mb-4 text-red-400">Logical Fallacies ({debateAnalysis.fallacyCount})</h3>
                         <div className="space-y-6">
                             {debateAnalysis.logicalFallacies.map((item, i) => (
                                 <div key={i} className="border-l-4 border-red-800/50 pl-4 py-1">
                                     <p className="font-semibold text-lg text-red-400">{item.fallacy}</p>
                                     <blockquote className="text-gray-400 italic my-2 pl-4 border-l-2 border-gray-700">"{item.quote}"</blockquote>
                                     <p className="text-gray-500 text-sm">{item.explanation}</p>
                                 </div>
                             ))}
                         </div>
                           {/* Add Fallacy Distribution Chart for the specific debate */}
                           <div className="mt-8">
                               <FallacyDistributionChart fallacies={debateAnalysis.logicalFallacies} />
                          </div>
                     </AnimateOnScroll>
                 )}
                  {(!debateAnalysis.logicalFallacies || debateAnalysis.logicalFallacies.length === 0) && (
                      <AnimateOnScroll stagger={400} className="bg-[#0A0A0A] border border-gray-900 rounded-2xl p-6 mt-8">
                          <h3 className="text-2xl font-bold mb-4 text-gray-400">Logical Fallacies (0)</h3>
                          <p className="text-gray-500 italic">No logical fallacies detected in your arguments for this debate. Well done!</p>
                      </AnimateOnScroll>
                  )}
             </div>
          </main>
     );

     return (
         <div className="bg-black text-white min-h-screen flex flex-col font-sans">
             <DashboardHeader />
             <div className="flex flex-1 w-full max-w-screen-2xl mx-auto overflow-hidden"> {/* Added overflow-hidden */}
                  <aside className="w-64 border-r border-gray-900 p-4 pt-10 flex-col flex-shrink-0 hidden md:flex"> {/* Adjusted width */}
                     <nav className="flex-grow overflow-y-auto pr-2 space-y-2 relative [mask-image:linear-gradient(to_bottom,white_90%,transparent_100%)]">
                          {/* Link to Overall Analytics */}
                         <Link
                             to="/analytics"
                             className={`group flex items-center text-lg rounded-md py-2 px-3 transition-colors ${!debateId ? 'bg-gray-800 text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
                          >
                             <OverallIcon />
                             Overall Performance
                          </Link>

                          {/* Divider */}
                          <div className="pt-4 mt-4 border-t border-gray-800">
                               <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">Analyzed Debates</h2>
                          </div>

                         {isLoading ? (
                             <p className="text-gray-500 text-center px-3">Loading history...</p>
                         ) : debateHistory.length > 0 ? (
                             <ul className="space-y-1">
                                 {debateHistory.map((debate, index) => (
                                     <li key={debate._id}> {/* Use li for semantic list */}
                                         <Link
                                             to={`/analytics/${debate._id}`}
                                             className={`group flex items-center text-sm rounded-md py-2 px-3 transition-colors truncate ${debateId === debate._id ? 'bg-gray-800 text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-900'}`}
                                          >
                                             <HistoryIcon />
                                             <span className="flex-1">{debate.title}</span>
                                             {/* Optional: Add date or score preview */}
                                             {/* <span className="text-xs text-gray-500">{new Date(debate.createdAt).toLocaleDateString()}</span> */}
                                          </Link>
                                     </li>
                                 ))}
                             </ul>
                         ) : (
                             <p className="text-gray-500 text-sm text-center px-3 py-4">No analyzed debates yet.</p>
                         )}
                     </nav>
                 </aside>

                 {/* Main Content Area */}
                 {isLoading ? renderLoading() : error ? renderError() : (
                     debateId ? (debateAnalysis ? renderDebateAnalysis() : renderError()) : renderOverallAnalytics()
                 )}
             </div>
         </div>
     );
 };

 export default AnalyticsPage;
