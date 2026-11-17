import React, { useState, useEffect, useRef } from 'react';
import { Zap, Play, Pause, RotateCcw, Award, Flame, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { UserProgress, PracticeQuestion } from '../types';
import { generateQuestionForTechnique } from '../engines/problemGenerator';
import { validateUserAnswer } from '../engines/solutionValidator';
import { saveUserProgress } from '../storage/progressStorage';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

interface SpeedTrainerPageProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const SpeedTrainerPage: React.FC<SpeedTrainerPageProps> = ({ progress, onUpdateProgress }) => {
  const [mode, setMode] = useState<'60s' | '120s' | '20q'>('60s');
  const [category, setCategory] = useState<'single-digit' | 'direct' | 'all'>('single-digit');

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Time & Session State
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [currentQ, setCurrentQ] = useState<PracticeQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [totalAttempted, setTotalAttempted] = useState<number>(0);

  const timerRef = useRef<any>(null);

  // Category mapping
  const getNextQuestion = () => {
    let techId = 'tech-101';
    if (category === 'single-digit') {
      const keys = ['tech-101', 'tech-102', 'tech-103', 'tech-104', 'tech-105', 'tech-106', 'tech-107', 'tech-108', 'tech-109'];
      techId = keys[Math.floor(Math.random() * keys.length)];
    } else if (category === 'direct') {
      const keys = ['tech-201', 'tech-202', 'tech-203'];
      techId = keys[Math.floor(Math.random() * keys.length)];
    } else {
      const keys = ['tech-101', 'tech-102', 'tech-103', 'tech-201', 'tech-301', 'tech-401'];
      techId = keys[Math.floor(Math.random() * keys.length)];
    }
    return generateQuestionForTechnique(techId, 'intermediate');
  };

  const startTrainer = () => {
    const initTime = mode === '60s' ? 60 : mode === '120s' ? 120 : 0;
    setTimeLeft(initTime);
    setElapsedSec(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTotalAttempted(0);
    setUserAnswer('');
    setCurrentQ(getNextQuestion());
    setIsActive(true);
    setIsFinished(false);
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (mode === '60s' || mode === '120s') {
          setTimeLeft(prev => {
            if (prev <= 1) {
              endTrainer();
              return 0;
            }
            return prev - 1;
          });
        }
        setElapsedSec(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, mode]);

  const endTrainer = () => {
    setIsActive(false);
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);

    // Save record if completed
    const finalElapsed = elapsedSec || 1;
    const qpm = Math.round((score / (finalElapsed / 60)) * 10) / 10;
    const acc = totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 0;

    const newRecord = {
      techniqueCategory: category,
      questionsPerMin: qpm,
      accuracyPercent: acc,
      bestStreak,
      date: new Date().toISOString()
    };

    const updated = {
      ...progress,
      speedTrainerRecords: [
        ...(progress.speedTrainerRecords || []),
        newRecord
      ]
    };
    onUpdateProgress(updated);
    saveUserProgress(updated);
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQ || !userAnswer.trim()) return;

    const result = validateUserAnswer(currentQ, userAnswer);
    setTotalAttempted(prev => prev + 1);

    if (result.isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }

    setUserAnswer('');

    // Check if 20q mode finished
    if (mode === '20q' && totalAttempted + 1 >= 20) {
      endTrainer();
    } else {
      setCurrentQ(getNextQuestion());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-paper-200 dark:border-ink-800 pb-3 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-academic-700 dark:text-academic-400 font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> High-Speed Arithmetic Drills
          </span>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-ink-950 dark:text-paper-50 mt-0.5">
            Reflex Speed Trainer
          </h1>
        </div>

        {isActive && (
          <Button variant="outline" size="sm" onClick={endTrainer}>
            End Drill
          </Button>
        )}
      </div>

      {/* 1. SETUP VIEW */}
      {!isActive && !isFinished && (
        <Card className="p-6 space-y-6 max-w-xl mx-auto">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-ink-500 font-semibold block">
              1. Sprint Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMode('60s')}
                className={`p-3 rounded-lg border text-center transition-all ${
                  mode === '60s'
                    ? 'border-academic-600 bg-academic-50 dark:bg-academic-950/40 text-academic-900 dark:text-academic-200 font-bold'
                    : 'border-paper-300 dark:border-ink-700 bg-paper-50 dark:bg-ink-900 text-ink-700 dark:text-paper-300'
                }`}
              >
                <div className="text-sm font-mono font-bold">60 Seconds</div>
                <div className="text-[10px] text-ink-400">1-min sprint</div>
              </button>

              <button
                type="button"
                onClick={() => setMode('120s')}
                className={`p-3 rounded-lg border text-center transition-all ${
                  mode === '120s'
                    ? 'border-academic-600 bg-academic-50 dark:bg-academic-950/40 text-academic-900 dark:text-academic-200 font-bold'
                    : 'border-paper-300 dark:border-ink-700 bg-paper-50 dark:bg-ink-900 text-ink-700 dark:text-paper-300'
                }`}
              >
                <div className="text-sm font-mono font-bold">120 Seconds</div>
                <div className="text-[10px] text-ink-400">2-min endurance</div>
              </button>

              <button
                type="button"
                onClick={() => setMode('20q')}
                className={`p-3 rounded-lg border text-center transition-all ${
                  mode === '20q'
                    ? 'border-academic-600 bg-academic-50 dark:bg-academic-950/40 text-academic-900 dark:text-academic-200 font-bold'
                    : 'border-paper-300 dark:border-ink-700 bg-paper-50 dark:bg-ink-900 text-ink-700 dark:text-paper-300'
                }`}
              >
                <div className="text-sm font-mono font-bold">20 Problems</div>
                <div className="text-[10px] text-ink-400">Fixed target</div>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-ink-500 font-semibold block">
              2. Problem Domain
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCategory('single-digit')}
                className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                  category === 'single-digit'
                    ? 'border-academic-600 bg-academic-50 dark:bg-academic-950/40 text-academic-900 dark:text-academic-200 font-bold'
                    : 'border-paper-300 dark:border-ink-700 bg-paper-50 dark:bg-ink-900 text-ink-700 dark:text-paper-300'
                }`}
              >
                Chapter 1 Keys (11, 12, 6, 7...)
              </button>
              <button
                type="button"
                onClick={() => setCategory('direct')}
                className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                  category === 'direct'
                    ? 'border-academic-600 bg-academic-50 dark:bg-academic-950/40 text-academic-900 dark:text-academic-200 font-bold'
                    : 'border-paper-300 dark:border-ink-700 bg-paper-50 dark:bg-ink-900 text-ink-700 dark:text-paper-300'
                }`}
              >
                Chapter 2 (Direct Pairs)
              </button>
              <button
                type="button"
                onClick={() => setCategory('all')}
                className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                  category === 'all'
                    ? 'border-academic-600 bg-academic-50 dark:bg-academic-950/40 text-academic-900 dark:text-academic-200 font-bold'
                    : 'border-paper-300 dark:border-ink-700 bg-paper-50 dark:bg-ink-900 text-ink-700 dark:text-paper-300'
                }`}
              >
                Comprehensive Mix
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-paper-200 dark:border-ink-800">
            <Button variant="primary" size="lg" onClick={startTrainer} className="w-full">
              <Play className="w-4 h-4 mr-2" /> Start Speed Sprint
            </Button>
          </div>
        </Card>
      )}

      {/* 2. LIVE SPRINT VIEW */}
      {isActive && currentQ && (
        <Card className="p-8 max-w-xl mx-auto space-y-6 text-center bg-white dark:bg-ink-850">
          {/* Live Scoreboard */}
          <div className="grid grid-cols-3 gap-2 border-b border-paper-200 dark:border-ink-800 pb-4 font-mono">
            <div>
              <span className="text-[10px] text-ink-400 block font-sans uppercase">
                {mode === '20q' ? 'Problems Left' : 'Time Remaining'}
              </span>
              <strong className="text-2xl font-bold text-academic-700 dark:text-academic-400">
                {mode === '20q' ? `${20 - totalAttempted}` : `${timeLeft}s`}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-ink-400 block font-sans uppercase">Correct Solved</span>
              <strong className="text-2xl font-bold text-emerald-600">{score}</strong>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[10px] text-ink-400 block font-sans uppercase flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-500" /> Streak
              </span>
              <strong className="text-2xl font-bold text-amber-600">{streak}</strong>
            </div>
          </div>

          {/* Mathematical Prompt */}
          <div className="py-4 space-y-1">
            <span className="text-xs text-ink-400 font-mono">Compute instantly:</span>
            <div className="text-4xl sm:text-5xl font-mono font-bold text-ink-950 dark:text-paper-50 tracking-wider">
              {currentQ.expression}
            </div>
          </div>

          {/* Rapid Answer Input Form */}
          <form onSubmit={handleAnswerSubmit} className="max-w-xs mx-auto space-y-3">
            <input
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              placeholder="?"
              autoFocus
              className="w-full text-center font-mono text-3xl font-bold px-4 py-2 bg-paper-50 dark:bg-ink-900 border-2 border-academic-500 rounded-lg text-ink-900 dark:text-paper-100 focus:outline-none focus:ring-4 focus:ring-academic-500/20"
            />
            <Button type="submit" variant="primary" size="md" className="w-full">
              Enter ↵
            </Button>
          </form>
        </Card>
      )}

      {/* 3. FINISHED SUMMARY VIEW */}
      {isFinished && (
        <Card className="p-8 max-w-lg mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-academic-100 dark:bg-academic-950/60 text-academic-700 dark:text-academic-300 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-serif font-bold text-ink-950 dark:text-paper-50">
              Sprint Complete!
            </h2>
            <p className="text-xs text-ink-500">
              Reflex metrics recorded to your progress profile.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 py-4 border-y border-paper-200 dark:border-ink-800 font-mono">
            <div className="p-2 bg-paper-50 dark:bg-ink-900 rounded">
              <span className="text-[10px] text-ink-400 block font-sans">Speed Rate</span>
              <strong className="text-xl font-bold text-academic-700 dark:text-academic-300">
                {Math.round((score / (Math.max(1, elapsedSec) / 60)) * 10) / 10}
              </strong>
              <span className="text-[10px] text-ink-400 block font-sans">QPM</span>
            </div>
            <div className="p-2 bg-paper-50 dark:bg-ink-900 rounded">
              <span className="text-[10px] text-ink-400 block font-sans">Accuracy</span>
              <strong className="text-xl font-bold text-emerald-600">
                {totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 0}%
              </strong>
              <span className="text-[10px] text-ink-400 block font-sans">{score}/{totalAttempted}</span>
            </div>
            <div className="p-2 bg-paper-50 dark:bg-ink-900 rounded">
              <span className="text-[10px] text-ink-400 block font-sans">Max Streak</span>
              <strong className="text-xl font-bold text-amber-600">{bestStreak}</strong>
              <span className="text-[10px] text-ink-400 block font-sans">in a row</span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button variant="primary" size="md" onClick={startTrainer}>
              <RotateCcw className="w-4 h-4 mr-1.5" /> Another Sprint
            </Button>
            <Button variant="outline" size="md" onClick={() => setIsFinished(false)}>
              Change Settings
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
