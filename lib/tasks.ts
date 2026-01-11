import { v4 as uuidv4 } from 'uuid';
import { Task, BreakdownTemplate } from './types';

// Create a new task
export function createTask(
  content: string,
  options?: {
    estimatedMinutes?: number;
    parentId?: string;
  }
): Task {
  const isQuickWin = (options?.estimatedMinutes ?? 0) <= 5;

  return {
    id: uuidv4(),
    content: content.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    isQuickWin,
    estimatedMinutes: options?.estimatedMinutes,
    parentId: options?.parentId,
  };
}

// Parse brain dump text into multiple tasks
export function parseBrainDump(text: string): Task[] {
  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return lines.map(line => {
    // Remove common list markers
    const cleanedLine = line
      .replace(/^[-*•]\s*/, '')
      .replace(/^\d+[.)]\s*/, '')
      .trim();

    return createTask(cleanedLine);
  });
}

// Breakdown templates for different task types
const breakdownTemplates: BreakdownTemplate[] = [
  {
    category: 'email',
    steps: [
      'Open the email or compose window',
      'Write a quick subject line',
      'Draft the main point in 2-3 sentences',
      'Add any necessary context',
      'Review and hit send',
    ],
  },
  {
    category: 'call',
    steps: [
      'Find the phone number or contact',
      'Jot down 2-3 points to mention',
      'Make the call',
      'Take any notes during/after',
      'Follow up if needed',
    ],
  },
  {
    category: 'clean',
    steps: [
      'Gather supplies you need',
      'Clear the surface of items',
      'Wipe down or clean the area',
      'Put items back in place',
      'Dispose of any trash',
    ],
  },
  {
    category: 'write',
    steps: [
      'Open your document/tool',
      'Write a rough outline or bullet points',
      'Expand each point into sentences',
      'Read through once for flow',
      'Make quick edits',
      'Save and share if needed',
    ],
  },
  {
    category: 'meeting',
    steps: [
      'Check the meeting time and link',
      'Review any agenda or prep materials',
      'Join 1-2 minutes early',
      'Take notes on key points',
      'Note any action items for you',
    ],
  },
  {
    category: 'project',
    steps: [
      'Define what "done" looks like',
      'List the main parts or phases',
      'Identify the first concrete step',
      'Set a time limit for the first step',
      'Do just that first step now',
      'Celebrate the small win',
    ],
  },
  {
    category: 'errand',
    steps: [
      'Check if you have everything you need',
      'Plan the route or location',
      'Go there',
      'Complete the errand',
      'Return home',
    ],
  },
  {
    category: 'default',
    steps: [
      'Understand what needs to happen',
      'Gather any materials or info needed',
      'Do the main action',
      'Check your work',
      'Mark it complete',
    ],
  },
];

// Simple keyword matching to categorize tasks
function categorizeTask(content: string): string {
  const lowerContent = content.toLowerCase();

  const categoryKeywords: Record<string, string[]> = {
    email: ['email', 'reply', 'send', 'respond', 'message', 'inbox'],
    call: ['call', 'phone', 'ring', 'dial', 'contact'],
    clean: ['clean', 'tidy', 'organize', 'declutter', 'wash', 'vacuum', 'dust'],
    write: ['write', 'draft', 'document', 'report', 'article', 'blog', 'post'],
    meeting: ['meeting', 'call with', 'sync', 'standup', 'check-in', '1:1'],
    project: ['project', 'plan', 'build', 'create', 'develop', 'design', 'launch'],
    errand: ['buy', 'pick up', 'drop off', 'return', 'go to', 'visit', 'shop'],
  };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => lowerContent.includes(keyword))) {
      return category;
    }
  }

  return 'default';
}

// Get breakdown steps based on granularity
function adjustForGranularity(steps: string[], granularity: number): string[] {
  // Granularity: 1 = simple (fewer steps), 5 = detailed (more steps)
  if (granularity <= 2) {
    // Simplify: combine steps
    const simplified = [];
    for (let i = 0; i < steps.length; i += 2) {
      if (i + 1 < steps.length) {
        simplified.push(`${steps[i]}, then ${steps[i + 1].toLowerCase()}`);
      } else {
        simplified.push(steps[i]);
      }
    }
    return simplified;
  } else if (granularity >= 4) {
    // Add more detail: insert prep/review steps
    const detailed: string[] = [];
    steps.forEach((step, index) => {
      if (index === 0) {
        detailed.push('Take a deep breath and focus');
      }
      detailed.push(step);
      if (index === steps.length - 1) {
        detailed.push('Review what you accomplished');
        detailed.push('Give yourself a small reward');
      }
    });
    return detailed;
  }
  return steps;
}

// Break down a task into subtasks
export function breakdownTask(
  content: string,
  granularity: number = 3
): { category: string; steps: string[] } {
  const category = categorizeTask(content);
  const template = breakdownTemplates.find(t => t.category === category)
    || breakdownTemplates.find(t => t.category === 'default')!;

  const adjustedSteps = adjustForGranularity(template.steps, granularity);

  // Customize first step to include the task context
  const contextualizedSteps = adjustedSteps.map((step, index) => {
    if (index === 0) {
      return `${step} for: "${content}"`;
    }
    return step;
  });

  return {
    category,
    steps: contextualizedSteps,
  };
}

// Convert breakdown steps to subtasks
export function createSubtasksFromBreakdown(
  parentTask: Task,
  steps: string[]
): Task[] {
  return steps.map((step, index) => ({
    id: uuidv4(),
    content: step,
    completed: false,
    createdAt: new Date().toISOString(),
    isQuickWin: true,
    estimatedMinutes: 2,
    parentId: parentTask.id,
  }));
}

// Get a random incomplete task (for shuffle feature)
export function getRandomTask(tasks: Task[]): Task | null {
  const incomplete = tasks.filter(t => !t.completed && !t.parentId);
  if (incomplete.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * incomplete.length);
  return incomplete[randomIndex];
}

// Get next task in queue
export function getNextTask(tasks: Task[]): Task | null {
  const incomplete = tasks.filter(t => !t.completed && !t.parentId);
  return incomplete[0] || null;
}

// Reorder task to end of queue
export function shuffleTaskToEnd(tasks: Task[], taskId: string): Task[] {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return tasks;

  const [task] = tasks.splice(taskIndex, 1);
  tasks.push(task);
  return tasks;
}

// Get friendly time description
export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'from yesterday';
  if (diffDays < 7) return `from ${diffDays} days ago`;
  return `from ${Math.floor(diffDays / 7)} weeks ago`;
}
