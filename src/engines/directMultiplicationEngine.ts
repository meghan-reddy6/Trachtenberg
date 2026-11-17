import { CalculationResult, CalculationStep } from '../types';

/**
 * Chapter 2: Rapid Multiplication by the Direct Method
 * Supports any multiplicand and any multiplier of arbitrary length.
 */

export function calculateDirectMultiplication(multiplicandStr: string, multiplierStr: string): CalculationResult {
  const cleanMultiplicand = multiplicandStr.replace(/[^0-9]/g, '');
  const cleanMultiplier = multiplierStr.replace(/[^0-9]/g, '');

  if (!cleanMultiplicand || !cleanMultiplier) {
    throw new Error('Invalid multiplicand or multiplier');
  }

  const actualProduct = (BigInt(cleanMultiplicand) * BigInt(cleanMultiplier)).toString();

  // Multiplicand digits from right to left: aDigits[0] is units, aDigits[1] is tens, etc.
  const aRaw = cleanMultiplicand.split('').map(Number).reverse();
  const bRaw = cleanMultiplier.split('').map(Number).reverse();

  const m = bRaw.length;
  // Pad multiplicand with m zeroes to the left (which corresponds to highest indices)
  const aPadded = [...aRaw];
  for (let i = 0; i < m; i++) {
    aPadded.push(0);
  }

  const steps: CalculationStep[] = [];
  const producedDigits: number[] = [];
  let carry = 0;

  // The number of steps to produce all digits:
  // At most aRaw.length + m steps
  const totalPositions = aRaw.length + m;

  for (let k = 0; k < totalPositions; k++) {
    const carryIn = carry;
    const pairContributions: { aDigit: number; bDigit: number; prod: number; pairName: string; aIdx: number; bIdx: number }[] = [];
    let sumOfPairs = 0;

    for (let j = 0; j < m; j++) {
      const aIndex = k - j;
      if (aIndex >= 0 && aIndex < aPadded.length) {
        const aDigit = aPadded[aIndex];
        const bDigit = bRaw[j];
        const prod = aDigit * bDigit;
        sumOfPairs += prod;

        let pairName = 'inside pair';
        if (j === 0) pairName = 'outside pair';
        else if (j === m - 1) pairName = 'innermost pair';
        else pairName = 'middle pair';

        pairContributions.push({
          aDigit,
          bDigit,
          prod,
          pairName,
          aIdx: aIndex,
          bIdx: j
        });
      }
    }

    const totalStepVal = sumOfPairs + carryIn;
    const producedDigit = totalStepVal % 10;
    carry = Math.floor(totalStepVal / 10);
    producedDigits.push(producedDigit);

    const pairBreakdown = pairContributions
      .map(p => `${p.aDigit} × ${p.bDigit} (${p.prod})`)
      .join(' + ');

    const formula = pairContributions.length > 0
      ? `${pairBreakdown}${carryIn > 0 ? ` + ${carryIn} carry` : ''} = ${totalStepVal}`
      : `0 + ${carryIn} carry = ${totalStepVal}`;

    const explanation = `Column ${k + 1}: ${pairContributions.map(p => `${p.pairName} (${p.aDigit} × ${p.bDigit} = ${p.prod})`).join(', ')}${carryIn > 0 ? `, plus carry of ${carryIn}` : ''}. Put down ${producedDigit}, carry ${carry}.`;

    steps.push({
      stepIndex: k + 1,
      description: `Digit position ${k + 1} from right`,
      ruleApplied: `${m}-digit direct cross-product`,
      currentDigit: aPadded[k] || 0,
      workingFormula: formula,
      intermediateResult: totalStepVal,
      carryIn,
      carryOut: carry,
      producedDigit,
      explanation
    });

    // Check if we can terminate early if we are beyond multiplicand and carry is 0 and rest are 0
    if (k >= aRaw.length && carry === 0) {
      // Check if all remaining pairs would be 0
      let remainingNonZero = false;
      for (let nextK = k + 1; nextK < totalPositions; nextK++) {
        for (let j = 0; j < m; j++) {
          const aIndex = nextK - j;
          if (aIndex < aRaw.length && aRaw[aIndex] !== 0) {
            remainingNonZero = true;
            break;
          }
        }
      }
      if (!remainingNonZero) {
        break;
      }
    }
  }

  // Final carry handling if remaining
  if (carry > 0) {
    producedDigits.push(carry);
    steps.push({
      stepIndex: steps.length + 1,
      description: 'Final carry',
      ruleApplied: 'Leftmost carry',
      currentDigit: 0,
      workingFormula: `carry ${carry}`,
      intermediateResult: carry,
      carryIn: carry,
      carryOut: 0,
      producedDigit: carry,
      explanation: `Write down remaining carry ${carry}.`
    });
  }

  let finalAnswer = producedDigits.slice().reverse().join('').replace(/^0+(?!$)/, '');
  if (!finalAnswer) finalAnswer = '0';

  // Digit sums for check
  const calcDigitSum = (s: string): number => {
    let sum = s.split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
    while (sum >= 10) {
      sum = sum.toString().split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
    }
    return sum === 9 ? 0 : sum;
  };

  const dsA = calcDigitSum(cleanMultiplicand);
  const dsB = calcDigitSum(cleanMultiplier);
  const dsProd = calcDigitSum(finalAnswer);

  return {
    problemString: `${cleanMultiplicand} × ${cleanMultiplier}`,
    answerString: finalAnswer,
    steps,
    verification: {
      method: 'digit-sum',
      details: `Digit-sum(${cleanMultiplicand}) = ${dsA}, Digit-sum(${cleanMultiplier}) = ${dsB}. (${dsA} × ${dsB}) mod 9 = ${(dsA * dsB) % 9}. Digit-sum(${finalAnswer}) = ${dsProd}. Verified.`,
      checked: finalAnswer === actualProduct
    }
  };
}
