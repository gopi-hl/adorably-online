import React, { useState, useEffect, useCallback, useRef } from 'react';

interface MagneticCursorProps {
  children: React.ReactNode;
  className?: string;
  cursorSize?: number;
  cursorColor?: string;
  magnetStrength?: number;
  trailEffect?: boolean;
  trailLength?: number;
  blend?: boolean;
}

export const MagneticCursor: React.FC<MagneticCursorProps> = ({
  children,
  className = '',
  cursorSize = 20,
  cursorColor = 'rgba(139, 92, 246, 0.5)',
  magnetStrength = 0.3,
  trailEffect = true,
  trailLength = 5,
  blend = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setCursorPos({ x, y });

      if (trailEffect) {
        trailIdRef.current += 1;
        setTrail((prev) => [
          ...prev.slice(-(trailLength - 1)),
          { x, y, id: trailIdRef.current },
        ]);
      }

      // Check for magnetic elements
      const target = e.target as HTMLElement;
      const magneticElement = target.closest('[data-magnetic]');
      if (magneticElement) {
        setIsMagnetic(true);
        const elemRect = magneticElement.getBoundingClientRect();
        const elemCenterX = elemRect.left + elemRect.width / 2 - rect.left;
        const elemCenterY = elemRect.top + elemRect.height / 2 - rect.top;

        const deltaX = (elemCenterX - x) * magnetStrength;
        const deltaY = (elemCenterY - y) * magnetStrength;

        setCursorPos({ x: x + deltaX, y: y + deltaY });
      } else {
        setIsMagnetic(false);
      }
    },
    [magnetStrength, trailEffect, trailLength]
  );

  const handleMouseEnter = useCallback(() => setIsInside(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsInside(false);
    setTrail([]);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ cursor: isInside ? 'none' : 'auto' }}
    >
      {children}

      {/* Trail effect */}
      {trailEffect &&
        isInside &&
        trail.map((point, index) => (
          <div
            key={point.id}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: cursorSize * (0.3 + (index / trailLength) * 0.7),
              height: cursorSize * (0.3 + (index / trailLength) * 0.7),
              backgroundColor: cursorColor,
              opacity: 0.2 + (index / trailLength) * 0.3,
              transform: 'translate(-50%, -50%)',
              transition: 'width 0.1s, height 0.1s',
              mixBlendMode: blend ? 'difference' : 'normal',
            }}
          />
        ))}

      {/* Main cursor */}
      {isInside && (
        <div
          className="absolute pointer-events-none rounded-full transition-transform duration-100"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            width: isMagnetic ? cursorSize * 1.5 : cursorSize,
            height: isMagnetic ? cursorSize * 1.5 : cursorSize,
            backgroundColor: cursorColor,
            transform: 'translate(-50%, -50%)',
            mixBlendMode: blend ? 'difference' : 'normal',
          }}
        />
      )}
    </div>
  );
};

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
}

export const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  className = '',
}) => {
  return (
    <div data-magnetic className={className}>
      {children}
    </div>
  );
};

export default MagneticCursor;
