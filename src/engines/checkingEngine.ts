/**
 * Verification & Checking Engine
 * Implements:
 * 1. Digit-Sum (Nines-Remainder) Method with casting out 9s and running reductions
 * 2. Elevens-Remainder Method (2-digit, alternating sum, adjacent pairwise shortcut)
 */

export interface DigitSumResult {
  originalString: string;
  steps: string[];
  runningTotals: number[];
  reducedDigitSum: number;
  explanation: string;
}

export interface ElevensRemainderResult {
  originalString: string;
  twoDigitRemainder?: number;
  alternatingEvenSum: number;
  alternatingOddSum: number;
  alternatingDifference: number;
  pairwiseGroups?: { pair: string; remainder: number }[];
  elevensRemainder: number;
  explanation: string;
}

export function computeDigitSumDetailed(numStr: string): DigitSumResult {
  const clean = numStr.replace(/[^0-9]/g, '');
  if (!clean) throw new Error('Invalid number for digit sum');

  const digits = clean.split('').map(Number);
  const steps: string[] = [];
  const runningTotals: number[] = [];
  let running = 0;

  for (let i = 0; i < digits.length; i++) {
    const d = digits[i];
    if (d === 9) {
      steps.push(`Digit ${d}: Ignored (nines don't count)`);
      runningTotals.push(running);
      continue;
    }

    running += d;
    if (running >= 10) {
      const reduced = Math.floor(running / 10) + (running % 10);
      steps.push(`Digit ${d}: Running total ${running} → reduced to ${reduced}`);
      running = reduced;
    } else {
      steps.push(`Digit ${d}: Running total ${running}`);
    }
    runningTotals.push(running);
  }

  const finalSum = running === 9 ? 0 : running;

  return {
    originalString: clean,
    steps,
    runningTotals,
    reducedDigitSum: finalSum,
    explanation: `The reduced digit-sum of ${clean} is ${finalSum} (9 is treated as 0).`
  };
}

export function computeElevensRemainderDetailed(numStr: string): ElevensRemainderResult {
  const clean = numStr.replace(/[^0-9]/g, '');
  if (!clean) throw new Error('Invalid number for elevens remainder');

  const digits = clean.split('').map(Number);
  const n = digits.length;

  if (n === 1) {
    return {
      originalString: clean,
      alternatingEvenSum: digits[0],
      alternatingOddSum: 0,
      alternatingDifference: digits[0],
      elevensRemainder: digits[0],
      explanation: `Single digit ${digits[0]} modulo 11 is ${digits[0]}.`
    };
  }

  if (n === 2) {
    const tens = digits[0];
    const units = digits[1];
    let diff = units - tens;
    let explanation = '';
    if (diff < 0) {
      diff += 11;
      explanation = `Two-digit number ${clean}: Units (${units}) is less than Tens (${tens}), so add 11: (${units} + 11) - ${tens} = ${diff}.`;
    } else {
      explanation = `Two-digit number ${clean}: Units (${units}) - Tens (${tens}) = ${diff}.`;
    }

    return {
      originalString: clean,
      twoDigitRemainder: diff,
      alternatingEvenSum: units,
      alternatingOddSum: tens,
      alternatingDifference: diff,
      elevensRemainder: diff,
      explanation
    };
  }

  // Numbers > 2 digits: Alternating sum from right to left
  // Position 0 (rightmost, units) is Even position (index 0, 2, 4...)
  // Position 1 (tens) is Odd position (index 1, 3, 5...)
  const reversed = digits.slice().reverse();
  let evenSum = 0;
  let oddSum = 0;

  for (let i = 0; i < reversed.length; i++) {
    if (i % 2 === 0) {
      evenSum += reversed[i];
    } else {
      oddSum += reversed[i];
    }
  }

  let diff = evenSum - oddSum;
  let normalizedRem = ((diff % 11) + 11) % 11;

  // Also pairwise adjacent shortcut (pp. 129-130)
  const pairGroups: { pair: string; remainder: number }[] = [];
  for (let i = 0; i < clean.length; i += 2) {
    const pStr = clean.slice(i, Math.min(i + 2, clean.length));
    if (pStr.length === 2) {
      const u = parseInt(pStr[1], 10);
      const t = parseInt(pStr[0], 10);
      let pRem = u - t;
      if (pRem < 0) pRem += 11;
      pairGroups.push({ pair: pStr, remainder: pRem });
    } else {
      pairGroups.push({ pair: pStr, remainder: parseInt(pStr, 10) });
    }
  }

  const pairwiseSum = pairGroups.reduce((acc, p) => acc + p.remainder, 0);

  return {
    originalString: clean,
    alternatingEvenSum: evenSum,
    alternatingOddSum: oddSum,
    alternatingDifference: diff,
    pairwiseGroups: pairGroups,
    elevensRemainder: normalizedRem,
    explanation: `Sum of every second digit from right (${evenSum}) minus sum of skipped digits (${oddSum}) = ${diff} ≡ ${normalizedRem} (mod 11). Pairwise check: sum of pairs = ${pairwiseSum} ≡ ${pairwiseSum % 11} (mod 11).`
  };
}
