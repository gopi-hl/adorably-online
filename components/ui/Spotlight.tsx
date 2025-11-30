import React, { useState, useCallback, useRef } from 'react';

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  color?: string;
  intensity?: number;
  blur?: number;
  disabled?: boolean;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  children,
  className = '',
  size = 400,
  color = 'rgba(139, 92, 246, 0.15)',
  intensity = 1,
  blur = 80,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || disabled) return;

      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [disabled]
  );

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovered(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Spotlight effect */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          left: position.x - size / 2,
          top: position.y - size / 2,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          opacity: isHovered ? intensity : 0,
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(139, 92, 246, 0.15)',
}) => {
  return (
    <Spotlight
      color={spotlightColor}
      size={300}
      blur={60}
      className={`
        rounded-2xl p-6
        bg-white/5 dark:bg-white/5
        border border-white/10 dark:border-white/10
        backdrop-blur-sm
        ${className}
      `}
    >
      {children}
    </Spotlight>
  );
};

export default Spotlight;
