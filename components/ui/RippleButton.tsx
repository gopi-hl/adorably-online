import React, { useState, useCallback } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  rippleColor?: string;
  fullWidth?: boolean;
}

export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  className = '',
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  rippleColor,
  fullWidth = false,
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { x, y, id }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);

      onClick?.();
    },
    [onClick, disabled]
  );

  const variantStyles = {
    primary: 'bg-violet-600 hover:bg-violet-700 text-white',
    secondary: 'bg-slate-600 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };

  const rippleColorMap = {
    primary: 'rgba(255,255,255,0.4)',
    secondary: 'rgba(255,255,255,0.3)',
    danger: 'rgba(255,255,255,0.4)',
    success: 'rgba(255,255,255,0.4)',
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative overflow-hidden rounded-lg font-medium
        transition-all duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none animate-ripple-expand"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: rippleColor || rippleColorMap[variant],
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <style>{`
        @keyframes ripple-expand {
          0% {
            width: 0;
            height: 0;
            opacity: 0.5;
          }
          100% {
            width: 500px;
            height: 500px;
            opacity: 0;
          }
        }
        .animate-ripple-expand {
          animation: ripple-expand 0.6s ease-out forwards;
        }
      `}</style>
    </button>
  );
};

export default RippleButton;
