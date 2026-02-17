import { portfolioKnowledge } from './portfolioKnowledge';

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface PageSuggestion {
  page: 'home' | 'about' | 'case-study' | 'contact';
  caseStudyId?: string;
  title: string;
  description: string;
  relevance: number;
}

export interface AIResponse {
  response: string;
  suggestedPages?: PageSuggestion[];
}

const responseTemplates = {
  greeting: [
    "Hi there! I'm Juan Bot, a UX/UI designer. I'd love to help you explore my work and experience. What would you like to know?",
    "Hello! Welcome to my portfolio. Feel free to ask me about my projects, experience, or anything else you'd like to know.",
    "Hey! Thanks for visiting. What are you interested in learning about?",
  ],
  projects: [
    "I've worked on several interesting projects including B2P procurement redesign, healthcare platforms, and e-commerce optimization. What would you like to explore?",
    "My recent work spans multiple industries—from B2P platforms to healthcare and e-commerce. Which area interests you?",
  ],
  aboutMe: [
    "I'm a UX/UI designer with experience in digital product design, user research, and design systems. I'd be happy to tell you more about my process and background.",
    "I specialize in creating user-centered designs that solve real problems. My work focuses on research-driven design and thoughtful user experiences.",
  ],
  contact: [
    "I'm always open to new opportunities and collaborations. The contact page has a form where you can reach out to me directly.",
    "Feel free to get in touch! You can send me a message on the contact page with any inquiries or collaboration ideas.",
  ],
  default: [
    "That's an interesting question! Let me suggest some pages that might help you find what you're looking for.",
    "I'm not entirely sure what you're asking, but here are some sections of my portfolio that might be helpful.",
  ],
};

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, '').trim();
}

function extractKeywords(text: string): string[] {
  return normalizeText(text)
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function matchQuestionToPages(userMessage: string): PageSuggestion[] {
  const keywords = extractKeywords(userMessage);
  const pageScores: { [key: string]: number } = {};

  // Score each page based on keyword matches
  Object.entries(portfolioKnowledge).forEach(([pageKey, pageData]) => {
    let score = 0;
    pageData.keywords.forEach((keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      keywords.forEach((userKeyword) => {
        if (normalizedKeyword.includes(userKeyword) || userKeyword.includes(normalizedKeyword)) {
          score += normalizedKeyword === userKeyword ? 2 : 1;
        }
      });
    });

    if (score > 0) {
      pageScores[pageKey] = score / pageData.keywords.length;
    }
  });

  // Convert scores to suggestions
  const suggestions: PageSuggestion[] = Object.entries(pageScores)
    .map(([pageKey, score]) => {
      const pageData = portfolioKnowledge[pageKey as keyof typeof portfolioKnowledge];
      const basePageType = pageKey.startsWith('case-study-') ? 'case-study' : (pageKey as any);

      return {
        page: basePageType,
        caseStudyId: (pageData as any).caseStudyId,
        title: pageData.title,
        description: pageData.description,
        relevance: Math.min(score, 1),
      };
    })
    .filter((s) => s.relevance > 0.3)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 4);

  return suggestions;
}

function buildContextualResponse(
  userMessage: string,
  suggestions: PageSuggestion[],
  conversationHistory: ConversationMessage[]
): string {
  const normalizedMessage = normalizeText(userMessage);
  const conversationLength = conversationHistory.length;

  // Greeting responses
  if (conversationLength === 0 && (normalizedMessage.length < 10 || /^(hi|hey|hello)/.test(normalizedMessage))) {
    return responseTemplates.greeting[Math.floor(Math.random() * responseTemplates.greeting.length)];
  }

  // Match response type based on keywords
  if (
    /project|work|case.?study|showcase|portfolio|see|view/.test(normalizedMessage) ||
    suggestions.some((s) => s.page === 'home')
  ) {
    return responseTemplates.projects[Math.floor(Math.random() * responseTemplates.projects.length)];
  }

  if (/about|experience|skill|process|background|who|biography/.test(normalizedMessage)) {
    return responseTemplates.aboutMe[Math.floor(Math.random() * responseTemplates.aboutMe.length)];
  }

  if (/contact|email|reach|touch|hire|collaborate|message/.test(normalizedMessage)) {
    return responseTemplates.contact[Math.floor(Math.random() * responseTemplates.contact.length)];
  }

  // Default response
  return responseTemplates.default[Math.floor(Math.random() * responseTemplates.default.length)];
}

export async function generateAIResponse(
  userMessage: string,
  conversationHistory: ConversationMessage[]
): Promise<AIResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 300));

  const suggestions = matchQuestionToPages(userMessage);
  const response = buildContextualResponse(userMessage, suggestions, conversationHistory);

  return {
    response,
    suggestedPages: suggestions.length > 0 ? suggestions : undefined,
  };
}
