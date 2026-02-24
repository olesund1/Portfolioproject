/**
 * Text processing utilities for chatbot
 * Handles normalization, keyword extraction, and text analysis
 */

/**
 * Normalize text: lowercase, remove special characters, trim
 */
export function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, '').trim();
}

/**
 * Extract keywords from text (words longer than 2 characters)
 */
export function extractKeywords(text: string): string[] {
  return normalizeText(text)
    .split(/\s+/)
    .filter((word) => word.length > 2);
}
