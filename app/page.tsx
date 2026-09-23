import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto">
        <Hero />
        <hr className="border-[#00ff99]" />
        <Skills />
        <hr className="border-[#00ff99]" />
        <Projects />
        <hr className="border-[#00ff99]" />
        <Education />
        <hr className="border-[#00ff99]" />
      </main>
      
      {/* Contact section is placed outside max-w-7xl to allow its 3D background to span full width */}
      <Contact />

      <footer className="max-w-7xl mx-auto pb-10 pt-10 border-t border-[#00ff99] text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Malindu Geethsara.
      </footer>
    </>
  );
}