'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Focus, Brain, Timer, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/app',
    icon: Focus,
    label: 'Focus',
  },
  {
    href: '/app/dump',
    icon: Brain,
    label: 'Dump',
  },
  {
    href: '/app/timer',
    icon: Timer,
    label: 'Timer',
  },
  {
    href: '/app/settings',
    icon: Settings,
    label: 'Settings',
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 safe-area-inset">
      <div className="max-w-lg mx-auto px-4">
        <ul className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors min-w-[64px]',
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  )}
                >
                  <item.icon
                    className={cn(
                      'w-6 h-6 transition-transform',
                      isActive && 'scale-110'
                    )}
                  />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
