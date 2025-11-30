'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TooltipWrapperProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  animated?: boolean;
  variant?: 'default' | 'dark' | 'light' | 'gradient';
  arrow?: boolean;
  maxWidth?: number;
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  content,
  className = '',
  position = 'top',
  delay = 200,
  animated = true,
  variant = 'default',
  arrow = true,
  maxWidth = 250,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const variantStyles = {
    default: 'bg-slate-900 text-white dark:bg-slate-700',
    dark: 'bg-black text-white',
    light: 'bg-white text-slate-900 shadow-lg border border-slate-200',
    gradient: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white',
  };

  const arrowStyles = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-current border-x-transparent border-b-transparent',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-current border-x-transparent border-t-transparent',
    left: 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-current border-y-transparent border-r-transparent',
    right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-current border-y-transparent border-l-transparent',
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 px-3 py-2 text-sm rounded-lg whitespace-nowrap
            ${positionStyles[position]}
            ${variantStyles[variant]}
            ${animated ? 'animate-tooltip-enter' : ''}
          `}
          style={{ maxWidth }}
          role="tooltip"
        >
          <span className="relative z-10">{content}</span>

          {arrow && (
            <span
              className={`
                absolute w-0 h-0
                border-4
                ${arrowStyles[position]}
              `}
              style={{
                borderColor: variant === 'gradient'
                  ? 'transparent transparent transparent transparent'
                  : undefined,
              }}
            />
          )}
        </div>
      )}

      <style>{`
        @keyframes tooltip-enter {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(${position === 'top' ? '8px' : position === 'bottom' ? '-8px' : '0'}) translateX(${position === 'left' ? '8px' : position === 'right' ? '-8px' : '0'});
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) translateX(0);
          }
        }
        .animate-tooltip-enter {
          animation: tooltip-enter 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TooltipWrapper;
