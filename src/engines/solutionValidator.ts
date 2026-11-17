import { PracticeQuestion } from '../types';

export interface ValidationFeedback {
  isCorrect: boolean;
  userAnswerCleaned: string;
  expectedAnswerCleaned: string;
  feedbackMessage: string;
  progressiveHint?: string;
  revealedSolution?: PracticeQuestion['solution'];
}

/**
 * Normalizes user input (stripping commas, spaces, case, and normalizing remainder notations)
 */
export function normalizeAnswer(ans: string): string {
  if (!ans) return '';
  const trimmed = ans.trim();
  const withRem = trimmed
    .replace(/\bremainder\b/gi, 'R')
    .replace(/\brem\b/gi, 'R')
    .replace(/(\d+)\s*[rR]\s*(\d+)/g, '$1 R $2');

  if (/[rR]/.test(withRem)) {
    return withRem.replace(/,/g, '').replace(/\s+/g, ' ').toUpperCase();
  }
  return withRem.replace(/[\s,]+/g, '').toUpperCase();
}

/**
 * Direct comparison check between user answer and expected answer
 */
export function validateAnswer(userAnswer: string, expectedAnswer: string): boolean {
  return normalizeAnswer(userAnswer) === normalizeAnswer(expectedAnswer);
}

/**
 * Validates user answer against practice question
 */
export function validateUserAnswer(question: PracticeQuestion, rawInput: string): ValidationFeedback {
  const userClean = normalizeAnswer(rawInput);
  const expectedClean = normalizeAnswer(question.correctAnswer);

  const isCorrect = userClean === expectedClean;

  let feedbackMessage = '';
  if (isCorrect) {
    feedbackMessage = 'Excellent! Your calculation is completely correct and verified.';
  } else {
    feedbackMessage = 'Not quite right yet. Review the rule or check for an uncarried dot.';
  }

  return {
    isCorrect,
    userAnswerCleaned: userClean,
    expectedAnswerCleaned: expectedClean,
    feedbackMessage
  };
}

/**
 * Returns progressive hint by hint level (1, 2, or 3)
 */
export function getProgressiveHint(question: PracticeQuestion, hintLevel: 1 | 2 | 3): string {
  if (hintLevel === 1) return `Rule Reminder: ${question.hints[0]}`;
  if (hintLevel === 2) return `Next Operation Guidance: ${question.hints[1]}`;
  return `Partial Calculation: ${question.hints[2]}`;
}

