'use client';

import React, { useState } from 'react';
import { Layers, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { breakdownTask, createTask } from '@/lib/tasks';
import { Task } from '@/lib/types';

interface TaskBreakdownProps {
  onAddTasks: (tasks: Task[]) => void;
}

export function TaskBreakdown({ onAddTasks }: TaskBreakdownProps) {
  const [taskInput, setTaskInput] = useState('');
  const [granularity, setGranularity] = useState(3);
  const [breakdown, setBreakdown] = useState<{ category: string; steps: string[] } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBreakdown = () => {
    if (!taskInput.trim()) return;

    setIsProcessing(true);
    // Simulate a brief delay for "AI" effect
    setTimeout(() => {
      const result = breakdownTask(taskInput, granularity);
      setBreakdown(result);
      setIsProcessing(false);
    }, 500);
  };

  const handleAddSteps = () => {
    if (!breakdown) return;

    const tasks = breakdown.steps.map(step => createTask(step, { estimatedMinutes: 5 }));
    onAddTasks(tasks);
    setTaskInput('');
    setBreakdown(null);
  };

  const handleAddSingle = (step: string) => {
    const task = createTask(step, { estimatedMinutes: 5 });
    onAddTasks([task]);
  };

  const granularityLabels = {
    1: 'Super simple',
    2: 'Simple',
    3: 'Balanced',
    4: 'Detailed',
    5: 'Very detailed',
  };

  return (
    <div className="space-y-6">
      {/* Input section */}
      <Card variant="outlined" className="p-6">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary-500" />
          What feels overwhelming?
        </h3>

        <Input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder='e.g., "Clean the house" or "Start my taxes"'
          className="mb-4"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleBreakdown();
            }
          }}
        />

        {/* Granularity slider */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step size
            </label>
            <span className="text-sm text-primary-600 dark:text-primary-400">
              {granularityLabels[granularity as keyof typeof granularityLabels]}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={granularity}
            onChange={(e) => setGranularity(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
            <span>Fewer, bigger steps</span>
            <span>More, smaller steps</span>
          </div>
        </div>

        <Button
          onClick={handleBreakdown}
          disabled={!taskInput.trim() || isProcessing}
          isLoading={isProcessing}
          className="w-full"
        >
          <Layers className="w-4 h-4 mr-2" />
          Break it down
        </Button>
      </Card>

      {/* Results section */}
      {breakdown && (
        <Card variant="gentle" className="p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Here's your plan:
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300">
              {breakdown.category}
            </span>
          </div>

          <ol className="space-y-3 mb-6">
            {breakdown.steps.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-3 group"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-sm font-medium text-primary-700 dark:text-primary-300">
                  {index + 1}
                </span>
                <span className="flex-1 text-gray-700 dark:text-gray-300 pt-0.5">
                  {step}
                </span>
                <button
                  onClick={() => handleAddSingle(step)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 text-primary-600 dark:text-primary-400 transition-opacity"
                  title="Add this step only"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ol>

          <div className="flex gap-3">
            <Button onClick={handleAddSteps} className="flex-1">
              Add all as tasks
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setBreakdown(null)}
            >
              Clear
            </Button>
          </div>
        </Card>
      )}

      {/* Explanation */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>How it works:</strong> We analyze your task and suggest a series of smaller,
          more manageable steps. Adjust the slider to get fewer big steps or more tiny steps
          based on what works for you today.
        </p>
      </div>
    </div>
  );
}
