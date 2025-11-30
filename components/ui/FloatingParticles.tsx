'use client';

import React, { useMemo, useId } from 'react';

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  className?: string;
  count?: number;
  color?: 'violet' | 'cyan' | 'white' | 'mixed';
  minSize?: number;
  maxSize?: number;
  speed?: 'slow' | 'medium' | 'fast';
  direction?: 'up' | 'down' | 'random';
  interactive?: boolean;
}

const sanitizeId = (value: string, fallback: string) => {
  const sanitized = value.replace(/[^a-zA-Z0-9-_]/g, '');
  return sanitized || fallback;
};

const hashStringToSeed = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 1;
};

const createDeterministicRandom = (seedInput: number) => {
  let seed = seedInput;
  return () => {
    seed += 0x6d2b79f5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  className = '',
  count = 30,
  color = 'mixed',
  minSize = 2,
  maxSize = 6,
  speed = 'medium',
  direction = 'up',
  interactive = false,
}) => {
  const reactId = useId();
  const seed = useMemo(
    () => hashStringToSeed(sanitizeId(reactId, 'floating-particles')),
    [reactId]
  );

  const speedMultiplier = {
    slow: 1.5,
    medium: 1,
    fast: 0.5,
  };

  const colorStyles = {
    violet: ['bg-violet-400', 'bg-violet-500', 'bg-violet-300'],
    cyan: ['bg-cyan-400', 'bg-cyan-500', 'bg-cyan-300'],
    white: ['bg-white', 'bg-slate-200', 'bg-slate-100'],
    mixed: ['bg-violet-400', 'bg-cyan-400', 'bg-pink-400', 'bg-emerald-400', 'bg-amber-400'],
  };

  const particles = useMemo<Particle[]>(() => {
    const random = createDeterministicRandom(seed);
    const randomBetween = (min: number, max: number) => random() * (max - min) + min;

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: randomBetween(minSize, maxSize),
      x: random() * 100,
      y: random() * 100,
      duration: randomBetween(10, 20) * speedMultiplier[speed],
      delay: random() * 5,
      opacity: randomBetween(0.3, 0.8),
    }));
  }, [count, seed, minSize, maxSize, speed]);

  const getColorClass = (index: number) => {
    const colors = colorStyles[color];
    return colors[index % colors.length];
  };

  const getAnimation = () => {
    switch (direction) {
      case 'up':
        return 'float-up';
      case 'down':
        return 'float-down';
      case 'random':
        return 'float-random';
      default:
        return 'float-up';
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle, index) => (
        <div
          key={particle.id}
          className={`
            absolute rounded-full
            ${getColorClass(index)}
            ${interactive ? 'pointer-events-auto hover:scale-150 transition-transform cursor-pointer' : ''}
          `}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: direction === 'down' ? '-5%' : `${particle.y}%`,
            opacity: particle.opacity,
            animation: `${getAnimation()} ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: `0 0 ${particle.size * 2}px currentColor`,
          }}
        />
      ))}

      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--particle-opacity, 0.5);
          }
          90% {
            opacity: var(--particle-opacity, 0.5);
          }
          100% {
            transform: translateY(-100vh) translateX(20px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float-down {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--particle-opacity, 0.5);
          }
          90% {
            opacity: var(--particle-opacity, 0.5);
          }
          100% {
            transform: translateY(100vh) translateX(-20px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float-random {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          25% {
            transform: translate(30px, -25vh) rotate(90deg);
            opacity: var(--particle-opacity, 0.5);
          }
          50% {
            transform: translate(-20px, -50vh) rotate(180deg);
          }
          75% {
            transform: translate(40px, -75vh) rotate(270deg);
            opacity: var(--particle-opacity, 0.5);
          }
          100% {
            transform: translate(0, -100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingParticles;
