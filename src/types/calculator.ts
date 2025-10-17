/**
 * Calculator operation types
 */
export type Operation = '+' | '-' | '×' | '÷' | '√' | '^' | '%';

/**
 * Calculator button types
 */
export type ButtonType = 'number' | 'operation' | 'function' | 'memory' | 'equals' | 'clear';

/**
 * Calculator state interface
 */
export interface CalculatorState {
  /** Current display value */
  display: string;
  /** Previous value for operations */
  previousValue: number | null;
  /** Current operation */
  operation: Operation | null;
  /** Whether waiting for new number input */
  waitingForOperand: boolean;
  /** Memory value */
  memory: number;
  /** Whether memory is active */
  memoryActive: boolean;
  /** Calculation history */
  history: CalculationEntry[];
  /** Current theme */
  theme: 'light' | 'dark';
}

/**
 * Calculation history entry
 */
export interface CalculationEntry {
  id: string;
  expression: string;
  result: number;
  timestamp: Date;
}

/**
 * Calculator button configuration
 */
export interface CalculatorButton {
  id: string;
  label: string;
  value: string;
  type: ButtonType;
  className?: string;
  ariaLabel?: string;
  keyboardShortcut?: string;
}

/**
 * Calculator operation result
 */
export interface OperationResult {
  result: number;
  error?: string;
}

/**
 * Calculator memory operations
 */
export type MemoryOperation = 'M+' | 'M-' | 'MR' | 'MC';

/**
 * Calculator function operations
 */
export type FunctionOperation = 'C' | 'CE' | '±' | '√' | '^' | '%' | '1/x';

/**
 * Calculator event types
 */
export interface CalculatorEvent {
  type: 'button_click' | 'keyboard_input' | 'memory_operation' | 'theme_change';
  payload: any;
  timestamp: Date;
}
