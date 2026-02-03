import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto pb-24">
      <Hero />
      <hr className="border-[#00ff99]" />
      <Skills />
      <hr className="border-[#00ff99]" />
      <Projects />
      <hr className="border-[#00ff99]" />
      <Education />
      
      <footer className="mt-20 pt-10 border-t border-[#00ff99] text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Malindu Geethsara. Built with Next.js 16.1.
      </footer>
    </main>
  );
}