'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface BentoItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  span?: 'normal' | 'wide' | 'tall' | 'large';
  gradient?: string;
  className?: string;
}

interface FeatureBentoProps {
  items: BentoItem[];
  className?: string;
  animated?: boolean;
}

const getSpanClasses = (span: BentoItem['span']): string => {
  switch (span) {
    case 'wide':
      return 'md:col-span-2';
    case 'tall':
      return 'md:row-span-2';
    case 'large':
      return 'md:col-span-2 md:row-span-2';
    default:
      return '';
  }
};

export const FeatureBento: React.FC<FeatureBentoProps> = ({
  items,
  className = '',
  animated = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={animated ? { opacity: 0, y: 30, scale: 0.95 } : {}}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            type: 'spring',
            stiffness: 100,
          }}
          whileHover={{ scale: 1.02, y: -5 }}
          className={`group relative overflow-hidden rounded-3xl ${getSpanClasses(item.span)} ${item.className || ''}`}
        >
          {/* Background */}
          <div
            className={`absolute inset-0 ${
              item.gradient || 'bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-800'
            }`}
          />

          {/* Hover Glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.15), transparent 50%)',
            }}
          />

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />

          {/* Content */}
          <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
            {/* Icon */}
            {item.icon && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  delay: index * 0.1 + 0.2,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-white backdrop-blur-sm border border-white/10"
              >
                {item.icon}
              </motion.div>
            )}

            {/* Image */}
            {item.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="flex-1 mb-4 rounded-xl overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            )}

            <div className={item.image ? '' : 'mt-auto'}>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-xl font-bold text-white mb-2"
              >
                {item.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="text-slate-400 text-sm leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full" />
          </div>

          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.5 }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
              backgroundSize: '200% 100%',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureBento;
