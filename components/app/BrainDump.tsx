'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { parseBrainDump } from '@/lib/tasks';
import { Task } from '@/lib/types';

interface BrainDumpProps {
  onAddTasks: (tasks: Task[]) => void;
}

export function BrainDump({ onAddTasks }: BrainDumpProps) {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + '\n';
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            setText(prev => prev + finalTranscript);
          }
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = () => {
    if (!text.trim()) return;

    const tasks = parseBrainDump(text);
    if (tasks.length > 0) {
      onAddTasks(tasks);
      setText('');
    }
  };

  const taskCount = text.trim() ? text.trim().split('\n').filter(line => line.trim()).length : 0;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Just dump it all here...

- Call mom
- Finish that report
- Buy groceries
- That idea I had at 3am

Type or talk. One thought per line. Don't overthink it."
          className="min-h-[300px] text-lg"
        />

        {/* Voice button */}
        {speechSupported && (
          <button
            onClick={toggleListening}
            className={`absolute bottom-4 right-4 p-3 rounded-full transition-all ${
              isListening
                ? 'bg-primary-500 text-white animate-pulse-gentle'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-label={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Status and submit */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {taskCount > 0 && (
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              {taskCount} {taskCount === 1 ? 'task' : 'tasks'} ready to add
            </span>
          )}
          {isListening && (
            <span className="text-primary-500 animate-pulse">
              Listening...
            </span>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!text.trim()}
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add {taskCount > 1 ? 'All' : 'Task'}
        </Button>
      </div>

      {/* Tips */}
      <div className="p-4 bg-warm-50 dark:bg-warm-900/20 rounded-xl">
        <h3 className="font-medium text-warm-700 dark:text-warm-300 mb-2">
          Tips for effective brain dumping:
        </h3>
        <ul className="text-sm text-warm-600 dark:text-warm-400 space-y-1">
          <li>- Don't filter yourself - write everything</li>
          <li>- One thought per line</li>
          <li>- It doesn't have to be actionable</li>
          <li>- You can sort and prioritize later</li>
        </ul>
      </div>
    </div>
  );
}
