import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Sun, Moon, Menu, Award, Coffee, Sparkles } from 'lucide-react';
import { UserProgress } from '../../types';
import { getAllTechniquesList } from '../../content/curriculum';

interface HeaderProps {
  progress: UserProgress;
  onOpenSearch: () => void;
  onToggleTheme: () => void;
  onToggleMobileMenu: () => void;
  currentTheme: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  onOpenSearch,
  onToggleTheme,
  onToggleMobileMenu,
  currentTheme
}) => {
  const masteredCount = Object.values(progress.mastery).filter(m => m.level === 'mastered').length;
  const totalTechniques = getAllTechniquesList().length;

  return (
    <header className="sticky top-0 z-30 h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-paper-200 dark:border-slate-800 transition-colors">
      <div className="h-full px-3 sm:px-6 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-1.5 -ml-1 rounded text-ink-700 hover:text-ink-950 dark:text-slate-300 dark:hover:text-white"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded bg-academic-800 dark:bg-blue-600 text-white flex items-center justify-center font-serif font-black text-sm shadow-xs">
              T
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm tracking-wide text-ink-950 dark:text-white leading-tight">
                TRACHTENBERG
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-academic-700 dark:text-blue-400 leading-none font-medium">
                Speed Mathematics
              </span>
            </div>
          </NavLink>
        </div>

        {/* Center: Search Trigger (Desktop & Tablet) */}
        <div className="flex-1 max-w-sm hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs bg-paper-100 hover:bg-paper-200/70 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-ink-500 dark:text-slate-300 rounded-md border border-paper-300 dark:border-slate-700 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-ink-400 dark:text-slate-400" />
              <span>Search techniques, rules...</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-paper-300 dark:border-slate-700 rounded text-ink-500 dark:text-slate-400 shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right: Buy me a Chai, Mastered Stats, Search, Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Buy Me a Chai CTA Button -> Directly links to buymeachai.in/meghansai6 */}
          <a
            href="https://www.buymeachai.in/meghansai6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 dark:border-amber-500/40 transition-all active:scale-95 shadow-2xs"
            title="Buy Meghan a chai at https://www.buymeachai.in/meghansai6"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">Buy me a chai</span>
            <span className="sm:hidden text-[11px]">Chai ☕</span>
          </a>

          {/* Mastered Badge (Desktop) */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-paper-100 dark:bg-slate-800 border border-paper-200 dark:border-slate-700 text-xs text-ink-700 dark:text-slate-300 font-mono">
            <Award className="w-3.5 h-3.5 text-academic-600 dark:text-blue-400" />
            <span>Mastered: <strong className="text-academic-800 dark:text-blue-400">{masteredCount}</strong>/{totalTechniques}</span>
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-1.5 rounded text-ink-600 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 sm:p-2 rounded text-ink-600 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white hover:bg-paper-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
          >
            {currentTheme === 'light' ? (
              <Moon className="w-4 h-4 text-ink-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
