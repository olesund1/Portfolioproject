import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { ContactPage } from './pages/ContactPage';

type PageType = 'home' | 'about' | 'case-study' | 'contact';

interface AppState {
  currentPage: PageType;
  caseStudyId?: string;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentPage: 'home',
  });

  const handleNavigate = (page: string, caseStudyId?: string) => {
    setAppState({
      currentPage: page as PageType,
      caseStudyId,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            caseStudyId={appState.caseStudyId || 'fintech-app'}
            onNavigate={handleNavigate}
          />
        );
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation currentPage={appState.currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}
