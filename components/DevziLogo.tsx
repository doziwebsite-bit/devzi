import React from 'react';
import { motion } from 'framer-motion';

const DevziLogo: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <motion.div
      className="cursor-pointer"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{ width: size, height: size }}
    >
      <img
        src="/logo.png"
        alt="Devzi Logo"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export default DevziLogo;