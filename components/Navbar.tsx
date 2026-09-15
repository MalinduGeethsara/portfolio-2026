'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-5">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <h1 className="text-3xl font-bold cursor-pointer">
           Malindu<span className="text-[#00ff99] animate-pulse">.</span>
          </h1>
        </a>
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

        <div className="md:hidden">
            <button onClick={toggleMenu} className="text-3xl text-[#00ff99]">
                {isOpen ? <FiX /> : <FiMenu />}
            </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-black/40 backdrop-blur-xl border-b border-white/5 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
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