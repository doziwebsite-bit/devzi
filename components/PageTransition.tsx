
import React from 'react';
import { motion } from 'framer-motion';
import DevziLogo from './DevziLogo';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative w-full"
    >
      {/* Content wrapper with fade out when exiting */}
      <motion.div
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0, transition: { duration: 0.3 } }
        }}
      >
        {children}
      </motion.div>

      {/* The Rideau (Curtain) */}
      <motion.div
        className="fixed inset-0 bg-[#030303] z-[10000] flex items-center justify-center pointer-events-none"
        variants={{
          initial: { y: '100%' },
          animate: {
            y: ['100%', '0%', '0%', '-100%'],
            transition: {
              duration: 1.2,
              times: [0, 0.4, 0.6, 1],
              ease: "easeInOut"
            }
          }
        }}
      >
        <motion.div
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            animate: {
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1, 1.2],
              transition: { duration: 1.2, times: [0, 0.4, 0.6, 1] }
            }
          }}
        >
          <DevziLogo size={120} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PageTransition;
