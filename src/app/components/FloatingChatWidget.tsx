import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInputArea } from './chat/ChatInputArea';
import { TypingIndicator } from './chat/TypingIndicator';
import { ChatMessagesContainer } from './chat/ChatMessagesContainer';

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
            <ChatMessagesContainer scrollTrigger={[messages, isLoading]} variant="compact">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  onSuggestionClick={handleSuggestionClick}
                />
              ))}
              {isLoading && <TypingIndicator variant="compact" />}
            </ChatMessagesContainer>

            {/* Input Area */}
            <ChatInputArea
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSendMessage}
              isLoading={isLoading}
              placeholder="Type message..."
              maxHeight={100}
              variant="compact"
            />
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
