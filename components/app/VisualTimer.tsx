'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { playChime, getCalibrationMessage } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { saveTimerSession } from '@/lib/storage';

interface VisualTimerProps {
  onComplete?: (actualMinutes: number, perceivedMinutes?: number) => void;
}

const PRESET_DURATIONS = [
  { label: '5 min', minutes: 5 },
  { label: '15 min', minutes: 15 },
  { label: '25 min', minutes: 25 },
  { label: '45 min', minutes: 45 },
];

export function VisualTimer({ onComplete }: VisualTimerProps) {
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [timeRemaining, setTimeRemaining] = useState(selectedMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCalibration, setShowCalibration] = useState(false);
  const [perceivedDuration, setPerceivedDuration] = useState<number | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  const totalSeconds = selectedMinutes * 60;
  const progress = timeRemaining / totalSeconds;
  const circumference = 2 * Math.PI * 140; // radius = 140

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const handleStart = () => {
    if (!startTimeRef.current) {
      startTimeRef.current = new Date();
    }
    setIsRunning(true);
    setIsComplete(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeRemaining(selectedMinutes * 60);
    setShowCalibration(false);
    setPerceivedDuration(null);
    startTimeRef.current = null;
  };

  const handleSelectDuration = (minutes: number) => {
    setSelectedMinutes(minutes);
    setTimeRemaining(minutes * 60);
    setIsRunning(false);
    setIsComplete(false);
    setShowCalibration(false);
    setPerceivedDuration(null);
    startTimeRef.current = null;
  };

  const handleTimerComplete = () => {
    setShowCalibration(true);
  };

  const handleCalibrationSubmit = (perceived: 'shorter' | 'accurate' | 'longer') => {
    const perceivedMap = {
      shorter: selectedMinutes * 0.6,
      accurate: selectedMinutes,
      longer: selectedMinutes * 1.4,
    };
    const perceivedMins = perceivedMap[perceived];
    setPerceivedDuration(perceivedMins);

    // Save session
    saveTimerSession({
      id: uuidv4(),
      duration: selectedMinutes * 60,
      startedAt: startTimeRef.current?.toISOString() || new Date().toISOString(),
      completedAt: new Date().toISOString(),
      perceivedDuration: perceivedMins,
    });

    if (onComplete) {
      onComplete(selectedMinutes, perceivedMins);
    }
  };

  const handleSkipCalibration = () => {
    setShowCalibration(false);
    if (onComplete) {
      onComplete(selectedMinutes);
    }
  };

  // Calibration view
  if (showCalibration) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
          How did that feel?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-sm">
          Your perception of time helps us understand how you're working.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleCalibrationSubmit('shorter')}
            className="w-full"
          >
            Felt shorter than {selectedMinutes} min
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleCalibrationSubmit('accurate')}
            className="w-full"
          >
            Felt about right
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleCalibrationSubmit('longer')}
            className="w-full"
          >
            Felt longer than {selectedMinutes} min
          </Button>
        </div>

        <button
          onClick={handleSkipCalibration}
          className="mt-6 text-sm text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Skip this
        </button>

        {perceivedDuration !== null && (
          <div className="mt-8 p-4 bg-sage-50 dark:bg-sage-900/30 rounded-xl text-center animate-fade-in">
            <p className="text-sage-700 dark:text-sage-300">
              {getCalibrationMessage(selectedMinutes, perceivedDuration)}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Timer circle */}
      <div className="relative w-80 h-80 mb-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 300 300">
          {/* Background circle */}
          <circle
            cx="150"
            cy="150"
            r="140"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-100 dark:text-gray-800"
          />
          {/* Progress circle */}
          <circle
            cx="150"
            cy="150"
            r="140"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className={`transition-all duration-1000 ease-linear ${
              isComplete
                ? 'text-sage-500'
                : isRunning
                ? 'text-primary-500'
                : 'text-gray-400 dark:text-gray-600'
            }`}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isComplete ? (
            <div className="text-center animate-fade-in">
              <Check className="w-16 h-16 text-sage-500 mx-auto mb-2" />
              <p className="text-xl font-medium text-sage-600 dark:text-sage-400">
                Complete!
              </p>
            </div>
          ) : (
            <>
              <div className="text-6xl font-light text-gray-300 dark:text-gray-600 tabular-nums">
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </div>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                {isRunning ? 'Focus time' : 'Ready when you are'}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Duration presets */}
      <div className="flex gap-2 mb-8">
        {PRESET_DURATIONS.map((preset) => (
          <button
            key={preset.minutes}
            onClick={() => handleSelectDuration(preset.minutes)}
            disabled={isRunning}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedMinutes === preset.minutes
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {isComplete ? (
          <>
            <Button onClick={handleTimerComplete} size="lg">
              Log Session
            </Button>
            <Button variant="ghost" onClick={handleReset} size="lg">
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={isRunning ? handlePause : handleStart}
              size="lg"
              className="w-32"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            {(timeRemaining < totalSeconds || isRunning) && (
              <Button variant="ghost" onClick={handleReset} size="lg">
                <RotateCcw className="w-5 h-5" />
              </Button>
            )}
          </>
        )}
      </div>

      {/* Tips */}
      {!isRunning && !isComplete && (
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-500 text-center max-w-sm">
          Watch the circle shrink instead of counting down.
          Less stressful, same focus.
        </p>
      )}
    </div>
  );
}
