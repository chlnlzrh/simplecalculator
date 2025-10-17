'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error component for the calculator app
 * Shows error state with recovery options
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-screen">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-lg font-bold text-red-600 dark:text-red-400">
              Calculator Error
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
              Something went wrong with the calculator. This might be due to:
            </p>
            <ul className="text-xs font-normal text-gray-600 dark:text-gray-400 text-left space-y-1">
              <li>• Browser compatibility issues</li>
              <li>• JavaScript errors</li>
              <li>• Memory limitations</li>
              <li>• Network connectivity problems</li>
            </ul>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs font-mono text-left">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Error details:</p>
              <p className="text-red-600 dark:text-red-400 break-all">
                {error.message || 'Unknown error occurred'}
              </p>
              {error.digest && (
                <p className="text-gray-500 dark:text-gray-500 mt-1">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                onClick={reset}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Page
              </Button>
            </div>

            <div className="text-xs font-normal text-gray-500 dark:text-gray-400">
              <p>If the problem persists, please:</p>
              <ul className="mt-2 space-y-1">
                <li>• Check your browser console for more details</li>
                <li>• Try refreshing the page</li>
                <li>• Clear your browser cache</li>
                <li>• Try a different browser</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
