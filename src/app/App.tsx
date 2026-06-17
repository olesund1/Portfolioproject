import { useState, useEffect, useRef, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { ContactPage } from './pages/ContactPage';
import { ConversePage } from './pages/ConversePage';
import { generateAIResponse, ConversationMessage } from './utils/mockAI';
import { DisplayMessage, WELCOME_MESSAGE_CONTENT } from './types';

type PageType = 'home' | 'about' | 'case-study' | 'contact' | 'converse';

interface AppState {
  currentPage: PageType;
  caseStudyId?: string;
  scrollY?: number;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // e.g. '/Portfolioproject' or ''

/** Parse the current browser URL into an AppState */
function parseUrl(pathname: string = window.location.pathname): AppState {
  const stripped = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  const path = stripped.replace(/\/+$/, '') || '/';

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
  const suffix = (() => {
    switch (page) {
      case 'home': return '/';
      case 'about': return '/about';
      case 'contact': return '/contact';
      case 'converse': return '/converse';
      case 'case-study': return `/case-study/${caseStudyId || ''}`;
      default: return '/';
    }
  })();
  return suffix === '/' ? `${BASE}/` : `${BASE}${suffix}`;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>(parseUrl);
  const [chatbotMessages, setChatbotMessages] = useState<DisplayMessage[]>([]);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isChatbotInitialized, setIsChatbotInitialized] = useState(false);

  const [isBrutalist, setIsBrutalist] = useState(() => {
    return localStorage.getItem('design-theme') === 'brutalist';
  });

  const pendingScrollY = useRef<number | null>(null);

  const handleNavigate = useCallback((page: string, caseStudyId?: string) => {
    window.history.replaceState(
      { ...window.history.state, scrollY: window.scrollY },
      ''
    );
    const newState: AppState = { currentPage: page as PageType, caseStudyId };
    setAppState(newState);
    window.history.pushState(newState, '', buildUrl(page, caseStudyId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('brutalist', isBrutalist);
    localStorage.setItem('design-theme', isBrutalist ? 'brutalist' : 'default');
  }, [isBrutalist]);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  const toggleBrutalist = useCallback(() => setIsBrutalist(prev => !prev), []);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const savedY = (event.state as AppState | null)?.scrollY;
      if (savedY != null) {
        pendingScrollY.current = savedY;
      }
      setAppState(parseUrl());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (pendingScrollY.current !== null) {
      window.scrollTo({ top: pendingScrollY.current, behavior: 'instant' });
      pendingScrollY.current = null;
    }
  }, [appState]);

  // Initialize chatbot with welcome message
  useEffect(() => {
    if (!isChatbotInitialized) {
      const welcomeMessage: DisplayMessage = {
        id: '0',
        role: 'assistant',
        content: WELCOME_MESSAGE_CONTENT,
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

  const handleChatbotMessage = useCallback(async (userInput: string) => {
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
  }, [chatbotMessages, conversationHistory]);

  const handleInitialize = useCallback((msgs: DisplayMessage[], history: ConversationMessage[]) => {
    setChatbotMessages(msgs);
    setConversationHistory(history);
  }, []);

  const renderPage = () => {
    switch (appState.currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} isBrutalist={isBrutalist} />;
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
            onInitialize={handleInitialize}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation currentPage={appState.currentPage} onNavigate={handleNavigate} isBrutalist={isBrutalist} onToggleBrutalist={toggleBrutalist} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}
