'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, PanInfo } from 'framer-motion';

interface ElasticSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
  variant?: 'default' | 'gradient' | 'glow' | 'stepped';
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

export const ElasticSlider: React.FC<ElasticSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  value: controlledValue,
  onChange,
  className = '',
  variant = 'default',
  label,
  showValue = true,
  formatValue = (v) => v.toString(),
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 30 });

  const calculateValue = (clientX: number) => {
    if (!sliderRef.current) return value;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;

    return Math.max(min, Math.min(max, steppedValue));
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const clientX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
    const newValue = calculateValue(clientX);

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleClick = (e: React.MouseEvent) => {
    const newValue = calculateValue(e.clientX);

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  // === Default Variant ===
  const renderDefaultVariant = () => (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="text-sm font-medium dark:text-slate-300 text-slate-600">{label}</span>
          )}
          {showValue && (
            <motion.span
              key={value}
              initial={{ scale: 1.2, color: 'rgb(139, 92, 246)' }}
              animate={{ scale: 1, color: '' }}
              className="text-sm font-bold dark:text-white text-slate-900 tabular-nums"
            >
              {formatValue(value)}
            </motion.span>
          )}
        </div>
      )}

      <div
        ref={sliderRef}
        onClick={handleClick}
        className="relative h-2 dark:bg-slate-700 bg-slate-200 rounded-full cursor-pointer"
      >
        {/* Fill */}
        <motion.div
          className="absolute h-full bg-violet-500 rounded-full"
          style={{ width: `${percentage}%` }}
          layoutId="slider-fill"
        />

        {/* Thumb */}
        <motion.div
          drag="x"
          dragConstraints={sliderRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-violet-500 cursor-grab active:cursor-grabbing"
          style={{
            left: `calc(${percentage}% - 10px)`,
          }}
        >
          {/* Pulse on drag */}
          {isDragging && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute inset-0 bg-violet-500 rounded-full"
            />
          )}
        </motion.div>
      </div>
    </div>
  );

  // === Gradient Variant ===
  const renderGradientVariant = () => (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="text-sm font-medium dark:text-slate-300 text-slate-600">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-bold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent tabular-nums">
              {formatValue(value)}
            </span>
          )}
        </div>
      )}

      <div
        ref={sliderRef}
        onClick={handleClick}
        className="relative h-3 dark:bg-slate-700 bg-slate-200 rounded-full cursor-pointer overflow-hidden"
      >
        {/* Gradient Fill */}
        <motion.div
          className="absolute h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full"
          style={{ width: `${percentage}%` }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Thumb */}
        <motion.div
          drag="x"
          dragConstraints={sliderRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileHover={{ scale: 1.2 }}
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full shadow-lg cursor-grab active:cursor-grabbing"
          style={{
            left: `calc(${percentage}% - 12px)`,
            boxShadow: isDragging ? '0 0 20px rgba(139, 92, 246, 0.6)' : 'none',
          }}
        >
          <div className="absolute inset-1 bg-white rounded-full" />
        </motion.div>
      </div>
    </div>
  );

  // === Glow Variant ===
  const renderGlowVariant = () => (
    <div className="space-y-3">
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="text-sm font-medium dark:text-slate-300 text-slate-600">{label}</span>
          )}
          {showValue && (
            <motion.span
              className="text-lg font-black dark:text-white text-slate-900 tabular-nums"
              animate={{ scale: isDragging ? 1.1 : 1 }}
            >
              {formatValue(value)}
            </motion.span>
          )}
        </div>
      )}

      <div className="relative py-3">
        {/* Glow effect */}
        <motion.div
          className="absolute h-2 bg-violet-500 rounded-full blur-lg"
          style={{ width: `${percentage}%`, opacity: 0.5 }}
        />

        <div
          ref={sliderRef}
          onClick={handleClick}
          className="relative h-2 dark:bg-slate-800 bg-slate-100 rounded-full cursor-pointer"
        >
          <motion.div
            className="absolute h-full bg-violet-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />

          <motion.div
            drag="x"
            dragConstraints={sliderRef}
            dragElastic={0.1}
            dragMomentum={false}
            onDrag={handleDrag}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            animate={{
              scale: isDragging ? 1.3 : 1,
              boxShadow: isDragging
                ? '0 0 30px rgba(139, 92, 246, 0.8)'
                : '0 0 10px rgba(139, 92, 246, 0.3)',
            }}
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-violet-500 rounded-full cursor-grab active:cursor-grabbing"
            style={{
              left: `calc(${percentage}% - 10px)`,
            }}
          />
        </div>
      </div>
    </div>
  );

  // === Stepped Variant ===
  const renderSteppedVariant = () => {
    const steps = Math.floor((max - min) / step) + 1;
    const stepMarks = Array.from({ length: Math.min(steps, 11) }, (_, i) => {
      const stepValue = min + (i * (max - min)) / (Math.min(steps, 11) - 1);
      return Math.round(stepValue / step) * step;
    });

    return (
      <div className="space-y-3">
        {(label || showValue) && (
          <div className="flex justify-between items-center">
            {label && (
              <span className="text-sm font-medium dark:text-slate-300 text-slate-600">{label}</span>
            )}
            {showValue && (
              <span className="text-sm font-bold dark:text-white text-slate-900 tabular-nums">
                {formatValue(value)}
              </span>
            )}
          </div>
        )}

        <div className="relative">
          <div
            ref={sliderRef}
            onClick={handleClick}
            className="relative h-2 dark:bg-slate-700 bg-slate-200 rounded-full cursor-pointer"
          >
            <motion.div
              className="absolute h-full bg-violet-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />

            {/* Step marks */}
            <div className="absolute inset-0 flex justify-between items-center px-1">
              {stepMarks.map((mark, index) => (
                <motion.div
                  key={mark}
                  className={`w-1.5 h-1.5 rounded-full ${
                    mark <= value ? 'bg-white' : 'dark:bg-slate-500 bg-slate-400'
                  }`}
                  whileHover={{ scale: 1.5 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (controlledValue === undefined) {
                      setInternalValue(mark);
                    }
                    onChange?.(mark);
                  }}
                />
              ))}
            </div>

            <motion.div
              drag="x"
              dragConstraints={sliderRef}
              dragElastic={0}
              dragMomentum={false}
              onDrag={handleDrag}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              whileHover={{ scale: 1.2 }}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-violet-500 cursor-grab"
              style={{
                left: `calc(${percentage}% - 8px)`,
              }}
            />
          </div>

          {/* Step labels */}
          <div className="flex justify-between mt-2 text-xs dark:text-slate-500 text-slate-400">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      {variant === 'default' && renderDefaultVariant()}
      {variant === 'gradient' && renderGradientVariant()}
      {variant === 'glow' && renderGlowVariant()}
      {variant === 'stepped' && renderSteppedVariant()}
    </div>
  );
};

export default ElasticSlider;
