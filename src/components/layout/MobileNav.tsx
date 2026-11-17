import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Dumbbell,
  Zap,
  Library,
  X
} from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Slide-over Drawer for Full Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink-950/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          {/* Drawer Content */}
          <div className="relative w-72 max-w-[85vw] bg-paper-50 dark:bg-ink-900 h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-paper-200 dark:border-ink-800 flex items-center justify-between">
              <span className="font-serif font-bold text-sm tracking-wide text-ink-900 dark:text-paper-100">
                Menu & Chapters
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded text-ink-600 hover:text-ink-900 dark:text-paper-400"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar onNavigate={onClose} />
            </div>
          </div>
        </div>
      )}

      {/* Persistent Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-14 bg-white/95 dark:bg-ink-900/95 backdrop-blur-xs border-t border-paper-200 dark:border-ink-800 flex items-center justify-around px-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-academic-700 dark:text-academic-400 font-semibold' : 'text-ink-500 dark:text-paper-400'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/learn"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-academic-700 dark:text-academic-400 font-semibold' : 'text-ink-500 dark:text-paper-400'
            }`
          }
        >
          <GraduationCap className="w-5 h-5 mb-0.5" />
          <span>Learn</span>
        </NavLink>

        <NavLink
          to="/practice"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-academic-700 dark:text-academic-400 font-semibold' : 'text-ink-500 dark:text-paper-400'
            }`
          }
        >
          <Dumbbell className="w-5 h-5 mb-0.5" />
          <span>Practice</span>
        </NavLink>

        <NavLink
          to="/speed-trainer"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-academic-700 dark:text-academic-400 font-semibold' : 'text-ink-500 dark:text-paper-400'
            }`
          }
        >
          <Zap className="w-5 h-5 mb-0.5" />
          <span>Trainer</span>
        </NavLink>

        <NavLink
          to="/library"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-14 py-1 text-[10px] font-medium transition-colors ${
              isActive ? 'text-academic-700 dark:text-academic-400 font-semibold' : 'text-ink-500 dark:text-paper-400'
            }`
          }
        >
          <Library className="w-5 h-5 mb-0.5" />
          <span>Library</span>
        </NavLink>
      </nav>
    </>
  );
};
