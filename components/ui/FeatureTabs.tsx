'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface FeatureTabsProps {
  tabs: Tab[];
  className?: string;
  variant?: 'pills' | 'underline' | 'cards';
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export const FeatureTabs: React.FC<FeatureTabsProps> = ({
  tabs,
  className = '',
  variant = 'pills',
  defaultTab,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  const renderPillsTabs = () => (
    <div className="inline-flex p-1 rounded-2xl dark:bg-slate-800/50 bg-slate-100 backdrop-blur-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className="relative px-6 py-3 rounded-xl text-sm font-medium transition-colors"
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white dark:bg-slate-700 rounded-xl shadow-lg"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'dark:text-white text-slate-900'
                : 'dark:text-slate-400 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );

  const renderUnderlineTabs = () => (
    <div className="relative border-b dark:border-slate-700 border-slate-200">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`relative pb-4 px-1 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'dark:text-white text-slate-900'
                : 'dark:text-slate-400 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-pink-500"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderCardsTabs = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {tabs.map((tab, index) => (
        <motion.button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className={`relative p-6 rounded-2xl text-left transition-all ${
            activeTab === tab.id
              ? 'dark:bg-gradient-to-br dark:from-violet-500/20 dark:to-pink-500/20 bg-gradient-to-br from-violet-50 to-pink-50 border-2 border-violet-500'
              : 'dark:bg-slate-800/50 bg-white border-2 dark:border-slate-700 border-slate-200 hover:border-violet-300 dark:hover:border-violet-500/50'
          }`}
        >
          {tab.icon && (
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                activeTab === tab.id
                  ? 'bg-violet-500 text-white'
                  : 'dark:bg-slate-700 bg-slate-100 dark:text-slate-300 text-slate-600'
              }`}
            >
              {tab.icon}
            </div>
          )}
          <span
            className={`font-semibold ${
              activeTab === tab.id
                ? 'dark:text-white text-violet-700'
                : 'dark:text-slate-300 text-slate-700'
            }`}
          >
            {tab.label}
          </span>
        </motion.button>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className={className}>
      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className={`${variant === 'cards' ? '' : 'flex justify-center mb-8'}`}
      >
        {variant === 'pills' && renderPillsTabs()}
        {variant === 'underline' && renderUnderlineTabs()}
        {variant === 'cards' && renderCardsTabs()}
      </motion.div>

      {/* Tab Content */}
      <div className={variant === 'cards' ? 'mt-8' : ''}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{
              duration: 0.3,
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeatureTabs;
