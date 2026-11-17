import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, AlertTriangle, Calendar, Award, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { UserProgress } from '../types';
import { getAllTechniquesList, getTechnique } from '../content/curriculum';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { DifficultyBadge, MasteryBadge } from '../components/common/Badge';

interface RevisionPageProps {
  progress: UserProgress;
}

export const RevisionPage: React.FC<RevisionPageProps> = ({ progress }) => {
  const navigate = useNavigate();
  const allTechniques = getAllTechniquesList();

  // 1. Spaced Repetition Due (last practiced > 3 days ago or never practiced completed techniques)
  const now = Date.now();
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;

  const dueForReview = Object.entries(progress.mastery)
    .filter(([_, data]) => {
      const elapsed = now - new Date(data.lastPracticed).getTime();
      return elapsed > threeDaysMs;
    })
    .map(([id]) => getTechnique(id))
    .filter(Boolean) as typeof allTechniques;

  // 2. Weak Areas: Accuracy < 75% with at least 3 attempts
  const weakAreas = Object.entries(progress.mastery)
    .filter(([_, data]) => data.attempts >= 3 && (data.correct / data.attempts) < 0.75)
    .sort((a, b) => (a[1].correct / a[1].attempts) - (b[1].correct / b[1].attempts))
    .map(([id]) => ({
      technique: getTechnique(id)!,
      data: progress.mastery[id]
    }))
    .filter(item => Boolean(item.technique));

  // 3. Slowest Techniques
  const slowestTechniques = Object.entries(progress.mastery)
    .filter(([_, data]) => data.attempts >= 2 && data.averageTimeMs > 6000)
    .sort((a, b) => b[1].averageTimeMs - a[1].averageTimeMs)
    .map(([id]) => ({
      technique: getTechnique(id)!,
      data: progress.mastery[id]
    }))
    .filter(item => Boolean(item.technique));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-paper-200 dark:border-ink-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-academic-700 dark:text-academic-400 font-semibold flex items-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" /> Spaced Repetition & Retention
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-paper-50 mt-1">
          Revision & Weak Area Drills
        </h1>
        <p className="text-sm text-ink-600 dark:text-paper-300 mt-1 leading-relaxed max-w-3xl">
          Professor Trachtenberg emphasized that arithmetic speed relies on neuromuscular reflexes. Periodic spaced revision ensures calculating patterns remain second nature.
        </p>
      </div>

      {/* Smart Revision Recommendation Banner */}
      <div className="bg-academic-50/70 dark:bg-academic-950/30 border border-academic-200 dark:border-academic-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-academic-800 dark:text-academic-300">
            Recommended Action
          </div>
          <h3 className="text-lg font-serif font-bold text-ink-950 dark:text-paper-50">
            {weakAreas.length > 0
              ? `Targeted Drill: ${weakAreas[0].technique.name}`
              : dueForReview.length > 0
              ? `Spaced Refresh: ${dueForReview[0].name}`
              : 'Maintenance Drill: Practice Mixed Single-Digit Keys'}
          </h3>
          <p className="text-xs text-ink-700 dark:text-paper-300 leading-relaxed">
            {weakAreas.length > 0
              ? 'Strengthen accuracy on this technique before your mistakes solidify into subconscious habits.'
              : 'Reinforce mental reflexes to keep your calculation speed sharp.'}
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => {
            const targetId = weakAreas[0]?.technique.id || dueForReview[0]?.id || 'tech-101';
            navigate(`/practice?technique=${targetId}`);
          }}
          className="flex-shrink-0"
        >
          Start Targeted Drill <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>

      {/* 2-Column Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Weak Areas */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Focus Areas (Accuracy &lt; 75%)
            </h2>
            <span className="text-xs font-mono text-ink-400">{weakAreas.length} flagged</span>
          </div>

          {weakAreas.length === 0 ? (
            <Card className="p-6 text-center text-xs text-ink-500 space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
              <p>All practiced techniques currently maintain &ge; 75% accuracy.</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {weakAreas.map(({ technique, data }) => {
                const acc = Math.round((data.correct / data.attempts) * 100);
                return (
                  <Card
                    key={technique.id}
                    hoverable
                    onClick={() => navigate(`/practice?technique=${technique.id}`)}
                    className="p-3.5 flex items-center justify-between border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20"
                  >
                    <div>
                      <div className="text-xs font-mono text-ink-500">Ch. {technique.chapterId}</div>
                      <h4 className="text-sm font-semibold text-ink-900 dark:text-paper-100">
                        {technique.shortName}
                      </h4>
                      <div className="text-xs text-rose-700 dark:text-rose-400 font-mono mt-0.5">
                        {acc}% accuracy ({data.correct}/{data.attempts} correct)
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      Drill <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Section 2: Spaced Repetition Due */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Due for Spaced Review (&gt; 3 Days)
            </h2>
            <span className="text-xs font-mono text-ink-400">{dueForReview.length} due</span>
          </div>

          {dueForReview.length === 0 ? (
            <Card className="p-6 text-center text-xs text-ink-500 space-y-2">
              <CheckCircle2 className="w-6 h-6 text-sky-600 mx-auto" />
              <p>All techniques have been refreshed recently!</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {dueForReview.map(tech => (
                <Card
                  key={tech.id}
                  hoverable
                  onClick={() => navigate(`/technique/${tech.id}`)}
                  className="p-3.5 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-mono text-ink-400">Ch. {tech.chapterId}</div>
                    <h4 className="text-sm font-semibold text-ink-900 dark:text-paper-100">
                      {tech.shortName}
                    </h4>
                    <p className="text-xs text-ink-500 line-clamp-1">{tech.summary}</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Review
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
