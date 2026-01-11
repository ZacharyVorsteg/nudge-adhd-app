'use client';

import React from 'react';
import { Focus, Layers, Heart, Zap, Timer, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

const features = [
  {
    icon: Focus,
    title: 'One Thing View',
    description: 'See only your current task. No overwhelming lists. Just the one thing you need to do right now.',
  },
  {
    icon: Layers,
    title: 'Task Breakdown',
    description: '"Clean the house" becomes "Pick up 3 items from the floor." Turn mountains into molehills.',
  },
  {
    icon: Heart,
    title: 'Shame-Free Design',
    description: 'No angry red overdue labels. No guilt trips. Tasks from yesterday are just "from yesterday."',
  },
  {
    icon: Brain,
    title: 'Brain Dump',
    description: 'Voice or type every thought. Get it out of your head in seconds. Sort it later (or never).',
  },
  {
    icon: Zap,
    title: 'Quick Wins',
    description: 'Need momentum? Start with tasks under 5 minutes. Stack small wins to build your day.',
  },
  {
    icon: Timer,
    title: 'Visual Timer',
    description: 'A shrinking circle, not scary numbers. See time pass without the anxiety of watching digits.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Finally, an app that gets it
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every feature is designed to work with your brain, not against it.
            No productivity theater. Just real progress.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              variant="outlined"
              className="hover:shadow-lg transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent>
                <div className="inline-flex p-3 rounded-xl bg-primary-500 dark:bg-primary-600 mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
