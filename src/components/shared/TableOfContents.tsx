'use client';

import { useEffect, useState } from 'react';

interface HeadingItem {
  text: string;
  id: string;
}

export default function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find first entry intersecting
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: 0.1 }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="hidden lg:block w-56 shrink-0 sticky top-28 self-start pr-4">
      <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase block mb-4">
        Table of Contents
      </span>
      <nav className="flex flex-col gap-3.5 relative border-l border-indigo-100 pl-4 py-1">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`text-xs font-bold transition-all block max-w-[190px] truncate ${
                isActive 
                  ? 'text-indigo-650 translate-x-1' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {heading.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
