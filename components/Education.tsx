export default function Education() {
  const educationData = [
    {
      institution: "SLIIT CITY UNI",
      period: "2023 - Present",
      degree: "Undergraduate in Information Technology",
      location: "Walasmulla"
    },
    {
      institution: "Walasmulla National School",
      period: "2007 - 2020",
      degree: "Physical Science",
      location: "Walasmulla"
    }
  ];

  return (
    <section id="education" className="py-20">
      <h2 className="text-3xl font-bold mb-10 text-slate-900">Education</h2>
      <div className="space-y-12">
        {educationData.map((edu, i) => (
          <div key={i} className="relative pl-8 border-l-2 border-slate-200">
            <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-1.5 border-4 border-white" />
            <div className="flex flex-col md:flex-row md:justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-800">{edu.institution}</h3>
              <span className="text-sm font-bold text-blue-600">{edu.period}</span>
            </div>
            <p className="text-slate-600 font-medium">{edu.degree}</p>
            <p className="text-sm text-slate-400">{edu.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}