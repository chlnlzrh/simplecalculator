'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn, generateAriaLabel, getAccessibleButtonSize } from '@/lib/utils';
import { CalculatorButton as CalculatorButtonType } from '@/types/calculator';

interface CalculatorButtonProps {
  button: CalculatorButtonType;
  onClick: (value: string) => void;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Individual calculator button component
 * Handles accessibility, keyboard navigation, and visual feedback
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  button,
  onClick,
  isActive = false,
  disabled = false,
  className,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(button.value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const getButtonVariant = (): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (button.type) {
      case 'operation':
      case 'equals':
        return 'default';
      case 'function':
        return 'secondary';
      case 'memory':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getButtonSize = (): 'default' | 'sm' | 'lg' | 'icon' => {
    if (button.type === 'equals') {
      return 'lg';
    }
    return 'default';
  };

  return (
    <Button
      id={button.id}
      variant={getButtonVariant()}
      size={getButtonSize()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={cn(
        getAccessibleButtonSize(),
        'text-xs font-normal transition-all duration-150',
        'hover:scale-105 active:scale-95',
        'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        button.className,
        isActive && 'ring-2 ring-blue-500 bg-blue-100 dark:bg-blue-900',
        className
      )}
      aria-label={generateAriaLabel(button.label, button.type)}
      aria-pressed={isActive}
      role="button"
      tabIndex={0}
    >
      {button.label}
    </Button>
  );
};
