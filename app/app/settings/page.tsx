'use client';

import React, { useState } from 'react';
import { Settings, Sun, Moon, Monitor, Download, Trash2, CreditCard, ExternalLink, RotateCcw } from 'lucide-react';
import { useTasks } from '@/components/providers/TaskProvider';
import { useToast } from '@/components/providers/ToastProvider';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ConfirmModal } from '@/components/ui/Modal';
import { exportAllData, clearAllData } from '@/lib/storage';
import { resetOnboarding } from '@/components/app/OnboardingModal';

export default function SettingsPage() {
  const { preferences, setTheme, completedTasks, incompleteTasks } = useTasks();
  const toast = useToast();
  const [showClearModal, setShowClearModal] = useState(false);
  const [isManagingBilling, setIsManagingBilling] = useState(false);

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nudge-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Data exported');
  };

  const handleClearData = () => {
    clearAllData();
    toast.success('Data cleared');
    window.location.reload();
  };

  const handleReplayOnboarding = () => {
    resetOnboarding();
    toast.success('Onboarding reset');
    window.location.href = '/app';
  };

  const handleManageBilling = async () => {
    if (!preferences.stripeCustomerId) {
      // Redirect to pricing if not a customer
      window.location.href = '/pricing';
      return;
    }

    setIsManagingBilling(true);
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: preferences.stripeCustomerId }),
      });
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Failed to open billing portal:', error);
    } finally {
      setIsManagingBilling(false);
    }
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
          <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your experience
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Account status */}
        <Card variant="outlined">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {preferences.isPro ? `Pro (${preferences.proType})` : 'Free Plan'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {preferences.isPro
                    ? 'You have access to all features'
                    : 'Upgrade for unlimited history and more'}
                </p>
              </div>
              <Button
                variant={preferences.isPro ? 'ghost' : 'primary'}
                onClick={handleManageBilling}
                isLoading={isManagingBilling}
              >
                {preferences.isPro ? (
                  <>
                    Manage Billing
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  'Upgrade'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Theme */}
        <Card variant="outlined">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    toast.success('Settings saved');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-colors ${
                    preferences.theme === option.value
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 ring-2 ring-primary-500'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <option.icon className="w-5 h-5" />
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card variant="gentle">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                <p className="text-3xl font-bold text-sage-600 dark:text-sage-400">
                  {completedTasks.length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Tasks completed
                </p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {incompleteTasks.length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Tasks in queue
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data management */}
        <Card variant="outlined">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Export Data
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Download all your data as JSON
                </p>
              </div>
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Replay Onboarding
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    See the welcome tour again
                  </p>
                </div>
                <Button variant="outline" onClick={handleReplayOnboarding}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Replay
                </Button>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Clear All Data
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Remove all tasks and settings
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setShowClearModal(true)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card variant="outlined">
          <CardContent className="text-center py-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Nudge
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              ADHD-friendly productivity
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Your data is stored locally on your device.
              <br />
              We don't have access to your tasks or information.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Clear data confirmation */}
      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClearData}
        title="Clear all data?"
        message="This will remove all your tasks, settings, and timer history. This action cannot be undone."
        confirmText="Yes, clear everything"
        cancelText="Keep my data"
        variant="gentle"
      />
    </div>
  );
}
