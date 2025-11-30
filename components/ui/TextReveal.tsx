'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  stagger?: number;
  triggerOnView?: boolean;
  hover?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  stagger = 30,
  triggerOnView = true,
  hover = false,
  as: Component = 'div',
}) => {
  const [isRevealed, setIsRevealed] = useState(!triggerOnView && !hover);
  const containerRef = useRef<HTMLDivElement>(null);

  const words = children.split(' ');

  const directionStyles = {
    up: { initial: 'translateY(100%)', final: 'translateY(0)' },
    down: { initial: 'translateY(-100%)', final: 'translateY(0)' },
    left: { initial: 'translateX(100%)', final: 'translateX(0)' },
    right: { initial: 'translateX(-100%)', final: 'translateX(0)' },
  };

  useEffect(() => {
    if (!triggerOnView || hover) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnView, delay, hover]);

  const handleMouseEnter = () => {
    if (hover) setIsRevealed(true);
  };

  const handleMouseLeave = () => {
    if (hover) setIsRevealed(false);
  };

  return (
    <Component
      ref={containerRef as any}
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          <span
            className="inline-block transition-transform duration-500 ease-out"
            style={{
              transform: isRevealed
                ? directionStyles[direction].final
                : directionStyles[direction].initial,
              transitionDelay: `${wordIndex * stagger}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};

interface CharacterRevealProps {
  children: string;
  className?: string;
  stagger?: number;
  triggerOnView?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const CharacterReveal: React.FC<CharacterRevealProps> = ({
  children,
  className = '',
  stagger = 20,
  triggerOnView = true,
  as: Component = 'span',
}) => {
  const [isRevealed, setIsRevealed] = useState(!triggerOnView);
  const containerRef = useRef<HTMLSpanElement>(null);

  const characters = children.split('');

  useEffect(() => {
    if (!triggerOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnView]);

  return (
    <Component ref={containerRef as any} className={className}>
      {characters.map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-300"
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${index * stagger}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Component>
  );
};

export default TextReveal;
