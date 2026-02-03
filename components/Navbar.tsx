'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#1c1c22]/80 backdrop-blur-md py-6">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="#home">
          <h1 className="text-3xl font-bold cursor-pointer">
           Malindu<span className="text-[#00ff99] animate-pulse">.</span>
          </h1>
        </Link>
        
        {/* Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-8 font-medium text-white/90">
            {['Home', 'Skills', 'Projects', 'Education'].map((item) => (
              <li key={item}>
                <Link 
                  href={`#${item.toLowerCase()}`} 
                  className="hover:text-[#00ff99] transition-all"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
            <button onClick={toggleMenu} className="text-3xl text-[#00ff99]">
                {isOpen ? <FiX /> : <FiMenu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-[#1c1c22] border-b border-white/10 overflow-hidden"
            >
                <ul className="flex flex-col items-center gap-6 py-8 font-medium text-white/90">
                    {['Home', 'Skills', 'Projects', 'Education'].map((item) => (
                    <li key={item}>
                        <Link 
                            href={`#${item.toLowerCase()}`} 
                            className="text-xl hover:text-[#00ff99] transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </Link>
                    </li>
                    ))}
                </ul>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}