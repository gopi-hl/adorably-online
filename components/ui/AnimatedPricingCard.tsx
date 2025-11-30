'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Zap } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ctaText?: string;
}

interface AnimatedPricingCardProps {
  tier: PricingTier;
  onSelect?: () => void;
  delay?: number;
  className?: string;
}

export const AnimatedPricingCard: React.FC<AnimatedPricingCardProps> = ({
  tier,
  onSelect,
  delay = 0,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative ${className}`}
    >
      {/* Glow effect for highlighted cards */}
      {tier.highlighted && (
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl blur-lg opacity-75"
          animate={{
            opacity: isHovered ? 1 : 0.75,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div
        className={`relative p-8 rounded-2xl border transition-colors duration-300 ${
          tier.highlighted
            ? 'bg-gradient-to-b from-slate-900 to-slate-800 border-violet-500/50 dark:from-slate-900 dark:to-slate-800'
            : 'dark:bg-slate-900/50 bg-white dark:border-white/10 border-slate-200'
        }`}
      >
        {/* Badge */}
        <AnimatePresence>
          {tier.badge && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-bold shadow-lg">
                <Sparkles size={12} />
                {tier.badge}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="text-center mb-6">
          <motion.h3
            className={`text-xl font-bold mb-2 ${
              tier.highlighted ? 'text-white' : 'dark:text-white text-slate-900'
            }`}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {tier.name}
          </motion.h3>
          <p
            className={`text-sm ${
              tier.highlighted ? 'text-slate-300' : 'dark:text-slate-400 text-slate-500'
            }`}
          >
            {tier.description}
          </p>
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <motion.div
            className="flex items-baseline justify-center gap-1"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <span
              className={`text-5xl font-black ${
                tier.highlighted ? 'text-white' : 'dark:text-white text-slate-900'
              }`}
            >
              {tier.price}
            </span>
            {tier.period && (
              <span
                className={`text-sm ${
                  tier.highlighted ? 'text-slate-400' : 'dark:text-slate-500 text-slate-400'
                }`}
              >
                /{tier.period}
              </span>
            )}
          </motion.div>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {tier.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <motion.span
                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                  tier.highlighted
                    ? 'bg-violet-500/20 text-violet-400'
                    : 'dark:bg-emerald-500/20 bg-emerald-100 dark:text-emerald-400 text-emerald-600'
                }`}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Check size={12} />
              </motion.span>
              <span
                className={`text-sm ${
                  tier.highlighted ? 'text-slate-300' : 'dark:text-slate-300 text-slate-600'
                }`}
              >
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          onClick={onSelect}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            tier.highlighted
              ? 'bg-white text-slate-900 hover:bg-slate-100'
              : 'dark:bg-white/10 bg-slate-900 dark:text-white text-white hover:bg-slate-800 dark:hover:bg-white/20'
          }`}
        >
          <Zap size={16} />
          {tier.ctaText || 'Get Started'}
        </motion.button>
      </div>
    </motion.div>
  );
};

// Pricing Grid Component
interface AnimatedPricingGridProps {
  tiers: PricingTier[];
  className?: string;
}

export const AnimatedPricingGrid: React.FC<AnimatedPricingGridProps> = ({
  tiers,
  className = '',
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}
    >
      {tiers.map((tier, index) => (
        <AnimatedPricingCard key={tier.name} tier={tier} delay={index * 0.15} />
      ))}
    </motion.div>
  );
};

export default AnimatedPricingCard;
