import { useRef, useEffect } from 'react';

/**
 * Hook for auto-scrolling messages container
 * Automatically scrolls to bottom when messages change or loading state changes
 */
export function useChatScroll(triggerValue: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && endRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [triggerValue]);

  return { containerRef, endRef };
}
