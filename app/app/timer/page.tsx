'use client';

import React from 'react';
import { Timer } from 'lucide-react';
import { VisualTimer } from '@/components/app/VisualTimer';

export default function TimerPage() {
  const handleTimerComplete = (actualMinutes: number, perceivedMinutes?: number) => {
    // Session is saved in the VisualTimer component
    // Could add additional analytics or notifications here
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-cyan-100 dark:bg-cyan-900/30">
          <Timer className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Visual Timer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Focus without the number stress
          </p>
        </div>
      </div>

      {/* Timer component */}
      <div className="flex justify-center">
        <VisualTimer onComplete={handleTimerComplete} />
      </div>
    </div>
  );
}
