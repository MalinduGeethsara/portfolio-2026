'use client';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EarthGlobe = () => {
  const meshRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <icosahedronGeometry args={[2.8, 16]} />
      <pointsMaterial color="#00ff99" size={0.015} transparent opacity={0.4} />
    </points>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "4a539a7d-cc94-4954-b7e4-a660d1d935ea",
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden z-10 min-h-screen flex flex-col justify-center">
      {/* 3D Background Globe & Circle Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-80 mix-blend-screen">
        
        {/* Animated SVG Circle */}
        <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] opacity-30">
          <motion.svg
            className="w-full h-full pointer-events-none"
            fill="transparent"
            viewBox="0 0 506 506"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="253"
              cy="253"
              r="250"
              stroke="url(#gradient-contact)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ strokeDasharray: "24 10 0 0" }}
              animate={{
                strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                rotate: [120, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <defs>
              <linearGradient id="gradient-contact" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ff99" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>

        {/* 3D Globe - Camera pulled back so it renders as a full circle without getting cut off */}
        <Canvas camera={{ position: [0, 0, 9], fov: 45 }} className="absolute inset-0">
          <EarthGlobe />
        </Canvas>
      </div>

      <div className="flex flex-col items-center md:items-start gap-4 mb-16 px-6 max-w-7xl mx-auto relative z-10 w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-7xl font-black text-white"
        >
          Let's <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00ff99] to-teal-400">Connect</span>
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 space-y-8"
          >
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions. Let's create something amazing!
            </p>

            <div className="space-y-6">
              {[
                { icon: <FiMail />, title: "Email", info: "gamalindu12345@gmail.com", href: "mailto:gamalindu12345@gmail.com" },
                { icon: <FiPhone />, title: "Phone", info: "0713307710", href: "tel:+94713307710" },
                { icon: <FiMapPin />, title: "Location", info: "Suhanda Motors New Road, Walasmulla", href: "https://maps.google.com/?q=Suhanda+Motors+New+Road,+Walasmulla" },
              ].map((item, i) => (
                <motion.a 
                  href={item.href}
                  target={item.title === "Location" ? "_blank" : undefined}
                  rel={item.title === "Location" ? "noopener noreferrer" : undefined}
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-[#00ff99] text-2xl group-hover:bg-[#00ff99] group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm font-medium mb-1">{item.title}</h4>
                    <p className="text-white font-bold text-lg group-hover:text-[#00ff99] transition-colors">{item.info}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3"
          >
            <form onSubmit={handleSubmit} className="bg-[#232329]/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl space-y-6 relative overflow-hidden border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 bg-linear-to-br from-[#00ff99]/5 to-transparent pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-2">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a]/80 border border-white/10 rounded-2xl px-4 py-3 md:px-6 md:py-4 text-white focus:outline-none focus:border-[#00ff99] focus:ring-1 focus:ring-[#00ff99] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-2">Your Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a]/80 border border-white/10 rounded-2xl px-4 py-3 md:px-6 md:py-4 text-white focus:outline-none focus:border-[#00ff99] focus:ring-1 focus:ring-[#00ff99] transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label className="text-sm font-bold text-white/60 ml-2">Message</label>
                <textarea 
                  rows={5}
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a]/80 border border-white/10 rounded-2xl px-4 py-3 md:px-6 md:py-4 text-white focus:outline-none focus:border-[#00ff99] focus:ring-1 focus:ring-[#00ff99] transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="relative z-10 w-full md:w-auto bg-linear-to-r from-[#00ff99] to-teal-400 text-black font-black px-10 py-4 rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,255,153,0.4)] transition-shadow cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <FiSend className={isSubmitting ? "animate-pulse" : ""} />
              </motion.button>

              {submitStatus === 'success' && (
                <p className="text-[#00ff99] text-sm mt-4 font-bold relative z-10">Message sent successfully! I'll get back to you soon.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm mt-4 font-bold relative z-10">Something went wrong. Please check your Access Key or email me directly.</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
