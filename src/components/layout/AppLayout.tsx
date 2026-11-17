import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { SearchModal } from './SearchModal';
import { UserProgress } from '../../types';
import { loadUserProgress, saveUserProgress } from '../../storage/progressStorage';

interface AppLayoutProps {
  children: React.ReactNode;
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  progress,
  onUpdateProgress
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Directly derive theme from progress settings to avoid state desync
  const theme = progress.settings.theme || 'light';

  // Sync theme with DOM documentElement and body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme: 'light' | 'dark' = theme === 'light' ? 'dark' : 'light';
    const updated: UserProgress = {
      ...progress,
      settings: {
        ...progress.settings,
        theme: nextTheme
      }
    };
    onUpdateProgress(updated);
    saveUserProgress(updated);
  };

  return (
    <div className="min-h-screen bg-paper-50 dark:bg-ink-950 text-ink-900 dark:text-paper-100 flex flex-col font-sans transition-colors">
      {/* Top Header */}
      <Header
        progress={progress}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleTheme={handleToggleTheme}
        onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
        currentTheme={theme}
      />

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop / Tablet Sidebar */}
        <Sidebar className="hidden md:flex flex-shrink-0" />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-6 focus:outline-none">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation & Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Quick Search Palette Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};
