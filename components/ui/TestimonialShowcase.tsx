'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Testimonial {
  id: string | number;
  content: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  rating?: number;
  video?: string;
  logo?: string;
}

interface TestimonialShowcaseProps {
  testimonials: Testimonial[];
  variant?: 'cards' | 'wall' | 'featured' | 'minimal' | 'video';
  className?: string;
  columns?: 2 | 3 | 4;
}

// === VARIANT 1: Cards Grid ===
const TestimonialCards: React.FC<{ testimonials: Testimonial[]; columns: number }> = ({
  testimonials,
  columns,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div
      ref={containerRef}
      className={`grid gap-6 ${
        columns === 2
          ? 'grid-cols-1 md:grid-cols-2'
          : columns === 3
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      }`}
    >
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative p-6 rounded-2xl dark:bg-slate-900/50 bg-white border dark:border-white/10 border-slate-200 h-full flex flex-col">
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Quote size={14} className="text-violet-500" />
            </div>

            {/* Rating */}
            {testimonial.rating && (
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < testimonial.rating!
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-slate-300 dark:text-slate-600'
                    }
                  />
                ))}
              </div>
            )}

            {/* Content */}
            <p className="dark:text-slate-300 text-slate-600 text-sm leading-relaxed flex-1 mb-6">
              "{testimonial.content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t dark:border-white/10 border-slate-100">
              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.author.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-sm dark:text-white text-slate-900">
                  {testimonial.author}
                </p>
                <p className="text-xs dark:text-slate-400 text-slate-500">
                  {testimonial.role}{testimonial.company && ` at ${testimonial.company}`}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// === VARIANT 2: Masonry Wall ===
const TestimonialWall: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div ref={containerRef} className="relative">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r dark:from-[#0a0a0b] from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l dark:from-[#0a0a0b] from-white to-transparent z-10 pointer-events-none" />

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.05 }}
            className="break-inside-avoid"
          >
            <div className="p-6 rounded-xl dark:bg-slate-800/50 bg-slate-50 border dark:border-white/5 border-slate-100">
              <p className="dark:text-slate-300 text-slate-600 text-sm leading-relaxed mb-4">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                    {testimonial.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-sm dark:text-white text-slate-900">
                    {testimonial.author}
                  </p>
                  <p className="text-xs dark:text-slate-500 text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// === VARIANT 3: Featured Large ===
const TestimonialFeatured: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div ref={containerRef} className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Large Quote */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center mx-auto mb-8"
          >
            <Quote className="text-white" size={28} />
          </motion.div>

          {/* Rating */}
          {testimonials[current].rating && (
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className={
                    i < testimonials[current].rating!
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-slate-300 dark:text-slate-600'
                  }
                />
              ))}
            </div>
          )}

          {/* Content */}
          <blockquote className="text-2xl md:text-3xl font-medium dark:text-white text-slate-900 leading-relaxed mb-8">
            "{testimonials[current].content}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            {testimonials[current].avatar ? (
              <img
                src={testimonials[current].avatar}
                alt={testimonials[current].author}
                className="w-14 h-14 rounded-full object-cover ring-4 ring-violet-500/20"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                {testimonials[current].author.charAt(0)}
              </div>
            )}
            <div className="text-left">
              <p className="font-bold text-lg dark:text-white text-slate-900">
                {testimonials[current].author}
              </p>
              <p className="dark:text-slate-400 text-slate-500">
                {testimonials[current].role}
                {testimonials[current].company && ` at ${testimonials[current].company}`}
              </p>
            </div>
          </div>

          {/* Company Logo */}
          {testimonials[current].logo && (
            <img
              src={testimonials[current].logo}
              alt={testimonials[current].company}
              className="h-8 mx-auto mt-6 opacity-50 grayscale"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-12">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          className="w-12 h-12 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center dark:text-white text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronLeft size={20} />
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                index === current
                  ? 'w-8 bg-violet-500'
                  : 'w-2 dark:bg-slate-600 bg-slate-300'
              }`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
          className="w-12 h-12 rounded-full dark:bg-slate-800 bg-slate-100 flex items-center justify-center dark:text-white text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

// === VARIANT 4: Minimal Style ===
const TestimonialMinimal: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div ref={containerRef} className="space-y-12">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.15 }}
          className={`flex flex-col md:flex-row gap-8 items-start ${
            index % 2 === 1 ? 'md:flex-row-reverse' : ''
          }`}
        >
          {/* Left: Quote Line */}
          <div className="hidden md:block w-1 h-24 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full" />

          {/* Content */}
          <div className="flex-1">
            <p className="text-lg md:text-xl dark:text-slate-300 text-slate-700 leading-relaxed italic mb-6">
              "{testimonial.content}"
            </p>
            <div className="flex items-center gap-4">
              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-bold dark:text-white text-slate-900">{testimonial.author}</p>
                <p className="text-sm dark:text-slate-400 text-slate-500">
                  {testimonial.role}{testimonial.company && ` • ${testimonial.company}`}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// === VARIANT 5: Video Testimonials ===
const TestimonialVideo: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          {/* Video Thumbnail */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-pink-500/20" />
            {testimonial.avatar && (
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-full h-full object-cover"
              />
            )}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                <Play size={24} className="text-violet-600 ml-1" fill="currentColor" />
              </div>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-semibold">{testimonial.author}</p>
              <p className="text-white/70 text-sm">{testimonial.role}</p>
            </div>
          </div>

          {/* Preview Quote */}
          <p className="text-sm dark:text-slate-400 text-slate-500 line-clamp-2">
            "{testimonial.content}"
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// === Main Component ===
export const TestimonialShowcase: React.FC<TestimonialShowcaseProps> = ({
  testimonials,
  variant = 'cards',
  className = '',
  columns = 3,
}) => {
  return (
    <div className={className}>
      {variant === 'cards' && <TestimonialCards testimonials={testimonials} columns={columns} />}
      {variant === 'wall' && <TestimonialWall testimonials={testimonials} />}
      {variant === 'featured' && <TestimonialFeatured testimonials={testimonials} />}
      {variant === 'minimal' && <TestimonialMinimal testimonials={testimonials} />}
      {variant === 'video' && <TestimonialVideo testimonials={testimonials} />}
    </div>
  );
};

export default TestimonialShowcase;
