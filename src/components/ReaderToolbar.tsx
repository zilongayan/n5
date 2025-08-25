'use client';

import { useState } from 'react';
import { ModeToggle, ReaderMode } from './ModeToggle';

interface ReaderToolbarProps {
  currentPage: number;
  totalPages: number;
  currentMode: ReaderMode;
  onModeChange: (mode: ReaderMode) => void;
  onPageChange: (page: number) => void;
  onZoomChange: (zoom: number) => void;
  currentZoom: number;
  className?: string;
}

export function ReaderToolbar({
  currentPage,
  totalPages,
  currentMode,
  onModeChange,
  onPageChange,
  onZoomChange,
  currentZoom,
  className = ''
}: ReaderToolbarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Page Navigation */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ←
          </button>
          
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => onPageChange(parseInt(e.target.value) || 1)}
              className="w-16 px-2 py-1 text-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              / {totalPages}
            </span>
          </div>
          
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            →
          </button>
        </div>

        {/* Mode Toggle */}
        <ModeToggle
          currentMode={currentMode}
          onModeChange={onModeChange}
        />

        {/* Zoom Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onZoomChange(Math.max(0.5, currentZoom - 0.25))}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            🔍-
          </button>
          
          <select
            value={currentZoom}
            onChange={(e) => onZoomChange(parseFloat(e.target.value))}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm"
          >
            {zoomLevels.map((zoom) => (
              <option key={zoom} value={zoom}>
                {Math.round(zoom * 100)}%
              </option>
            ))}
          </select>
          
          <button
            onClick={() => onZoomChange(Math.min(3, currentZoom + 0.25))}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            🔍+
          </button>
        </div>

        {/* Expand/Collapse */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isExpanded ? '▼' : '▲'}
        </button>
      </div>

      {/* Expanded Controls */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Qualité d'image
            </span>
            <select className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm">
              <option>Original</option>
              <option>Haute</option>
              <option>Moyenne</option>
              <option>Basse</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Préchargement
            </span>
            <select className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm">
              <option>2 pages</option>
              <option>5 pages</option>
              <option>10 pages</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
