import React from 'react';

/**
 * Loading component for the calculator app
 * Shows skeleton loading state while components load
 * @ai-gen: model=v4.0, date=2024-12-19
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main calculator skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
              {/* Display skeleton */}
              <div className="p-4">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
              </div>
              
              {/* Buttons skeleton */}
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            {/* Memory skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4">
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* History skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4">
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
