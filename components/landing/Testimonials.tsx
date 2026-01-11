'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

const testimonials = [
  {
    quote: "I've tried every productivity app out there. Nudge is the first one that doesn't make me feel like a failure when I don't use it for a week.",
    author: 'Sarah M.',
    role: 'Software Engineer',
    avatar: 'SM',
  },
  {
    quote: "The one thing view changed everything. I used to spend 20 minutes just deciding what to do. Now I just... do it.",
    author: 'Marcus J.',
    role: 'Freelance Designer',
    avatar: 'MJ',
  },
  {
    quote: "Finally someone understands that 'clean the kitchen' isn't a task - it's like 47 tasks. The breakdown feature is a lifesaver.",
    author: 'Alex R.',
    role: 'Parent & Teacher',
    avatar: 'AR',
  },
  {
    quote: "No red badges, no guilt trips, no shame. Just gentle nudges. My anxiety thanks you.",
    author: 'Jordan K.',
    role: 'Marketing Manager',
    avatar: 'JK',
  },
  {
    quote: "The visual timer is genius. Numbers stress me out. Watching a circle shrink? Oddly calming.",
    author: 'Taylor B.',
    role: 'Graduate Student',
    avatar: 'TB',
  },
  {
    quote: "Brain dump + voice input = finally getting the chaos out of my head without having to type it all.",
    author: 'Chris P.',
    role: 'Entrepreneur',
    avatar: 'CP',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Made for brains like yours
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of people who stopped fighting their brains
            and started working with them.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.author}
              variant="gentle"
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
