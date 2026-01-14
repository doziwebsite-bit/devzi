
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, BrainCircuit, Globe2, Sparkles, Terminal } from 'lucide-react';
import BentoCard from '../components/BentoCard';

const Services: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Capabilities</h2>
        <div className="h-1 w-20 bg-gradient-to-r from-[#3B82F6] to-[#F97316]" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {/* Full Stack Dev */}
        <BentoCard
          title="Full Stack Engineering"
          description="High-performance architectures built with Next.js, Node, and Scalable Cloud solutions."
          icon={<Code2 className="w-6 h-6" />}
          className="md:col-span-2 md:row-span-1"
        >
          <div className="bg-black/40 rounded-lg p-4 font-mono text-xs text-green-500 overflow-hidden h-32">
            <div className="animate-pulse">_ system.init()</div>
            <div className="text-blue-400 mt-2">Connecting to Devzi Engine...</div>
            <div className="text-white/40 mt-1">Found 4 core modules</div>
            <div className="mt-2">&gt; Deploying microservices [OK]</div>
            <div className="mt-1">&gt; Establishing handshake [OK]</div>
            <div className="mt-1">&gt; Compiling assets [OK]</div>
          </div>
        </BentoCard>

        {/* UI/UX Design */}
        <BentoCard
          title="Creative UI/UX"
          description="Crafting interfaces that feel intuitive and look supernatural."
          icon={<Palette className="w-6 h-6" />}
          className="md:col-span-1 md:row-span-2"
        >
          <div className="relative h-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-40 h-40 border border-[#F97316]/20 rounded-full flex items-center justify-center"
            >
              <div className="w-20 h-20 bg-gradient-to-tr from-[#3B82F6] to-[#F97316] rounded-full blur-xl opacity-40 animate-pulse" />
            </motion.div>
          </div>
        </BentoCard>

        {/* AI Solutions */}
        <BentoCard
          title="AI Architecture"
          description="Leveraging LLMs and generative agents to automate and amplify your business."
          icon={<BrainCircuit className="w-6 h-6" />}
        >
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                className="h-2 flex-1 bg-[#3B82F6] rounded-full"
              />
            ))}
          </div>
        </BentoCard>

        {/* Global Strategy */}
        <BentoCard
          title="Global Branding"
          description="Visual identities that command attention across every digital touchpoint."
          icon={<Globe2 className="w-6 h-6" />}
          className="md:col-span-1"
        />

        {/* Experience Design */}
        <BentoCard
          title="Immersive Experiences"
          description="WebGL, 3D, and interactive storytelling."
          icon={<Sparkles className="w-6 h-6" />}
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};

export default Services;
