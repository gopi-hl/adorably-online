'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface Integration {
  id: string;
  name: string;
  icon?: React.ReactNode;
  image?: string;
  color?: string;
  description?: string;
}

interface IntegrationOrbitProps {
  integrations: Integration[];
  centerContent?: React.ReactNode;
  className?: string;
  orbitRadius?: number;
  orbitSpeed?: number;
  pauseOnHover?: boolean;
}

export const IntegrationOrbit: React.FC<IntegrationOrbitProps> = ({
  integrations,
  centerContent,
  className = '',
  orbitRadius = 120,
  orbitSpeed = 30,
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const hoveredIntegration = integrations.find((i) => i.id === hoveredItem);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ minHeight: orbitRadius * 2.5 }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => {
        pauseOnHover && setIsPaused(false);
        setHoveredItem(null);
      }}
    >
      {/* Center Element */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="relative z-20"
      >
        {centerContent || (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <span className="text-3xl text-white font-bold">✦</span>
          </div>
        )}
      </motion.div>

      {/* Orbit Lines */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="border border-dashed dark:border-slate-700 border-slate-200 rounded-full"
          style={{
            width: orbitRadius * 2,
            height: orbitRadius * 2,
          }}
        />
      </motion.div>

      {/* Orbiting Items */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: isPaused ? 0 : 360 }}
        transition={{
          duration: orbitSpeed,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {integrations.map((integration, index) => {
          const angle = (360 / integrations.length) * index;
          const isHovered = hoveredItem === integration.id;

          return (
            <motion.div
              key={integration.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                type: 'spring',
                delay: 0.3 + index * 0.1,
              }}
              className="absolute"
              style={{
                transform: `rotate(${angle}deg) translateX(${orbitRadius}px) rotate(-${angle}deg)`,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={() => setHoveredItem(integration.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className={`cursor-pointer transition-all duration-300 ${
                  isHovered ? 'z-30' : 'z-10'
                }`}
                style={{
                  // Counter-rotate to keep items upright
                  transform: isPaused ? 'none' : `rotate(${-angle}deg)`,
                }}
              >
                <motion.div
                  animate={{
                    // Counter the parent's rotation
                    rotate: isPaused ? 0 : -360,
                  }}
                  transition={{
                    duration: orbitSpeed,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    animationPlayState: isPaused ? 'paused' : 'running',
                  }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isHovered
                        ? 'ring-4 ring-violet-500/30 shadow-lg shadow-violet-500/20'
                        : ''
                    } ${
                      integration.color || 'dark:bg-slate-800 bg-white'
                    } dark:border-slate-700 border border-slate-200`}
                  >
                    {integration.image ? (
                      <img
                        src={integration.image}
                        alt={integration.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : integration.icon ? (
                      <span className="text-2xl">{integration.icon}</span>
                    ) : (
                      <span className="font-bold text-sm dark:text-white text-slate-900">
                        {integration.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredIntegration && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-40"
          >
            <div className="px-4 py-2 rounded-xl dark:bg-slate-800 bg-white shadow-xl border dark:border-slate-700 border-slate-200 text-center">
              <p className="font-bold dark:text-white text-slate-900">
                {hoveredIntegration.name}
              </p>
              {hoveredIntegration.description && (
                <p className="text-xs dark:text-slate-400 text-slate-500 mt-0.5">
                  {hoveredIntegration.description}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntegrationOrbit;
