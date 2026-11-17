import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, CheckCircle2, AlertCircle, HelpCircle, Eye, ArrowRight, Zap } from 'lucide-react';
import { CalculationResult, CalculationStep } from '../../types';
import { MathDigitGrid } from '../math/MathDigitGrid';
import { KaTeXView } from '../math/KaTeXView';
import { Button } from '../common/Button';

export type VisualizerMode = 'demonstration' | 'guided' | 'independent' | 'speed';

interface TrachtenbergVisualizerProps {
  calculation: CalculationResult;
  techniqueName?: string;
  onCustomCalculate?: (a: string, b: string) => CalculationResult | null;
  defaultMultiplier?: string;
  onComplete?: (stats: { timeMs: number; errors: number; mode: VisualizerMode }) => void;
  className?: string;
}

export const TrachtenbergVisualizer: React.FC<TrachtenbergVisualizerProps> = ({
  calculation: initialCalc,
  techniqueName = 'Trachtenberg Method',
  onCustomCalculate,
  defaultMultiplier,
  onComplete,
  className = ''
}) => {
  const [calculation, setCalculation] = useState<CalculationResult>(initialCalc);
  const [mode, setMode] = useState<VisualizerMode>('demonstration');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1500); // ms per step

  // Guided Mode State
  const [guidedInputDigit, setGuidedInputDigit] = useState<string>('');
  const [guidedError, setGuidedError] = useState<string | null>(null);
  const [guidedHintLevel, setGuidedHintLevel] = useState<number>(0);
  const [guidedErrorsCount, setGuidedErrorsCount] = useState<number>(0);

  // Independent & Speed Mode State
  const [independentAnswer, setIndependentAnswer] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Speed Mode Timer
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const timerRef = useRef<any>(null);

  // Custom Input State
  const [customMultiplicand, setCustomMultiplicand] = useState<string>('');
  const [customMultiplier, setCustomMultiplier] = useState<string>(defaultMultiplier || '');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

  useEffect(() => {
    setCalculation(initialCalc);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setGuidedInputDigit('');
    setGuidedError(null);
    setGuidedHintLevel(0);
    setGuidedErrorsCount(0);
    setIndependentAnswer('');
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(null);
    setElapsedMs(0);
    setTimerActive(false);
  }, [initialCalc]);

  // Autoplay effect for Demonstration mode
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && mode === 'demonstration') {
      interval = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < calculation.steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, mode, calculation.steps.length, playbackSpeed]);

  // Timer effect for Speed mode
  useEffect(() => {
    if (timerActive) {
      const startTime = Date.now() - elapsedMs;
      timerRef.current = setInterval(() => {
        setElapsedMs(Date.now() - startTime);
      }, 50);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  const steps = calculation.steps || [];
  const currentStep: CalculationStep | undefined = steps[currentStepIndex];

  // Parse operands from problemString e.g. "633 × 11"
  const problemParts = calculation.problemString.split(/[×÷+]/).map(s => s.trim());
  const multiplicand = problemParts[0] || '';
  const multiplier = problemParts.length > 1 ? problemParts[1] : undefined;
  const operator = calculation.problemString.includes('÷') ? '÷' : calculation.problemString.includes('+') ? '+' : '×';

  // Build partial answer string up to current step
  const getPartialAnswer = (): string => {
    if (mode === 'demonstration' || mode === 'guided') {
      if (!steps.length) return calculation.answerString;
      // Trachtenberg produces digits from right to left
      const producedDigits = steps.slice(0, currentStepIndex + 1).map(s => String(s.producedDigit));
      return producedDigits.reverse().join('');
    }
    if (isAnswerSubmitted) {
      return calculation.answerString;
    }
    return '';
  };

  // Find digit indices for highlighting in MathDigitGrid
  // Multiplicand typically padded with leading 0 or 00
  const paddedMultiplicand = currentStep?.ruleApplied?.includes('zero') || multiplicand.startsWith('0')
    ? multiplicand
    : '0' + multiplicand;

  const getActiveIndices = () => {
    if (!currentStep) return undefined;
    
    // Convert right-based or step-based digits to index in paddedMultiplicand
    const mLen = paddedMultiplicand.length;
    let currIdx: number | undefined = undefined;
    let neighIdx: number | undefined = undefined;

    if (currentStep.highlightIndices?.multiplicand?.length) {
      currIdx = currentStep.highlightIndices.multiplicand[0];
      if (currentStep.highlightIndices.multiplicand.length > 1) {
        neighIdx = currentStep.highlightIndices.multiplicand[1];
      }
    } else {
      // Step 0 is units (rightmost digit), Step 1 is tens, etc.
      currIdx = mLen - 1 - currentStepIndex;
      neighIdx = currIdx + 1 < mLen ? currIdx + 1 : undefined;
    }

    return {
      currentDigitIndex: currIdx >= 0 && currIdx < mLen ? currIdx : undefined,
      neighborDigitIndex: neighIdx !== undefined && neighIdx < mLen ? neighIdx : undefined,
      carryIn: currentStep.carryIn,
      carryOut: currentStep.carryOut,
      producedDigitIndex: 0 // In partial answer, newest is at index 0
    };
  };

  // Guided Mode: Check Next Digit
  const handleGuidedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStep) return;
    const expected = String(currentStep.producedDigit);
    if (guidedInputDigit.trim() === expected) {
      setGuidedError(null);
      setGuidedHintLevel(0);
      setGuidedInputDigit('');
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        // Complete!
        onComplete?.({ timeMs: 0, errors: guidedErrorsCount, mode: 'guided' });
      }
    } else {
      setGuidedErrorsCount(prev => prev + 1);
      setGuidedError(`Incorrect. Look closely at the formula: ${currentStep.workingFormula}`);
    }
  };

  // Independent & Speed Mode: Submit Full Answer
  const handleIndependentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimerActive(false);
    setIsAnswerSubmitted(true);
    const normalizedInput = independentAnswer.replace(/,/g, '').trim();
    const normalizedTarget = calculation.answerString.replace(/,/g, '').trim();
    const correct = normalizedInput === normalizedTarget;
    setIsAnswerCorrect(correct);

    onComplete?.({
      timeMs: elapsedMs,
      errors: correct ? 0 : 1,
      mode
    });
  };

  // Custom calculation handler
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onCustomCalculate || !customMultiplicand.trim()) return;
    const res = onCustomCalculate(customMultiplicand.trim(), customMultiplier.trim());
    if (res) {
      setCalculation(res);
      setCurrentStepIndex(0);
      setIsPlaying(false);
      setShowCustomInput(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-ink-850 border border-paper-300 dark:border-ink-800 rounded-xl overflow-hidden shadow-sm ${className}`}>
      {/* Top Header / Mode Switcher */}
      <div className="border-b border-paper-200 dark:border-ink-800 bg-paper-50 dark:bg-ink-900 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-academic-700 dark:text-academic-400">
            Interactive Visualizer
          </span>
          <h3 className="text-base font-serif font-bold text-ink-900 dark:text-paper-100">
            {calculation.problemString}
          </h3>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-paper-200/70 dark:bg-ink-800 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => { setMode('demonstration'); setIsPlaying(false); }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              mode === 'demonstration'
                ? 'bg-white dark:bg-ink-700 text-ink-900 dark:text-paper-100 shadow-xs font-semibold'
                : 'text-ink-600 dark:text-paper-400 hover:text-ink-900'
            }`}
          >
            Demonstration
          </button>
          <button
            onClick={() => { setMode('guided'); setIsPlaying(false); setCurrentStepIndex(0); }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              mode === 'guided'
                ? 'bg-white dark:bg-ink-700 text-ink-900 dark:text-paper-100 shadow-xs font-semibold'
                : 'text-ink-600 dark:text-paper-400 hover:text-ink-900'
            }`}
          >
            Guided
          </button>
          <button
            onClick={() => { setMode('independent'); setIsPlaying(false); }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              mode === 'independent'
                ? 'bg-white dark:bg-ink-700 text-ink-900 dark:text-paper-100 shadow-xs font-semibold'
                : 'text-ink-600 dark:text-paper-400 hover:text-ink-900'
            }`}
          >
            Independent
          </button>
          <button
            onClick={() => {
              setMode('speed');
              setIsPlaying(false);
              setElapsedMs(0);
              setTimerActive(true);
            }}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
              mode === 'speed'
                ? 'bg-white dark:bg-ink-700 text-academic-700 dark:text-academic-300 shadow-xs font-semibold'
                : 'text-ink-600 dark:text-paper-400 hover:text-ink-900'
            }`}
          >
            <Zap className="w-3 h-3 text-academic-600" />
            Speed
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="p-5 flex flex-col items-center">
        {/* Speed Mode Timer Display */}
        {mode === 'speed' && (
          <div className="mb-3 px-3 py-1 rounded-full bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 text-xs font-mono text-ink-700 dark:text-paper-300">
            Elapsed: <strong className="text-academic-700 dark:text-academic-300">{(elapsedMs / 1000).toFixed(1)}s</strong>
          </div>
        )}

        {/* Mathematical Digit Grid */}
        <div className="w-full max-w-lg flex justify-center my-2 overflow-x-auto py-2">
          <MathDigitGrid
            multiplicand={paddedMultiplicand}
            multiplier={multiplier}
            operator={operator}
            answer={getPartialAnswer()}
            activeStep={mode === 'demonstration' || mode === 'guided' ? getActiveIndices() : undefined}
          />
        </div>

        {/* DEMONSTRATION MODE CONTROLS */}
        {mode === 'demonstration' && steps.length > 0 && (
          <div className="w-full max-w-xl mt-4">
            {/* Step Slider & Stepper Bar */}
            <div className="flex items-center justify-between gap-3 text-xs text-ink-600 dark:text-paper-400 mb-2">
              <span className="font-mono">
                Step <strong>{currentStepIndex + 1}</strong> of <strong>{steps.length}</strong>
              </span>
              <div className="flex items-center gap-2">
                <span>Speed:</span>
                <select
                  value={playbackSpeed}
                  onChange={e => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-paper-100 dark:bg-ink-800 border border-paper-300 dark:border-ink-700 rounded px-1.5 py-0.5 text-xs text-ink-800 dark:text-paper-200"
                >
                  <option value={2500}>0.5×</option>
                  <option value={1500}>1.0×</option>
                  <option value={800}>2.0×</option>
                </select>
              </div>
            </div>

            {/* Step Progress Bar */}
            <div className="w-full bg-paper-200 dark:bg-ink-800 h-1.5 rounded-full overflow-hidden mb-4">
              <div
                className="bg-academic-600 dark:bg-academic-500 h-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setIsPlaying(false); setCurrentStepIndex(0); }}
                disabled={currentStepIndex === 0}
                title="Restart demonstration"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setIsPlaying(false); setCurrentStepIndex(prev => Math.max(0, prev - 1)); }}
                disabled={currentStepIndex === 0}
              >
                <SkipBack className="w-3.5 h-3.5 mr-1" /> Prev
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 mr-1" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 mr-1" /> Play
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setIsPlaying(false); setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1)); }}
                disabled={currentStepIndex === steps.length - 1}
              >
                Next <SkipForward className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setIsPlaying(false); setCurrentStepIndex(steps.length - 1); }}
                disabled={currentStepIndex === steps.length - 1}
                title="Jump to end"
              >
                <Eye className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Step Explanation Card */}
            {currentStep && (
              <div className="bg-paper-50 dark:bg-ink-900 border border-paper-200 dark:border-ink-800 rounded-lg p-4 transition-all">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-academic-100 text-academic-800 dark:bg-academic-950 dark:text-academic-300">
                    {currentStep.ruleApplied || 'Rule applied'}
                  </span>
                  <span className="text-xs font-mono text-ink-500">
                    Digit produced: <strong className="text-emerald-700 dark:text-emerald-400 text-sm">{currentStep.producedDigit}</strong>
                  </span>
                </div>

                <p className="text-sm font-medium text-ink-900 dark:text-paper-100 mb-2">
                  {currentStep.description}
                </p>

                <div className="bg-white dark:bg-ink-850 p-2.5 rounded border border-paper-200 dark:border-ink-800 font-mono text-xs text-ink-800 dark:text-paper-200 mb-2">
                  Working formula: <span className="font-bold text-academic-700 dark:text-academic-300">{currentStep.workingFormula}</span>
                </div>

                <p className="text-xs text-ink-600 dark:text-paper-400 leading-relaxed">
                  {currentStep.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* GUIDED MODE INTERACTIVE STEPPER */}
        {mode === 'guided' && currentStep && (
          <div className="w-full max-w-md mt-4">
            <div className="bg-academic-50/50 dark:bg-academic-950/20 border border-academic-200 dark:border-academic-800/60 rounded-lg p-4">
              <div className="text-xs font-semibold text-academic-800 dark:text-academic-300 mb-1">
                Step {currentStepIndex + 1} of {steps.length}: {currentStep.ruleApplied}
              </div>
              <p className="text-sm text-ink-800 dark:text-paper-200 mb-3">
                {currentStep.description}
              </p>

              {/* Formula Guidance */}
              <div className="text-xs font-mono bg-white dark:bg-ink-900 p-2 rounded border border-paper-300 dark:border-ink-800 mb-4 text-ink-700 dark:text-paper-300">
                Formula: {currentStep.workingFormula}
              </div>

              {/* Input for Next Produced Digit */}
              <form onSubmit={handleGuidedSubmit} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-ink-700 dark:text-paper-300">
                    What digit is written down?
                  </label>
                  <input
                    type="text"
                    maxLength={1}
                    value={guidedInputDigit}
                    onChange={e => setGuidedInputDigit(e.target.value)}
                    placeholder="?"
                    autoFocus
                    className="w-12 h-10 text-center font-mono text-lg font-bold bg-white dark:bg-ink-850 border-2 border-academic-500 rounded text-ink-900 dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-academic-400"
                  />
                  <Button type="submit" variant="primary" size="sm">
                    Confirm <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>

                {/* Error message */}
                {guidedError && (
                  <div className="flex items-start gap-1.5 text-xs text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2 rounded border border-rose-200 dark:border-rose-900">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{guidedError}</span>
                  </div>
                )}

                {/* Progressive Hint Trigger */}
                <div className="flex items-center justify-between text-xs text-ink-500 pt-1">
                  <button
                    type="button"
                    onClick={() => setGuidedHintLevel(prev => Math.min(2, prev + 1))}
                    className="flex items-center gap-1 text-academic-700 dark:text-academic-400 hover:underline"
                  >
                    <HelpCircle className="w-3.5 h-3.5" /> Need a hint? ({guidedHintLevel}/2)
                  </button>
                  {guidedHintLevel > 0 && (
                    <span className="text-xs italic text-ink-600 dark:text-paper-400">
                      {guidedHintLevel === 1 && `Rule: ${currentStep.ruleApplied}`}
                      {guidedHintLevel === 2 && `Partial result: ${currentStep.intermediateResult || currentStep.producedDigit}`}
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* INDEPENDENT / SPEED MODE INTERFACE */}
        {(mode === 'independent' || mode === 'speed') && (
          <div className="w-full max-w-md mt-4">
            <form onSubmit={handleIndependentSubmit} className="flex flex-col gap-3">
              <label className="text-xs font-medium text-ink-700 dark:text-paper-300">
                Enter your complete calculated answer:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={independentAnswer}
                  onChange={e => setIndependentAnswer(e.target.value)}
                  placeholder="e.g. 6963"
                  disabled={isAnswerSubmitted}
                  className="flex-1 font-mono text-lg font-bold px-3 py-2 bg-white dark:bg-ink-850 border border-paper-300 dark:border-ink-700 rounded text-ink-900 dark:text-paper-100 focus:outline-none focus:ring-2 focus:ring-academic-500"
                />
                {!isAnswerSubmitted ? (
                  <Button type="submit" variant="primary" size="md">
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setIsAnswerSubmitted(false);
                      setIsAnswerCorrect(null);
                      setIndependentAnswer('');
                      if (mode === 'speed') {
                        setElapsedMs(0);
                        setTimerActive(true);
                      }
                    }}
                  >
                    Try Again
                  </Button>
                )}
              </div>

              {/* Feedback after submission */}
              {isAnswerSubmitted && (
                <div
                  className={`p-3 rounded-lg border text-sm flex items-start gap-2 ${
                    isAnswerCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  {isAnswerCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                      <div>
                        <strong>Excellent! Correct answer: {calculation.answerString}</strong>
                        {mode === 'speed' && (
                          <div className="text-xs mt-1">
                            Calculated in <strong>{(elapsedMs / 1000).toFixed(2)} seconds</strong>!
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
                      <div>
                        <strong>Incorrect. The correct product is {calculation.answerString}.</strong>
                        <div className="text-xs mt-1">
                          Switch to <strong>Demonstration mode</strong> to inspect each step!
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </form>
          </div>
        )}

        {/* Verification Footer (Digit-Sum / Elevens Check) */}
        {calculation.verification && (
          <div className="w-full max-w-xl mt-6 pt-3 border-t border-paper-200 dark:border-ink-800 flex items-center justify-between text-xs text-ink-500 dark:text-paper-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Check: <strong className="font-mono text-ink-700 dark:text-paper-300">{calculation.verification.details}</strong>
            </span>
            <span className="italic">{calculation.verification.method}</span>
          </div>
        )}

        {/* Custom Input Trigger */}
        {onCustomCalculate && (
          <div className="mt-4 pt-3 w-full max-w-xl border-t border-paper-200 dark:border-ink-800 text-center">
            {!showCustomInput ? (
              <button
                onClick={() => setShowCustomInput(true)}
                className="text-xs text-academic-700 dark:text-academic-400 hover:underline font-medium"
              >
                + Try your own numbers with this technique
              </button>
            ) : (
              <form onSubmit={handleCustomSubmit} className="bg-paper-50 dark:bg-ink-900 p-3 rounded border border-paper-300 dark:border-ink-800 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span>Calculate:</span>
                <input
                  type="text"
                  placeholder="Multiplicand"
                  value={customMultiplicand}
                  onChange={e => setCustomMultiplicand(e.target.value)}
                  className="w-28 px-2 py-1 font-mono bg-white dark:bg-ink-850 border border-paper-300 dark:border-ink-700 rounded text-xs"
                />
                <span>×</span>
                <input
                  type="text"
                  placeholder="Multiplier"
                  value={customMultiplier}
                  onChange={e => setCustomMultiplier(e.target.value)}
                  className="w-20 px-2 py-1 font-mono bg-white dark:bg-ink-850 border border-paper-300 dark:border-ink-700 rounded text-xs"
                />
                <Button type="submit" variant="primary" size="sm">
                  Simulate
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowCustomInput(false)}>
                  Cancel
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
