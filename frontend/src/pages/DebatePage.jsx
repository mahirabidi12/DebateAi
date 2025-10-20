import React, { useState, useEffect, useRef } from 'react';
import DashboardHeader from '../components/layouts/DashboardHeader';

// Mock SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
}


const DebatePage = () => {
    const [messages, setMessages] = useState([
        { sender: 'ai', text: "Welcome to the intellectual arena. I will be your opponent today. The motion is: 'The Ethics of Artificial Intelligence'. As the affirmative, you may begin when ready." }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setUserInput(transcript);
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


    const handleSendMessage = (text) => {
        const messageText = text || userInput;
        if (messageText.trim() === '') return;

        setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
        setUserInput('');
        
        // Mock AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'ai', text: "That's a valid point, however, have you considered..." }]);
        }, 1500);
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
                <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-4 animate-fade-in-up ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                             {msg.sender === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.44"></path><path d="m12 2l-2.5 5L12 9.5l2.5-2.5L12 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </div>
                            )}
                            <div className={`p-4 rounded-2xl max-w-lg ${msg.sender === 'ai' ? 'bg-[#0A0A0A] border border-gray-900' : 'bg-white text-black'}`}>
                                <p className="text-lg">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div className="mt-8">
                     <div className="relative">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type your argument or use the microphone..."
                            className="w-full bg-[#0A0A0A] border border-gray-800 rounded-full pl-6 pr-20 py-4 text-lg focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                             <button onClick={toggleRecording} className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-gray-800 hover:bg-gray-700'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                            </button>
                             <button onClick={() => handleSendMessage()} className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebatePage;
