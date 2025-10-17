'use client';

import React from 'react';
import { CalculatorButton } from './CalculatorButton';
import { CALCULATOR_BUTTONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CalculatorButtonsProps {
  onButtonClick: (value: string) => void;
  className?: string;
}

/**
 * Calculator button grid component
 * Renders all calculator buttons in a responsive grid layout
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export const CalculatorButtons: React.FC<CalculatorButtonsProps> = ({
  onButtonClick,
  className,
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-4 gap-2 p-4',
        'sm:gap-3 sm:p-6',
        className
      )}
      role="grid"
      aria-label="Calculator buttons"
    >
      {CALCULATOR_BUTTONS.map((button) => (
        <CalculatorButton
          key={button.id}
          button={button}
          onClick={onButtonClick}
          className={cn(
            'col-span-1',
            button.id === 'equals' && 'col-span-2',
            button.id === '0' && 'col-span-2'
          )}
        />
      ))}
    </div>
  );
};
