export default function Projects() {
  const projects = [
    {
      title: "Salon Management System",
      status: "Ongoing",
      desc: "System for online booking, integrated payments, real-time SMS notifications, and automated monthly financial reporting.",
      tech: "React, Node.js, MySQL"
    },
    {
      title: "Kings-Clothing-Store",
      status: "Completed",
      desc: "A full-stack, responsive web application for apparel sales, built to handle product catalog display and user management.",
      tech: "HTML, TailwindCSS, JavaScript, PHP, MySQL"
    },
    {
      title: "MediCare Plus",
      status: "Completed",
      desc: "Pharmacy Management System built for handling product catalogs and order processing.",
      tech: "HTML, CSS, Java, JavaScript, PHP, MySQL"
    }
  ];

  return (
    <section id="projects" className="py-10">
      <h2 className="text-3xl font-bold mb-8 text-slate-900">Featured Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div key={i} className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-slate-800">{p.title}</h3>
              <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {p.status}
              </span>
            </div>
            <p className="text-slate-600 mb-4 text-sm leading-relaxed">{p.desc}</p>
            <p className="text-xs font-mono text-slate-400 bg-slate-50 p-2 rounded">
              {p.tech}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}