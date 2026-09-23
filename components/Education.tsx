'use client';
import { FiBookOpen, FiMapPin, FiCalendar } from 'react-icons/fi';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Education() {
  const container = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const educationData = [
    {
      institution: "Walasmulla National School",
      period: "2007 - 2020",
      degree: "Physical Science (A/L)",
      location: "Walasmulla",
      description: "Completed secondary education with a focus on Mathematics, Physics, and Chemistry."
    },
    {
      institution: "SLIIT CITY UNI",
      period: "2023 - Present",
      degree: "Undergraduate in Information Technology",
      location: "Colombo",
      description: "Focusing on Software Engineering, Web Development, and Database Management."
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Draw the central glowing timeline line
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        }
      );

      // Animate each card when it enters the viewport
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        // Find the dot inside the card container to animate it popping in
        const dot = card.querySelector('.timeline-dot');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        });

        tl.fromTo(dot, 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        ).fromTo(card.querySelector('.glass-card'), 
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="relative z-10 pt-16 md:pt-20 pb-24 md:pb-32 overflow-hidden" ref={container}>
      <div className="flex flex-col items-center md:items-start gap-4 mb-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white">
          My <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00ff99] to-teal-400">Education</span>
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        
        {/* GSAP ScrollTrigger Line */}
        <div 
          ref={lineRef}
          className="absolute left-6 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-[#00ff99] to-teal-900 shadow-[0_0_15px_#00ff99]" 
        />

        <div className="space-y-24">
          {educationData.map((edu, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className={`relative flex flex-col md:flex-row items-center justify-between w-full ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* The Timeline Dot */}
              <div className="timeline-dot absolute left-6 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#0a0a0a] border-4 border-[#00ff99] rounded-full z-10 shadow-[0_0_20px_rgba(0,255,153,0.8)]" />

              <div className="w-full md:w-[45%] pl-16 md:pl-0">
                <div className="glass-card p-8 md:p-10 glass border border-white/10 rounded-3xl hover:border-[#00ff99]/50 transition-all duration-500 group relative overflow-hidden">
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-[#00ff99]/0 group-hover:bg-[#00ff99]/5 transition-colors duration-500" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 text-[#00ff99] bg-[#00ff99]/10 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-[#00ff99]/20">
                      <FiCalendar />
                      <span>{edu.period}</span>
                    </div>
                    
                    <h3 className="text-3xl font-black text-white mb-2 group-hover:text-[#00ff99] transition-colors">
                      {edu.institution}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm font-medium mb-6 bg-black/30 p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2"><FiBookOpen className="text-[#00ff99]" /> {edu.degree}</div>
                      <span className="hidden md:inline">•</span>
                      <div className="flex items-center gap-2"><FiMapPin className="text-teal-400" /> {edu.location}</div>
                    </div>

                    <p className="text-white/50 text-base leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden md:block w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}