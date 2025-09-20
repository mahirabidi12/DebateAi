import React, { useRef, useEffect } from 'react';

const Footer = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current; const ctx = canvas.getContext('2d'); let animationFrameId; let time = 0;
        const resizeCanvas = () => { if(!canvas) return; canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        const render = () => {
            time += 0.005; if (!ctx) return; ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2; const centerY = canvas.height / 2; const radius = Math.min(canvas.width, canvas.height) * 0.4;
            const x = centerX + Math.sin(time * 0.8) * 40; const y = centerY + Math.cos(time * 0.6) * 40;
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius); gradient.addColorStop(0, 'rgba(79, 70, 229, 0.4)'); gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');
            ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height); animationFrameId = requestAnimationFrame(render);
        };
        resizeCanvas(); render(); window.addEventListener('resize', resizeCanvas);
        return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', resizeCanvas); };
    }, []);

    return (
        <footer className="border-t border-gray-800 bg-grid">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20">
                 <div className="relative text-center rounded-t-3xl py-16 px-8 overflow-hidden">
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
                     <div className="relative z-10">
                         <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-300/80">Start Your Journey with DebateAi</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-gray-400">Join thousands of users who are already elevating their critical thinking and public speaking skills.</p>
                         <button className="mt-8 bg-indigo-500 text-white font-semibold px-8 py-3 rounded-md hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/20">Start For Free</button>
                     </div>
                 </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-500">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg><h1 className="text-xl text-white font-bold tracking-wider">DebateAi</h1></div>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.293 2.864 7.92 6.781 9.143.497.092.679-.216.679-.48 0-.236-.009-.865-.014-1.698-2.779.604-3.364-1.34-3.364-1.34-.452-1.148-1.103-1.454-1.103-1.454-.901-.617.068-.605.068-.605 1 .07 1.528 1.026 1.528 1.026.888 1.522 2.33 1.082 2.9.828.09-.643.348-1.082.63-1.332-2.21-.252-4.533-1.107-4.533-4.924 0-1.087.388-1.977 1.025-2.673-.103-.253-.444-1.265.097-2.634 0 0 .835-.267 2.735 1.02a9.56 9.56 0 015.002 0c1.898-1.287 2.732-1.02 2.732-1.02.543 1.37.202 2.38.1 2.634.64.696 1.024 1.586 1.024 2.673 0 3.828-2.326 4.67-4.542 4.915.357.308.675.918.675 1.852 0 1.335-.012 2.413-.012 2.74 0 .267.18.577.687.479C19.14 19.916 22 16.29 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"></path></svg></a>
                             <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                        </div>
                    </div>
                    <div><h4 className="font-semibold text-white">Product</h4><ul className="space-y-3 mt-4"><li><a href="#features" className="hover:text-white transition-colors">Features</a></li><li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li><li><a href="#" className="hover:text-white transition-colors">Login</a></li></ul></div>
                    <div><h4 className="font-semibold text-white">Resources</h4><ul className="space-y-3 mt-4"><li><a href="#" className="hover:text-white transition-colors">Blog</a></li><li><a href="#community" className="hover:text-white transition-colors">Community</a></li><li><a href="#" className="hover:text-white transition-colors">Support</a></li></ul></div>
                    <div><h4 className="font-semibold text-white">Company</h4><ul className="space-y-3 mt-4"><li><a href="#" className="hover:text-white transition-colors">About Us</a></li><li><a href="#" className="hover:text-white transition-colors">Contact</a></li><li><a href="#" className="hover:text-white transition-colors">Careers</a></li></ul></div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p className="order-2 sm:order-1 mt-4 sm:mt-0">&copy; {new Date().getFullYear()} DebateAi. All rights reserved.</p>
                    <div className="order-1 sm:order-2 flex space-x-6"><span>Privacy Policy</span><span>Terms of Service</span></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

