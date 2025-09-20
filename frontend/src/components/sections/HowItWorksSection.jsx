import React from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';

const HowItWorksSection = () => {
    const steps = [
        { id: '01', title: 'Create Your Account', description: 'A quick and easy sign-up gives you immediate access to the platform.' },
        { id: '02', title: 'Select Your Topic & Stance', description: 'Choose from our vast library or propose your own topic to begin the debate.' },
        { id: '03', title: 'Engage in Structured Debate', description: 'Present your arguments, counter the AI’s points, and build your case in a timed, structured format.' },
        { id: '04', title: 'Review Your Analysis', description: 'Receive a detailed breakdown of your performance, pinpointing strengths and areas for improvement.' },
    ];
    return (
        <section className="py-12 sm:py-20"><div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll className="text-center max-w-3xl mx-auto"><h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Get Started in Four Simple Steps</h2><p className="mt-4 text-gray-400 text-base sm:text-lg">Follow this path to begin sharpening your mind and your words.</p></AnimateOnScroll>
            <div className="mt-16 max-w-4xl mx-auto">{steps.map((step, index) => (<AnimateOnScroll key={index} stagger={index * 150} className="flex flex-col md:flex-row items-start gap-6 md:gap-12 mb-12"><div className="text-5xl md:text-6xl font-bold text-gray-700">{step.id}</div><div><h3 className="text-xl md:text-2xl font-semibold text-white">{step.title}</h3><p className="mt-2 text-gray-400">{step.description}</p></div></AnimateOnScroll>))}</div>
        </div></section>
    );
};

export default HowItWorksSection;

