'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CalculatorDisplay } from './CalculatorDisplay';
import { CalculatorButtons } from './CalculatorButtons';
import { CalculatorHistory } from './CalculatorHistory';
import { CalculatorMemory } from './CalculatorMemory';
import { CalculatorThemeToggle } from './CalculatorThemeToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalculatorState, Operation, CalculationEntry, MemoryOperation } from '@/types/calculator';
import { 
  performOperation, 
  performUnaryOperation, 
  formatDisplayValue, 
  parseDisplayValue,
  createHistoryEntry,
  validateCalculatorState
} from '@/lib/calculator';
import { 
  DEFAULT_CALCULATOR_STATE, 
  MAX_DISPLAY_LENGTH, 
  MAX_HISTORY_ENTRIES 
} from '@/lib/constants';
import { 
  saveToLocalStorage, 
  loadFromLocalStorage, 
  getSystemTheme,
  debounce 
} from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * Main calculator component
 * Handles all calculator logic, state management, and user interactions
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>(() => {
    const savedState = loadFromLocalStorage('calculator-state', DEFAULT_CALCULATOR_STATE);
    return {
      ...savedState,
      theme: getSystemTheme(),
    };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('calculator-state', state);
  }, [state]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  // Handle button clicks
  const handleButtonClick = useCallback((value: string) => {
    setState(prevState => {
      const newState = { ...prevState };
      
      switch (value) {
        case 'C':
          return { ...DEFAULT_CALCULATOR_STATE, theme: newState.theme };
          
        case 'CE':
          newState.display = '0';
          newState.waitingForOperand = false;
          break;
          
        case '±':
          const currentValue = parseDisplayValue(newState.display);
          const result = performUnaryOperation(currentValue, '±');
          newState.display = formatDisplayValue(result.result);
          break;
          
        case '√':
          const sqrtValue = parseDisplayValue(newState.display);
          const sqrtResult = performUnaryOperation(sqrtValue, '√');
          if (sqrtResult.error) {
            newState.display = 'Error';
          } else {
            newState.display = formatDisplayValue(sqrtResult.result);
            newState.waitingForOperand = true;
          }
          break;
          
        case '1/x':
          const recipValue = parseDisplayValue(newState.display);
          const recipResult = performUnaryOperation(recipValue, '1/x');
          if (recipResult.error) {
            newState.display = 'Error';
          } else {
            newState.display = formatDisplayValue(recipResult.result);
            newState.waitingForOperand = true;
          }
          break;
          
        case '=':
          if (newState.previousValue !== null && newState.operation) {
            const currentVal = parseDisplayValue(newState.display);
            const operationResult = performOperation(
              newState.previousValue,
              currentVal,
              newState.operation
            );
            
            if (operationResult.error) {
              newState.display = 'Error';
            } else {
              const result = operationResult.result;
              newState.display = formatDisplayValue(result);
              
              // Add to history
              const expression = `${newState.previousValue} ${newState.operation} ${currentVal}`;
              const historyEntry = createHistoryEntry(expression, result);
              newState.history = [
                ...newState.history.slice(-(MAX_HISTORY_ENTRIES - 1)),
                historyEntry
              ];
            }
            
            newState.previousValue = null;
            newState.operation = null;
            newState.waitingForOperand = true;
          }
          break;
          
        case '+':
        case '-':
        case '×':
        case '÷':
        case '^':
        case '%':
          if (newState.previousValue !== null && newState.operation && !newState.waitingForOperand) {
            const currentVal = parseDisplayValue(newState.display);
            const operationResult = performOperation(
              newState.previousValue,
              currentVal,
              newState.operation
            );
            
            if (operationResult.error) {
              newState.display = 'Error';
            } else {
              newState.display = formatDisplayValue(operationResult.result);
            }
          } else {
            newState.previousValue = parseDisplayValue(newState.display);
          }
          
          newState.operation = value as Operation;
          newState.waitingForOperand = true;
          break;
          
        default:
          // Number or decimal input
          if (newState.waitingForOperand) {
            newState.display = value;
            newState.waitingForOperand = false;
          } else {
            if (value === '.' && newState.display.includes('.')) {
              return newState; // Don't add multiple decimal points
            }
            
            const newDisplay = newState.display === '0' ? value : newState.display + value;
            if (newDisplay.length <= MAX_DISPLAY_LENGTH) {
              newState.display = newDisplay;
            }
          }
          break;
      }
      
      return newState;
    });
  }, []);

  // Handle memory operations
  const handleMemoryOperation = useCallback((operation: MemoryOperation) => {
    setState(prevState => {
      const newState = { ...prevState };
      const currentValue = parseDisplayValue(newState.display);
      
      switch (operation) {
        case 'M+':
          newState.memory += currentValue;
          newState.memoryActive = true;
          break;
        case 'M-':
          newState.memory -= currentValue;
          newState.memoryActive = true;
          break;
        case 'MR':
          newState.display = formatDisplayValue(newState.memory);
          newState.waitingForOperand = true;
          break;
        case 'MC':
          newState.memory = 0;
          newState.memoryActive = false;
          break;
      }
      
      return newState;
    });
  }, []);

  // Handle history entry usage
  const handleUseHistoryEntry = useCallback((entry: CalculationEntry) => {
    setState(prevState => ({
      ...prevState,
      display: formatDisplayValue(entry.result),
      waitingForOperand: true,
    }));
  }, []);

  // Handle history clear
  const handleClearHistory = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      history: [],
    }));
  }, []);

  // Handle theme change
  const handleThemeChange = useCallback((theme: 'light' | 'dark') => {
    setState(prevState => ({
      ...prevState,
      theme,
    }));
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      // Prevent default for calculator keys
      if (/[0-9+\-*/.=]/.test(key) || ['Enter', 'Escape', 'Backspace', 'Delete'].includes(key)) {
        event.preventDefault();
      }
      
      // Map keyboard keys to calculator functions
      if (key === 'Enter' || key === '=') {
        handleButtonClick('=');
      } else if (key === 'Escape') {
        handleButtonClick('C');
      } else if (key === 'Backspace') {
        handleButtonClick('CE');
      } else if (key === '*') {
        handleButtonClick('×');
      } else if (key === '/') {
        handleButtonClick('÷');
      } else if (/[0-9+\-.]/.test(key)) {
        handleButtonClick(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleButtonClick]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Calculator
          </h1>
          <CalculatorThemeToggle
            theme={state.theme}
            onThemeChange={handleThemeChange}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-bold">Calculator</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CalculatorDisplay
                  value={state.display}
                  operation={state.operation}
                  previousValue={state.previousValue}
                  className="mb-4"
                />
                <CalculatorButtons onButtonClick={handleButtonClick} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CalculatorMemory
              memory={state.memory}
              memoryActive={state.memoryActive}
              onMemoryOperation={handleMemoryOperation}
            />
            <CalculatorHistory
              history={state.history}
              onClearHistory={handleClearHistory}
              onUseHistoryEntry={handleUseHistoryEntry}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
