export default function Hero() {
  return (
    <section className="py-24 text-center md:text-left">
      <h1 className="text-6xl font-extrabold text-slate-900 mb-6">Malindu Geethsara</h1>
      <p className="text-xl text-slate-600 max-w-2xl mb-8 leading-relaxed">
        Highly adaptable and dedicated developer specializing in building impactful, intuitive applications[cite: 8].
      </p>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <a href="mailto:gamalindu12345@gmail.com" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all">
          Contact Me [cite: 2]
        </a>
        <a href="https://github.com/MalinduGeethsara" target="_blank" className="bg-white border border-slate-300 px-8 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all">
          GitHub [cite: 6]
        </a>
      </div>
      <div className="mt-10 flex flex-col md:flex-row gap-4 text-slate-500 text-sm">
        <span>📍 Suhanda motors new road, walasmulla [cite: 4]</span>
        <span className="hidden md:inline text-slate-300">|</span>
        <span>📞 0713307710 [cite: 3]</span>
      </div>
    </section>
  );
}