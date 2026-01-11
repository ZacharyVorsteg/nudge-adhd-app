'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to get started',
    features: [
      'One Thing View',
      'Brain Dump',
      'Task Breakdown',
      'Visual Timer',
      'Offline support',
      'Data export',
    ],
    cta: 'Get Started',
    href: '/app',
    popular: false,
  },
  {
    name: 'Pro Lifetime',
    price: '$49',
    period: 'one-time',
    description: 'Pay once, use forever',
    features: [
      'Everything in Free',
      'Unlimited task history',
      'Advanced analytics',
      'Custom themes',
      'Priority support',
      'Future features included',
    ],
    cta: 'Get Lifetime Access',
    href: '/pricing',
    popular: true,
  },
  {
    name: 'Pro Annual',
    price: '$29',
    period: '/year',
    description: 'For those who prefer subscriptions',
    features: [
      'Everything in Free',
      'Unlimited task history',
      'Advanced analytics',
      'Custom themes',
      'Priority support',
      'Cancel anytime',
    ],
    cta: 'Start Annual Plan',
    href: '/pricing',
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 bg-gradient-to-b from-warm-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Simple, fair pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start free and upgrade when you're ready.
            No trials, no credit card required.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              variant={plan.popular ? 'elevated' : 'outlined'}
              className={`relative animate-slide-up ${
                plan.popular ? 'border-2 border-primary-500 dark:border-primary-400' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-500 text-white text-sm font-medium">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="pt-8">
                <CardTitle className="text-center">
                  <span className="text-lg font-medium text-gray-600 dark:text-gray-400 block mb-2">
                    {plan.name}
                  </span>
                  <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-500 font-normal">
                    {' '}{plan.period}
                  </span>
                </CardTitle>
                <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sage-100 dark:bg-sage-900 flex items-center justify-center">
                        <Check className="w-3 h-3 text-sage-600 dark:text-sage-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className="block">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Money-back guarantee */}
        <p className="text-center mt-12 text-gray-500 dark:text-gray-500">
          30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  );
}
