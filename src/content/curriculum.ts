import { Chapter, Technique } from '../types';

export const chapters: Chapter[] = [
  {
    id: 1,
    numberString: 'One',
    title: 'Tables or No Tables?',
    subtitle: 'Basic Multiplication Without Memorized Tables',
    pageRange: 'pp. 21–55',
    introduction: 'In this opening chapter, Professor Trachtenberg revolutionizes basic multiplication by introducing specific calculation keys for each digit. Instead of rote memorization of 100 multiplication combinations, learners master intuitive rules based on number-neighbor relationships, halving, doubling, and ten-complements.',
    learningObjectives: [
      'Multiply any number by 11 using the "Add the Neighbor" rule',
      'Multiply by 12 using "Double each number and add its neighbor"',
      'Understand the concept of "half" a digit (discarding fractions) and the "add 5 if odd" rule',
      'Master multiplication keys for 6, 7, 5, 9, 8, 4, and 3',
      'Form proper mental calculation habits: eliminate verbal vocalization and perceive results directly'
    ],
    historicalContext: 'Conceived in the harrowing solitude of concentration camp confinement, Trachtenberg sought a system where even children who had previously failed arithmetic could compute effortlessly.',
    techniqueIds: [
      'tech-101', 'tech-102', 'tech-103', 'tech-104', 'tech-105',
      'tech-106', 'tech-107', 'tech-108', 'tech-109', 'tech-110', 'tech-111'
    ]
  },
  {
    id: 2,
    numberString: 'Two',
    title: 'Rapid Multiplication by the Direct Method',
    subtitle: 'Single-Line General Multiplication for Numbers with Small Digits',
    pageRange: 'pp. 55–80',
    introduction: 'The Direct Method enables you to multiply any number by any other number of any length and write down the complete answer immediately from right to left, without writing down intermediate rows of figures.',
    learningObjectives: [
      'Perform direct cross-multiplication for two-digit numbers (outside and inside pairs)',
      'Extend the outside-inside pair method across long multiplicands',
      'Master the rule of prefix zeroes: place as many zeroes in front as there are digits in the multiplier',
      'Handle three-digit and longer multipliers using outer, middle, and inner pairs',
      'Verify products using the Digit-Sum (Nines-Remainder) check method'
    ],
    techniqueIds: [
      'tech-201', 'tech-202', 'tech-203', 'tech-204', 'tech-205', 'tech-206'
    ]
  },
  {
    id: 3,
    numberString: 'Three',
    title: 'Speed Multiplication — "Two-Finger" Method',
    subtitle: 'The Units-and-Tens (UT) System for Numbers with Large Digits',
    pageRange: 'pp. 81–104',
    introduction: 'When factors contain large digits like 7, 8, and 9, the direct method can create large mental sums. Trachtenberg devised the "Two-Finger" (Units-and-Tens) method, where pairs of digits produce single-digit "pair-products", keeping carried numbers strictly to 1 or 2.',
    learningObjectives: [
      'Understand and calculate the Pair-Product: U(left × n) + T(right × n)',
      'Multiply long numbers by a single digit using pair-products',
      'Combine two UT patterns (outer and inner pairs) for two-digit multipliers',
      'Scale the Two-Finger method to three-digit and arbitrarily long multipliers',
      'Develop automatic reflex visualization of units and tens digits'
    ],
    techniqueIds: [
      'tech-301', 'tech-302', 'tech-303', 'tech-304'
    ]
  },
  {
    id: 4,
    numberString: 'Four',
    title: 'Addition and the Right Answer',
    subtitle: 'Fatigue-Free Addition & Foolproof Column Checks',
    pageRange: 'pp. 105–132',
    introduction: 'Adding long columns conventionally leads to mental fatigue and repetitive errors. The Trachtenberg addition method limits running totals so you "Never count higher than eleven", and derives the final answer via elegant L-shaped addition with column-by-column self-checking.',
    learningObjectives: [
      'Add long columns without exceeding 11 using tick marks and running remainders',
      'Apply the L-shaped addition formula: Running total + Ticks + Lower-right tick neighbor + Carry',
      'Perform three-way cross-verification: Column 9-remainders, working-table check, and total check',
      'Master the Elevens-Remainder checking method (alternating sums and adjacent pairs shortcut)'
    ],
    techniqueIds: [
      'tech-401', 'tech-402', 'tech-403', 'tech-404'
    ]
  },
  {
    id: 5,
    numberString: 'Five',
    title: 'Division — Speed and Accuracy',
    subtitle: 'The Simple Method and the Fast NT/UT Method',
    pageRange: 'pp. 133–184',
    introduction: 'Long division is traditionally the most dreaded arithmetical process. Trachtenberg presents two remarkable alternatives: the foolproof Simple Method (built on repeated addition with running digit-sum checks) and the lightning Fast Method (using NT and UT products without scrap paper).',
    learningObjectives: [
      'Execute the Simple Method of division using a self-checking 10x multiples table',
      'Understand NT (Number-Tens) and U (Units) products in fast division',
      'Navigate the zigzag rhythm: partial dividend → quotient digit → working figure → next partial dividend',
      'Apply the Trouble-Saving Device: increase divisor first digit by 1 when second digit is 8 or 9',
      'Divide by three-digit and multi-digit divisors with boundary slash and remainder region',
      'Verify division using inverse digit-sum check: (Dividend - Remainder) = Divisor × Quotient'
    ],
    techniqueIds: [
      'tech-501', 'tech-502', 'tech-503', 'tech-504', 'tech-505', 'tech-506'
    ]
  },
  {
    id: 6,
    numberString: 'Six',
    title: 'Squares and Square Roots',
    subtitle: 'Instant Mental Squaring and Exact Root Extraction',
    pageRange: 'pp. 185–226',
    introduction: 'Squaring numbers and finding square roots are presented with breathtaking simplicity. Special cases ending in 5 or starting with 5 are solved in three seconds, general two- and three-digit numbers are squared by collapsing cross-products, and square roots of any length are extracted digit-by-digit with exact remainders.',
    learningObjectives: [
      'Square numbers ending in 5: multiply tens by next integer and suffix 25',
      'Square numbers in the 50s: add units to 25 and suffix units squared',
      'Square any two-digit number by collapsing a² | 2ab | b²',
      'Square three-digit numbers using end square, open cross-product, and beginning square',
      'Extract square roots of 3- and 4-digit numbers with remainder verification',
      'Extract square roots of 5-, 6-, 7-, and 8-digit numbers by extending the cross-products table',
      'Verify square roots using (Root digit-sum)² + Remainder digit-sum = Number digit-sum'
    ],
    techniqueIds: [
      'tech-601', 'tech-602', 'tech-603', 'tech-604', 'tech-605', 'tech-606', 'tech-607'
    ]
  },
  {
    id: 7,
    numberString: 'Seven',
    title: 'Algebraic Description of the Method',
    subtitle: 'Mathematical Proofs and Formal Foundations',
    pageRange: 'pp. 227–264',
    introduction: 'This chapter provides rigorous mathematical proofs for the Trachtenberg techniques. By expanding numbers into decimal polynomials N = ∑ a_n 10ⁿ, the rules for 11, 12, 6, 7, 5, 9, 8, squaring, and units-and-tens multiplication are algebraically vindicated.',
    learningObjectives: [
      'Express any number as a decimal polynomial N = ∑ a_i 10^i',
      'Follow the algebraic proof of the rule for 11: 11N = 10N + N',
      'Review algebraic operations: parentheses, expanding, and classic equations (e.g., Persian necklace puzzle)',
      'Follow proofs of rules for 6 (6 = 5 + 1 = ½·10 + 1), 7, and 5',
      'Understand the complement telescoping proofs for 9 (10 - 1) and 8 (10 - 2)',
      'Understand algebraic formulations of the Units-and-Tens (UT) system'
    ],
    techniqueIds: [
      'tech-701', 'tech-702', 'tech-703', 'tech-704', 'tech-705', 'tech-706', 'tech-707'
    ]
  },
  {
    id: 8,
    numberString: 'Eight',
    title: 'Postscript & Philosophy',
    subtitle: 'Concentration, Accuracy, and the Joy of Mathematics',
    pageRange: 'pp. 265–272',
    introduction: 'The concluding chapter reflects on Jakow Trachtenberg’s pedagogical philosophy. Learning arithmetic through these ingenious patterns stimulates mental concentration, replaces anxiety with playful confidence, and establishes habits of mind that elevate general intellectual ability.',
    learningObjectives: [
      'Understand how Trachtenberg methods train focus and concentration',
      'Adopt the habit of absolute verification: "a problem is not finished until proven right"',
      'Eliminate the emotional fear of numbers through systematic mastery',
      'Apply speed arithmetic skills to practical everyday calculation needs'
    ],
    techniqueIds: [
      'tech-801'
    ]
  }
];

export const allTechniques: Record<string, Technique> = {
  // CHAPTER 1
  'tech-101': {
    id: 'tech-101',
    chapterId: 1,
    section: '1.2',
    pageRef: 'pp. 22–26',
    name: 'Multiplication by Eleven',
    shortName: 'Multiply by 11',
    difficulty: 'beginner',
    learningObjectives: [
      'Multiply any number by 11 without traditional multiplication tables',
      'Apply the "Add the Neighbor" rule from right to left',
      'Handle carry dots and understand why a prefix zero is required'
    ],
    prerequisites: ['Single-digit addition'],
    summary: 'The rule for 11 is "Add the neighbor". Starting with a zero written in front of the multiplicand, every digit is added to its right-hand neighbor.',
    mathematicalPrinciple: '11 × N = (10 + 1)N = 10N + N. In base 10, multiplying by 10 shifts all digits left by one column. Adding N aligns each digit with its right neighbor.',
    rulesAndProcedure: [
      '1. Write a zero in front of the multiplicand (e.g. 0633 × 11).',
      '2. The rightmost digit of the multiplicand is put down as the rightmost digit of the answer (it has no neighbor).',
      '3. Moving to the left, add each successive digit of the multiplicand to its right-hand neighbor, plus any carried 1.',
      '4. If any sum is 10 or greater, write the units digit and place a carry dot (·).',
      '5. The final step is under the prefix zero: 0 + first digit of multiplicand + carry.'
    ],
    algebraicProof: '11 × (1,000a + 100b + 10c + d) = (10,000·0 + 1,000a + 100b + 10c + d) + (10,000a + 1,000b + 100c + 10d) = 10,000(0+a) + 1,000(a+b) + 100(b+c) + 10(c+d) + d.',
    workedExamples: [
      {
        problem: '633 × 11',
        stepsSummary: '0633: 3 -> 3+3=6 -> 6+3=9 -> 0+6=6',
        result: '6963',
        details: {
          problemString: '633 × 11',
          answerString: '6963',
          steps: [],
          verification: { method: 'digit-sum', details: '633 (3) × 11 (2) = 6 = 6963 (6). Verified.', checked: true }
        }
      },
      {
        problem: '721,324 × 11',
        stepsSummary: '0721324: 4 -> 2+4=6 -> 3+2=5 -> 1+3=4 -> 2+1=3 -> 7+2=9 -> 0+7=7',
        result: '7934564',
        details: {
          problemString: '721324 × 11',
          answerString: '7934564',
          steps: [],
          verification: { method: 'digit-sum', details: 'Verified.', checked: true }
        }
      },
      {
        problem: '1,754 × 11',
        stepsSummary: '01754: 4 -> 5+4=9 -> 7+5=12 (write 2, carry 1) -> 1+7+1=9 -> 0+1=1',
        result: '19294',
        details: {
          problemString: '1754 × 11',
          answerString: '19294',
          steps: [],
          verification: { method: 'digit-sum', details: 'Verified.', checked: true }
        }
      }
    ],
    specialCases: [
      'Leading 9 followed by a large digit (e.g. 98,834 × 11): 0 + 9 + 1 carry = 10, producing two digits at the front: 1,087,174.',
      'Multiplicands ending in 0: 0 has no neighbor, so the rightmost answer digit is 0.'
    ],
    commonMistakes: [
      'Forgetting to write the zero in front and omitting the leftmost digit.',
      'Forgetting to add the carried dot to the next column.'
    ],
    knowledgeCheckQuestions: [
      {
        question: 'Why do we place a zero in front of the multiplicand when multiplying by 11?',
        options: [
          'To make the number divisible by 10',
          'To provide a place for the last calculation step and any final carry',
          'Because the Trachtenberg system only works with even-length numbers',
          'To double the result'
        ],
        correctIndex: 1,
        explanation: 'The prefix zero ensures that the first digit of the multiplicand is added as a neighbor and any carried 1 has a slot, producing an answer that is one digit longer.'
      },
      {
        question: 'In multiplying 584 by 11, what is the tens digit of the answer?',
        options: ['2', '4', '8', '3'],
        correctIndex: 0,
        explanation: 'Tens digit comes from 8 + neighbor 4 = 12. We write 2 and carry 1.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-102': {
    id: 'tech-102',
    chapterId: 1,
    section: '1.3',
    pageRef: 'pp. 26–28',
    name: 'Multiplication by Twelve',
    shortName: 'Multiply by 12',
    difficulty: 'beginner',
    learningObjectives: [
      'Multiply by 12 using the "Double and add the neighbor" rule',
      'Keep track of carries up to 2'
    ],
    prerequisites: ['tech-101'],
    summary: 'To multiply by 12, double each number in turn and add its right-hand neighbor.',
    mathematicalPrinciple: '12 × N = (10 + 2)N = 10N + 2N. Each column receives 2 × current digit + right-hand neighbor.',
    rulesAndProcedure: [
      '1. Write a zero in front of the multiplicand: 0N.',
      '2. First step: Double the right-hand digit of N (it has no neighbor). Put down units, carry tens.',
      '3. Middle steps: Double each digit in turn and add its right-hand neighbor, plus carry.',
      '4. Final step under prefix zero: Double 0 is 0, add the neighbor (first digit of N) plus carry.'
    ],
    workedExamples: [
      {
        problem: '413 × 12',
        stepsSummary: '0413: 2(3)=6 -> 2(1)+3=5 -> 2(4)+1=9 -> 2(0)+4=4',
        result: '4956',
        details: { problemString: '413 × 12', answerString: '4956', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '63,247 × 12',
        stepsSummary: '063247: 2(7)=14 (4, c1) -> 2(4)+7+1=16 (6, c1) -> 2(2)+4+1=9 -> 2(3)+2=8 -> 2(6)+3=15 (5, c1) -> 2(0)+6+1=7',
        result: '758964',
        details: { problemString: '63247 × 12', answerString: '758964', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Carries can be 1 or 2 when doubling digits ≥ 5 plus a large neighbor.'],
    commonMistakes: ['Doubling the neighbor instead of doubling the number.'],
    knowledgeCheckQuestions: [
      {
        question: 'When multiplying 48 by 12, what is the first step at the units place?',
        options: ['Double 4 and add 8', 'Double 8 (16, write 6 carry 1)', 'Add 4 and 8', 'Double both digits'],
        correctIndex: 1,
        explanation: 'At the rightmost end there is no neighbor, so we double 8 to get 16: put 6, carry 1.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-103': {
    id: 'tech-103',
    chapterId: 1,
    section: '1.4',
    pageRef: 'pp. 28–35',
    name: 'Multiplication by Six',
    shortName: 'Multiply by 6',
    difficulty: 'intermediate',
    learningObjectives: [
      'Master the concept of "half" a digit (discarding fractional halves: half of 5 is 2)',
      'Apply the rule: to each number add half the neighbor, plus 5 if the number is odd',
      'Recognize oddness immediately without verbal hesitation'
    ],
    prerequisites: ['tech-101'],
    summary: 'To each number add half the neighbor; plus 5 if the number itself is odd.',
    mathematicalPrinciple: '6 × d = (5 + 1)d = 10(d/2) + d. For odd digits d = 2k+1, 10(k + 0.5) = 10k + 5, so an odd digit contributes 5 to its own column and k to the next column.',
    rulesAndProcedure: [
      '1. Prefix zero in front of the multiplicand: 0N.',
      '2. If the current digit is odd, add 5 (or 6 if there is a carried 1).',
      '3. Add the current number itself.',
      '4. Add "half" the right-hand neighbor (integer division by 2, dropping fractions).',
      '5. Add any carried dot.',
      '6. Under the prefix zero: zero is even (no 5), so add half the neighbor + carry.'
    ],
    workedExamples: [
      {
        problem: '622,084 × 6',
        stepsSummary: 'All digits even: 4 -> 8+2=10 (0, c1) -> 0+4+1=5 -> 2+0=2 -> 2+1=3 -> 6+1=7 -> 0+3=3',
        result: '3732504',
        details: { problemString: '622084 × 6', answerString: '3732504', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '443,052 × 6',
        stepsSummary: 'Contains odd digits 3 and 5. 2 is even -> 5 is odd: 5+5+half(2)=11 (1, c1) -> 0+half(5)+1=3 -> 3 is odd: 3+5+half(0)=8 -> 4+half(3)=5 -> 4+half(4)=6 -> 0+half(4)=2',
        result: '2658312',
        details: { problemString: '443052 × 6', answerString: '2658312', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Zero is considered an even number: no 5 is ever added at zero.'],
    commonMistakes: [
      'Checking the neighbor for oddness instead of the current number.',
      'Adding half of an odd neighbor with a fraction instead of discarding it.'
    ],
    knowledgeCheckQuestions: [
      {
        question: 'What is "half" the neighbor if the neighbor is 7?',
        options: ['3.5', '3', '4', '7'],
        correctIndex: 1,
        explanation: 'In the Trachtenberg system, fractions are discarded: half of 7 is 3.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-104': {
    id: 'tech-104',
    chapterId: 1,
    section: '1.5',
    pageRef: 'pp. 35–39',
    name: 'Multiplication by Seven',
    shortName: 'Multiply by 7',
    difficulty: 'intermediate',
    learningObjectives: [
      'Multiply by 7: "Double the number and add half the neighbor; add 5 if the number is odd"',
      'Execute the four mental stages smoothly'
    ],
    prerequisites: ['tech-103'],
    summary: 'Double the number and add half the neighbor; add 5 if the number is odd.',
    mathematicalPrinciple: '7 × d = (5 + 2)d = 2d + 10(d/2). Odd numbers contribute 5 to their column plus double their value.',
    rulesAndProcedure: [
      '1. Prefix zero in front: 0N.',
      '2. Double the current digit.',
      '3. Add 5 if the current number is odd (if there is a carried dot, add 6 instead).',
      '4. Add "half" the right-hand neighbor.',
      '5. Under prefix zero: 2(0) = 0, add half the neighbor + carry.'
    ],
    workedExamples: [
      {
        problem: '4,242 × 7',
        stepsSummary: 'All even: 2(2)=4 -> 2(4)+half(2)=9 -> 2(2)+half(4)=6 -> 2(4)+half(2)=9 -> 2(0)+half(4)=2',
        result: '29694',
        details: { problemString: '4242 × 7', answerString: '29694', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '3,412 × 7',
        stepsSummary: '3 and 1 are odd: 2(2)=4 -> 2(1)+5+half(2)=8 -> 2(4)+half(1)=8 -> 2(3)+5+half(4)=15 (5, c1) -> 2(0)+half(3)+1=2',
        result: '23884',
        details: { problemString: '3412 × 7', answerString: '23884', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Odd digits requiring 5 plus carry can produce carries of up to 2.'],
    commonMistakes: ['Forgetting to double the current number before adding half the neighbor.'],
    knowledgeCheckQuestions: [
      {
        question: 'When multiplying digit 3 with neighbor 6 by 7, what is the result before carry?',
        options: ['11', '14', '17', '9'],
        correctIndex: 1,
        explanation: '3 is odd (add 5) + 2×3 (6) = 11. Half of 6 is 3. 11 + 3 = 14.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-105': {
    id: 'tech-105',
    chapterId: 1,
    section: '1.6',
    pageRef: 'pp. 39–40',
    name: 'Multiplication by Five',
    shortName: 'Multiply by 5',
    difficulty: 'beginner',
    learningObjectives: [
      'Multiply by 5: "Half the neighbor, plus 5 if the number is odd"',
      'Do not add the number itself'
    ],
    prerequisites: ['tech-103'],
    summary: 'Half the neighbor, plus 5 if the number is odd. The number itself is only inspected for oddness.',
    mathematicalPrinciple: '5 × d = 10 × (d / 2). The value of d is shifted entirely into the next higher decimal place as d/2.',
    rulesAndProcedure: [
      '1. Prefix zero: 0N.',
      '2. Inspect the number: if odd, start with 5; if even, start with 0.',
      '3. Add half the neighbor to the right.',
      '4. Add any carried dot.',
      '5. Under prefix zero: half the neighbor + carry.'
    ],
    workedExamples: [
      {
        problem: '426 × 5',
        stepsSummary: '6 is even (0) -> 2 is even + half(6)=3 -> 4 is even + half(2)=1 -> 0 is even + half(4)=2',
        result: '2130',
        details: { problemString: '426 × 5', answerString: '2130', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '436 × 5',
        stepsSummary: '6 is even (0) -> 3 is odd: 5 + half(6)=8 -> 4 is even + half(3)=1 -> 0 is even + half(4)=2',
        result: '2180',
        details: { problemString: '436 × 5', answerString: '2180', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['The number itself is never added; only its oddness contributes 5.'],
    commonMistakes: ['Accidentally adding the current number into the sum.'],
    knowledgeCheckQuestions: [
      {
        question: 'In multiplying 74 by 5, what is the units digit of the answer?',
        options: ['0', '5', '4', '7'],
        correctIndex: 0,
        explanation: 'Rightmost digit 4 is even (0) and has no neighbor, so the units digit is 0.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-106': {
    id: 'tech-106',
    chapterId: 1,
    section: '1.7',
    pageRef: 'pp. 40–45',
    name: 'Multiplication by Nine',
    shortName: 'Multiply by 9',
    difficulty: 'intermediate',
    learningObjectives: [
      'Understand complement arithmetic (10s complement and 9s complement)',
      'Apply the rule: Rightmost digit from 10; Middle digits from 9 + neighbor; Leftmost digit - 1'
    ],
    prerequisites: ['tech-101'],
    summary: 'First digit: 10 - digit. Middle digits: (9 - digit) + neighbor. Leftmost digit: leftmost digit - 1.',
    mathematicalPrinciple: '9N = (10 - 1)N = 10N - N. Telescoping subtraction expressed through 9s and 10s complements.',
    rulesAndProcedure: [
      '1. Prefix zero: 0N.',
      '2. First digit (rightmost): Subtract from 10.',
      '3. Middle digits: Subtract digit from 9 and add the right-hand neighbor, plus carry.',
      '4. Leftmost digit under prefix zero: Subtract 1 from the original leftmost digit of N, plus carry.'
    ],
    workedExamples: [
      {
        problem: '8,769 × 9',
        stepsSummary: '10-9=1 -> (9-6)+9=12 (2, c1) -> (9-7)+6+1=9 -> (9-8)+7=8 -> 8-1=7',
        result: '78921',
        details: { problemString: '8769 × 9', answerString: '78921', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '8,888 × 9',
        stepsSummary: '10-8=2 -> (9-8)+8=9 -> (9-8)+8=9 -> (9-8)+8=9 -> 8-1=7',
        result: '79992',
        details: { problemString: '8888 × 9', answerString: '79992', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['If the rightmost digit is 0, 10 - 0 = 10 (put 0, carry 1).'],
    commonMistakes: ['Subtracting from 9 at the first step instead of 10.'],
    knowledgeCheckQuestions: [
      {
        question: 'For 467 × 9, what is the rightmost digit of the answer?',
        options: ['7', '3', '2', '1'],
        correctIndex: 1,
        explanation: 'Rightmost digit is 10 - 7 = 3.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-107': {
    id: 'tech-107',
    chapterId: 1,
    section: '1.7',
    pageRef: 'pp. 43–46',
    name: 'Multiplication by Eight',
    shortName: 'Multiply by 8',
    difficulty: 'intermediate',
    learningObjectives: [
      'Multiply by 8: First digit: (10 - digit) doubled; Middle: (9 - digit) doubled + neighbor; Leftmost: leftmost digit - 2'
    ],
    prerequisites: ['tech-106'],
    summary: 'First digit: 2 × (10 - digit). Middle digits: 2 × (9 - digit) + neighbor. Leftmost digit: leftmost digit - 2.',
    mathematicalPrinciple: '8N = (10 - 2)N = 10N - 2N. Complements are doubled.',
    rulesAndProcedure: [
      '1. Prefix zero: 0N.',
      '2. First digit: Subtract from 10 and double.',
      '3. Middle digits: Subtract from 9, double what you get, and add the right neighbor, plus carry.',
      '4. Leftmost digit under prefix zero: Subtract 2 from the leftmost digit of original N, plus carry.'
    ],
    workedExamples: [
      {
        problem: '789 × 8',
        stepsSummary: '2(10-9)=2 -> 2(9-8)+9=11 (1, c1) -> 2(9-7)+8+1=13 (3, c1) -> 7-2+1=6',
        result: '6312',
        details: { problemString: '789 × 8', answerString: '6312', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['At the final step, subtract 2 (not 1).'],
    commonMistakes: ['Doubling before subtracting instead of subtracting from 9/10 first.'],
    knowledgeCheckQuestions: [
      {
        question: 'In multiplying 73 by 8, what is the first step?',
        options: ['10 - 3 = 7', '2 × (10 - 3) = 14 (write 4, carry 1)', '8 × 3 = 24', '10 - 8 = 2'],
        correctIndex: 1,
        explanation: '10 - 3 = 7, doubled is 14: write 4, carry 1.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-108': {
    id: 'tech-108',
    chapterId: 1,
    section: '1.7',
    pageRef: 'pp. 45–46',
    name: 'Single-Digit Pattern Diagrams for 8 and 9',
    shortName: 'Single-Digit Diagrams',
    difficulty: 'beginner',
    learningObjectives: [
      'Visualize 1-digit products using the Trachtenberg diagram without reciting tables',
      'For 9: left digit is (d - 1), right digit is (10 - d)',
      'For 8: left digit is (d - 2), right digit is 2 × (10 - d)'
    ],
    prerequisites: ['tech-106', 'tech-107'],
    summary: 'Diagrammatic memory peg for single-digit products like 7 × 9 = 63 and 7 × 8 = 56.',
    mathematicalPrinciple: 'Special case of base-10 complement decomposition for single digits.',
    rulesAndProcedure: [
      'To multiply single digit d by 9: Left digit = d - 1, Right digit = 10 - d.',
      'To multiply single digit d by 8: Left digit = d - 2, Right digit = 2 × (10 - d).'
    ],
    workedExamples: [
      {
        problem: '7 × 9',
        stepsSummary: 'Left: 7-1=6; Right: 10-7=3 → 63',
        result: '63',
        details: { problemString: '7 × 9', answerString: '63', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '8 × 8',
        stepsSummary: 'Left: 8-2=6; Right: 2×(10-8)=4 → 64',
        result: '64',
        details: { problemString: '8 × 8', answerString: '64', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['For digits 1 to 5 with 8, carrying applies, but small products are already familiar.'],
    commonMistakes: ['Mixing up 1 less (for 9) with 2 less (for 8).'],
    knowledgeCheckQuestions: [
      {
        question: 'Using the single-digit diagram for 8 × 9, what are the left and right digits?',
        options: ['7 and 2 (72)', '6 and 3 (63)', '8 and 1 (81)', '7 and 1 (71)'],
        correctIndex: 0,
        explanation: '8 - 1 = 7, 10 - 8 = 2 → 72.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-109': {
    id: 'tech-109',
    chapterId: 1,
    section: '1.8',
    pageRef: 'pp. 46–49',
    name: 'Multiplication by Four',
    shortName: 'Multiply by 4',
    difficulty: 'advanced',
    learningObjectives: [
      'Multiply by 4 combining 9s complements with half the neighbor and oddness adjustment',
      'Rule: First: 10 - digit (+ 5 if odd); Middle: 9 - digit (+ 5 if odd) + half neighbor; Leftmost: half leftmost - 1'
    ],
    prerequisites: ['tech-103', 'tech-106'],
    summary: 'Combines the 9s complement with halving the neighbor and adding 5 if odd.',
    mathematicalPrinciple: '4N = 10(N/2) - N = 5N - N.',
    rulesAndProcedure: [
      '1. Prefix zero: 0N.',
      '2. First digit: Subtract from 10; add 5 if odd.',
      '3. Middle digits: Subtract from 9; add 5 if odd; add half the right neighbor + carry.',
      '4. Leftmost digit under prefix zero: Take half the leftmost digit of N minus 1, plus carry.'
    ],
    workedExamples: [
      {
        problem: '20,684 × 4',
        stepsSummary: 'All even: 10-4=6 -> (9-8)+half(4)=3 -> (9-6)+half(8)=7 -> (9-0)+half(6)=12 (2, c1) -> (9-2)+half(0)+1=8 -> half(2)-1=0',
        result: '82736',
        details: { problemString: '20684 × 4', answerString: '82736', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '365,187 × 4',
        stepsSummary: 'With odd digits 7, 1, 5, 3: result is 1,460,748.',
        result: '1460748',
        details: { problemString: '365187 × 4', answerString: '1460748', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['If half of leftmost digit minus 1 is negative, carry absorbs it to 0.'],
    commonMistakes: ['Forgetting the minus 1 at the leftmost step.'],
    knowledgeCheckQuestions: [
      {
        question: 'In the rule for 4, what is done at the leftmost prefix zero?',
        options: [
          'Copy the leftmost digit',
          'Take half the leftmost digit and subtract 1 (plus carry)',
          'Subtract 2 from the leftmost digit',
          'Double the leftmost digit'
        ],
        correctIndex: 1,
        explanation: 'Under the prefix zero: half the neighbor (leftmost digit) minus 1, plus carry.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-110': {
    id: 'tech-110',
    chapterId: 1,
    section: '1.9',
    pageRef: 'pp. 49–50',
    name: 'Multiplication by Three',
    shortName: 'Multiply by 3',
    difficulty: 'advanced',
    learningObjectives: [
      'Multiply by 3: First: 2×(10 - digit) (+ 5 if odd); Middle: 2×(9 - digit) (+ 5 if odd) + half neighbor; Leftmost: half leftmost - 2'
    ],
    prerequisites: ['tech-107', 'tech-109'],
    summary: 'Combines doubled complements with halving the neighbor and adding 5 if odd.',
    mathematicalPrinciple: '3N = 10(N/2) - 2N = 5N - 2N.',
    rulesAndProcedure: [
      '1. Prefix zero: 0N.',
      '2. First digit: (10 - digit) doubled; add 5 if odd.',
      '3. Middle digits: (9 - digit) doubled; add 5 if odd; add half the neighbor + carry.',
      '4. Leftmost digit under zero: Half the leftmost digit minus 2, plus carry.'
    ],
    workedExamples: [
      {
        problem: '2,588 × 3',
        stepsSummary: '2(10-8)=4 -> 2(9-8)+half(8)=6 -> 2(9-5)+5+half(8)=17 (7, c1) -> 2(9-2)+half(5)+1=17 (7, c1) -> half(2)-2+1=0',
        result: '7764',
        details: { problemString: '2588 × 3', answerString: '7764', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Leftmost step subtracts 2 from half the leftmost digit.'],
    commonMistakes: ['Forgetting to double the complement.'],
    knowledgeCheckQuestions: [
      {
        question: 'What is the leftmost adjustment when multiplying by 3?',
        options: ['Subtract 1', 'Half of leftmost digit minus 2', 'Subtract 3', 'Double and subtract 2'],
        correctIndex: 1,
        explanation: 'Under prefix zero: take half the leftmost digit and subtract 2, plus carry.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-111': {
    id: 'tech-111',
    chapterId: 1,
    section: '1.9',
    pageRef: 'pp. 50–55',
    name: 'Multiplication by 2, 1, 0 & Long Multiplication Assembly',
    shortName: 'Digits 2, 1, 0 & Column Multiplication',
    difficulty: 'beginner',
    learningObjectives: [
      'Execute rules for 2 (double each digit, no neighbor), 1 (copy), and 0 (zero)',
      'Assemble multi-digit partial products using Trachtenberg single-digit keys into full long multiplication'
    ],
    prerequisites: ['tech-101'],
    summary: 'Trivial digits 2, 1, 0 and assembling long multi-digit products without memorized tables.',
    mathematicalPrinciple: 'Standard positional multiplication where each partial product is computed using Trachtenberg rules.',
    rulesAndProcedure: [
      'Multiply by 2: Double each digit, carry as usual, no neighbor.',
      'Multiply by 1: Copy down digits unchanged.',
      'Multiply by 0: Zero.',
      'For multi-digit numbers: compute each row using the corresponding digit rule and add columns.'
    ],
    workedExamples: [
      {
        problem: '37,654 × 498',
        stepsSummary: 'Row 1 (×8) = 301232; Row 2 (×9) = 338886; Row 3 (×4) = 150616; Column Sum = 18751692',
        result: '18751692',
        details: { problemString: '37654 × 498', answerString: '18751692', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Zero in multiplier produces a row of zeroes or shifts column by one place.'],
    commonMistakes: ['Misaligning partial product columns.'],
    knowledgeCheckQuestions: [
      {
        question: 'Does the Trachtenberg rule for 2 use the right-hand neighbor?',
        options: ['Yes, always', 'No, each digit is doubled without the neighbor', 'Only for odd digits', 'Only at the end'],
        correctIndex: 1,
        explanation: 'For 2, each digit is simply doubled with carry; no neighbor is used.'
      }
    ],
    masteryThresholdScore: 100
  },

  // CHAPTER 2
  'tech-201': {
    id: 'tech-201',
    chapterId: 2,
    section: '2.1',
    pageRef: 'pp. 57–61',
    name: 'Direct Multiplication: Two Digits by Two Digits',
    shortName: 'Direct 2×2',
    difficulty: 'intermediate',
    learningObjectives: [
      'Multiply two 2-digit numbers mentally in a single written line',
      'Identify outside pairs and inside pairs'
    ],
    prerequisites: ['tech-101'],
    summary: 'Outside pair + inside pair cross-multiplication in a single line.',
    mathematicalPrinciple: '(10a + b)(10c + d) = 100(ac) + 10(ad + bc) + bd.',
    rulesAndProcedure: [
      '1. Prefix two zeroes: 00AB × CD.',
      '2. Step 1 (Units): Multiply right-hand digits B × D. Write units, carry tens.',
      '3. Step 2 (Tens): Outside pair (A × D) + inside pair (B × C) + carry.',
      '4. Step 3 (Hundreds): Left-hand digits (A × C) + carry.'
    ],
    workedExamples: [
      {
        problem: '23 × 14',
        stepsSummary: '3×4=12 (2, c1) -> (2×4)+(3×1)+1=12 (2, c1) -> (2×1)+1=3',
        result: '322',
        details: { problemString: '23 × 14', answerString: '322', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '38 × 14',
        stepsSummary: '8×4=32 (2, c3) -> (3×4)+(8×1)+3=23 (3, c2) -> (3×1)+2=5',
        result: '532',
        details: { problemString: '38 × 14', answerString: '532', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Carrying tens into the next column.'],
    commonMistakes: ['Adding products instead of multiplying pairs.'],
    knowledgeCheckQuestions: [
      {
        question: 'In 46 × 87, what are the outside and inside pairs for the middle step?',
        options: [
          'Outside: 4×7, Inside: 6×8',
          'Outside: 4×8, Inside: 6×7',
          'Outside: 6×7, Inside: 4×8',
          'Outside: 4×6, Inside: 8×7'
        ],
        correctIndex: 0,
        explanation: 'Outside pair joins extreme ends 4 and 7; inside pair joins inner figures 6 and 8.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-202': {
    id: 'tech-202',
    chapterId: 2,
    section: '2.2',
    pageRef: 'pp. 62–67',
    name: 'Direct Multiplication: Long Multiplicands',
    shortName: 'Direct Long × 2-Digit',
    difficulty: 'intermediate',
    learningObjectives: [
      'Slide the outside-inside pair across any length multiplicand',
      'Prefix as many zeroes as digits in multiplier'
    ],
    prerequisites: ['tech-201'],
    summary: 'Repeat the outside-inside pair operation across all columns of a long multiplicand.',
    mathematicalPrinciple: 'Sliding convolution of digit vectors.',
    rulesAndProcedure: [
      '1. Prefix two zeroes before the multiplicand: 00N × AB.',
      '2. Column 1: rightmost digit × B.',
      '3. Column k: (multiplicand digit k × B) + (multiplicand digit k-1 × A) + carry.',
      '4. Continue until under the prefix zeroes.'
    ],
    workedExamples: [
      {
        problem: '312 × 14',
        stepsSummary: '2×4=8 -> (1×4)+(2×1)=6 -> (3×4)+(1×1)=13 (3, c1) -> (3×1)+1=4',
        result: '4368',
        details: { problemString: '312 × 14', answerString: '4368', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '241,304 × 32',
        stepsSummary: 'Result: 7,721,728',
        result: '7721728',
        details: { problemString: '241304 × 32', answerString: '7721728', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Zero digits in multiplicand: zero times any number is zero.'],
    commonMistakes: ['Losing track of the current pair position.'],
    knowledgeCheckQuestions: [
      {
        question: 'How many zeroes should be placed before the multiplicand when multiplying by 42?',
        options: ['1', '2', '3', 'None'],
        correctIndex: 1,
        explanation: 'The multiplier 42 has 2 digits, so place 2 zeroes before the multiplicand.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-203': {
    id: 'tech-203',
    chapterId: 2,
    section: '2.3',
    pageRef: 'pp. 68–70',
    name: 'Handling Terminal Zeroes in Factors',
    shortName: 'Terminal Zeroes',
    difficulty: 'beginner',
    learningObjectives: [
      'Collect all trailing zeroes from multiplicand and multiplier',
      'Append them directly to the end of the final product'
    ],
    prerequisites: ['tech-201'],
    summary: 'Collect all terminal zeroes at the end of both numbers, multiply remaining digits, and append zeroes.',
    mathematicalPrinciple: 'Associativity and commutativity: A·10^p × B·10^q = (A × B)·10^(p+q).',
    rulesAndProcedure: [
      '1. Count trailing zeroes on multiplicand and multiplier.',
      '2. Drop trailing zeroes and multiply remaining figures using the Direct Method.',
      '3. Write all counted trailing zeroes after the product.'
    ],
    workedExamples: [
      {
        problem: '31,100 × 23',
        stepsSummary: '311 × 23 = 7,153. Append two zeroes → 715,300',
        result: '715300',
        details: { problemString: '31100 × 23', answerString: '715300', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '230,000 × 140',
        stepsSummary: '23 × 14 = 322. Append 4 + 1 = 5 zeroes → 32,200,000',
        result: '32200000',
        details: { problemString: '230000 × 140', answerString: '32200000', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Zeroes in the middle of a number cannot be dropped; only terminal zeroes.'],
    commonMistakes: ['Dropping internal zeroes instead of terminal zeroes.'],
    knowledgeCheckQuestions: [
      {
        question: 'In 5,400 × 30, how many zeroes are appended to the product of 54 × 3?',
        options: ['2', '3', '1', '4'],
        correctIndex: 1,
        explanation: 'Two zeroes from 5,400 and one zero from 30 make a total of 3 terminal zeroes.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-204': {
    id: 'tech-204',
    chapterId: 2,
    section: '2.4',
    pageRef: 'pp. 70–75',
    name: 'Direct Multiplication: Three-Digit Multipliers',
    shortName: 'Direct 3-Digit Multipliers',
    difficulty: 'advanced',
    learningObjectives: [
      'Multiply by 3-digit multipliers in a single line',
      'Manage outer, middle, and inner pairs simultaneously'
    ],
    prerequisites: ['tech-202'],
    summary: 'Prefix 3 zeroes. Each answer digit is the sum of up to 3 cross-products (outer, middle, inner) plus carry.',
    mathematicalPrinciple: 'Discrete convolution of 3-element filter with arbitrary signal.',
    rulesAndProcedure: [
      '1. Prefix three zeroes: 000N × ABC.',
      '2. Step 1: Units × C.',
      '3. Step 2: (Units × B) + (Tens × C).',
      '4. Step 3: (Units × A) + (Tens × B) + (Hundreds × C) [Outer, Middle, Inner].',
      '5. Continue moving the 3-pair pattern leftward.'
    ],
    workedExamples: [
      {
        problem: '213 × 121',
        stepsSummary: '3×1=3 -> (1×1)+(3×2)=7 -> (2×1)+(1×2)+(3×1)=7 -> (0×1)+(2×2)+(1×1)=5 -> (0×1)+(0×2)+(2×1)=2',
        result: '25773',
        details: { problemString: '213 × 121', answerString: '25773', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '302 × 114',
        stepsSummary: 'Result: 34,428',
        result: '34428',
        details: { problemString: '302 × 114', answerString: '34428', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Middle zeroes in multiplicand or multiplier simplify pairs to 0.'],
    commonMistakes: ['Connecting the wrong pair of digits.'],
    knowledgeCheckQuestions: [
      {
        question: 'At the peak of a 3-digit multiplication, how many pairs of digits are added for one answer figure?',
        options: ['1', '2', '3', '4'],
        correctIndex: 2,
        explanation: 'Three pairs: outer, middle, and inner pairs.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-205': {
    id: 'tech-205',
    chapterId: 2,
    section: '2.5',
    pageRef: 'pp. 75–76',
    name: 'Direct Multiplication: Multipliers of Any Length',
    shortName: 'Direct Arbitrary Length',
    difficulty: 'expert',
    learningObjectives: [
      'Scale the direct method to 4-digit and longer multipliers',
      'Form nested pairs moving inward from both ends'
    ],
    prerequisites: ['tech-204'],
    summary: 'Prefix k zeroes for a k-digit multiplier. Each digit is formed by nested pairs moving inward from both ends.',
    mathematicalPrinciple: 'Complete discrete convolution: c_k = ∑ a_{k-j} b_j + carry.',
    rulesAndProcedure: [
      '1. Prefix k zeroes for a k-digit multiplier.',
      '2. Identify the outermost pair (current column × rightmost multiplier digit).',
      '3. Move inward one digit from each side to form the next pair, repeating until all multiplier digits are paired.',
      '4. Sum all products and add carry.'
    ],
    workedExamples: [
      {
        problem: '2,103 × 3,214',
        stepsSummary: '7 steps from right to left yielding 6,759,042.',
        result: '6759042',
        details: { problemString: '2103 × 3214', answerString: '6759042', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Large digits require significant mental carries (addressed in Chapter 3).'],
    commonMistakes: ['Crossing over the middle and duplicating pairs.'],
    knowledgeCheckQuestions: [
      {
        question: 'How many zeroes are placed before the multiplicand when multiplying by a 4-digit number like 3,214?',
        options: ['2', '3', '4', '5'],
        correctIndex: 2,
        explanation: 'As many zeroes as digits in the multiplier: 4 zeroes.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-206': {
    id: 'tech-206',
    chapterId: 2,
    section: '2.6',
    pageRef: 'pp. 77–82',
    name: 'Checking Answers by the Digit-Sum (Nines-Remainder) Method',
    shortName: 'Digit-Sum Check',
    difficulty: 'beginner',
    learningObjectives: [
      'Calculate reduced digit-sums quickly by casting out 9s and pairs that add to 9',
      'Reduce running totals as you go along',
      'Check multiplication: Digit-sum(Product) = Digit-sum(DS(A) × DS(B))'
    ],
    prerequisites: ['Single-digit addition'],
    summary: 'A fast check based on arithmetic modulo 9. Cast out 9s and verify that DS(A) × DS(B) ≡ DS(Product).',
    mathematicalPrinciple: 'N ≡ ∑ a_i (mod 9) because 10 ≡ 1 (mod 9). Hence any number is congruent to the sum of its digits modulo 9.',
    rulesAndProcedure: [
      '1. Add the digits across each number, ignoring any 9s or pairs that add to 9.',
      '2. If running total reaches two digits, reduce immediately by adding its digits.',
      '3. Multiply the digit-sums of the two factors and reduce to a single digit.',
      '4. Compare with the digit-sum of the product. They must be equal.'
    ],
    workedExamples: [
      {
        problem: 'Check 204 × 31 = 6,324',
        stepsSummary: 'DS(204) = 6; DS(31) = 4. 6 × 4 = 24 -> 6. DS(6324) = 15 -> 6. 6 = 6. Checked.',
        result: '6 = 6',
        details: { problemString: '204 × 31', answerString: '6324', steps: [], verification: { method: 'digit-sum', details: '6=6', checked: true } }
      }
    ],
    specialCases: ['A digit-sum of 9 is equivalent to 0.'],
    commonMistakes: ['Retaining 9 instead of treating it as 0 in modular arithmetic.'],
    knowledgeCheckQuestions: [
      {
        question: 'What is the reduced digit-sum of 9,182,736?',
        options: ['9', '0', '1', '7'],
        correctIndex: 1,
        explanation: '9 is ignored, 1+8=9 (ignore), 2+7=9 (ignore), 3+6=9 (ignore). Everything drops out to 0.'
      }
    ],
    masteryThresholdScore: 100
  },

  // CHAPTER 3
  'tech-301': {
    id: 'tech-301',
    chapterId: 3,
    section: '3.1',
    pageRef: 'pp. 81–87',
    name: 'The Pair-Product Concept (Units-and-Tens Definition)',
    shortName: 'Pair-Product Definition',
    difficulty: 'intermediate',
    learningObjectives: [
      'Define and calculate a Pair-Product: U(left × n) + T(right × n)',
      'Mentally isolate units and tens digits of single-digit products',
      'Never carry large numbers: carries are strictly limited to 1 or 2'
    ],
    prerequisites: ['tech-201'],
    summary: 'A pair-product is formed by multiplying adjacent digits [dL, dR] by a multiplier digit n: U(dL × n) + T(dR × n).',
    mathematicalPrinciple: 'Base-10 column alignment: (10 dL + dR) × n = 10(dL × n) + (dR × n) = 100 T_L + 10(U_L + T_R) + U_R. The tens column receives U_L + T_R.',
    rulesAndProcedure: [
      '1. Take an adjacent pair of digits: [dL, dR] and multiplier n.',
      '2. Multiply dL × n: retain only the UNITS digit (U).',
      '3. Multiply dR × n: retain only the TENS digit (T).',
      '4. Add U + T. This single sum is the Pair-Product.'
    ],
    workedExamples: [
      {
        problem: '[3, 8] × 4',
        stepsSummary: '3×4=12 (U=2); 8×4=32 (T=3). 2 + 3 = 5',
        result: '5',
        details: { problemString: '[3, 8] × 4', answerString: '5', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '[8, 2] × 5',
        stepsSummary: '8×5=40 (U=0); 2×5=10 (T=1). 0 + 1 = 1',
        result: '1',
        details: { problemString: '[8, 2] × 5', answerString: '1', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['If dR has no digit, T = 0. If dL has no digit, U = 0.'],
    commonMistakes: ['Taking tens of the left digit instead of units.'],
    knowledgeCheckQuestions: [
      {
        question: 'What is the pair-product of [6, 7] × 8?',
        options: ['13', '8', '5', '11'],
        correctIndex: 0,
        explanation: '6 × 8 = 48 (Units = 8). 7 × 8 = 56 (Tens = 5). 8 + 5 = 13.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-302': {
    id: 'tech-302',
    chapterId: 3,
    section: '3.2',
    pageRef: 'pp. 88–92',
    name: 'Speed Multiplication by a Single Digit',
    shortName: 'Two-Finger 1-Digit',
    difficulty: 'intermediate',
    learningObjectives: [
      'Multiply any long number by a single digit using pair-products',
      'Shift the UT finger pair across the multiplicand from right to left'
    ],
    prerequisites: ['tech-301'],
    summary: 'Each figure of the answer is one pair-product of adjacent multiplicand digits.',
    mathematicalPrinciple: 'Sequential application of the UT identity across decimal places.',
    rulesAndProcedure: [
      '1. Prefix one zero: 0N × n.',
      '2. Step 1 (Units): U(last digit × n).',
      '3. Step k: U(current × n) + T(neighbor × n) + carry.',
      '4. Final step under prefix zero: U(0 × n) [=0] + T(first digit × n) + carry.'
    ],
    workedExamples: [
      {
        problem: '3,112 × 6',
        stepsSummary: '03112 × 6: U(2×6)=2 -> U(1×6)+T(2×6)=6+1=7 -> U(1×6)+T(1×6)=6+0=6 -> U(3×6)+T(1×6)=8+0=8 -> T(3×6)=1 → 18,672',
        result: '18672',
        details: { problemString: '3112 × 6', answerString: '18672', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '758 × 7',
        stepsSummary: '0758 × 7: U(56)=6 -> U(35)+T(56)=5+5=10 (0, c1) -> U(49)+T(35)+1=9+3+1=13 (3, c1) -> T(49)+1=4+1=5 → 5,306',
        result: '5306',
        details: { problemString: '758 × 7', answerString: '5306', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Zeroes in the multiplicand annihilate the product: U(0) = 0, T(0) = 0.'],
    commonMistakes: ['Forgetting to use each multiplicand digit twice: once as U and once as T.'],
    knowledgeCheckQuestions: [
      {
        question: 'In two-finger multiplication, how many times is each multiplicand digit used?',
        options: ['Once', 'Twice: once under U and once under T', 'Three times', 'Only if odd'],
        correctIndex: 1,
        explanation: 'Each digit is used twice: once as the left figure under U, and in the next step as the right figure under T.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-303': {
    id: 'tech-303',
    chapterId: 3,
    section: '3.3',
    pageRef: 'pp. 93–98',
    name: 'Speed Multiplication by Two-Digit Numbers',
    shortName: 'Two-Finger 2-Digit',
    difficulty: 'advanced',
    learningObjectives: [
      'Multiply long numbers by two-digit multipliers using dual UT pairs',
      'Combine outer UT pair and inner UT pair for each answer figure'
    ],
    prerequisites: ['tech-302'],
    summary: 'Prefix two zeroes. Each answer digit is Outer Pair-Product + Inner Pair-Product + carry.',
    mathematicalPrinciple: 'Bi-linear operator decomposition over decimal polynomial.',
    rulesAndProcedure: [
      '1. Prefix two zeroes: 00N × AB.',
      '2. Outer UT: right multiplier digit B acts on multiplicand pair at current column.',
      '3. Inner UT: left multiplier digit A acts on multiplicand pair shifted one place right.',
      '4. Sum both pair-products plus carry.'
    ],
    workedExamples: [
      {
        problem: '73 × 54',
        stepsSummary: '0073 × 54: Step 1 = 2; Step 2 = 14 (4, c1); Step 3 = 8+1 = 9; Step 4 = 3 → 3,942',
        result: '3942',
        details: { problemString: '73 × 54', answerString: '3942', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '5,273 × 54',
        stepsSummary: 'Result: 284,742',
        result: '284742',
        details: { problemString: '5273 × 54', answerString: '284742', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Carries rarely exceed 1 or 2.'],
    commonMistakes: ['Shifting the inner pair in the wrong direction.'],
    knowledgeCheckQuestions: [
      {
        question: 'When multiplying by 54, which digit powers the outer UT pair?',
        options: ['5', '4', 'Both', 'The current multiplicand digit'],
        correctIndex: 1,
        explanation: 'The right-hand multiplier digit (4) forms the outer UT pair.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-304': {
    id: 'tech-304',
    chapterId: 3,
    section: '3.4',
    pageRef: 'pp. 99–104',
    name: 'Speed Multiplication by Three-Digit and Longer Multipliers',
    shortName: 'Two-Finger Multi-Digit',
    difficulty: 'expert',
    learningObjectives: [
      'Execute full Two-Finger multiplication with 3-digit and longer multipliers',
      'Manage three or more UT pair-products per digit'
    ],
    prerequisites: ['tech-303'],
    summary: 'Each answer figure is the sum of three (or more) UT pair-products.',
    mathematicalPrinciple: 'Complete matrix product in UT decomposed representation.',
    rulesAndProcedure: [
      '1. Prefix as many zeroes as digits in multiplier: 000N × ABC.',
      '2. For each column, sum pair-products from C, B, A acting on successive shifted pairs of N.',
      '3. Add carry, write units digit, carry tens.'
    ],
    workedExamples: [
      {
        problem: '273 × 154',
        stepsSummary: '6 steps yielding 42,042.',
        result: '42042',
        details: { problemString: '273 × 154', answerString: '42042', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Zero digits in multiplier skip that UT pair.'],
    commonMistakes: ['Omitting one of the intermediate UT pairs.'],
    knowledgeCheckQuestions: [
      {
        question: 'For a 3-digit multiplier, each answer digit is the sum of how many parts?',
        options: ['1', '2', '3 parts (each a pair-product)', '9 parts'],
        correctIndex: 2,
        explanation: 'Each figure of the answer is the sum of three parts, one from each multiplier digit.'
      }
    ],
    masteryThresholdScore: 100
  },

  // CHAPTER 4
  'tech-401': {
    id: 'tech-401',
    chapterId: 4,
    section: '4.1–4.2',
    pageRef: 'pp. 107–111',
    name: 'Trachtenberg Rapid Addition ("Never Count Higher Than 11")',
    shortName: 'Addition (Rule of 11)',
    difficulty: 'beginner',
    learningObjectives: [
      'Add columns of numbers without mental fatigue by dropping 11',
      'Record ticks and running totals accurately',
      'Apply the shortcut: subtract 11 by dropping the 1 and reducing the other digit by 1 (e.g. 16 -> 5)'
    ],
    prerequisites: ['Single-digit addition'],
    summary: 'Never count higher than 11. When the running total exceeds 11, subtract 11, make a tick mark, and continue.',
    mathematicalPrinciple: 'Modular reduction modulo 11: running sum = 11 × ticks + running total.',
    rulesAndProcedure: [
      '1. Add down any column of digits.',
      '2. Whenever the running total is ≥ 11, subtract 11, make a tick mark, and keep the remainder.',
      '3. Shortcut: to subtract 11 from 10..19, drop the leading 1 and decrease the other digit by 1 (17 becomes 6).',
      '4. Write the final remainder as the Running Total, and the number of ticks as the Tick Figure.'
    ],
    workedExamples: [
      {
        problem: 'Column: 3, 9, 1, 6, 9, 5, 9, 7, 8',
        stepsSummary: '3+9=12 (tick, 1) -> 1+1=2 -> 2+6=8 -> 8+9=17 (tick, 6) -> 6+5=11 (tick, 0) -> 0+9=9 -> 9+7=16 (tick, 5) -> 5+8=13 (tick, 2). Running total = 2, Ticks = 5.',
        result: 'RT=2, T=5',
        details: { problemString: '3,9,1,6,9,5,9,7,8', answerString: 'RT=2, T=5', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['If sum is exactly 11, make a tick and continue with 0.'],
    commonMistakes: ['Forgetting to make a tick when dropping 11.'],
    knowledgeCheckQuestions: [
      {
        question: 'When running down a column your total reaches 16. Using the Trachtenberg shortcut, what do you do?',
        options: ['Subtract 10', 'Make a tick and continue with 5 (drop 1, decrease 6 to 5)', 'Stop the column', 'Carry 1'],
        correctIndex: 1,
        explanation: 'Subtracting 11 from 16 leaves 5. Dropping the 1 and decreasing 6 by 1 instantly gives 5.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-402': {
    id: 'tech-402',
    chapterId: 4,
    section: '4.2',
    pageRef: 'pp. 110–115',
    name: 'L-Shaped Addition for Final Totals',
    shortName: 'L-Shaped Addition',
    difficulty: 'intermediate',
    learningObjectives: [
      'Derive final column totals from the working table using L-shaped addition',
      'Formula: Running total + Tick figure + Lower-right neighbor tick + Carry'
    ],
    prerequisites: ['tech-401'],
    summary: 'Add the running total and tick figure of the column plus the tick figure of the column to the lower right.',
    mathematicalPrinciple: 'Base-10 representation: 11 × T_c + R_c = 10 T_c + (T_c + R_c). The 10 T_c shifts into the next column to the left as T_c.',
    rulesAndProcedure: [
      '1. Set up the working table: Row 1 = Running Totals; Row 2 = Ticks.',
      '2. Moving from right to left, for each column add: Running Total + Tick Figure + Lower-Right Tick Figure + Carry.',
      '3. Under prefix zeroes at the left: add 0 + 0 + Leftmost Tick Figure + Carry.'
    ],
    workedExamples: [
      {
        problem: 'Running totals: [2, 3, 10, 1], Ticks: [5, 6, 5, 7]',
        stepsSummary: 'Right: 1+7 = 8 -> 10+5+7 = 22 (2, c2) -> 3+6+5+2 = 16 (6, c1) -> 2+5+6+1 = 14 (4, c1) -> 0+0+5+1 = 6 → 64,628',
        result: '64628',
        details: { problemString: 'Working table', answerString: '64628', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Rightmost column has no lower-right neighbor (add 0).'],
    commonMistakes: ['Forgetting the lower-right tick figure.'],
    knowledgeCheckQuestions: [
      {
        question: 'In L-shaped addition, what is added from the column to the right?',
        options: ['The running total', 'The lower-right tick figure', 'The carry only', 'Nothing'],
        correctIndex: 1,
        explanation: 'The lower-right tick figure is added to the current column’s running total and tick figure.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-403': {
    id: 'tech-403',
    chapterId: 4,
    section: '4.3',
    pageRef: 'pp. 115–123',
    name: 'Double-Checking Addition and Error Localization',
    shortName: 'Addition Double-Check',
    difficulty: 'intermediate',
    learningObjectives: [
      'Locate addition errors in the exact column where they occurred without re-adding',
      'Compare column 9-remainders with working-table check figures: R_c + 2 T_c (mod 9)'
    ],
    prerequisites: ['tech-402', 'tech-206'],
    summary: 'Check each column independently: Column 9-remainder must equal reduced (Running Total + 2 × Ticks).',
    mathematicalPrinciple: 'Column sum ≡ R_c + 11 T_c ≡ R_c + 2 T_c (mod 9), since 11 ≡ 2 (mod 9).',
    rulesAndProcedure: [
      '1. Find the 9-remainder of each column of original numbers by casting out 9s.',
      '2. For each column of the working table, compute: Running Total + 2 × (Tick Figure), and reduce modulo 9.',
      '3. Compare column by column: any discrepancy pinpoints the exact column with an error!',
      '4. Check the final total: digit-sum of total must equal digit-sum of working table check figures.'
    ],
    workedExamples: [
      {
        problem: 'Example from p. 120',
        stepsSummary: 'Column 9-remainders: [3, 6, 2, 6]. Working-table check figures: [3, 6, 2, 6]. Total digit-sum: 8 = 8. All match.',
        result: '3, 6, 2, 6 match',
        details: { problemString: 'Addition check', answerString: 'Verified', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['9 is treated as 0 in remainders.'],
    commonMistakes: ['Adding ticks once instead of twice in the working-table check.'],
    knowledgeCheckQuestions: [
      {
        question: 'Why do we add the tick figure twice when checking the working table?',
        options: [
          'Because 11 modulo 9 is 2',
          'Because there are two rows',
          'To account for the carry',
          'It is an arbitrary convention'
        ],
        correctIndex: 0,
        explanation: 'Since each tick represents 11 dropped, and 11 ≡ 2 (mod 9), each tick contributes 2 modulo 9.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-404': {
    id: 'tech-404',
    chapterId: 4,
    section: '4.4',
    pageRef: 'pp. 126–133',
    name: 'The Elevens-Remainder Checking Method',
    shortName: 'Elevens-Remainder Check',
    difficulty: 'intermediate',
    learningObjectives: [
      'Compute remainders modulo 11 for two-digit numbers (Units - Tens + 11 if negative)',
      'Compute 11-remainders for long numbers using alternating sums',
      'Use the pairwise adjacent shortcut for rapid mental checking'
    ],
    prerequisites: ['tech-206'],
    summary: 'An independent check method modulo 11. Alternating digit sums or adjacent pair differences yield the 11-remainder.',
    mathematicalPrinciple: '10 ≡ -1 (mod 11). Hence N = ∑ a_k 10^k ≡ ∑ a_k (-1)^k = (a_0 + a_2 + ...) - (a_1 + a_3 + ...) (mod 11).',
    rulesAndProcedure: [
      '1. Two digits: Units minus Tens. If negative, add 11 (e.g. 86 -> 6 - 8 + 11 = 9).',
      '2. Long numbers: Sum digits in even positions from right; sum digits in odd positions from right; subtract odd sum from even sum.',
      '3. Pairwise shortcut: Group digits into pairs from left, compute 11-remainder of each pair, and sum modulo 11.',
      '4. Apply operation to 11-remainders of factors and compare with 11-remainder of result.'
    ],
    workedExamples: [
      {
        problem: '943,021,758 mod 11',
        stepsSummary: '(8+7+2+3+9) - (5+1+0+4) = 29 - 10 = 19 -> 9 - 1 = 8',
        result: '8',
        details: { problemString: '943021758 mod 11', answerString: '8', steps: [], verification: { method: 'elevens-remainder', details: '8=8', checked: true } }
      },
      {
        problem: 'Check 302 × 114 = 34,428',
        stepsSummary: '302 mod 11 = 5; 114 mod 11 = 4. 5 × 4 = 20 ≡ 9. 34428 mod 11 = 9. 9 = 9. Checked.',
        result: '9 = 9',
        details: { problemString: '302 × 114 = 34428', answerString: '9=9', steps: [], verification: { method: 'elevens-remainder', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Negative alternating difference: add 11 (or multiples of 11).'],
    commonMistakes: ['Starting alternating signs from the left instead of the right.'],
    knowledgeCheckQuestions: [
      {
        question: 'What is the eleven-remainder of 48?',
        options: ['8', '4', '12', '5'],
        correctIndex: 1,
        explanation: 'Units (8) minus Tens (4) = 4.'
      }
    ],
    masteryThresholdScore: 100
  },

  // CHAPTER 5
  'tech-501': {
    id: 'tech-501',
    chapterId: 5,
    section: '5.1',
    pageRef: 'pp. 135–142',
    name: 'Simple Method of Division',
    shortName: 'Simple Division',
    difficulty: 'beginner',
    learningObjectives: [
      'Perform division using repeated addition of the divisor (multiples 1x to 10x)',
      'Verify the divisor table with running digit-sums',
      'Execute repeated subtraction without guesswork or estimation'
    ],
    prerequisites: ['Single-digit addition', 'tech-206'],
    summary: 'Generate 1x to 10x multiples by repeated addition with running digit-sum checks; then subtract repeatedly from dividend.',
    mathematicalPrinciple: 'Eliminates trial division estimation by precomputing a verified lookup table of multiples.',
    rulesAndProcedure: [
      '1. Form a column by repeatedly adding the divisor 10 times.',
      '2. Form a parallel check column adding the digit-sum of the divisor. The 10th multiple must equal the divisor with a trailing 0.',
      '3. From left of dividend, find the largest multiple in the table that is ≤ current segment.',
      '4. Write its index as the quotient digit, subtract the multiple, and bring down the next dividend digit.',
      '5. Repeat until all dividend digits are exhausted. The final remainder is the last difference.'
    ],
    workedExamples: [
      {
        problem: '27,483,624 ÷ 62',
        stepsSummary: 'Divisor table for 62 checked up to 620. Subtractions give quotient 443,284 with remainder 16.',
        result: '443284 R 16',
        details: { problemString: '27483624 ÷ 62', answerString: '443284 R 16', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Tenth multiple must exactly match divisor with 0 appended.'],
    commonMistakes: ['Selecting a multiple that is larger than the current segment.'],
    knowledgeCheckQuestions: [
      {
        question: 'How is the tenth multiple in the simple division table verified?',
        options: [
          'It must equal 10',
          'It must be the original divisor with a 0 at the end',
          'It must be divisible by 9',
          'It is skipped'
        ],
        correctIndex: 1,
        explanation: 'Multiplying by 10 appends a zero, confirming that repeated addition was correct.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-502': {
    id: 'tech-502',
    chapterId: 5,
    section: '5.1 & 5.6',
    pageRef: 'pp. 141–144, 176–181',
    name: 'Checking Division (Inverse Digit-Sum Check)',
    shortName: 'Division Check',
    difficulty: 'beginner',
    learningObjectives: [
      'Verify division with or without remainder using digit-sums',
      'Formula: Digit-sum(Dividend - Remainder) = Digit-sum(Divisor) × Digit-sum(Quotient)'
    ],
    prerequisites: ['tech-206'],
    summary: 'Check division via inverse multiplication: (Dividend - Remainder) ≡ Divisor × Quotient (mod 9).',
    mathematicalPrinciple: 'D = d × Q + R ⟹ D - R = d × Q.',
    rulesAndProcedure: [
      '1. Subtract remainder from dividend (or subtract digit-sum of remainder from digit-sum of dividend).',
      '2. Find digit-sum of this reduced dividend.',
      '3. Multiply digit-sum of divisor by digit-sum of quotient, and reduce.',
      '4. Both sides must be equal.'
    ],
    workedExamples: [
      {
        problem: 'Check 27,483,624 ÷ 62 = 443,284 R 16',
        stepsSummary: '27483624 - 16 = 27483608 (DS = 2). Divisor 62 (DS = 8) × Quotient 443284 (DS = 7) = 56 (DS = 2). 2 = 2. Checked.',
        result: '2 = 2',
        details: { problemString: 'Division check', answerString: '2=2', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['If remainder is 0, simply check DS(Dividend) = DS(Divisor) × DS(Quotient).'],
    commonMistakes: ['Forgetting to subtract the remainder before taking digit sums.'],
    knowledgeCheckQuestions: [
      {
        question: 'When checking division with remainder, what must be done to the dividend?',
        options: ['Add the remainder', 'Subtract the remainder', 'Multiply by remainder', 'Ignore remainder'],
        correctIndex: 1,
        explanation: 'Subtracting the remainder gives the exact multiple: Dividend - Remainder = Divisor × Quotient.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-503': {
    id: 'tech-503',
    chapterId: 5,
    section: '5.2–5.3',
    pageRef: 'pp. 142–157',
    name: 'Fast Division: Two-Digit Divisors',
    shortName: 'Fast Division 2-Digit',
    difficulty: 'advanced',
    learningObjectives: [
      'Divide by two-digit divisors in a single line using NT and U products',
      'Understand the zigzag workflow: partial dividend → quotient digit → working figure → next partial dividend'
    ],
    prerequisites: ['tech-301'],
    summary: 'Use NT products for upward subtraction and U products for downward subtraction in a compact rhythm.',
    mathematicalPrinciple: 'Recurrent digit-by-digit quotient estimation and remainder tracking.',
    rulesAndProcedure: [
      '1. Partial dividend (PD) divided by first digit of divisor gives tentative quotient digit q.',
      '2. Subtract NT(divisor × q) from PD to get tens of working figure.',
      '3. Bring down next dividend digit to form units of working figure.',
      '4. Subtract U(divisor units × q) from working figure to obtain next PD.',
      '5. Last working figure is the remainder.'
    ],
    workedExamples: [
      {
        problem: '8,384 ÷ 32',
        stepsSummary: 'PD 8 ÷ 3 = 2 -> NT=06 -> WF 23 - U(04) = PD 19 -> 19 ÷ 3 = 6 -> NT=19 -> WF 08 - U(12) = PD 6 -> 6 ÷ 3 = 2 -> NT=06 -> WF 04 - U(04) = 0. Answer = 262 R 0.',
        result: '262',
        details: { problemString: '8384 ÷ 32', answerString: '262', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Division coming out even leaves 0 as the final remainder.'],
    commonMistakes: ['Confusing NT product with UT product.'],
    knowledgeCheckQuestions: [
      {
        question: 'What does the NT product in Trachtenberg fast division stand for?',
        options: ['Number-Tens product', 'Next-Term product', 'Nine-Ten product', 'Negative-Total product'],
        correctIndex: 0,
        explanation: 'NT stands for Number-Tens: use the entire number for the first digit product, and tens digit for the second.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-504': {
    id: 'tech-504',
    chapterId: 5,
    section: '5.3',
    pageRef: 'pp. 154–160',
    name: 'Fast Division: Estimation & Corrections',
    shortName: 'Fast Division Corrections',
    difficulty: 'advanced',
    learningObjectives: [
      'Apply the Trouble-Saving Device: increase first divisor digit by 1 when second digit is 8 or 9',
      'Detect over-estimates (NT product exceeds PD) and reduce quotient digit by 1',
      'Detect under-estimates (next partial dividend ≥ divisor) and increase quotient digit by 1'
    ],
    prerequisites: ['tech-503'],
    summary: 'Trouble-saving device for rounding divisors, plus systematic correction rules for over/under-estimates.',
    mathematicalPrinciple: 'Nearest-integer divisor estimation minimizing error bounds.',
    rulesAndProcedure: [
      '1. Trouble-saving device: If second divisor digit is 8 or 9 (e.g. 39, 48), divide PD by (first digit + 1).',
      '2. If NT product > PD, quotient digit is too large: reduce by 1.',
      '3. If next PD ≥ divisor, quotient digit is too small: increase by 1.'
    ],
    workedExamples: [
      {
        problem: '2,028 ÷ 39',
        stepsSummary: 'Divisor 39: divide PD 20 by 4 (not 3) → immediately gives correct digit 5. Final answer: 52.',
        result: '52',
        details: { problemString: '2028 ÷ 39', answerString: '52', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Extending the trouble-saving device to second digits 6 and 7.'],
    commonMistakes: ['Failing to notice when next partial dividend is larger than the divisor.'],
    knowledgeCheckQuestions: [
      {
        question: 'If dividing by 79, what trial divisor should be used under the Trouble-Saving Device?',
        options: ['7', '8', '9', '10'],
        correctIndex: 1,
        explanation: 'Because the second digit is 9 (close to 80), increase first digit 7 by 1 to divide by 8.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-505': {
    id: 'tech-505',
    chapterId: 5,
    section: '5.4',
    pageRef: 'pp. 158–166',
    name: 'Fast Division: Three-Digit Divisors',
    shortName: 'Fast Division 3-Digit',
    difficulty: 'expert',
    learningObjectives: [
      'Divide by 3-digit divisors with boundary slash and remainder region',
      'Perform downward subtraction using UT product + U product'
    ],
    prerequisites: ['tech-504'],
    summary: 'Mark off 2 places from right with a slash. Quotient region uses NT and UT+U subtractions; remainder region carries up directly.',
    mathematicalPrinciple: 'Multi-term remainder recurrence.',
    rulesAndProcedure: [
      '1. Mark off 2 places from right of dividend with a slash (boundary line).',
      '2. In quotient region: upward NT subtraction using first 2 divisor digits; downward UT + U subtraction.',
      '3. In remainder region: no NT subtractions (partial dividend carries up directly); downward subtraction uses shifted UT; final step subtracts only units product.'
    ],
    workedExamples: [
      {
        problem: '236,831 ÷ 674',
        stepsSummary: 'Slash: 2368 / 31. Quotient = 351, Remainder = 257.',
        result: '351 R 257',
        details: { problemString: '236831 ÷ 674', answerString: '351 R 257', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Remainder must be strictly less than divisor.'],
    commonMistakes: ['Performing an NT subtraction after crossing the boundary slash.'],
    knowledgeCheckQuestions: [
      {
        question: 'For a three-digit divisor, how many digits are marked off from the right of the dividend for the remainder region?',
        options: ['1', '2', '3', 'None'],
        correctIndex: 1,
        explanation: 'Always one less than the number of digits in the divisor: 3 - 1 = 2 digits.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-506': {
    id: 'tech-506',
    chapterId: 5,
    section: '5.5',
    pageRef: 'pp. 167–176',
    name: 'Fast Division: Divisors of Any Length',
    shortName: 'Fast Division Arbitrary Length',
    difficulty: 'expert',
    learningObjectives: [
      'Scale fast division to 4-digit, 5-digit, and longer divisors',
      'Apply nested UT pairs moving inward from both ends'
    ],
    prerequisites: ['tech-505'],
    summary: 'Nested UT pairs handle divisors of 4 or more digits with full remainder precision.',
    mathematicalPrinciple: 'Generalized multi-digit deconvolution.',
    rulesAndProcedure: [
      '1. Mark off (divisor length - 1) digits from right for remainder region.',
      '2. Upward NT subtraction using first 2 digits of divisor.',
      '3. Downward subtraction sums nested UT pairs across all divisor digits.',
      '4. Once across boundary, eliminate leftmost quotient digit on each step.'
    ],
    workedExamples: [
      {
        problem: '13,671,514 ÷ 4,217',
        stepsSummary: 'Mark off 3 places: 13671 / 514. Answer = 3,242 with no remainder.',
        result: '3242',
        details: { problemString: '13671514 ÷ 4217', answerString: '3242', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Divisions coming out with large remainders.'],
    commonMistakes: ['Misaligning the nested UT pairs.'],
    knowledgeCheckQuestions: [
      {
        question: 'For a 4-digit divisor, how many places are marked off with the slash?',
        options: ['2', '3', '4', '1'],
        correctIndex: 1,
        explanation: 'Divisor has 4 digits, so mark off 4 - 1 = 3 places.'
      }
    ],
    masteryThresholdScore: 100
  },

  // CHAPTER 6
  'tech-601': {
    id: 'tech-601',
    chapterId: 6,
    section: '6.1',
    pageRef: 'pp. 188–190',
    name: 'Squaring Special Numbers (Ending in 5 and 50s)',
    shortName: 'Special Squaring',
    difficulty: 'beginner',
    learningObjectives: [
      'Instantly square numbers ending in 5: multiply tens by next integer, suffix 25',
      'Instantly square numbers in the 50s: add units to 25, suffix units squared'
    ],
    prerequisites: ['Single-digit multiplication'],
    summary: 'Special Type 1: a5² = a(a+1) | 25. Special Type 2: 5a² = (25 + a) | a².',
    mathematicalPrinciple: '(10a+5)² = 100a(a+1) + 25. (50+a)² = 2500 + 100a + a² = 100(25+a) + a².',
    rulesAndProcedure: [
      'Type 1 (ends in 5): Multiply first digit by (first digit + 1). Put 25 after it.',
      'Type 2 (tens digit 5): Add last digit to 25. Square last digit (as 2 digits) and put it after.'
    ],
    workedExamples: [
      {
        problem: '35²',
        stepsSummary: '3 × 4 = 12. Suffix 25 → 1,225',
        result: '1225',
        details: { problemString: '35²', answerString: '1225', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '56²',
        stepsSummary: '25 + 6 = 31. Suffix 6² = 36 → 3,136',
        result: '3136',
        details: { problemString: '56²', answerString: '3136', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '51²',
        stepsSummary: '25 + 1 = 26. Suffix 1² = 01 → 2,601',
        result: '2601',
        details: { problemString: '51²', answerString: '2601', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['In Type 2, small units like 1, 2, 3 must be squared as two digits: 01, 04, 09.'],
    commonMistakes: ['Writing 1 instead of 01 for 51².'],
    knowledgeCheckQuestions: [
      {
        question: 'What is 75 squared using Special Type 1?',
        options: ['5,625', '4,925', '5,425', '5,605'],
        correctIndex: 0,
        explanation: '7 × 8 = 56. Suffix 25 → 5,625.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-602': {
    id: 'tech-602',
    chapterId: 6,
    section: '6.2',
    pageRef: 'pp. 190–195',
    name: 'Squaring Any Two-Digit Number',
    shortName: 'Two-Digit Squaring',
    difficulty: 'intermediate',
    learningObjectives: [
      'Square any 2-digit number mentally by collapsing: a² | 2ab | b²',
      'Compute the double cross-product 2ab effortlessly'
    ],
    prerequisites: ['tech-601'],
    summary: 'Visualize three 2-digit numbers: (tens)², 2×(tens×units), (units)², and collapse from right to left.',
    mathematicalPrinciple: '(10a + b)² = 100 a² + 20 ab + b².',
    rulesAndProcedure: [
      '1. Step 1: Units digit squared (b²).',
      '2. Step 2: Multiply digits and double (2ab).',
      '3. Step 3: Tens digit squared (a²).',
      '4. Collapse the three 2-digit figures by adding overlaps.'
    ],
    workedExamples: [
      {
        problem: '32²',
        stepsSummary: '09 | 12 | 04 → 1,024',
        result: '1024',
        details: { problemString: '32²', answerString: '1024', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '84²',
        stepsSummary: '64 | 64 | 16 → 7,056',
        result: '7056',
        details: { problemString: '84²', answerString: '7056', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Always represent single digits with a leading zero before collapsing (e.g. 04, 09).'],
    commonMistakes: ['Forgetting to double the cross-product.'],
    knowledgeCheckQuestions: [
      {
        question: 'What is the middle term when squaring 43?',
        options: ['12', '24 (2 × 4 × 3)', '14', '49'],
        correctIndex: 1,
        explanation: 'Cross-product is 4 × 3 = 12, doubled is 24.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-603': {
    id: 'tech-603',
    chapterId: 6,
    section: '6.3',
    pageRef: 'pp. 193–198',
    name: 'Squaring Three-Digit Numbers',
    shortName: 'Three-Digit Squaring',
    difficulty: 'advanced',
    learningObjectives: [
      'Square any 3-digit number abc',
      'Step 1: End square bc²; Step 2: Open cross-product 2(ac); Step 3: Beginning square ab²'
    ],
    prerequisites: ['tech-602'],
    summary: 'End square bc² + open cross-product 2(ac) + beginning square ab² (omitting b²).',
    mathematicalPrinciple: '(100a + 10b + c)² = 10000a² + 2000ab + 100(2ac + b²) + 20bc + c².',
    rulesAndProcedure: [
      '1. Step 1: Square the last two digits bc² (giving the right-hand 4 digits).',
      '2. Step 2: Form open cross-product 2 × (a × c) and add directly to the middle.',
      '3. Step 3: Square the first two digits ab² omitting b² (which was already in step 1).'
    ],
    workedExamples: [
      {
        problem: '462²',
        stepsSummary: '62² = 3844. Open cross 2(4×2)=16 -> 5444. 46² (omit 36) -> 213,444',
        result: '213444',
        details: { problemString: '462²', answerString: '213444', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['If end two digits end in 5, use Special Type 1 for the end square.'],
    commonMistakes: ['Squaring the middle digit b twice.'],
    knowledgeCheckQuestions: [
      {
        question: 'In squaring 462, what is the open cross-product?',
        options: ['2 × 4 × 6 = 48', '2 × 4 × 2 = 16', '2 × 6 × 2 = 24', '4 × 2 = 8'],
        correctIndex: 1,
        explanation: 'The open cross-product pairs the first and last digits: 2 × (4 × 2) = 16.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-604': {
    id: 'tech-604',
    chapterId: 6,
    section: '6.4',
    pageRef: 'pp. 197–205',
    name: 'Square Roots: Three- and Four-Digit Numbers',
    shortName: 'Square Roots 2-Digit Root',
    difficulty: 'advanced',
    learningObjectives: [
      'Group numbers by pairs from right: A / BC',
      'Find first root digit and remainder; halve remainder, append 0, divide by first root digit',
      'Determine exact remainder using collapsed cross-products and test remainder ≤ 2 × root'
    ],
    prerequisites: ['tech-602'],
    summary: 'Extract two-digit square roots with exact remainders and verification.',
    mathematicalPrinciple: 'Inverting (10a + b)² = 100a² + 20ab + b².',
    rulesAndProcedure: [
      '1. Mark off 2 places from right: A / BC.',
      '2. First digit r1 is largest integer whose square ≤ A.',
      '3. Subtract r1² to get remainder.',
      '4. Halve remainder, append 0, divide by r1 to get tentative r2.',
      '5. Calculate remainder via collapsed cross-products; adjust r2 if remainder is invalid.'
    ],
    workedExamples: [
      {
        problem: '√625',
        stepsSummary: '6 / 25: 2²=4, rem 2. Half(2)=1 -> 10 ÷ 2 = 5. Collapsed 25 check gives remainder 0. Root = 25.',
        result: '25',
        details: { problemString: '√625', answerString: '25', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '√645',
        stepsSummary: 'Root = 25 with remainder 20.',
        result: '25 R 20',
        details: { problemString: '√645', answerString: '25 R 20', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Remainder must be ≤ 2 × root. If greater, increase root by 1.'],
    commonMistakes: ['Forgetting that the tentative second digit must be verified against remainder bounds.'],
    knowledgeCheckQuestions: [
      {
        question: 'What is the maximum allowable remainder in square root extraction for root R?',
        options: ['R - 1', 'R', '2 × R', 'R²'],
        correctIndex: 2,
        explanation: 'Because (R+1)² - R² = 2R + 1, any remainder > 2R means the root was too small.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-605': {
    id: 'tech-605',
    chapterId: 6,
    section: '6.5',
    pageRef: 'pp. 206–213',
    name: 'Square Roots: Five- and Six-Digit Numbers',
    shortName: 'Square Roots 3-Digit Root',
    difficulty: 'advanced',
    learningObjectives: [
      'Find 3-digit square roots',
      'Use the "split the difference" rule when halving odd working figures (e.g. 5 -> 25)',
      'Incorporate open cross-products into the remainder check'
    ],
    prerequisites: ['tech-604'],
    summary: 'Extract three-digit square roots using split-difference odd halving and cross-product remainder tables.',
    mathematicalPrinciple: 'Higher-order remainder recurrence for square root extraction.',
    rulesAndProcedure: [
      '1. Mark off in pairs from right: A / BC / DE.',
      '2. Find first two root digits as in tech-604.',
      '3. For odd working figures, split the difference: half of 5 + zero is 25.',
      '4. Divide by first root digit to find third root digit.',
      '5. Remainder check: subtract doubled open cross-product and end square.'
    ],
    workedExamples: [
      {
        problem: '√207,936',
        stepsSummary: 'Root = 456, remainder 0.',
        result: '456',
        details: { problemString: '√207936', answerString: '456', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '√893,304',
        stepsSummary: 'Root = 945, remainder 279.',
        result: '945 R 279',
        details: { problemString: '√893304', answerString: '945 R 279', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Splitting the difference on odd numbers gives the exact middle integer.'],
    commonMistakes: ['Forgetting to double the open cross-product in the remainder table.'],
    knowledgeCheckQuestions: [
      {
        question: 'When halving an odd remainder of 7 and appending 0, what number is used under "split the difference"?',
        options: ['30', '40', '35', '70'],
        correctIndex: 2,
        explanation: 'Half of 7 is 3.5; multiplying by 10 gives 35.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-606': {
    id: 'tech-606',
    chapterId: 6,
    section: '6.6–6.7',
    pageRef: 'pp. 214–225',
    name: 'Square Roots: Seven- and Eight-Digit Numbers and Longer',
    shortName: 'Square Roots Long Numbers',
    difficulty: 'expert',
    learningObjectives: [
      'Extract 4-digit and 5-digit square roots',
      'Extend the slanting cross-products table and column subtraction'
    ],
    prerequisites: ['tech-605'],
    summary: 'Extract four- and five-digit square roots by extending the slanting cross-products table.',
    mathematicalPrinciple: 'Complete square root expansion for arbitrary precision.',
    rulesAndProcedure: [
      '1. Find first 3 root digits using tech-605.',
      '2. Use next column of cross-product table to find 4th root digit.',
      '3. Form slanting cross-product rows of all pairs doubled + square of last digit.',
      '4. Subtract column totals from unused dividend digits to find remainder.'
    ],
    workedExamples: [
      {
        problem: '√10,323,369',
        stepsSummary: 'Root = 3,213 with remainder 0.',
        result: '3213',
        details: { problemString: '√10323369', answerString: '3213', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      },
      {
        problem: '√8,724,321',
        stepsSummary: 'Root = 2,953 with remainder 4,112.',
        result: '2953 R 4112',
        details: { problemString: '√8724321', answerString: '2953 R 4112', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Trial divisor rounding: if first two root digits are 29, divide by 3 instead of 2.'],
    commonMistakes: ['Misaligning the slanting cross-product table.'],
    knowledgeCheckQuestions: [
      {
        question: 'How many digits will be in the square root of an 8-digit number?',
        options: ['3', '4', '5', '8'],
        correctIndex: 1,
        explanation: 'An 8-digit number groups into 4 pairs, so its square root has 4 digits.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-607': {
    id: 'tech-607',
    chapterId: 6,
    section: '6.8',
    pageRef: 'pp. 225–228',
    name: 'Checking Squares and Square Roots',
    shortName: 'Squares & Roots Check',
    difficulty: 'intermediate',
    learningObjectives: [
      'Check squares using (DS(N))² ≡ DS(N²) (mod 9)',
      'Check square roots with remainder: DS(N - Remainder) ≡ (DS(Root))² (mod 9)'
    ],
    prerequisites: ['tech-206', 'tech-604'],
    summary: 'Fast check for squaring and square roots using digit-sums modulo 9.',
    mathematicalPrinciple: 'N = Root² + Remainder ⟹ N - Remainder = Root².',
    rulesAndProcedure: [
      'Squaring check: Square digit-sum of original number, reduce modulo 9. Compare with digit-sum of square.',
      'Square root check: Subtract remainder from original number; compare its digit-sum with the squared digit-sum of the root.'
    ],
    workedExamples: [
      {
        problem: 'Check √207,936 = 456',
        stepsSummary: 'DS(456) = 6. 6² = 36 ≡ 0. DS(207936) = 0. 0 = 0. Checked.',
        result: '0 = 0',
        details: { problemString: 'Root check', answerString: '0=0', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Subtract remainder before computing digit-sum.'],
    commonMistakes: ['Taking square root of digit sum instead of squaring root digit sum.'],
    knowledgeCheckQuestions: [
      {
        question: 'Why do we square the root digit-sum rather than take the square root of the number digit-sum?',
        options: [
          'Because taking square root of a digit sum is ambiguous (multiple remainders)',
          'Because squaring is faster and uniquely defined',
          'Both of the above',
          'None of the above'
        ],
        correctIndex: 2,
        explanation: 'Squaring is a single-valued function in modular arithmetic, avoiding ambiguity.'
      }
    ],
    masteryThresholdScore: 100
  },

  // CHAPTER 7
  'tech-701': {
    id: 'tech-701',
    chapterId: 7,
    section: '7.1',
    pageRef: 'pp. 230–235',
    name: 'Numbers in General: Decimal Polynomial Expansion',
    shortName: 'Decimal Expansion',
    difficulty: 'beginner',
    learningObjectives: [
      'Represent numbers in algebraic form: N = ∑ a_n 10^n',
      'Understand how position notation enables algebraic analysis of shortcuts'
    ],
    prerequisites: ['Single-digit addition'],
    summary: 'Spreading numbers out into decimal powers: 357 = 3×100 + 5×10 + 7.',
    mathematicalPrinciple: 'Positional numeral system in base 10.',
    rulesAndProcedure: [
      '1. Express 3-digit number as 100a + 10b + c.',
      '2. Express general k-digit number as ∑ a_n 10^n.',
      '3. Use algebraic manipulation on coefficients to analyze arithmetic rules.'
    ],
    workedExamples: [
      {
        problem: 'Expand 357 and 704',
        stepsSummary: '357 = 3×100 + 5×10 + 7; 704 = 7×100 + 0×10 + 4',
        result: 'Expanded',
        details: { problemString: '357', answerString: '3×100 + 5×10 + 7', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Prefixing 0×10^k changes nothing but provides a slot for carries.'],
    commonMistakes: ['Confusing digit values with their positional decimal weights.'],
    knowledgeCheckQuestions: [
      {
        question: 'In decimal polynomial notation, how is the number 4028 written?',
        options: [
          '4000 + 20 + 8',
          '4 × 10³ + 0 × 10² + 2 × 10¹ + 8 × 1',
          'Both of the above',
          '4 + 0 + 2 + 8'
        ],
        correctIndex: 2,
        explanation: 'Both represent the decimal positional expansion of 4028.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-702': {
    id: 'tech-702',
    chapterId: 7,
    section: '7.2',
    pageRef: 'pp. 233–237',
    name: 'Algebraic Proof of the Rule for Eleven',
    shortName: 'Proof of Rule for 11',
    difficulty: 'intermediate',
    learningObjectives: [
      'Follow the algebraic proof of the rule for 11: 11N = 10N + N',
      'See why each digit is added to its right-hand neighbor'
    ],
    prerequisites: ['tech-101', 'tech-701'],
    summary: '11N = (10+1)N = 10N + N. Grouping by powers of 10 gives (a+b)1000 + (b+c)100 + ...',
    mathematicalPrinciple: 'Distributive property of multiplication over addition.',
    rulesAndProcedure: [
      '1. Write 11 as (10 + 1).',
      '2. Multiply general number N by 10 (shifts powers by 1).',
      '3. Multiply general number N by 1.',
      '4. Add like powers: each 10^k coefficient becomes (d_k + d_{k-1}).'
    ],
    workedExamples: [
      {
        problem: 'Proof for 4-digit N = abcd',
        stepsSummary: '11N = 10,000(0+a) + 1,000(a+b) + 100(b+c) + 10(c+d) + d. Exactly "add the neighbor"!',
        result: 'Q.E.D.',
        details: { problemString: '11N', answerString: 'Q.E.D.', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Carry occurs when (a+b) ≥ 10.'],
    commonMistakes: ['Overlooking the commutative property a + b = b + a.'],
    knowledgeCheckQuestions: [
      {
        question: 'In the algebraic proof of 11N, what yields the term (a + b) × 1,000?',
        options: [
          'a × 1,000 from 1×N and b × 1,000 from 10×N',
          'a × 10,000 minus b × 1,000',
          'a × b × 1,000',
          'Arbitrary grouping'
        ],
        correctIndex: 0,
        explanation: 'Multiplying by 10 shifts b to thousands place; multiplying by 1 keeps a in thousands place.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-703': {
    id: 'tech-703',
    chapterId: 7,
    section: '7.3',
    pageRef: 'pp. 237–248',
    name: 'Algebraic Manipulation & Classical Puzzles',
    shortName: 'Algebraic Puzzles',
    difficulty: 'intermediate',
    learningObjectives: [
      'Review brackets, signs, and equation manipulation',
      'Solve the Three Board Pieces puzzle and the ancient Persian Pearl Necklace puzzle'
    ],
    prerequisites: ['Basic algebra'],
    summary: 'Rules for removing parentheses, equations, and solving classic arithmetic puzzles algebraically.',
    mathematicalPrinciple: 'Axioms of equality and linear equations.',
    rulesAndProcedure: [
      '1. Brackets with negative sign: reverse all interior signs.',
      '2. Board Puzzle: x=3, y=x+z/4, z=x+y -> solve linear system.',
      '3. Persian Necklace: x = x/3 + x/4 + 20 -> multiply by 12 -> 5x = 240 -> x = 48.'
    ],
    workedExamples: [
      {
        problem: 'Persian Pearl Necklace Problem',
        stepsSummary: 'x = x/3 + x/4 + 20 => 12x = 4x + 3x + 240 => 5x = 240 => x = 48 pearls.',
        result: '48',
        details: { problemString: 'Persian necklace', answerString: '48', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Fractions cleared by multiplying through by the least common denominator.'],
    commonMistakes: ['Failing to change signs inside brackets when preceded by a minus sign.'],
    knowledgeCheckQuestions: [
      {
        question: 'In the ancient Persian necklace puzzle, how many pearls were on the necklace originally?',
        options: ['36', '48', '60', '24'],
        correctIndex: 1,
        explanation: 'Solving x = x/3 + x/4 + 20 gives x = 48.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-704': {
    id: 'tech-704',
    chapterId: 7,
    section: '7.4',
    pageRef: 'pp. 248–254',
    name: 'Algebraic Proofs for Rules of 6, 7, and 5',
    shortName: 'Proofs of 6, 7, 5',
    difficulty: 'advanced',
    learningObjectives: [
      'Prove rule for 6 using 6 = ½·10 + 1 and odd number representation 2n+1',
      'Prove rule for 7 using 7 = ½·10 + 2',
      'Prove rule for 5 using 5 = ½·10'
    ],
    prerequisites: ['tech-702'],
    summary: 'Decomposing multipliers into ½·10 + k explains why half the neighbor is added and odd numbers add 5.',
    mathematicalPrinciple: 'Base-10 expansion with fractional base factor 10/2 = 5.',
    rulesAndProcedure: [
      '1. 6N = (½·10 + 1)N = ½·10N + N. Rearranging powers pairs each digit with half its neighbor.',
      '2. If digit is odd (2n+1), ½(2n+1)·10 = 10n + 5, generating the "+5 if odd" rule.',
      '3. 7N = (½·10 + 2)N generates double the number + half neighbor + 5 if odd.',
      '4. 5N = ½·10N generates half neighbor + 5 if odd.'
    ],
    workedExamples: [
      {
        problem: 'Proof for 6N',
        stepsSummary: '6N = (0 + ½a)·10,000 + (a + ½b)·1,000 + ... and for b=2n+1 adds 500 = 5 in hundreds place.',
        result: 'Q.E.D.',
        details: { problemString: '6N proof', answerString: 'Q.E.D.', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Zero is even (2·0), so no 5 is generated.'],
    commonMistakes: ['Thinking the oddness check applies to the neighbor rather than the number.'],
    knowledgeCheckQuestions: [
      {
        question: 'Why does an odd digit add 5 when multiplied by 6?',
        options: [
          'Because 6 is close to 5',
          'Because ½ × (2n + 1) × 10 = 10n + 5, which adds 5 in that decimal place',
          'It is a special empirical adjustment',
          'Because 5 is odd'
        ],
        correctIndex: 1,
        explanation: 'The fraction ½ multiplied by 10 contributes exactly 5 to that position.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-705': {
    id: 'tech-705',
    chapterId: 7,
    section: '7.5',
    pageRef: 'pp. 253–257',
    name: 'Algebraic Proofs for Rules of 9 and 8',
    shortName: 'Proofs of 9 and 8',
    difficulty: 'advanced',
    learningObjectives: [
      'Prove rule for 9 using 9 = 10 - 1 and adding/subtracting 9999 = 10000 - 1',
      'Prove rule for 8 using 8 = 10 - 2'
    ],
    prerequisites: ['tech-702'],
    summary: 'Telescoping identity: 9N = 10N - N. Adding and subtracting 9,999 isolates 9 - digit + neighbor.',
    mathematicalPrinciple: 'Radix complement algebra.',
    rulesAndProcedure: [
      '1. 9N = 10N - N.',
      '2. Add and subtract 9,000 + 900 + 90 + 9.',
      '3. Group (9 - digit + neighbor) in each column.',
      '4. The subtracted 9,999 equals -(10,000 - 1), reducing the leftmost digit by 1 and converting 9-d to 10-d at units place.'
    ],
    workedExamples: [
      {
        problem: 'Proof for 9N',
        stepsSummary: '9N = (a-1)·10,000 + (9-a+b)·1,000 + (9-b+c)·100 + (9-c+d)·10 + (10-d). Exactly the Trachtenberg rule!',
        result: 'Q.E.D.',
        details: { problemString: '9N proof', answerString: 'Q.E.D.', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['For 8, add and subtract double: 18,000 + 1,800 + ... reducing leftmost by 2.'],
    commonMistakes: ['Forgetting why the units place is 10 - d while middle places are 9 - d.'],
    knowledgeCheckQuestions: [
      {
        question: 'In the algebraic proof of the rule for 9, why does the units place subtract from 10 instead of 9?',
        options: [
          'Because 9999 = 10000 - 1, and the +1 turns (9 - d) into (10 - d)',
          'It is a different rule',
          'Because 10 is the base',
          'To avoid negative digits'
        ],
        correctIndex: 0,
        explanation: 'The extra 1 from 10,000 - 1 adds to the units complement (9 - d + 1 = 10 - d).'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-706': {
    id: 'tech-706',
    chapterId: 7,
    section: '7.6',
    pageRef: 'pp. 255–257',
    name: 'Algebraic Proofs of Squaring Shortcuts',
    shortName: 'Proofs of Squaring',
    difficulty: 'intermediate',
    learningObjectives: [
      'Prove (10a + 5)² = 100a(a+1) + 25',
      'Prove (50 + a)² = 100(25 + a) + a²',
      'Prove (10a + b)² = 100a² + 20ab + b²'
    ],
    prerequisites: ['tech-601', 'tech-602'],
    summary: 'Polynomial expansion proves the instant squaring formulas for numbers ending in 5, the 50s, and general 2-digit numbers.',
    mathematicalPrinciple: 'Binomial theorem: (x + y)² = x² + 2xy + y².',
    rulesAndProcedure: [
      '1. (10a + 5)² = 100a² + 100a + 25 = 100a(a + 1) + 25. Factor 100 ensures no overlap with 25.',
      '2. (50 + a)² = 2500 + 100a + a² = 100(25 + a) + a².',
      '3. (10a + b)² = 100a² + 20ab + b².'
    ],
    workedExamples: [
      {
        problem: 'Proof of (10a+5)²',
        stepsSummary: '(10a+5)(10a+5) = 100a² + 50a + 50a + 25 = 100a(a+1) + 25.',
        result: 'Q.E.D.',
        details: { problemString: '(10a+5)²', answerString: 'Q.E.D.', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['No overlap between 100a(a+1) and 25.'],
    commonMistakes: ['Forgetting that a² in (50+a)² must occupy two decimal digits.'],
    knowledgeCheckQuestions: [
      {
        question: 'Why does 100a(a+1) never overlap with the 25 at the end?',
        options: [
          'Because multiplying by 100 places two zeroes at the end',
          'Because 25 is less than 100',
          'Both of the above',
          'It can overlap if a > 9'
        ],
        correctIndex: 2,
        explanation: 'Multiplying by 100 leaves the last two digits as 00, where 25 fits without carrying.'
      }
    ],
    masteryThresholdScore: 100
  },
  'tech-707': {
    id: 'tech-707',
    chapterId: 7,
    section: '7.7–7.8',
    pageRef: 'pp. 257–264',
    name: 'Algebraic Proof of Units-and-Tens (UT) Multiplication',
    shortName: 'Proof of UT Method',
    difficulty: 'expert',
    learningObjectives: [
      'Decompose digit products into n·a = 10 T_a + U_a',
      'Follow the algebraic alignment that produces pair-products U_b + T_c',
      'Generalize to multi-digit multipliers using double index summations'
    ],
    prerequisites: ['tech-301', 'tech-701'],
    summary: 'Decomposing each single-digit product into its tens (T) and units (U) proves that adjacent pairs form exact decimal place sums.',
    mathematicalPrinciple: 'Base-10 tensor decomposition of polynomial products.',
    rulesAndProcedure: [
      '1. Let n·a = 10 T_a + U_a.',
      '2. Expand (100a + 10b + c) × n = 1000 T_a + 100(U_a + T_b) + 10(U_b + T_c) + U_c.',
      '3. Each column k has coefficient U_k + T_{k-1}, proving the pair-product rule!',
      '4. Extend to two-digit multipliers (10m + n).'
    ],
    workedExamples: [
      {
        problem: 'Proof of UT for 3-digit × 1-digit',
        stepsSummary: 'Expanding gives Answer = T_a·1,000 + (U_a + T_b)·100 + (U_b + T_c)·10 + U_c.',
        result: 'Q.E.D.',
        details: { problemString: 'UT proof', answerString: 'Q.E.D.', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Index summation using sigma notation ∑ a_n 10^n.'],
    commonMistakes: ['Confusing U and T subscript assignments.'],
    knowledgeCheckQuestions: [
      {
        question: 'In the UT expansion, what forms the tens place coefficient of the product?',
        options: ['U_b + T_c', 'U_c + T_b', 'T_b × U_c', 'U_b × T_c'],
        correctIndex: 0,
        explanation: 'Units of b times multiplier plus Tens of c times multiplier: U_b + T_c.'
      }
    ],
    masteryThresholdScore: 100
  },

  // CHAPTER 8
  'tech-801': {
    id: 'tech-801',
    chapterId: 8,
    section: '8.1',
    pageRef: 'pp. 265–272',
    name: 'Concentration, Subconscious Reflexes & Mathematical Confidence',
    shortName: 'Pedagogy & Speed Training',
    difficulty: 'beginner',
    learningObjectives: [
      'Understand the cognitive psychology of the Trachtenberg System',
      'Eliminate inner verbalization and establish rapid subconscious visual reflexes',
      'Cultivate an unwavering commitment to verification and 99% calculation accuracy'
    ],
    prerequisites: ['tech-101'],
    summary: 'The philosophical core: mathematics as mental discipline, elimination of fear, and cultivating lightning speed through visual pattern recognition.',
    mathematicalPrinciple: 'Cognitive load theory and automaticity in basic numerical processing.',
    rulesAndProcedure: [
      '1. Silence inner verbalization: do not say "half of 4 is 2 and 6 plus 2 is 8"; see 6 and 4 and say "8".',
      '2. Practice with neat, spaced digit alignment to avoid perceptual slips.',
      '3. Prioritize mathematical correctness before speed.',
      '4. Always verify results using independent digit-sum or elevens-remainder checks.'
    ],
    workedExamples: [
      {
        problem: 'Mental reflex drill',
        stepsSummary: 'Instant pair-product perception without intermediate speech.',
        result: 'Automatic reflex',
        details: { problemString: 'Reflex drill', answerString: 'Automatic', steps: [], verification: { method: 'digit-sum', details: 'Verified.', checked: true } }
      }
    ],
    specialCases: ['Overcoming arithmetic anxiety in adult learners.'],
    commonMistakes: ['Rushing speed before mastering the underlying calculation rule.'],
    knowledgeCheckQuestions: [
      {
        question: 'According to Professor Trachtenberg, why is repeating a calculation a poor way to check it?',
        options: [
          'It takes too much paper',
          'A person tends to repeat their favorite subconscious mistake when repeating the work',
          'Calculators are faster',
          'Repetition alters the numbers'
        ],
        correctIndex: 1,
        explanation: 'Personal favorite errors slip out unconsciously during repetition; independent checks like digit-sums reliably catch them.'
      }
    ],
    masteryThresholdScore: 100
  }
};

export function getChapter(id: number): Chapter | undefined {
  return chapters.find(c => c.id === id);
}

export function getTechnique(id: string): Technique | undefined {
  return allTechniques[id];
}

export function getAllTechniquesList(): Technique[] {
  return Object.values(allTechniques);
}

export function getTechniquesByChapter(chapterId: number): Technique[] {
  const chapter = getChapter(chapterId);
  if (!chapter) return [];
  return chapter.techniqueIds.map(id => allTechniques[id]).filter(Boolean);
}

export function getAdjacentTechniques(id: string): { prev?: Technique; next?: Technique } {
  const list = getAllTechniquesList();
  const idx = list.findIndex(t => t.id === id);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? list[idx - 1] : undefined,
    next: idx < list.length - 1 ? list[idx + 1] : undefined
  };
}

