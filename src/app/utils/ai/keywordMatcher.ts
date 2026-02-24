/**
 * Keyword matching algorithm for chatbot
 * Matches user input to portfolio pages based on keywords
 */

import { portfolioKnowledge } from '../portfolioKnowledge';
import { normalizeText, extractKeywords } from './textUtils';

export interface PageSuggestion {
  page: 'home' | 'about' | 'case-study' | 'contact';
  caseStudyId?: string;
  title: string;
  description: string;
  relevance: number;
}

interface MatcherOptions {
  minRelevance?: number;
  maxSuggestions?: number;
}

/**
 * Match user message to portfolio pages
 * Returns ranked suggestions based on keyword relevance
 */
export function matchQuestionToPages(
  userMessage: string,
  options: MatcherOptions = {}
): PageSuggestion[] {
  const { minRelevance = 0.3, maxSuggestions = 4 } = options;

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

  // Convert scores to suggestions, filter, and rank
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
    .filter((s) => s.relevance > minRelevance)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, maxSuggestions);

  return suggestions;
}
