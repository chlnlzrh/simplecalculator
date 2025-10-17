'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalculationEntry } from '@/types/calculator';
import { cn, formatNumber } from '@/lib/utils';
import { Trash2, History } from 'lucide-react';

interface CalculatorHistoryProps {
  history: CalculationEntry[];
  onClearHistory: () => void;
  onUseHistoryEntry: (entry: CalculationEntry) => void;
  className?: string;
}

/**
 * Calculator history component
 * Shows calculation history with ability to reuse entries
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export const CalculatorHistory: React.FC<CalculatorHistoryProps> = ({
  history,
  onClearHistory,
  onUseHistoryEntry,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTimestamp = (timestamp: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(timestamp);
  };

  const formatExpression = (expression: string): string => {
    return expression
      .replace(/\*/g, '×')
      .replace(/\//g, '÷')
      .replace(/\^/g, '^');
  };

  if (history.length === 0) {
    return (
      <Card className={cn('w-full', className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs font-normal text-gray-500 dark:text-gray-400 text-center py-4">
            No calculations yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-bold flex items-center gap-2">
            <History className="h-4 w-4" />
            History ({history.length})
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs"
            >
              {isExpanded ? 'Hide' : 'Show'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearHistory}
              className="text-xs text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {history.slice(-10).reverse().map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-normal text-gray-900 dark:text-white truncate">
                    {formatExpression(entry.expression)}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    = {formatNumber(entry.result)}
                  </div>
                  <div className="text-gray-400 dark:text-gray-500 text-xs">
                    {formatTimestamp(entry.timestamp)}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUseHistoryEntry(entry)}
                  className="text-xs ml-2"
                >
                  Use
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
