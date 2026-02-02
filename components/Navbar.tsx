export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#1c1c22]/80 backdrop-blur-md py-6">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Malindu<span className="text-[#00ff99]">.</span>
        </h1>
        
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-8 font-medium text-white/90">
            <li><a href="#home" id="home"  className="hover:text-[#00ff99] border-b-2 border-transparent hover:border-[#00ff99] transition-all">Home</a></li>
            <li><a href="#skills" id="skills" className="hover:text-[#00ff99] transition-all ">Skills </a></li>
            <li><a href="#projects" id="projects" className="hover:text-[#00ff99] transition-all ">Projects</a></li>
            <li><a href="#education" id="education" className="hover:text-[#00ff99] transition-all ">Education</a></li>
          </ul>
          <button className="bg-[#00ff99] text-[#1c1c22] px-6 py-2 rounded-full font-bold hover:bg-[#00e68a] transition-all">
            Hire me
          </button>
        </div>
      </div>
    </nav>
  );
}