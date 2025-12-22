
import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Code2, Palette, BrainCircuit, Globe2, Sparkles, Terminal } from 'lucide-react';

const BentoCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}> = ({ title, description, icon, className = "", children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/5 p-8 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        <div className="p-3 w-fit rounded-xl bg-white/5 text-[#3B82F6] mb-6">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-white/40 text-sm leading-relaxed mb-6">{description}</p>
        <div className="mt-auto">{children}</div>
      </div>
    </motion.div>
  );
};

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
