'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus, ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
  category?: string;
}

interface AnimatedFAQProps {
  items: FAQItem[];
  className?: string;
  variant?: 'accordion' | 'cards' | 'minimal' | 'chat';
  allowMultiple?: boolean;
}

// === VARIANT 1: Classic Accordion ===
const AccordionVariant: React.FC<{ items: FAQItem[]; allowMultiple: boolean }> = ({
  items,
  allowMultiple,
}) => {
  const [openItems, setOpenItems] = useState<(string | number)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const toggleItem = (id: string | number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div ref={containerRef} className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden"
          >
            <div
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? 'dark:bg-slate-800/50 bg-white dark:border-violet-500/30 border-violet-200 shadow-lg'
                  : 'dark:bg-slate-900/50 bg-slate-50 dark:border-white/10 border-slate-200'
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
              >
                <span
                  className={`font-semibold transition-colors ${
                    isOpen ? 'dark:text-white text-violet-700' : 'dark:text-slate-200 text-slate-700'
                  }`}
                >
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isOpen
                      ? 'bg-violet-500 text-white'
                      : 'dark:bg-slate-700 bg-slate-200 dark:text-slate-400 text-slate-500'
                  }`}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="px-6 pb-5 pt-0">
                      <p className="dark:text-slate-400 text-slate-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// === VARIANT 2: Cards Grid ===
const CardsVariant: React.FC<{ items: FAQItem[] }> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<string | number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div ref={containerRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
            whileHover={{ y: -5 }}
            className="text-left p-6 rounded-2xl dark:bg-slate-900/50 bg-white border dark:border-white/10 border-slate-200 hover:border-violet-500/50 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                <HelpCircle size={18} className="text-violet-500" />
              </div>
              <div>
                <h4 className="font-semibold dark:text-white text-slate-900 mb-2 group-hover:text-violet-500 transition-colors">
                  {item.question}
                </h4>
                <p className="text-sm dark:text-slate-400 text-slate-500 line-clamp-2">
                  {item.answer}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-8 rounded-3xl dark:bg-slate-900 bg-white shadow-2xl z-50"
            >
              {(() => {
                const item = items.find((i) => i.id === selectedItem);
                if (!item) return null;
                return (
                  <>
                    <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-4">
                      {item.question}
                    </h3>
                    <p className="dark:text-slate-400 text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="mt-6 px-6 py-3 rounded-xl bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
                    >
                      Got it!
                    </button>
                  </>
                );
              })()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// === VARIANT 3: Minimal ===
const MinimalVariant: React.FC<{ items: FAQItem[]; allowMultiple: boolean }> = ({
  items,
  allowMultiple,
}) => {
  const [openItems, setOpenItems] = useState<(string | number)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const toggleItem = (id: string | number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div ref={containerRef} className="divide-y dark:divide-slate-800 divide-slate-200">
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full py-6 flex items-center justify-between gap-4 text-left"
            >
              <span className="font-medium dark:text-white text-slate-900">
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus size={20} className="dark:text-slate-400 text-slate-500" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 dark:text-slate-400 text-slate-600 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

// === VARIANT 4: Chat Style ===
const ChatVariant: React.FC<{ items: FAQItem[] }> = ({ items }) => {
  const [visibleItems, setVisibleItems] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const showNext = () => {
    if (visibleItems < items.length) {
      setVisibleItems((prev) => prev + 1);
    }
  };

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto space-y-4">
      {items.slice(0, visibleItems).map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Question (User) */}
          <div className="flex justify-end mb-3">
            <div className="max-w-[80%] px-5 py-3 rounded-2xl rounded-br-none bg-violet-500 text-white">
              {item.question}
            </div>
          </div>

          {/* Answer (Bot) */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={14} className="text-white" />
            </div>
            <div className="max-w-[80%] px-5 py-3 rounded-2xl rounded-bl-none dark:bg-slate-800 bg-slate-100">
              <p className="dark:text-slate-300 text-slate-700">{item.answer}</p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Show More */}
      {visibleItems < items.length && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={showNext}
          className="w-full py-4 text-center text-violet-500 font-medium hover:text-violet-400 transition-colors"
        >
          Show next question...
        </motion.button>
      )}
    </div>
  );
};

// === Main Component ===
export const AnimatedFAQ: React.FC<AnimatedFAQProps> = ({
  items,
  className = '',
  variant = 'accordion',
  allowMultiple = false,
}) => {
  return (
    <div className={className}>
      {variant === 'accordion' && <AccordionVariant items={items} allowMultiple={allowMultiple} />}
      {variant === 'cards' && <CardsVariant items={items} />}
      {variant === 'minimal' && <MinimalVariant items={items} allowMultiple={allowMultiple} />}
      {variant === 'chat' && <ChatVariant items={items} />}
    </div>
  );
};

export default AnimatedFAQ;
