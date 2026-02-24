/**
 * Response templates and categorization for chatbot
 * Manages response types and selects appropriate responses based on user input
 */

import { normalizeText } from './textUtils';
import type { ConversationMessage } from '../mockAI';
import type { PageSuggestion } from './keywordMatcher';

export type ResponseCategory = 'greeting' | 'projects' | 'aboutMe' | 'contact' | 'default';

/**
 * Response templates by category
 * Each category has multiple template options for variety
 */
export const responseTemplates: Record<ResponseCategory, string[]> = {
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

/**
 * Get a random template for the given category
 */
export function getRandomTemplate(category: ResponseCategory): string {
  const templates = responseTemplates[category];
  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Categorize user message to determine response type
 */
export function categorizeUserMessage(
  userMessage: string,
  suggestions: PageSuggestion[],
  conversationLength: number
): ResponseCategory {
  const normalizedMessage = normalizeText(userMessage);

  // First message detection
  if (conversationLength === 0 && (normalizedMessage.length < 10 || /^(hi|hey|hello)/.test(normalizedMessage))) {
    return 'greeting';
  }

  // Match response type based on keywords
  if (
    /project|work|case.?study|showcase|portfolio|see|view/.test(normalizedMessage) ||
    suggestions.some((s) => s.page === 'home')
  ) {
    return 'projects';
  }

  if (/about|experience|skill|process|background|who|biography/.test(normalizedMessage)) {
    return 'aboutMe';
  }

  if (/contact|email|reach|touch|hire|collaborate|message/.test(normalizedMessage)) {
    return 'contact';
  }

  // Default fallback
  return 'default';
}
