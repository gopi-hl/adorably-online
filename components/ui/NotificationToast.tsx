'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationToastProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  className?: string;
}

const getIcon = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="text-emerald-500" size={20} />;
    case 'error':
      return <AlertCircle className="text-red-500" size={20} />;
    case 'warning':
      return <AlertTriangle className="text-amber-500" size={20} />;
    case 'info':
      return <Info className="text-blue-500" size={20} />;
  }
};

const getTypeStyles = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'border-l-4 border-l-emerald-500';
    case 'error':
      return 'border-l-4 border-l-red-500';
    case 'warning':
      return 'border-l-4 border-l-amber-500';
    case 'info':
      return 'border-l-4 border-l-blue-500';
  }
};

const positionStyles = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const NotificationToast: React.FC<NotificationToastProps> = ({
  toasts,
  onDismiss,
  position = 'top-right',
  className = '',
}) => {
  return (
    <div className={`fixed z-50 ${positionStyles[position]} ${className}`}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={onDismiss}
            index={index}
            position={position}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
  index: number;
  position: NotificationToastProps['position'];
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss, index, position }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast.duration) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / toast.duration!) * 100);
      setProgress(remaining);

      if (remaining === 0) {
        onDismiss(toast.id);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [toast.duration, toast.id, onDismiss]);

  const isRight = position?.includes('right');
  const isBottom = position?.includes('bottom');

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        x: isRight ? 100 : position?.includes('left') ? -100 : 0,
        y: isBottom ? 100 : -100,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: isRight ? 100 : position?.includes('left') ? -100 : 0,
        scale: 0.8,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 40,
      }}
      className={`relative mb-3 w-80 overflow-hidden rounded-xl dark:bg-slate-800 bg-white shadow-xl border dark:border-slate-700 border-slate-200 ${getTypeStyles(toast.type)}`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
          >
            {getIcon(toast.type)}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold dark:text-white text-slate-900">{toast.title}</p>
            {toast.message && (
              <p className="text-sm dark:text-slate-400 text-slate-500 mt-0.5">
                {toast.message}
              </p>
            )}
            {toast.action && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toast.action.onClick}
                className="mt-2 text-sm font-medium text-violet-500 hover:text-violet-600"
              >
                {toast.action.label}
              </motion.button>
            )}
          </div>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDismiss(toast.id)}
            className="flex-shrink-0 p-1 rounded-lg dark:hover:bg-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={16} className="dark:text-slate-400 text-slate-500" />
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      {toast.duration && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500"
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      )}
    </motion.div>
  );
};

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (title: string, message?: string, duration = 5000) =>
    addToast({ type: 'success', title, message, duration });

  const error = (title: string, message?: string, duration = 5000) =>
    addToast({ type: 'error', title, message, duration });

  const warning = (title: string, message?: string, duration = 5000) =>
    addToast({ type: 'warning', title, message, duration });

  const info = (title: string, message?: string, duration = 5000) =>
    addToast({ type: 'info', title, message, duration });

  return {
    toasts,
    addToast,
    dismissToast,
    success,
    error,
    warning,
    info,
  };
};

export default NotificationToast;
