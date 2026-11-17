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
    <aside className={`w-64 bg-paper-50 dark:bg-ink-900 border-r border-paper-200 dark:border-ink-800 flex flex-col h-full overflow-y-auto select-none ${className}`}>
      {/* Navigation Links */}
      <div className="p-3 space-y-1">
        <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-ink-500 font-semibold">
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
                    ? 'bg-academic-700 text-white shadow-xs font-semibold dark:bg-academic-600'
                    : 'text-ink-700 hover:text-ink-950 hover:bg-paper-200/60 dark:text-paper-300 dark:hover:text-paper-50 dark:hover:bg-ink-800'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="my-2 border-t border-paper-200 dark:border-ink-800" />

      {/* Chapters Quick Links */}
      <div className="p-3 flex-1">
        <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-ink-500 font-semibold flex items-center justify-between">
          <span>Chapters</span>
          <span className="text-[10px] text-ink-400">8 Units</span>
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
                    ? 'bg-paper-200 dark:bg-ink-800 text-academic-800 dark:text-academic-300 font-semibold'
                    : 'text-ink-600 hover:text-ink-900 dark:text-paper-400 dark:hover:text-paper-200'
                }`
              }
            >
              <span className="truncate pr-2">
                <span className="font-mono text-[11px] opacity-75 mr-1.5">Ch. {ch.id}</span>
                {ch.title}
              </span>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </NavLink>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-paper-200 dark:border-ink-800 text-[11px] text-ink-500 font-serif italic text-center">
        The Trachtenberg Speed System
        <div className="font-sans font-normal text-[10px] not-italic text-ink-400 mt-0.5">
          Based on Cutler & McShane (1960)
        </div>
      </div>
    </aside>
  );
};
