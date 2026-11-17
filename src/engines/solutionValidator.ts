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
 * Normalizes user input (stripping commas, spaces, case)
 */
export function normalizeAnswer(ans: string): string {
  return ans.trim().replace(/,/g, '').replace(/\s+/g, ' ').toUpperCase();
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
