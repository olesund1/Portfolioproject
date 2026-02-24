/**
 * Mock AI response generator for chatbot
 * Orchestrates keyword matching and response selection
 */

import { matchQuestionToPages } from './ai/keywordMatcher';
import { categorizeUserMessage, getRandomTemplate } from './ai/responseTemplates';

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

/**
 * Generate AI response with page suggestions
 * Matches user input to portfolio pages and provides contextual response
 */
export async function generateAIResponse(
  userMessage: string,
  conversationHistory: ConversationMessage[]
): Promise<AIResponse> {
  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 300));

  // Match user message to relevant portfolio pages
  const suggestions = matchQuestionToPages(userMessage);

  // Categorize message and select appropriate response type
  const category = categorizeUserMessage(userMessage, suggestions, conversationHistory.length);
  const response = getRandomTemplate(category);

  return {
    response,
    suggestedPages: suggestions.length > 0 ? suggestions : undefined,
  };
}
