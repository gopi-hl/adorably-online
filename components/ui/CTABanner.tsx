'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Star } from 'lucide-react';

interface CTABannerProps {
  title: string;
  description?: string;
  primaryCTA?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryCTA?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
  variant?: 'gradient' | 'glass' | 'dark' | 'bordered';
  animated?: boolean;
  icon?: React.ReactNode;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className = '',
  variant = 'gradient',
  animated = true,
  icon,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600';
      case 'glass':
        return 'dark:bg-white/5 bg-white/80 backdrop-blur-xl border dark:border-white/10 border-slate-200';
      case 'dark':
        return 'bg-slate-900 dark:bg-slate-800';
      case 'bordered':
        return 'dark:bg-transparent bg-transparent border-2 border-violet-500';
      default:
        return '';
    }
  };

  const textColorClass = variant === 'glass' || variant === 'bordered'
    ? 'dark:text-white text-slate-900'
    : 'text-white';

  return (
    <motion.div
      ref={containerRef}
      initial={animated ? { opacity: 0, y: 30 } : {}}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, type: 'spring' }}
      className={`relative overflow-hidden rounded-3xl ${getVariantStyles()} ${className}`}
    >
      {/* Background Effects */}
      {variant === 'gradient' && (
        <>
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%]"
            animate={{
              backgroundPosition: ['200% 0%', '-50% 0%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-20" />
        </>
      )}

      {/* Floating Elements */}
      {animated && (
        <>
          <motion.div
            className="absolute top-4 left-[10%] text-white/20"
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Star size={24} />
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-[15%] text-white/20"
            animate={{
              y: [10, -10, 10],
              rotate: [0, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles size={20} />
          </motion.div>
        </>
      )}

      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Content */}
        <div className="text-center md:text-left max-w-2xl">
          {icon && (
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 mb-4"
            >
              {icon}
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className={`text-2xl md:text-4xl font-black mb-3 ${textColorClass}`}
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className={`text-lg ${
                variant === 'glass' || variant === 'bordered'
                  ? 'dark:text-slate-300 text-slate-600'
                  : 'text-white/80'
              }`}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {primaryCTA && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={primaryCTA.onClick}
              className={`px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                variant === 'gradient' || variant === 'dark'
                  ? 'bg-white text-slate-900 hover:bg-slate-100'
                  : 'bg-violet-600 text-white hover:bg-violet-700'
              }`}
            >
              <Zap size={18} />
              {primaryCTA.text}
              <ArrowRight size={18} />
            </motion.button>
          )}

          {secondaryCTA && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={secondaryCTA.onClick}
              className={`px-8 py-4 rounded-xl font-bold border-2 transition-all ${
                variant === 'gradient' || variant === 'dark'
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-violet-500 text-violet-600 dark:text-violet-400 hover:bg-violet-500/10'
              }`}
            >
              {secondaryCTA.text}
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CTABanner;
