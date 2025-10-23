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
        
        /* --- ADDED STYLES FOR AUTH PAGE --- */
        @keyframes subtle-glow {
            0%, 100% {
                border-color: rgba(255, 255, 255, 0.08);
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.03), 0 0 20px rgba(255, 255, 255, 0.02) inset;
            }
            50% {
                border-color: rgba(255, 255, 255, 0.15);
                box-shadow: 0 0 25px rgba(255, 255, 255, 0.06), 0 0 30px rgba(255, 255, 255, 0.03) inset;
            }
        }
        .auth-form-container {
            position: relative; z-index: 1; background-color: rgba(10, 10, 10, 0.6);
            backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08);
            animation: subtle-glow 5s ease-in-out infinite;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
        }
        .auth-form-container:hover {
            transform: scale(1.02);
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.08);
        }
        .form-input {
            background-color: rgba(20, 20, 20, 0.8); border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.2s ease-in-out;
        }
        .form-input:focus {
            outline: none; border-color: rgba(255, 255, 255, 0.25);
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.05);
        }
        .social-btn {
            background-color: rgba(28, 28, 28, 0.9); border: 1px solid rgba(255, 255, 255, 0.1);
            transition: background-color 0.2s ease-in-out;
        }
        .social-btn:hover { background-color: rgba(38, 38, 38, 1); }
        .divider {
            display: flex; align-items: center; text-align: center; color: #6b7280;
            font-size: 0.75rem; letter-spacing: 0.05em;
        }
        .divider::before, .divider::after {
            content: ''; flex: 1; border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .divider:not(:empty)::before { margin-right: .5em; }
        .divider:not(:empty)::after { margin-left: .5em; }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.5s ease-out forwards; }
    `}</style>
);

export default GlobalStyles;

