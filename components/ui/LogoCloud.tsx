'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Logo {
  name: string;
  image?: string;
  icon?: React.ReactNode;
}

interface LogoCloudProps {
  logos: Logo[];
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: 'grid' | 'scroll' | 'fade';
  grayscale?: boolean;
  speed?: number;
}

export const LogoCloud: React.FC<LogoCloudProps> = ({
  logos,
  title,
  subtitle,
  className = '',
  variant = 'grid',
  grayscale = true,
  speed = 30,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const renderGridVariant = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
      {logos.map((logo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            type: 'spring',
          }}
          whileHover={{ scale: 1.1, y: -5 }}
          className={`flex items-center justify-center p-4 rounded-xl transition-all duration-300 ${
            grayscale
              ? 'grayscale hover:grayscale-0 opacity-60 hover:opacity-100'
              : ''
          } dark:bg-white/5 bg-slate-100 hover:bg-white dark:hover:bg-white/10 hover:shadow-lg`}
        >
          {logo.image ? (
            <img
              src={logo.image}
              alt={logo.name}
              className="h-8 w-auto object-contain"
            />
          ) : logo.icon ? (
            <div className="text-slate-600 dark:text-slate-300">{logo.icon}</div>
          ) : (
            <span className="font-bold text-sm dark:text-slate-300 text-slate-600">
              {logo.name}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderScrollVariant = () => (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r dark:from-[#0a0a0b] from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l dark:from-[#0a0a0b] from-white to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <motion.div
        className="flex gap-8 items-center"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {/* Double the logos for seamless loop */}
        {[...logos, ...logos].map((logo, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className={`flex-shrink-0 flex items-center justify-center p-6 rounded-xl transition-all duration-300 ${
              grayscale
                ? 'grayscale hover:grayscale-0 opacity-60 hover:opacity-100'
                : ''
            } dark:bg-white/5 bg-slate-100`}
          >
            {logo.image ? (
              <img
                src={logo.image}
                alt={logo.name}
                className="h-10 w-auto object-contain"
              />
            ) : logo.icon ? (
              <div className="text-slate-600 dark:text-slate-300 text-3xl">{logo.icon}</div>
            ) : (
              <span className="font-bold text-lg dark:text-slate-300 text-slate-600 whitespace-nowrap">
                {logo.name}
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  const renderFadeVariant = () => (
    <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
      {logos.map((logo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
          whileHover={{ scale: 1.05 }}
          className={`transition-all duration-300 ${
            grayscale
              ? 'grayscale hover:grayscale-0 opacity-50 hover:opacity-100'
              : ''
          }`}
        >
          {logo.image ? (
            <img
              src={logo.image}
              alt={logo.name}
              className="h-8 w-auto object-contain"
            />
          ) : logo.icon ? (
            <div className="text-slate-500 dark:text-slate-400">{logo.icon}</div>
          ) : (
            <span className="font-semibold text-sm dark:text-slate-400 text-slate-500 uppercase tracking-wider">
              {logo.name}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className={className}>
      {/* Header */}
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {subtitle && (
            <p className="text-sm text-violet-500 font-medium uppercase tracking-wider mb-2">
              {subtitle}
            </p>
          )}
          {title && (
            <h3 className="text-lg dark:text-slate-300 text-slate-600">
              {title}
            </h3>
          )}
        </motion.div>
      )}

      {/* Logos */}
      {variant === 'grid' && renderGridVariant()}
      {variant === 'scroll' && renderScrollVariant()}
      {variant === 'fade' && renderFadeVariant()}
    </div>
  );
};

export default LogoCloud;
