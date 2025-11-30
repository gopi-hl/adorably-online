'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'spotlight' | 'border' | 'ambient';
  glowColor?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  hoverEffect?: boolean;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className = '',
  variant = 'default',
  glowColor = 'rgba(139, 92, 246, 0.5)',
  glowIntensity = 'medium',
  hoverEffect = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  const intensityValues = {
    low: { blur: 40, spread: 20 },
    medium: { blur: 80, spread: 40 },
    high: { blur: 120, spread: 60 },
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // === Default Glow Variant ===
  const renderDefaultVariant = () => (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${className}`}
    >
      {/* Glow */}
      <motion.div
        className="absolute -inset-2 rounded-3xl pointer-events-none"
        animate={{
          opacity: hoverEffect ? (isHovered ? 0.8 : 0.4) : 0.4,
          scale: hoverEffect ? (isHovered ? 1.02 : 1) : 1,
        }}
        style={{
          background: glowColor,
          filter: `blur(${intensityValues[glowIntensity].blur}px)`,
        }}
      />

      {/* Card Content */}
      <div className="relative rounded-2xl dark:bg-slate-900 bg-white border dark:border-white/10 border-slate-200 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );

  // === Spotlight Variant ===
  const renderSpotlightVariant = () => (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group overflow-hidden rounded-2xl dark:bg-slate-900 bg-white border dark:border-white/10 border-slate-200 ${className}`}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  // === Border Glow Variant ===
  const renderBorderVariant = () => (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${className}`}
    >
      {/* Animated Border */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl overflow-hidden"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${glowColor}, transparent 60%, ${glowColor})`,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Inner Border Glow */}
      <div
        className="absolute -inset-[1px] rounded-2xl blur-sm"
        style={{ background: glowColor, opacity: isHovered ? 0.5 : 0.2 }}
      />

      {/* Card */}
      <div className="relative rounded-2xl dark:bg-slate-900 bg-white overflow-hidden">
        {children}
      </div>
    </motion.div>
  );

  // === Ambient Glow Variant ===
  const renderAmbientVariant = () => (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${className}`}
    >
      {/* Multiple Ambient Glows */}
      <motion.div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: glowColor,
          filter: `blur(${intensityValues[glowIntensity].blur}px)`,
        }}
      />

      <motion.div
        className="absolute -inset-8 rounded-3xl pointer-events-none"
        animate={{
          opacity: [0.2, 0.3, 0.2],
          scale: [1.02, 1, 1.02],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        style={{
          background: glowColor,
          filter: `blur(${intensityValues[glowIntensity].blur * 1.5}px)`,
        }}
      />

      {/* Card */}
      <motion.div
        className="relative rounded-2xl dark:bg-slate-900 bg-white border dark:border-white/10 border-slate-200 overflow-hidden"
        animate={hoverEffect ? { y: isHovered ? -5 : 0 } : {}}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );

  switch (variant) {
    case 'spotlight':
      return renderSpotlightVariant();
    case 'border':
      return renderBorderVariant();
    case 'ambient':
      return renderAmbientVariant();
    default:
      return renderDefaultVariant();
  }
};

export default GlowingCard;
