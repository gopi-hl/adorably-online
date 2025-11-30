'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardData {
  id: string | number;
  content: React.ReactNode;
}

interface StackedCardsProps {
  cards: CardData[];
  className?: string;
  variant?: 'stack' | 'fan' | 'tinder' | 'deck';
  visibleCards?: number;
  onCardChange?: (index: number) => void;
}

// === Stack Variant ===
const StackVariant: React.FC<{ cards: CardData[]; onCardChange?: (index: number) => void }> = ({
  cards,
  onCardChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const nextCard = () => {
    const newIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(newIndex);
    onCardChange?.(newIndex);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-80 w-72 cursor-pointer"
      onClick={nextCard}
    >
      <AnimatePresence>
        {cards.map((card, index) => {
          const offset = (index - currentIndex + cards.length) % cards.length;
          if (offset > 3) return null;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{
                opacity: 1 - offset * 0.2,
                scale: 1 - offset * 0.05,
                y: -offset * 15,
                zIndex: cards.length - offset,
              }}
              exit={{ opacity: 0, x: 300, rotate: 20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              className="absolute inset-0"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden dark:bg-slate-800 bg-white border dark:border-white/10 border-slate-200 shadow-xl">
                {card.content}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
              onCardChange?.(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-6 bg-violet-500' : 'w-2 dark:bg-slate-600 bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// === Fan Variant ===
const FanVariant: React.FC<{ cards: CardData[]; onCardChange?: (index: number) => void }> = ({
  cards,
  onCardChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div ref={containerRef} className="relative h-80 w-full flex items-center justify-center">
      {cards.map((card, index) => {
        const isSelected = index === selectedIndex;
        const offset = index - selectedIndex;
        const rotation = offset * 8;
        const translateX = offset * 80;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2,
              scale: isSelected ? 1 : 0.85,
              x: translateX,
              rotate: rotation,
              zIndex: cards.length - Math.abs(offset),
            }}
            whileHover={isSelected ? { y: -10 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => {
              setSelectedIndex(index);
              onCardChange?.(index);
            }}
            className="absolute cursor-pointer"
            style={{ transformOrigin: 'bottom center' }}
          >
            <div
              className={`w-56 h-72 rounded-2xl overflow-hidden dark:bg-slate-800 bg-white border dark:border-white/10 border-slate-200 shadow-xl transition-shadow ${
                isSelected ? 'ring-2 ring-violet-500 shadow-2xl' : ''
              }`}
            >
              {card.content}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// === Tinder Variant ===
const TinderVariant: React.FC<{ cards: CardData[]; onCardChange?: (index: number) => void }> = ({
  cards,
  onCardChange,
}) => {
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitDirection(info.offset.x > 0 ? 'right' : 'left');
      setTimeout(() => {
        const newIndex = (currentIndex + 1) % cards.length;
        setCurrentIndex(newIndex);
        setExitDirection(null);
        onCardChange?.(newIndex);
      }, 300);
    }
  };

  return (
    <div ref={containerRef} className="relative h-96 w-72">
      <AnimatePresence>
        {cards.map((card, index) => {
          const offset = (index - currentIndex + cards.length) % cards.length;
          if (offset > 2) return null;

          const isTopCard = offset === 0;

          return (
            <motion.div
              key={card.id}
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{
                scale: 1 - offset * 0.05,
                y: offset * 10,
                opacity: 1 - offset * 0.3,
                zIndex: cards.length - offset,
              }}
              exit={{
                x: exitDirection === 'right' ? 500 : -500,
                rotate: exitDirection === 'right' ? 30 : -30,
                opacity: 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              drag={isTopCard ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={isTopCard ? handleDragEnd : undefined}
              className={`absolute inset-0 ${isTopCard ? 'cursor-grab active:cursor-grabbing' : ''}`}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden dark:bg-slate-800 bg-white border dark:border-white/10 border-slate-200 shadow-xl">
                {card.content}
              </div>

              {/* Swipe Indicators */}
              {isTopCard && (
                <>
                  <motion.div
                    className="absolute top-4 left-4 px-4 py-2 rounded-lg bg-red-500 text-white font-bold"
                    initial={{ opacity: 0 }}
                    style={{ opacity: 0 }}
                  >
                    NOPE
                  </motion.div>
                  <motion.div
                    className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-emerald-500 text-white font-bold"
                    initial={{ opacity: 0 }}
                    style={{ opacity: 0 }}
                  >
                    LIKE
                  </motion.div>
                </>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setExitDirection('left');
            setTimeout(() => {
              const newIndex = (currentIndex + 1) % cards.length;
              setCurrentIndex(newIndex);
              setExitDirection(null);
              onCardChange?.(newIndex);
            }, 300);
          }}
          className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 flex items-center justify-center shadow-lg"
        >
          ✕
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setExitDirection('right');
            setTimeout(() => {
              const newIndex = (currentIndex + 1) % cards.length;
              setCurrentIndex(newIndex);
              setExitDirection(null);
              onCardChange?.(newIndex);
            }, 300);
          }}
          className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 flex items-center justify-center shadow-lg"
        >
          ♥
        </motion.button>
      </div>
    </div>
  );
};

// === Deck Variant ===
const DeckVariant: React.FC<{ cards: CardData[]; visibleCards: number; onCardChange?: (index: number) => void }> = ({
  cards,
  visibleCards,
  onCardChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    const newIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(newIndex);
    onCardChange?.(newIndex);
  };

  const prev = () => {
    const newIndex = (currentIndex - 1 + cards.length) % cards.length;
    setCurrentIndex(newIndex);
    onCardChange?.(newIndex);
  };

  return (
    <div className="flex items-center gap-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={prev}
        className="w-12 h-12 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center dark:text-white text-slate-700"
      >
        <ChevronLeft size={24} />
      </motion.button>

      <div className="relative h-64 w-48">
        {cards.map((card, index) => {
          const offset = (index - currentIndex + cards.length) % cards.length;
          if (offset >= visibleCards && offset < cards.length - 1) return null;

          const isBack = offset >= visibleCards;
          const adjustedOffset = isBack ? -1 : offset;

          return (
            <motion.div
              key={card.id}
              animate={{
                x: adjustedOffset * 20,
                scale: 1 - Math.abs(adjustedOffset) * 0.05,
                opacity: Math.abs(adjustedOffset) > 2 ? 0 : 1,
                zIndex: isBack ? 0 : visibleCards - offset,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute inset-0"
            >
              <div className="w-full h-full rounded-xl overflow-hidden dark:bg-slate-800 bg-white border dark:border-white/10 border-slate-200 shadow-lg">
                {card.content}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={next}
        className="w-12 h-12 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center dark:text-white text-slate-700"
      >
        <ChevronRight size={24} />
      </motion.button>
    </div>
  );
};

// === Main Component ===
export const StackedCards: React.FC<StackedCardsProps> = ({
  cards,
  className = '',
  variant = 'stack',
  visibleCards = 3,
  onCardChange,
}) => {
  return (
    <div className={className}>
      {variant === 'stack' && <StackVariant cards={cards} onCardChange={onCardChange} />}
      {variant === 'fan' && <FanVariant cards={cards} onCardChange={onCardChange} />}
      {variant === 'tinder' && <TinderVariant cards={cards} onCardChange={onCardChange} />}
      {variant === 'deck' && <DeckVariant cards={cards} visibleCards={visibleCards} onCardChange={onCardChange} />}
    </div>
  );
};

export default StackedCards;
