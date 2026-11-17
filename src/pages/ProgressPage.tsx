import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { Award, Target, CheckCircle2, Clock, Zap, BookOpen } from 'lucide-react';
import { UserProgress, MasteryLevel } from '../types';
import { getAllTechniquesList, chapters } from '../content/curriculum';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';

interface ProgressPageProps {
  progress: UserProgress;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ progress }) => {
  const allTechniques = getAllTechniquesList();
  const totalTechniques = allTechniques.length;

  // 1. Mastery Breakdown Counts
  const counts: Record<MasteryLevel, number> = {
    'not-started': 0,
    learning: 0,
    practising: 0,
    proficient: 0,
    mastered: 0
  };

  allTechniques.forEach(tech => {
    const level = progress.mastery[tech.id]?.level || 'not-started';
    counts[level] = (counts[level] || 0) + 1;
  });

  const pieData = [
    { name: 'Mastered', value: counts.mastered, color: '#059669' },
    { name: 'Proficient', value: counts.proficient, color: '#0d9488' },
    { name: 'Practising', value: counts.practising, color: '#0284c7' },
    { name: 'Learning', value: counts.learning, color: '#1e3a8a' },
    { name: 'Not Started', value: counts['not-started'], color: '#94a3b8' }
  ].filter(d => d.value > 0);

  // 2. Chapter Progress Breakdown
  const chapterData = chapters.map(ch => {
    const techs = ch.techniqueIds;
    const completed = techs.filter(id => progress.completedTechniqueIds.includes(id)).length;
    return {
      chapter: `Ch. ${ch.id}`,
      completed,
      total: techs.length,
      pct: Math.round((completed / techs.length) * 100)
    };
  });

  // 3. Overall Aggregate Metrics
  const masteryValues = Object.values(progress.mastery);
  const totalAttempts = masteryValues.reduce((acc, curr) => acc + curr.attempts, 0);
  const totalCorrect = masteryValues.reduce((acc, curr) => acc + curr.correct, 0);
  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  // 4. Recent History Accuracy Trend Data
  const recentHistory: { index: number; accuracy: number; timeSec: number }[] = [];
  let cumCorrect = 0;
  let cumTotal = 0;
  let sampleCount = 0;

  masteryValues.forEach(m => {
    m.history.forEach(h => {
      cumTotal++;
      if (h.correct) cumCorrect++;
      sampleCount++;
      if (sampleCount % 5 === 0) {
        recentHistory.push({
          index: sampleCount,
          accuracy: Math.round((cumCorrect / cumTotal) * 100),
          timeSec: Math.round(h.timeMs / 100) / 10
        });
      }
    });
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-paper-200 dark:border-ink-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-academic-700 dark:text-academic-400 font-semibold flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" /> Performance Analytics
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-paper-50 mt-1">
          Mastery Dashboard & Progress
        </h1>
        <p className="text-sm text-ink-600 dark:text-paper-300 mt-1 leading-relaxed">
          Comprehensive breakdown of your Trachtenberg arithmetic development, speed progressions, and retained techniques.
        </p>
      </div>

      {/* Aggregate Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <span className="text-[10px] font-mono uppercase text-ink-500 block">Mastered Techniques</span>
          <div className="text-2xl font-bold font-serif text-emerald-600 mt-0.5">
            {counts.mastered} <span className="text-xs font-normal text-ink-400 font-mono">/ {totalTechniques}</span>
          </div>
          <span className="text-[11px] text-ink-500">Highest certification tier</span>
        </Card>

        <Card className="p-4">
          <span className="text-[10px] font-mono uppercase text-ink-500 block">Total Calculations</span>
          <div className="text-2xl font-bold font-serif text-ink-900 dark:text-paper-100 mt-0.5">
            {totalAttempts}
          </div>
          <span className="text-[11px] text-ink-500">Problems solved independently</span>
        </Card>

        <Card className="p-4">
          <span className="text-[10px] font-mono uppercase text-ink-500 block">Overall Accuracy</span>
          <div className="text-2xl font-bold font-serif text-academic-700 dark:text-academic-400 mt-0.5">
            {overallAccuracy}%
          </div>
          <span className="text-[11px] text-ink-500">{totalCorrect} correct answers</span>
        </Card>

        <Card className="p-4">
          <span className="text-[10px] font-mono uppercase text-ink-500 block">Curriculum Complete</span>
          <div className="text-2xl font-bold font-serif text-sky-600 mt-0.5">
            {Math.round((progress.completedTechniqueIds.length / totalTechniques) * 100)}%
          </div>
          <span className="text-[11px] text-ink-500">{progress.completedTechniqueIds.length} techniques studied</span>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Mastery Distribution */}
        <Card className="p-5 space-y-4">
          <h3 className="text-sm font-serif font-bold text-ink-900 dark:text-paper-100">
            Curriculum Mastery Distribution
          </h3>
          <div className="h-64 flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderColor: '#334155',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-ink-500">No practice data recorded yet.</div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5 font-mono">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-ink-600 dark:text-paper-400">{d.name}:</span>
                <strong className="text-ink-900 dark:text-paper-100">{d.value}</strong>
              </div>
            ))}
          </div>
        </Card>

        {/* Chart 2: Chapter Completion Bar Chart */}
        <Card className="p-5 space-y-4">
          <h3 className="text-sm font-serif font-bold text-ink-900 dark:text-paper-100">
            Completion by Chapter (8 Units)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chapterData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="chapter" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Completed']}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#f8fafc',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="pct" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Speed Trainer Personal Bests Table */}
      {progress.speedTrainerRecords && progress.speedTrainerRecords.length > 0 && (
        <Card className="p-5 space-y-3">
          <h3 className="text-sm font-serif font-bold text-ink-900 dark:text-paper-100 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-academic-700 dark:text-academic-400" />
            Speed Trainer Personal Records
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-paper-100 dark:bg-ink-800 text-ink-600 dark:text-paper-300 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Date</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Speed Rate</th>
                  <th className="p-2.5">Accuracy</th>
                  <th className="p-2.5">Max Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-200 dark:divide-ink-800 font-mono">
                {progress.speedTrainerRecords.slice(-5).reverse().map((rec, i) => (
                  <tr key={i} className="hover:bg-paper-50 dark:hover:bg-ink-800/50">
                    <td className="p-2.5">{new Date(rec.date).toLocaleDateString()}</td>
                    <td className="p-2.5 capitalize">{rec.techniqueCategory}</td>
                    <td className="p-2.5 font-bold text-academic-700 dark:text-academic-400">{rec.questionsPerMin} QPM</td>
                    <td className="p-2.5 text-emerald-600">{rec.accuracyPercent}%</td>
                    <td className="p-2.5 text-amber-600">{rec.bestStreak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

