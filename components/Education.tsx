'use client';
import { motion } from 'framer-motion';
import { FiBookOpen, FiMapPin, FiCalendar } from 'react-icons/fi';

export default function Education() {
  const educationData = [
    {
      institution: "SLIIT CITY UNI",
      period: "2023 - Present",
      degree: "Undergraduate in Information Technology",
      location: "Colombo",
      description: "Focusing on Software Engineering, Web Development, and Database Management."
    },
    {
      institution: "Walasmulla National School",
      period: "2007 - 2020",
      degree: "Physical Science (A/L)",
      location: "Walasmulla",
      description: "Completed secondary education with a focus on Mathematics, Physics, and Chemistry."
    }
  ];

  return (
    // Added 'overflow-hidden' to the section class below
    <section id="education" className="py-24 overflow-hidden">
      <div className="flex flex-col gap-4 mb-16">
        <h2 className="text-4xl font-bold text-white">
          My <span className="text-[#00ff99]">Education</span>
        </h2>
        <div className="w-20 h-1.5 bg-[#00ff99] rounded-full"></div>
      </div>

      <div className="relative max-w-3xl mx-auto">
        
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-linear-to-b from-[#00ff99] to-transparent opacity-20" />

        <div className="space-y-12">
          {educationData.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center justify-between w-full ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#1c1c22] border-2 border-[#00ff99] rounded-full z-10 shadow-[0_0_10px_rgba(0,255,153,0.5)]" />

              <div className="w-full md:w-[45%] ml-8 md:ml-0">
                <div className="p-6 bg-[#232329] border border-white/5 rounded-2xl hover:border-[#00ff99]/30 transition-all group">
                  <div className="flex items-center gap-2 text-[#00ff99] text-sm font-mono mb-2">
                    <FiCalendar />
                    <span>{edu.period}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00ff99] transition-colors">
                    {edu.institution}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                    <FiBookOpen className="text-xs" />
                    <span>{edu.degree}</span>
                    <span className="mx-1">•</span>
                    <FiMapPin className="text-xs" />
                    <span>{edu.location}</span>
                  </div>

                  <p className="text-white/40 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}