import { Task, UserPreferences, TimerSession } from './types';

const STORAGE_KEYS = {
  TASKS: 'nudge_tasks',
  PREFERENCES: 'nudge_preferences',
  TIMER_SESSIONS: 'nudge_timer_sessions',
} as const;

// Check if we're in browser
const isBrowser = typeof window !== 'undefined';

// Tasks
export function getTasks(): Task[] {
  if (!isBrowser) return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
}

export function addTask(task: Task): Task[] {
  const tasks = getTasks();
  tasks.unshift(task);
  saveTasks(tasks);
  return tasks;
}

export function updateTask(id: string, updates: Partial<Task>): Task[] {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
    saveTasks(tasks);
  }
  return tasks;
}

export function deleteTask(id: string): Task[] {
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
  return tasks;
}

export function completeTask(id: string): Task[] {
  return updateTask(id, {
    completed: true,
    completedAt: new Date().toISOString(),
  });
}

export function getIncompleteTasks(): Task[] {
  return getTasks().filter(t => !t.completed);
}

export function getQuickWins(): Task[] {
  return getIncompleteTasks().filter(t => t.isQuickWin);
}

// Preferences
export function getPreferences(): UserPreferences {
  if (!isBrowser) {
    return {
      theme: 'system',
      isPro: false,
      onboardingComplete: false,
    };
  }
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return data
      ? JSON.parse(data)
      : {
          theme: 'system',
          isPro: false,
          onboardingComplete: false,
        };
  } catch {
    return {
      theme: 'system',
      isPro: false,
      onboardingComplete: false,
    };
  }
}

export function savePreferences(preferences: UserPreferences): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
}

export function updatePreferences(updates: Partial<UserPreferences>): UserPreferences {
  const current = getPreferences();
  const updated = { ...current, ...updates };
  savePreferences(updated);
  return updated;
}

// Timer Sessions
export function getTimerSessions(): TimerSession[] {
  if (!isBrowser) return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TIMER_SESSIONS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTimerSession(session: TimerSession): TimerSession[] {
  if (!isBrowser) return [];
  const sessions = getTimerSessions();
  sessions.push(session);
  try {
    localStorage.setItem(STORAGE_KEYS.TIMER_SESSIONS, JSON.stringify(sessions));
  } catch (error) {
    console.error('Failed to save timer session:', error);
  }
  return sessions;
}

// Export all data
export function exportAllData(): string {
  return JSON.stringify({
    tasks: getTasks(),
    preferences: getPreferences(),
    timerSessions: getTimerSessions(),
    exportedAt: new Date().toISOString(),
  }, null, 2);
}

// Import data
export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.tasks) saveTasks(data.tasks);
    if (data.preferences) savePreferences(data.preferences);
    if (data.timerSessions && isBrowser) {
      localStorage.setItem(STORAGE_KEYS.TIMER_SESSIONS, JSON.stringify(data.timerSessions));
    }
    return true;
  } catch {
    return false;
  }
}

// Clear all data
export function clearAllData(): void {
  if (!isBrowser) return;
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}
