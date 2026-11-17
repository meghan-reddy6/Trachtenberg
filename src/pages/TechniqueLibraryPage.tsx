import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Bookmark, BookOpen, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { getAllTechniquesList, chapters } from '../content/curriculum';
import { UserProgress, Difficulty, MasteryLevel } from '../types';
import { DifficultyBadge, MasteryBadge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

interface TechniqueLibraryPageProps {
  progress: UserProgress;
}

export const TechniqueLibraryPage: React.FC<TechniqueLibraryPageProps> = ({ progress }) => {
  const navigate = useNavigate();
  const allTechniques = getAllTechniquesList();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedMastery, setSelectedMastery] = useState<MasteryLevel | 'all'>('all');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  const filteredTechniques = useMemo(() => {
    return allTechniques.filter(tech => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tech.name.toLowerCase().includes(q) || tech.shortName.toLowerCase().includes(q);
        const matchesSummary = tech.summary.toLowerCase().includes(q);
        const matchesRule = tech.rulesAndProcedure.some(r => r.toLowerCase().includes(q));
        if (!matchesName && !matchesSummary && !matchesRule) return false;
      }

      // Chapter filter
      if (selectedChapter !== 'all' && tech.chapterId !== selectedChapter) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && tech.difficulty !== selectedDifficulty) {
        return false;
      }

      // Bookmarked filter
      if (bookmarkedOnly && !progress.bookmarkedTechniqueIds.includes(tech.id)) {
        return false;
      }

      // Mastery filter
      if (selectedMastery !== 'all') {
        const mastery = progress.mastery[tech.id]?.level || 'not-started';
        if (mastery !== selectedMastery) return false;
      }

      return true;
    });
  }, [allTechniques, searchQuery, selectedChapter, selectedDifficulty, selectedMastery, bookmarkedOnly, progress]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedChapter('all');
    setSelectedDifficulty('all');
    setSelectedMastery('all');
    setBookmarkedOnly(false);
  };

  const hasActiveFilters = searchQuery !== '' || selectedChapter !== 'all' || selectedDifficulty !== 'all' || selectedMastery !== 'all' || bookmarkedOnly;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-paper-200 dark:border-ink-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-academic-700 dark:text-academic-400 font-semibold">
          Complete Inventory
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-paper-50 mt-1">
          Technique Library
        </h1>
        <p className="text-sm text-ink-600 dark:text-paper-300 mt-1">
          Browse, filter, and master all {allTechniques.length} mathematical keys, speed algorithms, and verification routines from the Trachtenberg System.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-ink-850 p-4 rounded-xl border border-paper-300 dark:border-ink-800 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-ink-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, rule, or concept (e.g. 11, Direct Method, Two-Finger, Square Root)..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-paper-50 dark:bg-ink-900 border border-paper-300 dark:border-ink-700 rounded-lg text-ink-900 dark:text-paper-100 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-academic-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 p-0.5 text-ink-400 hover:text-ink-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Selectors Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          {/* Chapter Filter */}
          <select
            value={selectedChapter}
            onChange={e => setSelectedChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-2.5 py-1.5 bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded-md text-ink-800 dark:text-paper-200"
          >
            <option value="all">All Chapters (1–8)</option>
            {chapters.map(c => (
              <option key={c.id} value={c.id}>Ch. {c.id}: {c.title.split(' ')[0]}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value as any)}
            className="px-2.5 py-1.5 bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded-md text-ink-800 dark:text-paper-200"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>

          {/* Mastery Filter */}
          <select
            value={selectedMastery}
            onChange={e => setSelectedMastery(e.target.value as any)}
            className="px-2.5 py-1.5 bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded-md text-ink-800 dark:text-paper-200"
          >
            <option value="all">All Mastery Levels</option>
            <option value="not-started">Not Started</option>
            <option value="learning">Learning</option>
            <option value="practising">Practising</option>
            <option value="proficient">Proficient</option>
            <option value="mastered">Mastered</option>
          </select>

          {/* Bookmarked Filter Toggle */}
          <button
            onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            className={`px-3 py-1.5 rounded-md border flex items-center gap-1.5 transition-colors ${
              bookmarkedOnly
                ? 'bg-academic-700 text-white border-academic-800 dark:bg-academic-600'
                : 'bg-paper-100 text-ink-700 border-paper-300 dark:bg-ink-800 dark:text-paper-300 dark:border-ink-700 hover:bg-paper-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Bookmarked ({progress.bookmarkedTechniqueIds.length})</span>
          </button>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-academic-700 dark:text-academic-400 hover:underline px-2"
            >
              Reset all
            </button>
          )}

          <div className="ml-auto text-xs text-ink-500 font-mono">
            Showing <strong>{filteredTechniques.length}</strong> of {allTechniques.length}
          </div>
        </div>
      </div>

      {/* Techniques Grid */}
      {filteredTechniques.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-white dark:bg-ink-850 rounded-xl border border-paper-300 dark:border-ink-800">
          <BookOpen className="w-8 h-8 text-ink-400 mx-auto" />
          <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100">
            No Techniques Found
          </h3>
          <p className="text-xs text-ink-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing filters to see all available techniques.
          </p>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTechniques.map(tech => {
            const isBookmarked = progress.bookmarkedTechniqueIds.includes(tech.id);
            const mastery = progress.mastery[tech.id];

            return (
              <Card
                key={tech.id}
                hoverable
                onClick={() => navigate(`/technique/${tech.id}`)}
                className="p-4 flex flex-col justify-between group transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold text-academic-700 dark:text-academic-400">
                        Ch. {tech.chapterId}
                      </span>
                      <span className="text-xs text-ink-300 dark:text-ink-700">•</span>
                      <DifficultyBadge difficulty={tech.difficulty} />
                    </div>
                    {isBookmarked && (
                      <Bookmark className="w-3.5 h-3.5 text-academic-600 fill-academic-600 flex-shrink-0" />
                    )}
                  </div>

                  <h3 className="text-sm font-serif font-bold text-ink-900 dark:text-paper-100 group-hover:text-academic-700 dark:group-hover:text-academic-400 transition-colors line-clamp-2">
                    {tech.name}
                  </h3>

                  <p className="text-xs text-ink-600 dark:text-paper-400 line-clamp-2 leading-relaxed">
                    {tech.summary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-paper-200 dark:border-ink-800 flex items-center justify-between text-xs">
                  <MasteryBadge level={mastery?.level || 'not-started'} />
                  <span className="text-[11px] font-mono text-ink-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    {tech.pageRef} <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
