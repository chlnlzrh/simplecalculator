import {
  cn,
  generateId,
  debounce,
  throttle,
  formatNumber,
  parseNumber,
  isValidCalculatorInput,
  getKeyMapping,
  isNumberKey,
  isOperationKey,
  isFunctionKey,
  getTouchTargetSize,
  getAccessibleButtonSize,
  generateAriaLabel,
  isTouchDevice,
  getSystemTheme,
  saveToLocalStorage,
  loadFromLocalStorage,
} from '@/lib/utils';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2');
    });

    it('should handle undefined and null', () => {
      expect(cn('class1', undefined, null)).toBe('class1');
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should debounce function calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should throttle function calls', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with locale', () => {
      expect(formatNumber(1234.56, 'en-US')).toBe('1,234.56');
    });

    it('should handle different locales', () => {
      expect(formatNumber(1234.56, 'de-DE')).toBe('1.234,56');
    });
  });

  describe('parseNumber', () => {
    it('should parse locale-formatted numbers', () => {
      expect(parseNumber('1,234.56', 'en-US')).toBe(1234.56);
    });

    it('should handle different locales', () => {
      expect(parseNumber('1.234,56', 'de-DE')).toBe(1234.56);
    });
  });

  describe('isValidCalculatorInput', () => {
    it('should validate calculator input', () => {
      expect(isValidCalculatorInput('123+456')).toBe(true);
      expect(isValidCalculatorInput('12.34*56.78')).toBe(true);
      expect(isValidCalculatorInput('√(25)')).toBe(true);
      expect(isValidCalculatorInput('2^3')).toBe(true);
    });

    it('should reject invalid input', () => {
      expect(isValidCalculatorInput('abc')).toBe(false);
      expect(isValidCalculatorInput('12@34')).toBe(false);
      expect(isValidCalculatorInput('')).toBe(false);
    });
  });

  describe('getKeyMapping', () => {
    it('should map keyboard keys to calculator functions', () => {
      expect(getKeyMapping('Enter')).toBe('=');
      expect(getKeyMapping('Escape')).toBe('C');
      expect(getKeyMapping('Backspace')).toBe('⌫');
      expect(getKeyMapping('*')).toBe('×');
      expect(getKeyMapping('/')).toBe('÷');
    });

    it('should return null for unmapped keys', () => {
      expect(getKeyMapping('a')).toBeNull();
      expect(getKeyMapping('F1')).toBeNull();
    });
  });

  describe('isNumberKey', () => {
    it('should identify number keys', () => {
      expect(isNumberKey('0')).toBe(true);
      expect(isNumberKey('5')).toBe(true);
      expect(isNumberKey('9')).toBe(true);
    });

    it('should reject non-number keys', () => {
      expect(isNumberKey('a')).toBe(false);
      expect(isNumberKey('+')).toBe(false);
      expect(isNumberKey('Enter')).toBe(false);
    });
  });

  describe('isOperationKey', () => {
    it('should identify operation keys', () => {
      expect(isOperationKey('+')).toBe(true);
      expect(isOperationKey('-')).toBe(true);
      expect(isOperationKey('*')).toBe(true);
      expect(isOperationKey('/')).toBe(true);
    });

    it('should reject non-operation keys', () => {
      expect(isOperationKey('5')).toBe(false);
      expect(isOperationKey('Enter')).toBe(false);
      expect(isOperationKey('a')).toBe(false);
    });
  });

  describe('isFunctionKey', () => {
    it('should identify function keys', () => {
      expect(isFunctionKey('Enter')).toBe(true);
      expect(isFunctionKey('Escape')).toBe(true);
      expect(isFunctionKey('Backspace')).toBe(true);
      expect(isFunctionKey('Delete')).toBe(true);
      expect(isFunctionKey(' ')).toBe(true);
    });

    it('should reject non-function keys', () => {
      expect(isFunctionKey('5')).toBe(false);
      expect(isFunctionKey('+')).toBe(false);
      expect(isFunctionKey('a')).toBe(false);
    });
  });

  describe('getTouchTargetSize', () => {
    it('should return touch target size classes', () => {
      expect(getTouchTargetSize()).toBe('min-h-[44px] min-w-[44px]');
    });
  });

  describe('getAccessibleButtonSize', () => {
    it('should return accessible button size classes', () => {
      expect(getAccessibleButtonSize()).toBe('h-12 w-12 sm:h-14 sm:w-14');
    });
  });

  describe('generateAriaLabel', () => {
    it('should generate ARIA labels for buttons', () => {
      expect(generateAriaLabel('C', 'function')).toBe('Clear all');
      expect(generateAriaLabel('+', 'operation')).toBe('Plus');
      expect(generateAriaLabel('5', 'number')).toBe('5');
    });
  });

  describe('isTouchDevice', () => {
    it('should detect touch devices', () => {
      // Mock touch support
      Object.defineProperty(window, 'ontouchstart', {
        value: true,
        writable: true,
      });
      
      expect(isTouchDevice()).toBe(true);
    });
  });

  describe('getSystemTheme', () => {
    it('should return system theme preference', () => {
      // Mock matchMedia
      Object.defineProperty(window, 'matchMedia', {
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
        writable: true,
      });

      expect(getSystemTheme()).toBe('dark');
    });
  });

  describe('saveToLocalStorage', () => {
    it('should save data to localStorage', () => {
      const data = { test: 'value' };
      const result = saveToLocalStorage('test-key', data);
      
      expect(result).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(data));
    });

    it('should handle localStorage errors', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage full');
      });

      const result = saveToLocalStorage('test-key', { test: 'value' });
      expect(result).toBe(false);
    });
  });

  describe('loadFromLocalStorage', () => {
    it('should load data from localStorage', () => {
      const data = { test: 'value' };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(data));
      
      const result = loadFromLocalStorage('test-key', {});
      expect(result).toEqual(data);
    });

    it('should return default value when key not found', () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const defaultValue = { default: 'value' };
      const result = loadFromLocalStorage('test-key', defaultValue);
      expect(result).toEqual(defaultValue);
    });

    it('should handle localStorage errors', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });

      const defaultValue = { default: 'value' };
      const result = loadFromLocalStorage('test-key', defaultValue);
      expect(result).toEqual(defaultValue);
    });
  });
});
