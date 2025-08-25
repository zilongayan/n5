'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  id: string;
  size: 'banner' | 'sidebar' | 'content' | 'pre-roll';
  className?: string;
}

export function AdSlot({ id, size, className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ad loading logic would go here
    // Currently commented out for development
    
    /*
    if (adRef.current && process.env.NODE_ENV === 'production') {
      // Initialize ad network (Google AdSense, etc.)
      // Load VAST for pre-roll ads
      // Handle ad events
    }
    */
  }, []);

  // Don't render ads in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        ref={adRef}
        className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center text-gray-500 dark:text-gray-400 ${className}`}
      >
        <div className="text-sm">
          <div className="font-medium mb-1">Ad Slot: {id}</div>
          <div className="text-xs">Size: {size}</div>
          <div className="text-xs">Ads disabled in development</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={adRef}
      id={id}
      className={`ad-slot ad-slot-${size} ${className}`}
      data-ad-size={size}
    >
      {/* Ad content will be injected here */}
    </div>
  );
}

// VAST (Video Ad Serving Template) component for pre-roll ads
export function VASTAd({ 
  vastUrl, 
  onAdStart, 
  onAdEnd, 
  onAdError,
  className = ''
}: {
  vastUrl: string;
  onAdStart?: () => void;
  onAdEnd?: () => void;
  onAdError?: (error: string) => void;
  className?: string;
}) {
  useEffect(() => {
    // VAST ad logic would go here
    // Currently commented out for development
    
    /*
    if (process.env.NODE_ENV === 'production') {
      // Parse VAST XML
      // Handle ad events
      // Track impressions and clicks
    }
    */
  }, [vastUrl, onAdStart, onAdEnd, onAdError]);

  // Don't render VAST ads in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center text-blue-500 dark:text-blue-400 ${className}`}>
        <div className="text-sm">
          <div className="font-medium mb-1">VAST Ad</div>
          <div className="text-xs">URL: {vastUrl}</div>
          <div className="text-xs">VAST ads disabled in development</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`vast-ad ${className}`}>
      {/* VAST ad content will be injected here */}
    </div>
  );
}
