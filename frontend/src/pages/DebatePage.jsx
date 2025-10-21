// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import DashboardHeader from '../components/layouts/DashboardHeader';

// // --- Audio Player Hook ---
// const useAudioPlayer = () => {
//     const [audio, setAudio] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);

//     useEffect(() => {
//         if (audio) {
//             audio.play();
//             setIsPlaying(true);
//             audio.onended = () => setIsPlaying(false);
//         }
//         return () => {
//             if (audio) {
//                 audio.pause();
//                 audio.currentTime = 0;
//             }
//         };
//     }, [audio]);

//     const playAudio = (base64Audio) => {
//         const audioSrc = `data:audio/mp3;base64,${base64Audio}`;
//         setAudio(new Audio(audioSrc));
//     };

//     return { playAudio, isPlaying };
// };


// // --- UI Helper Components ---
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// let recognition;
// if (SpeechRecognition) {
//     recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;
// }

// const MessageContent = ({ text, onReplay, isPlaying }) => {
//     const paragraphs = text.split('\n').map((p, i) => <p key={i} className="text-lg mb-4 last:mb-0">{p}</p>);
//     return (
//         <div>
//             {paragraphs}
//             {onReplay && (
//                 <button onClick={onReplay} className="mt-4 text-gray-500 hover:text-white transition-colors">
//                     <SoundIcon isPlaying={isPlaying}/>
//                 </button>
//             )}
//         </div>
//     );
// };

// const DebateTimer = ({ timeLeft }) => {
//     if (timeLeft === null) return null;
//     const minutes = Math.floor(timeLeft / 60);
//     const seconds = timeLeft % 60;
//     const isEnding = timeLeft <= 60;
//     return <div className={`text-lg font-mono px-3 py-1 rounded-md transition-colors ${isEnding ? 'bg-red-500/20 text-red-400' : 'bg-gray-900 text-gray-300'}`}><span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span></div>;
// };

// const DebateEndModal = ({ isOpen }) => {
//     const navigate = useNavigate();
//     if (!isOpen) return null;
//     return (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in-up" style={{ animationDuration: '300ms' }}>
//             <div className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-8 w-full max-w-md text-center">
//                 <h2 className="text-3xl font-bold text-white mb-2">Debate Concluded</h2>
//                 <p className="text-lg text-gray-400 mb-8">What would you like to do next?</p>
//                 <div className="flex flex-col sm:flex-row gap-4">
//                     <button onClick={() => navigate('/analytics')} className="w-full bg-gray-800 text-gray-200 font-semibold px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-300">View Analytics</button>
//                     <button onClick={() => navigate('/dashboard')} className="w-full bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition-colors duration-300">Start a New Debate</button>
//                 </div>
//             </div>
//         </div>
//     );
// };


// const AiIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.44"></path><path d="m12 2l-2.5 5L12 9.5l2.5-2.5L12 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
// const UserIcon = () => (<div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center font-bold flex-shrink-0">U</div>);
// const MicIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>);
// const SendIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);
// const SoundIcon = ({ isPlaying }) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${isPlaying ? 'text-blue-400' : 'text-gray-500'}`}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d={isPlaying ? "M15.54 8.46a5 5 0 0 1 0 7.07" : "M15.54 8.46a5 5 0 0 1 0 7.07" }></path>{isPlaying && <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>}</svg>);

// // --- Main Debate Page Component ---
// const DebatePage = () => {
//     const { debateId } = useParams();
//     const { playAudio, isPlaying } = useAudioPlayer();
//     const [debate, setDebate] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [userInput, setUserInput] = useState('');
//     const [isRecording, setIsRecording] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isAiTyping, setIsAiTyping] = useState(false);
//     const [isReviewMode, setIsReviewMode] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(null);
//     const [isDebateOver, setIsDebateOver] = useState(false);
//     const [showEndModal, setShowEndModal] = useState(false);
//     const chatEndRef = useRef(null);

//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages, isAiTyping]);
    
//     useEffect(() => {
//         if (!debateId) return;
//         const initializeDebate = async () => {
//             setIsLoading(true);
//             try {
//                 const [debateRes, historyRes] = await Promise.all([
//                     fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/${debateId}`, { credentials: 'include' }),
//                     fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/history/${debateId}`, { credentials: 'include' })
//                 ]);
    
//                 if (!debateRes.ok) throw new Error(`Failed to fetch debate details: ${debateRes.status}`);
//                 if (!historyRes.ok) throw new Error(`Failed to fetch debate history: ${historyRes.status}`);
    
//                 const debateData = await debateRes.json();
//                 const historyData = await historyRes.json();
                
//                 setDebate(debateData);
    
//                 if (historyData.length > 0) {
//                     setMessages(historyData.map(m => ({ sender: m.role, text: m.text })));
//                     setIsReviewMode(true);
//                     setIsDebateOver(true);
//                 } else {
//                     setIsReviewMode(false);
//                     const aiStance = debateData.stance === 'for' ? 'against' : 'for';
//                     const firstArgRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getFirstAiArgument`, {
//                         method: 'POST',
//                         headers: { 'Content-Type': 'application/json' },
//                         credentials: 'include',
//                         body: JSON.stringify({ debateId, topic: debateData.topic, stance: aiStance }),
//                     });
//                     if (!firstArgRes.ok) throw new Error("Failed to get AI's opening argument.");
//                     const { argument, audio } = await firstArgRes.json();
//                     setMessages([{ sender: 'ai', text: argument, audio }]);
//                     playAudio(audio);
//                 }
//             } catch (error) {
//                 setMessages([{ sender: 'system', text: `Error: ${error.message}` }]);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         initializeDebate();
//     }, [debateId]);

//      useEffect(() => {
//         if (!debate || isReviewMode || isLoading) return;
//         const totalSeconds = debate.duration === 5 ? 90 : debate.duration * 60;
//         setTimeLeft(totalSeconds);
//         const interval = setInterval(() => {
//             setTimeLeft(prevTime => {
//                 if (prevTime <= 1) {
//                     clearInterval(interval);
//                     setIsDebateOver(true);
//                     setShowEndModal(true);
//                     setMessages(prev => [...prev, { sender: 'system', text: "The debate has concluded." }]);
//                     return 0;
//                 }
//                 const newTime = prevTime - 1;
//                 let closingTime = debate.duration === 5 ? 20 : (debate.duration === 10 ? 120 : 180);
//                 if (newTime === closingTime) {
//                     setMessages(prev => [...prev, { sender: 'system', text: 'Please make your closing statement.' }]);
//                 }
//                 return newTime;
//             });
//         }, 1000);
//         return () => clearInterval(interval);
//     }, [debate, isReviewMode, isLoading]);

//     useEffect(() => {
//         if (!recognition) return;
//         recognition.onresult = (event) => { const transcript = event.results[0][0].transcript; handleSendMessage(transcript); };
//         recognition.onerror = (event) => { console.error("Speech recognition error", event.error); setIsRecording(false); };
//         recognition.onend = () => setIsRecording(false);
//     }, []);

//     const handleSendMessage = async (text) => {
//         const messageText = (typeof text === 'string' ? text : userInput).trim();
//         if (messageText === '' || isReviewMode || isDebateOver) return;

//         setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
//         setUserInput('');
//         setIsAiTyping(true);

//         try {
//             await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/addUserMessage`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify({ debateId, message: messageText }),
//             });

//             const aiRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getAiResponse`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify({ debateId, userLastArgument: messageText }),
//             });
//             if (!aiRes.ok) throw new Error("Failed to get AI response.");
//             const { response, audio } = await aiRes.json();

//             setMessages(prev => [...prev, { sender: 'ai', text: response, audio }]);
//             playAudio(audio);

//         } catch (error) {
//             setMessages(prev => [...prev, { sender: 'system', text: `Sorry, an error occurred: ${error.message}` }]);
//         } finally {
//             setIsAiTyping(false);
//         }
//     };
    
//     const toggleRecording = () => {
//         if (!recognition || isReviewMode || isDebateOver) return;
//         if (isRecording) { recognition.stop(); } else { recognition.start(); }
//         setIsRecording(!isRecording);
//     };

//     return (
//         <div className="bg-black text-white min-h-screen flex flex-col font-sans">
//             <DashboardHeader />
//             <DebateEndModal isOpen={showEndModal} />
//             <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4">
//                 <div className="mb-4 border-b border-gray-900 pb-4 flex justify-between items-center">
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-200">{debate?.title || 'Loading Debate...'}</h1>
//                         <p className="text-gray-400">{debate?.topic}</p>
//                     </div>
//                     {!isReviewMode && <DebateTimer timeLeft={timeLeft} />}
//                 </div>

//                 <div className="flex-1 overflow-y-auto space-y-8 pr-2">
//                     {isLoading ? <p className="text-center text-gray-400">Initializing debate...</p> : (
//                         messages.map((msg, index) => {
//                             if (msg.sender === 'system') {
//                                 return (<div key={index} className="text-center my-4 animate-fade-in-up"><p className="text-sm italic text-gray-500 bg-gray-900/50 inline-block px-3 py-1 rounded-full">{msg.text}</p></div>)
//                             }
//                             return (
//                                 <div key={index} className={`flex items-start gap-4 animate-fade-in-up ${msg.sender === 'user' ? 'justify-end' : ''}`}>
//                                      {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0"><AiIcon /></div>}
//                                     <div className={`p-4 rounded-2xl max-w-lg ${msg.sender === 'ai' ? 'bg-[#0A0A0A] border border-gray-900' : 'bg-white text-black'}`}>
//                                         <MessageContent text={msg.text} onReplay={msg.audio ? () => playAudio(msg.audio) : null} isPlaying={isPlaying && messages[messages.length - 1] === msg} />
//                                     </div>
//                                     {msg.sender === 'user' && <UserIcon />}
//                                 </div>
//                             )
//                         })
//                     )}
//                     {isAiTyping && (
//                          <div className="flex items-start gap-4 animate-fade-in-up">
//                             <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0"><AiIcon /></div>
//                             <div className="p-4 rounded-2xl max-w-lg bg-[#0A0A0A] border border-gray-900">
//                                 <div className="flex items-center space-x-2">
//                                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
//                                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
//                                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     <div ref={chatEndRef} />
//                 </div>

//                 <div className="mt-8">
//                      <div className="relative">
//                         <input
//                             type="text"
//                             value={userInput}
//                             onChange={(e) => setUserInput(e.target.value)}
//                             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                             placeholder={isReviewMode ? "This is a past debate." : isDebateOver ? "The debate has concluded." : "Type your argument or use the microphone..."}
//                             className="w-full bg-[#0A0A0A] border border-gray-800 rounded-full pl-6 pr-20 py-4 text-lg focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all disabled:opacity-50"
//                             disabled={isAiTyping || isReviewMode || isDebateOver}
//                         />
//                         <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
//                              <button onClick={toggleRecording} disabled={isAiTyping || isReviewMode || isDebateOver} className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-gray-800 hover:bg-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}><MicIcon/></button>
//                              <button onClick={() => handleSendMessage()} disabled={isAiTyping || isReviewMode || isDebateOver} className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><SendIcon /></button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DebatePage;







// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import DashboardHeader from '../components/layouts/DashboardHeader';

// // --- Audio Player Hook ---
// const useAudioPlayer = () => {
//     const audioRef = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);

//     const playAudio = (base64Audio) => {
//         // Stop any currently playing audio before starting a new one
//         if (audioRef.current) {
//             audioRef.current.pause();
//             audioRef.current.currentTime = 0;
//         }
        
//         const audioSrc = `data:audio/mp3;base64,${base64Audio}`;
//         const newAudio = new Audio(audioSrc);
//         audioRef.current = newAudio;

//         newAudio.play().catch(e => console.error("Audio playback failed:", e));
//         setIsPlaying(true);
//         newAudio.onended = () => {
//             setIsPlaying(false);
//             audioRef.current = null;
//         };
//     };

//     const stopAudio = () => {
//         if (audioRef.current) {
//             audioRef.current.pause();
//             audioRef.current.currentTime = 0;
//             setIsPlaying(false);
//             audioRef.current = null;
//         }
//     };

//     return { playAudio, stopAudio, isPlaying };
// };


// // --- UI Helper Components ---
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// let recognition;
// if (SpeechRecognition) {
//     recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;
// }

// const MessageContent = ({ text, onReplay, isPlaying }) => {
//     const paragraphs = text.split('\n').map((p, i) => <p key={i} className="text-lg mb-4 last:mb-0">{p}</p>);
//     return (
//         <div>
//             {paragraphs}
//             {onReplay && (
//                 <button onClick={onReplay} className="mt-4 text-gray-500 hover:text-white transition-colors">
//                     <SoundIcon isPlaying={isPlaying}/>
//                 </button>
//             )}
//         </div>
//     );
// };

// const DebateTimer = ({ timeLeft }) => {
//     if (timeLeft === null) return null;
//     const minutes = Math.floor(timeLeft / 60);
//     const seconds = timeLeft % 60;
//     const isEnding = timeLeft <= 60;
//     return <div className={`text-lg font-mono px-3 py-1 rounded-md transition-colors ${isEnding ? 'bg-red-500/20 text-red-400' : 'bg-gray-900 text-gray-300'}`}><span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span></div>;
// };

// const DebateEndModal = ({ isOpen }) => {
//     const navigate = useNavigate();
//     if (!isOpen) return null;
//     return (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in-up" style={{ animationDuration: '300ms' }}>
//             <div className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-8 w-full max-w-md text-center">
//                 <h2 className="text-3xl font-bold text-white mb-2">Debate Concluded</h2>
//                 <p className="text-lg text-gray-400 mb-8">What would you like to do next?</p>
//                 <div className="flex flex-col sm:flex-row gap-4">
//                     <button onClick={() => navigate(`/analytics/${useParams().debateId}`)} className="w-full bg-gray-800 text-gray-200 font-semibold px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-300">View Analytics</button>
//                     <button onClick={() => navigate('/dashboard')} className="w-full bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition-colors duration-300">Start a New Debate</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const AudioControl = ({ isPlaying, onStop }) => {
//     if (!isPlaying) return null;

//     return (
//         <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
//             <button
//                 onClick={onStop}
//                 className="bg-gray-800/80 backdrop-blur-md text-white rounded-full p-3 shadow-lg hover:bg-gray-700 transition-colors"
//                 aria-label="Stop audio playback"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//                 </svg>
//             </button>
//         </div>
//     );
// };


// const AiIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.44"></path><path d="m12 2l-2.5 5L12 9.5l2.5-2.5L12 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
// const UserIcon = () => (<div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center font-bold flex-shrink-0">U</div>);
// const MicIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>);
// const SendIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);
// const SoundIcon = ({ isPlaying }) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${isPlaying ? 'text-blue-400' : 'text-gray-500'}`}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d={isPlaying ? "M15.54 8.46a5 5 0 0 1 0 7.07" : "M15.54 8.46a5 5 0 0 1 0 7.07" }></path>{isPlaying && <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>}</svg>);

// // --- Main Debate Page Component ---
// const DebatePage = () => {
//     const { debateId } = useParams();
//     const { playAudio, stopAudio, isPlaying } = useAudioPlayer();
//     const [debate, setDebate] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [userInput, setUserInput] = useState('');
//     const [isRecording, setIsRecording] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isAiTyping, setIsAiTyping] = useState(false);
//     const [isReviewMode, setIsReviewMode] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(null);
//     const [isDebateOver, setIsDebateOver] = useState(false);
//     const [showEndModal, setShowEndModal] = useState(false);
//     const chatEndRef = useRef(null);

//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages, isAiTyping]);
    
//     useEffect(() => {
//         if (!debateId) return;
//         const initializeDebate = async () => {
//             setIsLoading(true);
//             try {
//                 const [debateRes, historyRes] = await Promise.all([
//                     fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/${debateId}`, { credentials: 'include' }),
//                     fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/history/${debateId}`, { credentials: 'include' })
//                 ]);
    
//                 if (!debateRes.ok) throw new Error(`Failed to fetch debate details: ${debateRes.status}`);
//                 if (!historyRes.ok) throw new Error(`Failed to fetch debate history: ${historyRes.status}`);
    
//                 const debateData = await debateRes.json();
//                 const historyData = await historyRes.json();
                
//                 setDebate(debateData);
    
//                 if (historyData.length > 0) {
//                     setMessages(historyData.map(m => ({ sender: m.role, text: m.text })));
//                     setIsReviewMode(true);
//                     setIsDebateOver(true);
//                 } else {
//                     setIsReviewMode(false);
//                     const aiStance = debateData.stance === 'for' ? 'against' : 'for';
//                     const firstArgRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getFirstAiArgument`, {
//                         method: 'POST',
//                         headers: { 'Content-Type': 'application/json' },
//                         credentials: 'include',
//                         body: JSON.stringify({ debateId, topic: debateData.topic, stance: aiStance }),
//                     });
//                     if (!firstArgRes.ok) throw new Error("Failed to get AI's opening argument.");
//                     const { argument, audio } = await firstArgRes.json();
//                     setMessages([{ sender: 'ai', text: argument, audio }]);
//                     playAudio(audio);
//                 }
//             } catch (error) {
//                 setMessages([{ sender: 'system', text: `Error: ${error.message}` }]);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         initializeDebate();
//     }, [debateId]);

//      useEffect(() => {
//         if (!debate || isReviewMode || isLoading) return;
//         const totalSeconds = debate.duration * 60;
//         setTimeLeft(totalSeconds);
//         const interval = setInterval(() => {
//             setTimeLeft(prevTime => {
//                 if (prevTime <= 1) {
//                     clearInterval(interval);
//                     setIsDebateOver(true);
//                     setShowEndModal(true);
//                     setMessages(prev => [...prev, { sender: 'system', text: "The debate has concluded." }]);
//                     return 0;
//                 }
//                 const newTime = prevTime - 1;
//                 let closingTime;

//                 if (debate.duration === 5) closingTime = 60;
//                 else if (debate.duration === 10) closingTime = 120;
//                 else if (debate.duration === 15) closingTime = 180;
                
//                 if (newTime === closingTime) {
//                     setMessages(prev => [...prev, { sender: 'system', text: 'Please make your closing statement.' }]);
//                 }
//                 return newTime;
//             });
//         }, 1000);
//         return () => clearInterval(interval);
//     }, [debate, isReviewMode, isLoading]);

//     useEffect(() => {
//         if (!recognition) return;
//         recognition.onresult = (event) => { const transcript = event.results[0][0].transcript; handleSendMessage(transcript); };
//         recognition.onerror = (event) => { console.error("Speech recognition error", event.error); setIsRecording(false); };
//         recognition.onend = () => setIsRecording(false);
//     }, []);

//     const handleSendMessage = async (text) => {
//         const messageText = (typeof text === 'string' ? text : userInput).trim();
//         if (messageText === '' || isReviewMode || isDebateOver || isPlaying) return;

//         setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
//         setUserInput('');
//         setIsAiTyping(true);

//         try {
//             await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/addUserMessage`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify({ debateId, message: messageText }),
//             });

//             const aiRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getAiResponse`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify({ debateId, userLastArgument: messageText }),
//             });
//             if (!aiRes.ok) throw new Error("Failed to get AI response.");
//             const { response, audio } = await aiRes.json();

//             setMessages(prev => [...prev, { sender: 'ai', text: response, audio }]);
//             playAudio(audio);

//         } catch (error) {
//             setMessages(prev => [...prev, { sender: 'system', text: `Sorry, an error occurred: ${error.message}` }]);
//         } finally {
//             setIsAiTyping(false);
//         }
//     };
    
//     const toggleRecording = () => {
//         if (!recognition || isReviewMode || isDebateOver || isPlaying) return;
//         if (isRecording) { recognition.stop(); } else { recognition.start(); }
//         setIsRecording(!isRecording);
//     };

//     return (
//         <div className="bg-black text-white min-h-screen flex flex-col font-sans">
//             <DashboardHeader />
//             <DebateEndModal isOpen={showEndModal} />
//             <AudioControl isPlaying={isPlaying} onStop={stopAudio} />

//             <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4">
//                 <div className="mb-4 border-b border-gray-900 pb-4 flex justify-between items-center">
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-200">{debate?.title || 'Loading Debate...'}</h1>
//                         <p className="text-gray-400">{debate?.topic}</p>
//                     </div>
//                     {!isReviewMode && <DebateTimer timeLeft={timeLeft} />}
//                 </div>

//                 <div className="flex-1 overflow-y-auto space-y-8 pr-2">
//                     {isLoading ? <p className="text-center text-gray-400">Initializing debate...</p> : (
//                         messages.map((msg, index) => {
//                             if (msg.sender === 'system') {
//                                 return (<div key={index} className="text-center my-4 animate-fade-in-up"><p className="text-sm italic text-gray-500 bg-gray-900/50 inline-block px-3 py-1 rounded-full">{msg.text}</p></div>)
//                             }
//                             return (
//                                 <div key={index} className={`flex items-start gap-4 animate-fade-in-up ${msg.sender === 'user' ? 'justify-end' : ''}`}>
//                                      {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0"><AiIcon /></div>}
//                                     <div className={`p-4 rounded-2xl max-w-lg ${msg.sender === 'ai' ? 'bg-[#0A0A0A] border border-gray-900' : 'bg-white text-black'}`}>
//                                         <MessageContent text={msg.text} onReplay={msg.audio ? () => playAudio(msg.audio) : null} isPlaying={isPlaying && messages[messages.length - 1] === msg} />
//                                     </div>
//                                     {msg.sender === 'user' && <UserIcon />}
//                                 </div>
//                             )
//                         })
//                     )}
//                     {isAiTyping && (
//                          <div className="flex items-start gap-4 animate-fade-in-up">
//                             <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0"><AiIcon /></div>
//                             <div className="p-4 rounded-2xl max-w-lg bg-[#0A0A0A] border border-gray-900">
//                                 <div className="flex items-center space-x-2">
//                                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
//                                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
//                                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     <div ref={chatEndRef} />
//                 </div>

//                 <div className="mt-8">
//                      <div className="relative">
//                         <input
//                             type="text"
//                             value={userInput}
//                             onChange={(e) => setUserInput(e.target.value)}
//                             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                             placeholder={
//                                 isPlaying ? "AI is speaking..." :
//                                 isReviewMode ? "This is a past debate." :
//                                 isDebateOver ? "The debate has concluded." :
//                                 "Type your argument or use the microphone..."
//                             }
//                             className="w-full bg-[#0A0A0A] border border-gray-800 rounded-full pl-6 pr-20 py-4 text-lg focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all disabled:opacity-50"
//                             disabled={isAiTyping || isReviewMode || isDebateOver || isPlaying}
//                         />
//                         <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
//                              <button onClick={toggleRecording} disabled={isAiTyping || isReviewMode || isDebateOver || isPlaying} className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-gray-800 hover:bg-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}><MicIcon/></button>
//                              <button onClick={() => handleSendMessage()} disabled={isAiTyping || isReviewMode || isDebateOver || isPlaying} className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><SendIcon /></button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DebatePage;







// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import DashboardHeader from '../components/layouts/DashboardHeader';

// // --- Audio Player Hook ---
// const useAudioPlayer = () => {
//     const audioRef = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);

//     const playAudio = (base64Audio) => {
//         if (audioRef.current) {
//             audioRef.current.pause();
//             audioRef.current.currentTime = 0;
//         }
//         const audioSrc = `data:audio/mp3;base64,${base64Audio}`;
//         const newAudio = new Audio(audioSrc);
//         audioRef.current = newAudio;
//         newAudio.play().catch(e => console.error("Audio playback failed:", e));
//         setIsPlaying(true);
//         newAudio.onended = () => {
//             setIsPlaying(false);
//             audioRef.current = null;
//         };
//     };

//     const stopAudio = () => {
//         if (audioRef.current) {
//             audioRef.current.pause();
//             audioRef.current.currentTime = 0;
//             setIsPlaying(false);
//             audioRef.current = null;
//         }
//     };

//     return { playAudio, stopAudio, isPlaying };
// };


// // --- UI Helper Components ---
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// let recognition;
// if (SpeechRecognition) {
//     recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;
// }

// const MessageContent = ({ text, onReplay, isPlaying }) => {
//     const paragraphs = text.split('\n').map((p, i) => <p key={i} className="text-lg mb-4 last:mb-0">{p}</p>);
//     return (
//         <div>
//             {paragraphs}
//             {onReplay && (
//                 <button onClick={onReplay} className="mt-4 text-gray-500 hover:text-white transition-colors">
//                     <SoundIcon isPlaying={isPlaying}/>
//                 </button>
//             )}
//         </div>
//     );
// };

// const DebateTimer = ({ timeLeft }) => {
//     if (timeLeft === null) return null;
//     const minutes = Math.floor(timeLeft / 60);
//     const seconds = timeLeft % 60;
//     const isEnding = timeLeft <= 60;
//     return <div className={`text-lg font-mono px-3 py-1 rounded-md transition-colors ${isEnding ? 'bg-red-500/20 text-red-400' : 'bg-gray-900 text-gray-300'}`}><span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span></div>;
// };

// const DebateEndModal = ({ isOpen, debateId }) => {
//     const navigate = useNavigate();
//     if (!isOpen) return null;
//     return (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in-up" style={{ animationDuration: '300ms' }}>
//             <div className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-8 w-full max-w-md text-center">
//                 <h2 className="text-3xl font-bold text-white mb-2">Debate Concluded</h2>
//                 <p className="text-lg text-gray-400 mb-8">What would you like to do next?</p>
//                 <div className="flex flex-col sm:flex-row gap-4">
//                     <button onClick={() => navigate(`/analytics/${debateId}`)} className="w-full bg-gray-800 text-gray-200 font-semibold px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-300">View Analytics</button>
//                     <button onClick={() => navigate('/dashboard')} className="w-full bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition-colors duration-300">Start a New Debate</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const AudioControl = ({ isPlaying, onStop }) => {
//     if (!isPlaying) return null;
//     return (
//         <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
//             <button onClick={onStop} className="bg-gray-800/80 backdrop-blur-md text-white rounded-full p-3 shadow-lg hover:bg-gray-700 transition-colors" aria-label="Stop audio playback">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
//             </button>
//         </div>
//     );
// };


// const AiIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.44"></path><path d="m12 2l-2.5 5L12 9.5l2.5-2.5L12 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
// const UserIcon = () => (<div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center font-bold flex-shrink-0">U</div>);
// const MicIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>);
// const SendIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);
// const SoundIcon = ({ isPlaying }) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${isPlaying ? 'text-blue-400' : 'text-gray-500'}`}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d={isPlaying ? "M15.54 8.46a5 5 0 0 1 0 7.07" : "M15.54 8.46a5 5 0 0 1 0 7.07" }></path>{isPlaying && <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>}</svg>);

// // --- Main Debate Page Component ---
// const DebatePage = () => {
//     const { debateId } = useParams();
//     const { playAudio, stopAudio, isPlaying } = useAudioPlayer();
//     const [debate, setDebate] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [userInput, setUserInput] = useState('');
//     const [isRecording, setIsRecording] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isAiTyping, setIsAiTyping] = useState(false);
//     const [isReviewMode, setIsReviewMode] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(null);
//     const [isDebateOver, setIsDebateOver] = useState(false);
//     const [showEndModal, setShowEndModal] = useState(false);
//     const chatEndRef = useRef(null);

//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages, isAiTyping]);
    
//     useEffect(() => {
//         if (!debateId) return;
//         const initializeDebate = async () => {
//             setIsLoading(true);
//             try {
//                 const [debateRes, historyRes] = await Promise.all([
//                     fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/${debateId}`, { credentials: 'include' }),
//                     fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/history/${debateId}`, { credentials: 'include' })
//                 ]);
    
//                 if (!debateRes.ok) throw new Error(`Failed to fetch debate details: ${debateRes.status}`);
//                 if (!historyRes.ok) throw new Error(`Failed to fetch debate history: ${historyRes.status}`);
    
//                 const debateData = await debateRes.json();
//                 const historyData = await historyRes.json();
                
//                 setDebate(debateData);
    
//                 if (historyData.length > 0) {
//                     setMessages(historyData.map(m => ({ sender: m.role, text: m.text })));
//                     setIsReviewMode(true);
//                     setIsDebateOver(true);
//                 } else {
//                     setIsReviewMode(false);
//                     const aiStance = debateData.stance === 'for' ? 'against' : 'for';
//                     const firstArgRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getFirstAiArgument`, {
//                         method: 'POST',
//                         headers: { 'Content-Type': 'application/json' },
//                         credentials: 'include',
//                         body: JSON.stringify({ debateId, topic: debateData.topic, stance: aiStance }),
//                     });
//                     if (!firstArgRes.ok) throw new Error("Failed to get AI's opening argument.");
//                     const { argument, audio } = await firstArgRes.json();
//                     setMessages([{ sender: 'ai', text: argument, audio }]);
//                     playAudio(audio);
//                 }
//             } catch (error) {
//                 setMessages([{ sender: 'system', text: `Error: ${error.message}` }]);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         initializeDebate();
//     }, [debateId]);

//      useEffect(() => {
//         if (!debate || isReviewMode || isLoading) return;
//         const totalSeconds = debate.duration * 60 - 180;
//         setTimeLeft(totalSeconds);

//         const handleDebateEnd = async () => {
//             setIsDebateOver(true);
//             setShowEndModal(true);
//             setMessages(prev => [...prev, { sender: 'system', text: "The debate has concluded. Generating analysis..." }]);
//             try {
//                 await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/analyze/${debateId}`, { 
//                     method: 'POST',
//                     credentials: 'include' 
//                 });
//             } catch (error) {
//                 console.error("Failed to trigger debate analysis:", error);
//                  setMessages(prev => [...prev, { sender: 'system', text: "Could not generate analysis." }]);
//             }
//         };

//         const interval = setInterval(() => {
//             setTimeLeft(prevTime => {
//                 if (prevTime <= 1) {
//                     clearInterval(interval);
//                     handleDebateEnd();
//                     return 0;
//                 }
//                 const newTime = prevTime - 1;
//                 let closingTime;
//                 if (debate.duration === 5) closingTime = 60;
//                 else if (debate.duration === 10) closingTime = 120;
//                 else if (debate.duration === 15) closingTime = 180;
//                 if (newTime === closingTime) {
//                     setMessages(prev => [...prev, { sender: 'system', text: 'Please make your closing statement.' }]);
//                 }
//                 return newTime;
//             });
//         }, 1000);
//         return () => clearInterval(interval);
//     }, [debate, isReviewMode, isLoading, debateId]);

//     useEffect(() => {
//         if (!recognition) return;
//         recognition.onresult = (event) => { const transcript = event.results[0][0].transcript; handleSendMessage(transcript); };
//         recognition.onerror = (event) => { console.error("Speech recognition error", event.error); setIsRecording(false); };
//         recognition.onend = () => setIsRecording(false);
//     }, []);

//     const handleSendMessage = async (text) => {
//         const messageText = (typeof text === 'string' ? text : userInput).trim();
//         if (messageText === '' || isReviewMode || isDebateOver || isPlaying) return;

//         setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
//         setUserInput('');
//         setIsAiTyping(true);

//         try {
//             await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/addUserMessage`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify({ debateId, message: messageText }),
//             });

//             const aiRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getAiResponse`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify({ debateId, userLastArgument: messageText }),
//             });
//             if (!aiRes.ok) throw new Error("Failed to get AI response.");
//             const { response, audio } = await aiRes.json();

//             setMessages(prev => [...prev, { sender: 'ai', text: response, audio }]);
//             playAudio(audio);

//         } catch (error) {
//             setMessages(prev => [...prev, { sender: 'system', text: `Sorry, an error occurred: ${error.message}` }]);
//         } finally {
//             setIsAiTyping(false);
//         }
//     };
    
//     const toggleRecording = () => {
//         if (!recognition || isReviewMode || isDebateOver || isPlaying) return;
//         if (isRecording) { recognition.stop(); } else { recognition.start(); }
//         setIsRecording(!isRecording);
//     };

//     return (
//         <div className="bg-black text-white min-h-screen flex flex-col font-sans">
//             <DashboardHeader />
//             <DebateEndModal isOpen={showEndModal} debateId={debateId} />
//             <AudioControl isPlaying={isPlaying} onStop={stopAudio} />

//             <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4">
//                 <div className="mb-4 border-b border-gray-900 pb-4 flex justify-between items-center">
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-200">{debate?.title || 'Loading Debate...'}</h1>
//                         <p className="text-gray-400">{debate?.topic}</p>
//                     </div>
//                     {!isReviewMode && <DebateTimer timeLeft={timeLeft} />}
//                 </div>

//                 <div className="flex-1 overflow-y-auto space-y-8 pr-2">
//                     {isLoading ? <p className="text-center text-gray-400">Initializing debate...</p> : (
//                         messages.map((msg, index) => {
//                             if (msg.sender === 'system') {
//                                 return (<div key={index} className="text-center my-4 animate-fade-in-up"><p className="text-sm italic text-gray-500 bg-gray-900/50 inline-block px-3 py-1 rounded-full">{msg.text}</p></div>)
//                             }
//                             return (
//                                 <div key={index} className={`flex items-start gap-4 animate-fade-in-up ${msg.sender === 'user' ? 'justify-end' : ''}`}>
//                                      {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0"><AiIcon /></div>}
//                                     <div className={`p-4 rounded-2xl max-w-lg ${msg.sender === 'ai' ? 'bg-[#0A0A0A] border border-gray-900' : 'bg-white text-black'}`}>
//                                         <MessageContent text={msg.text} onReplay={msg.audio ? () => playAudio(msg.audio) : null} isPlaying={isPlaying && messages[messages.length - 1] === msg} />
//                                     </div>
//                                     {msg.sender === 'user' && <UserIcon />}
//                                 </div>
//                             )
//                         })
//                     )}
//                     {isAiTyping && (
//                          <div className="flex items-start gap-4 animate-fade-in-up">
//                             <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0"><AiIcon /></div>
//                             <div className="p-4 rounded-2xl max-w-lg bg-[#0A0A0A] border border-gray-900">
//                                 <div className="flex items-center space-x-2">
//                                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
//                                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
//                                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     <div ref={chatEndRef} />
//                 </div>

//                 <div className="mt-8">
//                      <div className="relative">
//                         <input
//                             type="text"
//                             value={userInput}
//                             onChange={(e) => setUserInput(e.target.value)}
//                             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                             placeholder={
//                                 isPlaying ? "AI is speaking..." :
//                                 isReviewMode ? "This is a past debate." :
//                                 isDebateOver ? "The debate has concluded." :
//                                 "Type your argument or use the microphone..."
//                             }
//                             className="w-full bg-[#0A0A0A] border border-gray-800 rounded-full pl-6 pr-20 py-4 text-lg focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all disabled:opacity-50"
//                             disabled={isAiTyping || isReviewMode || isDebateOver || isPlaying}
//                         />
//                         <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
//                              <button onClick={toggleRecording} disabled={isAiTyping || isReviewMode || isDebateOver || isPlaying} className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-gray-800 hover:bg-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}><MicIcon/></button>
//                              <button onClick={() => handleSendMessage()} disabled={isAiTyping || isReviewMode || isDebateOver || isPlaying} className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><SendIcon /></button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DebatePage;






import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/layouts/DashboardHeader';

// --- Audio Player Hook ---
const useAudioPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = (base64Audio) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        const audioSrc = `data:audio/mp3;base64,${base64Audio}`;
        const newAudio = new Audio(audioSrc);
        audioRef.current = newAudio;
        newAudio.play().catch(e => console.error("Audio playback failed:", e));
        setIsPlaying(true);
        newAudio.onended = () => {
            setIsPlaying(false);
            audioRef.current = null;
        };
    };

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            audioRef.current = null;
        }
    };

    return { playAudio, stopAudio, isPlaying };
};


// --- UI Helper Components ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
}

const MessageContent = ({ text, onReplay, isPlaying }) => {
    const paragraphs = text.split('\n').map((p, i) => <p key={i} className="text-lg mb-4 last:mb-0">{p}</p>);
    return (
        <div>
            {paragraphs}
            {onReplay && (
                <button onClick={onReplay} className="mt-4 text-gray-500 hover:text-white transition-colors">
                    <SoundIcon isPlaying={isPlaying}/>
                </button>
            )}
        </div>
    );
};

const DebateTimer = ({ timeLeft }) => {
    if (timeLeft === null) return null;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const isEnding = timeLeft <= 60;
    return <div className={`text-lg font-mono px-3 py-1 rounded-md transition-colors ${isEnding ? 'bg-red-500/20 text-red-400' : 'bg-gray-900 text-gray-300'}`}><span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span></div>;
};

const DebateEndModal = ({ isOpen, debateId }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in-up" style={{ animationDuration: '300ms' }}>
            <div className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-8 w-full max-w-md text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Debate Concluded</h2>
                <p className="text-lg text-gray-400 mb-8">What would you like to do next?</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => navigate(`/analytics/${debateId}`)} className="w-full bg-gray-800 text-gray-200 font-semibold px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-300">View Analytics</button>
                    <button onClick={() => navigate('/dashboard')} className="w-full bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition-colors duration-300">Start a New Debate</button>
                </div>
            </div>
        </div>
    );
};

const AudioControl = ({ isPlaying, onStop }) => {
    if (!isPlaying) return null;
    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
            <button onClick={onStop} className="bg-gray-800/80 backdrop-blur-md text-white rounded-full p-3 shadow-lg hover:bg-gray-700 transition-colors" aria-label="Stop audio playback">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><rect x="6" y="6" width="12" height="12"></rect></svg>
            </button>
        </div>
    );
};


const AiIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.44"></path><path d="m12 2l-2.5 5L12 9.5l2.5-2.5L12 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const UserIcon = () => (<div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center font-bold flex-shrink-0">U</div>);
const MicIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>);
const SendIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);
const SoundIcon = ({ isPlaying }) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${isPlaying ? 'text-blue-400' : 'text-gray-500'}`}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d={isPlaying ? "M15.54 8.46a5 5 0 0 1 0 7.07" : "M15.54 8.46a5 5 0 0 1 0 7.07" }></path>{isPlaying && <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>}</svg>);

// --- Main Debate Page Component ---
const DebatePage = () => {
    const { debateId } = useParams();
    const { playAudio, stopAudio, isPlaying } = useAudioPlayer();
    const [debate, setDebate] = useState(null);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isDebateOver, setIsDebateOver] = useState(false);
    const [showEndModal, setShowEndModal] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isAiTyping]);
    
    useEffect(() => {
        if (!debateId) return;
        const initializeDebate = async () => {
            setIsLoading(true);
            try {
                const [debateRes, historyRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/${debateId}`, { credentials: 'include' }),
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/history/${debateId}`, { credentials: 'include' })
                ]);
    
                if (!debateRes.ok) throw new Error(`Failed to fetch debate details: ${debateRes.status}`);
                if (!historyRes.ok) throw new Error(`Failed to fetch debate history: ${historyRes.status}`);
    
                const debateData = await debateRes.json();
                const historyData = await historyRes.json();
                
                setDebate(debateData);
    
                if (historyData.length > 0) {
                    setMessages(historyData.map(m => ({ sender: m.role, text: m.text })));
                    setIsReviewMode(true);
                    setIsDebateOver(true);
                } else {
                    setIsReviewMode(false);
                    const aiStance = debateData.stance === 'for' ? 'against' : 'for';
                    const firstArgRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getFirstAiArgument`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ debateId, topic: debateData.topic, stance: aiStance }),
                    });
                    if (!firstArgRes.ok) throw new Error("Failed to get AI's opening argument.");
                    const { argument, audio } = await firstArgRes.json();
                    setMessages([{ sender: 'ai', text: argument, audio }]);
                    playAudio(audio);
                }
            } catch (error) {
                setMessages([{ sender: 'system', text: `Error: ${error.message}` }]);
            } finally {
                setIsLoading(false);
            }
        };
        initializeDebate();
    }, [debateId]);

     useEffect(() => {
        if (!debate || isReviewMode || isLoading) return;
        const totalSeconds = debate.duration * 60;
        setTimeLeft(totalSeconds);

        const handleDebateEnd = async () => {
            setIsDebateOver(true);
            setShowEndModal(true);
            setMessages(prev => [...prev, { sender: 'system', text: "The debate has concluded. Generating analysis..." }]);
            try {
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/analyze/${debateId}`, { 
                    method: 'POST',
                    credentials: 'include' 
                });
            } catch (error) {
                 setMessages(prev => [...prev, { sender: 'system', text: "Could not generate analysis." }]);
            }
        };

        const interval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    handleDebateEnd();
                    return 0;
                }
                const newTime = prevTime - 1;
                let closingTime;
                if (debate.duration === 5) closingTime = 60;
                else if (debate.duration === 10) closingTime = 120;
                else if (debate.duration === 15) closingTime = 180;
                if (newTime === closingTime) {
                    setMessages(prev => [...prev, { sender: 'system', text: 'Please make your closing statement.' }]);
                }
                return newTime;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [debate, isReviewMode, isLoading, debateId]);

    useEffect(() => {
        if (!recognition) return;
        recognition.onresult = (event) => { const transcript = event.results[0][0].transcript; handleSendMessage(transcript); };
        recognition.onerror = (event) => { console.error("Speech recognition error", event.error); setIsRecording(false); };
        recognition.onend = () => setIsRecording(false);
    }, []);

    const handleSendMessage = async (text) => {
        const messageText = (typeof text === 'string' ? text : userInput).trim();
        if (messageText === '' || isReviewMode || isDebateOver || isPlaying) return;

        setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
        setUserInput('');
        setIsAiTyping(true);

        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/addUserMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ debateId, message: messageText }),
            });

            const aiRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getAiResponse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ debateId, userLastArgument: messageText }),
            });
            if (!aiRes.ok) throw new Error("Failed to get AI response.");
            const { response, audio } = await aiRes.json();

            setMessages(prev => [...prev, { sender: 'ai', text: response, audio }]);
            playAudio(audio);

        } catch (error) {
            setMessages(prev => [...prev, { sender: 'system', text: `Sorry, an error occurred: ${error.message}` }]);
        } finally {
            setIsAiTyping(false);
        }
    };
    
    const toggleRecording = () => {
        if (!recognition || isReviewMode || isDebateOver || isPlaying) return;
        if (isRecording) { recognition.stop(); } else { recognition.start(); }
        setIsRecording(!isRecording);
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col font-sans">
            <DashboardHeader />
            <DebateEndModal isOpen={showEndModal} debateId={debateId} />
            <AudioControl isPlaying={isPlaying} onStop={stopAudio} />

            <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4">
                <div className="mb-4 border-b border-gray-900 pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-200">{debate?.title || 'Loading Debate...'}</h1>
                        <p className="text-gray-400">{debate?.topic}</p>
                    </div>
                    {!isReviewMode && <DebateTimer timeLeft={timeLeft} />}
                </div>

                <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                    {isLoading ? <p className="text-center text-gray-400">Initializing debate...</p> : (
                        messages.map((msg, index) => {
                            if (msg.sender === 'system') {
                                return (<div key={index} className="text-center my-4 animate-fade-in-up"><p className="text-sm italic text-gray-500 bg-gray-900/50 inline-block px-3 py-1 rounded-full">{msg.text}</p></div>)
                            }
                            return (
                                <div key={index} className={`flex items-start gap-4 animate-fade-in-up ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                     {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0"><AiIcon /></div>}
                                    <div className={`p-4 rounded-2xl max-w-lg ${msg.sender === 'ai' ? 'bg-[#0A0A0A] border border-gray-900' : 'bg-white text-black'}`}>
                                        <MessageContent text={msg.text} onReplay={msg.audio ? () => playAudio(msg.audio) : null} isPlaying={isPlaying && messages[messages.length - 1] === msg} />
                                    </div>
                                    {msg.sender === 'user' && <UserIcon />}
                                </div>
                            )
                        })
                    )}
                    {isAiTyping && (
                         <div className="flex items-start gap-4 animate-fade-in-up">
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0"><AiIcon /></div>
                            <div className="p-4 rounded-2xl max-w-lg bg-[#0A0A0A] border border-gray-900">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div className="mt-8">
                     <div className="relative">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder={
                                isPlaying ? "AI is speaking..." :
                                isReviewMode ? "This is a past debate." :
                                isDebateOver ? "The debate has concluded." :
                                "Type your argument or use the microphone..."
                            }
                            className="w-full bg-[#0A0A0A] border border-gray-800 rounded-full pl-6 pr-20 py-4 text-lg focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all disabled:opacity-50"
                            disabled={isAiTyping || isReviewMode || isDebateOver || isPlaying}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                             <button onClick={toggleRecording} disabled={isAiTyping || isReviewMode || isDebateOver || isPlaying} className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-gray-800 hover:bg-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}><MicIcon/></button>
                             <button onClick={() => handleSendMessage()} disabled={isAiTyping || isReviewMode || isDebateOver || isPlaying} className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><SendIcon /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebatePage;