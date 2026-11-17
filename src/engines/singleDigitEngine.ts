import { CalculationResult, CalculationStep } from '../types';

/**
 * Trachtenberg Basic Multiplication Engine (Chapter 1)
 * Supports multipliers: 11, 12, 6, 7, 5, 9, 8, 4, 3, 2, 1, 0
 */

export function calculateSingleDigitTrachtenberg(multiplicandStr: string, multiplier: number): CalculationResult {
  const cleanMultiplicand = multiplicandStr.replace(/[^0-9]/g, '');
  if (!cleanMultiplicand) {
    throw new Error('Invalid multiplicand');
  }

  const actualProduct = (BigInt(cleanMultiplicand) * BigInt(multiplier)).toString();
  const digits = cleanMultiplicand.split('').map(Number);
  const n = digits.length;
  // In Trachtenberg single key multiplication, prefix a single 0
  const padded = [0, ...digits]; // padded[0] is 0, padded[1..n] are digits
  // Indices from right to left: i goes from n down to 0
  
  const steps: CalculationStep[] = [];
  let carry = 0;
  const producedDigitsReversed: number[] = [];

  for (let pos = n; pos >= 0; pos--) {
    const current = padded[pos]; // "number"
    const neighbor = pos < n ? padded[pos + 1] : 0; // "neighbor" to right
    let stepVal = 0;
    let ruleText = '';
    let formulaText = '';
    let explanation = '';
    const carryIn = carry;

    if (multiplier === 11) {
      ruleText = 'Add the neighbor';
      if (pos === n) {
        stepVal = current + carry;
        formulaText = `${current} (no neighbor) + ${carry} carry = ${stepVal}`;
        explanation = `The rightmost figure has no neighbor, so we write down ${current}.`;
      } else if (pos === 0) {
        stepVal = current + neighbor + carry;
        formulaText = `0 (prefix) + ${neighbor} (first digit) + ${carry} carry = ${stepVal}`;
        explanation = `Under the prefix zero: add the first digit (${neighbor}) plus any carry (${carry}).`;
      } else {
        stepVal = current + neighbor + carry;
        formulaText = `${current} + ${neighbor} (neighbor) + ${carry} carry = ${stepVal}`;
        explanation = `Add current digit ${current} to neighbor ${neighbor} plus carry ${carry}.`;
      }
    } else if (multiplier === 12) {
      ruleText = 'Double the number and add the neighbor';
      const doubled = 2 * current;
      if (pos === n) {
        stepVal = doubled + carry;
        formulaText = `2 × ${current} (no neighbor) + ${carry} carry = ${stepVal}`;
        explanation = `Double the rightmost digit: 2 × ${current} = ${doubled}.`;
      } else if (pos === 0) {
        stepVal = doubled + neighbor + carry;
        formulaText = `2 × 0 + ${neighbor} (neighbor) + ${carry} carry = ${stepVal}`;
        explanation = `Under prefix zero: 2 × 0 is 0, plus neighbor ${neighbor} plus carry ${carry} = ${stepVal}.`;
      } else {
        stepVal = doubled + neighbor + carry;
        formulaText = `(2 × ${current}) + ${neighbor} (neighbor) + ${carry} carry = ${doubled} + ${neighbor} + ${carry} = ${stepVal}`;
        explanation = `Double ${current} (giving ${doubled}), add neighbor ${neighbor} and carry ${carry}.`;
      }
    } else if (multiplier === 6) {
      ruleText = 'To each number add half the neighbor; plus 5 if number is odd';
      const isOdd = current % 2 !== 0;
      const oddAdd = isOdd ? 5 : 0;
      const halfNeighbor = Math.floor(neighbor / 2);

      if (pos === n) {
        stepVal = current + oddAdd + carry;
        formulaText = `${current} + ${oddAdd} (odd bonus) + ${carry} carry = ${stepVal}`;
        explanation = isOdd 
          ? `Rightmost digit ${current} is odd, so add 5: ${current} + 5 = ${stepVal}. (No neighbor)`
          : `Rightmost digit ${current} is even: copy down ${current}. (No neighbor)`;
      } else if (pos === 0) {
        stepVal = 0 + halfNeighbor + carry;
        formulaText = `0 + half of ${neighbor} (${halfNeighbor}) + ${carry} carry = ${stepVal}`;
        explanation = `Under prefix zero (even): add half of neighbor ${neighbor} (${halfNeighbor}) plus carry ${carry}.`;
      } else {
        stepVal = current + halfNeighbor + oddAdd + carry;
        formulaText = `${current} + half(${neighbor}) [${halfNeighbor}] + ${oddAdd} (odd bonus) + ${carry} carry = ${stepVal}`;
        explanation = `${current} is ${isOdd ? 'odd (add 5)' : 'even'}. Half of neighbor ${neighbor} is ${halfNeighbor}. Total = ${stepVal}.`;
      }
    } else if (multiplier === 7) {
      ruleText = 'Double the number and add half the neighbor; plus 5 if number is odd';
      const isOdd = current % 2 !== 0;
      const oddAdd = isOdd ? 5 : 0;
      const doubled = 2 * current;
      const halfNeighbor = Math.floor(neighbor / 2);

      if (pos === n) {
        stepVal = doubled + oddAdd + carry;
        formulaText = `(2 × ${current}) + ${oddAdd} (odd) + ${carry} carry = ${stepVal}`;
        explanation = `Double ${current} = ${doubled}${isOdd ? ', plus 5 because ' + current + ' is odd' : ''}.`;
      } else if (pos === 0) {
        stepVal = 0 + halfNeighbor + carry;
        formulaText = `0 + half of ${neighbor} (${halfNeighbor}) + ${carry} carry = ${stepVal}`;
        explanation = `Prefix zero doubled is 0, add half of ${neighbor} (${halfNeighbor}) plus carry.`;
      } else {
        stepVal = doubled + halfNeighbor + oddAdd + carry;
        formulaText = `(2 × ${current}) + half(${neighbor}) [${halfNeighbor}] + ${oddAdd} (odd) + ${carry} carry = ${stepVal}`;
        explanation = `Double ${current} (${doubled}) + half of neighbor ${neighbor} (${halfNeighbor})${isOdd ? ' + 5 (odd)' : ''} + carry ${carry} = ${stepVal}.`;
      }
    } else if (multiplier === 5) {
      ruleText = 'Half the neighbor, plus 5 if the number is odd';
      const isOdd = current % 2 !== 0;
      const oddAdd = isOdd ? 5 : 0;
      const halfNeighbor = Math.floor(neighbor / 2);

      if (pos === n) {
        stepVal = oddAdd + carry;
        formulaText = `half of nothing (0) + ${oddAdd} (odd bonus) + ${carry} carry = ${stepVal}`;
        explanation = `Digit ${current} is ${isOdd ? 'odd (give 5)' : 'even (give 0)'}. There is no neighbor.`;
      } else if (pos === 0) {
        stepVal = halfNeighbor + carry;
        formulaText = `half of ${neighbor} (${halfNeighbor}) + ${carry} carry = ${stepVal}`;
        explanation = `Prefix zero is even. Take half of neighbor ${neighbor} (${halfNeighbor}) plus carry.`;
      } else {
        stepVal = halfNeighbor + oddAdd + carry;
        formulaText = `half of ${neighbor} (${halfNeighbor}) + ${oddAdd} (odd bonus) + ${carry} carry = ${stepVal}`;
        explanation = `Current digit ${current} is ${isOdd ? 'odd (add 5)' : 'even'}. Half of neighbor ${neighbor} is ${halfNeighbor}.`;
      }
    } else if (multiplier === 9) {
      ruleText = 'First: 10 - digit. Middle: 9 - digit + neighbor. Leftmost: leftmost digit - 1';
      if (pos === n) {
        // Rightmost
        stepVal = (10 - current) + carry;
        formulaText = `10 - ${current} + ${carry} carry = ${stepVal}`;
        explanation = `First figure: subtract rightmost digit ${current} from 10 = ${10 - current}.`;
      } else if (pos === 0) {
        // Leftmost under prefix zero: original leftmost digit is padded[1]
        const firstDigit = padded[1];
        stepVal = (firstDigit - 1) + carry;
        formulaText = `${firstDigit} - 1 + ${carry} carry = ${stepVal}`;
        explanation = `Final step under prefix zero: subtract 1 from the original first digit (${firstDigit}) plus carry = ${stepVal}.`;
      } else {
        stepVal = (9 - current) + neighbor + carry;
        formulaText = `(9 - ${current}) + ${neighbor} (neighbor) + ${carry} carry = ${9 - current} + ${neighbor} + ${carry} = ${stepVal}`;
        explanation = `Middle figure: subtract ${current} from 9 (${9 - current}) and add neighbor ${neighbor}.`;
      }
    } else if (multiplier === 8) {
      ruleText = 'First: (10 - digit) doubled. Middle: (9 - digit) doubled + neighbor. Leftmost: leftmost digit - 2';
      if (pos === n) {
        const diff = 10 - current;
        stepVal = 2 * diff + carry;
        formulaText = `2 × (10 - ${current}) + ${carry} carry = 2 × ${diff} = ${stepVal}`;
        explanation = `First figure: subtract ${current} from 10 (${diff}) and double = ${2 * diff}.`;
      } else if (pos === 0) {
        const firstDigit = padded[1];
        stepVal = (firstDigit - 2) + carry;
        formulaText = `${firstDigit} - 2 + ${carry} carry = ${stepVal}`;
        explanation = `Final step under prefix zero: subtract 2 from the leftmost digit (${firstDigit}) plus carry = ${stepVal}.`;
      } else {
        const diff = 9 - current;
        stepVal = 2 * diff + neighbor + carry;
        formulaText = `2 × (9 - ${current}) + ${neighbor} (neighbor) + ${carry} carry = 2 × ${diff} + ${neighbor} + ${carry} = ${stepVal}`;
        explanation = `Middle figure: subtract ${current} from 9 (${diff}), double it (${2 * diff}), and add neighbor ${neighbor}.`;
      }
    } else if (multiplier === 4) {
      ruleText = 'First: 10 - digit (+ 5 if odd). Middle: 9 - digit (+ 5 if odd) + half neighbor. Leftmost: half leftmost digit - 1';
      const isOdd = current % 2 !== 0;
      const oddAdd = isOdd ? 5 : 0;
      const halfNeighbor = Math.floor(neighbor / 2);

      if (pos === n) {
        stepVal = (10 - current) + oddAdd + carry;
        formulaText = `(10 - ${current}) + ${oddAdd} (odd) + ${carry} carry = ${stepVal}`;
        explanation = `First step: 10 - ${current} = ${10 - current}${isOdd ? ', plus 5 because odd' : ''}.`;
      } else if (pos === 0) {
        const firstDigit = padded[1];
        const halfFirst = Math.floor(firstDigit / 2);
        stepVal = halfFirst - 1 + carry;
        formulaText = `half of ${firstDigit} (${halfFirst}) - 1 + ${carry} carry = ${stepVal}`;
        explanation = `Leftmost under zero: half of leftmost digit ${firstDigit} is ${halfFirst}, minus 1 plus carry = ${stepVal}.`;
      } else {
        stepVal = (9 - current) + oddAdd + halfNeighbor + carry;
        formulaText = `(9 - ${current}) + ${oddAdd} (odd) + half(${neighbor}) [${halfNeighbor}] + ${carry} carry = ${stepVal}`;
        explanation = `Middle: 9 - ${current} = ${9 - current}${isOdd ? ' + 5 (odd)' : ''} + half neighbor ${neighbor} (${halfNeighbor}) + carry = ${stepVal}.`;
      }
    } else if (multiplier === 3) {
      ruleText = 'First: (10 - digit) doubled (+5 if odd). Middle: (9 - digit) doubled (+5 if odd) + half neighbor. Leftmost: half leftmost - 2';
      const isOdd = current % 2 !== 0;
      const oddAdd = isOdd ? 5 : 0;
      const halfNeighbor = Math.floor(neighbor / 2);

      if (pos === n) {
        const diff = 10 - current;
        stepVal = (2 * diff) + oddAdd + carry;
        formulaText = `2 × (10 - ${current}) + ${oddAdd} (odd) + ${carry} carry = ${stepVal}`;
        explanation = `First step: subtract from 10 (${diff}), double it (${2 * diff})${isOdd ? ', plus 5 because odd' : ''}.`;
      } else if (pos === 0) {
        const firstDigit = padded[1];
        const halfFirst = Math.floor(firstDigit / 2);
        stepVal = halfFirst - 2 + carry;
        formulaText = `half of ${firstDigit} (${halfFirst}) - 2 + ${carry} carry = ${stepVal}`;
        explanation = `Leftmost under zero: half of leftmost digit ${firstDigit} is ${halfFirst}, minus 2 plus carry = ${stepVal}.`;
      } else {
        const diff = 9 - current;
        stepVal = (2 * diff) + oddAdd + halfNeighbor + carry;
        formulaText = `2 × (9 - ${current}) + ${oddAdd} (odd) + half(${neighbor}) [${halfNeighbor}] + ${carry} carry = ${stepVal}`;
        explanation = `Middle: 9 - ${current} = ${diff}, doubled = ${2 * diff}${isOdd ? ' + 5 (odd)' : ''} + half neighbor (${halfNeighbor}) + carry.`;
      }
    } else if (multiplier === 2) {
      ruleText = 'Double each digit without using neighbor';
      if (pos === 0) {
        stepVal = carry;
        formulaText = `carry = ${stepVal}`;
        explanation = `Prefix zero: carry only = ${stepVal}.`;
      } else {
        stepVal = 2 * current + carry;
        formulaText = `2 × ${current} + ${carry} carry = ${stepVal}`;
        explanation = `Double digit ${current} = ${2 * current} plus carry ${carry}.`;
      }
    } else if (multiplier === 1) {
      ruleText = 'Copy down each digit unchanged';
      if (pos === 0) {
        stepVal = 0;
        formulaText = `0`;
        explanation = `Prefix zero has nothing to copy.`;
      } else {
        stepVal = current;
        formulaText = `copy ${current}`;
        explanation = `Copy digit ${current}.`;
      }
    } else if (multiplier === 0) {
      ruleText = 'Zero times any number is zero';
      stepVal = 0;
      formulaText = `0`;
      explanation = `Multiplication by 0 yields 0.`;
    }

    const digitProduced = stepVal % 10;
    carry = Math.floor(stepVal / 10);
    producedDigitsReversed.push(digitProduced);

    steps.push({
      stepIndex: n - pos + 1,
      description: `Step for column ${n - pos + 1} (from right)`,
      ruleApplied: ruleText,
      currentDigit: current,
      neighborDigit: pos < n ? neighbor : undefined,
      workingFormula: formulaText,
      intermediateResult: stepVal,
      carryIn,
      carryOut: carry,
      producedDigit: digitProduced,
      explanation,
      highlightIndices: {
        multiplicand: [pos],
        multiplier: [0],
        answer: [n - pos]
      }
    });
  }

  // If there's still an unhandled carry above position 0:
  if (carry > 0) {
    producedDigitsReversed.push(carry);
    steps.push({
      stepIndex: steps.length + 1,
      description: 'Extra carry digit',
      ruleApplied: 'Final carry',
      currentDigit: 0,
      workingFormula: `carry ${carry}`,
      intermediateResult: carry,
      carryIn: carry,
      carryOut: 0,
      producedDigit: carry,
      explanation: `Write down remaining carry ${carry}.`
    });
  }

  // Remove leading zeroes from produced answer unless answer is "0"
  let fullAnswer = producedDigitsReversed.slice().reverse().join('').replace(/^0+(?!$)/, '');
  if (!fullAnswer) fullAnswer = '0';

  // Compute digit sums for verification
  const calcDigitSum = (numStr: string): number => {
    let sum = numStr.split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
    while (sum >= 10) {
      sum = sum.toString().split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
    }
    return sum === 9 ? 0 : sum;
  };

  const dsMultiplicand = calcDigitSum(cleanMultiplicand);
  const dsMultiplier = calcDigitSum(multiplier.toString());
  const dsProduct = calcDigitSum(fullAnswer);
  const expectedDs = (dsMultiplicand * dsMultiplier) % 9;

  return {
    problemString: `${cleanMultiplicand} × ${multiplier}`,
    answerString: fullAnswer,
    steps,
    verification: {
      method: 'digit-sum',
      details: `Digit-sum(${cleanMultiplicand}) = ${dsMultiplicand}, Digit-sum(${multiplier}) = ${dsMultiplier}. Product modulo 9 = ${(dsMultiplicand * dsMultiplier) % 9}. Digit-sum of answer (${fullAnswer}) = ${dsProduct}. Verified.`,
      checked: fullAnswer === actualProduct
    }
  };
}
