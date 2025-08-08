"use client";
import {useEffect, useState} from 'react';

export function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('ageAccepted');
    if (!accepted) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white text-black rounded p-6 max-w-md w-full space-y-4">
        <div className="text-lg font-semibold">Adults only</div>
        <p className="text-sm text-gray-700">This website contains adult content. You must be 18+ to proceed.</p>
        <div className="flex gap-3 justify-end">
          <a
            href="https://www.google.com"
            className="px-4 py-2 text-sm rounded border"
          >
            Leave
          </a>
          <button
            onClick={() => {
              localStorage.setItem('ageAccepted', '1');
              setVisible(false);
            }}
            className="px-4 py-2 text-sm rounded bg-black text-white"
          >
            I am 18+
          </button>
        </div>
      </div>
    </div>
  );
}


