'use client';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'avatar' | 'image' | 'button' | 'card';
}

export function Skeleton({ className = '', variant = 'text' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    text: 'h-4 rounded',
    avatar: 'h-12 w-12 rounded-full',
    image: 'h-32 w-full rounded',
    button: 'h-10 w-24 rounded',
    card: 'h-48 w-full rounded-lg'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <Skeleton variant="image" />
      <div className="space-y-2">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ 
  cols = 4, 
  rows = 2, 
  className = '' 
}: { 
  cols?: number; 
  rows?: number; 
  className?: string 
}) {
  return (
    <div className={`grid grid-cols-${cols} gap-4 ${className}`}>
      {Array.from({ length: cols * rows }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
