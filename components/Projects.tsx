'use client';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FiGithub, FiFolder, FiX, FiExternalLink } from 'react-icons/fi';
import React, { useState } from 'react';

type Project = {
  title: string;
  status: string;
  desc: string;
  tech: string[];
  github: string;
  live?: string;
};

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number, onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
      className="h-full cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        layoutId={`project-${project.title}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="group relative bg-[#232329]/70 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-[#00ff99]/50 transition-colors duration-300 flex flex-col h-full shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      >
        <div style={{ transform: "translateZ(50px)" }} className="flex justify-between items-center mb-6">
          <FiFolder className="text-4xl text-[#00ff99]" />
          <div className="flex gap-4 text-xl text-white/70">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#00ff99] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub />
            </a>
          </div>
        </div>

        <div style={{ transform: "translateZ(30px)" }} className="flex-grow">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-[#00ff99] transition-colors">
              {project.title}
            </h3>
            {project.status === "Ongoing" && (
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#00ff99] text-[#00ff99]">
                {project.status}
              </span>
            )}
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            {project.desc}
          </p>
        </div>

        <ul style={{ transform: "translateZ(40px)" }} className="flex flex-wrap gap-3 mt-auto">
          {project.tech.map((t, index) => (
            <li key={index} className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded-md">
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = [
    {
      title: "Salon Management System",
      status: "Completed",
      desc: "System for online booking, integrated payments, real-time SMS notifications, and automated monthly financial reporting.",
      tech: ["React", "Node.js", "MySQL", "Tailwind"],
      github: "https://github.com/MalinduGeethsara/saloon-management-system"
    },
    {
      title: "Kings-Clothing-Store",
      status: "Completed",
      desc: "A full-stack, responsive web application for apparel sales, built to handle product catalog display and user management.",
      tech: ["PHP", "MySQL", "TailwindCSS", "JS"],
      github: "https://github.com/MalinduGeethsara/KIngs-Clothing-Store"
    },
    {
      title: "MediCare Plus",
      status: "Completed",
      desc: "Pharmacy Management System built for handling product catalogs and order processing.",
      tech: ["Java", "PHP", "MySQL", "JavaScript"],
      github: "https://github.com/MalinduGeethsara/Pharmacy-Management-System"
    },
    {
      title: "GT-Shirt E-Commerce",
      status: "Completed",
      desc: "E-commerce platform for a T-shirt business, built using PHP, Tailwind CSS, JavaScript, and MySQL.",
      tech: ["PHP", "TailwindCSS", "JS", "MySQL"],
      github: "https://github.com/MalinduGeethsara/Project_GT-Shirt-"
    },
    {
      title: "Fuel QR System",
      status: "Completed",
      desc: "A QR-code based fuel allocation and tracking system.",
      tech: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/MalinduGeethsara/Fuel-QR-System"
    },
    {
      title: "Travel Go",
      status: "Completed",
      desc: "A comprehensive travel booking and itinerary planning application.",
      tech: ["React", "Tailwind CSS", "Firebase"],
      github: "https://github.com/MalinduGeethsara/travel_go"
    }
  ];

  return (
    <section id="projects" className="py-16 md:py-24 px-6 relative">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Featured <span className="text-[#00ff99]">Projects</span>
        </h2>
        <div className="w-20 h-1.5 bg-[#00ff99] rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} onClick={() => setSelectedProject(project)} />
        ))}
      </div>

      {/* 3D Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-12 pointer-events-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`project-${selectedProject.title}`}
              className="relative w-full max-w-5xl bg-[#1c1c22] border border-[#00ff99]/30 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,255,153,0.15)] flex flex-col md:flex-row max-h-[85vh] md:max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-[#00ff99] transition-colors z-20 text-xl md:text-2xl bg-black/50 p-2 rounded-full backdrop-blur-md cursor-pointer"
              >
                <FiX />
              </button>

              {/* Holographic 3D Display (Left Side) */}
              <div className="w-full md:w-1/2 bg-[#0a0a0a] min-h-[200px] md:min-h-[400px] lg:min-h-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden" style={{ perspective: 1200 }}>
                {/* Background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
                
                {/* Floating 3D Hologram Screen */}
                <motion.div 
                  initial={{ rotateX: 60, rotateY: 0, rotateZ: -45, y: 50, opacity: 0 }}
                  animate={{ rotateX: 20, rotateY: -15, rotateZ: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 1, type: "spring" }}
                  className="w-full max-w-[280px] md:max-w-sm aspect-video bg-black/50 border border-[#00ff99]/50 rounded-xl shadow-[0_0_30px_rgba(0,255,153,0.2)] backdrop-blur-md flex flex-col overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Fake UI Header */}
                  <div className="h-5 md:h-6 bg-white/5 border-b border-white/10 flex items-center px-2 md:px-3 gap-1.5 md:gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500/50" />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500/50" />
                  </div>
                  {/* Fake Code Content */}
                  <div className="p-3 md:p-4 flex-grow relative overflow-hidden">
                    <motion.div 
                      animate={{ y: [0, -200] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="text-[#00ff99]/70 font-mono text-[10px] md:text-xs opacity-50 space-y-1.5 md:space-y-2"
                    >
                      <p>INITIALIZING: {selectedProject.title.toUpperCase()}</p>
                      <p>LOADING MODULES...</p>
                      {selectedProject.tech.map((t, idx) => (
                        <p key={idx} className="pl-2 md:pl-4">{'>'} fetching {t.toLowerCase()}_env</p>
                      ))}
                      <p>COMPILING ASSETS...</p>
                      <p>SYSTEM READY.</p>
                      <p>AWAITING INPUT...</p>
                      <p>...</p>
                      <p>CONNECTION SECURE</p>
                      <p>...</p>
                      <p>INITIALIZING: {selectedProject.title.toUpperCase()}</p>
                      <p>LOADING MODULES...</p>
                    </motion.div>
                    
                    {/* Scanline */}
                    <motion.div 
                      className="absolute inset-x-0 h-[1px] md:h-1 bg-[#00ff99]/30 shadow-[0_0_10px_#00ff99]"
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Project Details (Right Side) */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <FiFolder className="text-2xl md:text-3xl text-[#00ff99]" />
                  <span className={`text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 rounded-full border ${selectedProject.status === 'Completed' ? 'border-teal-500 text-teal-400' : 'border-[#00ff99] text-[#00ff99]'}`}>
                    {selectedProject.status.toUpperCase()}
                  </span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
                  {selectedProject.title}
                </h2>
                
                <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                  {selectedProject.desc}
                </p>

                <div className="mb-8 md:mb-10">
                  <h4 className="text-white/40 text-xs md:text-sm font-bold uppercase tracking-widest mb-3 md:mb-4">Tech Stack</h4>
                  <ul className="flex flex-wrap gap-2 md:gap-3">
                    {selectedProject.tech.map((t, index) => (
                      <li key={index} className="text-xs md:text-sm font-mono text-[#00ff99] bg-[#00ff99]/10 border border-[#00ff99]/20 px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-auto">
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-3 md:px-6 rounded-xl transition-colors font-medium border border-white/10 w-full sm:w-auto text-sm md:text-base"
                  >
                    <FiGithub /> Source Code
                  </a>
                  {selectedProject.live ? (
                    <a 
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#00ff99] hover:bg-[#00ff99]/80 text-black px-4 py-3 md:px-6 rounded-xl transition-colors font-bold shadow-[0_0_20px_rgba(0,255,153,0.3)] cursor-pointer w-full sm:w-auto text-sm md:text-base"
                    >
                      <FiExternalLink /> Live Preview
                    </a>
                  ) : (
                    <button 
                      disabled
                      className="flex items-center justify-center gap-2 bg-white/10 text-white/30 px-4 py-3 md:px-6 rounded-xl font-bold cursor-not-allowed w-full sm:w-auto text-sm md:text-base"
                      title="Live preview not available for this project"
                    >
                      <FiExternalLink /> Preview Unavailable
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}