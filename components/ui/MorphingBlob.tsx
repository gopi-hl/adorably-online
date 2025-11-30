'use client';

import React, { useMemo } from 'react';

interface MorphingBlobProps {
  className?: string;
  color?: 'violet' | 'cyan' | 'emerald' | 'pink' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  speed?: 'slow' | 'medium' | 'fast';
  blur?: boolean;
  opacity?: number;
}

export const MorphingBlob: React.FC<MorphingBlobProps> = ({
  className = '',
  color = 'violet',
  size = 'md',
  speed = 'medium',
  blur = true,
  opacity = 0.6,
}) => {
  const sizeStyles = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[500px] h-[500px]',
    full: 'w-full h-full',
  };

  const colorStyles = {
    violet: 'bg-violet-500',
    cyan: 'bg-cyan-500',
    emerald: 'bg-emerald-500',
    pink: 'bg-pink-500',
    gradient: 'bg-gradient-to-br from-violet-500 via-pink-500 to-cyan-500',
  };

  const speedDuration = {
    slow: '12s',
    medium: '8s',
    fast: '4s',
  };

  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), []);

  return (
    <div className={`relative ${sizeStyles[size]} ${className}`}>
      <div
        className={`
          absolute inset-0
          ${colorStyles[color]}
          ${blur ? 'blur-3xl' : ''}
          rounded-full
        `}
        style={{
          opacity,
          animation: `morph-${uniqueId} ${speedDuration[speed]} ease-in-out infinite`,
        }}
      />

      {/* Secondary blob for more organic look */}
      <div
        className={`
          absolute inset-0
          ${colorStyles[color]}
          ${blur ? 'blur-3xl' : ''}
          rounded-full
        `}
        style={{
          opacity: opacity * 0.7,
          animation: `morph-reverse-${uniqueId} ${speedDuration[speed]} ease-in-out infinite`,
          animationDelay: '-4s',
        }}
      />

      <style>{`
        @keyframes morph-${uniqueId} {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: rotate(0deg) scale(1);
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: rotate(90deg) scale(1.1);
          }
          50% {
            border-radius: 50% 60% 30% 60% / 30% 50% 70% 50%;
            transform: rotate(180deg) scale(1);
          }
          75% {
            border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%;
            transform: rotate(270deg) scale(0.95);
          }
        }

        @keyframes morph-reverse-${uniqueId} {
          0%, 100% {
            border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
            transform: rotate(0deg) scale(0.95);
          }
          25% {
            border-radius: 70% 30% 40% 60% / 60% 40% 60% 30%;
            transform: rotate(-90deg) scale(1);
          }
          50% {
            border-radius: 30% 50% 60% 50% / 70% 30% 50% 60%;
            transform: rotate(-180deg) scale(1.05);
          }
          75% {
            border-radius: 50% 70% 30% 60% / 30% 60% 70% 40%;
            transform: rotate(-270deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default MorphingBlob;
