import React, { useState } from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import ScrollHighlightHeading from '../ui/ScrollHighlightHeading';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (<div className="border-b border-gray-800 py-6"><button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left"><h4 className="text-lg font-medium text-white">{question}</h4><span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}><svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></span></button><div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}><p className="text-gray-400">{answer}</p></div></div>);
};

const FAQSection = () => {
    const faqs = [
        { question: "How does the AI adapt to my skill level?", answer: "Our AI uses a dynamic difficulty scaling system. It analyzes your argument complexity, response times, and logical consistency to adjust its own strategy, ensuring you're always challenged but never overwhelmed." },
        { question: "Can I use DebateAi to prepare for specific competitions?", answer: "Absolutely. You can create custom debate formats, set time limits, and even upload case files or topic briefs to simulate real competition environments. The 'Competitor' plan is designed specifically for this purpose." },
        { question: "What kind of feedback will I receive?", answer: "You'll get a post-debate report card that scores you on several metrics: argument clarity, evidence usage, rebuttal effectiveness, and detection of logical fallacies. It also provides specific examples and suggestions for improvement." },
        { question: "Is my data and debate history kept private?", answer: "Yes, your privacy is paramount. All debates are stored securely and are only accessible to you. We do not use your data to train our models without your explicit consent." },
    ];
    return (<section id="faq" className="py-12 sm:py-20"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"><div className="md:sticky top-24"><span className="text-sm font-bold text-indigo-400">FAQ</span><ScrollHighlightHeading text="Frequently Asked Questions" /><p className="mt-4 text-gray-400">Find answers to common questions about the DebateAi platform.</p></div><div>{faqs.map((faq, index) => (<AnimateOnScroll key={index} stagger={index * 100}><FAQItem {...faq} /></AnimateOnScroll>))}</div></div></div></section>);
};

export default FAQSection;

