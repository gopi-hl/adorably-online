'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface NumberCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  easing?: 'linear' | 'easeOut' | 'easeIn' | 'easeInOut';
  triggerOnView?: boolean;
  onComplete?: () => void;
}

export const NumberCounter: React.FC<NumberCounterProps> = ({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  easing = 'easeOut',
  triggerOnView = true,
  onComplete,
}) => {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeIn: (t: number) => t * t * t,
    easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  };

  const formatNumber = useCallback(
    (num: number): string => {
      const fixed = num.toFixed(decimals);
      if (separator) {
        const parts = fixed.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return parts.join('.');
      }
      return fixed;
    },
    [decimals, separator]
  );

  const animate = useCallback(() => {
    const startTime = performance.now();
    const easingFn = easingFunctions[easing];

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);
      const currentValue = start + (end - start) * easedProgress;

      setCount(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setCount(end);
        onComplete?.();
      }
    };

    animationRef.current = requestAnimationFrame(step);
  }, [start, end, duration, easing, onComplete]);

  useEffect(() => {
    if (!triggerOnView) {
      const timer = setTimeout(() => {
        setHasStarted(true);
        animate();
      }, delay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setTimeout(() => {
            setHasStarted(true);
            animate();
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [triggerOnView, delay, hasStarted, animate]);

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

export default NumberCounter;
