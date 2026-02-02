import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#1c1c22] text-white selection:bg-[#00ff99] selection:text-black`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}