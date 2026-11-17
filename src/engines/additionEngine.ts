import { CalculationResult, CalculationStep } from '../types';

export interface ColumnAdditionData {
  columnIndex: number; // 0 is leftmost, or 0 is rightmost
  digits: number[];
  ticksCount: number;
  runningTotal: number;
  columnNinesRemainder: number;
  tableCheckFigure: number;
  isConsistent: boolean;
}

export interface AdditionResult {
  numbers: string[];
  columns: ColumnAdditionData[];
  runningTotalsRow: number[];
  ticksRow: number[];
  finalTotalString: string;
  actualSumString: string;
  lShapedSteps: CalculationStep[];
  verification: {
    columnNinesRemainders: number[];
    tableCheckFigures: number[];
    answerDigitSum: number;
    workingTableDigitSum: number;
    passed: boolean;
  };
}

export function calculateTrachtenbergAddition(numbers: string[]): AdditionResult {
  const cleanNumbers = numbers.map(s => s.replace(/[^0-9.]/g, '')).filter(Boolean);
  if (numbers.length === 0) {
    throw new Error('No numbers provided for addition');
  }

  // Handle integers vs decimals: find max decimal places
  let maxDecimals = 0;
  cleanNumbers.forEach(num => {
    if (num.includes('.')) {
      const parts = num.split('.');
      maxDecimals = Math.max(maxDecimals, parts[1].length);
    }
  });

  // Align numbers by padding decimals and left padding integer parts
  const integerStrings = cleanNumbers.map(num => {
    if (num.includes('.')) {
      const [intPart, decPart] = num.split('.');
      return intPart + decPart.padEnd(maxDecimals, '0');
    } else {
      return num + '0'.repeat(maxDecimals);
    }
  });

  const maxLen = Math.max(...integerStrings.map(s => s.length));
  const paddedGrid = integerStrings.map(s => s.padStart(maxLen, '0').split('').map(Number));

  // Actual numerical sum
  const actualBigIntSum = integerStrings.reduce((acc, s) => acc + BigInt(s), 0n);

  // Column processing from left to right (colIdx 0 to maxLen - 1)
  const columnsData: ColumnAdditionData[] = [];
  const runningTotalsRow: number[] = [];
  const ticksRow: number[] = [];

  for (let col = 0; col < maxLen; col++) {
    const colDigits = paddedGrid.map(row => row[col]);
    let running = 0;
    let ticks = 0;

    for (let r = 0; r < colDigits.length; r++) {
      const d = colDigits[r];
      running += d;
      if (running >= 11) {
        running -= 11;
        ticks++;
      }
    }

    // Cast out nines for column
    let colSum = colDigits.reduce((a, b) => a + b, 0);
    let col9Rem = colSum % 9;
    if (col9Rem === 0 && colSum > 0) col9Rem = 9;

    // Working table check: running + 2 * ticks
    let tableVal = running + 2 * ticks;
    let tableCheck = tableVal % 9;
    if (tableCheck === 0 && tableVal > 0) tableCheck = 9;

    columnsData.push({
      columnIndex: col,
      digits: colDigits,
      ticksCount: ticks,
      runningTotal: running,
      columnNinesRemainder: col9Rem,
      tableCheckFigure: tableCheck,
      isConsistent: col9Rem === tableCheck
    });

    runningTotalsRow.push(running);
    ticksRow.push(ticks);
  }

  // L-Shaped Addition to find total:
  // We work from rightmost column (maxLen - 1) to leftmost (0), plus extra prefix positions
  const lShapedSteps: CalculationStep[] = [];
  const answerDigitsReversed: number[] = [];
  let carry = 0;
  let stepCount = 1;

  for (let c = maxLen - 1; c >= 0; c--) {
    const carryIn = carry;
    const r = runningTotalsRow[c];
    const t = ticksRow[c];
    const lowerRightTick = c < maxLen - 1 ? ticksRow[c + 1] : 0;

    const sumVal = r + t + lowerRightTick + carryIn;
    const digit = sumVal % 10;
    carry = Math.floor(sumVal / 10);
    answerDigitsReversed.push(digit);

    lShapedSteps.push({
      stepIndex: stepCount++,
      description: `L-Addition for column ${maxLen - c} (from right)`,
      ruleApplied: 'L-Shaped: Running total + Tick figure + Lower-Right Tick + Carry',
      currentDigit: r,
      workingFormula: `${r} + ${t} (ticks) + ${lowerRightTick} (right tick) + ${carryIn} carry = ${sumVal}`,
      intermediateResult: sumVal,
      carryIn,
      carryOut: carry,
      producedDigit: digit,
      explanation: `Add running total (${r}) + ticks (${t}) + neighbor tick (${lowerRightTick}) + carry (${carryIn}) = ${sumVal}. Write ${digit}, carry ${carry}.`
    });
  }

  // Leftmost carry and leftmost tick row element
  const leftmostTick = ticksRow[0];
  const finalSumVal = leftmostTick + carry;
  if (finalSumVal > 0) {
    const firstDigit = finalSumVal % 10;
    const finalCarry = Math.floor(finalSumVal / 10);
    answerDigitsReversed.push(firstDigit);
    if (finalCarry > 0) {
      answerDigitsReversed.push(finalCarry);
    }

    lShapedSteps.push({
      stepIndex: stepCount++,
      description: 'L-Addition Leftmost Step (under prefix zero)',
      ruleApplied: 'Prefix zero + Leftmost tick + Carry',
      currentDigit: 0,
      workingFormula: `${leftmostTick} (leftmost tick) + ${carry} carry = ${finalSumVal}`,
      intermediateResult: finalSumVal,
      carryIn: carry,
      carryOut: finalCarry,
      producedDigit: firstDigit,
      explanation: `Prefix zero column: add leftmost tick (${leftmostTick}) + carry (${carry}) = ${finalSumVal}.`
    });
  }

  let finalIntStr = answerDigitsReversed.slice().reverse().join('').replace(/^0+(?!$)/, '');
  if (!finalIntStr) finalIntStr = '0';

  // Format decimal back if needed
  let finalFormattedTotal = finalIntStr;
  let actualFormattedTotal = actualBigIntSum.toString();

  if (maxDecimals > 0) {
    if (finalFormattedTotal.length <= maxDecimals) {
      finalFormattedTotal = '0.' + finalFormattedTotal.padStart(maxDecimals, '0');
    } else {
      const splitIdx = finalFormattedTotal.length - maxDecimals;
      finalFormattedTotal = finalFormattedTotal.slice(0, splitIdx) + '.' + finalFormattedTotal.slice(splitIdx);
    }

    if (actualFormattedTotal.length <= maxDecimals) {
      actualFormattedTotal = '0.' + actualFormattedTotal.padStart(maxDecimals, '0');
    } else {
      const splitIdx = actualFormattedTotal.length - maxDecimals;
      actualFormattedTotal = actualFormattedTotal.slice(0, splitIdx) + '.' + actualFormattedTotal.slice(splitIdx);
    }
  }

  // Answer digit-sum
  const calcDigitSum = (s: string): number => {
    let sum = s.replace(/[^0-9]/g, '').split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
    while (sum >= 10) {
      sum = sum.toString().split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
    }
    return sum === 9 ? 0 : sum;
  };

  const answerDigitSum = calcDigitSum(finalFormattedTotal);
  const tableCheckSum = columnsData.reduce((acc, col) => acc + col.tableCheckFigure, 0);
  const workingTableDigitSum = calcDigitSum(tableCheckSum.toString());

  return {
    numbers: cleanNumbers,
    columns: columnsData,
    runningTotalsRow,
    ticksRow,
    finalTotalString: finalFormattedTotal,
    actualSumString: actualFormattedTotal,
    lShapedSteps,
    verification: {
      columnNinesRemainders: columnsData.map(c => c.columnNinesRemainder),
      tableCheckFigures: columnsData.map(c => c.tableCheckFigure),
      answerDigitSum,
      workingTableDigitSum,
      passed: finalFormattedTotal === actualFormattedTotal
    }
  };
}
