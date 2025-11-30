import React, { useState, useEffect, useCallback } from 'react';

interface TypingTextProps {
  text: string | string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  cursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const TypingText: React.FC<TypingTextProps> = ({
  text,
  className = '',
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  loop = true,
  cursor = true,
  cursorChar = '|',
  onComplete,
  as: Component = 'span',
}) => {
  const texts = Array.isArray(text) ? text : [text];
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const typeText = useCallback(() => {
    const currentText = texts[textIndex];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentText.length) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else {
        // Finished typing current text
        if (texts.length > 1 || loop) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, pauseDuration);
        } else {
          onComplete?.();
        }
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setIsDeleting(false);
        const nextIndex = (textIndex + 1) % texts.length;
        if (nextIndex === 0 && !loop) {
          onComplete?.();
          return;
        }
        setTextIndex(nextIndex);
      }
    }
  }, [displayText, isDeleting, isPaused, textIndex, texts, loop, pauseDuration, onComplete]);

  useEffect(() => {
    const timer = setTimeout(
      typeText,
      isDeleting ? deleteSpeed : speed
    );
    return () => clearTimeout(timer);
  }, [typeText, isDeleting, speed, deleteSpeed]);

  return (
    <Component className={`inline-flex items-center ${className}`}>
      <span>{displayText}</span>
      {cursor && (
        <span
          className="ml-0.5 animate-pulse font-light text-violet-500"
          style={{ animation: 'blink 1s step-end infinite' }}
        >
          {cursorChar}
        </span>
      )}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </Component>
  );
};

export default TypingText;
