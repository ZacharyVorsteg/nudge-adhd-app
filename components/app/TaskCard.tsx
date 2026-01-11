'use client';

import React, { useState } from 'react';
import { Check, Shuffle, ChevronDown, Layers } from 'lucide-react';
import { Task } from '@/lib/types';
import { getTimeAgo, breakdownTask, createSubtasksFromBreakdown } from '@/lib/tasks';
import { getRandomEncouragement } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/providers/ToastProvider';

interface TaskCardProps {
  task: Task;
  onComplete: () => void;
  onShuffle: () => void;
  onBreakdown?: (subtasks: Task[]) => void;
}

export function TaskCard({ task, onComplete, onShuffle, onBreakdown }: TaskCardProps) {
  const toast = useToast();
  const [isCompleting, setIsCompleting] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [encouragement, setEncouragement] = useState('');
  const [isBreakingDown, setIsBreakingDown] = useState(false);
  const [breakdownSteps, setBreakdownSteps] = useState<string[]>([]);

  const handleComplete = () => {
    setIsCompleting(true);
    setEncouragement(getRandomEncouragement());
    setShowEncouragement(true);

    setTimeout(() => {
      onComplete();
      setIsCompleting(false);
      setShowEncouragement(false);
      toast.success('Task completed!');
    }, 600);
  };

  const handleBreakdown = () => {
    if (isBreakingDown) {
      setIsBreakingDown(false);
      setBreakdownSteps([]);
      return;
    }

    const { steps } = breakdownTask(task.content, 3);
    setBreakdownSteps(steps);
    setIsBreakingDown(true);
  };

  const handleUseBreakdown = () => {
    if (onBreakdown) {
      const subtasks = createSubtasksFromBreakdown(task, breakdownSteps);
      onBreakdown(subtasks);
    }
  };

  return (
    <div className="relative">
      {/* Encouragement overlay */}
      {showEncouragement && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-sage-50/90 dark:bg-sage-900/90 rounded-3xl animate-fade-in">
          <p className="text-2xl font-medium text-sage-700 dark:text-sage-300">
            {encouragement}
          </p>
        </div>
      )}

      <Card
        variant="elevated"
        className={cn(
          'p-8 text-center transition-all',
          isCompleting && 'task-complete'
        )}
      >
        {/* Time ago */}
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
          Added {getTimeAgo(task.createdAt)}
        </p>

        {/* Task content */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8 leading-relaxed">
          {task.content}
        </h2>

        {/* Estimated time badge */}
        {task.estimatedMinutes && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm mb-6">
            ~{task.estimatedMinutes} min
          </div>
        )}

        {/* Breakdown section */}
        {isBreakingDown && breakdownSteps.length > 0 && (
          <div className="mb-8 text-left bg-warm-50 dark:bg-warm-900/20 rounded-xl p-4 animate-fade-in">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
              Break it down:
            </h3>
            <ol className="space-y-2">
              {breakdownSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-warm-200 dark:bg-warm-800 flex items-center justify-center text-sm font-medium text-warm-700 dark:text-warm-300">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 pt-0.5">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            {onBreakdown && (
              <Button
                variant="gentle"
                size="sm"
                className="mt-4"
                onClick={handleUseBreakdown}
              >
                Use these as tasks
              </Button>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Button
            size="xl"
            onClick={handleComplete}
            disabled={isCompleting}
            className="w-full"
          >
            <Check className="w-5 h-5 mr-2" />
            Done
          </Button>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="lg"
              onClick={onShuffle}
              className="flex-1"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Not now
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={handleBreakdown}
              className="flex-1"
            >
              <Layers className="w-4 h-4 mr-2" />
              {isBreakingDown ? 'Hide' : 'Break down'}
              <ChevronDown
                className={cn(
                  'w-4 h-4 ml-1 transition-transform',
                  isBreakingDown && 'rotate-180'
                )}
              />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
