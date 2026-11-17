import { UserProgress, MasteryLevel, Difficulty } from '../types';

const STORAGE_KEY = 'trachtenberg_user_progress_v1';
const CURRENT_VERSION = 1;

export const defaultProgress: UserProgress = {
  version: CURRENT_VERSION,
  lastUpdated: new Date().toISOString(),
  currentTechniqueId: 'tech-101',
  completedTechniqueIds: [],
  bookmarkedTechniqueIds: [],
  mastery: {},
  speedTrainerRecords: [],
  settings: {
    theme: 'light',
    mathFontSize: 'standard',
    hapticsOrSound: true,
    autoAdvanceStep: false,
  }
};

export function sanitizeProgress(parsed: any): UserProgress {
  if (!parsed || typeof parsed !== 'object') {
    return defaultProgress;
  }
  return {
    version: CURRENT_VERSION,
    lastUpdated: typeof parsed.lastUpdated === 'string' ? parsed.lastUpdated : new Date().toISOString(),
    currentTechniqueId: typeof parsed.currentTechniqueId === 'string' ? parsed.currentTechniqueId : defaultProgress.currentTechniqueId,
    completedTechniqueIds: Array.isArray(parsed.completedTechniqueIds)
      ? parsed.completedTechniqueIds.filter((x: any) => typeof x === 'string')
      : [],
    bookmarkedTechniqueIds: Array.isArray(parsed.bookmarkedTechniqueIds)
      ? parsed.bookmarkedTechniqueIds.filter((x: any) => typeof x === 'string')
      : [],
    mastery: typeof parsed.mastery === 'object' && parsed.mastery !== null ? parsed.mastery : {},
    speedTrainerRecords: Array.isArray(parsed.speedTrainerRecords) ? parsed.speedTrainerRecords : [],
    settings: {
      theme: parsed.settings?.theme === 'dark' ? 'dark' : 'light',
      mathFontSize: parsed.settings?.mathFontSize || 'standard',
      hapticsOrSound: typeof parsed.settings?.hapticsOrSound === 'boolean' ? parsed.settings.hapticsOrSound : true,
      autoAdvanceStep: typeof parsed.settings?.autoAdvanceStep === 'boolean' ? parsed.settings.autoAdvanceStep : false,
    }
  };
}

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return sanitizeProgress(parsed);
  } catch (e) {
    console.error('Failed to load user progress:', e);
    return defaultProgress;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    progress.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress:', e);
  }
}

export function recordPracticeAttempt(
  progress: UserProgress,
  techniqueId: string,
  isCorrect: boolean,
  timeMs: number,
  difficulty: Difficulty
): UserProgress {
  const existing = progress.mastery[techniqueId] || {
    level: 'learning' as MasteryLevel,
    score: 0,
    attempts: 0,
    correct: 0,
    averageTimeMs: 0,
    fastestTimeMs: Infinity,
    lastPracticed: new Date().toISOString(),
    history: []
  };

  const newAttempts = existing.attempts + 1;
  const newCorrect = existing.correct + (isCorrect ? 1 : 0);
  const newAvgTime = Math.round((existing.averageTimeMs * existing.attempts + timeMs) / newAttempts);
  const newFastest = isCorrect ? Math.min(existing.fastestTimeMs, timeMs) : existing.fastestTimeMs;

  // Calculate score points: correct gives 10-25 depending on difficulty, incorrect loses 5
  const diffMultiplier = difficulty === 'expert' ? 2.5 : difficulty === 'advanced' ? 2 : difficulty === 'intermediate' ? 1.5 : 1;
  const deltaScore = isCorrect ? Math.round(10 * diffMultiplier) : -5;
  const newScore = Math.max(0, existing.score + deltaScore);

  // Compute mastery level based on performance
  let newLevel: MasteryLevel = 'learning';
  const accuracy = newCorrect / newAttempts;
  if (newAttempts >= 15 && accuracy >= 0.85 && newScore >= 150) {
    newLevel = 'mastered';
  } else if (newAttempts >= 8 && accuracy >= 0.75 && newScore >= 80) {
    newLevel = 'proficient';
  } else if (newAttempts >= 3) {
    newLevel = 'practising';
  }

  const updatedTechniqueRecord = {
    ...existing,
    level: newLevel,
    score: newScore,
    attempts: newAttempts,
    correct: newCorrect,
    averageTimeMs: newAvgTime,
    fastestTimeMs: newFastest === Infinity ? 0 : newFastest,
    lastPracticed: new Date().toISOString(),
    history: [
      ...existing.history.slice(-49), // retain last 50 attempts
      {
        date: new Date().toISOString(),
        correct: isCorrect,
        timeMs,
        difficulty
      }
    ]
  };

  const newCompleted = new Set(progress.completedTechniqueIds);
  if (newAttempts >= 3 && !newCompleted.has(techniqueId)) {
    newCompleted.add(techniqueId);
  }

  const updatedProgress: UserProgress = {
    ...progress,
    completedTechniqueIds: Array.from(newCompleted),
    mastery: {
      ...progress.mastery,
      [techniqueId]: updatedTechniqueRecord
    }
  };

  saveUserProgress(updatedProgress);
  return updatedProgress;
}

export function toggleBookmark(progress: UserProgress, techniqueId: string): UserProgress {
  const bookmarks = new Set(progress.bookmarkedTechniqueIds);
  if (bookmarks.has(techniqueId)) {
    bookmarks.delete(techniqueId);
  } else {
    bookmarks.add(techniqueId);
  }
  const updated = {
    ...progress,
    bookmarkedTechniqueIds: Array.from(bookmarks)
  };
  saveUserProgress(updated);
  return updated;
}

export function exportProgressToJson(progress: UserProgress): string {
  return JSON.stringify(progress, null, 2);
}

export function importProgressFromJson(jsonStr: string): UserProgress {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid format: JSON payload must be a non-null object');
    }
    const sanitized = sanitizeProgress(parsed);
    saveUserProgress(sanitized);
    return sanitized;
  } catch (err: any) {
    throw new Error(`Failed to import progress: ${err.message}`);
  }
}

export function resetProgress(): UserProgress {
  localStorage.removeItem(STORAGE_KEY);
  return defaultProgress;
}

