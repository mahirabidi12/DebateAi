import React from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-6 md:p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm transition-all duration-500 hover:border-indigo-500/50 hover:bg-gray-900/70 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
        <div className="text-indigo-400 mb-4">{icon}</div><h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3><p className="text-sm md:text-base text-gray-400">{description}</p>
    </div>
);

const FeaturesSection = () => {
    const features = [
        { icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10c0-4.42-2.87-8.15-6.84-9.44"></path><path d="m12 2l-2.5 5L12 9.5l2.5-2.5L12 2z"></path><path d="M12 22a10 10 0 0 0 7.14-2.95"></path><path d="M12 22a10 10 0 0 1-7.14-2.95"></path><circle cx="12" cy="12" r="3"></circle></svg>, title: "Dynamic AI Opponents", description: "Face AI adversaries that adapt to your skill level, offering a challenging debate every time, from novice to expert." },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>, title: "Instant Performance Analysis", description: "Receive immediate, actionable feedback on logical fallacies, argument strength, and rhetorical effectiveness." },
        { icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>, title: "Vast Topic Library", description: "Explore and debate on thousands of topics across politics, philosophy, technology, and more, or create your own." }
    ];
    return (
        <section id="features" className="py-12 sm:py-20 relative bg-grid">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <AnimateOnScroll className="text-center max-w-3xl mx-auto"><h2 className="text-3xl sm:text-4xl font-bold tracking-tight">The Future of Intellectual Sparring</h2><p className="mt-4 text-gray-400 text-base sm:text-lg">DebateAi provides the tools you need to become a more formidable and articulate debater.</p></AnimateOnScroll>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">{features.map((feature, index) => (<AnimateOnScroll key={index} stagger={index * 150}><FeatureCard {...feature} /></AnimateOnScroll>))}</div>
        </div></section>
    );
};

export default FeaturesSection;

