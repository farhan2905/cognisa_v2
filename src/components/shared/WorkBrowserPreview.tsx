'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { worksData } from '@/data/work';

export default function WorkBrowserPreview({ work }: { work: (typeof worksData)[number] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateScale = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      if (window.innerWidth < 1024) {
        setScale(1); // Mobile layout (unscaled responsive iframe)
      } else {
        // Desktop layout (iframe rendered at 1280px and scaled down to fit)
        setScale(width / 1280);
      }
    };

    // Delay slightly to allow layout to settle on initial load
    const timer = setTimeout(updateScale, 50);

    window.addEventListener('resize', updateScale);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  }, [work]);

  const untransformedHeight = 5500;

  return (
    <div className="absolute inset-0 top-10 overflow-hidden bg-slate-950" ref={containerRef}>
      <div 
        ref={scrollContainerRef}
        className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div 
          style={scale === 1 ? { 
            width: '100%', 
            height: `${untransformedHeight}px` 
          } : { 
            width: `${1280 * scale}px`, 
            height: `${untransformedHeight * scale}px`, 
            overflow: 'hidden'
          }}
          className="relative"
        >
          <div
            style={scale === 1 ? {
              width: '100%',
              height: '100%'
            } : {
              width: '1280px',
              height: `${untransformedHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left'
            }}
            className="absolute inset-0"
          >
            <iframe
              src={work.link}
              className="absolute inset-0 w-full h-full border-none bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              title={`${work.title} live website preview`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-4">
        <a
          href={work.link}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/90 px-4 py-2 text-xs font-black text-slate-950 shadow-lg transition-all hover:bg-cyan-100"
        >
          Open live site
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
