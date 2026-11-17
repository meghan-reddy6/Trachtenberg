import React from 'react';

export interface DigitHighlight {
  index: number;
  type: 'current' | 'neighbor' | 'outside' | 'inside' | 'carry' | 'produced' | 'secondary';
  label?: string;
}

interface MathDigitGridProps {
  multiplicand: string;
  multiplier?: string;
  operator?: string;
  answer?: string;
  activeStep?: {
    currentDigitIndex?: number; // index from right or absolute
    neighborDigitIndex?: number;
    secondaryIndices?: number[];
    carryIn?: number;
    carryOut?: number;
    producedDigitIndex?: number;
  };
  highlights?: DigitHighlight[];
  className?: string;
}

export const MathDigitGrid: React.FC<MathDigitGridProps> = ({
  multiplicand,
  multiplier,
  operator = '×',
  answer = '',
  activeStep,
  highlights = [],
  className = ''
}) => {
  // Pad strings into characters
  const mChars = multiplicand.split('');
  const ansChars = answer ? answer.split('') : [];

  // Determine highlight type for a given multiplicand index
  const getMultiplicandHighlight = (idx: number): { type: string; label?: string } | null => {
    if (activeStep) {
      if (activeStep.currentDigitIndex === idx) return { type: 'current', label: 'Number' };
      if (activeStep.neighborDigitIndex === idx) return { type: 'neighbor', label: 'Neighbor' };
      if (activeStep.secondaryIndices?.includes(idx)) return { type: 'secondary', label: 'Pair' };
    }
    const custom = highlights.find(h => h.index === idx);
    if (custom) return { type: custom.type, label: custom.label };
    return null;
  };

  const getHighlightClasses = (type: string) => {
    switch (type) {
      case 'current':
        return 'bg-academic-100 text-academic-900 border-academic-500 font-bold dark:bg-academic-950 dark:text-academic-200 dark:border-academic-400 ring-2 ring-academic-500/40';
      case 'neighbor':
        return 'bg-amber-100 text-amber-900 border-amber-500 font-bold dark:bg-amber-950 dark:text-amber-200 dark:border-amber-400 ring-2 ring-amber-500/40';
      case 'outside':
      case 'secondary':
        return 'bg-sky-100 text-sky-900 border-sky-500 font-bold dark:bg-sky-950 dark:text-sky-200 dark:border-sky-400 ring-2 ring-sky-500/40';
      case 'inside':
        return 'bg-purple-100 text-purple-900 border-purple-500 font-bold dark:bg-purple-950 dark:text-purple-200 dark:border-purple-400 ring-2 ring-purple-500/40';
      case 'produced':
        return 'bg-emerald-100 text-emerald-900 border-emerald-500 font-bold dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-400 ring-2 ring-emerald-500/40';
      default:
        return 'bg-paper-100 text-ink-900 border-paper-300 dark:bg-ink-800 dark:text-paper-100 dark:border-ink-700';
    }
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center p-4 bg-paper-50 dark:bg-ink-900 border border-paper-200 dark:border-ink-800 rounded-lg font-mono ${className}`}>
      {/* Visual Labels / Pointers */}
      <div className="flex gap-1.5 sm:gap-2 mb-1 justify-end min-h-[22px]">
        {mChars.map((_, idx) => {
          const hl = getMultiplicandHighlight(idx);
          return (
            <div key={`lbl-${idx}`} className="w-8 sm:w-10 text-center text-[10px] uppercase tracking-wider font-sans font-semibold">
              {hl?.label && (
                <span className={`inline-block px-1 py-0.5 rounded text-[9px] ${
                  hl.type === 'current' ? 'text-academic-700 dark:text-academic-300 bg-academic-100 dark:bg-academic-900/60' :
                  hl.type === 'neighbor' ? 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60' :
                  'text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/60'
                }`}>
                  {hl.label}
                </span>
              )}
            </div>
          );
        })}
        {multiplier && <div className="w-8 sm:w-10" />}
      </div>

      {/* Multiplicand Row */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {mChars.map((char, idx) => {
          const hl = getMultiplicandHighlight(idx);
          const isZeroPrefix = char === '0' && idx === 0;
          return (
            <div
              key={`m-${idx}`}
              className={`w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center text-lg sm:text-xl rounded border transition-all duration-200 ${
                hl ? getHighlightClasses(hl.type) : 'bg-white dark:bg-ink-850 text-ink-900 dark:text-paper-100 border-paper-300 dark:border-ink-700'
              } ${isZeroPrefix ? 'opacity-70 italic' : ''}`}
            >
              {char}
            </div>
          );
        })}

        {/* Multiplier / Operator */}
        {multiplier && (
          <div className="flex items-center gap-1 ml-2 text-ink-700 dark:text-paper-300">
            <span className="text-lg font-semibold">{operator}</span>
            <span className="w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-bold bg-paper-100 dark:bg-ink-800 rounded border border-paper-300 dark:border-ink-700 text-academic-800 dark:text-academic-300">
              {multiplier}
            </span>
          </div>
        )}
      </div>

      {/* Horizontal Divider */}
      <div className="w-full border-b-2 border-paper-400 dark:border-ink-700 my-2" />

      {/* Answer Row */}
      <div className="flex items-center gap-1.5 sm:gap-2 justify-end w-full pr-0 sm:pr-0">
        {/* We want the answer digits to align or display from right to left */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {ansChars.map((char, idx) => {
            const isLastProduced = activeStep && activeStep.producedDigitIndex === idx;
            return (
              <div
                key={`ans-${idx}`}
                className={`w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-bold rounded border transition-all duration-200 ${
                  isLastProduced
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-500 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-400 ring-2 ring-emerald-500/40 scale-105'
                    : 'bg-paper-100 dark:bg-ink-800 text-ink-900 dark:text-paper-100 border-paper-300 dark:border-ink-700'
                }`}
              >
                {char}
              </div>
            );
          })}
          {ansChars.length === 0 && (
            <div className="h-10 sm:h-12 flex items-center text-xs text-ink-400 dark:text-paper-400 italic px-4">
              Answer will appear here
            </div>
          )}
        </div>
        {multiplier && <div className="w-8 sm:w-10 ml-2" />}
      </div>

      {/* Carry Indicator if present */}
      {activeStep && ((activeStep.carryIn ?? 0) > 0 || (activeStep.carryOut ?? 0) > 0) && (
        <div className="mt-2 text-xs flex gap-4 text-ink-600 dark:text-paper-400 font-sans">
          {(activeStep.carryIn ?? 0) > 0 && (
            <span>
              Carry-in: <strong className="font-mono text-academic-700 dark:text-academic-300">+{activeStep.carryIn}</strong>
            </span>
          )}
          {(activeStep.carryOut ?? 0) > 0 && (
            <span>
              Carry-out to next: <strong className="font-mono text-emerald-700 dark:text-emerald-300">+{activeStep.carryOut}</strong>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
