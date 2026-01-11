export interface Task {
  id: string;
  content: string;
  subtasks?: Task[];
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  estimatedMinutes?: number;
  isQuickWin: boolean;
  parentId?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  isPro: boolean;
  proType?: 'lifetime' | 'annual';
  stripeCustomerId?: string;
  onboardingComplete: boolean;
}

export interface TimerSession {
  id: string;
  taskId?: string;
  duration: number;
  startedAt: string;
  completedAt?: string;
  perceivedDuration?: number;
}

export interface BreakdownTemplate {
  category: string;
  steps: string[];
}
