'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, Users, Globe, Zap, ArrowUpRight } from 'lucide-react';

interface StatItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  trend?: number;
  description?: string;
}

interface AnimatedStatsCounterProps {
  stats: StatItem[];
  duration?: number;
  className?: string;
  variant?: 'cards' | 'inline' | 'minimal';
  staggerDelay?: number;
}

const AnimatedNumber: React.FC<{
  value: number;
  duration: number;
  prefix?: string;
  suffix?: string;
}> = ({ value, duration, prefix = '', suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};

export const AnimatedStatsCounter: React.FC<AnimatedStatsCounterProps> = ({
  stats,
  duration = 2,
  className = '',
  variant = 'cards',
  staggerDelay = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const renderCardVariant = () => (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
            type: 'spring',
            stiffness: 100,
          }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative p-6 dark:bg-slate-900/50 bg-white rounded-2xl border dark:border-white/10 border-slate-200 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />

            {/* Icon */}
            {stat.icon && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: index * staggerDelay + 0.2, type: 'spring' }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white mb-4"
              >
                {stat.icon}
              </motion.div>
            )}

            {/* Value */}
            <div className="text-3xl md:text-4xl font-black dark:text-white text-slate-900 mb-1">
              <AnimatedNumber
                value={stat.value}
                duration={duration}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>

            {/* Label */}
            <p className="text-sm dark:text-slate-400 text-slate-500 mb-2">{stat.label}</p>

            {/* Trend */}
            {stat.trend !== undefined && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * staggerDelay + 0.3 }}
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                <ArrowUpRight
                  size={14}
                  className={stat.trend < 0 ? 'rotate-90' : ''}
                />
                {Math.abs(stat.trend)}% vs last month
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderInlineVariant = () => (
    <div className={`flex flex-wrap justify-center gap-8 md:gap-16 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
          }}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent mb-2">
            <AnimatedNumber
              value={stat.value}
              duration={duration}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          </div>
          <p className="text-sm dark:text-slate-400 text-slate-500 uppercase tracking-wider font-medium">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );

  const renderMinimalVariant = () => (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
          }}
          className="relative"
        >
          {/* Animated Border */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: index * staggerDelay }}
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500 origin-left"
          />

          <div className="pt-4">
            <div className="text-3xl font-black dark:text-white text-slate-900 mb-1">
              <AnimatedNumber
                value={stat.value}
                duration={duration}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>
            <p className="text-sm dark:text-slate-400 text-slate-500">{stat.label}</p>
            {stat.description && (
              <p className="text-xs dark:text-slate-500 text-slate-400 mt-1">{stat.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div ref={containerRef}>
      {variant === 'cards' && renderCardVariant()}
      {variant === 'inline' && renderInlineVariant()}
      {variant === 'minimal' && renderMinimalVariant()}
    </div>
  );
};

export default AnimatedStatsCounter;
