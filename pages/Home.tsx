
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden bg-black">
      {/* Background Grid Shader Simulation */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 to-[#F97316]/20 blur-[120px]"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl">
        <div className="text-[14vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter">
          <motion.h1
            className="block overflow-hidden"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            Digital
          </motion.h1>
          <motion.div
            className="block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
          >
            <span className="apple-gradient-text">Alchemy.</span>
          </motion.div>
        </div>

        <motion.p
          className="mt-12 text-lg md:text-xl text-white/50 max-w-xl font-light leading-relaxed"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          We transmute complex challenges into gold-standard digital experiences.
          Branding, Web, and AI architecture for the next era.
        </motion.p>

        <motion.div
          className="mt-16 flex items-center gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button 
            onClick={() => navigate('/projects')}
            className="group flex items-center gap-4 bg-white text-black px-10 py-4 rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#3B82F6] hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
          >
            EXPLORE WORK
            <ArrowDownRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/pricing')}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors flex items-center gap-2"
          >
            SEE PRICING
          </button>
        </motion.div>
      </div>

      {/* Marquee Section */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden py-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <motion.div
          className="flex gap-20 whitespace-nowrap"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {['PRICING', 'REACT', 'NODE.JS', 'DASHBOARD', 'AI ARCHITECTURE', 'TRANSFORMATION', 'TAILWIND', 'GLOBAL OPS'].map((tech, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-black text-white/5 hover:text-white transition-colors cursor-pointer"
              onClick={() => navigate(`/${tech.toLowerCase().replace(' ', '-')}`)}
            >
              {tech}
            </span>
          ))}
          {/* Duplicate for infinite effect */}
          {['PRICING', 'REACT', 'NODE.JS', 'DASHBOARD', 'AI ARCHITECTURE', 'TRANSFORMATION', 'TAILWIND', 'GLOBAL OPS'].map((tech, i) => (
            <span
              key={i+100}
              className="text-4xl md:text-6xl font-black text-white/5 hover:text-white transition-colors cursor-pointer"
              onClick={() => navigate(`/${tech.toLowerCase().replace(' ', '-')}`)}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
