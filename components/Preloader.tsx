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
            {/* Minimalist Geometry */}
            <motion.div
              className="relative w-16 h-16 mb-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="absolute inset-0 border border-[#00ff99]/30 rounded-lg rotate-45"
                animate={{ rotate: [45, 225] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-0 border border-teal-400/50 rounded-lg rotate-[60deg]"
                animate={{ rotate: [60, -120] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#00ff99] rounded-full shadow-[0_0_10px_#00ff99] animate-pulse" />
              </div>
            </motion.div>

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
