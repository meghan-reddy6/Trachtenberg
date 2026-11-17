import { describe, it, expect } from 'vitest';
import { sanitizeProgress, defaultProgress } from '../storage/progressStorage';
import { normalizeAnswer, validateAnswer } from '../engines/solutionValidator';
import { bigIntSqrt } from '../engines/squareAndRootEngine';

describe('Storage & Validation Audit Suite', () => {
  describe('Storage Sanitization & Migration', () => {
    it('should sanitize empty object gracefully with sensible defaults', () => {
      const sanitized = sanitizeProgress({});
      expect(sanitized.version).toBe(1);
      expect(Array.isArray(sanitized.completedTechniqueIds)).toBe(true);
      expect(Array.isArray(sanitized.bookmarkedTechniqueIds)).toBe(true);
      expect(typeof sanitized.mastery).toBe('object');
      expect(Array.isArray(sanitized.speedTrainerRecords)).toBe(true);
      expect(sanitized.settings).toBeDefined();
      expect(sanitized.settings.theme).toBe('light');
      expect(sanitized.settings.mathFontSize).toBe('standard');
      expect(sanitized.settings.hapticsOrSound).toBe(true);
      expect(sanitized.settings.autoAdvanceStep).toBe(false);
    });

    it('should recover when corrupted/unexpected types are stored', () => {
      const corrupted: any = {
        completedTechniqueIds: 'not an array',
        bookmarkedTechniqueIds: null,
        mastery: 'string',
        settings: 'not an object',
        speedTrainerRecords: 12345
      };

      const sanitized = sanitizeProgress(corrupted);
      expect(Array.isArray(sanitized.completedTechniqueIds)).toBe(true);
      expect(Array.isArray(sanitized.bookmarkedTechniqueIds)).toBe(true);
      expect(typeof sanitized.mastery).toBe('object');
      expect(typeof sanitized.settings).toBe('object');
      expect(Array.isArray(sanitized.speedTrainerRecords)).toBe(true);
      expect(sanitized.settings.theme).toBe('light');
    });

    it('should preserve valid existing user progress', () => {
      const valid = {
        version: 1,
        lastUpdated: '2026-11-17T00:00:00Z',
        currentTechniqueId: 'tech-101',
        completedTechniqueIds: ['tech-101'],
        bookmarkedTechniqueIds: ['tech-201'],
        mastery: {
          'tech-101': {
            level: 'proficient' as const,
            score: 85,
            attempts: 10,
            correct: 9,
            averageTimeMs: 4200,
            fastestTimeMs: 2500,
            lastPracticed: '2026-11-17T00:00:00Z',
            history: []
          }
        },
        speedTrainerRecords: [],
        settings: {
          theme: 'dark' as const,
          mathFontSize: 'standard' as const,
          hapticsOrSound: true,
          autoAdvanceStep: true
        }
      };

      const sanitized = sanitizeProgress(valid);
      expect(sanitized.completedTechniqueIds).toContain('tech-101');
      expect(sanitized.bookmarkedTechniqueIds).toContain('tech-201');
      expect(sanitized.settings.theme).toBe('dark');
      expect(sanitized.settings.autoAdvanceStep).toBe(true);
      expect(sanitized.mastery['tech-101'].score).toBe(85);
    });
  });

  describe('Solution Validator Normalization', () => {
    it('should normalize answers with commas, spaces, and casing', () => {
      expect(normalizeAnswer(' 12,345 ')).toBe('12345');
      expect(normalizeAnswer('6,963')).toBe('6963');
      expect(normalizeAnswer(' 7 934 564 ')).toBe('7934564');
    });

    it('should standardize division remainder notations', () => {
      expect(normalizeAnswer('443284 remainder 16')).toBe('443284 R 16');
      expect(normalizeAnswer('443284 rem 16')).toBe('443284 R 16');
      expect(normalizeAnswer('443284 r 16')).toBe('443284 R 16');
      expect(normalizeAnswer('443284 R 16')).toBe('443284 R 16');
    });

    it('should validate exact answers correctly', () => {
      expect(validateAnswer('6963', '6,963')).toBe(true);
      expect(validateAnswer(' 19,294 ', '19294')).toBe(true);
      expect(validateAnswer('443284 remainder 16', '443284 R 16')).toBe(true);
      expect(validateAnswer('443284', '443284 R 16')).toBe(false);
    });
  });

  describe('BigInt Integer Square Root', () => {
    it('should compute exact square roots for small squares', () => {
      expect(bigIntSqrt(0n)).toBe(0n);
      expect(bigIntSqrt(1n)).toBe(1n);
      expect(bigIntSqrt(4n)).toBe(2n);
      expect(bigIntSqrt(9n)).toBe(3n);
      expect(bigIntSqrt(16n)).toBe(4n);
      expect(bigIntSqrt(25n)).toBe(5n);
      expect(bigIntSqrt(100n)).toBe(10n);
      expect(bigIntSqrt(144n)).toBe(12n);
      expect(bigIntSqrt(7396n)).toBe(86n);
    });

    it('should compute integer floors for non-perfect squares', () => {
      expect(bigIntSqrt(2n)).toBe(1n);
      expect(bigIntSqrt(3n)).toBe(1n);
      expect(bigIntSqrt(5n)).toBe(2n);
      expect(bigIntSqrt(8n)).toBe(2n);
      expect(bigIntSqrt(10n)).toBe(3n);
      expect(bigIntSqrt(99n)).toBe(9n);
    });

    it('should compute square roots for integers exceeding standard 53-bit floating point limit', () => {
      // 10^24 -> sqrt is 10^12
      const largeSquare = 1000000000000000000000000n;
      expect(bigIntSqrt(largeSquare)).toBe(1000000000000n);

      // (2^32)^2 = 2^64 (18446744073709551616)
      const twoPow32 = 4294967296n;
      expect(bigIntSqrt(twoPow32 * twoPow32)).toBe(twoPow32);
    });
  });
});
