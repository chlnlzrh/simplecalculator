'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn, formatNumber } from '@/lib/utils';
import { Memory, Plus, Minus, RotateCcw } from 'lucide-react';

interface CalculatorMemoryProps {
  memory: number;
  memoryActive: boolean;
  onMemoryOperation: (operation: 'M+' | 'M-' | 'MR' | 'MC') => void;
  className?: string;
}

/**
 * Calculator memory component
 * Shows memory status and provides memory operations
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export const CalculatorMemory: React.FC<CalculatorMemoryProps> = ({
  memory,
  memoryActive,
  onMemoryOperation,
  className,
}) => {
  const memoryButtons = [
    { id: 'mc', label: 'MC', operation: 'MC' as const, icon: RotateCcw, disabled: !memoryActive },
    { id: 'mr', label: 'MR', operation: 'MR' as const, icon: Memory, disabled: !memoryActive },
    { id: 'm+', label: 'M+', operation: 'M+' as const, icon: Plus, disabled: false },
    { id: 'm-', label: 'M-', operation: 'M-' as const, icon: Minus, disabled: false },
  ];

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-bold flex items-center gap-2">
          <Memory className="h-4 w-4" />
          Memory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Memory value display */}
          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
              Current:
            </span>
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              {formatNumber(memory)}
            </span>
          </div>
          
          {/* Memory status */}
          <div className="flex items-center gap-2">
            <div className={cn(
              'w-2 h-2 rounded-full',
              memoryActive ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
            )} />
            <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
              {memoryActive ? 'Active' : 'Empty'}
            </span>
          </div>
          
          {/* Memory operation buttons */}
          <div className="grid grid-cols-2 gap-2">
            {memoryButtons.map((button) => {
              const Icon = button.icon;
              return (
                <Button
                  key={button.id}
                  variant="outline"
                  size="sm"
                  onClick={() => onMemoryOperation(button.operation)}
                  disabled={button.disabled}
                  className="text-xs flex items-center gap-1"
                >
                  <Icon className="h-3 w-3" />
                  {button.label}
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
