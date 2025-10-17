import {
  performOperation,
  performUnaryOperation,
  formatDisplayValue,
  parseDisplayValue,
  createHistoryEntry,
  validateCalculatorState,
  getOperationSymbol,
  isValidNumber,
  roundToPrecision,
} from '@/lib/calculator';
import { CalculatorState } from '@/types/calculator';

describe('Calculator Logic', () => {
  describe('performOperation', () => {
    it('should perform addition correctly', () => {
      const result = performOperation(5, 3, '+');
      expect(result.result).toBe(8);
      expect(result.error).toBeUndefined();
    });

    it('should perform subtraction correctly', () => {
      const result = performOperation(10, 4, '-');
      expect(result.result).toBe(6);
      expect(result.error).toBeUndefined();
    });

    it('should perform multiplication correctly', () => {
      const result = performOperation(6, 7, '×');
      expect(result.result).toBe(42);
      expect(result.error).toBeUndefined();
    });

    it('should perform division correctly', () => {
      const result = performOperation(15, 3, '÷');
      expect(result.result).toBe(5);
      expect(result.error).toBeUndefined();
    });

    it('should handle division by zero', () => {
      const result = performOperation(10, 0, '÷');
      expect(result.result).toBe(0);
      expect(result.error).toBe('Cannot divide by zero');
    });

    it('should perform power operation correctly', () => {
      const result = performOperation(2, 3, '^');
      expect(result.result).toBe(8);
      expect(result.error).toBeUndefined();
    });

    it('should perform percentage calculation correctly', () => {
      const result = performOperation(100, 20, '%');
      expect(result.result).toBe(20);
      expect(result.error).toBeUndefined();
    });

    it('should handle invalid operation', () => {
      const result = performOperation(5, 3, 'invalid' as any);
      expect(result.result).toBe(0);
      expect(result.error).toBe('Invalid operation');
    });

    it('should handle overflow', () => {
      const result = performOperation(1e15, 1e15, '×');
      expect(result.error).toBe('Result is too large or too small');
    });
  });

  describe('performUnaryOperation', () => {
    it('should perform square root correctly', () => {
      const result = performUnaryOperation(16, '√');
      expect(result.result).toBe(4);
      expect(result.error).toBeUndefined();
    });

    it('should handle negative square root', () => {
      const result = performUnaryOperation(-4, '√');
      expect(result.result).toBe(0);
      expect(result.error).toBe('Cannot calculate square root of negative number');
    });

    it('should perform sign change correctly', () => {
      const result = performUnaryOperation(5, '±');
      expect(result.result).toBe(-5);
      expect(result.error).toBeUndefined();
    });

    it('should perform reciprocal correctly', () => {
      const result = performUnaryOperation(4, '1/x');
      expect(result.result).toBe(0.25);
      expect(result.error).toBeUndefined();
    });

    it('should handle reciprocal of zero', () => {
      const result = performUnaryOperation(0, '1/x');
      expect(result.result).toBe(0);
      expect(result.error).toBe('Cannot divide by zero');
    });

    it('should handle invalid unary operation', () => {
      const result = performUnaryOperation(5, 'invalid' as any);
      expect(result.result).toBe(0);
      expect(result.error).toBe('Invalid unary operation');
    });
  });

  describe('formatDisplayValue', () => {
    it('should format regular numbers correctly', () => {
      expect(formatDisplayValue(123.45)).toBe('123.45');
    });

    it('should format integers correctly', () => {
      expect(formatDisplayValue(100)).toBe('100');
    });

    it('should format very large numbers with scientific notation', () => {
      const result = formatDisplayValue(1e15);
      expect(result).toMatch(/e\+/);
    });

    it('should format very small numbers with scientific notation', () => {
      const result = formatDisplayValue(1e-10);
      expect(result).toMatch(/e-/);
    });

    it('should handle zero correctly', () => {
      expect(formatDisplayValue(0)).toBe('0');
    });
  });

  describe('parseDisplayValue', () => {
    it('should parse valid numbers correctly', () => {
      expect(parseDisplayValue('123.45')).toBe(123.45);
    });

    it('should handle invalid input', () => {
      expect(parseDisplayValue('invalid')).toBe(0);
    });

    it('should handle empty string', () => {
      expect(parseDisplayValue('')).toBe(0);
    });

    it('should clean non-numeric characters', () => {
      expect(parseDisplayValue('123abc')).toBe(123);
    });
  });

  describe('createHistoryEntry', () => {
    it('should create history entry with correct structure', () => {
      const entry = createHistoryEntry('2 + 3', 5);
      expect(entry.expression).toBe('2 + 3');
      expect(entry.result).toBe(5);
      expect(entry.id).toBeDefined();
      expect(entry.timestamp).toBeInstanceOf(Date);
    });
  });

  describe('validateCalculatorState', () => {
    it('should validate correct state', () => {
      const state: CalculatorState = {
        display: '0',
        previousValue: null,
        operation: null,
        waitingForOperand: false,
        memory: 0,
        memoryActive: false,
        history: [],
        theme: 'light',
      };
      expect(validateCalculatorState(state)).toBe(true);
    });

    it('should reject invalid state', () => {
      const invalidState = {
        display: 123, // Should be string
        previousValue: null,
        operation: null,
        waitingForOperand: false,
        memory: 0,
        memoryActive: false,
        history: [],
        theme: 'light',
      };
      expect(validateCalculatorState(invalidState as any)).toBe(false);
    });
  });

  describe('getOperationSymbol', () => {
    it('should return correct symbols for operations', () => {
      expect(getOperationSymbol('+')).toBe('+');
      expect(getOperationSymbol('-')).toBe('−');
      expect(getOperationSymbol('×')).toBe('×');
      expect(getOperationSymbol('÷')).toBe('÷');
      expect(getOperationSymbol('√')).toBe('√');
      expect(getOperationSymbol('^')).toBe('^');
      expect(getOperationSymbol('%')).toBe('%');
    });

    it('should return empty string for null operation', () => {
      expect(getOperationSymbol(null)).toBe('');
    });
  });

  describe('isValidNumber', () => {
    it('should validate finite numbers', () => {
      expect(isValidNumber(123)).toBe(true);
      expect(isValidNumber(0)).toBe(true);
      expect(isValidNumber(-123)).toBe(true);
      expect(isValidNumber(123.45)).toBe(true);
    });

    it('should reject invalid numbers', () => {
      expect(isValidNumber(NaN)).toBe(false);
      expect(isValidNumber(Infinity)).toBe(false);
      expect(isValidNumber(-Infinity)).toBe(false);
    });
  });

  describe('roundToPrecision', () => {
    it('should round to specified precision', () => {
      expect(roundToPrecision(0.1 + 0.2, 10)).toBe(0.3);
      expect(roundToPrecision(1.23456789, 3)).toBe(1.235);
    });

    it('should handle default precision', () => {
      expect(roundToPrecision(0.1 + 0.2)).toBe(0.3);
    });
  });
});
