'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Zap, Target, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const ONBOARDING_KEY = 'nudge-onboarding-complete';

interface OnboardingStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  tip: string;
}

const steps: OnboardingStep[] = [
  {
    icon: <Sparkles className="w-12 h-12 text-primary-500" />,
    title: 'Welcome to Nudge',
    description: 'A calmer way to get things done. Built for brains that work differently.',
    tip: 'No overwhelm. Just one thing at a time.',
  },
  {
    icon: <Brain className="w-12 h-12 text-sage-500" />,
    title: 'Brain Dump',
    description: 'Get everything out of your head. Type tasks quickly without organizing.',
    tip: 'The mess becomes manageable.',
  },
  {
    icon: <Zap className="w-12 h-12 text-yellow-500" />,
    title: 'Quick Wins',
    description: 'Small tasks (5 min or less) get highlighted. Easy dopamine hits.',
    tip: 'Momentum builds motivation.',
  },
  {
    icon: <Target className="w-12 h-12 text-warm-500" />,
    title: 'Focus Mode',
    description: 'See only your current task. No list anxiety. Just this one thing.',
    tip: 'Shuffle if you need variety.',
  },
];

interface OnboardingModalProps {
  onComplete?: () => void;
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if onboarding has been completed
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOpen(false);
    onComplete?.();
  };

  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl animate-slide-up overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-gray-100 dark:bg-gray-700">
          <div
            className="h-full bg-primary-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
              {step.icon}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {step.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {step.description}
          </p>

          {/* Tip */}
          <p className="text-sm text-primary-600 dark:text-primary-400 italic">
            {step.tip}
          </p>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-primary-500 w-6'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}

            {isLastStep ? (
              <Button
                variant="primary"
                onClick={handleComplete}
                className="flex-1"
              >
                Get Started
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNext}
                className="flex-1"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>

          {/* Skip option */}
          {!isLastStep && (
            <button
              onClick={handleComplete}
              className="w-full mt-3 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              Skip intro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to reset onboarding (for Settings page)
export function resetOnboarding(): void {
  localStorage.removeItem(ONBOARDING_KEY);
}

// Helper function to check if onboarding is complete
export function isOnboardingComplete(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(ONBOARDING_KEY) === 'true';
}
