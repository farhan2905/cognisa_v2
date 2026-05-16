'use client';

import { useState } from 'react';
import { worksData } from '@/data/work';

export default function WorkBrowserPreview({ work }: { work: typeof worksData[0] }) {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div 
      className="absolute inset-0 top-10 overflow-hidden bg-background/50"
      onMouseLeave={() => setIsInteractive(false)}
    >
      <iframe 
        src={work.link} 
        className="w-full h-full border-none scale-[1.01]" 
        sandbox="allow-scripts allow-same-origin" 
        title={work.title} 
        loading="lazy"
      />
      
      <div 
        className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-300 ${isInteractive ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-background/20 cursor-pointer pointer-events-auto backdrop-blur-[2px]'}`} 
        onClick={() => setIsInteractive(true)}
      >
        {!isInteractive && (
          <span className="px-6 py-3 glass-surface text-white shadow-2xl text-sm font-medium rounded-full flex items-center gap-2 transform transition-transform hover:scale-105">
            Tap to interact
          </span>
        )}
      </div>
    </div>
  );
}
