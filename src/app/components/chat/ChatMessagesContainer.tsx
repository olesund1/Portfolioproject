import React from 'react';
import { AnimatePresence } from 'motion/react';
import { useChatScroll } from './useChatScroll';

interface ChatMessagesContainerProps {
  children: React.ReactNode;
  className?: string;
  scrollTrigger: any;
  variant?: 'compact' | 'spacious';
}

/**
 * Reusable messages container with auto-scrolling
 * Provides scrollable container for chat messages
 */
export function ChatMessagesContainer({
  children,
  className = '',
  scrollTrigger,
  variant = 'compact',
}: ChatMessagesContainerProps) {
  const { containerRef, endRef } = useChatScroll(scrollTrigger);

  const isCompact = variant === 'compact';
  const padding = isCompact ? 'p-4' : 'p-6';

  return (
    <div ref={containerRef} className={`flex-1 overflow-y-auto ${padding} space-y-4 ${className}`}>
      <AnimatePresence>{children}</AnimatePresence>
      <div ref={endRef} />
    </div>
  );
}
