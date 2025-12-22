
import React from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-12 px-6 md:px-20 min-h-screen flex flex-col items-center justify-center bg-black">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0 p-1 md:p-1 rounded-[40px] border border-[#3B82F6]/30 bg-[#050505] relative overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)]"
      >
        {/* Left Side: Content */}
        <div className="relative z-10 flex flex-col justify-center p-10 md:p-16">
          <h2 className="text-5xl md:text-[80px] font-black uppercase tracking-tighter leading-[0.9] mb-8">
            READY TO <br />
            <span className="inline-block mt-2 px-6 py-2 bg-gradient-to-r from-[#3B82F6] to-[#F97316] text-white">
              TRANSMUTE?
            </span>
          </h2>
          
          <p className="text-white/40 text-lg md:text-xl max-w-sm mb-12 font-light leading-relaxed">
            Let's discuss your next breakthrough. Our alchemists are standing by to elevate your digital presence.
          </p>
          
          <div className="space-y-10">
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-[#3B82F6]/50 transition-colors">
                <MapPin size={24} className="text-[#3B82F6]" />
              </div>
              <span className="text-lg text-white/70 font-medium">Champs-Élysées, Paris, FR</span>
            </div>
            
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-[#F97316]/50 transition-colors">
                <Mail size={24} className="text-[#F97316]" />
              </div>
              <span className="text-lg text-white/70 font-medium">hello@devzi.agency</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="p-4 md:p-10 lg:p-12 bg-black/40 rounded-[32px] m-4 border border-white/5 flex items-center">
          <form className="space-y-6 w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#3B82F6]/50 transition-all placeholder:text-white/20 text-white"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#3B82F6]/50 transition-all placeholder:text-white/20 text-white"
              />
            </div>
            
            <textarea 
              placeholder="How can we help?" 
              rows={6}
              className="w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#3B82F6]/50 transition-all placeholder:text-white/20 text-white resize-none"
            />
            
            <button className="w-full py-5 bg-gradient-to-r from-[#3B82F6] to-[#F97316] rounded-2xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 hover:opacity-90 transition-all transform active:scale-[0.98] shadow-lg shadow-[#3B82F6]/10">
              SEND SIGNAL <Send size={16} />
            </button>
          </form>
        </div>
      </motion.div>

      {/* Footer Status Bar with expanded spacing */}
      <div className="w-full max-w-7xl mt-12 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
        <div className="flex items-center gap-4">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span>SYSTEMS ONLINE — PARIS LAB</span>
        </div>
        <p>© 2025 DEVZI — DIGITAL ALCHEMY LAB</p>
        <div className="flex gap-12">
          <a href="#" className="hover:text-white transition-colors tracking-[0.4em]">PRIVACY</a>
          <a href="#" className="hover:text-white transition-colors tracking-[0.4em]">TERMS</a>
          <a href="#" className="hover:text-white transition-colors tracking-[0.4em]">COOKIES</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
