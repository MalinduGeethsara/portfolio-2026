'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiArrowDown } from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3 
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 } 
  }
};

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-between py-20 md:py-32 px-6 overflow-hidden">
      
      <motion.div 
        className="w-full md:w-1/2 space-y-6 text-center md:text-left order-2 md:order-1 mt-8 md:mt-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={itemVariants} className="text-sm md:text-lg tracking-widest uppercase text-white/80">
          Software Developer
        </motion.span>
        
        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-8xl font-black leading-tight">
          Hello I'm <br />
          <span className="text-[#00ff99]">Malindu Geethsara</span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mx-auto md:mx-0">
          I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 items-center justify-center md:justify-start pt-4">
          <motion.a 
            href="/Malindu_Geethsara_CV.pdf" 
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-[#00ff99] text-[#00ff99] px-8 py-3 rounded-full flex items-center gap-2 font-bold hover:bg-[#00ff99] hover:text-black transition-colors"
          >
            DOWNLOAD CV <span>↓</span>
          </motion.a>
          
          <div className="flex gap-4">
            {[ 
              { icon: FaGithub, href: "https://github.com/MalinduGeethsara" },
              { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/malindu-geethsara-728557237/" }
            ].map((social, index) => (
              <motion.a 
                key={index}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 border border-[#00ff99] rounded-full flex items-center justify-center text-[#00ff99] hover:bg-[#00ff99] hover:text-black cursor-pointer transition-colors"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2 mb-8 md:mb-0">
        <div className="relative w-64 h-64 md:w-100 md:h-100">
          
          <motion.svg
            className="absolute inset-0 w-full h-full"
            fill="transparent"
            viewBox="0 0 506 506"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="253"
              cy="253"
              r="250"
              stroke="#00ff99"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ strokeDasharray: "24 10 0 0" }}
              animate={{
                strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                rotate: [120, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.svg>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="absolute inset-4 overflow-hidden rounded-full"
          >
            <Image 
              src="/profile.png" 
              alt="Malindu Geethsara"
              fill
              priority
              quality={100}
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden md:block absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20"
      >
        <a href="#skills" aria-label="Scroll down">
           <FiArrowDown className="text-3xl text-[#00ff99] animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}