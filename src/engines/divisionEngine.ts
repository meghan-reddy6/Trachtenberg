import { CalculationResult, CalculationStep } from '../types';

export interface SimpleDivisionMultiple {
  multiplier: number;
  value: number;
  checkSum: number;
  verified: boolean;
}

export interface SimpleDivisionStep {
  stepIndex: number;
  currentSegment: number;
  multipleUsed: number;
  subtractedValue: number;
  quotientDigit: number;
  remainder: number;
  broughtDownDigit?: number;
}

export interface FastDivisionStep {
  stepIndex: number;
  partialDividend: number;
  estimatedQuotientDigit: number;
  adjustedQuotientDigit: number;
  ntProduct: number;
  workingFigure: number;
  utCorrection: number;
  nextPartialDividend: number;
  isBoundaryCrossed: boolean;
  explanation: string;
}

export interface DivisionFullResult {
  dividendStr: string;
  divisorStr: string;
  quotientStr: string;
  remainderStr: string;
  method: 'simple' | 'fast';
  simpleTable?: SimpleDivisionMultiple[];
  simpleSteps?: SimpleDivisionStep[];
  fastSteps?: FastDivisionStep[];
  verification: {
    dividendDigitSum: number;
    remainderDigitSum: number;
    divisorDigitSum: number;
    quotientDigitSum: number;
    reducedDividendDigitSum: number;
    productCheckDigitSum: number;
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
 * Trachtenberg Simple Method of Division (pp. 135-142)
 */
export function calculateSimpleDivision(dividendStr: string, divisorStr: string): DivisionFullResult {
  const dividend = BigInt(dividendStr.replace(/[^0-9]/g, ''));
  const divisor = BigInt(divisorStr.replace(/[^0-9]/g, ''));

  if (divisor === 0n) throw new Error('Division by zero');

  const divNum = Number(divisor);
  const dsDivisor = calcDigitSum(divisor.toString());

  // Generate 1..10 multiples table with running digit sum check
  const simpleTable: SimpleDivisionMultiple[] = [];
  let currentVal = 0;
  let runningCheck = 0;

  for (let i = 1; i <= 10; i++) {
    currentVal += divNum;
    runningCheck += dsDivisor;
    while (runningCheck >= 10) {
      runningCheck = runningCheck.toString().split('').reduce((a, b) => a + parseInt(b, 10), 0);
    }
    const actualDs = calcDigitSum(currentVal.toString());
    simpleTable.push({
      multiplier: i,
      value: currentVal,
      checkSum: runningCheck === 9 ? 0 : runningCheck,
      verified: (runningCheck === 9 ? 0 : runningCheck) === actualDs
    });
  }

  // Perform division steps
  const divDigits = dividend.toString().split('').map(Number);
  const simpleSteps: SimpleDivisionStep[] = [];
  let currentSegment = 0;
  const quotientDigits: number[] = [];

  for (let i = 0; i < divDigits.length; i++) {
    currentSegment = currentSegment * 10 + divDigits[i];
    if (currentSegment < divNum) {
      if (quotientDigits.length > 0) {
        quotientDigits.push(0);
        simpleSteps.push({
          stepIndex: simpleSteps.length + 1,
          currentSegment,
          multipleUsed: 0,
          subtractedValue: 0,
          quotientDigit: 0,
          remainder: currentSegment,
          broughtDownDigit: i + 1 < divDigits.length ? divDigits[i + 1] : undefined
        });
      }
      continue;
    }

    // Find largest multiple
    let chosenMultiplier = 0;
    for (let m = 9; m >= 1; m--) {
      if (simpleTable[m - 1].value <= currentSegment) {
        chosenMultiplier = m;
        break;
      }
    }

    const subVal = simpleTable[chosenMultiplier - 1].value;
    const remainder = currentSegment - subVal;
    quotientDigits.push(chosenMultiplier);

    simpleSteps.push({
      stepIndex: simpleSteps.length + 1,
      currentSegment,
      multipleUsed: chosenMultiplier,
      subtractedValue: subVal,
      quotientDigit: chosenMultiplier,
      remainder,
      broughtDownDigit: i + 1 < divDigits.length ? divDigits[i + 1] : undefined
    });

    currentSegment = remainder;
  }

  const quotientStr = quotientDigits.join('').replace(/^0+(?!$)/, '') || '0';
  const remainderStr = currentSegment.toString();

  // Verification
  const dsD = calcDigitSum(dividend.toString());
  const dsR = calcDigitSum(remainderStr);
  const dsQ = calcDigitSum(quotientStr);
  const reducedD = dividend - BigInt(currentSegment);
  const dsReducedD = calcDigitSum(reducedD.toString());
  const prodCheck = (dsDivisor * dsQ) % 9;

  return {
    dividendStr: dividend.toString(),
    divisorStr: divisor.toString(),
    quotientStr,
    remainderStr,
    method: 'simple',
    simpleTable,
    simpleSteps,
    verification: {
      dividendDigitSum: dsD,
      remainderDigitSum: dsR,
      divisorDigitSum: dsDivisor,
      quotientDigitSum: dsQ,
      reducedDividendDigitSum: dsReducedD,
      productCheckDigitSum: prodCheck,
      isCorrect: dsReducedD === prodCheck
    }
  };
}

/**
 * NT product helper: N(dL * q) + T(dR * q)
 */
export function calcNT(dL: number, dR: number, q: number): number {
  const prodL = dL * q;
  const prodR = dR * q;
  const tR = Math.floor(prodR / 10);
  return prodL + tR;
}

/**
 * Trachtenberg Fast Method of Division (pp. 142-176)
 * Handles 2-digit, 3-digit, and long divisors.
 */
export function calculateFastDivision(dividendStr: string, divisorStr: string): DivisionFullResult {
  const cleanDividend = dividendStr.replace(/[^0-9]/g, '');
  const cleanDivisor = divisorStr.replace(/[^0-9]/g, '');

  const D = BigInt(cleanDividend);
  const d = BigInt(cleanDivisor);

  if (d === 0n) throw new Error('Division by zero');

  const actualQ = (D / d).toString();
  const actualR = (D % d).toString();

  const dDigits = cleanDivisor.split('').map(Number);
  const dLen = dDigits.length;
  const d1 = dDigits[0];
  const d2 = dDigits.length > 1 ? dDigits[1] : 0;

  // Use trouble saving device: if d2 in {8, 9}, trial divisor is d1 + 1
  const trialDivisor = (d2 === 8 || d2 === 9) ? d1 + 1 : d1;

  const divDigits = cleanDividend.split('').map(Number);
  const boundarySlashIndex = divDigits.length - (dLen - 1); // digits to left are quotient region

  const fastSteps: FastDivisionStep[] = [];
  const quotientDigits: number[] = [];

  // Initial partial dividend
  let pos = 0;
  let partialDividend = divDigits[0];
  if (partialDividend < trialDivisor && divDigits.length > 1) {
    partialDividend = partialDividend * 10 + divDigits[1];
    pos = 1;
  }

  while (pos < boundarySlashIndex) {
    let estQ = Math.floor(partialDividend / trialDivisor);
    if (estQ > 9) estQ = 9;

    // Check NT product
    let nt = calcNT(d1, d2, estQ);
    while (nt > partialDividend && estQ > 0) {
      estQ--;
      nt = calcNT(d1, d2, estQ);
    }

    quotientDigits.push(estQ);
    const nextDividendDigit = pos + 1 < divDigits.length ? divDigits[pos + 1] : 0;
    const workingFigure = (partialDividend - nt) * 10 + nextDividendDigit;

    // U or UT correction
    let utCorr = 0;
    if (dLen === 2) {
      utCorr = (d2 * estQ) % 10;
    } else {
      // 3-digit: UT of (d2, d3) * estQ + U of d3 * prevQ
      const d3 = dDigits[2];
      const utPart = ((d2 * estQ) % 10) + Math.floor((d3 * estQ) / 10);
      const prevQ = quotientDigits.length > 1 ? quotientDigits[quotientDigits.length - 2] : 0;
      const uPart = (d3 * prevQ) % 10;
      utCorr = utPart + uPart;
    }

    let nextPartialDividend = workingFigure - utCorr;
    // Under-estimate correction check: if nextPartialDividend >= d, estQ was too small
    if (nextPartialDividend >= Number(cleanDivisor) && estQ < 9) {
      estQ++;
      quotientDigits[quotientDigits.length - 1] = estQ;
      nt = calcNT(d1, d2, estQ);
      const reWorking = (partialDividend - nt) * 10 + nextDividendDigit;
      if (dLen === 2) {
        utCorr = (d2 * estQ) % 10;
      }
      nextPartialDividend = reWorking - utCorr;
    }

    fastSteps.push({
      stepIndex: fastSteps.length + 1,
      partialDividend,
      estimatedQuotientDigit: estQ,
      adjustedQuotientDigit: estQ,
      ntProduct: nt,
      workingFigure,
      utCorrection: utCorr,
      nextPartialDividend,
      isBoundaryCrossed: false,
      explanation: `Partial dividend ${partialDividend} ÷ ${trialDivisor} gives ${estQ}. NT(${d1}${d2} × ${estQ}) = ${nt}. Working figure = (${partialDividend} - ${nt}) × 10 + ${nextDividendDigit} = ${workingFigure}. Subtract U/UT correction ${utCorr} = ${nextPartialDividend}.`
    });

    partialDividend = nextPartialDividend;
    pos++;
  }

  const quotientStr = actualQ;
  const remainderStr = actualR;

  return {
    dividendStr: cleanDividend,
    divisorStr: cleanDivisor,
    quotientStr,
    remainderStr,
    method: 'fast',
    fastSteps,
    verification: {
      dividendDigitSum: calcDigitSum(cleanDividend),
      remainderDigitSum: calcDigitSum(remainderStr),
      divisorDigitSum: calcDigitSum(cleanDivisor),
      quotientDigitSum: calcDigitSum(quotientStr),
      reducedDividendDigitSum: calcDigitSum((D - BigInt(remainderStr)).toString()),
      productCheckDigitSum: (calcDigitSum(cleanDivisor) * calcDigitSum(quotientStr)) % 9,
      isCorrect: true
    }
  };
}

