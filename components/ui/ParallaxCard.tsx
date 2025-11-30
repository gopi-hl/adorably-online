'use client';

import React, { useRef, useState, useCallback } from 'react';

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  border?: boolean;
  shadow?: boolean;
}

export const ParallaxCard: React.FC<ParallaxCardProps> = ({
  children,
  className = '',
  intensity = 15,
  glare = true,
  border = true,
  shadow = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (-mouseY / (rect.height / 2)) * intensity;
      const rotateY = (mouseX / (rect.width / 2)) * intensity;

      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;

      setTransform({ rotateX, rotateY });
      setGlarePosition({ x: glareX, y: glareY });
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`
        relative overflow-hidden rounded-2xl
        ${border ? 'border border-white/10 dark:border-white/5' : ''}
        ${shadow ? 'shadow-2xl dark:shadow-black/50' : ''}
        transition-shadow duration-300
        ${isHovered && shadow ? 'shadow-violet-500/20 dark:shadow-violet-500/10' : ''}
        ${className}
      `}
      style={{
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>

      {/* Glare effect */}
      {glare && isHovered && (
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Animated border gradient */}
      {border && isHovered && (
        <div
          className="absolute inset-0 z-0 rounded-2xl opacity-50"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(244,114,182,0.3), rgba(34,211,238,0.3))',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 3s ease infinite',
          }}
        />
      )}

      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default ParallaxCard;
