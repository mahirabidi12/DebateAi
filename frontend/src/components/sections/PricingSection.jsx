import React, { useState } from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';

const PricingSection = () => {
    const [isAnnual, setIsAnnual] = useState(true);
    const plans = [
        { name: "Hobbyist", price: 0, description: "For the casual enthusiast.", features: ["5 debates per month", "Standard AI model", "Basic performance metrics"], buttonText: "Start for Free", highlighted: false },
        { name: "Competitor", price: 10, description: "For the aspiring champion.", features: ["Unlimited debates", "Advanced AI models", "In-depth argument analysis", "Priority support"], buttonText: "Start 7-Day Trial", highlighted: true },
        { name: "Professional", price: 25, description: "For teams and institutions.", features: ["Everything in Competitor", "Team management features", "Custom AI tuning", "Dedicated support"], buttonText: "Contact Sales", highlighted: false },
    ];
    return (
        <section id="pricing" className="py-12 sm:py-20"><div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll className="text-center max-w-3xl mx-auto"><span className="text-sm font-bold text-indigo-400">Pricing</span><h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">A Plan for Every Level of Ambition</h2><p className="mt-4 text-gray-400 text-base sm:text-lg">Whether you're just starting or you're a seasoned professional, there's a DebateAi plan for you.</p></AnimateOnScroll>
            <AnimateOnScroll className="flex justify-center my-10" stagger={150}><div className="bg-gray-900/50 border border-gray-700 rounded-full p-1 flex items-center space-x-2"><button onClick={() => setIsAnnual(false)} className={`px-4 py-1.5 text-sm rounded-full transition-colors ${!isAnnual ? 'bg-white text-black' : 'text-gray-300'}`}>Monthly</button><button onClick={() => setIsAnnual(true)} className={`px-4 py-1.5 text-sm rounded-full transition-colors ${isAnnual ? 'bg-white text-black' : 'text-gray-300'}`}>Annually <span className="text-indigo-400">Save 20%</span></button></div></AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">{plans.map((plan, index) => (<AnimateOnScroll key={index} stagger={index * 150} className={`p-8 rounded-2xl transition-all duration-300 ${plan.highlighted ? 'bg-indigo-600/10 border-2 border-indigo-500' : 'bg-gray-900/50 border border-gray-800'}`}><h3 className="text-lg font-semibold">{plan.name}</h3><p className="text-4xl font-bold mt-4">${plan.price > 0 ? (isAnnual ? Math.round(plan.price * 12 * 0.8) : plan.price) : 0} <span className="text-sm font-normal text-gray-400">{plan.price > 0 ? (isAnnual ? '/year' : '/month') : 'Forever'}</span></p><p className="text-gray-400 mt-2">{plan.description}</p><button className={`w-full mt-8 py-3 rounded-md font-semibold transition-colors ${plan.highlighted ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white text-black hover:bg-gray-200'}`}>{plan.buttonText}</button><ul className="mt-8 space-y-3 text-sm text-gray-300">{plan.features.map((feature, fIndex) => (<li key={fIndex} className="flex items-center"><svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>{feature}</li>))}</ul></AnimateOnScroll>))}</div>
        </div></section>
    );
};

export default PricingSection;

