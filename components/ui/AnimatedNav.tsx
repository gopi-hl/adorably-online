'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  children?: NavItem[];
  icon?: React.ReactNode;
  badge?: string;
}

interface AnimatedNavProps {
  logo?: React.ReactNode;
  items: NavItem[];
  cta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
  variant?: 'default' | 'floating' | 'minimal' | 'centered';
  transparent?: boolean;
  hideOnScroll?: boolean;
}

export const AnimatedNav: React.FC<AnimatedNavProps> = ({
  logo,
  items,
  cta,
  className = '',
  variant = 'default',
  transparent = false,
  hideOnScroll = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      if (hideOnScroll) {
        setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
      }

      setIsScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, [hideOnScroll]);

  const navBackground = transparent && !isScrolled
    ? 'bg-transparent'
    : 'dark:bg-slate-900/80 bg-white/80 backdrop-blur-xl border-b dark:border-white/10 border-slate-200';

  const renderDropdown = (item: NavItem) => (
    <div className="relative group">
      <button
        onMouseEnter={() => setActiveDropdown(item.label)}
        onMouseLeave={() => setActiveDropdown(null)}
        className="flex items-center gap-1 px-4 py-2 dark:text-slate-300 text-slate-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
      >
        {item.label}
        <ChevronDown
          size={16}
          className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {activeDropdown === item.label && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setActiveDropdown(item.label)}
            onMouseLeave={() => setActiveDropdown(null)}
            className="absolute top-full left-0 pt-2 w-56"
          >
            <div className="p-2 rounded-xl dark:bg-slate-800 bg-white shadow-xl border dark:border-white/10 border-slate-200">
              {item.children.map((child, index) => (
                <motion.a
                  key={child.label}
                  href={child.href || '#'}
                  onClick={child.onClick}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg dark:text-slate-300 text-slate-600 hover:bg-violet-500/10 hover:text-violet-500 transition-colors"
                >
                  {child.icon && <span className="text-violet-500">{child.icon}</span>}
                  <div>
                    <div className="font-medium">{child.label}</div>
                  </div>
                  {child.badge && (
                    <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-violet-500 text-white">
                      {child.badge}
                    </span>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderDefaultVariant = () => (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 ${navBackground} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0"
          >
            {logo || <span className="text-xl font-bold dark:text-white text-slate-900">Logo</span>}
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) =>
              item.children ? (
                renderDropdown(item)
              ) : (
                <motion.a
                  key={item.label}
                  href={item.href || '#'}
                  onClick={item.onClick}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 dark:text-slate-300 text-slate-600 hover:text-violet-500 dark:hover:text-violet-400 transition-colors font-medium"
                >
                  {item.label}
                </motion.a>
              )
            )}
          </div>

          {/* CTA */}
          {cta && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={cta.onClick}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
            >
              {cta.label}
              <ArrowRight size={16} />
            </motion.button>
          )}

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg dark:text-white text-slate-900"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden dark:bg-slate-900 bg-white border-t dark:border-white/10 border-slate-200"
          >
            <div className="px-6 py-4 space-y-2">
              {items.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href || '#'}
                  onClick={item.onClick}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block px-4 py-3 rounded-lg dark:text-slate-300 text-slate-600 hover:bg-violet-500/10 hover:text-violet-500 transition-colors font-medium"
                >
                  {item.label}
                </motion.a>
              ))}
              {cta && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: items.length * 0.1 }}
                  onClick={cta.onClick}
                  className="w-full mt-4 px-5 py-3 rounded-xl bg-violet-500 text-white font-medium"
                >
                  {cta.label}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );

  const renderFloatingVariant = () => (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 20 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 w-auto max-w-4xl ${className}`}
    >
      <div className="px-2 py-2 rounded-2xl dark:bg-slate-900/90 bg-white/90 backdrop-blur-xl border dark:border-white/10 border-slate-200 shadow-2xl">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="px-4">
            {logo || <span className="text-lg font-bold dark:text-white text-slate-900">Logo</span>}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            {items.map((item) => (
              <motion.a
                key={item.label}
                href={item.href || '#'}
                onClick={item.onClick}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 dark:text-slate-300 text-slate-600 hover:text-violet-500 transition-colors font-medium text-sm"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          {cta && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={cta.onClick}
              className="px-5 py-2 rounded-xl bg-violet-500 text-white font-medium text-sm hover:bg-violet-600 transition-colors"
            >
              {cta.label}
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );

  const renderMinimalVariant = () => (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 ${navBackground} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {logo || <span className="text-lg font-bold dark:text-white text-slate-900">Logo</span>}

          <div className="hidden md:flex items-center gap-6">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href || '#'}
                onClick={item.onClick}
                className="dark:text-slate-400 text-slate-500 hover:text-violet-500 transition-colors text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>

          {cta && (
            <button
              onClick={cta.onClick}
              className="text-sm font-medium text-violet-500 hover:text-violet-600"
            >
              {cta.label} →
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );

  const renderCenteredVariant = () => (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      className={`fixed top-0 left-0 right-0 z-50 ${navBackground} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center py-4">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            {logo || <span className="text-2xl font-bold dark:text-white text-slate-900">Logo</span>}
          </motion.div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href || '#'}
                onClick={item.onClick}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="dark:text-slate-300 text-slate-600 hover:text-violet-500 transition-colors font-medium"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );

  switch (variant) {
    case 'floating':
      return renderFloatingVariant();
    case 'minimal':
      return renderMinimalVariant();
    case 'centered':
      return renderCenteredVariant();
    default:
      return renderDefaultVariant();
  }
};

export default AnimatedNav;
