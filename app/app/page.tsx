'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Zap, Layers } from 'lucide-react';
import { useTasks } from '@/components/providers/TaskProvider';
import { TaskCard } from '@/components/app/TaskCard';
import { QuickWins } from '@/components/app/QuickWins';
import { TaskBreakdown } from '@/components/app/TaskBreakdown';
import { OnboardingModal } from '@/components/app/OnboardingModal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Task } from '@/lib/types';

type View = 'focus' | 'quick-wins' | 'breakdown';

export default function AppPage() {
  const {
    currentTask,
    incompleteTasks,
    quickWins,
    completeTask,
    shuffleCurrent,
    addTask,
    addTasks,
  } = useTasks();

  const [view, setView] = useState<View>('focus');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [newTaskMinutes, setNewTaskMinutes] = useState<string>('');

  // Check for success query param (from Stripe)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('success') === 'true') {
        // Could show a celebration message here
      }
    }
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskContent.trim()) return;

    addTask(newTaskContent, newTaskMinutes ? parseInt(newTaskMinutes) : undefined);
    setNewTaskContent('');
    setNewTaskMinutes('');
    setShowAddTask(false);
  };

  const handleBreakdownTasks = (subtasks: Task[]) => {
    addTasks(subtasks);
    setView('focus');
  };

  const handleSelectQuickWin = (task: Task) => {
    // Could implement task selection/reordering
    setView('focus');
  };

  return (
    <div>
      {/* Onboarding modal for first-time users */}
      <OnboardingModal />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {view === 'focus' && 'One Thing'}
          {view === 'quick-wins' && 'Quick Wins'}
          {view === 'breakdown' && 'Break It Down'}
        </h1>

        <button
          onClick={() => setShowAddTask(true)}
          className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
          aria-label="Add task"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* View tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView('focus')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            view === 'focus'
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Focus
        </button>
        <button
          onClick={() => setView('quick-wins')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            view === 'quick-wins'
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Zap className="w-4 h-4" />
          Quick Wins
          {quickWins.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-yellow-400 text-yellow-900 text-xs">
              {quickWins.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setView('breakdown')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            view === 'breakdown'
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          Breakdown
        </button>
      </div>

      {/* Main content */}
      {view === 'focus' && (
        <>
          {currentTask ? (
            <TaskCard
              task={currentTask}
              onComplete={() => completeTask(currentTask.id)}
              onShuffle={shuffleCurrent}
              onBreakdown={handleBreakdownTasks}
            />
          ) : (
            <Card variant="gentle" className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-sage-100 dark:bg-sage-900 flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-sage-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                All clear!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You have no tasks right now. Enjoy this moment, or add something new.
              </p>
              <Button onClick={() => setShowAddTask(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add a task
              </Button>
            </Card>
          )}

          {/* Task count */}
          {incompleteTasks.length > 1 && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-6">
              {incompleteTasks.length - 1} more {incompleteTasks.length - 1 === 1 ? 'task' : 'tasks'} waiting
            </p>
          )}
        </>
      )}

      {view === 'quick-wins' && (
        <QuickWins
          tasks={incompleteTasks}
          onComplete={completeTask}
          onSelectTask={handleSelectQuickWin}
        />
      )}

      {view === 'breakdown' && (
        <TaskBreakdown onAddTasks={handleBreakdownTasks} />
      )}

      {/* Add task modal/drawer */}
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowAddTask(false)}
          />
          <Card
            variant="elevated"
            className="relative w-full max-w-md animate-slide-up"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Add a task
            </h2>
            <form onSubmit={handleAddTask}>
              <Input
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
                placeholder="What needs to happen?"
                autoFocus
                className="mb-3"
              />
              <div className="flex items-center gap-3 mb-4">
                <Input
                  type="number"
                  min="1"
                  max="120"
                  value={newTaskMinutes}
                  onChange={(e) => setNewTaskMinutes(e.target.value)}
                  placeholder="Est. minutes (optional)"
                  className="w-48"
                />
                {newTaskMinutes && parseInt(newTaskMinutes) <= 5 && (
                  <span className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400">
                    <Zap className="w-4 h-4" />
                    Quick win!
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="flex-1" disabled={!newTaskContent.trim()}>
                  Add Task
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowAddTask(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
