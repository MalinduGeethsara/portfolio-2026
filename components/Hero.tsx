'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between py-32 px-6">
      <div className="md:w-1/2 space-y-6 text-center md:text-left order-2 md:order-1">
        <span className="text-lg tracking-widest uppercase text-white/80">Software Developer</span>
        <h1 className="text-6xl md:text-8xl font-black leading-tight">
          Hello I'm <br />
          <span className="text-[#00ff99]">Malindu Geethsara</span>
        </h1>
        <p className="text-white/60 text-lg max-w-lg leading-relaxed">
          I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.
        </p>

        <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start pt-4">
          <button className="border border-[#00ff99] text-[#00ff99] px-8 py-3 rounded-full flex items-center gap-2 font-bold hover:bg-[#00ff99] hover:text-black transition-all">
            DOWNLOAD CV <span>↓</span>
          </button>
          <div className="flex gap-4">
             <div className="w-10 h-10 border border-[#00ff99] rounded-full flex items-center justify-center text-[#00ff99] hover:bg-[#00ff99] hover:text-black cursor-pointer transition-all">GH</div>
             <div className="w-10 h-10 border border-[#00ff99] rounded-full flex items-center justify-center text-[#00ff99] hover:bg-[#00ff99] hover:text-black cursor-pointer transition-all">IN</div>
          </div>
        </div>
      </div>
      

      <div className="md:w-1/2 flex justify-center md:justify-end order-1 md:order-2 mb-12 md:mb-0">
        <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">

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

          <div className="absolute inset-4 overflow-hidden rounded-full">
            <Image 
              src="/profile.png" 
              alt="Malindu Geethsara"
              fill
              priority
              quality={100}
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}