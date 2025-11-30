'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface MorphingTextProps {
  texts: string[];
  className?: string;
  interval?: number;
  variant?: 'fade' | 'slide' | 'flip' | 'blur' | 'typewriter' | 'scramble';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  prefix?: string;
  suffix?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className = '',
  interval = 3000,
  variant = 'fade',
  as: Component = 'span',
  prefix = '',
  suffix = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(texts[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval, isInView]);

  // Scramble effect
  useEffect(() => {
    if (variant !== 'scramble') return;

    const targetText = texts[currentIndex];
    let iteration = 0;

    const scrambleInterval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return char;
            }
            return char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iteration += 1 / 3;

      if (iteration >= targetText.length) {
        clearInterval(scrambleInterval);
        setDisplayText(targetText);
      }
    }, 30);

    return () => clearInterval(scrambleInterval);
  }, [currentIndex, texts, variant]);

  // Typewriter effect
  useEffect(() => {
    if (variant !== 'typewriter') return;

    const targetText = texts[currentIndex];
    setIsAnimating(true);
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= targetText.length) {
        setDisplayText(targetText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsAnimating(false);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentIndex, texts, variant]);

  const renderFade = () => (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {texts[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );

  const renderSlide = () => (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="block"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );

  const renderFlip = () => (
    <div className="relative perspective-1000">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="block origin-bottom"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );

  const renderBlur = () => (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.4 }}
      >
        {texts[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );

  const renderTypewriter = () => (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block ml-0.5 w-0.5 h-[1em] bg-current align-middle"
      />
    </span>
  );

  const renderScramble = () => (
    <span className="font-mono">
      {displayText.split('').map((char, i) => (
        <motion.span
          key={`${currentIndex}-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );

  const renderContent = () => {
    switch (variant) {
      case 'slide':
        return renderSlide();
      case 'flip':
        return renderFlip();
      case 'blur':
        return renderBlur();
      case 'typewriter':
        return renderTypewriter();
      case 'scramble':
        return renderScramble();
      default:
        return renderFade();
    }
  };

  return (
    <div ref={containerRef} className={`inline-flex items-baseline ${className}`}>
      {prefix && <span className="mr-2">{prefix}</span>}
      <Component className="inline-block">{renderContent()}</Component>
      {suffix && <span className="ml-2">{suffix}</span>}
    </div>
  );
};

export default MorphingText;
