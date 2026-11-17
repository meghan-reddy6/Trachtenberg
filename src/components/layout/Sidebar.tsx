import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Library,
  Dumbbell,
  Zap,
  RotateCcw,
  CheckSquare,
  BarChart2,
  Settings,
  ChevronRight
} from 'lucide-react';
import { chapters } from '../../content/curriculum';

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '', onNavigate }) => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Learn', path: '/learn', icon: GraduationCap },
    { label: 'Chapters', path: '/chapters', icon: BookOpen },
    { label: 'Technique Library', path: '/library', icon: Library },
    { label: 'Practice', path: '/practice', icon: Dumbbell },
    { label: 'Speed Trainer', path: '/speed-trainer', icon: Zap },
    { label: 'Revision', path: '/revision', icon: RotateCcw },
    { label: 'Assessments', path: '/assessments', icon: CheckSquare },
    { label: 'Progress', path: '/progress', icon: BarChart2 },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className={`w-64 bg-paper-50 dark:bg-slate-900 border-r border-paper-200 dark:border-slate-800 flex flex-col h-full overflow-y-auto select-none ${className}`}>
      {/* Navigation Links */}
      <div className="p-3 space-y-1">
        <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-ink-500 dark:text-slate-400 font-semibold">
          Curriculum
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-academic-700 text-white shadow-xs font-semibold dark:bg-blue-600 dark:text-white dark:shadow-sm dark:shadow-blue-900/40'
                    : 'text-ink-700 hover:text-ink-950 hover:bg-paper-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="my-2 border-t border-paper-200 dark:border-slate-800" />

      {/* Chapters Quick Links */}
      <div className="p-3 flex-1">
        <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-ink-500 dark:text-slate-400 font-semibold flex items-center justify-between">
          <span>Chapters</span>
          <span className="text-[10px] text-ink-400 dark:text-slate-500">8 Units</span>
        </div>
        <div className="space-y-0.5 mt-1">
          {chapters.map(ch => (
            <NavLink
              key={ch.id}
              to={`/learn/${ch.id}`}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-1.5 rounded text-xs transition-colors group ${
                  isActive
                    ? 'bg-paper-200 dark:bg-blue-950/40 text-academic-800 dark:text-blue-300 font-semibold border-l-2 border-academic-600 dark:border-blue-400'
                    : 'text-ink-600 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50'
                }`
              }
            >
              <span className="truncate pr-2">
                <span className="font-mono text-[11px] opacity-75 mr-1.5 dark:text-slate-400">Ch. {ch.id}</span>
                {ch.title}
              </span>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-slate-400" />
            </NavLink>
          ))}
        </div>
      </div>

      {/* Footer Info & Developer Credits */}
      <div className="p-3.5 border-t border-paper-200 dark:border-slate-800 text-[11px] text-ink-500 dark:text-slate-400 text-center space-y-1.5">
        <div className="font-serif italic text-ink-700 dark:text-slate-200">
          The Trachtenberg Speed System
        </div>
        <div className="font-sans text-[10px] text-ink-400 dark:text-slate-400">
          Curated & engineered by{' '}
          <a
            href="https://github.com/meghan-reddy6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-academic-700 dark:text-blue-400 font-bold hover:underline"
          >
            Meghan (@meghan-reddy6)
          </a>
          {' · '}
          <span className="font-mono text-[9px] uppercase tracking-wider text-ink-400 dark:text-slate-500">MIT License</span>
        </div>
        <div>
          <a
            href="https://www.buymeachai.in/meghansai6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-400 hover:underline"
          >
            <span>Buy Me a Chai ☕</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
