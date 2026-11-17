import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckSquare, Award, Clock, ArrowRight, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { chapters, getTechniquesByChapter } from '../content/curriculum';
import { UserProgress, PracticeQuestion } from '../types';
import { generateQuestionForTechnique } from '../engines/problemGenerator';
import { validateUserAnswer } from '../engines/solutionValidator';
import { recordPracticeAttempt } from '../storage/progressStorage';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';

interface AssessmentsPageProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const AssessmentsPage: React.FC<AssessmentsPageProps> = ({ progress, onUpdateProgress }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeTest, setActiveTest] = useState<{
    title: string;
    description: string;
    chapterId?: number;
    questions: PracticeQuestion[];
  } | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Start Chapter Assessment
  const startChapterTest = (chapterId: number) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter) return;

    const techs = getTechniquesByChapter(chapterId);
    const questions: PracticeQuestion[] = [];
    techs.forEach((t) => {
      questions.push(generateQuestionForTechnique(t.id, 'intermediate'));
      if (techs.length < 5) {
        questions.push(generateQuestionForTechnique(t.id, 'advanced'));
      }
    });

    setActiveTest({
      title: `Chapter ${chapter.numberString} Mastery Assessment`,
      description: `Comprehensive examination covering: ${chapter.title}`,
      chapterId,
      questions
    });
    setCurrentIndex(0);
    setUserAnswers({});
    setTestSubmitted(false);
    setScore(0);
  };

  // Start Grand Final Exam
  const startFinalExam = () => {
    const questions: PracticeQuestion[] = [];
    const sampleTechs = [
      'tech-101', 'tech-102', 'tech-103', 'tech-106', 'tech-107',
      'tech-201', 'tech-202', 'tech-203', 'tech-301', 'tech-302',
      'tech-401', 'tech-501', 'tech-502', 'tech-601', 'tech-604'
    ];
    sampleTechs.forEach((tId) => {
      questions.push(generateQuestionForTechnique(tId, 'advanced'));
    });

    setActiveTest({
      title: 'Grand Trachtenberg Mastery Certification Exam',
      description: 'Comprehensive 15-problem final examination spanning all 8 chapters.',
      questions
    });
    setCurrentIndex(0);
    setUserAnswers({});
    setTestSubmitted(false);
    setScore(0);
  };

  // Submit Active Test
  const handleSubmitTest = () => {
    if (!activeTest) return;
    let correctCount = 0;
    let currentProgress = progress;

    activeTest.questions.forEach((q, idx) => {
      const ans = userAnswers[idx] || '';
      const res = validateUserAnswer(q, ans);
      if (res.isCorrect) correctCount++;

      // Record in user progress and chain updates
      currentProgress = recordPracticeAttempt(currentProgress, q.techniqueId, res.isCorrect, 5000, q.difficulty);
    });

    onUpdateProgress(currentProgress);
    setScore(correctCount);
    setTestSubmitted(true);

    if (correctCount / activeTest.questions.length >= 0.8) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-paper-200 dark:border-ink-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-academic-700 dark:text-academic-400 font-semibold flex items-center gap-1.5">
          <CheckSquare className="w-3.5 h-3.5" /> Formal Assessments
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950 dark:text-paper-50 mt-1">
          Mastery Assessments & Certifications
        </h1>
        <p className="text-sm text-ink-600 dark:text-paper-300 mt-1 leading-relaxed">
          Evaluate retention and precision across single-line multiplication, direct cross-pairs, two-finger keys, addition verification, and division without hints.
        </p>
      </div>

      {/* 1. TEST DIRECTORY VIEW (When no active test) */}
      {!activeTest && (
        <div className="space-y-6">
          {/* Grand Mastery Exam Banner */}
          <div className="bg-gradient-to-r from-academic-800 to-academic-950 text-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/20 text-xs font-mono uppercase font-bold tracking-wider">
                <Award className="w-3.5 h-3.5" /> Ultimate Benchmark
              </div>
              <h2 className="text-2xl font-serif font-bold">
                Grand Trachtenberg Mastery Exam
              </h2>
              <p className="text-xs text-white/80 leading-relaxed font-sans">
                15 rigorous calculation challenges covering all 8 chapters: single-digit keys, direct method, two-finger, 11-rule addition, fast division, and square roots. Minimum 80% score required to earn the digital certificate.
              </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              onClick={startFinalExam}
              className="bg-white text-academic-900 hover:bg-paper-100 flex-shrink-0"
            >
              Take Grand Exam <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

          {/* Chapter-End Assessments Grid */}
          <div className="space-y-3">
            <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100">
              Chapter-End Assessments (8 Tests)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {chapters.map(ch => (
                <Card key={ch.id} className="p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-academic-700 dark:text-academic-400 uppercase font-bold">
                      Chapter {ch.numberString}
                    </span>
                    <h4 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100 mt-0.5">
                      {ch.title}
                    </h4>
                    <p className="text-xs text-ink-600 dark:text-paper-400 mt-1 line-clamp-2">
                      {ch.subtitle}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-paper-200 dark:border-ink-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-ink-500">
                      {ch.techniqueIds.length} techniques tested
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startChapterTest(ch.id)}
                    >
                      Start Test
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ACTIVE TEST VIEW */}
      {activeTest && !testSubmitted && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-paper-200 dark:border-ink-800 pb-3">
            <div>
              <h2 className="text-lg font-serif font-bold text-ink-900 dark:text-paper-100">
                {activeTest.title}
              </h2>
              <span className="text-xs text-ink-500 font-mono">
                Problem {currentIndex + 1} of {activeTest.questions.length}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setActiveTest(null)}>
              Cancel
            </Button>
          </div>

          <ProgressBar value={currentIndex + 1} max={activeTest.questions.length} size="sm" />

          {/* Current Question */}
          {(() => {
            const q = activeTest.questions[currentIndex];
            const currentAns = userAnswers[currentIndex] || '';

            return (
              <Card className="p-8 text-center space-y-6 bg-white dark:bg-ink-850">
                <span className="text-xs font-mono text-ink-400 uppercase">
                  {q.prompt}
                </span>

                <div className="text-4xl font-mono font-bold text-ink-950 dark:text-paper-50 tracking-wider">
                  {q.expression}
                </div>

                <div className="max-w-xs mx-auto space-y-3">
                  <input
                    type="text"
                    value={currentAns}
                    onChange={e => setUserAnswers({ ...userAnswers, [currentIndex]: e.target.value })}
                    placeholder="Enter final answer"
                    autoFocus
                    className="w-full text-center font-mono text-2xl font-bold px-4 py-2 bg-paper-50 dark:bg-ink-900 border-2 border-academic-500 rounded-lg text-ink-900 dark:text-paper-100 focus:outline-none"
                  />

                  <div className="flex items-center justify-between gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex(prev => prev - 1)}
                    >
                      Previous
                    </Button>

                    {currentIndex < activeTest.questions.length - 1 ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setCurrentIndex(prev => prev + 1)}
                      >
                        Next Problem &rarr;
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSubmitTest}
                      >
                        Submit Test
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })()}
        </div>
      )}

      {/* 3. TEST COMPLETED REPORT */}
      {activeTest && testSubmitted && (
        <Card className="p-8 max-w-xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-academic-100 dark:bg-academic-950/60 text-academic-700 dark:text-academic-300 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-serif font-bold text-ink-950 dark:text-paper-50">
              Assessment Results
            </h2>
            <p className="text-xs text-ink-500">
              {activeTest.title}
            </p>
          </div>

          <div className="py-4 border-y border-paper-200 dark:border-ink-800 font-mono">
            <div className="text-4xl font-bold text-academic-700 dark:text-academic-300">
              {Math.round((score / activeTest.questions.length) * 100)}%
            </div>
            <div className="text-xs text-ink-500 mt-1 font-sans">
              {score} of {activeTest.questions.length} problems answered correctly
            </div>
            <div className="mt-2 text-xs font-sans font-semibold">
              {score / activeTest.questions.length >= 0.8 ? (
                <span className="text-emerald-600">Passed with Trachtenberg Distinction!</span>
              ) : (
                <span className="text-rose-600">Review recommended before re-attempting.</span>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button variant="primary" size="md" onClick={() => setActiveTest(null)}>
              Return to Assessments
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
