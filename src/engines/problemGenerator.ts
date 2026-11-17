import { Difficulty, ExerciseFormat, PracticeQuestion } from '../types';
import { calculateSingleDigitTrachtenberg } from './singleDigitEngine';
import { calculateDirectMultiplication } from './directMultiplicationEngine';
import { calculateTwoFingerMultiplication } from './twoFingerEngine';
import { calculateTrachtenbergAddition } from './additionEngine';
import { calculateSimpleDivision, calculateFastDivision } from './divisionEngine';
import { 
  squareEndsInFive, 
  squareTensDigitFive, 
  squareTwoDigitGeneral, 
  squareThreeDigit, 
  calculateTrachtenbergSquareRoot 
} from './squareAndRootEngine';
import { computeDigitSumDetailed, computeElevensRemainderDetailed } from './checkingEngine';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Deterministic problem generator for any Trachtenberg technique.
 */
export function generateQuestionForTechnique(
  techniqueId: string, 
  difficulty: Difficulty = 'intermediate',
  format: ExerciseFormat = 'numerical-answer'
): PracticeQuestion {
  const qId = `q-${techniqueId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Default fallbacks
  let prompt = '';
  let expression = '';
  let correctAnswer = '';
  let hints: [string, string, string] = ['', '', ''];
  let steps: string[] = [];
  let explanation = '';
  let operands: PracticeQuestion['operands'] = undefined;
  let options: string[] | undefined = undefined;

  // CHAPTER 1 TECHNIQUES
  if (techniqueId.startsWith('tech-101')) {
    // Multiply by 11
    let num = 0;
    if (difficulty === 'beginner') num = getRandomInt(12, 99);
    else if (difficulty === 'intermediate') num = getRandomInt(100, 999);
    else if (difficulty === 'advanced') num = getRandomInt(1000, 99999);
    else num = getRandomInt(100000, 9999999);

    const calc = calculateSingleDigitTrachtenberg(num.toString(), 11);
    prompt = `Multiply ${num.toLocaleString()} by 11 using the Trachtenberg "add the neighbor" rule.`;
    expression = `${num} × 11`;
    correctAnswer = calc.answerString;
    operands = { a: num, b: 11, op: '×' };
    hints = [
      'Rule for 11: Put down the rightmost digit, then for each subsequent digit, add its right-hand neighbor. Write a zero in front of the number.',
      `Start at the right end with ${num % 10}. The next step adds the tens digit to this units digit.`,
      `Don't forget to add carried dots if any sum is 10 or greater. Prefix step: 0 + first digit of number.`
    ];
    steps = calc.steps.map(s => `Step ${s.stepIndex}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`);
    explanation = `Applying the Rule for 11: 0${num} × 11 gives ${calc.answerString}. Each digit is formed by adding the neighbor to the right.`;
  } 
  else if (techniqueId.startsWith('tech-102')) {
    // Multiply by 12
    let num = 0;
    if (difficulty === 'beginner') num = getRandomInt(12, 99);
    else if (difficulty === 'intermediate') num = getRandomInt(100, 999);
    else if (difficulty === 'advanced') num = getRandomInt(1000, 99999);
    else num = getRandomInt(100000, 9999999);

    const calc = calculateSingleDigitTrachtenberg(num.toString(), 12);
    prompt = `Multiply ${num.toLocaleString()} by 12 using the "double and add the neighbor" rule.`;
    expression = `${num} × 12`;
    correctAnswer = calc.answerString;
    operands = { a: num, b: 12, op: '×' };
    hints = [
      'Rule for 12: Double each number in turn and add its right-hand neighbor. Prefix a zero.',
      `First step: Double the rightmost digit (${num % 10}).`,
      `For middle digits: 2 × (digit) + neighbor + carry.`
    ];
    steps = calc.steps.map(s => `Step ${s.stepIndex}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`);
    explanation = `0${num} × 12 = ${calc.answerString}. Every digit is doubled before adding its right neighbor.`;
  }
  else if (techniqueId.startsWith('tech-103')) {
    // Multiply by 6
    let num = 0;
    if (difficulty === 'beginner') num = getRandomInt(20, 88);
    else if (difficulty === 'intermediate') num = getRandomInt(100, 999);
    else if (difficulty === 'advanced') num = getRandomInt(1000, 99999);
    else num = getRandomInt(100000, 9999999);

    const calc = calculateSingleDigitTrachtenberg(num.toString(), 6);
    prompt = `Multiply ${num.toLocaleString()} by 6 using the rule for six.`;
    expression = `${num} × 6`;
    correctAnswer = calc.answerString;
    operands = { a: num, b: 6, op: '×' };
    hints = [
      'Rule for 6: To each number add "half" the neighbor (drop fractions); add 5 if the number itself is odd.',
      `Check if the number is odd first! If odd, add 5 immediately so you don't forget it.`,
      `"Half" of an odd neighbor drops the remainder: half of 7 is 3, half of 5 is 2, half of 1 is 0.`
    ];
    steps = calc.steps.map(s => `Step ${s.stepIndex}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`);
    explanation = `0${num} × 6 = ${calc.answerString}.`;
  }
  else if (techniqueId.startsWith('tech-104')) {
    // Multiply by 7
    let num = 0;
    if (difficulty === 'beginner') num = getRandomInt(20, 99);
    else if (difficulty === 'intermediate') num = getRandomInt(100, 999);
    else if (difficulty === 'advanced') num = getRandomInt(1000, 99999);
    else num = getRandomInt(100000, 9999999);

    const calc = calculateSingleDigitTrachtenberg(num.toString(), 7);
    prompt = `Multiply ${num.toLocaleString()} by 7 using the rule for seven.`;
    expression = `${num} × 7`;
    correctAnswer = calc.answerString;
    operands = { a: num, b: 7, op: '×' };
    hints = [
      'Rule for 7: Double the number and add half the neighbor; add 5 if the number is odd.',
      `Mental order: (1) Add carried dot, (2) add 5 if odd, (3) add 2 × number, (4) add half neighbor.`,
      `Prefix zero step: double 0 is 0, add half the leftmost digit of original number plus carry.`
    ];
    steps = calc.steps.map(s => `Step ${s.stepIndex}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`);
    explanation = `0${num} × 7 = ${calc.answerString}.`;
  }
  else if (techniqueId.startsWith('tech-105')) {
    // Multiply by 5
    let num = 0;
    if (difficulty === 'beginner') num = getRandomInt(20, 99);
    else if (difficulty === 'intermediate') num = getRandomInt(100, 999);
    else if (difficulty === 'advanced') num = getRandomInt(1000, 99999);
    else num = getRandomInt(100000, 9999999);

    const calc = calculateSingleDigitTrachtenberg(num.toString(), 5);
    prompt = `Multiply ${num.toLocaleString()} by 5 using the Trachtenberg rule.`;
    expression = `${num} × 5`;
    correctAnswer = calc.answerString;
    operands = { a: num, b: 5, op: '×' };
    hints = [
      'Rule for 5: Half the neighbor, plus 5 if the number is odd. You do NOT add the number itself!',
      `Look at the current number only to decide if you add 5. Take half the digit to the right.`,
      `Rightmost digit: half of nothing is 0, plus 5 if the number is odd.`
    ];
    steps = calc.steps.map(s => `Step ${s.stepIndex}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`);
    explanation = `0${num} × 5 = ${calc.answerString}.`;
  }
  else if (techniqueId.startsWith('tech-106')) {
    // Multiply by 9
    let num = 0;
    if (difficulty === 'beginner') num = getRandomInt(20, 99);
    else if (difficulty === 'intermediate') num = getRandomInt(100, 999);
    else if (difficulty === 'advanced') num = getRandomInt(1000, 99999);
    else num = getRandomInt(100000, 9999999);

    const calc = calculateSingleDigitTrachtenberg(num.toString(), 9);
    prompt = `Multiply ${num.toLocaleString()} by 9 using complement arithmetic.`;
    expression = `${num} × 9`;
    correctAnswer = calc.answerString;
    operands = { a: num, b: 9, op: '×' };
    hints = [
      'Rule for 9: First figure from right: subtract from 10. Middle figures: subtract from 9 and add neighbor. Last figure under prefix zero: first digit of number minus 1.',
      `For the rightmost digit: 10 - ${num % 10}.`,
      `For middle digits: (9 - digit) + neighbor + carry.`
    ];
    steps = calc.steps.map(s => `Step ${s.stepIndex}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`);
    explanation = `0${num} × 9 = ${calc.answerString}.`;
  }
  else if (techniqueId.startsWith('tech-107')) {
    // Multiply by 8
    let num = 0;
    if (difficulty === 'beginner') num = getRandomInt(20, 99);
    else if (difficulty === 'intermediate') num = getRandomInt(100, 999);
    else if (difficulty === 'advanced') num = getRandomInt(1000, 99999);
    else num = getRandomInt(100000, 9999999);

    const calc = calculateSingleDigitTrachtenberg(num.toString(), 8);
    prompt = `Multiply ${num.toLocaleString()} by 8 using the doubled-complements rule.`;
    expression = `${num} × 8`;
    correctAnswer = calc.answerString;
    operands = { a: num, b: 8, op: '×' };
    hints = [
      'Rule for 8: First figure: (10 - digit) doubled. Middle figures: (9 - digit) doubled + neighbor. Leftmost: leftmost digit minus 2.',
      `For the rightmost digit: 2 × (10 - ${num % 10}).`,
      `For middle digits: 2 × (9 - digit) + neighbor + carry.`
    ];
    steps = calc.steps.map(s => `Step ${s.stepIndex}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`);
    explanation = `0${num} × 8 = ${calc.answerString}.`;
  }
  else if (techniqueId.startsWith('tech-109')) {
    // Multiply by 4
    let num = 0;
    if (difficulty === 'beginner') num = getRandomInt(20, 99);
    else if (difficulty === 'intermediate') num = getRandomInt(100, 999);
    else if (difficulty === 'advanced') num = getRandomInt(1000, 99999);
    else num = getRandomInt(100000, 9999999);

    const calc = calculateSingleDigitTrachtenberg(num.toString(), 4);
    prompt = `Multiply ${num.toLocaleString()} by 4 using the Trachtenberg rule.`;
    expression = `${num} × 4`;
    correctAnswer = calc.answerString;
    operands = { a: num, b: 4, op: '×' };
    hints = [
      'Rule for 4: First figure: 10 - digit (+ 5 if odd). Middle: 9 - digit (+ 5 if odd) + half neighbor. Leftmost: half leftmost digit minus 1.',
      `Check if current digit is odd: if odd, add 5.`,
      `Leftmost step under 0: half of leftmost digit minus 1 plus carry.`
    ];
    steps = calc.steps.map(s => `Step ${s.stepIndex}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`);
    explanation = `0${num} × 4 = ${calc.answerString}.`;
  }
  else if (techniqueId.startsWith('tech-110')) {
    // Multiply by 3
    let num = 0;
    if (difficulty === 'beginner') num = getRandomInt(20, 99);
    else if (difficulty === 'intermediate') num = getRandomInt(100, 999);
    else if (difficulty === 'advanced') num = getRandomInt(1000, 99999);
    else num = getRandomInt(100000, 9999999);

    const calc = calculateSingleDigitTrachtenberg(num.toString(), 3);
    prompt = `Multiply ${num.toLocaleString()} by 3 using the Trachtenberg rule.`;
    expression = `${num} × 3`;
    correctAnswer = calc.answerString;
    operands = { a: num, b: 3, op: '×' };
    hints = [
      'Rule for 3: First figure: (10 - digit) doubled (+ 5 if odd). Middle: (9 - digit) doubled (+ 5 if odd) + half neighbor. Leftmost: half leftmost minus 2.',
      `Double the 9's complement, add 5 if current digit is odd, then add half the neighbor.`,
      `Final step: half of leftmost digit - 2 + carry.`
    ];
    steps = calc.steps.map(s => `Step ${s.stepIndex}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`);
    explanation = `0${num} × 3 = ${calc.answerString}.`;
  }
  // CHAPTER 2: DIRECT METHOD
  else if (techniqueId.startsWith('tech-201') || techniqueId.startsWith('tech-202') || techniqueId.startsWith('tech-204') || techniqueId.startsWith('tech-205')) {
    let a = 0;
    let b = 0;
    if (techniqueId.startsWith('tech-201')) {
      // 2x2
      a = getRandomInt(13, 98);
      b = getRandomInt(12, 45);
    } else if (techniqueId.startsWith('tech-202')) {
      // Long x 2-digit
      a = getRandomInt(100, 9999);
      b = getRandomInt(12, 65);
    } else {
      // 3-digit x 3-digit or longer
      a = getRandomInt(112, 999);
      b = getRandomInt(111, 432);
    }

    const calc = calculateDirectMultiplication(a.toString(), b.toString());
    prompt = `Multiply ${a.toLocaleString()} × ${b.toLocaleString()} in a single line using the Direct Method.`;
    expression = `${a} × ${b}`;
    correctAnswer = calc.answerString;
    operands = { a, b, op: '×' };
    hints = [
      `Direct Method: Prefix ${b.toString().length} zeroes. Pair the current multiplicand digit with the outside multiplier digit, and move inward.`,
      `Outside pair: current column × rightmost multiplier digit. Inside pair: preceding column × next multiplier digit.`,
      `Sum all pair products + carry for each column from right to left.`
    ];
    steps = calc.steps.map(s => `${s.description}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`);
    explanation = `Direct Method calculation: ${a} × ${b} = ${calc.answerString}.`;
  }
  // CHAPTER 3: TWO-FINGER METHOD
  else if (techniqueId.startsWith('tech-301') || techniqueId.startsWith('tech-302') || techniqueId.startsWith('tech-303') || techniqueId.startsWith('tech-304')) {
    let a = 0;
    let b = 0;
    if (techniqueId.startsWith('tech-301')) {
      // Single pair-product drill
      const dL = getRandomInt(1, 9);
      const dR = getRandomInt(1, 9);
      const n = getRandomInt(2, 9);
      const pp = ((dL * n) % 10) + Math.floor((dR * n) / 10);
      prompt = `Find the pair-product of adjacent digits [${dL}, ${dR}] multiplied by ${n}.`;
      expression = `[${dL} ${dR}] × ${n}`;
      correctAnswer = pp.toString();
      hints = [
        `Pair-Product = Units(${dL} × ${n}) + Tens(${dR} × ${n}).`,
        `Multiply ${dL} × ${n} = ${dL * n} (units: ${(dL * n) % 10}). Multiply ${dR} × ${n} = ${dR * n} (tens: ${Math.floor((dR * n) / 10)}).`,
        `Sum the units of the left and tens of the right: ${(dL * n) % 10} + ${Math.floor((dR * n) / 10)} = ${pp}.`
      ];
      steps = [
        `${dL} × ${n} = ${dL * n} → Units digit = ${(dL * n) % 10}`,
        `${dR} × ${n} = ${dR * n} → Tens digit = ${Math.floor((dR * n) / 10)}`,
        `Pair-Product = ${(dL * n) % 10} + ${Math.floor((dR * n) / 10)} = ${pp}`
      ];
      explanation = `The pair-product of [${dL}, ${dR}] × ${n} is ${pp}.`;
    } else if (techniqueId.startsWith('tech-302')) {
      // Single digit multiplier
      a = getRandomInt(125, 9876);
      b = getRandomInt(3, 9);
      const calc = calculateTwoFingerMultiplication(a.toString(), b.toString());
      prompt = `Multiply ${a.toLocaleString()} × ${b} using the Two-Finger (Units-and-Tens) method.`;
      expression = `${a} × ${b}`;
      correctAnswer = calc.answerString;
      operands = { a, b, op: '×' };
      hints = [
        `Two-Finger Method: Each digit of the answer is a pair-product: U(current × ${b}) + T(neighbor × ${b}) + carry.`,
        `Position the UT finger block over current and neighbor.`,
        `Prefix a zero in front of ${a}.`
      ];
      steps = calc.steps.map(s => `${s.description}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`);
      explanation = `${a} × ${b} = ${calc.answerString}.`;
    } else {
      // Multi-digit
      a = getRandomInt(45, 987);
      b = getRandomInt(24, 88);
      const calc = calculateTwoFingerMultiplication(a.toString(), b.toString());
      prompt = `Multiply ${a.toLocaleString()} × ${b} using the Two-Finger Speed Method.`;
      expression = `${a} × ${b}`;
      correctAnswer = calc.answerString;
      operands = { a, b, op: '×' };
      hints = [
        `Combine outer and inner UT pairs for each column of the answer.`,
        `Outer UT: right digit of ${b} on multiplicand pair. Inner UT: left digit of ${b} on shifted pair.`,
        `Sum all UT contributions plus carry for each digit.`
      ];
      steps = calc.steps.map(s => `${s.description}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`);
      explanation = `${a} × ${b} = ${calc.answerString}.`;
    }
  }
  // CHAPTER 4: ADDITION
  else if (techniqueId.startsWith('tech-401') || techniqueId.startsWith('tech-402')) {
    const count = difficulty === 'beginner' ? 5 : (difficulty === 'intermediate' ? 7 : 10);
    const nums: string[] = [];
    for (let i = 0; i < count; i++) {
      nums.push(getRandomInt(100, 9999).toString());
    }
    const calc = calculateTrachtenbergAddition(nums);
    prompt = `Add the following ${count} numbers using the Trachtenberg "Never count higher than 11" and L-shaped addition rules:\n${nums.join(', ')}`;
    expression = nums.join(' + ');
    correctAnswer = calc.finalTotalString;
    hints = [
      'Trachtenberg Addition: Add down each column. When running total reaches 11 or higher, subtract 11, make a tick mark, and continue.',
      `Record the running total and tick count under each column to form the working table.`,
      `Final step: Add L-shaped: running total + tick figure + lower-right neighbor tick + carry.`
    ];
    steps = [
      `Running totals row: [${calc.runningTotalsRow.join(', ')}]`,
      `Tick figures row: [${calc.ticksRow.join(', ')}]`,
      ...calc.lShapedSteps.map(s => `${s.description}: ${s.workingFormula} → put ${s.producedDigit}, carry ${s.carryOut}`)
    ];
    explanation = `Total sum is ${calc.finalTotalString}. Verified via column 9-remainders.`;
  }
  // CHAPTER 5: DIVISION
  else if (techniqueId.startsWith('tech-501') || techniqueId.startsWith('tech-503') || techniqueId.startsWith('tech-505')) {
    const divisor = getRandomInt(21, 89);
    const quotient = getRandomInt(12, 450);
    const remainder = getRandomInt(0, divisor - 1);
    const dividend = divisor * quotient + remainder;

    const calc = calculateSimpleDivision(dividend.toString(), divisor.toString());
    prompt = `Divide ${dividend.toLocaleString()} by ${divisor}. State the quotient (and remainder if any).`;
    expression = `${dividend} ÷ ${divisor}`;
    correctAnswer = remainder > 0 ? `${quotient} R ${remainder}` : `${quotient}`;
    operands = { a: dividend, b: divisor, op: '÷' };
    hints = [
      `Simple Division: build a table of multiples 1× to 10× of ${divisor} with running digit-sum checks.`,
      `Subtract the largest multiple repeatedly from the dividend.`,
      `Quotient is formed by the indices of the multiples used.`
    ];
    steps = calc.simpleSteps?.map(s => `Step ${s.stepIndex}: Subtracted ${s.subtractedValue} (${s.multipleUsed}×) from ${s.currentSegment} → remainder ${s.remainder}`) || [];
    explanation = `${dividend} ÷ ${divisor} = ${quotient}${remainder > 0 ? ` with remainder ${remainder}` : ''}.`;
  }
  // CHAPTER 6: SQUARING & SQUARE ROOTS
  else if (techniqueId.startsWith('tech-601')) {
    // Special squaring (ends in 5 or 50s)
    const isEnds5 = Math.random() > 0.5;
    if (isEnds5) {
      const tens = getRandomInt(1, 9);
      const num = tens * 10 + 5;
      const calc = squareEndsInFive(num);
      prompt = `Square ${num} using the special rule for numbers ending in 5.`;
      expression = `${num}²`;
      correctAnswer = calc.squaredStr;
      hints = [
        'Numbers ending in 5 always end in 25.',
        `Multiply the tens digit (${tens}) by the next higher number (${tens + 1}).`,
        `${tens} × ${tens + 1} = ${tens * (tens + 1)}. Attach 25.`
      ];
      steps = calc.steps.map(s => `${s.description}: ${s.workingFormula}`);
      explanation = `${num}² = ${calc.squaredStr}.`;
    } else {
      const units = getRandomInt(1, 9);
      const num = 50 + units;
      const calc = squareTensDigitFive(num);
      prompt = `Square ${num} using the special rule for numbers with tens digit 5.`;
      expression = `${num}²`;
      correctAnswer = calc.squaredStr;
      hints = [
        'For numbers with tens digit 5: first two digits are 25 + units digit; last two digits are units digit squared.',
        `First two digits: 25 + ${units} = ${25 + units}.`,
        `Last two digits: ${units}² = ${(units * units).toString().padStart(2, '0')}.`
      ];
      steps = calc.steps.map(s => `${s.description}: ${s.workingFormula}`);
      explanation = `${num}² = ${calc.squaredStr}.`;
    }
  }
  else if (techniqueId.startsWith('tech-602') || techniqueId.startsWith('tech-603')) {
    const num = techniqueId.startsWith('tech-602') ? getRandomInt(14, 98) : getRandomInt(112, 650);
    const calc = techniqueId.startsWith('tech-602') ? squareTwoDigitGeneral(num) : squareThreeDigit(num);
    prompt = `Square ${num} using the Trachtenberg cross-product method.`;
    expression = `${num}²`;
    correctAnswer = calc.squaredStr;
    hints = [
      'Two-digit squaring: calculate a² | 2ab | b² and collapse.',
      `Cross-product is 2 × (digit1 × digit2).`,
      `Collapse intermediate two-digit blocks from right to left.`
    ];
    steps = calc.steps.map(s => `${s.description}: ${s.workingFormula}`);
    explanation = `${num}² = ${calc.squaredStr}.`;
  }
  else if (techniqueId.startsWith('tech-604') || techniqueId.startsWith('tech-605') || techniqueId.startsWith('tech-606')) {
    let num = 0;
    if (techniqueId.startsWith('tech-604')) num = getRandomInt(144, 9800);
    else num = getRandomInt(10000, 999999);

    const calc = calculateTrachtenbergSquareRoot(num.toString());
    prompt = `Find the square root of ${num.toLocaleString()} using the Trachtenberg method. State root (and remainder if any).`;
    expression = `√${num}`;
    correctAnswer = calc.remainderStr !== '0' ? `${calc.rootStr} R ${calc.remainderStr}` : `${calc.rootStr}`;
    hints = [
      `Mark off digits in pairs from the right: ${calc.digitBlocks.join(' / ')}.`,
      `First root digit is largest square ≤ first block (${calc.digitBlocks[0]}).`,
      `Halve remainder (split difference if odd), append 0, divide by first root digit.`
    ];
    steps = calc.steps.map(s => `${s.description}: ${s.workingFormula} → ${s.explanation}`);
    explanation = `√${num} = ${calc.rootStr}${calc.remainderStr !== '0' ? ` with remainder ${calc.remainderStr}` : ''}.`;
  }
  // CHAPTER 7 & 8: ALGEBRA & CHECKING
  else {
    const num = getRandomInt(10000, 9999999);
    const check9 = computeDigitSumDetailed(num.toString());
    const check11 = computeElevensRemainderDetailed(num.toString());
    prompt = `Find the eleven-remainder of ${num.toLocaleString()} using the alternating sum or pairwise shortcut.`;
    expression = `${num} mod 11`;
    correctAnswer = check11.elevensRemainder.toString();
    hints = [
      'Elevens remainder: sum every second digit from the right, then subtract the sum of skipped digits.',
      `Sum of even positions: ${check11.alternatingEvenSum}. Sum of odd positions: ${check11.alternatingOddSum}.`,
      `Difference = ${check11.alternatingDifference} ≡ ${check11.elevensRemainder} (mod 11).`
    ];
    steps = [
      `Sum of even positions (right to left): ${check11.alternatingEvenSum}`,
      `Sum of odd positions: ${check11.alternatingOddSum}`,
      `Difference: ${check11.alternatingEvenSum} - ${check11.alternatingOddSum} = ${check11.alternatingDifference}`,
      `Reduced modulo 11: ${check11.elevensRemainder}`
    ];
    explanation = check11.explanation;
  }

  // Generate multiple choice options if format is multiple-choice
  if (format === 'multiple-choice') {
    const cleanCorrect = correctAnswer.trim();
    const opts = new Set<string>([cleanCorrect]);
    // Generate 3 plausible distractors
    const numericMatch = cleanCorrect.match(/^([0-9]+)/);
    if (numericMatch) {
      const baseNum = parseInt(numericMatch[1], 10);
      const isWithRem = cleanCorrect.includes('R');
      const remPart = isWithRem ? cleanCorrect.split('R')[1] : '';

      opts.add(`${baseNum + 10}${isWithRem ? ' R' + remPart : ''}`);
      opts.add(`${Math.max(1, baseNum - 10)}${isWithRem ? ' R' + remPart : ''}`);
      opts.add(`${baseNum + 2}${isWithRem ? ' R' + remPart : ''}`);
      opts.add(`${baseNum - 2}${isWithRem ? ' R' + remPart : ''}`);
    } else {
      opts.add('0');
      opts.add('1');
      opts.add('5');
    }
    options = Array.from(opts).slice(0, 4);
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
  }

  return {
    id: qId,
    techniqueId,
    difficulty,
    format,
    prompt,
    expression,
    correctAnswer,
    options,
    hints,
    solution: {
      steps,
      explanation,
      finalAnswer: correctAnswer
    },
    operands
  };
}

