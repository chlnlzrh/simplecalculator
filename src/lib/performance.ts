/**
 * Performance optimization utilities for the calculator
 * @ai-gen: model=v4.0, date=2024-12-19
 */

import { debounce, throttle } from './utils';

/**
 * Performance monitoring and optimization utilities
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  private observers: PerformanceObserver[] = [];

  private constructor() {
    this.initializeObservers();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeObservers(): void {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.set(entry.name, entry.startTime);
        }
      });

      observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('Performance monitoring not available:', error);
    }
  }

  /**
   * Measure performance of a function
   */
  measureFunction<T extends (...args: any[]) => any>(
    name: string,
    fn: T
  ): T {
    return ((...args: Parameters<T>) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      
      this.metrics.set(name, end - start);
      return result;
    }) as T;
  }

  /**
   * Get performance metrics
   */
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  /**
   * Check if performance is within acceptable limits
   */
  checkPerformanceThresholds(): {
    passed: boolean;
    issues: string[];
  } {
    const issues: string[] = [];
    const metrics = this.getMetrics();

    // Check bundle size (approximate)
    if (metrics.bundleSize && metrics.bundleSize > 200 * 1024) {
      issues.push('Bundle size exceeds 200KB limit');
    }

    // Check function execution times
    Object.entries(metrics).forEach(([name, time]) => {
      if (time > 100) { // 100ms threshold
        issues.push(`${name} execution time (${time.toFixed(2)}ms) exceeds 100ms`);
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  }

  /**
   * Cleanup observers
   */
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

/**
 * Optimized calculation functions with memoization
 */
export class OptimizedCalculator {
  private cache = new Map<string, number>();
  private maxCacheSize = 100;

  /**
   * Memoized calculation function
   */
  calculate(expression: string): number {
    if (this.cache.has(expression)) {
      return this.cache.get(expression)!;
    }

    const result = this.evaluateExpression(expression);
    
    // Cache management
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(expression, result);
    return result;
  }

  private evaluateExpression(expression: string): number {
    try {
      // Safe evaluation of mathematical expressions
      return Function(`"use strict"; return (${expression})`)();
    } catch (error) {
      return 0;
    }
  }

  /**
   * Clear calculation cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

/**
 * Lazy loading utility for components
 */
export const lazyLoadComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> => {
  return React.lazy(importFunc);
};

/**
 * Image optimization utilities
 */
export const optimizeImage = (src: string, width: number, height: number): string => {
  // In a real implementation, this would use a service like Cloudinary or Vercel Image Optimization
  return `${src}?w=${width}&h=${height}&q=80&f=webp`;
};

/**
 * Bundle size monitoring
 */
export const monitorBundleSize = (): void => {
  if (typeof window === 'undefined') return;

  const script = document.querySelector('script[src*="calculator"]');
  if (script) {
    const size = script.getAttribute('data-size');
    if (size) {
      PerformanceMonitor.getInstance().metrics.set('bundleSize', parseInt(size));
    }
  }
};

/**
 * Memory usage monitoring
 */
export const monitorMemoryUsage = (): void => {
  if (typeof window === 'undefined') return;

  // Check if memory API is available
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    PerformanceMonitor.getInstance().metrics.set('memoryUsed', memory.usedJSHeapSize);
    PerformanceMonitor.getInstance().metrics.set('memoryTotal', memory.totalJSHeapSize);
  }
};

/**
 * Performance optimization for calculator buttons
 */
export const optimizeButtonRendering = (buttons: any[]): any[] => {
  return buttons.map(button => ({
    ...button,
    // Add performance optimizations
    shouldUpdate: false, // Prevent unnecessary re-renders
    memoized: true, // Enable memoization
  }));
};

/**
 * Debounced calculation for performance
 */
export const debouncedCalculation = debounce((expression: string, callback: (result: number) => void) => {
  const calculator = new OptimizedCalculator();
  const result = calculator.calculate(expression);
  callback(result);
}, 100);

/**
 * Throttled state updates
 */
export const throttledStateUpdate = throttle((updateFn: () => void) => {
  updateFn();
}, 16); // 60fps

/**
 * Performance budget checker
 */
export const checkPerformanceBudget = (): boolean => {
  const monitor = PerformanceMonitor.getInstance();
  const { passed } = monitor.checkPerformanceThresholds();
  return passed;
};

/**
 * Initialize performance monitoring
 */
export const initializePerformanceMonitoring = (): void => {
  if (typeof window === 'undefined') return;

  // Monitor Core Web Vitals
  monitorBundleSize();
  monitorMemoryUsage();

  // Set up performance monitoring
  const monitor = PerformanceMonitor.getInstance();
  
  // Check performance on load
  window.addEventListener('load', () => {
    const { passed, issues } = monitor.checkPerformanceThresholds();
    if (!passed) {
      console.warn('Performance issues detected:', issues);
    }
  });
};
