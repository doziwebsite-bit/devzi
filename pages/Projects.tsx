
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="px-6 md:px-20 absolute top-32 z-20">
           <h2 className="text-7xl font-black uppercase tracking-tighter">Case Studies</h2>
           <p className="text-white/40 max-w-sm mt-4">Scroll to explore our latest transmutations.</p>
        </div>

        <motion.div style={{ x }} className="flex gap-10 px-6 md:px-20 pt-20">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative h-[450px] w-[300px] md:h-[600px] md:w-[800px] overflow-hidden rounded-3xl bg-[#0A0A0A] flex-shrink-0"
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#3B82F6] mb-2">{project.category}</span>
                <h3 className="text-4xl font-bold">{project.title}</h3>
                <button className="mt-6 w-fit px-6 py-2 border border-white/20 rounded-full text-xs uppercase hover:bg-white hover:text-black transition-all">View Discovery</button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
