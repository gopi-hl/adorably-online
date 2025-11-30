'use client';

import React, { useRef, ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion';

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'blur' | 'split';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

const variants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  split: {
    hidden: { opacity: 0, y: 20, rotateX: 45 },
    visible: { opacity: 1, y: 0, rotateX: 0 },
  },
};

export const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  className = '',
  variant = 'slide-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  stagger = false,
  staggerDelay = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: `-${Math.round(threshold * 100)}px 0px 0px 0px` as any,
  });

  if (stagger && React.Children.count(children) > 1) {
    return (
      <div ref={ref} className={className}>
        {React.Children.map(children, (child, index) => (
          <motion.div
            variants={variants[variant]}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration,
              delay: delay + index * staggerDelay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// === Parallax Section ===
interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// === Scale on Scroll ===
interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number];
}

export const ScaleOnScroll: React.FC<ScaleOnScrollProps> = ({
  children,
  className = '',
  scaleRange = [0.8, 1],
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// === Rotate on Scroll ===
interface RotateOnScrollProps {
  children: ReactNode;
  className?: string;
  rotateRange?: [number, number];
}

export const RotateOnScroll: React.FC<RotateOnScrollProps> = ({
  children,
  className = '',
  rotateRange = [-10, 10],
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);

  return (
    <motion.div ref={ref} style={{ rotate }} className={className}>
      {children}
    </motion.div>
  );
};

// === Opacity on Scroll ===
interface OpacityOnScrollProps {
  children: ReactNode;
  className?: string;
  fadeIn?: boolean;
  fadeOut?: boolean;
}

export const OpacityOnScroll: React.FC<OpacityOnScrollProps> = ({
  children,
  className = '',
  fadeIn = true,
  fadeOut = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [fadeIn ? 0 : 1, 1, 1, fadeOut ? 0 : 1]
  );

  return (
    <motion.div ref={ref} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// === Sticky Section ===
interface StickySectionProps {
  children: ReactNode;
  className?: string;
  height?: string;
}

export const StickySection: React.FC<StickySectionProps> = ({
  children,
  className = '',
  height = '200vh',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={ref} style={{ height }} className={`relative ${className}`}>
      <motion.div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {typeof children === 'function' ? (children as (progress: any) => ReactNode)(scrollYProgress) : children}
      </motion.div>
    </div>
  );
};

export default ScrollRevealSection;
