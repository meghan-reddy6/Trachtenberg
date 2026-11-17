export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type MasteryLevel = 
  | 'not-started' 
  | 'learning' 
  | 'practising' 
  | 'proficient' 
  | 'mastered';

export type ExerciseFormat = 
  | 'numerical-answer'
  | 'multiple-choice'
  | 'missing-digit'
  | 'next-step'
  | 'identify-error'
  | 'match-technique';

export interface CalculationStep {
  stepIndex: number;
  description: string;
  ruleApplied: string;
  currentDigit: number;
  neighborDigit?: number;
  secondaryDigit?: number;
  workingFormula: string;
  intermediateResult?: string | number;
  carryIn: number;
  carryOut: number;
  producedDigit: string | number;
  explanation: string;
  highlightIndices?: {
    multiplicand?: number[];
    multiplier?: number[];
    answer?: number[];
  };
  visualAnnotations?: {
    type: 'arrow' | 'pair' | 'fork' | 'ut' | 'tick' | 'collapse';
    label?: string;
    fromIndex?: number;
    toIndex?: number;
  }[];
}

export interface CalculationResult {
  problemString: string;
  answerString: string;
  quotient?: string;
  remainder?: string;
  steps: CalculationStep[];
  verification: {
    method: 'digit-sum' | 'elevens-remainder' | 'inverse-multiplication';
    details: string;
    checked: boolean;
  };
}

export interface PracticeQuestion {
  id: string;
  techniqueId: string;
  difficulty: Difficulty;
  format: ExerciseFormat;
  prompt: string;
  expression: string;
  correctAnswer: string;
  options?: string[]; // for multiple choice
  hints: [string, string, string]; // Hint 1: Rule, Hint 2: Next op, Hint 3: Partial calc
  solution: {
    steps: string[];
    explanation: string;
    finalAnswer: string;
  };
  operands?: {
    a: number | string;
    b: number | string;
    op: '×' | '÷' | '+' | '²' | '√';
  };
}

export interface Technique {
  id: string;
  chapterId: number;
  section: string;
  pageRef: string;
  name: string;
  shortName: string;
  difficulty: Difficulty;
  learningObjectives: string[];
  prerequisites: string[];
  summary: string;
  mathematicalPrinciple: string;
  rulesAndProcedure: string[];
  algebraicProof?: string;
  workedExamples: {
    problem: string;
    stepsSummary: string;
    result: string;
    details: CalculationResult;
  }[];
  specialCases: string[];
  commonMistakes: string[];
  knowledgeCheckQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  masteryThresholdScore: number;
}

export interface Chapter {
  id: number;
  numberString: string;
  title: string;
  subtitle: string;
  pageRange: string;
  introduction: string;
  learningObjectives: string[];
  historicalContext?: string;
  techniqueIds: string[];
}

export interface UserProgress {
  version: number;
  lastUpdated: string;
  currentTechniqueId: string;
  completedTechniqueIds: string[];
  bookmarkedTechniqueIds: string[];
  mastery: Record<string, {
    level: MasteryLevel;
    score: number;
    attempts: number;
    correct: number;
    averageTimeMs: number;
    fastestTimeMs: number;
    lastPracticed: string;
    history: {
      date: string;
      correct: boolean;
      timeMs: number;
      difficulty: Difficulty;
    }[];
  }>;
  speedTrainerRecords: {
    techniqueCategory: string;
    questionsPerMin: number;
    accuracyPercent: number;
    bestStreak: number;
    date: string;
  }[];
  settings: {
    theme: 'light' | 'dark';
    mathFontSize: 'standard' | 'large';
    hapticsOrSound: boolean;
    autoAdvanceStep: boolean;
  };
}

