import React from 'react';
import { render, screen } from '@testing-library/react';
import { CalculatorDisplay } from '@/components/calculator/CalculatorDisplay';

describe('CalculatorDisplay', () => {
  it('should render display value correctly', () => {
    render(<CalculatorDisplay value="123.45" />);
    expect(screen.getByText('123.45')).toBeInTheDocument();
  });

  it('should render operation and previous value', () => {
    render(
      <CalculatorDisplay 
        value="5" 
        operation="+" 
        previousValue={10} 
      />
    );
    expect(screen.getByText('10 +')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should handle scientific notation for large numbers', () => {
    render(<CalculatorDisplay value="1e15" />);
    expect(screen.getByText(/e\+/)).toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    render(<CalculatorDisplay value="123" />);
    const display = screen.getByRole('textbox');
    expect(display).toHaveAttribute('aria-label', 'Calculator display showing 123');
    expect(display).toHaveAttribute('tabIndex', '-1');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <CalculatorDisplay value="123" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should handle zero value', () => {
    render(<CalculatorDisplay value="0" />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should handle error display', () => {
    render(<CalculatorDisplay value="Error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
