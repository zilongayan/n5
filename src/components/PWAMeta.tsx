"use client";
import {useEffect} from 'react';

export function PWAMeta() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Request notification permission
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <>
      <meta name="application-name" content="3Like" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="3Like" />
      <meta name="description" content="Discover the largest collection of adult content" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#8b5cf6" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#8b5cf6" />

      <link rel="apple-touch-icon" href="/icon.svg" />
      <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/icon.svg" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://3like.com" />
      <meta name="twitter:title" content="3Like" />
      <meta name="twitter:description" content="Adult content portal" />
      <meta name="twitter:image" content="/icon.svg" />
      <meta name="twitter:creator" content="@3like" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="3Like" />
      <meta property="og:description" content="Adult content portal" />
      <meta property="og:site_name" content="3Like" />
      <meta property="og:url" content="https://3like.com" />
      <meta property="og:image" content="/icon.svg" />
    </>
  );
}
