'use client';
import { motion } from 'framer-motion';
import { 
  FiCode, 
  FiLayout, 
  FiServer, 
  FiSettings, 
  FiTerminal 
} from 'react-icons/fi';

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming",
      icon: <FiCode className="text-2xl" />,
      items: ["C", "C++", "Java", "JavaScript", "PHP"]
    },
    {
      title: "Frontend",
      icon: <FiLayout className="text-2xl" />,
      items: ["HTML5", "Tailwind CSS", "React", "Next.js", "Figma"]
    },
    {
      title: "Backend",
      icon: <FiServer className="text-2xl" />,
      items: ["Node.js", "Express", "MySQL", "PHP"]
    },
    {
      title: "Tools",
      icon: <FiSettings className="text-2xl" />,
      items: ["Git", "Jira", "Postman", "Linux"]
    }
  ];

  return (
    <section id="skills" className="py-24">
      <div className="flex flex-col gap-4 mb-12">
        <h2 className="text-4xl font-bold text-white">
          Technical <span className="text-[#00ff99]">Toolkit</span>
        </h2>
        <div className="w-20 h-1.5 bg-[#00ff99] rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-6 bg-[#232329] border border-white/5 rounded-2xl hover:border-[#00ff99]/30 transition-all group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#1c1c22] rounded-lg text-[#00ff99] group-hover:shadow-[0_0_15px_rgba(0,255,153,0.3)] transition-all">
                {cat.icon}
              </div>
              <h3 className="font-bold text-white text-lg">{cat.title}</h3>
            </div>

            <ul className="flex flex-wrap gap-2">
              {cat.items.map((skill, j) => (
                <li 
                  key={j} 
                  className="px-3 py-1 bg-[#1c1c22] border border-white/10 rounded-md text-xs text-white/70 hover:text-[#00ff99] hover:border-[#00ff99]/50 transition-colors"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}