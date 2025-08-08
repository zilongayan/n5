'use client';

import {useState} from 'react';
import {useTranslations} from '@/hooks/useTranslations';

interface DownloadButtonProps {
  itemId: string;
  title: string;
  className?: string;
}

export function DownloadButton({itemId, title, className = ''}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const {t} = useTranslations();

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a fake download for demo purposes
      const element = document.createElement('a');
      const file = new Blob(['# ' + title + '\n\nGallery content would be here...'], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      setDownloadComplete(true);
      setTimeout(() => {
        setDownloadComplete(false);
        setIsDownloading(false);
      }, 2000);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
    }
  };

  const getButtonContent = () => {
    if (downloadComplete) {
      return (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {t('gallery.downloadComplete')}
        </>
      );
    }
    
    if (isDownloading) {
      return (
        <>
          <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {t('gallery.downloading')}
        </>
      );
    }
    
    return (
      <>
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        📥 {t('gallery.download')}
      </>
    );
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
        downloadComplete 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : isDownloading
            ? 'bg-blue-400 text-white cursor-not-allowed'
            : 'theme-button-secondary hover:scale-105'
      } ${className}`}
    >
      {getButtonContent()}
    </button>
  );
}
