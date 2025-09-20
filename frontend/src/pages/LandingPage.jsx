// import React from 'react';

// import Header from '../components/layouts/Header';
// import HeroSection from '../components/sections/HeroSection';
// import ScrollingLogos from '../components/sections/ScrollingLogos';
// import FeaturesSection from '../components/sections/FeaturesSection';
// import HowItWorksSection from '../components/sections/HowItWorksSection';
// import TestimonialsSection from '../components/sections/TestimonialsSection';
// import PricingSection from '../components/sections/PricingSection';
// import FAQSection from '../components/sections/FAQSection';
// import Footer from '../components/layouts/Footer';
// import BackgroundAnimation from '../components/ui/BackgroundAnimation';


// export default function LandingPage() {
//     return (
//         <div className="bg-black text-white font-sans antialiased">
//             <div className="relative min-h-screen overflow-hidden">
//                 <BackgroundAnimation />
//                 <div className="relative z-10">
//                     <Header />
//                     <main className="pt-24 md:pt-32">
//                         <HeroSection />
//                         <ScrollingLogos />
//                         <FeaturesSection />
//                         <HowItWorksSection />
//                         <TestimonialsSection />
//                         <PricingSection />
//                         <FAQSection />
//                         <Footer />
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React from 'react';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import HeroSection from '../components/sections/HeroSection';
import ScrollingLogos from '../components/sections/ScrollingLogos';
import FeaturesSection from '../components/sections/FeaturesSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import PricingSection from '../components/sections/PricingSection';
import FAQSection from '../components/sections/FAQSection';
import BackgroundAnimation from '../components/ui/BackgroundAnimation';

export const LandingPage = () => {
    return (
        <div className="bg-black text-white font-sans antialiased">
            <div className="relative min-h-screen overflow-hidden">
                <BackgroundAnimation />
                <div className="relative z-10">
                    <Header />
                    <main className="pt-24 md:pt-32">
                        <HeroSection />
                        <ScrollingLogos />
                        <FeaturesSection />
                        <HowItWorksSection />
                        <TestimonialsSection />
                        <PricingSection />
                        <FAQSection />
                        <Footer />
                    </main>
                </div>
            </div>
        </div>
    );
};

