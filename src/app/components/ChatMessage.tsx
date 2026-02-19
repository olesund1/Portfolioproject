import React from 'react';
import { motion } from 'motion/react';
import { PageSuggestion } from '../utils/mockAI';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  suggestions?: PageSuggestion[];
  onSuggestionClick?: (page: string, caseStudyId?: string) => void;
}

export function ChatMessage({
  role,
  content,
  suggestions,
  onSuggestionClick,
}: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-xs md:max-w-md px-4 py-3 md:px-4 md:py-3 rounded-2xl ${
          isUser
            ? 'bg-accent text-accent-foreground rounded-br-none'
            : 'bg-secondary text-foreground rounded-bl-none'
        }`}
      >
        <p className="text-base leading-relaxed">{content}</p>
        <span className="text-xs text-muted-foreground mt-2 block opacity-70">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
}
