'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate boot sequence wait
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-[#0a0a0a] flex items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center justify-center gap-8 w-64 sm:w-80">
            {/* 3D Solar System Preloader */}
            <div 
              className="relative w-64 h-64 flex items-center justify-center mb-6"
              style={{ perspective: 1000 }}
            >
              <div 
                className="relative w-full h-full flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d', transform: 'rotateX(70deg)' }}
              >
                {/* Sun */}
                <motion.div 
                  className="absolute w-8 h-8 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.8)]"
                  style={{ transform: 'rotateX(-70deg)' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* 8 Planets */}
                {[
                  { radius: 45, color: "#9ca3af", duration: 1.5, size: 4 }, // Mercury
                  { radius: 65, color: "#fdba74", duration: 2.5, size: 6 }, // Venus
                  { radius: 90, color: "#60a5fa", duration: 3.5, size: 8 }, // Earth
                  { radius: 115, color: "#f87171", duration: 5, size: 6 }, // Mars
                  { radius: 155, color: "#00ff99", duration: 8, size: 14 }, // Jupiter (themed)
                  { radius: 190, color: "#fef08a", duration: 12, size: 12 }, // Saturn
                  { radius: 220, color: "#5eead4", duration: 16, size: 10 }, // Uranus
                  { radius: 250, color: "#3b82f6", duration: 20, size: 10 }, // Neptune
                ].map((planet, i) => (
                  <div 
                    key={i} 
                    className="absolute border border-white/10 rounded-full" 
                    style={{ 
                      width: planet.radius, 
                      height: planet.radius,
                      transformStyle: 'preserve-3d' 
                    }}
                  >
                    <motion.div 
                      className="w-full h-full"
                      animate={{ rotateZ: 360 }}
                      transition={{ duration: planet.duration, repeat: Infinity, ease: "linear" }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div 
                        className="absolute rounded-full"
                        style={{ 
                          width: planet.size,
                          height: planet.size,
                          backgroundColor: planet.color,
                          boxShadow: `0 0 15px ${planet.color}`,
                          top: -planet.size / 2,
                          left: '50%',
                          marginLeft: -planet.size / 2,
                          transform: 'rotateX(-70deg)' 
                        }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loading Bar */}
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono tracking-widest">
                <span className="text-[#00ff99]">INITIALIZING</span>
                <span className="text-white/40">SYSTEM</span>
              </div>
              <div className="h-[2px] w-full bg-white/10 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00ff99] to-teal-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
              </div>
            </div>

            <motion.div
              className="text-white/40 tracking-[0.4em] text-[10px] sm:text-xs font-bold uppercase mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                Welcome
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
