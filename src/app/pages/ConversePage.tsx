import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { ChatMessage } from '../components/ChatMessage';
import { PageSuggestionCard } from '../components/PageSuggestionCard';
import { ChatInputArea } from '../components/chat/ChatInputArea';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { ChatMessagesContainer } from '../components/chat/ChatMessagesContainer';
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
              <ChatMessagesContainer
                scrollTrigger={[messages, isLoading]}
                variant="spacious"
              >
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
                {isLoading && <TypingIndicator variant="spacious" />}
              </ChatMessagesContainer>

              {/* Input Area */}
              <ChatInputArea
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSendMessage}
                isLoading={isLoading}
                placeholder="Ask me something... (Shift+Enter for new line)"
                maxHeight={120}
                variant="spacious"
              />
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
