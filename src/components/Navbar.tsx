export default function Navbar() {
  return (
    <nav className="p-6 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl tracking-tight text-slate-900 uppercase">
          G.A.M. Geethsara [cite: 1]
        </h1>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#skills" className="hover:text-blue-600 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
          <a href="#education" className="hover:text-blue-600 transition-colors">Education</a>
        </div>
      </div>
    </nav>
  );
}