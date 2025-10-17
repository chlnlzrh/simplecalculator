'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { formatDisplayValue } from '@/lib/calculator';

interface CalculatorDisplayProps {
  value: string;
  operation?: string | null;
  previousValue?: number | null;
  className?: string;
}

/**
 * Calculator display component
 * Shows current value, operation, and previous value
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  value,
  operation,
  previousValue,
  className,
}) => {
  const displayValue = value;
  const operationSymbol = operation ? getOperationSymbol(operation) : '';

  return (
    <div
      className={cn(
        'flex flex-col items-end justify-end p-4 bg-white dark:bg-gray-900 rounded-lg min-h-[80px]',
        'border-2 border-gray-300 dark:border-gray-600', // Enhanced border for contrast
        'shadow-inner', // Inner shadow for depth
        className
      )}
      role="textbox"
      aria-label={`Calculator display showing ${displayValue}`}
      tabIndex={-1}
    >
      {/* Previous value and operation */}
      {(previousValue !== null || operation) && (
        <div className="text-xs font-normal text-gray-700 dark:text-gray-300 mb-1">
          {previousValue !== null && previousValue !== undefined && formatDisplayValue(previousValue)}
          {operationSymbol && ` ${operationSymbol}`}
        </div>
      )}
      
      {/* Current value */}
      <div className="text-2xl font-bold text-black dark:text-white text-right break-all">
        {displayValue}
      </div>
    </div>
  );
};

/**
 * Get operation symbol for display
 */
function getOperationSymbol(operation: string): string {
  const symbols: Record<string, string> = {
    '+': '+',
    '-': '−',
    '×': '×',
    '÷': '÷',
    '√': '√',
    '^': '^',
    '%': '%',
  };
  
  return symbols[operation] || operation;
}
