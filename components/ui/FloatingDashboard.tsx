'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

interface FloatingDashboardProps {
  children?: React.ReactNode;
  image?: string;
  className?: string;
  variant?: '3d-tilt' | 'float' | 'parallax' | 'perspective';
  glowColor?: string;
  shadowIntensity?: 'light' | 'medium' | 'heavy';
}

export const FloatingDashboard: React.FC<FloatingDashboardProps> = ({
  children,
  image,
  className = '',
  variant = '3d-tilt',
  glowColor = 'rgba(139, 92, 246, 0.4)',
  shadowIntensity = 'medium',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), {
    stiffness: 100,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const shadowClasses = {
    light: 'shadow-xl',
    medium: 'shadow-2xl shadow-black/20',
    heavy: 'shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)]',
  };

  const render3DTilt = () => (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, type: 'spring' }}
      style={{
        perspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-4 rounded-3xl blur-3xl"
        style={{
          background: glowColor,
          opacity: 0.4,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className={`relative rounded-2xl overflow-hidden border dark:border-white/10 border-slate-200 ${shadowClasses[shadowIntensity]}`}
        animate={{
          rotateX: mousePosition.y * -15,
          rotateY: mousePosition.x * 15,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* Browser Chrome */}
        <div className="h-8 bg-slate-900 dark:bg-slate-800 flex items-center gap-2 px-4 border-b dark:border-white/10 border-slate-700">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <div className="flex-1 mx-4">
            <div className="h-5 bg-slate-700 rounded-md flex items-center px-3">
              <span className="text-xs text-slate-400 truncate">app.yourproduct.com/dashboard</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="dark:bg-slate-900 bg-slate-100">
          {image ? (
            <img src={image} alt="Dashboard" className="w-full" />
          ) : (
            children || <DashboardPlaceholder />
          )}
        </div>

        {/* Glare Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 50}% ${50 + mousePosition.y * 50}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );

  const renderFloat = () => (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`relative ${className}`}
    >
      {/* Glow */}
      <motion.div
        className="absolute -inset-4 rounded-3xl blur-3xl"
        style={{ background: glowColor, opacity: 0.3 }}
      />

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotateX: [0, 2, 0],
          rotateY: [0, -2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`relative rounded-2xl overflow-hidden border dark:border-white/10 border-slate-200 ${shadowClasses[shadowIntensity]}`}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      >
        <div className="h-8 bg-slate-900 flex items-center gap-2 px-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="dark:bg-slate-900 bg-slate-100">
          {image ? <img src={image} alt="Dashboard" className="w-full" /> : children || <DashboardPlaceholder />}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderParallax = () => (
    <motion.div
      ref={containerRef}
      style={{ y }}
      className={`relative ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className={`rounded-2xl overflow-hidden border dark:border-white/10 border-slate-200 ${shadowClasses[shadowIntensity]}`}
      >
        <div className="h-8 bg-slate-900 flex items-center gap-2 px-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="dark:bg-slate-900 bg-slate-100">
          {image ? <img src={image} alt="Dashboard" className="w-full" /> : children || <DashboardPlaceholder />}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderPerspective = () => (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, type: 'spring' }}
      className={`relative ${className}`}
      style={{ perspective: 2000 }}
    >
      <motion.div
        className="absolute -inset-8 rounded-3xl blur-3xl"
        style={{ background: glowColor, opacity: 0.2 }}
      />

      <motion.div
        initial={{ rotateX: 45 }}
        animate={isInView ? { rotateX: 15 } : {}}
        transition={{ duration: 1.5, type: 'spring' }}
        className={`relative rounded-2xl overflow-hidden border dark:border-white/10 border-slate-200 ${shadowClasses[shadowIntensity]}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="h-8 bg-slate-900 flex items-center gap-2 px-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="dark:bg-slate-900 bg-slate-100 overflow-hidden">
          {image ? <img src={image} alt="Dashboard" className="w-full" /> : children || <DashboardPlaceholder />}
        </div>
      </motion.div>
    </motion.div>
  );

  switch (variant) {
    case 'float':
      return renderFloat();
    case 'parallax':
      return renderParallax();
    case 'perspective':
      return renderPerspective();
    default:
      return render3DTilt();
  }
};

// Default placeholder dashboard
const DashboardPlaceholder = () => (
  <div className="p-6 space-y-4">
    <div className="grid grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-4 rounded-xl dark:bg-slate-800 bg-white">
          <div className="w-8 h-8 rounded-lg dark:bg-slate-700 bg-slate-100 mb-3" />
          <div className="h-6 w-16 dark:bg-slate-700 bg-slate-100 rounded mb-1" />
          <div className="h-3 w-12 dark:bg-slate-700/50 bg-slate-100 rounded" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 h-40 rounded-xl dark:bg-slate-800 bg-white p-4">
        <div className="h-4 w-24 dark:bg-slate-700 bg-slate-100 rounded mb-4" />
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 45, 80, 55, 70, 60, 90, 75, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-violet-500 to-pink-500"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <div className="h-40 rounded-xl dark:bg-slate-800 bg-white p-4">
        <div className="h-4 w-16 dark:bg-slate-700 bg-slate-100 rounded mb-4" />
        <div className="relative w-full h-24 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-8 dark:border-slate-700 border-slate-200" />
          <div className="absolute w-20 h-20 rounded-full border-8 border-transparent border-t-violet-500 border-r-violet-500" style={{ transform: 'rotate(45deg)' }} />
        </div>
      </div>
    </div>
  </div>
);

export default FloatingDashboard;
