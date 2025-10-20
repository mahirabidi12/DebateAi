// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import DashboardHeader from '../components/layouts/DashboardHeader';

// // Mock SpeechRecognition for browsers that support it
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// let recognition;
// if (SpeechRecognition) {
//     recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;
// }

// // Component to render message content with paragraph breaks
// const MessageContent = ({ text }) => {
//     // Split text by newlines and render each part in a <p> tag
//     const paragraphs = text.split('\n').filter(p => p.trim() !== '');
//     return (
//         <div>
//             {paragraphs.map((para, index) => (
//                 <p key={index} className="mb-4 last:mb-0">
//                     {para}
//                 </p>
//             ))}
//         </div>
//     );
// };


// const DebatePage = () => {
//     const { debateId } = useParams();
//     const [messages, setMessages] = useState([]);
//     const [userInput, setUserInput] = useState('');
//     const [isRecording, setIsRecording] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState('');
//     const chatEndRef = useRef(null);

//     // ... existing useEffect for fetching initial argument ...
//     useEffect(() => {
//         const fetchInitialArgument = async () => {
//             try {
//                 setIsLoading(true);
//                 setError('');

//                 // 1. Fetch debate details to get topic and user's stance
//                 const debateDetailsUrl = `${import.meta.env.VITE_BACKEND_URL}/debate/${debateId}`;
//                 const debateRes = await fetch(debateDetailsUrl, { credentials: 'include' });
//                 if (!debateRes.ok) throw new Error(`Failed to fetch debate details. Server responded with ${debateRes.status}.`);
//                 const debateData = await debateRes.json();
                
//                 const { topic, stance: userStance } = debateData;
                
//                 // 2. Determine AI's stance (opposite of the user's)
//                 const aiStance = userStance === 'for' ? 'against' : 'for';
                
//                 // 3. Fetch AI's first argument from the backend
//                 const firstArgumentUrl = `${import.meta.env.VITE_BACKEND_URL}/debate/getFirstAiArgument`;
//                 const argumentRes = await fetch(firstArgumentUrl, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     credentials: 'include',
//                     body: JSON.stringify({ topic, stance: aiStance, debateId: debateId })
//                 });

//                 if (!argumentRes.ok) throw new Error("Failed to get the AI's opening argument.");
//                 const argumentData = await argumentRes.json();

//                 // 4. Set the initial message in the chat
//                 setMessages([{ sender: 'ai', text: argumentData.argument }]);

//             } catch (err) {
//                 console.error(err);
//                 setError(err.message || 'An error occurred while setting up the debate.');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         if (debateId) {
//             fetchInitialArgument();
//         } else {
//             setError("No debate ID found.");
//             setIsLoading(false);
//         }

//     }, [debateId]);


//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);
    
//     useEffect(() => {
//         if (!recognition) return;

//         recognition.onresult = (event) => {
//             const transcript = event.results[0][0].transcript;
//             handleSendMessage(transcript);  
//             setIsRecording(false);
//         };

//         recognition.onerror = (event) => {
//             console.error("Speech recognition error", event.error);
//             setIsRecording(false);
//         };
        
//         recognition.onend = () => {
//              setIsRecording(false);
//         }

//     }, []);

//     const handleSendMessage = async (text) => {
//         const messageText = text || userInput;
//         if (messageText.trim() === '') return;

//         // Add user message to UI immediately
//         setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
//         setUserInput('');
        
//         try {
//             const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/debate/addUserMessage`;
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify({
//                     debateId: debateId,
//                     message: messageText
//                 })
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to save your message.');
//             }

//             // Mock AI response for now, this will be replaced later
//             setTimeout(() => {
//                 setMessages(prev => [...prev, { sender: 'ai', text: "That's an interesting perspective. However, let's consider..." }]);
//             }, 1500);

//         } catch (err) {
//             console.error("Error sending message:", err);
//             // Optionally show an error to the user in the chat
//             setMessages(prev => [...prev, { sender: 'ai', text: `Sorry, there was an error sending your message: ${err.message}` }]);
//         }
//     };
    
//     const toggleRecording = () => {
//         if (!recognition) {
//             alert("Speech recognition is not supported in this browser.");
//             return;
//         }
//         if (isRecording) {
//             recognition.stop();
//         } else {
//             recognition.start();
//         }
//         setIsRecording(!isRecording);
//     };

//     return (
//         <div className="bg-black text-white min-h-screen flex flex-col font-sans">
//             <DashboardHeader />
//             <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4">
//                 {isLoading ? (
//                     <div className="flex-1 flex flex-col items-center justify-center text-center">
//                         <div className="w-8 h-8 border-4 border-gray-800 border-t-white rounded-full animate-spin mb-4"></div>
//                         <h2 className="text-xl font-semibold text-gray-300">Preparing the Arena...</h2>
//                         <p className="text-gray-500">The AI is crafting its opening statement.</p>
//                     </div>
//                 ) : error ? (
//                      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
//                         <h2 className="text-xl font-semibold text-red-500">Failed to Start Debate</h2>
//                         <p className="text-gray-400 mt-2">{error}</p>
//                         <Link to="/dashboard" className="mt-6 bg-gray-800 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">
//                             Back to Dashboard
//                         </Link>
//                      </div>
//                 ) : (
//                     <>
//                         <div className="flex-1 overflow-y-auto space-y-8 pr-2 [mask-image:linear-gradient(to_bottom,white_95%,transparent_100%)]">
//                             {messages.map((msg, index) => (
//                                 <div key={index} className={`flex items-start gap-4 animate-fade-in-up ${msg.sender === 'user' ? 'justify-end' : ''}`}>
//                                      {msg.sender === 'ai' && (
//                                         <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
//                                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.44"></path><path d="m12 2l-2.5 5L12 9.5l2.5-2.5L12 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
//                                         </div>
//                                     )}
//                                     <div className={`p-4 rounded-2xl max-w-lg ${msg.sender === 'ai' ? 'bg-[#0A0A0A] border border-gray-900' : 'bg-white text-black'}`}>
//                                         <div className="text-lg leading-relaxed">
//                                             <MessageContent text={msg.text} />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                             <div ref={chatEndRef} />
//                         </div>

//                         <div className="mt-8">
//                              <div className="relative">
//                                 <input
//                                     type="text"
//                                     value={userInput}
//                                     onChange={(e) => setUserInput(e.target.value)}
//                                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                                     placeholder="Type your argument or use the microphone..."
//                                     className="w-full bg-[#0A0A0A] border border-gray-800 rounded-full pl-6 pr-20 py-4 text-lg focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all"
//                                 />
//                                 <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
//                                      <button onClick={toggleRecording} className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-gray-800 hover:bg-gray-700'}`}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
//                                     </button>
//                                      <button onClick={() => handleSendMessage()} className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DebatePage;


import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardHeader from '../components/layouts/DashboardHeader';

// Mock SpeechRecognition for browsers that support it
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
}

// Component to render message content with paragraph breaks
const MessageContent = ({ text }) => {
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    return (
        <div>
            {paragraphs.map((para, index) => (
                <p key={index} className="mb-4 last:mb-0">
                    {para}
                </p>
            ))}
        </div>
    );
};

const AiTypingIndicator = () => (
    <div className="flex items-start gap-4 animate-fade-in-up">
        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.44"></path><path d="m12 2l-2.5 5L12 9.5l2.5-2.5L12 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </div>
        <div className="p-4 rounded-2xl max-w-lg bg-[#0A0A0A] border border-gray-900">
            <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </div>
        </div>
    </div>
);


const DebatePage = () => {
    const { debateId } = useParams();
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [error, setError] = useState('');
    const chatEndRef = useRef(null);
    const debateDetailsRef = useRef(null);

    useEffect(() => {
        const fetchInitialArgument = async () => {
            try {
                setIsLoading(true);
                setError('');

                const debateDetailsUrl = `${import.meta.env.VITE_BACKEND_URL}/debate/${debateId}`;
                const debateRes = await fetch(debateDetailsUrl, { credentials: 'include' });
                if (!debateRes.ok) throw new Error(`Failed to fetch debate details. Server responded with ${debateRes.status}.`);
                
                const debateData = await debateRes.json();
                debateDetailsRef.current = debateData;
                
                const { topic, stance: userStance } = debateData;
                const aiStance = userStance === 'for' ? 'against' : 'for';
                
                const firstArgumentUrl = `${import.meta.env.VITE_BACKEND_URL}/debate/getFirstAiArgument`;
                const argumentRes = await fetch(firstArgumentUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ topic, stance: aiStance, debateId: debateId })
                });

                if (!argumentRes.ok) throw new Error("Failed to get the AI's opening argument.");
                const argumentData = await argumentRes.json();

                setMessages([{ sender: 'ai', text: argumentData.argument }]);

            } catch (err) {
                console.error(err);
                setError(err.message || 'An error occurred while setting up the debate.');
            } finally {
                setIsLoading(false);
            }
        };

        if (debateId) {
            fetchInitialArgument();
        } else {
            setError("No debate ID found.");
            setIsLoading(false);
        }

    }, [debateId]);


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isAiTyping]);
    
    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            handleSendMessage(transcript);  
            setIsRecording(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsRecording(false);
        };
        
        recognition.onend = () => {
             setIsRecording(false);
        }

    }, []);

    const handleSendMessage = async (text) => {
        const messageText = text || userInput;
        if (messageText.trim() === '' || isAiTyping) return;

        setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
        setUserInput('');
        setIsAiTyping(true);
        
        try {
            // 1. Save user message
            const addUserMessageUrl = `${import.meta.env.VITE_BACKEND_URL}/debate/addUserMessage`;
            const userMessageRes = await fetch(addUserMessageUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ debateId, message: messageText })
            });

            if (!userMessageRes.ok) {
                const errorData = await userMessageRes.json();
                throw new Error(errorData.message || 'Failed to save your message.');
            }

            // 2. Get AI response
            const getAiResponseUrl = `${import.meta.env.VITE_BACKEND_URL}/debate/getAiResponse`;
            const aiResponseRes = await fetch(getAiResponseUrl, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 credentials: 'include',
                 body: JSON.stringify({
                     debateId,
                     userLastArgument: messageText
                 })
            });

            if (!aiResponseRes.ok) {
                const errorData = await aiResponseRes.json();
                throw new Error(errorData.message || 'Failed to get AI response.');
            }

            const aiResponseData = await aiResponseRes.json();
            setMessages(prev => [...prev, { sender: 'ai', text: aiResponseData.response }]);

        } catch (err) {
            console.error("Error in conversation flow:", err);
            setMessages(prev => [...prev, { sender: 'ai', text: `Sorry, an error occurred: ${err.message}` }]);
        } finally {
            setIsAiTyping(false);
        }
    };
    
    const toggleRecording = () => {
        if (!recognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }
        if (isRecording) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsRecording(!isRecording);
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col font-sans">
            <DashboardHeader />
            <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4">
                {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <div className="w-8 h-8 border-4 border-gray-800 border-t-white rounded-full animate-spin mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-300">Preparing the Arena...</h2>
                        <p className="text-gray-500">The AI is crafting its opening statement.</p>
                    </div>
                ) : error ? (
                     <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                        <h2 className="text-xl font-semibold text-red-500">Failed to Start Debate</h2>
                        <p className="text-gray-400 mt-2">{error}</p>
                        <Link to="/dashboard" className="mt-6 bg-gray-800 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">
                            Back to Dashboard
                        </Link>
                     </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto space-y-8 pr-2 [mask-image:linear-gradient(to_bottom,white_95%,transparent_100%)]">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-4 animate-fade-in-up ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                     {msg.sender === 'ai' && (
                                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.44"></path><path d="m12 2l-2.5 5L12 9.5l2.5-2.5L12 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                        </div>
                                    )}
                                    <div className={`p-4 rounded-2xl max-w-lg ${msg.sender === 'ai' ? 'bg-[#0A0A0A] border border-gray-900' : 'bg-white text-black'}`}>
                                        <div className="text-lg leading-relaxed">
                                            <MessageContent text={msg.text} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isAiTyping && <AiTypingIndicator />}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="mt-8">
                             <div className="relative">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder={isAiTyping ? "AI is thinking..." : "Type your argument or use the microphone..."}
                                    disabled={isAiTyping}
                                    className="w-full bg-[#0A0A0A] border border-gray-800 rounded-full pl-6 pr-20 py-4 text-lg focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all disabled:opacity-50"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                     <button onClick={toggleRecording} disabled={isAiTyping} className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-gray-800 hover:bg-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                                    </button>
                                     <button onClick={() => handleSendMessage()} disabled={isAiTyping} className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DebatePage;
