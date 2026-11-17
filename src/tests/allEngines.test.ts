import { describe, it, expect } from 'vitest';
import { calculateDirectMultiplication } from '../engines/directMultiplicationEngine';
import { calculateTwoFingerMultiplication, calculatePairProduct } from '../engines/twoFingerEngine';
import { calculateTrachtenbergAddition } from '../engines/additionEngine';
import { calculateSimpleDivision, calculateFastDivision } from '../engines/divisionEngine';
import { 
  squareEndsInFive, 
  squareTensDigitFive, 
  squareTwoDigitGeneral, 
  squareThreeDigit, 
  calculateTrachtenbergSquareRoot 
} from '../engines/squareAndRootEngine';
import { computeDigitSumDetailed, computeElevensRemainderDetailed } from '../engines/checkingEngine';
import { generateQuestionForTechnique } from '../engines/problemGenerator';

describe('Chapter 2 Direct Multiplication', () => {
  it('correctly calculates 2x2 products from book', () => {
    expect(calculateDirectMultiplication('23', '14').answerString).toBe('322');
    expect(calculateDirectMultiplication('38', '14').answerString).toBe('532');
    expect(calculateDirectMultiplication('32', '22').answerString).toBe('704');
    expect(calculateDirectMultiplication('66', '34').answerString).toBe('2244');
    expect(calculateDirectMultiplication('31', '15').answerString).toBe('465');
    expect(calculateDirectMultiplication('73', '64').answerString).toBe('4672');
  });

  it('correctly calculates long multiplicands and 3-digit multipliers', () => {
    expect(calculateDirectMultiplication('312', '14').answerString).toBe('4368');
    expect(calculateDirectMultiplication('311', '23').answerString).toBe('7153');
    expect(calculateDirectMultiplication('241304', '32').answerString).toBe('7721728');
    expect(calculateDirectMultiplication('213', '121').answerString).toBe('25773');
    expect(calculateDirectMultiplication('302', '114').answerString).toBe('34428');
    expect(calculateDirectMultiplication('203', '221').answerString).toBe('44863');
    expect(calculateDirectMultiplication('2103', '3214').answerString).toBe('6759042');
  });
});

describe('Chapter 3 Two-Finger Method', () => {
  it('computes pair-products correctly', () => {
    expect(calculatePairProduct(3, 8, 4).pairProduct).toBe(5);
    expect(calculatePairProduct(8, 2, 5).pairProduct).toBe(1);
    expect(calculatePairProduct(4, 1, 3).pairProduct).toBe(2);
    expect(calculatePairProduct(1, 4, 3).pairProduct).toBe(4);
    expect(calculatePairProduct(2, 8, 4).pairProduct).toBe(11);
    expect(calculatePairProduct(6, 7, 8).pairProduct).toBe(13);
  });

  it('computes single-digit two-finger multiplications from book', () => {
    expect(calculateTwoFingerMultiplication('3112', '6').answerString).toBe('18672');
    expect(calculateTwoFingerMultiplication('758', '7').answerString).toBe('5306');
    expect(calculateTwoFingerMultiplication('56', '4').answerString).toBe('224');
    expect(calculateTwoFingerMultiplication('82', '8').answerString).toBe('656');
    expect(calculateTwoFingerMultiplication('3945', '6').answerString).toBe('23670');
  });

  it('computes multi-digit two-finger multiplications from book', () => {
    expect(calculateTwoFingerMultiplication('73', '54').answerString).toBe('3942');
    expect(calculateTwoFingerMultiplication('5273', '54').answerString).toBe('284742');
    expect(calculateTwoFingerMultiplication('273', '154').answerString).toBe('42042');
    expect(calculateTwoFingerMultiplication('95', '62').answerString).toBe('5890');
    expect(calculateTwoFingerMultiplication('3456', '86').answerString).toBe('297216');
  });
});

describe('Chapter 4 Addition and Checking', () => {
  it('computes Trachtenberg addition and L-shaped addition correctly', () => {
    // Example 1 from p. 114
    const list1 = ['5477', '9665', '2746', '8356', '7499', '5162', '6875'];
    const res1 = calculateTrachtenbergAddition(list1);
    expect(res1.finalTotalString).toBe('45780');
    expect(res1.verification.passed).toBe(true);

    // Problem 1 from p. 115
    const prob1 = ['469', '742', '325', '962', '527', '623', '213'];
    expect(calculateTrachtenbergAddition(prob1).finalTotalString).toBe('3861');

    // Decimal addition p. 116 problem 3
    const prob3 = ['1.25', '3.06', '7.58', '0.98', '38.50', '59.50', '9.75', '2.98', '12.25', '14.85', '45.00', '25.75'];
    expect(calculateTrachtenbergAddition(prob3).finalTotalString).toBe('221.45');
  });

  it('computes elevens remainder correctly', () => {
    expect(computeElevensRemainderDetailed('48').elevensRemainder).toBe(4);
    expect(computeElevensRemainderDetailed('86').elevensRemainder).toBe(9);
    expect(computeElevensRemainderDetailed('943021758').elevensRemainder).toBe(8);
    expect(computeElevensRemainderDetailed('2368094').elevensRemainder).toBe(3);
    expect(computeElevensRemainderDetailed('4693260817').elevensRemainder).toBe(3);
  });
});

describe('Chapter 5 Division', () => {
  it('computes simple division from book examples', () => {
    const res1 = calculateSimpleDivision('27483624', '62');
    expect(res1.quotientStr).toBe('443284');
    expect(res1.remainderStr).toBe('16');

    const res2 = calculateSimpleDivision('364095', '465');
    expect(res2.quotientStr).toBe('783');
    expect(res2.remainderStr).toBe('0');
  });

  it('computes fast division from book examples', () => {
    const fast1 = calculateFastDivision('8384', '32');
    expect(fast1.quotientStr).toBe('262');
    expect(fast1.remainderStr).toBe('0');

    const fast2 = calculateFastDivision('2294', '62');
    expect(fast2.quotientStr).toBe('37');
    expect(fast2.remainderStr).toBe('0');

    const fast3 = calculateFastDivision('2296', '62');
    expect(fast3.quotientStr).toBe('37');
    expect(fast3.remainderStr).toBe('2');

    const fast4 = calculateFastDivision('1904', '34');
    expect(fast4.quotientStr).toBe('56');
    expect(fast4.remainderStr).toBe('0');
  });
});

describe('Chapter 6 Squares and Square Roots', () => {
  it('computes special squaring methods', () => {
    expect(squareEndsInFive(35).squaredStr).toBe('1225');
    expect(squareEndsInFive(65).squaredStr).toBe('4225');
    expect(squareTensDigitFive(56).squaredStr).toBe('3136');
    expect(squareTensDigitFive(51).squaredStr).toBe('2601');
  });

  it('computes general 2-digit and 3-digit squaring', () => {
    expect(squareTwoDigitGeneral(32).squaredStr).toBe('1024');
    expect(squareTwoDigitGeneral(84).squaredStr).toBe('7056');
    expect(squareTwoDigitGeneral(43).squaredStr).toBe('1849');
    expect(squareTwoDigitGeneral(73).squaredStr).toBe('5329');
    expect(squareThreeDigit(462).squaredStr).toBe('213444');
    expect(squareThreeDigit(325).squaredStr).toBe('105625');
  });

  it('computes square roots from book examples', () => {
    const r1 = calculateTrachtenbergSquareRoot('625');
    expect(r1.rootStr).toBe('25');
    expect(r1.remainderStr).toBe('0');

    const r2 = calculateTrachtenbergSquareRoot('645');
    expect(r2.rootStr).toBe('25');
    expect(r2.remainderStr).toBe('20');

    const r3 = calculateTrachtenbergSquareRoot('2200');
    expect(r3.rootStr).toBe('46');
    expect(r3.remainderStr).toBe('84');

    const r4 = calculateTrachtenbergSquareRoot('207936');
    expect(r4.rootStr).toBe('456');
    expect(r4.remainderStr).toBe('0');

    const r5 = calculateTrachtenbergSquareRoot('10323369');
    expect(r5.rootStr).toBe('3213');
    expect(r5.remainderStr).toBe('0');
  });
});

describe('Problem Generator', () => {
  it('generates valid practice questions for all techniques', () => {
    const techIds = [
      'tech-101', 'tech-102', 'tech-103', 'tech-104', 'tech-105', 
      'tech-106', 'tech-107', 'tech-109', 'tech-110', 'tech-201', 
      'tech-301', 'tech-401', 'tech-501', 'tech-601', 'tech-602', 'tech-604'
    ];

    for (const tid of techIds) {
      const q = generateQuestionForTechnique(tid, 'intermediate', 'numerical-answer');
      expect(q.prompt).toBeTruthy();
      expect(q.correctAnswer).toBeTruthy();
      expect(q.hints.length).toBe(3);
      expect(q.solution.finalAnswer).toBe(q.correctAnswer);
    }
  });
});

