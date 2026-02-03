'use client';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';

export default function Projects() {
  const projects = [
    {
      title: "Salon Management System",
      status: "Ongoing",
      desc: "System for online booking, integrated payments, real-time SMS notifications, and automated monthly financial reporting.",
      tech: ["React", "Node.js", "MySQL", "Tailwind"],
      link: "#",
      github: "#"
    },
    {
      title: "Kings-Clothing-Store",
      status: "Completed",
      desc: "A full-stack, responsive web application for apparel sales, built to handle product catalog display and user management.",
      tech: ["PHP", "MySQL", "TailwindCSS", "JS"],
      link: "#",
      github: "#"
    },
    {
      title: "MediCare Plus",
      status: "Completed",
      desc: "Pharmacy Management System built for handling product catalogs and order processing.",
      tech: ["Java", "PHP", "MySQL", "JavaScript"],
      link: "#",
      github: "#"
    }
  ];

  return (
    <section id="projects" className="py-24">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="text-4xl font-bold text-white">
          Featured <span className="text-[#00ff99]">Projects</span>
        </h2>
        <div className="w-20 h-1.5 bg-[#00ff99] rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-[#232329] border border-white/10 p-8 rounded-2xl hover:border-[#00ff99]/50 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex justify-between items-center mb-6">
              <FiFolder className="text-4xl text-[#00ff99]" />
              <div className="flex gap-4 text-xl text-white/70">
                <a href={project.github} className="hover:text-[#00ff99] transition-colors"><FiGithub /></a>
                <a href={project.link} className="hover:text-[#00ff99] transition-colors"><FiExternalLink /></a>
              </div>
            </div>

            <div className="flex-grow">
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

            <ul className="flex flex-wrap gap-3 mt-auto">
              {project.tech.map((t, index) => (
                <li key={index} className="text-xs font-mono text-white/40">
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}