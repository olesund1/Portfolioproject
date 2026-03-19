import type { PageSuggestion } from './utils/mockAI';

export interface DisplayMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: PageSuggestion[];
}

export const WELCOME_MESSAGE_CONTENT =
  "Hi! I'm Juan Bot, your guide to explore Johan's portfolio. Ask me anything about Johan's work, experience, or processes, and I'll suggest relevant pages to explore.";
