import React, { useMemo } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'intense';
  color?: 'cyan-red' | 'purple-green' | 'custom';
  customColors?: { primary: string; secondary: string };
  hover?: boolean;
  continuous?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  className = '',
  intensity = 'medium',
  color = 'cyan-red',
  customColors,
  hover = false,
  continuous = true,
  as: Component = 'span',
}) => {
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), []);

  const intensityConfig = {
    subtle: { offset: 2, duration: 4 },
    medium: { offset: 4, duration: 2.5 },
    intense: { offset: 8, duration: 1.5 },
  };

  const colorConfig = {
    'cyan-red': { primary: '#00ffff', secondary: '#ff0040' },
    'purple-green': { primary: '#b400ff', secondary: '#00ff00' },
    custom: customColors || { primary: '#00ffff', secondary: '#ff0040' },
  };

  const config = intensityConfig[intensity];
  const colors = colorConfig[color];

  return (
    <>
      <Component
        className={`
          relative inline-block
          ${hover ? 'glitch-hover' : continuous ? 'glitch-continuous' : ''}
          ${className}
        `}
        data-text={children}
      >
        {children}
      </Component>

      <style>{`
        .glitch-continuous,
        .glitch-hover:hover {
          animation: glitch-${uniqueId} ${config.duration}s infinite;
        }

        .glitch-continuous::before,
        .glitch-continuous::after,
        .glitch-hover:hover::before,
        .glitch-hover:hover::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }

        .glitch-continuous::before,
        .glitch-hover:hover::before {
          color: ${colors.primary};
          animation: glitch-before-${uniqueId} ${config.duration}s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }

        .glitch-continuous::after,
        .glitch-hover:hover::after {
          color: ${colors.secondary};
          animation: glitch-after-${uniqueId} ${config.duration}s infinite;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        }

        @keyframes glitch-${uniqueId} {
          0%, 90%, 100% {
            transform: translate(0);
          }
          92% {
            transform: translate(${config.offset / 2}px, 0);
          }
          94% {
            transform: translate(-${config.offset / 2}px, 0);
          }
          96% {
            transform: translate(${config.offset / 4}px, 0);
          }
          98% {
            transform: translate(-${config.offset / 4}px, 0);
          }
        }

        @keyframes glitch-before-${uniqueId} {
          0%, 90%, 100% {
            transform: translate(0);
          }
          91% {
            transform: translate(-${config.offset}px, 0);
          }
          93% {
            transform: translate(${config.offset}px, 0);
          }
          95% {
            transform: translate(-${config.offset / 2}px, 0);
          }
          97% {
            transform: translate(${config.offset / 2}px, 0);
          }
          99% {
            transform: translate(-${config.offset / 4}px, 0);
          }
        }

        @keyframes glitch-after-${uniqueId} {
          0%, 90%, 100% {
            transform: translate(0);
          }
          91% {
            transform: translate(${config.offset}px, 0);
          }
          93% {
            transform: translate(-${config.offset}px, 0);
          }
          95% {
            transform: translate(${config.offset / 2}px, 0);
          }
          97% {
            transform: translate(-${config.offset / 2}px, 0);
          }
          99% {
            transform: translate(${config.offset / 4}px, 0);
          }
        }
      `}</style>
    </>
  );
};

export default GlitchText;
