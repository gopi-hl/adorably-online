'use client';

import React, { useState, useEffect, useRef } from 'react';

interface RadialProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: 'violet' | 'cyan' | 'emerald' | 'pink' | 'gradient';
  backgroundColor?: string;
  showValue?: boolean;
  valueFormatter?: (value: number, max: number) => string;
  animated?: boolean;
  duration?: number;
  triggerOnView?: boolean;
  children?: React.ReactNode;
}

export const RadialProgress: React.FC<RadialProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className = '',
  color = 'violet',
  backgroundColor = 'rgba(255,255,255,0.1)',
  showValue = true,
  valueFormatter,
  animated = true,
  duration = 1500,
  triggerOnView = true,
  children,
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(animatedValue / max, 0), 1);
  const strokeDashoffset = circumference * (1 - percentage);

  const colorStyles = {
    violet: 'stroke-violet-500',
    cyan: 'stroke-cyan-500',
    emerald: 'stroke-emerald-500',
    pink: 'stroke-pink-500',
    gradient: '',
  };

  const gradientId = `radial-gradient-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (!animated) {
      setAnimatedValue(value);
      return;
    }

    const startAnimation = () => {
      if (hasStarted) return;
      setHasStarted(true);

      const startTime = performance.now();
      const startValue = 0;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = startValue + (value - startValue) * eased;

        setAnimatedValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    if (!triggerOnView) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [value, animated, duration, triggerOnView, hasStarted]);

  const displayValue = valueFormatter
    ? valueFormatter(animatedValue, max)
    : `${Math.round(animatedValue)}%`;

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {color === 'gradient' && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        )}

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={color !== 'gradient' ? colorStyles[color] : ''}
          stroke={color === 'gradient' ? `url(#${gradientId})` : undefined}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: animated ? 'none' : 'stroke-dashoffset 0.3s ease',
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showValue && (
          <span className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            {displayValue}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RadialProgress;
