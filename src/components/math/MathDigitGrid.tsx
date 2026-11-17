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
  answerSlots?: (string | null)[]; // Explicit per-column answer digits
  activeStep?: {
    currentDigitIndex?: number;
    neighborDigitIndex?: number;
    secondaryIndices?: number[];
    carryIn?: number;
    carryOut?: number;
    producedDigitIndex?: number;
    guidedActiveColumn?: number; // In guided mode, column awaiting entry
  };
  highlights?: DigitHighlight[];
  className?: string;
}

export const MathDigitGrid: React.FC<MathDigitGridProps> = ({
  multiplicand,
  multiplier,
  operator = '×',
  answer = '',
  answerSlots,
  activeStep,
  highlights = [],
  className = ''
}) => {
  // Digits of the multiplicand
  const rawMChars = multiplicand.replace(/,/g, '').split('');

  // Target answer string
  const cleanAns = answer ? answer.replace(/,/g, '') : '';
  const expectedAnsLen = answerSlots ? answerSlots.length : (cleanAns.length || rawMChars.length);

  // Total columns required: align place values to the right (units at the rightmost column)
  const numCols = Math.max(rawMChars.length, expectedAnsLen);

  // Pad multiplicand characters to align right if answer has more columns
  const mOffset = numCols - rawMChars.length;
  const mChars: (string | null)[] = [];
  for (let c = 0; c < numCols; c++) {
    if (c < mOffset) {
      mChars.push(null);
    } else {
      mChars.push(rawMChars[c - mOffset]);
    }
  }

  // Answer slots per column
  const ansDigits: (string | null)[] = [];
  if (answerSlots && answerSlots.length === numCols) {
    for (let c = 0; c < numCols; c++) {
      ansDigits.push(answerSlots[c]);
    }
  } else {
    // If answer is a string, align right
    const ansChars = cleanAns.split('');
    const ansOffset = numCols - ansChars.length;
    for (let c = 0; c < numCols; c++) {
      if (c < ansOffset) {
        ansDigits.push(null);
      } else {
        ansDigits.push(ansChars[c - ansOffset]);
      }
    }
  }

  // Multiplier characters if multi-digit
  const multChars = multiplier ? multiplier.split('') : [];

  // Determine highlight type for a given column in the multiplicand
  const getColHighlight = (colIdx: number): { type: string; label?: string } | null => {
    // Convert colIdx back to raw multiplicand index
    const mIdx = colIdx - mOffset;
    if (mIdx < 0 || mIdx >= rawMChars.length) return null;

    if (activeStep) {
      if (activeStep.currentDigitIndex === mIdx) return { type: 'current', label: 'Number' };
      if (activeStep.neighborDigitIndex === mIdx) return { type: 'neighbor', label: 'Neighbor' };
      if (activeStep.secondaryIndices?.includes(mIdx)) return { type: 'secondary', label: 'Pair' };
    }
    const custom = highlights.find(h => h.index === mIdx);
    if (custom) return { type: custom.type, label: custom.label };
    return null;
  };

  const getHighlightClasses = (type: string) => {
    switch (type) {
      case 'current':
        return 'bg-blue-100 text-blue-900 border-blue-500 font-bold dark:bg-blue-900/60 dark:text-blue-100 dark:border-blue-400 ring-2 ring-blue-500/50';
      case 'neighbor':
        return 'bg-amber-100 text-amber-900 border-amber-500 font-bold dark:bg-amber-900/60 dark:text-amber-100 dark:border-amber-400 ring-2 ring-amber-500/50';
      case 'outside':
      case 'secondary':
        return 'bg-sky-100 text-sky-900 border-sky-500 font-bold dark:bg-sky-900/60 dark:text-sky-100 dark:border-sky-400 ring-2 ring-sky-500/50';
      case 'inside':
        return 'bg-purple-100 text-purple-900 border-purple-500 font-bold dark:bg-purple-900/60 dark:text-purple-100 dark:border-purple-400 ring-2 ring-purple-500/50';
      case 'produced':
        return 'bg-emerald-100 text-emerald-900 border-emerald-500 font-bold dark:bg-emerald-900/60 dark:text-emerald-100 dark:border-emerald-400 ring-2 ring-emerald-500/50';
      default:
        return 'bg-paper-100 text-ink-900 border-paper-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700';
    }
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center p-4 sm:p-6 bg-paper-50 dark:bg-slate-900 border border-paper-200 dark:border-slate-800 rounded-xl font-mono select-none ${className}`}>
      {/* Unified Column Grid */}
      <div className="flex items-center">
        {/* Square Root Radical Symbol if operator is √ */}
        {operator === '√' && (
          <div className="flex flex-col items-center mr-1.5 sm:mr-2">
            <div className="h-6 mb-1" />
            <div className="h-10 sm:h-12 flex items-center justify-center text-2xl sm:text-3xl font-serif font-bold text-academic-700 dark:text-blue-400">
              √
            </div>
            <div className="w-full border-b-2 border-transparent my-2" />
            <div className="h-10 sm:h-12" />
          </div>
        )}

        {/* Main Place Value Columns */}
        <div className="flex gap-1.5 sm:gap-2">
          {Array.from({ length: numCols }).map((_, c) => {
            const mChar = mChars[c];
            const ansChar = ansDigits[c];
            const hl = getColHighlight(c);
            const isZeroPrefix = mChar === '0' && c === mOffset;
            const isAwaitingGuided = activeStep?.guidedActiveColumn === c;
            const isLastProduced = activeStep?.producedDigitIndex === c && ansChar !== null;

            return (
              <div key={`col-${c}`} className="flex flex-col items-center w-8 sm:w-11">
                {/* 1. Label above digit */}
                <div className="h-6 flex items-center justify-center mb-1 text-[9px] uppercase tracking-wider font-sans font-bold">
                  {hl?.label && (
                    <span className={`px-1 py-0.5 rounded text-[8px] sm:text-[9px] leading-none ${
                      hl.type === 'current' ? 'text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/70 border border-blue-200 dark:border-blue-700' :
                      hl.type === 'neighbor' ? 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/70 border border-amber-200 dark:border-amber-700' :
                      'text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/70 border border-sky-200 dark:border-sky-700'
                    }`}>
                      {hl.label}
                    </span>
                  )}
                </div>

                {/* 2. Multiplicand Digit Box */}
                <div
                  className={`w-8 h-10 sm:w-11 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-bold rounded-lg border transition-all duration-200 ${
                    mChar === null
                      ? 'border-transparent bg-transparent'
                      : hl
                        ? getHighlightClasses(hl.type)
                        : 'bg-white dark:bg-slate-800 text-ink-900 dark:text-white border-paper-300 dark:border-slate-700 shadow-2xs'
                  } ${isZeroPrefix ? 'opacity-60 italic' : ''}`}
                >
                  {mChar ?? ''}
                </div>

                {/* 3. Horizontal Grid Line */}
                <div className="w-full border-b-2 border-paper-400 dark:border-slate-700 my-2" />

                {/* 4. Answer Digit Box */}
                <div
                  className={`w-8 h-10 sm:w-11 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-bold rounded-lg border transition-all duration-200 ${
                    isAwaitingGuided
                      ? 'border-dashed border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 animate-pulse font-bold'
                      : isLastProduced
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-500 dark:bg-emerald-900/70 dark:text-emerald-100 dark:border-emerald-400 ring-2 ring-emerald-500/50 scale-105 shadow-sm'
                        : ansChar !== null
                          ? 'bg-paper-100 dark:bg-slate-800 text-ink-900 dark:text-white border-paper-300 dark:border-slate-700 shadow-2xs'
                          : 'border-dashed border-paper-300 dark:border-slate-800/80 text-ink-300 dark:text-slate-700'
                  }`}
                >
                  {isAwaitingGuided ? '?' : (ansChar ?? '·')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Multiplier & Operator Column */}
        {multiplier ? (
          <div className="flex flex-col items-center ml-2 sm:ml-3">
            {/* Empty space matching label height */}
            <div className="h-6 mb-1" />

            {/* Operator and Multiplier Box */}
            <div className="h-10 sm:h-12 flex items-center gap-1.5 sm:gap-2 text-ink-700 dark:text-slate-300">
              <span className="text-lg sm:text-xl font-bold font-sans">{operator}</span>
              <div className="px-2.5 sm:px-3 h-10 sm:h-12 flex items-center justify-center text-base sm:text-lg font-bold bg-paper-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 rounded-lg border border-paper-300 dark:border-slate-700 shadow-2xs">
                {multiplier}
              </div>
            </div>

            {/* Horizontal line matching answer divider */}
            <div className="w-full border-b-2 border-transparent my-2" />

            {/* Empty box matching answer height for alignment */}
            <div className="h-10 sm:h-12" />
          </div>
        ) : operator === '²' ? (
          <div className="flex flex-col items-center ml-1 sm:ml-2">
            <div className="h-6 mb-1" />
            <div className="h-10 sm:h-12 flex items-start text-academic-700 dark:text-blue-400">
              <span className="text-xl sm:text-2xl font-bold font-mono">²</span>
            </div>
            <div className="w-full border-b-2 border-transparent my-2" />
            <div className="h-10 sm:h-12" />
          </div>
        ) : null}
      </div>

      {/* Carry Indicator */}
      {activeStep && ((activeStep.carryIn ?? 0) > 0 || (activeStep.carryOut ?? 0) > 0) && (
        <div className="mt-3 text-xs flex items-center gap-4 text-ink-600 dark:text-slate-400 font-sans">
          {(activeStep.carryIn ?? 0) > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300">
              Carry-in: <strong className="font-mono text-sm">+{activeStep.carryIn}</strong>
            </span>
          )}
          {(activeStep.carryOut ?? 0) > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
              Carry-out: <strong className="font-mono text-sm">+{activeStep.carryOut}</strong>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
