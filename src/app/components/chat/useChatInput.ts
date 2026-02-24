import { useRef, useEffect } from 'react';

interface UseChatInputOptions {
  maxHeight?: number;
}

/**
 * Hook for auto-resizing textarea in chat input
 * Automatically adjusts height based on content up to maxHeight
 */
export function useChatInput(inputValue: string, options: UseChatInputOptions = {}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { maxHeight = 100 } = options;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, maxHeight) + 'px';
    }
  }, [inputValue, maxHeight]);

  return textareaRef;
}
