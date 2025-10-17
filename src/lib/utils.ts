import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate unique ID for calculator operations
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Format number with locale-specific formatting
 */
export function formatNumber(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Parse locale-formatted number
 */
export function parseNumber(value: string, locale: string = 'en-US'): number {
  // Remove locale-specific formatting
  const cleaned = value.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
}

/**
 * Check if value is a valid calculator input
 */
export function isValidCalculatorInput(value: string): boolean {
  return /^[0-9+\-*/.()%√^]+$/.test(value);
}

/**
 * Get keyboard key mapping for calculator
 */
export function getKeyMapping(key: string): string | null {
  const keyMap: Record<string, string> = {
    'Enter': '=',
    'Escape': 'C',
    'Backspace': '⌫',
    'Delete': 'CE',
    ' ': '=',
    '*': '×',
    '/': '÷',
  };
  
  return keyMap[key] || null;
}

/**
 * Check if key is a number key
 */
export function isNumberKey(key: string): boolean {
  return /^[0-9]$/.test(key);
}

/**
 * Check if key is an operation key
 */
export function isOperationKey(key: string): boolean {
  return /^[+\-*/]$/.test(key);
}

/**
 * Check if key is a function key
 */
export function isFunctionKey(key: string): boolean {
  return ['Enter', 'Escape', 'Backspace', 'Delete', ' '].includes(key);
}

/**
 * Get touch target size for mobile
 */
export function getTouchTargetSize(): string {
  return 'min-h-[44px] min-w-[44px]'; // 44pt minimum for iOS
}

/**
 * Get accessible button size
 */
export function getAccessibleButtonSize(): string {
  return 'h-12 w-12 sm:h-14 sm:w-14'; // Minimum 48dp for Android
}

/**
 * Generate ARIA label for calculator button
 */
export function generateAriaLabel(buttonLabel: string, buttonType: string): string {
  const labels: Record<string, string> = {
    'C': 'Clear all',
    'CE': 'Clear entry',
    '=': 'Equals',
    '+': 'Plus',
    '-': 'Minus',
    '×': 'Multiply',
    '÷': 'Divide',
    '√': 'Square root',
    '^': 'Power',
    '%': 'Percentage',
    '±': 'Plus minus',
    '1/x': 'Reciprocal',
    'M+': 'Memory plus',
    'M-': 'Memory minus',
    'MR': 'Memory recall',
    'MC': 'Memory clear',
  };
  
  return labels[buttonLabel] || buttonLabel;
}

/**
 * Check if device supports touch
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get theme preference from system
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Save to localStorage with error handling
 */
export function saveToLocalStorage(key: string, value: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
    return false;
  }
}

/**
 * Load from localStorage with error handling
 */
export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
}
