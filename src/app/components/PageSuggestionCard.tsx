import React from 'react';
import { motion } from 'motion/react';
import { PageSuggestion } from '../utils/mockAI';

interface PageSuggestionCardProps {
  suggestion: PageSuggestion;
  index: number;
  onClick: () => void;
}

export function PageSuggestionCard({
  suggestion,
  index,
  onClick,
}: PageSuggestionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      onClick={onClick}
      className="text-left p-4 bg-card border border-border rounded-lg hover:border-accent hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
    >
      <h4 className="font-medium text-sm text-foreground mb-1">{suggestion.title}</h4>
      <p className="text-xs text-muted-foreground mb-2">{suggestion.description}</p>
      {suggestion.relevance > 0.7 && (
        <div className="text-xs font-medium text-accent">
          Relevant match
        </div>
      )}
    </motion.button>
  );
}
