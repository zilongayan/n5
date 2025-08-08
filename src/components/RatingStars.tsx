'use client';

import {useState} from 'react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange
}: RatingStarsProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleClick = (clickedRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(clickedRating);
    }
  };

  const handleMouseEnter = (starRating: number) => {
    if (interactive) {
      setHoveredRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoveredRating(0);
    }
  };

  const getStarFill = (starIndex: number) => {
    const effectiveRating = interactive && hoveredRating > 0 ? hoveredRating : rating;
    
    if (starIndex <= effectiveRating) {
      return 'text-yellow-400';
    } else if (starIndex - 0.5 <= effectiveRating) {
      return 'text-yellow-200';
    } else {
      return 'text-slate-300 dark:text-slate-600';
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const starRating = index + 1;
        return (
          <button
            key={index}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-all duration-200 ${
              interactive ? 'focus:outline-none focus:scale-110' : ''
            }`}
            onClick={() => handleClick(starRating)}
            onMouseEnter={() => handleMouseEnter(starRating)}
            onMouseLeave={handleMouseLeave}
            disabled={!interactive}
          >
            <svg
              className={`${sizeClasses[size]} ${getStarFill(starRating)} transition-colors duration-200`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
      {!interactive && (
        <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
          {rating.toFixed(1)}/5
        </span>
      )}
    </div>
  );
}
