
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Mail } from 'lucide-react';

const FooterContact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-12 pb-12 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Animated Contact Card Section */}
        <AnimatePresence>
          {isVisible && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 96 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 border border-[#3B82F6]/30 bg-[#050505] rounded-[40px] p-10 md:p-16 shadow-[0_0_50px_rgba(59,130,246,0.05)]">
                <div>
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                    READY TO <br />
                    <span className="inline-block mt-2 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#F97316] text-white">
                      TRANSMUTE?
                    </span>
                  </h2>
                  <p className="text-white/40 max-w-md mb-12 text-lg font-light leading-relaxed">
                    Let's discuss your next breakthrough. Our alchemists are standing by to elevate your digital presence.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-white/60 hover:text-[#3B82F6] transition-colors cursor-pointer group">
                      <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#3B82F6]/10 transition-colors">
                        <MapPin size={18} className="text-[#3B82F6]" />
                      </div>
                      <span className="font-medium">Champs-Élysées, Paris, FR</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/60 hover:text-[#F97316] transition-colors cursor-pointer group">
                      <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#F97316]/10 transition-colors">
                        <Mail size={18} className="text-[#F97316]" />
                      </div>
                      <span className="font-medium">hello@devzi.agency</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 p-8 rounded-[32px] border border-white/5 relative flex items-center">
                  <form className="space-y-6 w-full" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Name" 
                        className="bg-[#111] border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#3B82F6]/50 transition-all placeholder:text-white/20 text-white"
                      />
                      <input 
                        type="email" 
                        placeholder="Email" 
                        className="bg-[#111] border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#3B82F6]/50 transition-all placeholder:text-white/20 text-white"
                      />
                    </div>
                    <textarea 
                      placeholder="How can we help?" 
                      rows={4}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#3B82F6]/50 transition-all placeholder:text-white/20 text-white resize-none"
                    />
                    <button className="w-full py-4 bg-gradient-to-r from-[#3B82F6] to-[#F97316] rounded-xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg shadow-black/40">
                      SEND SIGNAL <Send size={14} />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Bottom Status Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span>SYSTEMS ONLINE — PARIS LAB</span>
          </div>
          
          <p>© 2025 DEVZI — DIGITAL ALCHEMY LAB</p>

          <div className="flex items-center gap-16">
            <button 
              onClick={() => setIsVisible(!isVisible)}
              className={`transition-colors duration-300 font-bold tracking-[0.4em] uppercase ${
                isVisible 
                ? 'text-[#F97316]' 
                : 'text-white/20 hover:text-white'
              }`}
            >
              {isVisible ? 'CLOSE' : 'SIGNAL'}
            </button>

            <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors tracking-[0.4em]">PRIVACY</a>
              <a href="#" className="hover:text-white transition-colors tracking-[0.4em]">TERMS</a>
              <a href="#" className="hover:text-white transition-colors tracking-[0.4em]">COOKIES</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterContact;
