import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resizeCanvas();
        class Particle {
            constructor(x, y) { this.x = x; this.y = y; this.size = Math.random() * 1.5 + 0.5; this.speedX = Math.random() * 2 - 1; this.speedY = Math.random() * 2 - 1; this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`; }
            update() { this.x += this.speedX; this.y += this.speedY; if (this.size > 0.1) this.size -= 0.01; }
            draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
        }
        function handleParticles() {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(); particles[i].draw();
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x; const dy = particles[i].y - particles[j].y; const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) { ctx.beginPath(); ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`; ctx.lineWidth = 0.2; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); }
                }
                if (particles[i].size <= 0.1) { particles.splice(i, 1); i--; }
            }
        }
        let animationFrameId;
        function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); handleParticles(); animationFrameId = requestAnimationFrame(animate); }
        const createParticle = (e) => { const x = e.clientX; const y = e.clientY; for (let i = 0; i < 5; i++) { particles.push(new Particle(x, y)); } };
        window.addEventListener('mousemove', createParticle); window.addEventListener('resize', resizeCanvas);
        for (let i = 0; i < 50; i++) { particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height)); }
        animate();
        return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('mousemove', createParticle); window.removeEventListener('resize', resizeCanvas); };
    }, []);
    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }} />;
};

export default BackgroundAnimation;

