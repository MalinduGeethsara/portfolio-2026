'use client';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks for your message! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden z-10">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00ff99]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center md:items-start gap-4 mb-16 px-6 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-white"
        >
          Let's <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00ff99] to-teal-400">Connect</span>
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto px-6">
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
                { icon: <FiMail />, title: "Email", info: "gamalindu12345@gmail.com" },
                { icon: <FiPhone />, title: "Phone", info: "0713307710" },
                { icon: <FiMapPin />, title: "Location", info: "Suhanda Motors New Road, Walasmulla" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-black/50 border border-white/10 rounded-2xl flex items-center justify-center text-[#00ff99] text-2xl group-hover:bg-[#00ff99] group-hover:text-black transition-all duration-300 shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm font-medium mb-1">{item.title}</h4>
                    <p className="text-white font-bold text-lg group-hover:text-[#00ff99] transition-colors">{item.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3"
          >
            <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-3xl space-y-6 relative overflow-hidden border border-white/10">
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
                    className="w-full bg-[#0a0a0a]/80 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#00ff99] focus:ring-1 focus:ring-[#00ff99] transition-all"
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
                    className="w-full bg-[#0a0a0a]/80 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#00ff99] focus:ring-1 focus:ring-[#00ff99] transition-all"
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
                  className="w-full bg-[#0a0a0a]/80 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#00ff99] focus:ring-1 focus:ring-[#00ff99] transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="relative z-10 w-full md:w-auto bg-linear-to-r from-[#00ff99] to-teal-400 text-black font-black px-10 py-4 rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,255,153,0.4)] transition-shadow cursor-pointer"
              >
                Send Message <FiSend />
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
