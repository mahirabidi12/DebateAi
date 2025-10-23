import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../ui/AnimatedText';
import AnimateOnScroll from '../ui/AnimateOnScroll';

const HeroSection = () => {
    const handleScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center min-h-[calc(100vh-200px)] justify-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight md:leading-tight">Master the Art of Debate with <br className="hidden md:block" /><AnimatedText text="Your AI Partner" /></h1>
                <AnimateOnScroll>
                    <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto" >Hone your arguments, challenge your perspectives, and become a more persuasive speaker with DebateAi, the ultimate platform for intellectual growth.</p>
                </AnimateOnScroll>
                <AnimateOnScroll stagger={200}>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/signup" className="bg-white text-black font-semibold px-8 py-3 rounded-md w-full sm:w-auto hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gray-500/10">Start Debating For Free</Link>
                        <a href="#how-it-works" onClick={handleScroll} className="border border-gray-700 text-gray-300 font-semibold px-8 py-3 rounded-md w-full sm:w-auto hover:bg-gray-900 hover:border-gray-500 transition-all duration-300 transform hover:scale-105">How it Works</a>
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
};

export default HeroSection;
