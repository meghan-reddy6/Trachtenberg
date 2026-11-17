import React from 'react';
import { Difficulty, MasteryLevel } from '../../types';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, className = '' }) => {
  const styles: Record<Difficulty, { label: string; bg: string; text: string; border: string }> = {
    beginner: {
      label: 'Beginner',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-800 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-800/60'
    },
    intermediate: {
      label: 'Intermediate',
      bg: 'bg-sky-50 dark:bg-sky-950/40',
      text: 'text-sky-800 dark:text-sky-300',
      border: 'border-sky-200 dark:border-sky-800/60'
    },
    advanced: {
      label: 'Advanced',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      text: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-800/60'
    },
    expert: {
      label: 'Expert',
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      text: 'text-rose-800 dark:text-rose-300',
      border: 'border-rose-200 dark:border-rose-800/60'
    }
  };

  const current = styles[difficulty] || styles.beginner;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${current.bg} ${current.text} ${current.border} ${className}`}
    >
      {current.label}
    </span>
  );
};

interface MasteryBadgeProps {
  level: MasteryLevel;
  className?: string;
}

export const MasteryBadge: React.FC<MasteryBadgeProps> = ({ level, className = '' }) => {
  const styles: Record<MasteryLevel, { label: string; bg: string; text: string; dot: string }> = {
    'not-started': {
      label: 'Not Started',
      bg: 'bg-paper-100 dark:bg-ink-800 text-ink-600 dark:text-paper-400',
      text: 'text-ink-600 dark:text-paper-400',
      dot: 'bg-ink-400'
    },
    learning: {
      label: 'Learning',
      bg: 'bg-academic-50 dark:bg-academic-950/40 text-academic-700 dark:text-academic-300 border border-academic-200 dark:border-academic-800',
      text: 'text-academic-700 dark:text-academic-300',
      dot: 'bg-academic-500'
    },
    practising: {
      label: 'Practising',
      bg: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800',
      text: 'text-sky-700 dark:text-sky-300',
      dot: 'bg-sky-500'
    },
    proficient: {
      label: 'Proficient',
      bg: 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800',
      text: 'text-teal-700 dark:text-teal-300',
      dot: 'bg-teal-500'
    },
    mastered: {
      label: 'Mastered',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
      text: 'text-emerald-700 dark:text-emerald-300',
      dot: 'bg-emerald-500'
    }
  };

  const current = styles[level] || styles['not-started'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${current.bg} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      {current.label}
    </span>
  );
};

