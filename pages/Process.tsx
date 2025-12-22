
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { STEPS } from '../constants';

const Process: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative py-40 px-6 md:px-20 max-w-4xl mx-auto">
      <div className="text-center mb-32">
        <h2 className="text-5xl font-black uppercase mb-6">Our Process</h2>
        <p className="text-white/40 max-w-lg mx-auto">From vision to execution, we follow a strict alchemical protocol to ensure excellence at every step.</p>
      </div>

      {/* Progress Line */}
      <div className="absolute left-1/2 top-80 bottom-40 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block" />
      <motion.div
        className="absolute left-1/2 top-80 bottom-40 w-[2px] bg-gradient-to-b from-[#3B82F6] to-[#F97316] -translate-x-1/2 origin-top hidden md:block"
        style={{ scaleY }}
      />

      <div className="space-y-40">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative flex flex-col md:flex-row items-center gap-10 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
          >
            {/* Dot */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black border-2 border-[#3B82F6] z-10 hidden md:block" />

            <div className="w-full md:w-1/2 text-center md:text-left">
              <span className="text-[10rem] font-black text-white/[0.03] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                0{step.id}
              </span>
              <h3 className="text-3xl font-bold mb-4 relative z-10">{step.title}</h3>
              <p className="text-white/40 leading-relaxed relative z-10">{step.description}</p>
            </div>
            <div className="w-full md:w-1/2 h-64 bg-[#0A0A0A] rounded-2xl border border-white/5 flex items-center justify-center">
               <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/10 animate-spin-slow" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Process;
