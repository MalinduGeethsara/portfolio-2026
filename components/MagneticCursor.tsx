'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function MagneticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<{x: number, y: number, size: number, vx: number, vy: number, alpha: number}[]>([]);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      const target = e.target as HTMLElement;
      // Look for any interactive element or explicit .magnetic class
      const interactiveElement = target.closest('a, button, .magnetic') as HTMLElement;

      if (interactiveElement) {
        setIsHovered(true);
        const rect = interactiveElement.getBoundingClientRect();
        
        // Calculate center of the element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center to mouse
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Magnetic pull logic (pull cursor towards center of element)
        targetX = centerX + distanceX * 0.1;
        targetY = centerY + distanceY * 0.1;
      } else {
        setIsHovered(false);
      }

      mouseX.set(targetX);
      mouseY.set(targetY);

      // Spawn stardust particles
      if (Math.random() > 0.3) { // Adjust spawn rate
        particles.current.push({
          x: targetX,
          y: targetY,
          size: Math.random() * 2.5 + 0.5,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          alpha: 1
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  // Canvas Particle Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.alpha -= 0.02; // Fade out speed
        p.size -= 0.03; // Shrink speed
        p.x += p.vx;
        p.y += p.vy;

        if (p.alpha <= 0 || p.size <= 0) {
          particles.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 153, ${p.alpha})`; // #00ff99 color
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Hide native cursor completely by injecting global style
  useEffect(() => {
    if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    document.body.style.cursor = 'none';
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach((el) => {
      (el as HTMLElement).style.cursor = 'none';
    });
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <canvas 
        ref={canvasRef}
        className="hidden md:block fixed inset-0 pointer-events-none z-[9997]"
      />
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-10 h-10 border border-[#00ff99]/50 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? "rgba(0, 255, 153, 0.1)" : "rgba(0, 255, 153, 0)",
          borderColor: isHovered ? "rgba(0, 255, 153, 0)" : "rgba(0, 255, 153, 0.5)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
