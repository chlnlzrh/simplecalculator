'use client';

import React from 'react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Sun, Moon } from 'lucide-react';

interface CalculatorThemeToggleProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
  className?: string;
}

/**
 * Calculator theme toggle component
 * Allows switching between light and dark themes
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export const CalculatorThemeToggle: React.FC<CalculatorThemeToggleProps> = ({
  theme,
  onThemeChange,
  className,
}) => {
  const handleToggle = (checked: boolean) => {
    onThemeChange(checked ? 'dark' : 'light');
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Sun className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={handleToggle}
        aria-label="Toggle theme"
        className="data-[state=checked]:bg-gray-900 data-[state=unchecked]:bg-gray-200"
      />
      <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    </div>
  );
};
