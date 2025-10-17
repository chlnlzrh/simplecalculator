import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Calculator } from '@/components/calculator/Calculator';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Calculator', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
  });

  it('should render calculator interface', () => {
    render(<Calculator />);
    
    expect(screen.getByText('Calculator')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('should handle number input', () => {
    render(<Calculator />);
    
    const display = screen.getByRole('textbox');
    expect(display).toHaveTextContent('0');
    
    // Click number buttons
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    
    expect(display).toHaveTextContent('123');
  });

  it('should handle basic arithmetic operations', () => {
    render(<Calculator />);
    
    // Enter first number
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    
    const display = screen.getByRole('textbox');
    expect(display).toHaveTextContent('8');
  });

  it('should handle clear operations', () => {
    render(<Calculator />);
    
    // Enter number and clear
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('C'));
    
    const display = screen.getByRole('textbox');
    expect(display).toHaveTextContent('0');
  });

  it('should handle keyboard input', () => {
    render(<Calculator />);
    
    // Simulate keyboard input
    fireEvent.keyDown(document, { key: '5' });
    fireEvent.keyDown(document, { key: '+' });
    fireEvent.keyDown(document, { key: '3' });
    fireEvent.keyDown(document, { key: 'Enter' });
    
    const display = screen.getByRole('textbox');
    expect(display).toHaveTextContent('8');
  });

  it('should handle memory operations', () => {
    render(<Calculator />);
    
    // Enter number and add to memory
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('M+'));
    
    // Clear and recall memory
    fireEvent.click(screen.getByText('C'));
    fireEvent.click(screen.getByText('MR'));
    
    const display = screen.getByRole('textbox');
    expect(display).toHaveTextContent('5');
  });

  it('should handle theme toggle', () => {
    render(<Calculator />);
    
    const themeToggle = screen.getByLabelText('Toggle theme');
    fireEvent.click(themeToggle);
    
    // Check if theme changed (this would be reflected in the DOM)
    expect(document.documentElement).toHaveClass('dark');
  });

  it('should handle decimal input', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('4'));
    
    const display = screen.getByRole('textbox');
    expect(display).toHaveTextContent('3.14');
  });

  it('should handle division by zero', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('÷'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));
    
    const display = screen.getByRole('textbox');
    expect(display).toHaveTextContent('Error');
  });

  it('should handle square root operation', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('√'));
    
    const display = screen.getByRole('textbox');
    expect(display).toHaveTextContent('3');
  });

  it('should handle sign change', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('±'));
    
    const display = screen.getByRole('textbox');
    expect(display).toHaveTextContent('-5');
  });

  it('should save state to localStorage', async () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('5'));
    
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });

  it('should load state from localStorage', () => {
    const savedState = {
      display: '42',
      previousValue: null,
      operation: null,
      waitingForOperand: false,
      memory: 0,
      memoryActive: false,
      history: [],
      theme: 'light',
    };
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedState));
    
    render(<Calculator />);
    
    const display = screen.getByRole('textbox');
    expect(display).toHaveTextContent('42');
  });
});
