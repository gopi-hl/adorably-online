import React from 'react';

interface SwitchToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'glow';
  disabled?: boolean;
  label?: string;
  labelPosition?: 'left' | 'right';
  icon?: { on?: React.ReactNode; off?: React.ReactNode };
}

export const SwitchToggle: React.FC<SwitchToggleProps> = ({
  checked,
  onChange,
  className = '',
  size = 'md',
  variant = 'default',
  disabled = false,
  label,
  labelPosition = 'right',
  icon,
}) => {
  const sizeStyles = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4',
      icon: 'text-[8px]',
    },
    md: {
      track: 'w-12 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-6',
      icon: 'text-xs',
    },
    lg: {
      track: 'w-16 h-8',
      thumb: 'w-7 h-7',
      translate: 'translate-x-8',
      icon: 'text-sm',
    },
  };

  const variantStyles = {
    default: {
      track: checked
        ? 'bg-violet-600'
        : 'bg-slate-300 dark:bg-slate-700',
      thumb: 'bg-white',
    },
    gradient: {
      track: checked
        ? 'bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500'
        : 'bg-slate-300 dark:bg-slate-700',
      thumb: 'bg-white',
    },
    glow: {
      track: checked
        ? 'bg-violet-600 shadow-lg shadow-violet-500/50'
        : 'bg-slate-300 dark:bg-slate-700',
      thumb: checked
        ? 'bg-white shadow-md shadow-violet-300'
        : 'bg-white',
    },
  };

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const switchElement = (
    <div
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        relative inline-flex items-center rounded-full
        transition-all duration-300 ease-in-out
        ${sizeStyles[size].track}
        ${variantStyles[variant].track}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2
      `}
    >
      {/* Track icons */}
      {icon && (
        <>
          <span
            className={`
              absolute left-1 flex items-center justify-center
              ${sizeStyles[size].icon}
              transition-opacity duration-200
              ${checked ? 'opacity-100' : 'opacity-0'}
            `}
          >
            {icon.on}
          </span>
          <span
            className={`
              absolute right-1 flex items-center justify-center
              ${sizeStyles[size].icon}
              transition-opacity duration-200
              ${checked ? 'opacity-0' : 'opacity-100'}
            `}
          >
            {icon.off}
          </span>
        </>
      )}

      {/* Thumb */}
      <span
        className={`
          absolute rounded-full transform transition-all duration-300 ease-in-out
          ${sizeStyles[size].thumb}
          ${variantStyles[variant].thumb}
          ${checked ? sizeStyles[size].translate : 'translate-x-0.5'}
        `}
      />
    </div>
  );

  if (label) {
    return (
      <label
        className={`
          inline-flex items-center gap-3
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
      >
        {labelPosition === 'left' && (
          <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
        )}
        {switchElement}
        {labelPosition === 'right' && (
          <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
        )}
      </label>
    );
  }

  return <div className={className}>{switchElement}</div>;
};

export default SwitchToggle;
