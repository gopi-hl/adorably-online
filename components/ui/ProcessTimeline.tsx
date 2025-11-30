'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface TimelineStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
  className?: string;
  variant?: 'vertical' | 'horizontal';
  animated?: boolean;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  steps,
  className = '',
  variant = 'vertical',
  animated = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%']);

  const renderVerticalTimeline = () => (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Animated Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 dark:bg-slate-800 bg-slate-200">
        {animated && (
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-violet-500 to-pink-500"
            style={{ height: lineHeight }}
          />
        )}
      </div>

      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              type: 'spring',
              stiffness: 100,
            }}
            className="relative flex gap-6"
          >
            {/* Step Indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{
                delay: index * 0.2 + 0.1,
                type: 'spring',
                stiffness: 200,
              }}
              className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                step.status === 'completed'
                  ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                  : step.status === 'current'
                  ? 'bg-gradient-to-br from-violet-500 to-pink-500 ring-4 ring-violet-500/20'
                  : 'dark:bg-slate-800 bg-slate-100 border-2 dark:border-slate-700 border-slate-300'
              }`}
            >
              {step.icon ? (
                <span className={step.status === 'upcoming' ? 'dark:text-slate-500 text-slate-400' : 'text-white'}>
                  {step.icon}
                </span>
              ) : (
                <span
                  className={`text-sm font-bold ${
                    step.status === 'upcoming' ? 'dark:text-slate-500 text-slate-400' : 'text-white'
                  }`}
                >
                  {index + 1}
                </span>
              )}

              {/* Pulse effect for current step */}
              {step.status === 'current' && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-violet-500"
                  animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [0.5, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.2 }}
                className={`text-lg font-bold mb-2 ${
                  step.status === 'upcoming'
                    ? 'dark:text-slate-500 text-slate-400'
                    : 'dark:text-white text-slate-900'
                }`}
              >
                {step.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.3 }}
                className="dark:text-slate-400 text-slate-500"
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderHorizontalTimeline = () => (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Horizontal Line */}
      <div className="absolute left-0 right-0 top-6 h-0.5 dark:bg-slate-800 bg-slate-200">
        {animated && (
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-violet-500 to-pink-500"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
            className="text-center"
          >
            {/* Step Indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{
                delay: index * 0.15 + 0.1,
                type: 'spring',
              }}
              className={`relative mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center ${
                step.status === 'completed'
                  ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                  : step.status === 'current'
                  ? 'bg-gradient-to-br from-violet-500 to-pink-500'
                  : 'dark:bg-slate-800 bg-slate-100 border-2 dark:border-slate-700 border-slate-300'
              }`}
            >
              {step.icon ? (
                <span className={step.status === 'upcoming' ? 'dark:text-slate-500 text-slate-400' : 'text-white'}>
                  {step.icon}
                </span>
              ) : (
                <span
                  className={`text-sm font-bold ${
                    step.status === 'upcoming' ? 'dark:text-slate-500 text-slate-400' : 'text-white'
                  }`}
                >
                  {index + 1}
                </span>
              )}
            </motion.div>

            {/* Content */}
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.2 }}
              className={`font-bold mb-1 ${
                step.status === 'upcoming'
                  ? 'dark:text-slate-500 text-slate-400'
                  : 'dark:text-white text-slate-900'
              }`}
            >
              {step.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.3 }}
              className="text-sm dark:text-slate-400 text-slate-500"
            >
              {step.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return variant === 'vertical' ? renderVerticalTimeline() : renderHorizontalTimeline();
};

export default ProcessTimeline;
