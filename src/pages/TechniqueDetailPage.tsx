import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  Award,
  Sparkles,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { getTechnique, getAdjacentTechniques, chapters } from '../content/curriculum';
import { UserProgress } from '../types';
import { toggleBookmark, recordPracticeAttempt } from '../storage/progressStorage';
import { TrachtenbergVisualizer } from '../components/visualizer/TrachtenbergVisualizer';
import { KaTeXView } from '../components/math/KaTeXView';
import { DifficultyBadge, MasteryBadge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { resolveWorkedExampleCalculation } from '../engines/exampleResolver';

// Import calculation engines for custom simulation
import { calculateSingleDigitTrachtenberg } from '../engines/singleDigitEngine';
import { calculateDirectMultiplication } from '../engines/directMultiplicationEngine';
import { calculateTwoFingerMultiplication } from '../engines/twoFingerEngine';
import { squareTwoDigitGeneral, calculateTrachtenbergSquareRoot } from '../engines/squareAndRootEngine';

interface TechniqueDetailPageProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const TechniqueDetailPage: React.FC<TechniqueDetailPageProps> = ({
  progress,
  onUpdateProgress
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const technique = id ? getTechnique(id) : undefined;
  const adjacent = id ? getAdjacentTechniques(id) : {};

  // Knowledge check quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  // Active worked example index
  const [activeExampleIndex, setActiveExampleIndex] = useState<number>(0);

  // Reset active example and quiz state whenever technique ID changes
  useEffect(() => {
    setActiveExampleIndex(0);
    setSelectedAnswers({});
    setShowQuizResults(false);
  }, [id]);

  if (!technique) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-paper-100">
          Technique Not Found
        </h2>
        <p className="text-sm text-ink-600 dark:text-paper-400">
          The requested technique ID "{id}" could not be located in the curriculum.
        </p>
        <Button variant="primary" onClick={() => navigate('/library')}>
          Return to Technique Library
        </Button>
      </div>
    );
  }

  const isBookmarked = progress.bookmarkedTechniqueIds.includes(technique.id);
  const masteryData = progress.mastery[technique.id];
  const chapter = chapters.find(c => c.id === technique.chapterId) || chapters[0];

  const handleBookmarkToggle = () => {
    const updated = toggleBookmark(progress, technique.id);
    onUpdateProgress(updated);
  };

  // Custom simulation router based on technique
  const handleCustomCalculate = (a: string, b: string) => {
    try {
      const numA = a.replace(/,/g, '').trim();
      const numB = b.replace(/,/g, '').trim();
      if (!numA) return null;

      if (technique.chapterId === 1) {
        const digit = parseInt(numB || '11', 10);
        return calculateSingleDigitTrachtenberg(numA, digit);
      } else if (technique.chapterId === 2) {
        return calculateDirectMultiplication(numA, numB || '21');
      } else if (technique.chapterId === 3) {
        return calculateTwoFingerMultiplication(numA, numB || '54');
      } else if (technique.id === 'tech-601' || technique.id === 'tech-602' || technique.id === 'tech-603') {
        const res = squareTwoDigitGeneral(parseInt(numA, 10));
        return res as any;
      } else if (technique.id === 'tech-604' || technique.id === 'tech-605') {
        const res = calculateTrachtenbergSquareRoot(numA);
        return res as any;
      }
      return null;
    } catch (e) {
      console.warn('Simulation error:', e);
      return null;
    }
  };

  const currentExample = technique.workedExamples[activeExampleIndex] || technique.workedExamples[0];
  const activeCalculation = resolveWorkedExampleCalculation(technique, currentExample);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="flex items-center justify-between text-xs border-b border-paper-200 dark:border-ink-800 pb-3">
        <div className="flex items-center gap-2">
          <Link to="/chapters" className="text-ink-500 hover:text-ink-800 dark:hover:text-paper-200">
            Chapters
          </Link>
          <span className="text-ink-400">/</span>
          <Link to={`/learn/${chapter.id}`} className="text-ink-500 hover:text-ink-800 dark:hover:text-paper-200">
            Ch. {chapter.id}
          </Link>
          <span className="text-ink-400">/</span>
          <span className="text-academic-700 dark:text-academic-400 font-medium truncate max-w-[200px]">
            {technique.shortName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBookmarkToggle}
            className={`p-1.5 rounded transition-colors flex items-center gap-1 ${
              isBookmarked
                ? 'text-academic-700 dark:text-academic-400 bg-academic-50 dark:bg-academic-950/40'
                : 'text-ink-400 hover:text-ink-700 dark:hover:text-paper-300'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this technique'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span className="hidden sm:inline text-xs">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>
      </div>

      {/* 1. Header & Introduction */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold text-academic-700 dark:text-academic-400">
            Section {technique.section}
          </span>
          <span className="text-xs text-ink-400">•</span>
          <DifficultyBadge difficulty={technique.difficulty} />
          <span className="text-xs text-ink-400 font-mono">{technique.pageRef}</span>
          <span className="text-xs text-ink-400">•</span>
          <MasteryBadge level={masteryData?.level || 'not-started'} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-paper-50 leading-tight">
          {technique.name}
        </h1>

        <p className="text-sm text-ink-700 dark:text-paper-300 leading-relaxed font-sans">
          {technique.summary}
        </p>

        {/* Learning Objectives Pills */}
        <div className="bg-paper-100 dark:bg-ink-900 border border-paper-200 dark:border-ink-800 rounded-lg p-3 space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-ink-500 font-semibold block">
            Learning Objectives:
          </span>
          <ul className="text-xs text-ink-700 dark:text-paper-300 space-y-1">
            {technique.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-academic-600 font-bold">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2 & 3. What it does & When to use it */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-ink-850 p-4 rounded-lg border border-paper-300 dark:border-ink-800 space-y-1.5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-academic-700 dark:text-academic-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> What This Technique Does
          </h3>
          <p className="text-xs text-ink-700 dark:text-paper-300 leading-relaxed">
            Performs single-line computation directly on the multiplicand digits from right to left, bypassing rote times-table lookup and writing only the verified final answer.
          </p>
        </div>

        <div className="bg-white dark:bg-ink-850 p-4 rounded-lg border border-paper-300 dark:border-ink-800 space-y-1.5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-academic-700 dark:text-academic-400 font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> When to Use It
          </h3>
          <p className="text-xs text-ink-700 dark:text-paper-300 leading-relaxed">
            {technique.chapterId === 1
              ? `Whenever multiplying any multi-digit number by ${technique.shortName.replace('Multiplication by ', '')}.`
              : technique.summary}
          </p>
        </div>
      </div>

      {/* 4. Mathematical Principle & Algebraic Proof */}
      <section className="bg-paper-100 dark:bg-ink-900 border border-paper-300 dark:border-ink-800 rounded-lg p-5 space-y-3">
        <h3 className="text-sm font-serif font-bold text-ink-900 dark:text-paper-100 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-academic-700 dark:text-academic-400" />
          Mathematical Principle & Algebraic Foundation
        </h3>
        <p className="text-xs text-ink-700 dark:text-paper-300 leading-relaxed">
          {technique.mathematicalPrinciple}
        </p>

        {technique.algebraicProof && (
          <div className="mt-3 p-3 bg-white dark:bg-ink-850 rounded border border-paper-200 dark:border-ink-800 font-mono text-xs">
            <div className="text-[10px] uppercase font-sans font-semibold text-ink-500 mb-1">
              Algebraic Proof:
            </div>
            <KaTeXView math={technique.algebraicProof} block />
          </div>
        )}
      </section>

      {/* 5. Rules and Step-by-Step Procedure */}
      <section className="space-y-3">
        <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100">
          Rules and Procedure
        </h3>
        <div className="space-y-2">
          {technique.rulesAndProcedure.map((rule, idx) => (
            <div
              key={idx}
              className="p-3 bg-white dark:bg-ink-850 border border-paper-300 dark:border-ink-800 rounded-lg flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-academic-100 text-academic-800 dark:bg-academic-900/80 dark:text-academic-300 dark:border dark:border-academic-700/50 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-ink-800 dark:text-paper-200 leading-relaxed">
                {rule}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Interactive Visual Demonstration */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100">
            Interactive Visual Workspace
          </h3>
          {technique.workedExamples.length > 1 && (
            <div className="flex items-center gap-1 text-xs">
              <span className="text-ink-500 mr-1">Example:</span>
              {technique.workedExamples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setActiveExampleIndex(i)}
                  className={`px-2 py-0.5 rounded text-xs font-mono ${
                    activeExampleIndex === i
                      ? 'bg-academic-700 text-white font-bold'
                      : 'bg-paper-200 dark:bg-ink-800 text-ink-700 dark:text-paper-300 hover:bg-paper-300'
                  }`}
                >
                  #{i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        <TrachtenbergVisualizer
          calculation={activeCalculation}
          techniqueName={technique.name}
          onCustomCalculate={handleCustomCalculate}
          onComplete={stats => {
            const updated = recordPracticeAttempt(
              progress,
              technique.id,
              stats.errors === 0,
              stats.timeMs || 2500,
              technique.difficulty
            );
            onUpdateProgress(updated);
          }}
        />
      </section>

      {/* 7 & 8. Worked Examples & Detailed Step Explanations */}
      <section className="space-y-3">
        <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100">
          Worked Examples from the Book
        </h3>
        <div className="space-y-4">
          {technique.workedExamples.map((ex, idx) => {
            const resolvedEx = resolveWorkedExampleCalculation(technique, ex);
            return (
              <Card key={idx} className="p-4 bg-paper-50/50 dark:bg-ink-900/50 border border-paper-200 dark:border-ink-800">
                <div className="flex items-baseline justify-between border-b border-paper-200 dark:border-ink-800 pb-2 mb-3">
                  <span className="font-mono text-sm font-bold text-ink-900 dark:text-paper-100">
                    Example {idx + 1}: {ex.problem} = <strong className="text-academic-700 dark:text-academic-300">{ex.result || resolvedEx.answerString}</strong>
                  </span>
                  <span className="text-xs text-ink-500">{ex.stepsSummary}</span>
                </div>

                {/* Steps breakdown list */}
                <div className="space-y-1.5">
                  {resolvedEx.steps.map((step, sIdx) => (
                    <div key={sIdx} className="text-xs font-mono flex items-start gap-2 text-ink-700 dark:text-paper-300">
                      <span className="text-academic-600 font-bold flex-shrink-0">Step {sIdx + 1}:</span>
                      <span>{step.description} &rarr; produces <strong>{step.producedDigit}</strong> (Formula: {step.workingFormula})</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 9 & 10. Practice Links */}
      <section className="bg-academic-50/60 dark:bg-academic-950/20 border border-academic-200 dark:border-academic-800 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-serif font-bold text-academic-900 dark:text-academic-200">
            Ready to Practice Independently?
          </h3>
          <p className="text-xs text-ink-600 dark:text-paper-300 mt-0.5">
            Test yourself with progressive 3-tier hints, edge cases, and speed drills.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/practice?technique=${technique.id}`)}
          >
            Start Practice Problems <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </section>

      {/* 11. Common Mistakes and Pitfalls */}
      {technique.commonMistakes.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100 flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            Common Mistakes & Critical Pitfalls
          </h3>
          <div className="space-y-2">
            {technique.commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5"
              >
                <span className="font-bold">•</span>
                <span className="leading-relaxed">{mistake}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 12. Special Cases */}
      {technique.specialCases.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-sm font-mono uppercase tracking-wider text-ink-500 font-semibold">
            Special Cases & Boundary Conditions
          </h3>
          <ul className="text-xs text-ink-700 dark:text-paper-300 space-y-1 list-disc pl-5">
            {technique.specialCases.map((sc, i) => (
              <li key={i}>{sc}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 13. Knowledge Check Quiz */}
      {technique.knowledgeCheckQuestions.length > 0 && (
        <section className="bg-white dark:bg-ink-850 border border-paper-300 dark:border-ink-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-paper-200 dark:border-ink-800 pb-3">
            <div>
              <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-academic-700 dark:text-academic-400" />
                Knowledge Check Quiz
              </h3>
              <p className="text-xs text-ink-500">
                Verify your conceptual mastery of the rules before progressing.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQuizResults(true)}
            >
              Verify Answers
            </Button>
          </div>

          <div className="space-y-4">
            {technique.knowledgeCheckQuestions.map((q, qIdx) => {
              const selected = selectedAnswers[qIdx];
              const isSubmitted = showQuizResults;
              const isCorrect = selected === q.correctIndex;

              return (
                <div key={qIdx} className="space-y-2 text-xs">
                  <p className="font-medium text-ink-900 dark:text-paper-100">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-1.5 pl-2">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = selected === oIdx;
                      let optClass = 'border-paper-200 dark:border-ink-800 hover:bg-paper-100 dark:hover:bg-ink-800';
                      if (isChosen) {
                        optClass = 'border-academic-500 bg-academic-50 dark:bg-academic-950/40 text-academic-900 dark:text-academic-200 font-semibold';
                      }
                      if (isSubmitted) {
                        if (oIdx === q.correctIndex) {
                          optClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (isChosen && !isCorrect) {
                          optClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                        }
                      }

                      return (
                        <div
                          key={oIdx}
                          onClick={() => {
                            if (!isSubmitted) {
                              setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
                            }
                          }}
                          className={`p-2.5 rounded border cursor-pointer transition-colors flex items-center gap-2.5 ${optClass}`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${
                            isChosen ? 'border-academic-600 bg-academic-600 text-white' : 'border-paper-400'
                          }`}>
                            {isChosen && '✓'}
                          </div>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="p-2.5 rounded bg-paper-100 dark:bg-ink-900 text-[11px] text-ink-700 dark:text-paper-300 mt-1">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 14. Bottom Navigation (Prev / Next Lesson) */}
      <div className="pt-6 border-t border-paper-200 dark:border-ink-800 flex items-center justify-between gap-4">
        {adjacent.prev ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/technique/${adjacent.prev?.id}`)}
            className="gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left hidden sm:block">
              <span className="block text-[10px] text-ink-400 uppercase font-mono">Previous Lesson</span>
              <span className="text-xs font-semibold">{adjacent.prev.shortName}</span>
            </div>
            <span className="sm:hidden">Prev</span>
          </Button>
        ) : <div />}

        {adjacent.next ? (
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/technique/${adjacent.next?.id}`)}
            className="gap-1.5"
          >
            <div className="text-right hidden sm:block">
              <span className="block text-[10px] text-white/80 uppercase font-mono">Next Lesson</span>
              <span className="text-xs font-semibold">{adjacent.next.shortName}</span>
            </div>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/progress')}
          >
            View Mastery Report
          </Button>
        )}
      </div>
    </div>
  );
};
