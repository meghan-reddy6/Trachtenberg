import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { chapters, allTechniques } from '../content/curriculum';
import { UserProgress } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';

interface ChaptersPageProps {
  progress: UserProgress;
}

export const ChaptersPage: React.FC<ChaptersPageProps> = ({ progress }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-paper-200 dark:border-ink-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-academic-700 dark:text-academic-400 font-semibold">
          Curriculum Structure
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-paper-50 mt-1">
          The Trachtenberg System: 8 Core Chapters
        </h1>
        <p className="text-sm text-ink-600 dark:text-paper-300 mt-1 max-w-3xl leading-relaxed">
          Comprehensive curriculum reconstructed with verified historical fidelity from the 1960 Cutler & McShane treatise. Progress from basic single-digit keys through the Direct Method, Two-Finger method, Addition, Division, Square Roots, and Algebraic Proofs.
        </p>
      </div>

      {/* Chapters List */}
      <div className="space-y-6">
        {chapters.map(chapter => {
          const techIds = chapter.techniqueIds;
          const completedInChapter = techIds.filter(id => progress.completedTechniqueIds.includes(id)).length;
          const pct = Math.round((completedInChapter / techIds.length) * 100);

          return (
            <Card key={chapter.id} className="p-6 transition-all hover:border-paper-400 dark:hover:border-ink-700">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-paper-200 dark:border-ink-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-academic-700 dark:text-academic-400">
                      Chapter {chapter.numberString}
                    </span>
                    <span className="text-xs text-ink-400">•</span>
                    <span className="text-xs text-ink-500 font-mono">{chapter.pageRange}</span>
                    <span className="text-xs text-ink-400">•</span>
                    <span className="text-xs text-ink-500">{techIds.length} techniques</span>
                  </div>
                  <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-paper-100">
                    {chapter.title}
                  </h2>
                  <div className="text-xs font-medium text-academic-800 dark:text-academic-300 mt-0.5">
                    {chapter.subtitle}
                  </div>
                </div>

                {/* Progress in Chapter */}
                <div className="flex items-center gap-4 lg:w-64 flex-shrink-0">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-ink-500 font-mono mb-1">
                      <span>Progress</span>
                      <span>{completedInChapter}/{techIds.length} ({pct}%)</span>
                    </div>
                    <ProgressBar value={completedInChapter} max={techIds.length} size="sm" />
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/learn/${chapter.id}`)}
                    className="flex-shrink-0"
                  >
                    Open <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Introduction & Objectives */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-ink-600 dark:text-paper-300">
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-ink-500 mb-1.5 font-semibold">
                    Overview
                  </h4>
                  <p className="leading-relaxed">
                    {chapter.introduction}
                  </p>
                  {chapter.historicalContext && (
                    <div className="mt-2.5 p-2.5 rounded bg-paper-100 dark:bg-ink-800/80 border border-paper-200 dark:border-ink-750 italic text-[11px] text-ink-700 dark:text-paper-300">
                      <strong>Historical note:</strong> {chapter.historicalContext}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-ink-500 mb-1.5 font-semibold">
                    Learning Objectives
                  </h4>
                  <ul className="space-y-1">
                    {chapter.learningObjectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-academic-600 font-bold">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Techniques pills */}
              <div className="mt-4 pt-3 border-t border-paper-200 dark:border-ink-800 flex flex-wrap gap-1.5">
                {techIds.map(techId => {
                  const tech = allTechniques[techId];
                  if (!tech) return null;
                  const isDone = progress.completedTechniqueIds.includes(techId);
                  return (
                    <button
                      key={techId}
                      onClick={() => navigate(`/technique/${techId}`)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors border ${
                        isDone
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                          : 'bg-paper-100 hover:bg-paper-200 text-ink-700 border-paper-300 dark:bg-ink-800 dark:hover:bg-ink-700 dark:text-paper-300 dark:border-ink-700'
                      }`}
                    >
                      {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      <span>{tech.shortName}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
