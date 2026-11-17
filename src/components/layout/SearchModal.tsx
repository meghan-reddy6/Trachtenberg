import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, ChevronRight } from 'lucide-react';
import { getAllTechniquesList, chapters } from '../../content/curriculum';
import { DifficultyBadge } from '../common/Badge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const allTechs = getAllTechniquesList();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent, or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? allTechs.slice(0, 8)
    : allTechs.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.summary.toLowerCase().includes(query.toLowerCase()) ||
        t.rulesAndProcedure.some(r => r.toLowerCase().includes(query.toLowerCase())) ||
        t.id.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-ink-950/40 backdrop-blur-xs">
      <div
        className="w-full max-w-xl bg-white dark:bg-ink-900 border border-paper-300 dark:border-ink-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-paper-200 dark:border-ink-800">
          <Search className="w-5 h-5 text-ink-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search techniques, rules, chapters... (e.g. 11, Direct Method, Elevens)"
            autoFocus
            className="w-full bg-transparent text-sm text-ink-900 dark:text-paper-100 placeholder-ink-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-ink-400 hover:text-ink-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-mono text-ink-400 bg-paper-100 dark:bg-ink-800 border border-paper-200 dark:border-ink-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-paper-100 dark:divide-ink-850">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-ink-500">
              No matching techniques found for "{query}".
            </div>
          ) : (
            filtered.map(tech => {
              const chapter = chapters.find(c => c.id === tech.chapterId);
              return (
                <div
                  key={tech.id}
                  onClick={() => {
                    navigate(`/technique/${tech.id}`);
                    onClose();
                  }}
                  className="p-3 rounded-lg hover:bg-paper-100 dark:hover:bg-ink-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-academic-700 dark:text-academic-400">
                        Ch. {tech.chapterId}
                      </span>
                      <span className="text-xs text-ink-400">•</span>
                      <DifficultyBadge difficulty={tech.difficulty} />
                      <span className="text-xs text-ink-400 font-mono">{tech.pageRef}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-ink-900 dark:text-white group-hover:text-academic-700 dark:group-hover:text-blue-400 transition-colors">
                      {tech.name}
                    </h4>
                    <p className="text-xs text-ink-500 line-clamp-1 mt-0.5">
                      {tech.summary}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-ink-400 group-hover:text-academic-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-paper-50 dark:bg-ink-850 border-t border-paper-200 dark:border-ink-800 text-[11px] text-ink-500 flex items-center justify-between">
          <span>Search covers all 8 chapters & 30+ techniques</span>
          <span className="font-mono">Press Esc to close</span>
        </div>
      </div>
    </div>
  );
};

