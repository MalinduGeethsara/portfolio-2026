import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import SmoothScroll from '../components/SmoothScroll';
import MagneticCursor from '../components/MagneticCursor';
import BackgroundWrapper from '../components/BackgroundWrapper';
import Preloader from '../components/Preloader';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white selection:bg-[#00ff99] selection:text-black overflow-x-hidden`}>
        <Preloader />
        <BackgroundWrapper />
        <MagneticCursor />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}