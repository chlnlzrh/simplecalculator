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
        'flex flex-col items-end justify-end p-4 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[80px]',
        className
      )}
      role="textbox"
      aria-label={`Calculator display showing ${displayValue}`}
      tabIndex={-1}
    >
      {/* Previous value and operation */}
      {(previousValue !== null || operation) && (
        <div className="text-xs font-normal text-gray-500 dark:text-gray-400 mb-1">
          {previousValue !== null && previousValue !== undefined && formatDisplayValue(previousValue)}
          {operationSymbol && ` ${operationSymbol}`}
        </div>
      )}
      
      {/* Current value */}
      <div className="text-2xl font-bold text-gray-900 dark:text-white text-right break-all">
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
