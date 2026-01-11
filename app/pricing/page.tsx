'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Sparkles, Shield, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/providers/ToastProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to start',
    features: [
      'One Thing View',
      'Brain Dump',
      'Task Breakdown',
      'Visual Timer',
      'Offline support',
      'Data export',
    ],
    limitations: [
      'Task history (last 30 days)',
      'Standard timer presets',
    ],
    cta: 'Get Started',
    href: '/app',
    variant: 'outline' as const,
  },
  {
    id: 'lifetime',
    name: 'Pro Lifetime',
    price: '$49',
    period: 'one-time',
    description: 'Pay once, use forever',
    features: [
      'Everything in Free',
      'Unlimited task history',
      'Advanced analytics',
      'Custom timer durations',
      'Custom themes',
      'Priority support',
      'All future features',
    ],
    limitations: [],
    cta: 'Get Lifetime Access',
    planType: 'lifetime',
    variant: 'primary' as const,
    popular: true,
  },
  {
    id: 'annual',
    name: 'Pro Annual',
    price: '$29',
    period: '/year',
    description: 'For those who prefer subscriptions',
    features: [
      'Everything in Free',
      'Unlimited task history',
      'Advanced analytics',
      'Custom timer durations',
      'Custom themes',
      'Priority support',
      'Cancel anytime',
    ],
    limitations: [],
    cta: 'Start Annual Plan',
    planType: 'annual',
    variant: 'outline' as const,
  },
];

const comparisonFeatures = [
  { feature: 'One Thing View', free: true, pro: true },
  { feature: 'Brain Dump', free: true, pro: true },
  { feature: 'Task Breakdown', free: true, pro: true },
  { feature: 'Visual Timer', free: true, pro: true },
  { feature: 'Offline Support', free: true, pro: true },
  { feature: 'Data Export', free: true, pro: true },
  { feature: 'Unlimited Task History', free: false, pro: true },
  { feature: 'Advanced Analytics', free: false, pro: true },
  { feature: 'Custom Timer Durations', free: false, pro: true },
  { feature: 'Custom Themes', free: false, pro: true },
  { feature: 'Priority Support', free: false, pro: true },
];

export default function PricingPage() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showCanceled, setShowCanceled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('canceled') === 'true') {
        setShowCanceled(true);
      }
    }
  }, []);

  const handleCheckout = async (planType: string) => {
    setIsLoading(planType);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType }),
      });

      const { url, error } = await response.json();

      if (error) {
        toast.error('Checkout failed. Please try again.');
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch {
      toast.error('Checkout failed. Please try again.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Canceled notice */}
        {showCanceled && (
          <div className="mb-8 p-4 bg-warm-100 dark:bg-warm-900/30 border border-warm-200 dark:border-warm-800 rounded-xl text-center">
            <p className="text-warm-700 dark:text-warm-300">
              Checkout was canceled. No worries - you can try again anytime!
            </p>
          </div>
        )}

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Simple, honest pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, no tricks.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              variant={plan.popular ? 'elevated' : 'outlined'}
              className={`relative ${
                plan.popular ? 'border-2 border-primary-500 dark:border-primary-400' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-500 text-white text-sm font-medium">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <CardTitle>
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
                <p className="text-gray-600 dark:text-gray-400 mt-2">
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

                {plan.planType ? (
                  <Button
                    variant={plan.variant}
                    size="lg"
                    className="w-full"
                    onClick={() => handleCheckout(plan.planType!)}
                    isLoading={isLoading === plan.planType}
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <Link href={plan.href!} className="block">
                    <Button variant={plan.variant} size="lg" className="w-full">
                      {plan.cta}
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Shield className="w-5 h-5 text-sage-500" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Instant access</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Heart className="w-5 h-5 text-warm-500" />
            <span>Built for ADHD brains</span>
          </div>
        </div>

        {/* Comparison table */}
        <Card variant="outlined" className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-center">Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left p-4 font-medium text-gray-700 dark:text-gray-300">
                      Feature
                    </th>
                    <th className="text-center p-4 font-medium text-gray-700 dark:text-gray-300">
                      Free
                    </th>
                    <th className="text-center p-4 font-medium text-gray-700 dark:text-gray-300">
                      Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-gray-100 dark:border-gray-800 ${
                        index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''
                      }`}
                    >
                      <td className="p-4 text-gray-700 dark:text-gray-300">
                        {row.feature}
                      </td>
                      <td className="p-4 text-center">
                        {row.free ? (
                          <Check className="w-5 h-5 text-sage-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.pro ? (
                          <Check className="w-5 h-5 text-sage-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8">
            Questions?
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Can I try Pro features before buying?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                The Free plan includes all core features. Pro adds unlimited history,
                analytics, and customization. Start free and upgrade when you need more.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                What if I'm not satisfied?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer a 30-day money-back guarantee, no questions asked.
                Just email us and we'll process your refund.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Is my data private?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! Your tasks and data are stored locally on your device.
                We don't have access to your personal information.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
