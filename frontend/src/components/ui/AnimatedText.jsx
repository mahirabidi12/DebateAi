import React, { useState, useEffect } from 'react';

const AnimatedText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(text.slice(0, index + 1));
            index++;
            if (index >= text.length) {
                clearInterval(intervalId);
            }
        }, 100);
        return () => clearInterval(intervalId);
    }, [text]);
    return <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">{displayedText}</span>;
}

export default AnimatedText;

