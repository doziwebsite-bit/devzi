import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DevziLogo: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const [isWinking, setIsWinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleWink();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleWink = () => {
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 300);
  };

  // Rayon des yeux
  const eyeRadius = 7.5;

  return (
    <motion.div
      className="cursor-pointer"
      onHoverStart={handleWink}
      animate={{ rotate: isWinking ? 15 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="-15 -15 130 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Crochet Gauche - forme de "<" plus fermée */}
        <path
          d="M25 20L5 50L25 80"
          stroke="#3B82F6"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Crochet Droit - forme de ">" plus fermée */}
        <path
          d="M75 20L95 50L75 80"
          stroke="#F97316"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Yeux Blancs */}
        <circle cx="40" cy="45" r={eyeRadius} fill="white" />
        <motion.ellipse
          cx="60"
          cy="45"
          rx={eyeRadius}
          ry={isWinking ? 1 : eyeRadius}
          fill="white"
          transition={{ duration: 0.1 }}
        />
        
        {/* Sourire Symétrique */}
        <path
          d="M38 68 Q50 82 62 68"
          stroke="url(#logoSmileGradientV7)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient id="logoSmileGradientV7" x1="38" y1="68" x2="62" y2="68" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#F97316" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default DevziLogo;