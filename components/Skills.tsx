export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Skills",
      items: ["C", "C++", "Java", "JavaScript", "PHP"]
    },
    {
      title: "Front-end & Design",
      items: ["HTML5", "Tailwind CSS", "Figma"]
    },
    {
      title: "Back-end & Databases",
      items: ["PHP", "Node.js", "MySQL"]
    },
    {
      title: "Tools & Platforms",
      items: ["Git", "Jira"]
    }
  ];

  return (
    <section id="skills" className="py-10">
      <h2 className="text-3xl font-bold mb-8 text-slate-900">Technical Toolkit</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((cat, i) => (
          <div key={i} className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600">
              {cat.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {cat.items.map((skill, j) => (
                <li 
                  key={j} 
                  className="px-3 py-1 bg-white border border-slate-200 rounded-md text-sm text-slate-700 shadow-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}