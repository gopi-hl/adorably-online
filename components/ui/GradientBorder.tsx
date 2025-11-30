import React from 'react';

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  borderRadius?: string;
  gradient?: 'rainbow' | 'sunset' | 'ocean' | 'forest' | 'neon' | 'custom';
  customGradient?: string;
  animated?: boolean;
  speed?: 'slow' | 'medium' | 'fast';
  hoverEffect?: boolean;
}

export const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  className = '',
  borderWidth = 2,
  borderRadius = '1rem',
  gradient = 'rainbow',
  customGradient,
  animated = true,
  speed = 'medium',
  hoverEffect = true,
}) => {
  const gradientStyles = {
    rainbow: 'linear-gradient(135deg, #f093fb, #f5576c, #4facfe, #00f2fe, #43e97b, #f093fb)',
    sunset: 'linear-gradient(135deg, #fa709a, #fee140, #fa709a)',
    ocean: 'linear-gradient(135deg, #667eea, #764ba2, #667eea)',
    forest: 'linear-gradient(135deg, #11998e, #38ef7d, #11998e)',
    neon: 'linear-gradient(135deg, #00ffff, #ff00ff, #00ffff)',
    custom: customGradient || 'linear-gradient(135deg, #667eea, #764ba2)',
  };

  const speedDuration = {
    slow: '6s',
    medium: '3s',
    fast: '1.5s',
  };

  return (
    <div
      className={`relative group ${className}`}
      style={{ borderRadius }}
    >
      {/* Gradient border background */}
      <div
        className={`
          absolute inset-0 rounded-[inherit]
          ${hoverEffect ? 'group-hover:opacity-100 group-hover:blur-sm' : ''}
          transition-all duration-300
        `}
        style={{
          background: gradientStyles[gradient],
          backgroundSize: animated ? '300% 300%' : '100% 100%',
          animation: animated ? `gradient-rotate ${speedDuration[speed]} linear infinite` : 'none',
        }}
      />

      {/* Inner content container */}
      <div
        className="relative bg-white dark:bg-[#0a0a0b] rounded-[inherit]"
        style={{
          margin: borderWidth,
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
        }}
      >
        {children}
      </div>

      {/* Glow effect on hover */}
      {hoverEffect && (
        <div
          className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300 -z-10"
          style={{
            background: gradientStyles[gradient],
            backgroundSize: '300% 300%',
            animation: animated ? `gradient-rotate ${speedDuration[speed]} linear infinite` : 'none',
          }}
        />
      )}

      <style>{`
        @keyframes gradient-rotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default GradientBorder;
