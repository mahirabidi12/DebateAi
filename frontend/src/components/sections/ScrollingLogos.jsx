import React from 'react';

const ScrollingLogos = () => {
    const logos = ["Harvard", "Stanford", "Yale", "Oxford", "Cambridge", "MIT", "Princeton", "Columbia", "UChicago", "Caltech", "ETH Zurich", "Imperial College"];
    
    const LogosList = ({'aria-hidden': ariaHidden}) => (
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-scroll-x" aria-hidden={ariaHidden}>
            {logos.map((logo, index) => (
                <li key={index} className="flex-shrink-0">
                   <span className="text-gray-500 font-medium text-2xl whitespace-nowrap">{logo}</span>
                </li>
            ))}
        </ul>
    );

    return (
        <section className="py-12 bg-black">
             <div className="text-center mb-8"><p className="text-sm text-gray-500 tracking-widest">TRUSTED BY DEBATERS AT LEADING INSTITUTIONS</p></div>
            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <LogosList />
                <LogosList aria-hidden={true} />
            </div>
        </section>
    );
};

export default ScrollingLogos;

