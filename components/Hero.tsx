'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Avatar3D = dynamic(() => import('./canvas/Avatar3D'), { ssr: false });
import { FiArrowDown } from 'react-icons/fi';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const ref = useRef(null);
  const scrollTextRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax exit animations
  // Removed yPos and scale because they cause layout shifts that desync the 3D canvas dimensions when scrolling back up
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // GSAP Background Marquee Scroll Effect
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(scrollTextRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom top",
          scrub: 1.5 // Smooth scrubbing lag
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="home" className="min-h-screen relative flex flex-col items-center justify-center py-20 px-6 overflow-hidden">



      <motion.div
        style={{ opacity }}
        className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between z-10 origin-top pt-12 md:pt-0"
      >
        <motion.div
          className="w-full md:w-1/2 space-y-6 text-center md:text-left order-2 md:order-1 mt-12 md:mt-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={itemVariants} className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm md:text-md tracking-widest uppercase text-[#00ff99] font-bold shadow-[0_0_15px_rgba(0,255,153,0.1)]">
            Software Developer
          </motion.span>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight text-white">
            Hello I'm <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00ff99] to-teal-400 drop-shadow-[0_0_15px_rgba(0,255,153,0.3)]">
              Malindu Geethsara
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mx-auto md:mx-0">
            Highly adaptable and dedicated developer specializing in building impactful, intuitive applications. Passionate about lifelong professional development and collective effort to produce innovative outcomes.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 items-center justify-center md:justify-start pt-6">
            <motion.a
              href="/MALINDU_GEETHSARA_CV.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden border border-[#00ff99] text-[#00ff99] px-8 py-3.5 rounded-full flex items-center gap-2 font-bold transition-all cursor-pointer shadow-[0_0_20px_rgba(0,255,153,0.15)] hover:shadow-[0_0_30px_rgba(0,255,153,0.4)]"
            >
              <span className="absolute inset-0 bg-[#00ff99] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative group-hover:text-black transition-colors duration-300">DOWNLOAD CV</span>
              <span className="relative group-hover:text-black transition-colors duration-300 group-hover:translate-y-1 inline-block">↓</span>
            </motion.a>

            <div className="flex gap-4">
              {[
                { icon: FaGithub, href: "https://github.com/MalinduGeethsara" },
                { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/malindu-geethsara-/" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 10, backgroundColor: "#00ff99", color: "#000" }}
                  whileTap={{ scale: 0.9 }}
                  className="magnetic w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:border-[#00ff99] cursor-pointer transition-colors backdrop-blur-md bg-white/5"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2 mb-12 md:mb-0 relative">
          <div className="magnetic relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px] group cursor-none">

            {/* Ambient Profile Glow */}
            <div className="absolute inset-0 bg-[#00ff99]/20 blur-[40px] rounded-full mix-blend-screen group-hover:bg-[#00ff99]/40 transition-colors duration-500" />

            <motion.svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              fill="transparent"
              viewBox="0 0 506 506"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.circle
                cx="253"
                cy="253"
                r="250"
                stroke="url(#gradient)"
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
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ff99" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </motion.svg>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="absolute inset-4 overflow-hidden rounded-full border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-sm flex items-center justify-center pointer-events-auto"
            >
              <Avatar3D />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <a href="#skills" aria-label="Scroll down" className="flex flex-col items-center gap-2 group cursor-pointer magnetic">
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase group-hover:text-[#00ff99] transition-colors">Scroll</span>
          <FiArrowDown className="text-2xl text-white/30 group-hover:text-[#00ff99] animate-bounce transition-colors" />
        </a>
      </motion.div>
    </section>
  );
}