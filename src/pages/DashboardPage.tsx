import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Dumbbell,
  Zap,
  Target,
  Sparkles,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { UserProgress } from '../types';
import { chapters, allTechniques, getTechnique, getAllTechniquesList } from '../content/curriculum';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { DifficultyBadge, MasteryBadge } from '../components/common/Badge';

interface DashboardPageProps {
  progress: UserProgress;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ progress }) => {
  const navigate = useNavigate();

  const allTechs = getAllTechniquesList();
  const totalTechniques = allTechs.length;
  const completedCount = progress.completedTechniqueIds.length;
  const masteredCount = Object.values(progress.mastery).filter(m => m.level === 'mastered').length;
  const proficientCount = Object.values(progress.mastery).filter(m => m.level === 'proficient').length;

  // Current technique
  const currentTech = getTechnique(progress.currentTechniqueId) || allTechs[0];
  const currentChapter = chapters.find(c => c.id === currentTech.chapterId) || chapters[0];

  // Calculate overall statistics
  const masteryValues = Object.values(progress.mastery);
  const totalAttempts = masteryValues.reduce((acc, curr) => acc + curr.attempts, 0);
  const totalCorrect = masteryValues.reduce((acc, curr) => acc + curr.correct, 0);
  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  
  // Calculate average calculation speed
  const validTimes = masteryValues.filter(m => m.averageTimeMs > 0);
  const avgTimeSec = validTimes.length > 0
    ? (validTimes.reduce((acc, curr) => acc + curr.averageTimeMs, 0) / validTimes.length / 1000).toFixed(1)
    : '0.0';

  // Identify weak areas (accuracy < 70% with at least 3 attempts)
  const weakAreas = Object.entries(progress.mastery)
    .filter(([_, data]) => data.attempts >= 3 && (data.correct / data.attempts) < 0.7)
    .map(([id]) => getTechnique(id))
    .filter(Boolean) as typeof allTechs;

  // Recently practiced techniques
  const recentlyStudied = Object.entries(progress.mastery)
    .sort((a, b) => new Date(b[1].lastPracticed).getTime() - new Date(a[1].lastPracticed).getTime())
    .slice(0, 4)
    .map(([id]) => getTechnique(id))
    .filter(Boolean) as typeof allTechs;

  // Recommended next lesson: first uncompleted technique
  const recommendedTech = allTechs.find(t => !progress.completedTechniqueIds.includes(t.id)) || currentTech;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Welcome & Continue Learning Hero Banner */}
      <div className="bg-paper-100 dark:bg-ink-900 border border-paper-300 dark:border-ink-800 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-academic-100 dark:bg-academic-950/60 border border-academic-200 dark:border-academic-800 text-xs font-semibold text-academic-800 dark:text-academic-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Professor Jakow Trachtenberg's System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-paper-50 tracking-tight">
            Mathematics without Memorized Tables
          </h1>
          <p className="text-sm text-ink-700 dark:text-paper-300 leading-relaxed font-sans">
            Replace mechanical rote drilling with structural pattern perception. Learn to multiply, divide, and extract roots with remarkable speed and verified precision.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(`/technique/${currentTech.id}`)}
              className="gap-2"
            >
              <span>Continue Learning: {currentTech.shortName}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/practice')}
              className="gap-2"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Daily Practice Drill</span>
            </Button>
          </div>
        </div>

        {/* Current Progress Ring / Summary Card */}
        <div className="bg-white dark:bg-ink-850 border border-paper-200 dark:border-ink-800 p-5 rounded-lg w-full md:w-64 flex-shrink-0 z-10 space-y-3">
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>CURRICULUM MASTERY</span>
            <span>{Math.round((completedCount / totalTechniques) * 100)}%</span>
          </div>
          <ProgressBar value={completedCount} max={totalTechniques} size="md" variant="academic" />
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <div className="bg-paper-50 dark:bg-ink-900 p-2 rounded border border-paper-200 dark:border-ink-800">
              <span className="text-ink-500 block text-[10px] uppercase font-mono">Completed</span>
              <strong className="text-base font-serif text-ink-900 dark:text-paper-100">{completedCount}</strong>
              <span className="text-ink-400 text-[10px]"> / {totalTechniques}</span>
            </div>
            <div className="bg-paper-50 dark:bg-ink-900 p-2 rounded border border-paper-200 dark:border-ink-800">
              <span className="text-ink-500 block text-[10px] uppercase font-mono">Mastered</span>
              <strong className="text-base font-serif text-emerald-700 dark:text-emerald-400">{masteredCount}</strong>
              <span className="text-ink-400 text-[10px]"> / {totalTechniques}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-academic-100 dark:bg-academic-950/60 text-academic-800 dark:text-academic-300 flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-ink-500 font-mono uppercase">Calculations Solved</div>
            <div className="text-xl font-bold font-serif text-ink-900 dark:text-paper-100">{totalAttempts}</div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-ink-500 font-mono uppercase">Overall Accuracy</div>
            <div className="text-xl font-bold font-serif text-ink-900 dark:text-paper-100">{overallAccuracy}%</div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-ink-500 font-mono uppercase">Avg Speed / Digit</div>
            <div className="text-xl font-bold font-serif text-ink-900 dark:text-paper-100">{avgTimeSec}s</div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-ink-500 font-mono uppercase">Proficient Techniques</div>
            <div className="text-xl font-bold font-serif text-ink-900 dark:text-paper-100">{proficientCount + masteredCount}</div>
          </div>
        </Card>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Current Chapter & Recommended Next Lesson */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Chapter Section */}
          <div className="bg-white dark:bg-ink-850 border border-paper-300 dark:border-ink-800 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3 border-b border-paper-200 dark:border-ink-800 pb-2">
              <div>
                <span className="text-xs font-mono text-academic-700 dark:text-academic-400 font-semibold uppercase">
                  Current Chapter {currentChapter.id}
                </span>
                <h2 className="text-lg font-serif font-bold text-ink-900 dark:text-paper-100">
                  {currentChapter.title}
                </h2>
              </div>
              <Link
                to={`/learn/${currentChapter.id}`}
                className="text-xs text-academic-700 dark:text-academic-400 font-medium hover:underline flex items-center gap-1"
              >
                <span>Read Chapter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-xs text-ink-600 dark:text-paper-300 leading-relaxed mb-4">
              {currentChapter.introduction}
            </p>

            {/* Techniques in this chapter preview */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-ink-500 uppercase tracking-wider block">
                Chapter Techniques:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentChapter.techniqueIds.slice(0, 4).map(techId => {
                  const tech = allTechniques[techId];
                  if (!tech) return null;
                  const isDone = progress.completedTechniqueIds.includes(techId);
                  const isCurr = techId === currentTech.id;
                  return (
                    <div
                      key={techId}
                      onClick={() => navigate(`/technique/${techId}`)}
                      className={`p-2.5 rounded border text-xs cursor-pointer transition-colors flex items-center justify-between ${
                        isCurr
                          ? 'border-academic-500 bg-academic-50/50 dark:bg-academic-950/30'
                          : 'border-paper-200 dark:border-ink-800 hover:bg-paper-100 dark:hover:bg-ink-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-paper-400 dark:border-ink-600 flex-shrink-0" />
                        )}
                        <span className="font-medium truncate">{tech.shortName}</span>
                      </div>
                      <DifficultyBadge difficulty={tech.difficulty} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recommended Next Lesson Card */}
          <div className="bg-paper-100 dark:bg-ink-900 border border-paper-300 dark:border-ink-800 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-academic-700 dark:text-academic-400 font-bold">
                Recommended Next Technique
              </span>
              <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100">
                {recommendedTech.name}
              </h3>
              <p className="text-xs text-ink-600 dark:text-paper-400 line-clamp-1">
                {recommendedTech.summary}
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`/technique/${recommendedTech.id}`)}
              className="flex-shrink-0"
            >
              Start Lesson <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          {/* Recently Studied Section */}
          {recentlyStudied.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-ink-500 font-semibold">
                Recently Practiced
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recentlyStudied.map(tech => {
                  const data = progress.mastery[tech.id];
                  return (
                    <Card
                      key={tech.id}
                      hoverable
                      onClick={() => navigate(`/technique/${tech.id}`)}
                      className="p-3.5"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-ink-400">Ch. {tech.chapterId}</span>
                        <MasteryBadge level={data?.level || 'learning'} />
                      </div>
                      <h4 className="text-sm font-semibold text-ink-900 dark:text-paper-100 truncate">
                        {tech.shortName}
                      </h4>
                      <div className="text-[11px] text-ink-500 mt-1 font-mono">
                        {data?.correct || 0} / {data?.attempts || 0} correct • {data?.averageTimeMs ? (data.averageTimeMs / 1000).toFixed(1) : '0'}s avg
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Column: Daily Practice, Weak Areas, Speed Trainer Teaser */}
        <div className="space-y-6">
          {/* Daily Practice Challenge */}
          <Card className="p-5 bg-gradient-to-br from-paper-50 to-paper-100 dark:from-ink-900 dark:to-ink-850 border-paper-300 dark:border-ink-800">
            <div className="flex items-center gap-2 text-academic-700 dark:text-academic-400 mb-2">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold">Daily Speed Drill</span>
            </div>
            <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100 mb-1">
              5-Minute Arithmetic Focus
            </h3>
            <p className="text-xs text-ink-600 dark:text-paper-400 mb-4 leading-relaxed">
              Maintain neuromuscular reflexes: solve 10 mixed single-digit key calculations without verbal counting.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/practice')}
              className="w-full justify-center"
            >
              Start Daily Practice
            </Button>
          </Card>

          {/* Weak Areas / Need Revision */}
          <div className="bg-white dark:bg-ink-850 border border-paper-300 dark:border-ink-800 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-ink-500 font-semibold flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" />
                Focus & Revision Areas
              </h3>
              <Link to="/revision" className="text-xs text-academic-700 dark:text-academic-400 hover:underline">
                View all
              </Link>
            </div>
            {weakAreas.length === 0 ? (
              <div className="py-6 text-center text-xs text-ink-500">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1 opacity-80" />
                No weak areas detected! Keep up the consistent practice.
              </div>
            ) : (
              <div className="space-y-2">
                {weakAreas.slice(0, 3).map(tech => (
                  <div
                    key={tech.id}
                    onClick={() => navigate(`/technique/${tech.id}`)}
                    className="p-2 rounded border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 text-xs cursor-pointer hover:bg-rose-100/50 transition-colors"
                  >
                    <div className="font-semibold text-rose-900 dark:text-rose-200 truncate">
                      {tech.shortName}
                    </div>
                    <div className="text-[11px] text-rose-700 dark:text-rose-400 font-mono">
                      Accuracy under 70% • Click to drill
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Speed Trainer Shortcut */}
          <Card className="p-4 text-center">
            <h4 className="text-xs font-mono uppercase tracking-wider text-ink-500 mb-1">
              Reflex Speed Trainer
            </h4>
            <p className="text-xs text-ink-600 dark:text-paper-400 mb-3">
              Measure your calculations per minute against personal records.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/speed-trainer')}
              className="w-full justify-center"
            >
              Open Speed Trainer
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

