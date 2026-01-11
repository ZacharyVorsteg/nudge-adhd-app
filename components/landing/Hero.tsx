'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-warm-50 to-sage-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-primary-200 dark:border-primary-800 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary-500" />
          <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
            Built for ADHD brains, by ADHD brains
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
          <span className="text-gray-900 dark:text-gray-100">You're not broken.</span>
          <br />
          <span className="bg-gradient-to-r from-primary-500 to-sage-500 bg-clip-text text-transparent">
            Your apps are.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Stop fighting productivity tools designed for neurotypical brains.
          Nudge shows you <span className="text-primary-600 dark:text-primary-400 font-medium">one thing at a time</span>,
          breaks down overwhelming tasks, and never shames you for being human.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link href="/app">
            <Button size="xl" className="group">
              Start Now - It's Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="ghost" size="xl">
              See How It Works
            </Button>
          </Link>
        </div>

        {/* Social proof */}
        <p className="mt-12 text-gray-500 dark:text-gray-500 text-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
          No signup required. Works offline. Your data stays on your device.
        </p>
      </div>
    </section>
  );
}
