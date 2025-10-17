import { Operation, OperationResult, CalculatorState, CalculationEntry } from '@/types/calculator';

/**
 * Core calculator logic and operations
 * @ai-gen: model=v4.0, date=2024-12-19
 */

/**
 * Perform basic arithmetic operations
 */
export const performOperation = (
  firstOperand: number,
  secondOperand: number,
  operation: Operation
): OperationResult => {
  try {
    let result: number;

    switch (operation) {
      case '+':
        result = firstOperand + secondOperand;
        break;
      case '-':
        result = firstOperand - secondOperand;
        break;
      case '×':
        result = firstOperand * secondOperand;
        break;
      case '÷':
        if (secondOperand === 0) {
          return { result: 0, error: 'Cannot divide by zero' };
        }
        result = firstOperand / secondOperand;
        break;
      case '^':
        result = Math.pow(firstOperand, secondOperand);
        break;
      case '%':
        result = (firstOperand * secondOperand) / 100;
        break;
      default:
        return { result: 0, error: 'Invalid operation' };
    }

    // Handle overflow/underflow
    if (!isFinite(result)) {
      return { result: 0, error: 'Result is too large or too small' };
    }

    return { result };
  } catch (error) {
    return { result: 0, error: 'Calculation error' };
  }
};

/**
 * Perform unary operations
 */
export const performUnaryOperation = (
  operand: number,
  operation: '√' | '±' | '1/x'
): OperationResult => {
  try {
    let result: number;

    switch (operation) {
      case '√':
        if (operand < 0) {
          return { result: 0, error: 'Cannot calculate square root of negative number' };
        }
        result = Math.sqrt(operand);
        break;
      case '±':
        result = -operand;
        break;
      case '1/x':
        if (operand === 0) {
          return { result: 0, error: 'Cannot divide by zero' };
        }
        result = 1 / operand;
        break;
      default:
        return { result: 0, error: 'Invalid unary operation' };
    }

    if (!isFinite(result)) {
      return { result: 0, error: 'Result is too large or too small' };
    }

    return { result };
  } catch (error) {
    return { result: 0, error: 'Calculation error' };
  }
};

/**
 * Format number for display
 */
export const formatDisplayValue = (value: number): string => {
  // Handle very large or very small numbers
  if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-10 && value !== 0)) {
    return value.toExponential(6);
  }

  // Format as decimal with appropriate precision
  const formatted = value.toString();
  
  // Remove trailing zeros and unnecessary decimal point
  return formatted.replace(/\.?0+$/, '');
};

/**
 * Parse display value to number
 */
export const parseDisplayValue = (display: string): number => {
  const cleaned = display.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Create calculation history entry
 */
export const createHistoryEntry = (
  expression: string,
  result: number
): CalculationEntry => ({
  id: Date.now().toString(),
  expression,
  result,
  timestamp: new Date(),
});

/**
 * Calculate percentage
 */
export const calculatePercentage = (value: number, percentage: number): number => {
  return (value * percentage) / 100;
};

/**
 * Validate calculator state
 */
export const validateCalculatorState = (state: CalculatorState): boolean => {
  return (
    typeof state.display === 'string' &&
    (state.previousValue === null || typeof state.previousValue === 'number') &&
    (state.operation === null || typeof state.operation === 'string') &&
    typeof state.waitingForOperand === 'boolean' &&
    typeof state.memory === 'number' &&
    typeof state.memoryActive === 'boolean' &&
    Array.isArray(state.history)
  );
};

/**
 * Get operation symbol for display
 */
export const getOperationSymbol = (operation: Operation | null): string => {
  if (!operation) return '';
  
  const symbols: Record<Operation, string> = {
    '+': '+',
    '-': '−',
    '×': '×',
    '÷': '÷',
    '√': '√',
    '^': '^',
    '%': '%',
  };
  
  return symbols[operation] || '';
};

/**
 * Check if a number is valid for calculator operations
 */
export const isValidNumber = (value: number): boolean => {
  return isFinite(value) && !isNaN(value);
};

/**
 * Round number to avoid floating point precision issues
 */
export const roundToPrecision = (value: number, precision: number = 10): number => {
  return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
};
