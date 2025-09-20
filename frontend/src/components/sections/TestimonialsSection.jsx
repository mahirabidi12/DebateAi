import React from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';

const TestimonialsSection = () => {
    const testimonials = [
        { quote: `DebateAi has been a game-changer for my competitive debating. The AI is incredibly sharp and has helped me identify weaknesses in my arguments I never saw before.`, name: "Sarah J.", title: "National Debate Champion" },
        { quote: `As someone new to formal debate, this platform was the perfect training ground. It's challenging but not intimidating. I feel much more confident in my speaking abilities now.`, name: "Michael B.", title: "University Student" },
        { quote: `The instant feedback feature is invaluable. I can see exactly where my arguments are weak and how to improve them for my next law school competition.`, name: "Jessica L.", title: "Aspiring Lawyer"},
        { quote: `A fantastic tool for any professional who needs to stay sharp and persuasive. I use it to prepare for board meetings and important negotiations.`, name: "David C.", title: "Corporate Executive"},
        { quote: `Incredibly sophisticated AI. It's like having a world-class debate coach available 24/7. My students have shown remarkable improvement since we incorporated it.`, name: "Prof. Emily R.", title: "Forensics Coach"}
    ];

    const TestimonialList = ({ 'aria-hidden': ariaHidden }) => (
        <ul className="flex items-stretch justify-center animate-scroll-x" style={{ animationDuration: '60s' }}>
            {testimonials.map((t, i) => (
                <li key={i} className="flex-shrink-0 w-80 sm:w-96 mx-4">
                    <div className="h-full p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm flex flex-col justify-between" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '20px 20px' }}>
                        <p className="text-lg text-gray-300">"{t.quote}"</p>
                        <div className="mt-6">
                            <p className="font-bold text-white">{t.name}</p>
                            <p className="text-sm text-indigo-400">{t.title}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );

    return (
        <section id="community" className="py-12 sm:py-20 relative bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <AnimateOnScroll>
                        <span className="text-sm font-bold text-indigo-400">Testimonials</span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">What Our Users are Saying</h2>
                        <p className="mt-4 text-gray-400 text-base sm:text-lg">Hear from real users who have sharpened their minds with DebateAi.</p>
                    </AnimateOnScroll>
                </div>
            </div>
            <div className="mt-16 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <TestimonialList />
                <TestimonialList aria-hidden={true} />
            </div>
        </section>
    );
};

export default TestimonialsSection;

