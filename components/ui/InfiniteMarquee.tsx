'use client';

import React, { useRef, useEffect, useState } from 'react';

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  gap?: number;
  vertical?: boolean;
}

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  children,
  className = '',
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  gap = 40,
  vertical = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const content = containerRef.current.querySelector('.marquee-content');
      if (content) {
        setContentWidth(vertical ? content.scrollHeight : content.scrollWidth);
      }
    }
  }, [children, vertical]);

  const duration = contentWidth / speed;
  const animationDirection = direction === 'left' || direction === 'right' ? direction : 'left';

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        ref={containerRef}
        className={`flex ${vertical ? 'flex-col' : 'flex-row'}`}
        style={{
          animation: `marquee-${vertical ? 'vertical' : 'horizontal'}-${animationDirection} ${duration}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {/* Original content */}
        <div
          className={`marquee-content flex ${vertical ? 'flex-col' : 'flex-row'} shrink-0`}
          style={{ gap }}
        >
          {children}
        </div>

        {/* Duplicate for seamless loop */}
        <div
          className={`flex ${vertical ? 'flex-col' : 'flex-row'} shrink-0`}
          style={{ gap, [vertical ? 'marginTop' : 'marginLeft']: gap }}
          aria-hidden
        >
          {children}
        </div>
      </div>

      <style>{`
        @keyframes marquee-horizontal-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marquee-horizontal-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        @keyframes marquee-vertical-left {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        @keyframes marquee-vertical-right {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

interface MarqueeItemProps {
  children: React.ReactNode;
  className?: string;
}

export const MarqueeItem: React.FC<MarqueeItemProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`shrink-0 ${className}`}>
      {children}
    </div>
  );
};

export default InfiniteMarquee;
