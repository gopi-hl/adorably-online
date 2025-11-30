import React, { useRef, useState, useCallback } from 'react';

interface HoverTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  glareOpacity?: number;
  reset?: boolean;
  disabled?: boolean;
}

export const HoverTilt: React.FC<HoverTiltProps> = ({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
  glare = true,
  glareOpacity = 0.2,
  reset = true,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || disabled) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (-mouseY / (rect.height / 2)) * maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;

      setTransform({
        rotateX,
        rotateY,
        scale,
      });
      setGlarePosition({ x: glareX, y: glareY });
    },
    [maxTilt, scale, disabled]
  );

  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      setIsHovered(true);
      setTransform((prev) => ({ ...prev, scale }));
    }
  }, [scale, disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (reset) {
      setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
    }
  }, [reset]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="relative w-full h-full transition-transform"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
          transition: isHovered ? 'none' : `transform ${speed}ms ease-out`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Content */}
        <div style={{ transform: 'translateZ(0)' }}>
          {children}
        </div>

        {/* Glare effect */}
        {glare && isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
            style={{ transform: 'translateZ(1px)' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HoverTilt;
