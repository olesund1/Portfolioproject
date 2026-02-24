import React from 'react';
import { motion } from 'motion/react';

interface TypingIndicatorProps {
  variant?: 'compact' | 'spacious';
}

/**
 * Typing indicator animation component
 * Shows bouncing dots while bot is generating a response
 */
export function TypingIndicator({ variant = 'compact' }: TypingIndicatorProps) {
  const isCompact = variant === 'compact';
  const padding = isCompact ? 'p-3' : 'p-4';
  const dotSize = 'w-2 h-2';
  const gap = 'gap-1';
  const bounce = isCompact ? -4 : -6;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
      <div className={`bg-secondary text-foreground rounded-2xl rounded-bl-none ${padding} flex ${gap}`}>
        {[0, 0.2, 0.4].map((delay) => (
          <motion.div
            key={delay}
            animate={{ y: [0, bounce, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay }}
            className={`${dotSize} bg-foreground rounded-full`}
          />
        ))}
      </div>
    </motion.div>
  );
}
