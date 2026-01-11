'use client';

import React from 'react';
import { Zap, Check, Clock } from 'lucide-react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getTimeAgo } from '@/lib/tasks';
import { useToast } from '@/components/providers/ToastProvider';

interface QuickWinsProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  onSelectTask: (task: Task) => void;
}

export function QuickWins({ tasks, onComplete, onSelectTask }: QuickWinsProps) {
  const toast = useToast();
  const quickWins = tasks.filter(t => t.isQuickWin && !t.completed);

  const handleComplete = (id: string) => {
    onComplete(id);
    toast.success('Task completed!');
  };

  if (quickWins.length === 0) {
    return (
      <Card variant="gentle" className="text-center py-8">
        <Zap className="w-12 h-12 text-warm-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No quick wins right now
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Add some tasks with estimated times under 5 minutes
          to build momentum with small victories.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
          <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Quick Wins
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {quickWins.length} {quickWins.length === 1 ? 'task' : 'tasks'} under 5 minutes
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {quickWins.map((task) => (
          <div
            key={task.id}
            className="group flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 transition-colors"
          >
            {/* Complete button */}
            <button
              onClick={() => handleComplete(task.id)}
              className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-sage-500 dark:hover:border-sage-500 hover:bg-sage-50 dark:hover:bg-sage-900/30 flex items-center justify-center transition-colors"
              aria-label="Mark as complete"
            >
              <Check className="w-4 h-4 text-transparent group-hover:text-sage-500 transition-colors" />
            </button>

            {/* Task content */}
            <button
              onClick={() => onSelectTask(task)}
              className="flex-1 text-left"
            >
              <p className="text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {task.content}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {getTimeAgo(task.createdAt)}
              </p>
            </button>

            {/* Time estimate */}
            {task.estimatedMinutes && (
              <div className="flex-shrink-0 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                {task.estimatedMinutes}m
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Encouragement */}
      <p className="text-sm text-center text-gray-500 dark:text-gray-500 mt-4">
        Pick one and knock it out. Small wins add up.
      </p>
    </div>
  );
}
