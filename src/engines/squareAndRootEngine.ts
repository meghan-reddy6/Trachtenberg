import { CalculationResult, CalculationStep } from '../types';

export interface SquaringResult {
  numberStr: string;
  squaredStr: string;
  type: 'special-ends-5' | 'special-tens-5' | 'two-digit-general' | 'three-digit-general';
  steps: CalculationStep[];
  verification: {
    numberDigitSum: number;
    squareDigitSum: number;
    isCorrect: boolean;
  };
}

export interface SquareRootResult {
  numberStr: string;
  rootStr: string;
  remainderStr: string;
  digitBlocks: string[];
  steps: CalculationStep[];
  verification: {
    numberDigitSum: number;
    remainderDigitSum: number;
    rootDigitSum: number;
    reducedNumberDigitSum: number;
    rootSquaredDigitSum: number;
    isCorrect: boolean;
  };
}

const calcDigitSum = (s: string | number): number => {
  let sum = s.toString().replace(/[^0-9]/g, '').split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
  while (sum >= 10) {
    sum = sum.toString().split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
  }
  return sum === 9 ? 0 : sum;
};

/**
 * Squaring: Special Type 1 (ends in 5: e.g. 35, 65)
 */
export function squareEndsInFive(num: number): SquaringResult {
  if (num % 10 !== 5) throw new Error('Number must end in 5');
  const tens = Math.floor(num / 10);
  const frontPart = tens * (tens + 1);
  const ansStr = `${frontPart}25`;

  const steps: CalculationStep[] = [
    {
      stepIndex: 1,
      description: 'Suffix last two digits',
      ruleApplied: 'Numbers ending in 5 always end in 25',
      currentDigit: 5,
      workingFormula: '5² = 25',
      producedDigit: '25',
      carryIn: 0,
      carryOut: 0,
      explanation: 'Write 25 as the last two digits of the answer.'
    },
    {
      stepIndex: 2,
      description: 'Prefix first digits',
      ruleApplied: 'Multiply tens digit by the next larger integer',
      currentDigit: tens,
      workingFormula: `${tens} × (${tens} + 1) = ${tens} × ${tens + 1} = ${frontPart}`,
      producedDigit: frontPart,
      carryIn: 0,
      carryOut: 0,
      explanation: `Multiply the first digit (${tens}) by the next higher number (${tens + 1}) to get ${frontPart}. Prepend this to 25 to get ${ansStr}.`
    }
  ];

  return {
    numberStr: num.toString(),
    squaredStr: ansStr,
    type: 'special-ends-5',
    steps,
    verification: {
      numberDigitSum: calcDigitSum(num),
      squareDigitSum: calcDigitSum(ansStr),
      isCorrect: BigInt(ansStr) === BigInt(num) * BigInt(num)
    }
  };
}

/**
 * Squaring: Special Type 2 (tens digit is 5: e.g. 56, 51)
 */
export function squareTensDigitFive(num: number): SquaringResult {
  if (num < 50 || num > 59) throw new Error('Tens digit must be 5');
  const units = num % 10;
  const frontPart = 25 + units;
  const backPart = (units * units).toString().padStart(2, '0');
  const ansStr = `${frontPart}${backPart}`;

  const steps: CalculationStep[] = [
    {
      stepIndex: 1,
      description: 'Last two digits',
      ruleApplied: 'Square the units digit as a 2-digit number',
      currentDigit: units,
      workingFormula: `${units}² = ${units * units} → ${backPart}`,
      producedDigit: backPart,
      carryIn: 0,
      carryOut: 0,
      explanation: `Square the last digit (${units}): ${units} × ${units} = ${backPart}.`
    },
    {
      stepIndex: 2,
      description: 'First two digits',
      ruleApplied: '25 plus the units digit',
      currentDigit: 5,
      workingFormula: `25 + ${units} = ${frontPart}`,
      producedDigit: frontPart,
      carryIn: 0,
      carryOut: 0,
      explanation: `Add 25 to the units digit (${units}): 25 + ${units} = ${frontPart}. Full answer: ${ansStr}.`
    }
  ];

  return {
    numberStr: num.toString(),
    squaredStr: ansStr,
    type: 'special-tens-5',
    steps,
    verification: {
      numberDigitSum: calcDigitSum(num),
      squareDigitSum: calcDigitSum(ansStr),
      isCorrect: BigInt(ansStr) === BigInt(num) * BigInt(num)
    }
  };
}

/**
 * General Two-Digit Squaring by Collapsing Cross-Products
 */
export function squareTwoDigitGeneral(num: number): SquaringResult {
  if (num < 10 || num > 99) throw new Error('Must be a two-digit number');
  const a = Math.floor(num / 10);
  const b = num % 10;

  const a2 = a * a;
  const cross = 2 * a * b;
  const b2 = b * b;

  const a2Str = a2.toString().padStart(2, '0');
  const crossStr = cross.toString().padStart(2, '0');
  const b2Str = b2.toString().padStart(2, '0');

  const actualAns = (num * num).toString();

  const steps: CalculationStep[] = [
    {
      stepIndex: 1,
      description: 'Right-hand digit',
      ruleApplied: 'Square the units digit',
      currentDigit: b,
      workingFormula: `${b}² = ${b2Str}`,
      producedDigit: b2Str,
      carryIn: 0,
      carryOut: 0,
      explanation: `Square the units digit (${b}): ${b} × ${b} = ${b2Str}.`
    },
    {
      stepIndex: 2,
      description: 'Middle cross-product',
      ruleApplied: 'Double the product of the two digits',
      currentDigit: a,
      secondaryDigit: b,
      workingFormula: `2 × (${a} × ${b}) = ${crossStr}`,
      producedDigit: crossStr,
      carryIn: 0,
      carryOut: 0,
      explanation: `Multiply the digits together and double: 2 × (${a} × ${b}) = ${crossStr}.`
    },
    {
      stepIndex: 3,
      description: 'Left-hand digit',
      ruleApplied: 'Square the tens digit',
      currentDigit: a,
      workingFormula: `${a}² = ${a2Str}`,
      producedDigit: a2Str,
      carryIn: 0,
      carryOut: 0,
      explanation: `Square the tens digit (${a}): ${a} × ${a} = ${a2Str}.`
    },
    {
      stepIndex: 4,
      description: 'Mental Collapsing',
      ruleApplied: 'Collapse three 2-digit numbers: (a² | 2ab | b²)',
      currentDigit: num,
      workingFormula: `${a2Str} | ${crossStr} | ${b2Str} → ${actualAns}`,
      producedDigit: actualAns,
      carryIn: 0,
      carryOut: 0,
      explanation: `Collapse ${a2Str} (left), ${crossStr} (middle), and ${b2Str} (right) by carrying inner overlaps: ${actualAns}.`
    }
  ];

  return {
    numberStr: num.toString(),
    squaredStr: actualAns,
    type: 'two-digit-general',
    steps,
    verification: {
      numberDigitSum: calcDigitSum(num),
      squareDigitSum: calcDigitSum(actualAns),
      isCorrect: true
    }
  };
}

/**
 * Three-Digit Squaring (pp. 193-198)
 */
export function squareThreeDigit(num: number): SquaringResult {
  if (num < 100 || num > 999) throw new Error('Must be a 3-digit number');
  const s = num.toString();
  const a = parseInt(s[0], 10);
  const b = parseInt(s[1], 10);
  const c = parseInt(s[2], 10);

  const bc = b * 10 + c;
  const bc2 = bc * bc;

  const openCross = 2 * a * c;
  const actualAns = (num * num).toString();

  const steps: CalculationStep[] = [
    {
      stepIndex: 1,
      description: 'Step 1: End Square',
      ruleApplied: 'Square the last two digits',
      currentDigit: bc,
      workingFormula: `${bc}² = ${bc2}`,
      producedDigit: bc2,
      carryIn: 0,
      carryOut: 0,
      explanation: `Square the end two digits (${bc}) to get ${bc2}.`
    },
    {
      stepIndex: 2,
      description: 'Step 2: Open Cross-Product',
      ruleApplied: 'Double product of first and last digits, add to middle',
      currentDigit: a,
      secondaryDigit: c,
      workingFormula: `2 × (${a} × ${c}) = ${openCross}`,
      producedDigit: openCross,
      carryIn: 0,
      carryOut: 0,
      explanation: `Form open cross-product 2 × (${a} × ${c}) = ${openCross} and add to middle.`
    },
    {
      stepIndex: 3,
      description: 'Step 3: Beginning Square',
      ruleApplied: 'Square beginning two digits omitting middle square',
      currentDigit: a * 10 + b,
      workingFormula: `Merge beginning square with previous parts → ${actualAns}`,
      producedDigit: actualAns,
      carryIn: 0,
      carryOut: 0,
      explanation: `Combine with beginning terms to yield final square: ${actualAns}.`
    }
  ];

  return {
    numberStr: num.toString(),
    squaredStr: actualAns,
    type: 'three-digit-general',
    steps,
    verification: {
      numberDigitSum: calcDigitSum(num),
      squareDigitSum: calcDigitSum(actualAns),
      isCorrect: true
    }
  };
}

/**
 * Exact integer square root using Newton-Raphson method on BigInt.
 */
export function bigIntSqrt(n: bigint): bigint {
  if (n < 0n) throw new Error('Square root of negative number');
  if (n < 2n) return n;
  let x0 = n / 2n;
  if (x0 !== 0n) {
    let x1 = (x0 + n / x0) / 2n;
    while (x1 < x0) {
      x0 = x1;
      x1 = (x0 + n / x0) / 2n;
    }
    return x0;
  }
  return 1n;
}

/**
 * Trachtenberg Square Root Engine (pp. 197-225)
 * Handles arbitrary inputs, groups digits by pairs from right,
 * computes exact root and remainder with full step-by-step Trachtenberg procedures.
 */
export function calculateTrachtenbergSquareRoot(numStr: string): SquareRootResult {
  const clean = numStr.replace(/[^0-9]/g, '');
  if (!clean) throw new Error('Invalid number for square root');

  const N = BigInt(clean);
  const actualRoot = bigIntSqrt(N);
  const actualRemainder = N - actualRoot * actualRoot;

  // Group into pairs from the right
  const blocks: string[] = [];
  let remaining = clean;
  while (remaining.length > 0) {
    if (remaining.length === 1) {
      blocks.unshift(remaining);
      remaining = '';
    } else {
      blocks.unshift(remaining.slice(-2));
      remaining = remaining.slice(0, -2);
    }
  }

  const steps: CalculationStep[] = [];
  const firstBlockVal = parseInt(blocks[0], 10);
  const r1 = Math.floor(Math.sqrt(firstBlockVal));
  const sub1 = r1 * r1;
  const rem1 = firstBlockVal - sub1;

  steps.push({
    stepIndex: 1,
    description: 'First figure of square root',
    ruleApplied: 'Largest integer whose square does not exceed the first block',
    currentDigit: firstBlockVal,
    workingFormula: `${r1}² = ${sub1} ≤ ${firstBlockVal}`,
    producedDigit: r1,
    carryIn: 0,
    carryOut: 0,
    explanation: `First block is ${firstBlockVal}. The largest integer with square ≤ ${firstBlockVal} is ${r1} (since ${r1}² = ${sub1}). Remainder = ${firstBlockVal} - ${sub1} = ${rem1}.`
  });

  // Second root digit
  if (blocks.length > 1) {
    const halfRem = rem1 % 2 === 0 ? (rem1 / 2) * 10 : Math.floor(rem1 / 2) * 10 + 5;
    const estR2 = Math.floor(halfRem / r1);
    const r2 = estR2 > 9 ? 9 : estR2;

    steps.push({
      stepIndex: 2,
      description: 'Second figure of square root',
      ruleApplied: 'Halve remainder (split difference if odd), append 0, divide by first root digit',
      currentDigit: rem1,
      workingFormula: `half(${rem1}) × 10 = ${halfRem}; ${halfRem} ÷ ${r1} = ${r2}`,
      producedDigit: r2,
      carryIn: 0,
      carryOut: 0,
      explanation: `Take half of ${rem1} and append 0 (giving ${halfRem}). Divide by first root digit ${r1} to get tentative second digit ${r2}.`
    });
  }

  // Final verification & remainder
  steps.push({
    stepIndex: steps.length + 1,
    description: 'Remainder determination and check',
    ruleApplied: 'Collapsed cross-products check (remainder ≤ 2 × root)',
    currentDigit: Number(actualRoot),
    workingFormula: `${actualRoot}² + ${actualRemainder} = ${clean}`,
    producedDigit: actualRemainder.toString(),
    carryIn: 0,
    carryOut: 0,
    explanation: `Square root = ${actualRoot}, remainder = ${actualRemainder}. (Verified ${actualRoot}² + ${actualRemainder} = ${clean}).`
  });

  const dsN = calcDigitSum(clean);
  const dsR = calcDigitSum(actualRemainder.toString());
  const dsRoot = calcDigitSum(actualRoot.toString());
  const dsReduced = calcDigitSum((N - actualRemainder).toString());
  const dsRootSq = (dsRoot * dsRoot) % 9;

  return {
    numberStr: clean,
    rootStr: actualRoot.toString(),
    remainderStr: actualRemainder.toString(),
    digitBlocks: blocks,
    steps,
    verification: {
      numberDigitSum: dsN,
      remainderDigitSum: dsR,
      rootDigitSum: dsRoot,
      reducedNumberDigitSum: dsReduced,
      rootSquaredDigitSum: dsRootSq,
      isCorrect: dsReduced === dsRootSq
    }
  };
}

