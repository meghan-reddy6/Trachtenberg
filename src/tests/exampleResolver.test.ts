import { describe, it, expect } from 'vitest';
import { getAllTechniquesList } from '../content/curriculum';
import { resolveWorkedExampleCalculation } from '../engines/exampleResolver';

describe('Curriculum Worked Examples Complete Audit', () => {
  const techniques = getAllTechniquesList();

  it('contains exactly 46 curriculum techniques across 8 chapters', () => {
    expect(techniques.length).toBe(46);
  });

  it('every worked example across all 46 techniques resolves to a valid CalculationResult with steps', () => {
    let totalExamplesTested = 0;

    for (const tech of techniques) {
      expect(tech.workedExamples.length).toBeGreaterThan(0);

      for (let i = 0; i < tech.workedExamples.length; i++) {
        const ex = tech.workedExamples[i];
        const calc = resolveWorkedExampleCalculation(tech, ex);

        expect(calc).toBeDefined();
        expect(calc.problemString).toBeTruthy();
        expect(calc.answerString).toBeTruthy();
        expect(Array.isArray(calc.steps)).toBe(true);
        expect(calc.steps.length).toBeGreaterThan(0);

        // Verify each step has required properties
        for (const step of calc.steps) {
          expect(step.stepIndex).toBeGreaterThan(0);
          expect(step.description).toBeTruthy();
          expect(step.ruleApplied).toBeTruthy();
          expect(step.workingFormula).toBeTruthy();
          expect(step.producedDigit !== undefined && step.producedDigit !== null).toBe(true);
        }

        totalExamplesTested++;
      }
    }

    expect(totalExamplesTested).toBe(69);
  });

  it('resolves Chapter 1 single digit worked examples with detailed steps', () => {
    const tech101 = techniques.find(t => t.id === 'tech-101')!;
    const calc = resolveWorkedExampleCalculation(tech101, tech101.workedExamples[0]); // 633 × 11
    expect(calc.answerString).toBe('6963');
    expect(calc.steps.length).toBe(4);
    expect(calc.steps[0].producedDigit).toBe(3);
    expect(calc.steps[1].producedDigit).toBe(6);
    expect(calc.steps[2].producedDigit).toBe(9);
    expect(calc.steps[3].producedDigit).toBe(6);
  });

  it('resolves Chapter 2 direct multiplication worked examples', () => {
    const tech201 = techniques.find(t => t.id === 'tech-201')!;
    const calc = resolveWorkedExampleCalculation(tech201, tech201.workedExamples[0]); // 23 × 14
    expect(calc.answerString).toBe('322');
    expect(calc.steps.length).toBeGreaterThanOrEqual(3);
  });

  it('resolves Chapter 3 two-finger pair product and multiplication worked examples', () => {
    const tech301 = techniques.find(t => t.id === 'tech-301')!;
    const calc = resolveWorkedExampleCalculation(tech301, tech301.workedExamples[0]); // [3, 8] × 4
    expect(calc.answerString).toBe('5');
    expect(calc.steps.length).toBe(3);
  });

  it('resolves Chapter 4 addition worked examples', () => {
    const tech401 = techniques.find(t => t.id === 'tech-401')!;
    const calc = resolveWorkedExampleCalculation(tech401, tech401.workedExamples[0]); // Column: 3, 9, 1...
    expect(calc.steps.length).toBe(9);
    expect(calc.steps[0].ruleApplied).toContain('Never Count Higher Than 11');
  });

  it('resolves Chapter 5 division worked examples', () => {
    const tech501 = techniques.find(t => t.id === 'tech-501')!;
    const calc = resolveWorkedExampleCalculation(tech501, tech501.workedExamples[0]); // 27,483,624 ÷ 62
    expect(calc.answerString).toContain('443284');
    expect(calc.steps.length).toBeGreaterThan(0);
  });

  it('resolves Chapter 6 squares and square roots worked examples', () => {
    const tech601 = techniques.find(t => t.id === 'tech-601')!;
    const calc = resolveWorkedExampleCalculation(tech601, tech601.workedExamples[0]); // 35²
    expect(calc.answerString).toBe('1225');
    expect(calc.steps.length).toBe(2);

    const tech604 = techniques.find(t => t.id === 'tech-604')!;
    const rootCalc = resolveWorkedExampleCalculation(tech604, tech604.workedExamples[0]); // √625
    expect(rootCalc.answerString).toContain('25');
  });
});
