import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalculatorButton } from '@/components/calculator/CalculatorButton';
import { CalculatorButton as CalculatorButtonType } from '@/types/calculator';

const mockButton: CalculatorButtonType = {
  id: 'test-button',
  label: 'Test',
  value: 'test',
  type: 'number',
  className: 'test-class',
  ariaLabel: 'Test button',
};

describe('CalculatorButton', () => {
  it('should render button with correct label', () => {
    const mockOnClick = jest.fn();
    render(
      <CalculatorButton 
        button={mockButton} 
        onClick={mockOnClick} 
      />
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(
      <CalculatorButton 
        button={mockButton} 
        onClick={mockOnClick} 
      />
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledWith('test');
  });

  it('should handle keyboard events', () => {
    const mockOnClick = jest.fn();
    render(
      <CalculatorButton 
        button={mockButton} 
        onClick={mockOnClick} 
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(mockOnClick).toHaveBeenCalledWith('test');
  });

  it('should not call onClick when disabled', () => {
    const mockOnClick = jest.fn();
    render(
      <CalculatorButton 
        button={mockButton} 
        onClick={mockOnClick} 
        disabled={true}
      />
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should show active state', () => {
    render(
      <CalculatorButton 
        button={mockButton} 
        onClick={jest.fn()} 
        isActive={true}
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('should have correct accessibility attributes', () => {
    render(
      <CalculatorButton 
        button={mockButton} 
        onClick={jest.fn()} 
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Test button');
    expect(button).toHaveAttribute('tabIndex', '0');
  });

  it('should apply custom className', () => {
    render(
      <CalculatorButton 
        button={mockButton} 
        onClick={jest.fn()} 
        className="custom-class"
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should handle different button types', () => {
    const operationButton: CalculatorButtonType = {
      ...mockButton,
      type: 'operation',
    };
    
    render(
      <CalculatorButton 
        button={operationButton} 
        onClick={jest.fn()} 
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
