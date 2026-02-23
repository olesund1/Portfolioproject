import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { ContactPage } from './pages/ContactPage';
import { ConversePage } from './pages/ConversePage';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { generateAIResponse, ConversationMessage } from './utils/mockAI';

type PageType = 'home' | 'about' | 'case-study' | 'contact' | 'converse';

interface DisplayMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: any[];
}

interface AppState {
  currentPage: PageType;
  caseStudyId?: string;
}

/** Parse the current browser URL into an AppState */
function parseUrl(pathname: string = window.location.pathname): AppState {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (path === '/' || path === '') return { currentPage: 'home' };
  if (path === '/about') return { currentPage: 'about' };
  if (path === '/contact') return { currentPage: 'contact' };
  if (path === '/converse') return { currentPage: 'converse' };

  // Match /case-study/:id
  const caseStudyMatch = path.match(/^\/case-study\/(.+)$/);
  if (caseStudyMatch) {
    return { currentPage: 'case-study', caseStudyId: caseStudyMatch[1] };
  }

  return { currentPage: 'home' };
}

/** Convert an AppState to a URL path */
function buildUrl(page: string, caseStudyId?: string): string {
  switch (page) {
    case 'home': return '/';
    case 'about': return '/about';
    case 'contact': return '/contact';
    case 'converse': return '/converse';
    case 'case-study': return `/case-study/${caseStudyId || ''}`;
    default: return '/';
  }
}

export default function App() {
  const [appState, setAppState] = useState<AppState>(parseUrl);
  const [chatbotMessages, setChatbotMessages] = useState<DisplayMessage[]>([]);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [showFloatingChat, setShowFloatingChat] = useState(false);
  const [isChatbotInitialized, setIsChatbotInitialized] = useState(false);

  const handleNavigate = (page: string, caseStudyId?: string) => {
    const newState: AppState = { currentPage: page as PageType, caseStudyId };
    setAppState(newState);
    window.history.pushState(newState, '', buildUrl(page, caseStudyId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      setAppState(parseUrl());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Initialize chatbot with welcome message
  useEffect(() => {
    if (!isChatbotInitialized) {
      const welcomeMessage: DisplayMessage = {
        id: '0',
        role: 'assistant',
        content:
          "Hi! I'm Juan Bot, a UX/UI designer. Ask me anything about my work, experience, or processes, and I'll suggest relevant pages to explore.",
      };
      setChatbotMessages([welcomeMessage]);
      setConversationHistory([
        {
          role: 'assistant',
          content: welcomeMessage.content,
          timestamp: Date.now(),
        },
      ]);
      setIsChatbotInitialized(true);
    }
  }, [isChatbotInitialized]);

  // Show floating chat widget when navigating away from converse page
  useEffect(() => {
    if (appState.currentPage !== 'converse' && conversationHistory.length > 1) {
      setShowFloatingChat(true);
    }
  }, [appState.currentPage, conversationHistory.length]);

  const handleChatbotMessage = async (userInput: string) => {
    // Add user message
    const userMessage: DisplayMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput,
    };

    const newMessages = [...chatbotMessages, userMessage];
    setChatbotMessages(newMessages);

    // Update conversation history
    const newHistory: ConversationMessage[] = [
      ...conversationHistory,
      {
        role: 'user',
        content: userInput,
        timestamp: Date.now(),
      },
    ];

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(userInput, newHistory);

      // Add AI message with suggestions
      const assistantMessage: DisplayMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.response,
        suggestions: aiResponse.suggestedPages,
      };

      setChatbotMessages([...newMessages, assistantMessage]);
      setConversationHistory([
        ...newHistory,
        {
          role: 'assistant',
          content: aiResponse.response,
          timestamp: Date.now(),
        },
      ]);
    } catch (error) {
      console.error('Error generating AI response:', error);
    }
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [appState.currentPage]);

  const renderPage = () => {
    switch (appState.currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'case-study':
        return (
          <CaseStudyPage
            caseStudyId={appState.caseStudyId || 'b2p-redesign'}
            onNavigate={handleNavigate}
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'converse':
        return (
          <ConversePage
            onNavigate={handleNavigate}
            messages={chatbotMessages}
            conversationHistory={conversationHistory}
            onSendMessage={handleChatbotMessage}
            onInitialize={(msgs, history) => {
              setChatbotMessages(msgs);
              setConversationHistory(history);
            }}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation currentPage={appState.currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer />
      {appState.currentPage !== 'converse' && (
        <FloatingChatWidget
          messages={chatbotMessages}
          isOpen={showFloatingChat}
          onToggle={() => setShowFloatingChat(!showFloatingChat)}
          onSendMessage={handleChatbotMessage}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
