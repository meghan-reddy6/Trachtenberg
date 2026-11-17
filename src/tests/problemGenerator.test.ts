import { describe, it, expect } from 'vitest';
import { generateQuestionForTechnique, generateSpeedDrillQuestions } from '../engines/problemGenerator';
import { getAllTechniquesList } from '../content/curriculum';

describe('Problem Generator Audit Suite', () => {
  const allTechniques = getAllTechniquesList();

  it('should verify all 46 curriculum techniques are loaded', () => {
    expect(allTechniques.length).toBe(46);
  });

  it('should generate valid, solvable questions for EVERY technique in the curriculum', () => {
    for (const tech of allTechniques) {
      const q = generateQuestionForTechnique(tech.id, tech.difficulty);
      
      expect(q, `Question generated for ${tech.id} should not be null`).toBeDefined();
      expect(q.id).toBeDefined();
      expect(q.techniqueId).toBe(tech.id);
      expect(q.prompt.length).toBeGreaterThan(0);
      expect(q.correctAnswer.length).toBeGreaterThan(0);
      expect(q.solution).toBeDefined();
      expect(q.solution.explanation.length).toBeGreaterThan(0);

      // Verify format
      if (q.format === 'multiple-choice') {
        expect(q.options).toBeDefined();
        expect(q.options!.length).toBeGreaterThanOrEqual(2);
        // Correct answer must be among options
        expect(q.options).toContain(q.correctAnswer);
      }
    }
  });

  it('should generate valid questions across different difficulty levels', () => {
    const difficulties: Array<'beginner' | 'intermediate' | 'advanced'> = ['beginner', 'intermediate', 'advanced'];
    
    // Sample a few key techniques across chapters
    const sampleIds = ['tech-101', 'tech-201', 'tech-301', 'tech-401', 'tech-501', 'tech-601', 'tech-701', 'tech-801'];
    
    for (const techId of sampleIds) {
      for (const diff of difficulties) {
        const q = generateQuestionForTechnique(techId, diff);
        expect(q.difficulty).toBe(diff);
        expect(q.correctAnswer).toBeDefined();
        expect(q.correctAnswer.length).toBeGreaterThan(0);
      }
    }
  });

  it('should generate speed drill questions accurately', () => {
    const drillQuestions = generateSpeedDrillQuestions(10);
    expect(drillQuestions.length).toBe(10);

    for (const q of drillQuestions) {
      expect(q.prompt).toBeDefined();
      expect(q.correctAnswer).toBeDefined();
      expect(q.format).toBe('numerical-answer');
    }
  });
});
