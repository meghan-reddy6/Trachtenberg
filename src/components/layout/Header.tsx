import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Sun, Moon, Menu, Award, Coffee, Sparkles, Heart } from 'lucide-react';
import { UserProgress } from '../../types';
import { BuyMeAChaiModal } from '../common/BuyMeAChaiModal';

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
  const [isChaiModalOpen, setIsChaiModalOpen] = useState(false);
  const masteredCount = Object.values(progress.mastery).filter(m => m.level === 'mastered').length;

  return (
    <>
      <header className="sticky top-0 z-30 h-14 bg-white/95 dark:bg-ink-900/95 backdrop-blur-xs border-b border-paper-200 dark:border-ink-800 transition-colors">
        <div className="h-full px-3 sm:px-6 flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-1.5 -ml-1 rounded text-ink-700 hover:text-ink-950 dark:text-paper-300 dark:hover:text-paper-100"
              aria-label="Toggle navigation drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded bg-academic-800 dark:bg-academic-600 text-white flex items-center justify-center font-serif font-black text-sm shadow-xs">
                T
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm tracking-wide text-ink-950 dark:text-paper-50 leading-tight">
                  TRACHTENBERG
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-academic-700 dark:text-academic-400 leading-none">
                  Speed Mathematics
                </span>
              </div>
            </NavLink>

            {/* Developer Credit Pill */}
            <div
              onClick={() => setIsChaiModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-paper-100 hover:bg-paper-200 dark:bg-ink-800 dark:hover:bg-ink-750 border border-paper-300 dark:border-ink-700 text-xs text-ink-700 dark:text-paper-300 cursor-pointer transition-colors"
              title="Developed with precision & passion by Me. Click to support with a chai!"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Dev: <strong className="text-academic-700 dark:text-academic-400 font-bold">Me</strong></span>
            </div>
          </div>

          {/* Center: Search Trigger (Desktop & Tablet) */}
          <div className="flex-1 max-w-sm hidden md:block">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs bg-paper-100 hover:bg-paper-200/70 dark:bg-ink-850 dark:hover:bg-ink-800 text-ink-500 dark:text-paper-400 rounded-md border border-paper-300 dark:border-ink-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>Search techniques, rules...</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-ink-900 border border-paper-300 dark:border-ink-700 rounded shadow-2xs">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Right: Buy me a Chai, Mastered Stats, Search, Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Buy Me a Chai Button */}
            <button
              onClick={() => setIsChaiModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xs hover:shadow transition-all active:scale-95"
              title="Support developer Me with a cup of chai!"
            >
              <Coffee className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Buy me a chai</span>
              <span className="sm:hidden text-[11px]">Chai ☕</span>
            </button>

            {/* Mastered Badge (Desktop) */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-paper-100 dark:bg-ink-800 border border-paper-200 dark:border-ink-750 text-xs text-ink-700 dark:text-paper-300 font-mono">
              <Award className="w-3.5 h-3.5 text-academic-600 dark:text-academic-400" />
              <span>Mastered: <strong className="text-academic-800 dark:text-academic-300">{masteredCount}</strong>/32</span>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={onOpenSearch}
              className="md:hidden p-1.5 rounded text-ink-600 hover:text-ink-900 dark:text-paper-300 dark:hover:text-paper-100"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 sm:p-2 rounded text-ink-600 hover:text-ink-900 dark:text-paper-300 dark:hover:text-paper-100 hover:bg-paper-100 dark:hover:bg-ink-800 transition-colors"
              aria-label="Toggle theme"
              title={`Switch to ${currentTheme === 'light' ? 'Dark' : 'Light'} theme`}
            >
              {currentTheme === 'light' ? (
                <Moon className="w-4 h-4 text-ink-700 hover:text-ink-950" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Buy Me a Chai Modal */}
      <BuyMeAChaiModal
        isOpen={isChaiModalOpen}
        onClose={() => setIsChaiModalOpen(false)}
      />
    </>
  );
};
