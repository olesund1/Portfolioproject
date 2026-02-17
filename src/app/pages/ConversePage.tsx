import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send } from 'lucide-react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { ChatMessage } from '../components/ChatMessage';
import { PageSuggestionCard } from '../components/PageSuggestionCard';
import { generateAIResponse, ConversationMessage, PageSuggestion } from '../utils/mockAI';

interface ConversePageProps {
  onNavigate: (page: string, caseStudyId?: string) => void;
  messages: DisplayMessage[];
  conversationHistory: ConversationMessage[];
  onSendMessage: (message: string) => Promise<void>;
  onInitialize: (messages: DisplayMessage[], history: ConversationMessage[]) => void;
}

interface DisplayMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: PageSuggestion[];
}

export function ConversePage({
  onNavigate,
  messages,
  conversationHistory,
  onSendMessage,
  onInitialize,
}: ConversePageProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll within container (not page scroll)
  useEffect(() => {
    if (messagesContainerRef.current && messagesEndRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  // Initialize with welcome message if not already initialized
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: DisplayMessage = {
        id: '0',
        role: 'assistant',
        content:
          "Hi! I'm Juan Bot, a UX/UI designer. Ask me anything about my work, experience, or processes, and I'll suggest relevant pages to explore.",
      };
      onInitialize([welcomeMessage], [
        {
          role: 'assistant',
          content: welcomeMessage.content,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [onInitialize, messages.length]);

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
    onNavigate(page, caseStudyId);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="pt-16 md:pt-20 pb-24">
      <Section className="min-h-[85vh] flex flex-col">
        <Container size="narrow">
          <div className="flex flex-col h-full space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center space-y-4"
            >
              <h1 className="text-4xl md:text-5xl font-bold">Let's talk!</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ask me questions about my work, process, or experience. I'll suggest relevant pages
                to explore.
              </p>
            </motion.div>

            {/* Chat Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col max-w-2xl mx-auto w-full h-[60vh] max-h-[500px]"
            >
              {/* Messages Area */}
              <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <div key={message.id}>
                      <ChatMessage
                        role={message.role}
                        content={message.content}
                        onSuggestionClick={handleSuggestionClick}
                      />

                      {/* Suggestions Grid */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 ml-4"
                        >
                          {message.suggestions.map((suggestion, suggestionIndex) => (
                            <PageSuggestionCard
                              key={`${message.id}-${suggestionIndex}`}
                              suggestion={suggestion}
                              index={suggestionIndex}
                              onClick={() =>
                                handleSuggestionClick(suggestion.page, suggestion.caseStudyId)
                              }
                            />
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="bg-secondary text-foreground rounded-2xl rounded-bl-none p-4 flex gap-1">
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-foreground rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-foreground rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-foreground rounded-full"
                      />
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-border p-4 bg-secondary/50">
                <div className="flex gap-3 items-end">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me something... (Shift+Enter for new line)"
                    rows={1}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none disabled:opacity-50 max-h-30"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="flex-shrink-0 px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
