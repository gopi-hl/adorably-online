import React, { useRef, useState, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magnetStrength?: number;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'gradient';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  magnetStrength = 0.4,
  onClick,
  disabled = false,
  variant = 'default',
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || disabled) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = (e.clientX - centerX) * magnetStrength;
      const distY = (e.clientY - centerY) * magnetStrength;

      setPosition({ x: distX, y: distY });
    },
    [magnetStrength, disabled]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const variantStyles = {
    default:
      'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/25',
    outline:
      'border-2 border-violet-500 text-violet-500 hover:bg-violet-500/10 dark:border-violet-400 dark:text-violet-400',
    ghost:
      'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10',
    gradient:
      'bg-[linear-gradient(135deg,#667eea_0%,#764ba2_50%,#f093fb_100%)] text-white bg-[length:200%_200%] hover:bg-[position:100%_100%]',
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`
        relative px-6 py-3 rounded-xl font-medium
        transition-all duration-300 ease-out
        ${variantStyles[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isHovered ? 'scale-105' : 'scale-100'}
        ${className}
      `}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.05 : 1})`,
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {isHovered && variant === 'default' && (
        <span className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />
      )}
    </button>
  );
};

export default MagneticButton;
