import Link from 'next/link'; // 1. Import this

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#1c1c22]/80 backdrop-blur-md py-6">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="#home">
          <h1 className="text-3xl font-bold cursor-pointer">
           Malindu<span className="text-[#00ff99] animate-pulse">.</span>
          </h1>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-8 font-medium text-white/90">
            <li>
                <Link href="#home" className="hover:text-[#00ff99] transition-all">
                    Home
                </Link>
            </li>
            <li>
                <Link href="#skills" className="hover:text-[#00ff99] transition-all">
                    Skills
                </Link>
            </li>
            <li>
                <Link href="#projects" className="hover:text-[#00ff99] transition-all">
                    Projects
                </Link>
            </li>
            <li>
                <Link href="#education" className="hover:text-[#00ff99] transition-all">
                    Education
                </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}