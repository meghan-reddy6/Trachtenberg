import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-academic-500/30 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-academic-700 hover:bg-academic-800 text-white shadow-xs border border-academic-800 dark:bg-blue-600 dark:hover:bg-blue-500 dark:border-blue-500 dark:text-white dark:shadow-md dark:shadow-blue-900/30 font-semibold',
    secondary: 'bg-paper-100 hover:bg-paper-200 text-ink-900 border border-paper-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 dark:border-slate-700',
    outline: 'bg-transparent hover:bg-paper-100 text-ink-800 border border-paper-300 dark:hover:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700',
    ghost: 'bg-transparent hover:bg-paper-100 text-ink-700 hover:text-ink-950 dark:hover:bg-slate-800/60 dark:text-slate-300 dark:hover:text-white',
    danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
