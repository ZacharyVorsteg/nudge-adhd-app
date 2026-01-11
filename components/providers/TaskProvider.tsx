'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Task, UserPreferences } from '@/lib/types';
import {
  getTasks,
  saveTasks,
  getPreferences,
  savePreferences,
  completeTask as storageCompleteTask,
  deleteTask as storageDeleteTask,
} from '@/lib/storage';
import { createTask, getNextTask, shuffleTaskToEnd, getRandomTask } from '@/lib/tasks';

interface TaskContextType {
  tasks: Task[];
  preferences: UserPreferences;
  currentTask: Task | null;
  isLoading: boolean;

  // Task actions
  addTask: (content: string, estimatedMinutes?: number) => void;
  addTasks: (tasks: Task[]) => void;
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
  shuffleCurrent: () => void;
  updateTask: (id: string, updates: Partial<Task>) => void;

  // Preference actions
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Derived data
  incompleteTasks: Task[];
  quickWins: Task[];
  completedTasks: Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'system',
    isPro: false,
    onboardingComplete: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    setTasks(getTasks());
    setPreferences(getPreferences());
    setIsLoading(false);
  }, []);

  // Apply theme
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const applyTheme = (theme: 'light' | 'dark' | 'system') => {
      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', isDark);
      } else {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }
    };

    applyTheme(preferences.theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (preferences.theme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [preferences.theme]);

  const incompleteTasks = tasks.filter(t => !t.completed && !t.parentId);
  const quickWins = incompleteTasks.filter(t => t.isQuickWin);
  const completedTasks = tasks.filter(t => t.completed);
  const currentTask = getNextTask(tasks);

  const addTask = useCallback((content: string, estimatedMinutes?: number) => {
    const task = createTask(content, { estimatedMinutes });
    const newTasks = [task, ...tasks];
    setTasks(newTasks);
    saveTasks(newTasks);
  }, [tasks]);

  const addTasks = useCallback((newTasksToAdd: Task[]) => {
    const newTasks = [...newTasksToAdd, ...tasks];
    setTasks(newTasks);
    saveTasks(newTasks);
  }, [tasks]);

  const completeTask = useCallback((id: string) => {
    const newTasks = tasks.map(t =>
      t.id === id
        ? { ...t, completed: true, completedAt: new Date().toISOString() }
        : t
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  }, [tasks]);

  const deleteTask = useCallback((id: string) => {
    const newTasks = tasks.filter(t => t.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks);
  }, [tasks]);

  const shuffleCurrent = useCallback(() => {
    if (!currentTask) return;
    const newTasks = shuffleTaskToEnd([...tasks], currentTask.id);
    setTasks(newTasks);
    saveTasks(newTasks);
  }, [tasks, currentTask]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    const newTasks = tasks.map(t =>
      t.id === id ? { ...t, ...updates } : t
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  }, [tasks]);

  const updatePreferencesAction = useCallback((updates: Partial<UserPreferences>) => {
    const newPrefs = { ...preferences, ...updates };
    setPreferences(newPrefs);
    savePreferences(newPrefs);
  }, [preferences]);

  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    updatePreferencesAction({ theme });
  }, [updatePreferencesAction]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        preferences,
        currentTask,
        isLoading,
        addTask,
        addTasks,
        completeTask,
        deleteTask,
        shuffleCurrent,
        updateTask,
        updatePreferences: updatePreferencesAction,
        setTheme,
        incompleteTasks,
        quickWins,
        completedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
