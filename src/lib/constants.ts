import { CalculatorButton, Operation } from '@/types/calculator';

/**
 * Calculator constants and configuration
 * @ai-gen: model=v4.0, date=2024-12-19
 */

/**
 * Maximum display length to prevent overflow
 */
export const MAX_DISPLAY_LENGTH = 12;

/**
 * Maximum history entries to keep
 */
export const MAX_HISTORY_ENTRIES = 50;

/**
 * Animation duration for button presses
 */
export const BUTTON_ANIMATION_DURATION = 150;

/**
 * Debounce delay for keyboard input
 */
export const KEYBOARD_DEBOUNCE_DELAY = 100;

/**
 * Calculator button configuration
 */
export const CALCULATOR_BUTTONS: CalculatorButton[] = [
  // Row 1: Memory and functions
  { id: 'mc', label: 'MC', value: 'MC', type: 'memory', className: 'bg-gray-200 dark:bg-gray-700' },
  { id: 'mr', label: 'MR', value: 'MR', type: 'memory', className: 'bg-gray-200 dark:bg-gray-700' },
  { id: 'm+', label: 'M+', value: 'M+', type: 'memory', className: 'bg-gray-200 dark:bg-gray-700' },
  { id: 'm-', label: 'M-', value: 'M-', type: 'memory', className: 'bg-gray-200 dark:bg-gray-700' },
  
  // Row 2: Clear and functions
  { id: 'c', label: 'C', value: 'C', type: 'function', className: 'bg-red-200 dark:bg-red-800' },
  { id: 'ce', label: 'CE', value: 'CE', type: 'function', className: 'bg-red-200 dark:bg-red-800' },
  { id: 'sqrt', label: '√', value: '√', type: 'function', className: 'bg-blue-200 dark:bg-blue-800' },
  { id: 'power', label: '^', value: '^', type: 'function', className: 'bg-blue-200 dark:bg-blue-800' },
  
  // Row 3: Numbers and operations
  { id: '7', label: '7', value: '7', type: 'number', className: 'bg-gray-100 dark:bg-gray-800' },
  { id: '8', label: '8', value: '8', type: 'number', className: 'bg-gray-100 dark:bg-gray-800' },
  { id: '9', label: '9', value: '9', type: 'number', className: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'divide', label: '÷', value: '÷', type: 'operation', className: 'bg-orange-200 dark:bg-orange-800' },
  
  // Row 4: Numbers and operations
  { id: '4', label: '4', value: '4', type: 'number', className: 'bg-gray-100 dark:bg-gray-800' },
  { id: '5', label: '5', value: '5', type: 'number', className: 'bg-gray-100 dark:bg-gray-800' },
  { id: '6', label: '6', value: '6', type: 'number', className: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'multiply', label: '×', value: '×', type: 'operation', className: 'bg-orange-200 dark:bg-orange-800' },
  
  // Row 5: Numbers and operations
  { id: '1', label: '1', value: '1', type: 'number', className: 'bg-gray-100 dark:bg-gray-800' },
  { id: '2', label: '2', value: '2', type: 'number', className: 'bg-gray-100 dark:bg-gray-800' },
  { id: '3', label: '3', value: '3', type: 'number', className: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'subtract', label: '−', value: '-', type: 'operation', className: 'bg-orange-200 dark:bg-orange-800' },
  
  // Row 6: Numbers and operations
  { id: '0', label: '0', value: '0', type: 'number', className: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'decimal', label: '.', value: '.', type: 'number', className: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'plus-minus', label: '±', value: '±', type: 'function', className: 'bg-blue-200 dark:bg-blue-800' },
  { id: 'add', label: '+', value: '+', type: 'operation', className: 'bg-orange-200 dark:bg-orange-800' },
  
  // Row 7: Equals
  { id: 'equals', label: '=', value: '=', type: 'equals', className: 'bg-green-200 dark:bg-green-800 col-span-2' },
];

/**
 * Keyboard shortcuts mapping
 */
export const KEYBOARD_SHORTCUTS: Record<string, string> = {
  'Enter': '=',
  'Escape': 'C',
  'Backspace': '⌫',
  'Delete': 'CE',
  ' ': '=',
  '*': '×',
  '/': '÷',
  '=': '=',
  '+': '+',
  '-': '-',
  '.': '.',
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
};

/**
 * Operation symbols for display
 */
export const OPERATION_SYMBOLS: Record<Operation, string> = {
  '+': '+',
  '-': '−',
  '×': '×',
  '÷': '÷',
  '√': '√',
  '^': '^',
  '%': '%',
};

/**
 * Default calculator state
 */
export const DEFAULT_CALCULATOR_STATE = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
  memory: 0,
  memoryActive: false,
  history: [],
  theme: 'light' as const,
};

/**
 * Calculator themes
 */
export const THEMES = {
  light: {
    background: 'bg-white',
    foreground: 'text-gray-900',
    button: 'bg-gray-100 hover:bg-gray-200',
    buttonActive: 'bg-gray-300',
    display: 'bg-gray-50',
  },
  dark: {
    background: 'bg-gray-900',
    foreground: 'text-white',
    button: 'bg-gray-800 hover:bg-gray-700',
    buttonActive: 'bg-gray-600',
    display: 'bg-gray-800',
  },
};

/**
 * Accessibility labels
 */
export const ACCESSIBILITY_LABELS = {
  calculator: 'Calculator',
  display: 'Calculator display',
  button: 'Calculator button',
  memory: 'Memory function',
  operation: 'Mathematical operation',
  number: 'Number',
  equals: 'Equals',
  clear: 'Clear',
};

/**
 * Performance thresholds
 */
export const PERFORMANCE_THRESHOLDS = {
  MAX_BUNDLE_SIZE: 200 * 1024, // 200KB
  MAX_FCP: 1500, // 1.5s
  MAX_TTI: 3000, // 3s
  MAX_CLS: 0.1,
  MAX_FID: 100, // 100ms
  MIN_PERFORMANCE_SCORE: 90,
};
