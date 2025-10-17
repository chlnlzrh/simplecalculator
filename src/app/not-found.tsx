import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Calculator } from 'lucide-react';

/**
 * 404 Not Found component for the calculator app
 * Shows when a page is not found
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-screen">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Calculator className="h-12 w-12 text-gray-400" />
            </div>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
              Page Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            
            <div className="flex gap-3 justify-center">
              <Link href="/">
                <Button className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Calculator
                </Button>
              </Link>
            </div>

            <div className="text-xs font-normal text-gray-500 dark:text-gray-400">
              <p>You can:</p>
              <ul className="mt-2 space-y-1">
                <li>• Return to the calculator</li>
                <li>• Check the URL for typos</li>
                <li>• Use the navigation menu</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
