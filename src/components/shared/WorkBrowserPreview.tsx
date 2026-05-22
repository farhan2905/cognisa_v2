'use client';

import { ExternalLink } from 'lucide-react';
import { worksData } from '@/data/work';

export default function WorkBrowserPreview({ work }: { work: (typeof worksData)[number] }) {
  return (
    <div className="absolute inset-0 top-10 overflow-hidden bg-slate-950">
      <iframe
        src={work.link}
        className="h-full w-full border-none bg-white"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        title={`${work.title} live website preview`}
        loading="lazy"
      />
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
