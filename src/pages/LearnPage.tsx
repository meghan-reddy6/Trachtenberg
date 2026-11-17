import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, ArrowRight, Award, CheckSquare, Sparkles } from 'lucide-react';
import { chapters, getTechniquesByChapter } from '../content/curriculum';
import { UserProgress } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { DifficultyBadge, MasteryBadge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';

interface LearnPageProps {
  progress: UserProgress;
}

export const LearnPage: React.FC<LearnPageProps> = ({ progress }) => {
  const { chapterId } = useParams<{ chapterId?: string }>();
  const navigate = useNavigate();

  const activeChapterId = chapterId ? parseInt(chapterId, 10) : 1;
  const currentChapter = chapters.find(c => c.id === activeChapterId) || chapters[0];
  const chapterTechniques = getTechniquesByChapter(currentChapter.id);

  const completedInChapter = chapterTechniques.filter(t => progress.completedTechniqueIds.includes(t.id)).length;
  const pct = chapterTechniques.length > 0 ? Math.round((completedInChapter / chapterTechniques.length) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Chapter Selector Tabs */}
      <div className="border-b border-paper-200 dark:border-ink-800 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {chapters.map(ch => {
            const isActive = ch.id === currentChapter.id;
            return (
              <button
                key={ch.id}
                onClick={() => navigate(`/learn/${ch.id}`)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-academic-700 text-white font-semibold dark:bg-academic-600 shadow-xs'
                    : 'bg-paper-100 hover:bg-paper-200 text-ink-700 dark:bg-ink-850 dark:hover:bg-ink-800 dark:text-paper-300'
                }`}
              >
                <span>Ch. {ch.id}</span>
                <span className="hidden sm:inline font-serif opacity-90 truncate max-w-[120px]">
                  {ch.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapter Overview Card */}
      <div className="bg-white dark:bg-ink-850 border border-paper-300 dark:border-ink-800 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-paper-200 dark:border-ink-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-academic-700 dark:text-academic-400">
                Chapter {currentChapter.numberString}
              </span>
              <span className="text-xs text-ink-400">•</span>
              <span className="text-xs text-ink-500 font-mono">{currentChapter.pageRange}</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-ink-950 dark:text-paper-50">
              {currentChapter.title}
            </h1>
            <p className="text-xs font-medium text-academic-800 dark:text-academic-300 mt-0.5">
              {currentChapter.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/assessments?chapter=${currentChapter.id}`)}
              className="gap-1.5"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Chapter Test</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-2 text-xs text-ink-700 dark:text-paper-300 space-y-3 leading-relaxed">
            <p>{currentChapter.introduction}</p>
            {currentChapter.historicalContext && (
              <div className="p-3 rounded bg-paper-100 dark:bg-ink-900 border border-paper-200 dark:border-ink-800 text-[11px] text-ink-700 dark:text-paper-300">
                <strong className="text-academic-700 dark:text-academic-400">Historical Background:</strong> {currentChapter.historicalContext}
              </div>
            )}
          </div>

          {/* Chapter Progress Box */}
          <div className="bg-paper-50 dark:bg-ink-900 p-4 rounded-lg border border-paper-200 dark:border-ink-800 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-500 font-semibold block">
              Chapter Completion
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-serif font-bold text-ink-900 dark:text-paper-100">{pct}%</span>
              <span className="text-xs text-ink-500 font-mono">{completedInChapter} / {chapterTechniques.length} done</span>
            </div>
            <ProgressBar value={completedInChapter} max={chapterTechniques.length} size="sm" />
          </div>
        </div>
      </div>

      {/* Techniques List Header */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100">
          Techniques in this Chapter ({chapterTechniques.length})
        </h2>
        <span className="text-xs text-ink-500">
          Click any technique to enter the interactive workspace
        </span>
      </div>

      {/* Techniques Grid */}
      <div className="space-y-4">
        {chapterTechniques.map((tech, index) => {
          const isDone = progress.completedTechniqueIds.includes(tech.id);
          const mastery = progress.mastery[tech.id];

          return (
            <Card
              key={tech.id}
              hoverable
              onClick={() => navigate(`/technique/${tech.id}`)}
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
            >
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-academic-700 dark:text-academic-400">
                    #{index + 1}
                  </span>
                  <DifficultyBadge difficulty={tech.difficulty} />
                  <span className="text-xs text-ink-400 font-mono">{tech.pageRef}</span>
                  {isDone && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  )}
                </div>

                <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100">
                  {tech.name}
                </h3>

                <p className="text-xs text-ink-600 dark:text-paper-300 leading-relaxed max-w-3xl">
                  {tech.summary}
                </p>

                {/* Primary rule quote preview */}
                {tech.rulesAndProcedure.length > 0 && (
                  <div className="inline-block text-[11px] font-mono bg-paper-100 dark:bg-ink-900 text-ink-800 dark:text-paper-200 px-2 py-0.5 rounded border border-paper-200 dark:border-ink-800">
                    Rule 1: {tech.rulesAndProcedure[0]}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 md:flex-col md:items-end flex-shrink-0">
                <MasteryBadge level={mastery?.level || (isDone ? 'proficient' : 'not-started')} />
                <Button variant="outline" size="sm" className="gap-1 mt-1">
                  <span>Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

