'use client';

import React from 'react';
import { Brain } from 'lucide-react';
import { useTasks } from '@/components/providers/TaskProvider';
import { BrainDump } from '@/components/app/BrainDump';

export default function DumpPage() {
  const { addTasks } = useTasks();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
          <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Brain Dump
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get it out of your head
          </p>
        </div>
      </div>

      {/* Brain dump component */}
      <BrainDump onAddTasks={addTasks} />
    </div>
  );
}
