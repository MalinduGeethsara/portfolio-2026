import Hero from '../src/components/Hero';
import Skills from '../src/components/Skills';
import Projects from '../src/components/Projects';
import Education from '../src/components/Education';

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 pb-24">
      <Hero />
      <hr className="border-slate-200" />
      <Skills />
      <hr className="border-slate-200" />
      <Projects />
      <hr className="border-slate-200" />
      <Education />
      
      <footer className="mt-20 pt-10 border-t border-slate-200 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Malindu Geethsara. Built with Next.js 16.1.
      </footer>
    </main>
  );
}