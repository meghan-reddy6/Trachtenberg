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
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
      text: 'text-emerald-800 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-700/60'
    },
    intermediate: {
      label: 'Intermediate',
      bg: 'bg-sky-50 dark:bg-sky-950/50',
      text: 'text-sky-800 dark:text-sky-300',
      border: 'border-sky-200 dark:border-sky-700/60'
    },
    advanced: {
      label: 'Advanced',
      bg: 'bg-amber-50 dark:bg-amber-950/50',
      text: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-700/60'
    },
    expert: {
      label: 'Expert',
      bg: 'bg-purple-50 dark:bg-purple-950/50',
      text: 'text-purple-800 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-700/60'
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
  const styles: Record<MasteryLevel, { label: string; bg: string; text: string; dot: string; border: string }> = {
    'not-started': {
      label: 'Not Started',
      bg: 'bg-paper-100 dark:bg-slate-800',
      text: 'text-ink-600 dark:text-slate-400',
      border: 'border-paper-200 dark:border-slate-700',
      dot: 'bg-slate-400'
    },
    learning: {
      label: 'Learning',
      bg: 'bg-blue-50 dark:bg-blue-950/50',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-800/60',
      dot: 'bg-blue-500'
    },
    practising: {
      label: 'Practising',
      bg: 'bg-sky-50 dark:bg-sky-950/50',
      text: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-200 dark:border-sky-800/60',
      dot: 'bg-sky-500'
    },
    proficient: {
      label: 'Proficient',
      bg: 'bg-teal-50 dark:bg-teal-950/50',
      text: 'text-teal-700 dark:text-teal-300',
      border: 'border-teal-200 dark:border-teal-800/60',
      dot: 'bg-teal-500'
    },
    mastered: {
      label: 'Mastered',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-800/60',
      dot: 'bg-emerald-500'
    }
  };

  const current = styles[level] || styles['not-started'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${current.bg} ${current.text} ${current.border} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      {current.label}
    </span>
  );
};
