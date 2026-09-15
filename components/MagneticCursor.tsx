'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MagneticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  // Hide native cursor completely by injecting global style
  useEffect(() => {
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
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#00ff99]/50 rounded-full pointer-events-none z-[9998]"
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
