import React from 'react';

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
      className={`bg-white dark:bg-ink-850 border border-paper-300 dark:border-ink-800 rounded-lg p-5 transition-all ${
        hoverable ? 'hover:border-paper-400 dark:hover:border-ink-700 cursor-pointer shadow-sm hover:shadow' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
