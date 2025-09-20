import React, { useState, useEffect, useRef } from 'react';

const ScrollHighlightHeading = ({ text }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const words = text.split(' ');

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.4 });

        if (ref.current) observer.observe(ref.current);
        
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return (
        <h2 ref={ref} className="text-4xl sm:text-6xl font-bold tracking-tight">
            {words.map((word, i) => (
                <span key={i} className="inline-block mr-3">
                    <span
                        className={`transition-colors duration-500 ${isVisible ? 'text-white' : 'text-gray-700'}`}
                        style={{ transitionDelay: `${i * 150}ms` }}
                    >
                        {word}
                    </span>
                </span>
            ))}
        </h2>
    );
};

export default ScrollHighlightHeading;

