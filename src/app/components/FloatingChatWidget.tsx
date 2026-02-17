import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, MessageCircle } from 'lucide-react';
import { ChatMessage } from './ChatMessage';

interface DisplayMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: any[];
}

interface FloatingChatWidgetProps {
  messages: DisplayMessage[];
  isOpen: boolean;
  onToggle: () => void;
  onSendMessage: (message: string) => Promise<void>;
  onNavigate?: (page: string, caseStudyId?: string) => void;
}

export function FloatingChatWidget({
  messages,
  isOpen,
  onToggle,
  onSendMessage,
  onNavigate,
}: FloatingChatWidgetProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll within container
  useEffect(() => {
    if (messagesContainerRef.current && messagesEndRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + 'px';
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const messageToSend = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      await onSendMessage(messageToSend);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (page: string, caseStudyId?: string) => {
    if (onNavigate) {
      onNavigate(page, caseStudyId);
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
        >
          {/* Chat Window */}
          <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden flex flex-col h-[500px] max-h-[60vh]">
            {/* Header */}
            <div className="bg-secondary border-b border-border p-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Juan Bot</h3>
              <button
                onClick={onToggle}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              <AnimatePresence>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    onSuggestionClick={handleSuggestionClick}
                  />
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="bg-secondary text-foreground rounded-2xl rounded-bl-none p-3 flex gap-1">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-foreground rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-foreground rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-foreground rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-3 bg-secondary/50">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type message..."
                  rows={1}
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none disabled:opacity-50 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="flex-shrink-0 px-3 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-all flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
