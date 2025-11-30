import React from 'react';

interface ShimmerCardProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  backgroundColor?: string;
  borderRadius?: string;
  shimmerSpeed?: 'slow' | 'medium' | 'fast';
  shimmerWidth?: number;
  hover?: boolean;
  continuous?: boolean;
}

export const ShimmerCard: React.FC<ShimmerCardProps> = ({
  children,
  className = '',
  shimmerColor = 'rgba(255,255,255,0.1)',
  backgroundColor,
  borderRadius = '1rem',
  shimmerSpeed = 'medium',
  shimmerWidth = 200,
  hover = false,
  continuous = true,
}) => {
  const speedDuration = {
    slow: '3s',
    medium: '2s',
    fast: '1s',
  };

  return (
    <div
      className={`
        relative overflow-hidden
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        ${hover ? 'shimmer-hover' : continuous ? 'shimmer-continuous' : ''}
        ${className}
      `}
      style={{
        borderRadius,
        backgroundColor,
      }}
    >
      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Shimmer overlay */}
      <div
        className={`
          absolute inset-0 z-0
          ${hover ? 'shimmer-hover-effect' : continuous ? 'shimmer-effect' : ''}
        `}
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            ${shimmerColor},
            transparent
          )`,
          width: shimmerWidth,
        }}
      />

      <style>{`
        .shimmer-continuous .shimmer-effect,
        .shimmer-hover:hover .shimmer-hover-effect {
          animation: shimmer-slide ${speedDuration[shimmerSpeed]} ease-in-out infinite;
        }

        @keyframes shimmer-slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(calc(100% + ${shimmerWidth}px));
          }
        }
      `}</style>
    </div>
  );
};

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  className = '',
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        px-6 py-3 rounded-xl
        bg-slate-900 dark:bg-slate-800
        text-white font-medium
        transition-all duration-300
        hover:shadow-lg hover:shadow-violet-500/20
        disabled:opacity-50 disabled:cursor-not-allowed
        group
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Shimmer effect */}
      <div
        className="
          absolute inset-0 -translate-x-full
          bg-gradient-to-r from-transparent via-white/10 to-transparent
          group-hover:animate-shimmer-button
        "
      />

      <style>{`
        @keyframes shimmer-button {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .group-hover\\:animate-shimmer-button:hover,
        .group:hover .group-hover\\:animate-shimmer-button {
          animation: shimmer-button 0.8s ease-in-out;
        }
      `}</style>
    </button>
  );
};

export default ShimmerCard;
