import React from 'react';

const GlobalStyles = () => (
    <style>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 40s linear infinite;
        }
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
            animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
        }
        html {
            scroll-behavior: smooth;
        }
        @keyframes scroll-x {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
        }
        .animate-scroll-x {
            animation: scroll-x 40s linear infinite;
        }
        .bg-grid {
            background-image: linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
            background-size: 3rem 3rem;
        }
    `}</style>
);

export default GlobalStyles;

