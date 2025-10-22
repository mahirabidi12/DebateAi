 import React, { useState, useEffect, useRef, useCallback } from 'react';
 import { useParams, useNavigate } from 'react-router-dom';
 import DashboardHeader from '../components/layouts/DashboardHeader'; // Corrected path

 // --- Audio Player Hook ---
 const useAudioPlayer = () => {
     const audioRef = useRef(null);
     const [isPlaying, setIsPlaying] = useState(false);
     const [currentAudioSrc, setCurrentAudioSrc] = useState(null); // Keep track of the current audio source

     // Function to stop audio safely
     const stopAudio = useCallback(() => {
         if (audioRef.current) {
             console.log("Stopping audio:", audioRef.current.src.substring(0, 30));
             audioRef.current.pause();
             audioRef.current.currentTime = 0; // Reset time
             // Remove listeners to prevent memory leaks if audio ends after stop is called
             audioRef.current.onended = null;
             audioRef.current.onerror = null;
             audioRef.current = null; // Clear the ref
         }
         // Only update state if it's currently true, prevents unnecessary re-renders
         setIsPlaying(current => {
            if (current) {
                setCurrentAudioSrc(null); // Reset source on stop
                return false;
            }
            return current;
         });
     }, []); // No dependencies needed for stopAudio

     // Helper function to create and play audio instance (defined outside playAudio for clarity)
     const createAndPlayAudio = useCallback((audioSrc) => {
         console.log("Playing audio:", audioSrc.substring(0, 30) + "...");
         // Ensure any lingering ref is cleared if state says not playing
         if (!isPlaying && audioRef.current) {
            stopAudio(); // Call stopAudio to ensure state consistency
         }

         const newAudio = new Audio(audioSrc);
         audioRef.current = newAudio;
         setCurrentAudioSrc(audioSrc);

         newAudio.onended = () => {
             console.log("Audio ended.");
             setIsPlaying(false);
             // Clear ref only on natural end to allow replay
             // audioRef.current = null; // Keep ref for potential replay
             setCurrentAudioSrc(null);
         };
         newAudio.onerror = (e) => {
             console.error("Audio playback error:", e);
             setIsPlaying(false);
             setCurrentAudioSrc(null);
             // Clear the ref on error
             audioRef.current = null;
         };

         newAudio.play()
             .then(() => {
                 setIsPlaying(true);
                 console.log("Audio playback started.");
             })
             .catch(e => {
                 if (e.name === 'AbortError') {
                     console.warn("Audio play() request interrupted.");
                 } else {
                     console.error("Audio playback failed:", e);
                 }
                 // Ensure state is correct even if play fails
                 setIsPlaying(false);
                 setCurrentAudioSrc(null);
                 audioRef.current = null; // Clear ref on play error
             });
     // Need isPlaying and stopAudio as dependencies here because it uses them
     }, [isPlaying, stopAudio]);

     const playAudio = useCallback((base64Audio) => {
         const audioSrc = `data:audio/mp3;base64,${base64Audio}`;

         // If different audio is requested, stop the current one first.
         if (audioRef.current && currentAudioSrc !== audioSrc) {
             console.log("Stopping previous audio to play new one.");
             stopAudio(); // stopAudio will reset state
             // Need a slight delay to ensure state updates before creating new audio
             setTimeout(() => createAndPlayAudio(audioSrc), 50);
             return; // Exit early
         }

         // If the requested audio is already playing, do nothing
         if (isPlaying && currentAudioSrc === audioSrc) {
             console.log("Audio already playing.");
             return;
         }

         // If the same audio is requested but not playing (e.g., replay), play it.
         // Or if it's a new audio source.
          if (!isPlaying || currentAudioSrc !== audioSrc) {
             createAndPlayAudio(audioSrc);
         }

     }, [isPlaying, currentAudioSrc, stopAudio, createAndPlayAudio]); // Add createAndPlayAudio dependency


     // Cleanup on unmount
     useEffect(() => {
         return () => {
             console.log("Cleaning up audio player on unmount.");
             stopAudio();
         };
     }, [stopAudio]);


     return { playAudio, stopAudio, isPlaying, currentAudioSrc };
 };


 // --- UI Helper Components ---
 const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
 let recognition;
 if (SpeechRecognition) {
     try {
         recognition = new SpeechRecognition();
         recognition.continuous = true; // Keep listening even after pauses
         recognition.lang = 'en-US';
         recognition.interimResults = true; // Get interim results for potential future UI feedback
         recognition.maxAlternatives = 1;
     } catch (e) {
         console.error("Speech Recognition setup failed:", e);
         recognition = null; // Ensure recognition is null if setup fails
     }
 }

 // Corrected MessageContent - Pass isAnyAudioPlaying prop
 const MessageContent = ({ text, onReplay, isAudioPlayingNow, isAnyAudioPlaying }) => {
     const safeText = typeof text === 'string' ? text : '';
     const paragraphs = safeText.split('\n').map((p, i) => <p key={i} className="text-lg mb-4 last:mb-0">{p}</p>);
     return (
         <div>
             {paragraphs}
             {onReplay && (
                 <button
                     onClick={onReplay}
                     // Disable if any audio is playing UNLESS it's the audio for THIS button
                     disabled={isAnyAudioPlaying && !isAudioPlayingNow}
                     className="mt-4 text-gray-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                     aria-label={isAudioPlayingNow ? "Audio playing" : "Play audio"}
                 >
                     <SoundIcon isPlaying={isAudioPlayingNow}/>
                 </button>
             )}
         </div>
     );
 };


 const DebateTimer = ({ timeLeft }) => {
     if (timeLeft === null) return null;
     const minutes = Math.floor(timeLeft / 60);
     const seconds = timeLeft % 60;
     const isEnding = timeLeft <= 60; // Highlight when 60 seconds or less remain
     return (
        <div className={`text-sm sm:text-lg font-mono px-2 sm:px-3 py-1 rounded-md transition-colors ${isEnding ? 'bg-red-500/20 text-red-400' : 'bg-gray-900 text-gray-300'}`}>
            <span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span>
        </div>
     );
 };

 const DebateEndModal = ({ isOpen, debateId, onNavigateToAnalytics }) => {
     const navigate = useNavigate();
     const [showGeneratingMsg, setShowGeneratingMsg] = useState(false);
     const [countdown, setCountdown] = useState(20); // Initial countdown to 20
     const countdownIntervalRef = useRef(null);
     const timeoutRef = useRef(null); // Ref for the setTimeout

     // Effect to handle modal opening/closing and cleanup
    useEffect(() => {
        if (isOpen) {
            // Reset state when modal opens
            setShowGeneratingMsg(false);
            setCountdown(20); // Reset countdown to 20
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
                countdownIntervalRef.current = null;
            }
             if (timeoutRef.current) { // Clear timeout as well
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        } else {
            // Cleanup if modal is forced closed externally
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
                countdownIntervalRef.current = null;
            }
             if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        }

        // Cleanup function for when component unmounts OR isOpen changes to false
        return () => {
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
                countdownIntervalRef.current = null; // Clear ref on cleanup
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null; // Clear ref on cleanup
            }
        };
    }, [isOpen]); // Depend only on isOpen


     const handleViewAnalyticsClick = () => {
         setShowGeneratingMsg(true);
         setCountdown(20); // Reset countdown explicitly to 20
         // Clear any previous interval before starting a new one
         if (countdownIntervalRef.current) {
             clearInterval(countdownIntervalRef.current);
         }
         // Clear previous timeout if exists
         if (timeoutRef.current) {
             clearTimeout(timeoutRef.current);
         }

         countdownIntervalRef.current = setInterval(() => {
            setCountdown(prev => prev > 0 ? prev - 1 : 0);
         }, 1000);

         // Set the timeout for navigation
         timeoutRef.current = setTimeout(() => {
             if (countdownIntervalRef.current) { // Check if interval still exists
                 clearInterval(countdownIntervalRef.current);
                 countdownIntervalRef.current = null; // Clear ref
             }
             // No need to setShowGeneratingMsg(false) as navigation happens
             if (onNavigateToAnalytics) {
                onNavigateToAnalytics();
             } else {
                navigate(`/analytics/${debateId}`);
             }
         }, 20000); // Changed delay to 20 seconds
     };

     if (!isOpen) return null;

     return (
         <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in-up" style={{ animationDuration: '300ms' }}>
             <div className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-8 w-full max-w-md text-center shadow-2xl shadow-black/50">
                 {showGeneratingMsg ? (
                     <>
                        <div className="w-8 h-8 border-4 border-gray-700 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                        <h2 className="text-2xl font-bold text-white mb-2">Generating Analysis...</h2>
                        <p className="text-lg text-gray-400">Please wait ({countdown}s)</p>
                     </>
                 ) : (
                     <>
                         <h2 className="text-3xl font-bold text-white mb-2">Debate Concluded</h2>
                         <p className="text-lg text-gray-400 mb-8">Analysis might take a moment to generate fully.</p>
                         <div className="flex flex-col sm:flex-row gap-4">
                             <button
                                 onClick={handleViewAnalyticsClick}
                                 className="w-full bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                             >
                                 View Analytics
                             </button>
                             <button onClick={() => navigate('/dashboard')} className="w-full bg-gray-700 text-gray-200 font-semibold px-6 py-3 rounded-md hover:bg-gray-600 transition-colors duration-300">
                                 Back to Dashboard
                             </button>
                         </div>
                     </>
                 )}
             </div>
         </div>
     );
 };


 const AudioControl = ({ isPlaying, onStop }) => {
     if (!isPlaying) return null;
     return (
         <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
             <button onClick={onStop} className="bg-red-600/90 backdrop-blur-md text-white rounded-full p-3 shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center" aria-label="Stop audio playback">
                 {/* Stop Icon */}
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><rect x="6" y="6" width="12" height="12"></rect></svg>
             </button>
         </div>
     );
 };


 const AiIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.44"></path><path d="m12 2l-2.5 5L12 9.5l2.5-2.5L12 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
 const UserIcon = () => (<div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center font-bold flex-shrink-0">U</div>);
 const MicIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>);
 const SendIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);
 const SoundIcon = ({ isPlaying }) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${isPlaying ? 'text-blue-400 animate-pulse' : 'text-gray-500'}`}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d={isPlaying ? "M15.54 8.46a5 5 0 0 1 0 7.07" : "M15.54 8.46a5 5 0 0 1 0 7.07" }></path>{isPlaying && <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>}</svg>);
 const StopIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>); // End debate icon


 // --- Main Debate Page Component ---
 const DebatePage = () => {
     const { debateId } = useParams();
     const navigate = useNavigate(); // Use navigate hook
     // Pass currentAudioSrc to child components that need to know *which* audio is playing
     const { playAudio, stopAudio, isPlaying, currentAudioSrc } = useAudioPlayer();
     const [debate, setDebate] = useState(null);
     const [messages, setMessages] = useState([]);
     const [userInput, setUserInput] = useState('');
     const [isRecording, setIsRecording] = useState(false);
     const [isLoading, setIsLoading] = useState(true);
     const [isAiTyping, setIsAiTyping] = useState(false);
     const [isReviewMode, setIsReviewMode] = useState(false);
     const [isEmptyPastDebate, setIsEmptyPastDebate] = useState(false);
     const [error, setError] = useState(null);
     const [timeLeft, setTimeLeft] = useState(null);
     const [isDebateOver, setIsDebateOver] = useState(false);
     const [showEndModal, setShowEndModal] = useState(false);
     const [closingStatementPrompted, setClosingStatementPrompted] = useState(false); // New state for closing prompt
     const chatEndRef = useRef(null);
     const timerIntervalRef = useRef(null); // Ref to store timer interval ID
     const finalTranscriptRef = useRef(''); // Ref to accumulate final transcript in continuous mode

     // Scroll to bottom effect
     useEffect(() => {
         setTimeout(() => {
             chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
         }, 150); // Increased delay slightly
     }, [messages, isAiTyping]);

      // Function to manually end the debate
     const handleEndDebate = useCallback(async () => {
         console.log("handleEndDebate called");
         // Ensure timer is cleared if running
         if (timerIntervalRef.current) {
             clearInterval(timerIntervalRef.current);
             timerIntervalRef.current = null;
         }
         setTimeLeft(0); // Explicitly set time left to 0 for UI
         stopAudio(); // Stop any currently playing audio
         // Stop recording if active
         if (recognition && isRecording) {
            try {
                console.log("Stopping recognition due to debate end.");
                recognition.stop(); // This will trigger 'end' listener
            } catch(e) {
                console.warn("Error stopping recognition on debate end:", e);
                // Force state if stop fails
                setIsRecording(false);
                finalTranscriptRef.current = ''; // Clear potentially incomplete transcript
            }
            // setIsRecording(false); // Let the 'end' handler do this
         }

         // Only proceed if the debate isn't already marked as over
         if (!isDebateOver) {
             setIsDebateOver(true); // Set state immediately
             setShowEndModal(true); // Show the modal

             // Add system message only if it wasn't the last message
             setMessages(prev => {
                const lastMsg = prev[prev.length -1];
                if (lastMsg?.sender !== 'system' || !lastMsg.text.includes("Debate ended")) {
                     return [...prev, { sender: 'system', text: "Debate ended. Generating analysis...", key: `system-end-${Date.now()}` }];
                }
                return prev;
             });

             // Trigger analysis request
             try {
                 console.log(`Sending analysis request for debate ${debateId}`);
                 await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/analyze/${debateId}`, {
                     method: 'POST',
                     credentials: 'include'
                 });
                  console.log("Analysis request sent successfully after end.");
             } catch (error) {
                 console.error("Failed to trigger debate analysis after end:", error);
                 // Add error message only if no previous system error exists
                 setMessages(prev => {
                    const lastMsg = prev[prev.length - 1];
                    if (lastMsg?.sender !== 'system' || !lastMsg.text.includes("Could not start analysis")) {
                        return [...prev, { sender: 'system', text: "Could not start analysis generation.", key: `system-error-${Date.now()}` }];
                    }
                    return prev;
                 });
             }
         } else {
             console.log("Debate already over, ensuring modal is shown.");
             // If debate is over but modal isn't showing, show it
             if (!showEndModal) setShowEndModal(true);
         }
     // Include all state dependencies that are read inside
     }, [debateId, stopAudio, isDebateOver, showEndModal, isRecording]); // Added isRecording

     // Initialize debate effect
     useEffect(() => {
         if (!debateId) return;
         console.log(`--- Initializing Debate ${debateId} ---`);
         // Reset ALL relevant states at the beginning
         setIsLoading(true);
         setIsEmptyPastDebate(false);
         setMessages([]);
         setDebate(null);
         setError(null);
         setIsDebateOver(false);
         setShowEndModal(false);
         setClosingStatementPrompted(false);
         setTimeLeft(null);
         stopAudio(); // Stop any audio from potentially previous debate state

         if (timerIntervalRef.current) {
             clearInterval(timerIntervalRef.current);
             timerIntervalRef.current = null;
         }

         const initializeDebate = async () => {
             try {
                 const [debateRes, historyRes] = await Promise.all([
                     fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/${debateId}`, { credentials: 'include' }),
                     fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/history/${debateId}`, { credentials: 'include' })
                 ]);

                 if (!debateRes.ok) throw new Error(`Failed to fetch debate details: ${debateRes.status}`);
                 if (!historyRes.ok && historyRes.status !== 404) { // Allow 404
                     throw new Error(`Failed to fetch debate history: ${historyRes.status}`);
                 }

                 const debateData = await debateRes.json();
                 const historyData = historyRes.ok ? await historyRes.json() : [];

                 setDebate(debateData);

                 if (historyData.length > 0) {
                     console.log("History found, setting review mode.");
                     setMessages(historyData.map((m, idx) => ({ // Add key during mapping
                         sender: m.role,
                         text: m.text,
                         audio: m.audio || null,
                         key: `${m.role}-${idx}-${m._id || Date.now()}` // Use _id if available
                     })));
                     setIsReviewMode(true);
                     setIsDebateOver(true); // Mark as over if viewing history
                  } else if (debateData.analytics) { // Check if analysis exists but history is empty
                     console.log("Analysis exists but no history, setting empty past debate state.");
                     setIsEmptyPastDebate(true);
                     setIsReviewMode(true);
                     setIsDebateOver(true); // Mark as over
                 } else { // No history, no analysis - start new debate flow
                     console.log("No history/analysis, initializing new debate flow.");
                     setIsReviewMode(false);
                     setIsDebateOver(false); // Explicitly false
                     const aiStance = debateData.stance === 'for' ? 'against' : 'for';
                     setIsAiTyping(true);
                     const firstArgRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getFirstAiArgument`, {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         credentials: 'include',
                         body: JSON.stringify({ debateId, topic: debateData.topic, stance: aiStance }),
                     });
                     setIsAiTyping(false);
                     if (!firstArgRes.ok) {
                         const errorBody = await firstArgRes.json();
                         throw new Error(`Failed to get AI's opening argument: ${errorBody.message || firstArgRes.status}`);
                     }
                     const { argument, audio } = await firstArgRes.json();
                     setMessages([{ sender: 'ai', text: argument, audio: audio, key: `ai-0-${Date.now()}` }]);
                     if (audio) {
                         playAudio(audio);
                     }
                      // Initialize timeLeft here for new debates
                     if (!isReviewMode && !isDebateOver && !isEmptyPastDebate && debateData) {
                         const totalSeconds = debateData.duration * 60;
                         setTimeLeft(totalSeconds);
                         console.log("Initialized timeLeft for new debate:", totalSeconds);
                     }
                 }
             } catch (error) {
                 console.error("Initialization Error:", error);
                 setError(error.message);
                 setMessages([{ sender: 'system', text: `Error loading debate: ${error.message}`, key: `system-error-${Date.now()}` }]);
             } finally {
                 setIsLoading(false);
                 console.log("Initialization finished.");
             }
         };
         initializeDebate();
      // Only rerun when debateId changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [debateId]);


      // Timer effect - Adjusted to start ONLY after timeLeft is set by init effect
     useEffect(() => {
        // Conditions to *not* run the timer logic
        if (!debate || isReviewMode || isLoading || isEmptyPastDebate || isDebateOver || timeLeft === null) {
             // Ensure timer is cleared if it exists and state requires stopping
             if(timerIntervalRef.current && (isReviewMode || isDebateOver || isEmptyPastDebate)) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
                console.log("Cleared timer due to state change (review/over/empty).");
             }
             return; // Don't start timer if conditions aren't met
         }

         // Only start interval if timeLeft is set (not null) and interval isn't already running
         if (!timerIntervalRef.current) {
            console.log(`Starting timer interval with timeLeft=${timeLeft}`);
            timerIntervalRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                    // Safety checks
                    if (prevTime === null) { // Should not happen if logic is correct, but safe check
                        console.warn("Timer interval running with null timeLeft, clearing.");
                        clearInterval(timerIntervalRef.current);
                        timerIntervalRef.current = null;
                        return null;
                    }
                    // Check isDebateOver flag inside the interval callback as well
                    if (isDebateOver) {
                         console.warn("Timer interval detected debate ended flag set, clearing.");
                         clearInterval(timerIntervalRef.current);
                         timerIntervalRef.current = null;
                         return prevTime; // Return current value (likely 0)
                    }

                    if (prevTime <= 1) { // When time runs out
                        console.log("Timer reached 0 via interval.");
                        clearInterval(timerIntervalRef.current); // Clear first
                        timerIntervalRef.current = null;
                        handleEndDebate(); // Use the common end function
                        return 0; // Explicitly return 0
                    }

                    // Decrement time
                    const newTime = prevTime - 1;

                    // Calculate closing time based on initial duration
                    let closingTime;
                    if (debate.duration === 5) closingTime = 60;
                    else if (debate.duration === 10) closingTime = 120;
                    else if (debate.duration === 15) closingTime = 180;
                    else closingTime = 60; // Default

                    // Check closingStatementPrompted flag
                    if (newTime === closingTime && !closingStatementPrompted) {
                        console.log("Prompting closing statement.");
                        setMessages(prev => {
                            // Check if the prompt already exists
                            const alreadyPrompted = prev.some(msg => msg.key?.startsWith('system-closing'));
                            if (!alreadyPrompted) {
                                return [...prev, { sender: 'system', text: 'You have a few minutes left. Please make your closing statement.', key: `system-closing-${Date.now()}` }];
                            }
                            return prev;
                        });
                        setClosingStatementPrompted(true); // Set the flag
                    }
                    return newTime; // Return decremented time
                });
            }, 1000);
         }

         // Cleanup function for the effect
         return () => {
              if (timerIntervalRef.current) {
                console.log("Cleaning up timer interval in Timer Effect.");
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null; // Important: Clear ref on cleanup
              }
         };
         // Rerun if these core states influencing timer start/stop change, OR if timeLeft itself changes (e.g. initial set)
     }, [debate, isReviewMode, isLoading, isEmptyPastDebate, isDebateOver, handleEndDebate, closingStatementPrompted, timeLeft]);


     // handleSendMessage defined using useCallback
      const handleSendMessage = useCallback(async (text) => {
         stopAudio(); // Stop AI if it's speaking
         const messageText = (typeof text === 'string' ? text : userInput).trim();
         // Additional check: prevent sending if already sending/typing
         if (messageText === '' || isReviewMode || isDebateOver || isPlaying || isAiTyping) {
             console.log("Send blocked:", {messageText, isReviewMode, isDebateOver, isPlaying, isAiTyping});
             return;
         }

         const userMessage = { sender: 'user', text: messageText, key: `user-${Date.now()}` };
         setMessages(prev => [...prev, userMessage]);
         setUserInput(''); // Clear input field immediately
         setIsAiTyping(true); // Indicate AI is "thinking"
         setError(null);

         try {
             // Save user message (can be fire-and-forget or await)
             await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/addUserMessage`, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 credentials: 'include',
                 body: JSON.stringify({ debateId, message: messageText }),
             });
             console.log("User message saved.");

             // Get AI response
             console.log("Requesting AI response...");
             const aiRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/debate/getAiResponse`, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 credentials: 'include',
                 body: JSON.stringify({ debateId, userLastArgument: messageText }),
             });

             // Check response BEFORE setting typing to false
             if (!aiRes.ok) {
                 const errorBody = await aiRes.json();
                 throw new Error(errorBody.message || `AI response failed with status ${aiRes.status}`);
             }
             const { response, audio } = await aiRes.json();
             console.log("AI response received.");

              // Add AI message AFTER response received
             setIsAiTyping(false); // Stop typing indicator *before* adding message/playing audio
             setMessages(prev => [...prev, { sender: 'ai', text: response, audio: audio, key: `ai-${Date.now()}` }]);
             if (audio) {
                 playAudio(audio);
             }

         } catch (err) {
             console.error("Error during message send/receive:", err);
             // Add error message to chat
             setMessages(prev => [...prev, { sender: 'system', text: `Sorry, an error occurred: ${err.message}`, key: `system-error-${Date.now()}` }]);
             setError(err.message);
             setIsAiTyping(false); // Ensure typing stops on error
         }
      }, [debateId, isReviewMode, isDebateOver, isPlaying, isAiTyping, stopAudio, playAudio, userInput]); // Added userInput


      // Speech Recognition Listener Effect - Adjusted for Continuous Mode
     useEffect(() => {
         if (!recognition) return;

         let currentInterim = ''; // Track interim locally if needed for UI later

         const handleResult = (event) => {
             let interimTranscriptLocal = ''; // Use local var inside handler - FIXED ReferenceError
             let finalTranscriptThisEvent = ''; // Track final part within this event

             for (let i = event.resultIndex; i < event.results.length; ++i) {
                 const transcriptPart = event.results[i][0].transcript;
                 if (event.results[i].isFinal) {
                     finalTranscriptThisEvent += transcriptPart; // Append final parts
                 } else {
                     interimTranscriptLocal += transcriptPart; // Append interim parts - FIXED ReferenceError
                 }
             }
             // Update the ref ONLY with the newly finalized part for this event
             if (finalTranscriptThisEvent) {
                finalTranscriptRef.current += finalTranscriptThisEvent + ' '; // Add space between final parts
             }
             currentInterim = interimTranscriptLocal; // Update local interim
             console.log("Interim:", currentInterim, "| Final accumulated:", finalTranscriptRef.current.trim());
             // Optionally update UI with live transcript:
             // setUserInput(finalTranscriptRef.current.trim() + ' ' + currentInterim);
         };

         const handleError = (event) => {
             console.error("Speech recognition error:", event.error, "| Message:", event.message);
             // Filter out common non-fatal errors
             if (event.error !== 'no-speech' && event.error !== 'aborted') {
                 let errorMsg = `Speech recognition error: ${event.error}`;
                 if (event.error === 'audio-capture') errorMsg = "Audio capture failed. Check microphone permissions.";
                 else if (event.error === 'not-allowed') errorMsg = "Microphone access denied. Please allow browser access.";
                 else if (event.error === 'network') errorMsg = "Network error during speech recognition.";
                 // Avoid adding duplicate errors
                 setMessages(prev => {
                     const lastMsg = prev[prev.length - 1];
                     // Only add if the *exact* same error isn't the last message
                     if(lastMsg?.sender !== 'system' || lastMsg.text !== errorMsg) {
                        return [...prev, { sender: 'system', text: errorMsg, key: `system-sr-error-${Date.now()}` }];
                     }
                     return prev;
                 });
             } else if (event.error === 'aborted') {
                  console.log("Recognition aborted (likely intentional or from cleanup).");
             } else if (event.error === 'no-speech') {
                 console.log("No speech detected (normal in continuous mode if silent).");
             }
             // Ensure recording state is reset on any error or abort
             // This might conflict with handleEnd, let handleEnd manage final state
             setIsRecording(false);
         };

         const handleEnd = () => {
             console.log("Speech recognition ended (onend event).");
             // Check isRecording state *before* sending. If it became false due to an error/abort, don't send.
             // Also check finalTranscriptRef to ensure there's something to send.
             if (isRecording && finalTranscriptRef.current.trim()) {
                console.log("Sending final transcript from 'end' event:", finalTranscriptRef.current.trim());
                handleSendMessage(finalTranscriptRef.current.trim());
             } else {
                 console.log("Recognition ended, but no final transcript to send or wasn't in recording state when ended.");
             }
             // Reset transcript ref and state regardless, ensure state becomes false
             finalTranscriptRef.current = '';
             setIsRecording(false); // Crucial: ensure state is false on end
         };

         // Add listeners
         recognition.addEventListener('result', handleResult);
         recognition.addEventListener('error', handleError);
         recognition.addEventListener('end', handleEnd);

         // Cleanup function
         return () => {
             console.log("Cleaning up speech recognition listeners.");
             if (recognition) {
                recognition.removeEventListener('result', handleResult);
                recognition.removeEventListener('error', handleError);
                recognition.removeEventListener('end', handleEnd);
                // Abort recognition if it's currently active when component unmounts or effect reruns
                // Use a local variable to capture the state at the time of cleanup setup
                const wasRecordingAtCleanupSetup = isRecording;
                if (wasRecordingAtCleanupSetup) {
                     try {
                        console.log("Aborting recognition on cleanup while recording.");
                        recognition.abort(); // abort will trigger error/end, handlers should cope
                     } catch(e) {
                        console.warn("Error aborting recognition on cleanup:", e);
                     }
                     // Force state if abort fails to trigger 'end' - potential safeguard
                     setIsRecording(false);
                }
             }
         };
     // isRecording IS needed here because the cleanup logic depends on it.
     }, [handleSendMessage, isRecording]);


     const handleSendMessageWrapper = () => {
        handleSendMessage(userInput);
     };

     const toggleRecording = () => {
         // Prevent action if conditions aren't met
         if (!recognition || isReviewMode || isDebateOver || isPlaying || isAiTyping) {
             console.log("Recording toggle blocked:", { recognition: !!recognition, isReviewMode, isDebateOver, isPlaying, isAiTyping });
             return;
         }
         if (isRecording) {
             console.log("Stopping recognition (manual toggle)");
             try {
                 recognition.stop(); // This should trigger the 'end' event
                 // The 'end' event listener handles sending transcript and setting isRecording=false
             } catch(e) {
                 console.warn("Error stopping recognition:", e);
                 setIsRecording(false); // Force state on error
                 finalTranscriptRef.current = ''; // Clear potentially incomplete transcript
             }
         } else {
             console.log("Starting recognition (manual toggle)");
              finalTranscriptRef.current = ''; // Clear previous transcript before starting
             try {
                 recognition.start();
                 setIsRecording(true); // Set state immediately for UI feedback
             } catch(e) {
                 console.error("Error starting recognition:", e);
                 setIsRecording(false); // Reset state if start fails
                 let errorMsg = `Could not start microphone: ${e.message || 'Unknown error'}`;
                 // Handle common errors like already started
                 if (e.name === 'InvalidStateError') {
                    errorMsg = "Speech recognition is already active or finishing.";
                    try { recognition.abort(); } catch(abortErr) {/* ignore */} // Attempt reset
                    setIsRecording(false); // Ensure it's false
                 }
                 setMessages(prev => [...prev, { sender: 'system', text: errorMsg, key: `system-sr-start-error-${Date.now()}` }]);
             }
         }
     };

     // --- Render Logic ---
     const renderChatContent = () => {
         if (isEmptyPastDebate) {
             return (
                 <div className="flex-1 flex items-center justify-center p-4">
                     <p className="text-2xl text-center text-gray-500 italic">No arguments were made in this debate.</p>
                 </div>
             );
         }

         return (
             <>
                {/* Debate Info Header - Scrolls with content */}
                <div className="mb-4 border-b border-gray-900 pb-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 flex-shrink-0">
                    <div className="text-center sm:text-left overflow-hidden"> {/* Added overflow-hidden */}
                         <h1 className="text-xl sm:text-2xl font-bold text-gray-200 truncate">
                            {debate?.title || (isLoading ? 'Loading...' : 'Debate')}
                         </h1>
                         <p className="text-sm sm:text-base text-gray-400 truncate">
                            {debate?.topic || (error ? 'Could not load topic' : '...')}
                         </p>
                    </div>
                     <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0"> {/* Ensure buttons don't wrap */}
                        {/* Show timer only if it's not review mode AND debate is not over AND not loading AND no error */}
                        {!isReviewMode && !isDebateOver && !isLoading && !error && timeLeft !== null && <DebateTimer timeLeft={timeLeft} />}
                        {/* Show End button only in active debate */}
                        {!isReviewMode && !isDebateOver && !isLoading && !error && (
                            <button
                                onClick={handleEndDebate}
                                className="flex items-center bg-red-600/20 text-red-400 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-600/30 transition-colors border border-red-600/50"
                                aria-label="End Debate Early"
                                title="End Debate Early"
                            >
                                <StopIcon /> End
                            </button>
                        )}
                    </div>
                 </div>

                 {/* Message List - Now takes remaining space and scrolls */}
                 <div className="flex-1 overflow-y-auto space-y-6 sm:space-y-8 p-1 pr-2 pb-4 mb-4 scroll-smooth">
                     {messages.map((msg) => { // Use msg.key
                         const audioSrc = msg.audio ? `data:audio/mp3;base64,${msg.audio}` : null;
                         // Check if THIS specific message's audio is the one currently playing
                         const isThisAudioPlaying = isPlaying && currentAudioSrc === audioSrc;

                         if (msg.sender === 'system') {
                             return (<div key={msg.key} className="text-center my-4 animate-fade-in-up">
                                <p className="text-base font-semibold italic text-indigo-300 bg-indigo-900/30 inline-block px-4 py-2 rounded-full border border-indigo-700/50 shadow-md">
                                    {msg.text}
                                </p>
                             </div>)
                         }
                         return (
                             <div key={msg.key} className={`flex items-start gap-3 sm:gap-4 animate-fade-in-up ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                  {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1 shadow-md"><AiIcon /></div>}
                                 <div className={`p-4 rounded-2xl max-w-md lg:max-w-lg shadow-md ${msg.sender === 'ai' ? 'bg-[#0A0A0A] border border-gray-900' : 'bg-white text-black'}`}>
                                     <MessageContent
                                         text={msg.text}
                                         onReplay={msg.audio ? () => playAudio(msg.audio) : null}
                                         // Pass both states down correctly
                                         isAudioPlayingNow={isThisAudioPlaying}
                                         isAnyAudioPlaying={isPlaying} // General playing state
                                     />
                                 </div>
                                 {msg.sender === 'user' && <UserIcon />}
                             </div>
                         )
                     })}
                     {isAiTyping && (
                          <div key="typing-indicator" className="flex items-start gap-3 sm:gap-4 animate-fade-in-up">
                             <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1 shadow-md"><AiIcon /></div>
                             <div className="p-4 rounded-2xl max-w-lg bg-[#0A0A0A] border border-gray-900 shadow-md">
                                 <div className="flex items-center space-x-2 h-6">
                                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                     <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                                 </div>
                             </div>
                         </div>
                     )}
                     <div ref={chatEndRef} style={{ height: '1px' }} />
                 </div>

                  {/* Input Area / Footer Message */}
                 <div className="mt-auto pt-4 border-t border-gray-900 flex-shrink-0">
                     {/* Show input only if NOT review mode AND NOT debate over */}
                     {!isReviewMode && !isDebateOver ? (
                         <div className="relative">
                             <input
                                 type="text"
                                 value={userInput}
                                 onChange={(e) => setUserInput(e.target.value)}
                                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessageWrapper()}
                                 placeholder={
                                     isPlaying ? "AI is speaking..." :
                                     isRecording ? "Listening... (Click mic to stop)" :
                                     isAiTyping ? "AI is thinking..." :
                                     "Type your argument or use mic..."
                                 }
                                 className="w-full bg-[#18181B] border border-gray-700 rounded-full pl-6 pr-28 py-3 sm:py-4 text-base sm:text-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all disabled:opacity-60 placeholder-gray-500"
                                 disabled={isAiTyping || isPlaying || isRecording} // Ensure disabled when recording too
                             />
                             <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-2">
                                 {recognition && ( // Conditionally render mic button
                                     <button
                                         onClick={toggleRecording}
                                         disabled={isAiTyping || isPlaying} // Disable mic if AI typing or speaking
                                         className={`p-2 rounded-full transition-colors duration-200 ease-in-out ${
                                             isRecording ? 'bg-red-500/20 text-red-400 ring-2 ring-red-500/50 animate-pulse' :
                                             (isAiTyping || isPlaying ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 text-gray-300')
                                         }`}
                                         aria-label={isRecording ? "Stop recording" : "Start recording"}
                                     >
                                         <MicIcon/>
                                     </button>
                                 )}
                                 <button
                                     onClick={handleSendMessageWrapper}
                                     disabled={isAiTyping || isPlaying || isRecording || !userInput.trim()}
                                     className="p-2 sm:p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-indigo-800"
                                     aria-label="Send message"
                                 >
                                     <SendIcon />
                                 </button>
                             </div>
                         </div>
                     // Show concluded/review message only if applicable and modal isn't shown
                     ) : !isEmptyPastDebate && !showEndModal ? (
                         <div className="text-center">
                             <p className="text-gray-500 italic">
                                 {isDebateOver ? "This debate has concluded." : "Viewing past debate."}
                             </p>
                         </div>
                     // Show empty message if applicable
                     ) : isEmptyPastDebate ? (
                         <div className="text-center">
                            {/* Message already shown */}
                         </div>
                     ): null } {/* Render nothing if modal is showing */}
                 </div>
             </>
         );
     };


     return (
         <div className="bg-black text-white h-screen flex flex-col font-sans"> {/* Use h-screen */}
             <DashboardHeader />
             <DebateEndModal isOpen={showEndModal} debateId={debateId} onNavigateToAnalytics={() => navigate(`/analytics/${debateId}`)} />
             <AudioControl isPlaying={isPlaying} onStop={stopAudio} />

              {/* Main container allowing header/chat/input */}
              <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 overflow-hidden"> {/* Use flex-col and overflow-hidden */}

                 {/* Loading/Error states take full space if needed */}
                 {isLoading && messages.length === 0 && !error && !isEmptyPastDebate ? (
                     <div className="flex-1 flex items-center justify-center">
                         <div className="w-8 h-8 border-4 border-gray-800 border-t-white rounded-full animate-spin"></div>
                     </div>
                 ) : error ? (
                     <div className="flex-1 flex items-center justify-center text-center p-4">
                         <div className="bg-[#111] border border-red-800/50 rounded-lg p-6">
                             <h2 className="text-xl font-semibold text-red-400">Could not load debate</h2>
                             <p className="text-gray-400 mt-2">{error}</p>
                             <button onClick={() => navigate('/dashboard')} className="mt-4 bg-gray-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600">
                                Back to Dashboard
                             </button>
                         </div>
                     </div>
                  ) : (
                     // Render the content which includes header, chat, and input/footer
                     renderChatContent()
                 )}
             </div>
         </div>
     );
 };

 export default DebatePage;

