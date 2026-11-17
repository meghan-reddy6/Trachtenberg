import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white dark:bg-ink-850 border border-paper-300 dark:border-ink-800 rounded-lg p-5 transition-all text-ink-900 dark:text-paper-100',
        hoverable && 'hover:border-paper-400 dark:hover:border-ink-700 cursor-pointer shadow-sm hover:shadow',
        className
      )}
    >
      {children}
    </div>
  );
};
