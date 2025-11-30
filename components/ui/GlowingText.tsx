'use client';

import React from 'react';

interface GlowingTextProps {
  children: React.ReactNode;
  className?: string;
  color?: 'violet' | 'cyan' | 'emerald' | 'pink' | 'amber' | 'rainbow';
  intensity?: 'soft' | 'medium' | 'strong';
  animated?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export const GlowingText: React.FC<GlowingTextProps> = ({
  children,
  className = '',
  color = 'violet',
  intensity = 'medium',
  animated = true,
  as: Component = 'span',
}) => {
  const colorStyles = {
    violet: {
      text: 'text-violet-400',
      shadow: 'drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]',
      strongShadow: 'drop-shadow-[0_0_25px_rgba(139,92,246,0.9)] drop-shadow-[0_0_50px_rgba(139,92,246,0.5)]',
    },
    cyan: {
      text: 'text-cyan-400',
      shadow: 'drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]',
      strongShadow: 'drop-shadow-[0_0_25px_rgba(34,211,238,0.9)] drop-shadow-[0_0_50px_rgba(34,211,238,0.5)]',
    },
    emerald: {
      text: 'text-emerald-400',
      shadow: 'drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]',
      strongShadow: 'drop-shadow-[0_0_25px_rgba(52,211,153,0.9)] drop-shadow-[0_0_50px_rgba(52,211,153,0.5)]',
    },
    pink: {
      text: 'text-pink-400',
      shadow: 'drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]',
      strongShadow: 'drop-shadow-[0_0_25px_rgba(244,114,182,0.9)] drop-shadow-[0_0_50px_rgba(244,114,182,0.5)]',
    },
    amber: {
      text: 'text-amber-400',
      shadow: 'drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]',
      strongShadow: 'drop-shadow-[0_0_25px_rgba(251,191,36,0.9)] drop-shadow-[0_0_50px_rgba(251,191,36,0.5)]',
    },
    rainbow: {
      text: 'bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent',
      shadow: 'drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]',
      strongShadow: 'drop-shadow-[0_0_20px_rgba(244,114,182,0.6)] drop-shadow-[0_0_40px_rgba(34,211,238,0.4)]',
    },
  };

  const intensityStyles = {
    soft: colorStyles[color].shadow,
    medium: `${colorStyles[color].shadow} brightness-110`,
    strong: colorStyles[color].strongShadow,
  };

  return (
    <Component
      className={`
        ${colorStyles[color].text}
        ${intensityStyles[intensity]}
        ${animated ? 'animate-pulse' : ''}
        transition-all duration-300
        ${className}
      `}
      style={
        animated
          ? {
              animation: 'glow-pulse 2s ease-in-out infinite',
            }
          : undefined
      }
    >
      {children}
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { filter: ${intensity === 'strong' ? 'brightness(1.2)' : 'brightness(1)'}; }
          50% { filter: brightness(1.4); }
        }
      `}</style>
    </Component>
  );
};

export default GlowingText;
