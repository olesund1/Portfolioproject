import React from 'react';
import { Send } from 'lucide-react';
import { useChatInput } from './useChatInput';

interface ChatInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading?: boolean;
  placeholder?: string;
  maxHeight?: number;
  variant?: 'compact' | 'spacious';
}

/**
 * Reusable chat input component with auto-resizing textarea and send button
 * Used by both FloatingChatWidget and ConversePage
 */
export function ChatInputArea({
  value,
  onChange,
  onSend,
  isLoading = false,
  placeholder = 'Type message...',
  maxHeight = 100,
  variant = 'compact',
}: ChatInputAreaProps) {
  const textareaRef = useChatInput(value, { maxHeight });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const isCompact = variant === 'compact';
  const gapClass = isCompact ? 'gap-2' : 'gap-3';
  const paddingClass = isCompact ? 'p-3' : 'p-4';
  const textareaPaddingClass = isCompact ? 'px-3 py-2' : 'px-4 py-3';
  const buttonPaddingClass = isCompact ? 'px-3 py-2' : 'px-4 py-3';
  const textareaClass = isCompact ? 'text-sm' : 'text-base';
  const sendIconSize = isCompact ? 18 : 20;

  return (
    <div className={`border-t border-border ${paddingClass} bg-secondary/50`}>
      <div className={`flex ${gapClass} items-end`}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          rows={1}
          disabled={isLoading}
          className={`flex-1 ${textareaPaddingClass} bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none disabled:opacity-50 ${textareaClass}`}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || isLoading}
          className="flex-shrink-0 px-3 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <Send size={sendIconSize} />
        </button>
      </div>
    </div>
  );
}
