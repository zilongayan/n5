'use client';

import { useState } from 'react';

export type ReaderMode = 'long-strip' | 'single-page' | 'fit-width' | 'fit-height';

interface ModeToggleProps {
  currentMode: ReaderMode;
  onModeChange: (mode: ReaderMode) => void;
  className?: string;
}

export function ModeToggle({ currentMode, onModeChange, className = '' }: ModeToggleProps) {
  const modes: { value: ReaderMode; label: string; icon: string }[] = [
    { value: 'long-strip', label: 'Long strip', icon: '📱' },
    { value: 'single-page', label: 'Single page', icon: '📄' },
    { value: 'fit-width', label: 'Fit width', icon: '↔️' },
    { value: 'fit-height', label: 'Fit height', icon: '↕️' },
  ];

  return (
    <div className={`flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 ${className}`}>
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onModeChange(mode.value)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentMode === mode.value
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
          }`}
        >
          <span className="text-base">{mode.icon}</span>
          <span className="hidden sm:inline">{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
