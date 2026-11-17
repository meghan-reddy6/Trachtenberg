import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Eye,
  ArrowRight,
  RotateCcw,
  Clock,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';
import { UserProgress, Difficulty, PracticeQuestion, ExerciseFormat } from '../types';
import { getAllTechniquesList, getTechnique } from '../content/curriculum';
import { generateQuestionForTechnique } from '../engines/problemGenerator';
import { validateUserAnswer, getProgressiveHint } from '../engines/solutionValidator';
import { recordPracticeAttempt } from '../storage/progressStorage';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { DifficultyBadge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';

interface PracticePageProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({ progress, onUpdateProgress }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const allTechniques = getAllTechniquesList();
  const initialTechId = searchParams.get('technique') || 'tech-101';

  // Session Configuration State
  const [selectedTechId, setSelectedTechId] = useState<string>(initialTechId);
  const [difficulty, setDifficulty] = useState<Difficulty>('intermediate');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [customCountInput, setCustomCountInput] = useState<string>('15');
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [isSessionFinished, setIsSessionFinished] = useState<boolean>(false);

  // Active Practice State
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [showFullSolution, setShowFullSolution] = useState<boolean>(false);

  // Session Metrics
  const [sessionResults, setSessionResults] = useState<{
    question: PracticeQuestion;
    userAns: string;
    isCorrect: boolean;
    timeMs: number;
  }[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Start Session
  const handleStartSession = () => {
    const total = questionCount;
    const generated: PracticeQuestion[] = [];
    for (let i = 0; i < total; i++) {
      generated.push(generateQuestionForTechnique(selectedTechId, difficulty));
    }
    setQuestions(generated);
    setCurrentIndex(0);
    setUserAnswer('');
    setIsSubmitted(false);
    setFeedback(null);
    setHintLevel(0);
    setShowFullSolution(false);
    setSessionResults([]);
    setIsSessionActive(true);
    setIsSessionFinished(false);
    setQuestionStartTime(Date.now());
  };

  const currentQ: PracticeQuestion | undefined = questions[currentIndex];

  // Submit Answer
  const handleSubmitAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQ || !userAnswer.trim()) return;

    const timeTakenMs = Date.now() - questionStartTime;
    const result = validateUserAnswer(currentQ, userAnswer);
    setFeedback(result);
    setIsSubmitted(true);

    const isCorrect = result.isCorrect;
    setSessionResults(prev => [
      ...prev,
      {
        question: currentQ,
        userAns: userAnswer,
        isCorrect,
        timeMs: timeTakenMs
      }
    ]);

    // Save to user storage
    const updated = recordPracticeAttempt(
      progress,
      currentQ.techniqueId,
      isCorrect,
      timeTakenMs,
      difficulty
    );
    onUpdateProgress(updated);

    if (isCorrect && !showFullSolution) {
      // Trigger subtle celebratory chime or haptic if configured
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setIsSubmitted(false);
      setFeedback(null);
      setHintLevel(0);
      setShowFullSolution(false);
      setQuestionStartTime(Date.now());
    } else {
      // End session
      setIsSessionActive(false);
      setIsSessionFinished(true);
      // Trigger confetti if accuracy >= 80%
      const correctCount = sessionResults.filter(r => r.isCorrect).length + (feedback?.isCorrect ? 1 : 0);
      if (correctCount / questions.length >= 0.8) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  // Virtual Keypad Button Click
  const handleKeypadPress = (val: string) => {
    if (isSubmitted) return;
    if (val === 'backspace') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else if (val === 'clear') {
      setUserAnswer('');
    } else {
      setUserAnswer(prev => prev + val);
    }
  };

  const selectedTech = getTechnique(selectedTechId) || allTechniques[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Session Header */}
      <div className="border-b border-paper-200 dark:border-ink-800 pb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-academic-700 dark:text-academic-400 font-semibold">
            Independent Arithmetic Practice
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-paper-50">
            {isSessionActive ? selectedTech.name : 'Configure Practice Session'}
          </h1>
        </div>

        {isSessionActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm('Are you sure you want to exit this practice session?')) {
                setIsSessionActive(false);
              }
            }}
          >
            Exit Session
          </Button>
        )}
      </div>

      {/* 1. CONFIGURATION VIEW */}
      {!isSessionActive && !isSessionFinished && (
        <Card className="p-6 space-y-6">
          {/* Technique Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-ink-600 dark:text-paper-300 font-semibold block">
              1. Select Trachtenberg Technique
            </label>
            <select
              value={selectedTechId}
              onChange={e => setSelectedTechId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-paper-50 dark:bg-ink-900 border border-paper-300 dark:border-ink-700 rounded-lg text-ink-900 dark:text-paper-100"
            >
              {allTechniques.map(t => (
                <option key={t.id} value={t.id}>
                  Ch. {t.chapterId}: {t.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-ink-500 italic">
              {selectedTech.summary}
            </p>
          </div>

          {/* Difficulty Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-ink-600 dark:text-paper-300 font-semibold block">
              2. Select Difficulty Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['beginner', 'intermediate', 'advanced', 'expert'] as Difficulty[]).map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    difficulty === d
                      ? 'border-academic-600 bg-academic-50 dark:bg-blue-950/50 text-academic-900 dark:text-blue-200 font-bold ring-2 ring-academic-500/20 dark:border-blue-500'
                      : 'border-paper-300 dark:border-slate-800 bg-paper-50 dark:bg-slate-900 text-ink-700 dark:text-slate-300 hover:bg-paper-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="capitalize text-xs font-semibold block">{d}</span>
                  <span className="text-[10px] text-ink-400 font-normal">
                    {d === 'beginner' && 'Small numbers, direct rules'}
                    {d === 'intermediate' && 'Larger numbers, carries'}
                    {d === 'advanced' && 'Full multi-digit edge cases'}
                    {d === 'expert' && 'Mixed challenges, zero prefixes'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Count Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-ink-600 dark:text-paper-300 font-semibold block">
              3. Number of Problems
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {[5, 10, 20, 50].map(cnt => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setQuestionCount(cnt)}
                  className={`px-4 py-2 rounded-lg border text-xs font-mono font-bold transition-all ${
                    questionCount === cnt
                      ? 'border-academic-600 bg-academic-700 text-white dark:bg-blue-600 dark:border-blue-500'
                      : 'border-paper-300 dark:border-slate-800 bg-paper-50 dark:bg-slate-900 text-ink-700 dark:text-slate-300 hover:bg-paper-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cnt} Questions
                </button>
              ))}

              {/* Custom Count */}
              <div className="flex items-center gap-1.5 ml-2">
                <span className="text-xs text-ink-500">Custom:</span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={customCountInput}
                  onChange={e => {
                    setCustomCountInput(e.target.value);
                    const parsed = parseInt(e.target.value, 10);
                    if (parsed > 0) setQuestionCount(parsed);
                  }}
                  className="w-16 px-2 py-1.5 text-xs font-mono bg-paper-50 dark:bg-ink-900 border border-paper-300 dark:border-ink-700 rounded text-center"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-paper-200 dark:border-ink-800 flex justify-end">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartSession}
              className="w-full sm:w-auto"
            >
              Start Practice Session ({questionCount} Problems) <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* 2. ACTIVE PRACTICE VIEW */}
      {isSessionActive && currentQ && (
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-ink-500 font-mono">
            <span>
              Question <strong>{currentIndex + 1}</strong> of <strong>{questions.length}</strong>
            </span>
            <div className="flex items-center gap-2">
              <DifficultyBadge difficulty={difficulty} />
              <span>{Math.round(((currentIndex) / questions.length) * 100)}% complete</span>
            </div>
          </div>
          <ProgressBar value={currentIndex} max={questions.length} size="sm" />

          {/* Question Card */}
          <Card className="p-6 sm:p-8 space-y-6 bg-white dark:bg-ink-850">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-400">
                {currentQ.prompt || 'Calculate the following expression using the Trachtenberg rule:'}
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-ink-950 dark:text-paper-50 tracking-wide py-2">
                {currentQ.expression}
              </div>
            </div>

            {/* Answer Input or Multiple Choice */}
            {currentQ.format === 'multiple-choice' && currentQ.options ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    disabled={isSubmitted}
                    onClick={() => setUserAnswer(opt)}
                    className={`p-3 rounded-lg border text-sm font-mono font-semibold transition-all ${
                      userAnswer === opt
                        ? 'border-academic-600 bg-academic-100 text-academic-900 dark:bg-academic-950 dark:text-academic-200 ring-2 ring-academic-500/40'
                        : 'border-paper-300 dark:border-ink-700 hover:bg-paper-100 dark:hover:bg-ink-800'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSubmitAnswer} className="max-w-xs mx-auto space-y-3">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  placeholder="Your answer"
                  disabled={isSubmitted}
                  autoFocus
                  className="w-full text-center font-mono text-2xl font-bold px-4 py-2.5 bg-paper-50 dark:bg-ink-900 border-2 border-paper-300 dark:border-ink-700 rounded-lg text-ink-900 dark:text-paper-100 focus:outline-none focus:border-academic-500"
                />

                {/* Touch / Virtual Keypad for Mobile or Tablet */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'backspace'].map(key => (
                    <button
                      key={key}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleKeypadPress(key)}
                      className="py-2.5 bg-paper-100 hover:bg-paper-200 dark:bg-ink-800 dark:hover:bg-ink-700 text-ink-800 dark:text-paper-200 font-mono text-sm font-bold rounded border border-paper-200 dark:border-ink-750 active:scale-95 transition-transform"
                    >
                      {key === 'clear' ? 'C' : key === 'backspace' ? '⌫' : key}
                    </button>
                  ))}
                </div>

                {!isSubmitted ? (
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full"
                    disabled={!userAnswer.trim()}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={handleNextQuestion}
                    className="w-full"
                  >
                    Next Problem <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                )}
              </form>
            )}

            {/* Feedback & Progressive Hints */}
            <div className="max-w-md mx-auto space-y-3 pt-2">
              {/* Submission Feedback */}
              {isSubmitted && feedback && (
                <div
                  className={`p-4 rounded-lg border flex items-start gap-3 ${
                    feedback.isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  {feedback.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="text-xs space-y-1">
                    <div className="font-bold">
                      {feedback.isCorrect ? 'Correct!' : 'Incorrect.'}
                    </div>
                    <div>{feedback.explanation}</div>
                  </div>
                </div>
              )}

              {/* Progressive Hint Controls */}
              {!isSubmitted && (
                <div className="border-t border-paper-200 dark:border-ink-800 pt-3">
                  <div className="flex items-center justify-between text-xs text-ink-500">
                    <button
                      type="button"
                      onClick={() => setHintLevel(prev => Math.min(3, prev + 1))}
                      className="flex items-center gap-1.5 text-academic-700 dark:text-academic-400 hover:underline font-medium"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Request Hint ({hintLevel}/3)</span>
                    </button>
                    {hintLevel > 0 && (
                      <span className="font-mono text-[11px] text-ink-400">
                        {hintLevel === 1 && 'Tier 1: Rule'}
                        {hintLevel === 2 && 'Tier 2: Operation'}
                        {hintLevel === 3 && 'Tier 3: Partial result'}
                      </span>
                    )}
                  </div>

                  {hintLevel > 0 && (
                    <div className="mt-2 p-3 bg-paper-100 dark:bg-ink-900 rounded border border-paper-200 dark:border-ink-800 text-xs text-ink-800 dark:text-paper-200 leading-relaxed font-sans">
                      {getProgressiveHint(currentQ, hintLevel as any)}
                    </div>
                  )}
                </div>
              )}

              {/* Reveal Solution Button */}
              {isSubmitted && (
                <div className="text-center pt-1">
                  {!showFullSolution ? (
                    <button
                      type="button"
                      onClick={() => setShowFullSolution(true)}
                      className="text-xs text-academic-700 dark:text-academic-400 hover:underline flex items-center justify-center gap-1 mx-auto"
                    >
                      <Eye className="w-3.5 h-3.5" /> Show complete step-by-step Trachtenberg solution
                    </button>
                  ) : (
                    <div className="text-left bg-paper-50 dark:bg-ink-900 border border-paper-200 dark:border-ink-800 rounded-lg p-4 space-y-2 text-xs">
                      <div className="font-semibold text-ink-900 dark:text-paper-100 border-b border-paper-200 dark:border-ink-800 pb-1">
                        Step-by-Step Breakdown:
                      </div>
                      <div className="space-y-1 font-mono text-[11px] text-ink-700 dark:text-paper-300">
                        {currentQ.solution.steps.map((st, i) => (
                          <div key={i}>• {st}</div>
                        ))}
                      </div>
                      <div className="text-[11px] text-ink-600 dark:text-paper-400 pt-1">
                        {currentQ.solution.explanation}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* 3. SESSION FINISHED VIEW */}
      {isSessionFinished && (
        <Card className="p-8 text-center space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-academic-100 dark:bg-academic-950/60 text-academic-700 dark:text-academic-300 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-serif font-bold text-ink-950 dark:text-paper-50">
              Practice Session Completed!
            </h2>
            <p className="text-xs text-ink-600 dark:text-paper-400">
              Technique: {selectedTech.name} • Tier: <span className="capitalize">{difficulty}</span>
            </p>
          </div>

          {/* Results Summary Box */}
          {(() => {
            const correctCount = sessionResults.filter(r => r.isCorrect).length;
            const totalCount = sessionResults.length;
            const accuracyPct = Math.round((correctCount / totalCount) * 100);
            const totalTimeMs = sessionResults.reduce((acc, curr) => acc + curr.timeMs, 0);
            const avgTimeSec = (totalTimeMs / totalCount / 1000).toFixed(1);

            return (
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-paper-200 dark:border-ink-800 font-mono">
                <div className="p-3 bg-paper-50 dark:bg-ink-900 rounded">
                  <span className="text-[10px] uppercase text-ink-400 block font-sans">Accuracy</span>
                  <strong className="text-xl font-bold text-emerald-600">{accuracyPct}%</strong>
                  <span className="text-[10px] text-ink-400 block font-sans">{correctCount}/{totalCount} correct</span>
                </div>
                <div className="p-3 bg-paper-50 dark:bg-ink-900 rounded">
                  <span className="text-[10px] uppercase text-ink-400 block font-sans">Average Speed</span>
                  <strong className="text-xl font-bold text-ink-900 dark:text-paper-100">{avgTimeSec}s</strong>
                  <span className="text-[10px] text-ink-400 block font-sans">per problem</span>
                </div>
                <div className="p-3 bg-paper-50 dark:bg-ink-900 rounded">
                  <span className="text-[10px] uppercase text-ink-400 block font-sans">Total Time</span>
                  <strong className="text-xl font-bold text-academic-700 dark:text-academic-300">
                    {Math.round(totalTimeMs / 1000)}s
                  </strong>
                  <span className="text-[10px] text-ink-400 block font-sans">active calc</span>
                </div>
              </div>
            );
          })()}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={handleStartSession}
              className="gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Practice Again
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsSessionFinished(false)}
            >
              Change Technique / Settings
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={() => navigate('/progress')}
            >
              View Full Progress
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
