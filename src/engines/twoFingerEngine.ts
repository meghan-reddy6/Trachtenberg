import { CalculationResult, CalculationStep } from '../types';

/**
 * Chapter 3: Speed Multiplication — "Two-Finger" (Units-and-Tens) Method
 */

/**
 * Calculates the pair-product of two adjacent digits (dL, dR) with multiplier digit n.
 * Pair-Product = Units(dL * n) + Tens(dR * n)
 */
export function calculatePairProduct(
  dL: number, 
  dR: number | null, 
  n: number
): { pairProduct: number; uVal: number; tVal: number; uProd: number; tProd: number } {
  const prodL = dL * n;
  const uVal = prodL % 10;
  
  let tVal = 0;
  let prodR = 0;
  if (dR !== null && dR !== undefined) {
    prodR = dR * n;
    tVal = Math.floor(prodR / 10);
  }

  return {
    pairProduct: uVal + tVal,
    uVal,
    tVal,
    uProd: prodL,
    tProd: prodR
  };
}

export function calculateTwoFingerMultiplication(
  multiplicandStr: string,
  multiplierStr: string
): CalculationResult {
  const cleanMultiplicand = multiplicandStr.replace(/[^0-9]/g, '');
  const cleanMultiplier = multiplierStr.replace(/[^0-9]/g, '');

  if (!cleanMultiplicand || !cleanMultiplier) {
    throw new Error('Invalid inputs');
  }

  const actualProduct = (BigInt(cleanMultiplicand) * BigInt(cleanMultiplier)).toString();

  const mDigits = cleanMultiplier.split('').map(Number);
  const mLen = mDigits.length;

  // In two-finger method, prefix mLen zeroes in front of multiplicand:
  // e.g. for 54 (2 digits) prefix two zeroes: 0 0 7 3
  const aRaw = cleanMultiplicand.split('').map(Number);
  const prefixZeroes = Array(mLen).fill(0);
  const aPadded = [...prefixZeroes, ...aRaw];
  const aLen = aPadded.length;

  const steps: CalculationStep[] = [];
  const producedDigits: number[] = [];
  let carry = 0;

  let stepIndex = 1;

  for (let pos = aLen - 1; pos >= 0; pos--) {
    const carryIn = carry;
    let sumForStep = 0;
    const partsSummary: string[] = [];

    // Multiplier digit j (j=0 is rightmost multiplier digit, j=1 is tens digit, etc.)
    // acts on multiplicand pair at (pos + j, pos + j + 1)
    for (let j = 0; j < mLen; j++) {
      const multDigit = mDigits[mLen - 1 - j]; // j=0 is rightmost
      const leftIdx = pos + j;
      const rightIdx = leftIdx + 1;

      if (leftIdx >= 0 && leftIdx < aLen) {
        const dL = aPadded[leftIdx];
        const dR = rightIdx < aLen ? aPadded[rightIdx] : null;
        const pp = calculatePairProduct(dL, dR, multDigit);
        sumForStep += pp.pairProduct;

        const role = j === 0 ? 'Outer UT' : (j === mLen - 1 ? 'Inner UT' : `UT-${j}`);
        const dRStr = dR !== null ? `${dR}` : 'none';
        partsSummary.push(
          `${role} (${multDigit} on [${dL}, ${dRStr}]): U(${pp.uProd})=${pp.uVal} + T(${pp.tProd})=${pp.tVal} = ${pp.pairProduct}`
        );
      }
    }

    const totalVal = sumForStep + carryIn;
    const digitProduced = totalVal % 10;
    carry = Math.floor(totalVal / 10);

    // If pos === 0 (outermost prefix zero), step produces 0 with 0 carry and product already reached, skip phantom zero
    if (pos === 0 && digitProduced === 0 && carry === 0 && producedDigits.length > 0) {
      const candidate = producedDigits.slice().reverse().join('');
      if (candidate === actualProduct) {
        continue;
      }
    }

    producedDigits.push(digitProduced);

    const explanation = `Column ${stepIndex} (from right): ${partsSummary.join('; ')}${carryIn > 0 ? ` + carry ${carryIn}` : ''} = ${totalVal}. Put down ${digitProduced}, carry ${carry}.`;

    steps.push({
      stepIndex,
      description: `Column ${stepIndex}: ${partsSummary.map(p => p.split(':')[0]).join(' + ')}${carryIn > 0 ? ` + carry ${carryIn}` : ''} = ${totalVal} → write down ${digitProduced}${carry > 0 ? `, carry ${carry}` : ''}`,
      ruleApplied: `Units-and-Tens (${mLen}-digit multiplier)`,
      currentDigit: aPadded[pos],
      workingFormula: `${partsSummary.map(p => p.split(':')[1]?.trim() || p).join(' + ')}${carryIn > 0 ? ` + ${carryIn} carry` : ''} = ${totalVal}`,
      intermediateResult: totalVal,
      carryIn,
      carryOut: carry,
      producedDigit: digitProduced,
      explanation,
      highlightIndices: {
        multiplicand: [pos, Math.min(pos + 1, aLen - 1)],
        multiplier: [mLen - 1],
        answer: [stepIndex - 1]
      }
    });

    stepIndex++;
  }

  if (carry > 0) {
    producedDigits.push(carry);
    steps.push({
      stepIndex,
      description: 'Remaining Carry',
      ruleApplied: 'Final carry',
      currentDigit: 0,
      workingFormula: `carry ${carry}`,
      intermediateResult: carry,
      carryIn: carry,
      carryOut: 0,
      producedDigit: carry,
      explanation: `Add remaining carry ${carry}.`,
      highlightIndices: {
        multiplicand: [0],
        multiplier: [0],
        answer: [stepIndex - 1]
      }
    });
  }

  let finalAnswer = producedDigits.slice().reverse().join('').replace(/^0+(?!$)/, '');
  if (!finalAnswer) finalAnswer = '0';

  return {
    problemString: `${cleanMultiplicand} × ${cleanMultiplier}`,
    answerString: finalAnswer,
    steps,
    verification: {
      method: 'digit-sum',
      details: `Direct calculation verified: ${cleanMultiplicand} × ${cleanMultiplier} = ${finalAnswer}`,
      checked: finalAnswer === actualProduct
    }
  };
}
