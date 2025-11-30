import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  className?: string;
  animated?: boolean;
  count?: number;
  gap?: number;
}

interface SkeletonCardProps {
  className?: string;
  showAvatar?: boolean;
  lines?: number;
  showImage?: boolean;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  animated = true,
  count = 1,
  gap = 8,
}) => {
  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  const getWidth = () => {
    if (width) return typeof width === 'number' ? `${width}px` : width;
    if (variant === 'circular') return height ? (typeof height === 'number' ? `${height}px` : height) : '48px';
    return '100%';
  };

  const getHeight = () => {
    if (height) return typeof height === 'number' ? `${height}px` : height;
    if (variant === 'text') return '16px';
    if (variant === 'circular') return width ? (typeof width === 'number' ? `${width}px` : width) : '48px';
    return '100px';
  };

  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`flex flex-col`} style={{ gap: `${gap}px` }}>
      {items.map((_, index) => (
        <div
          key={index}
          className={`
            bg-slate-200 dark:bg-slate-800
            ${variantStyles[variant]}
            ${animated ? 'animate-shimmer' : ''}
            ${className}
          `}
          style={{
            width: variant === 'text' && count > 1 && index === count - 1 ? '75%' : getWidth(),
            height: getHeight(),
            backgroundImage: animated
              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
              : 'none',
            backgroundSize: '200% 100%',
            animation: animated ? 'shimmer 1.5s infinite' : 'none',
          }}
        />
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-image: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.1) 50%,
            rgba(255,255,255,0) 100%
          );
          background-size: 200% 100%;
        }
      `}</style>
    </div>
  );
};

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = '',
  showAvatar = true,
  lines = 3,
  showImage = true,
}) => {
  return (
    <div
      className={`
        p-4 rounded-xl border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900
        ${className}
      `}
    >
      {showImage && (
        <SkeletonLoader variant="rounded" height={160} className="mb-4" />
      )}

      <div className="flex items-center gap-3 mb-4">
        {showAvatar && (
          <SkeletonLoader variant="circular" width={40} height={40} />
        )}
        <div className="flex-1">
          <SkeletonLoader variant="text" width="60%" className="mb-2" />
          <SkeletonLoader variant="text" width="40%" height={12} />
        </div>
      </div>

      <SkeletonLoader variant="text" count={lines} gap={8} />
    </div>
  );
};

export default SkeletonLoader;
