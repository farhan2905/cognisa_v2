'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Hash } from 'lucide-react';

interface TocSection {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: TocSection[];
  className?: string;
}

export default function TableOfContents({ sections, className = '' }: TableOfContentsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (!sections || sections.length === 0) return null;

  return (
    <motion.aside
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="sticky top-32 glass-surface rounded-[2rem] p-6 border border-indigo-300/40 ring-1 ring-indigo-400/15 shadow-[0_10px_30px_rgba(59,130,246,0.12),inset_0_1px_0_rgba(255,255,255,0.45)]">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-indigo-300/20">
          <Hash className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-mono font-bold text-foreground/50 uppercase tracking-wider">
            On this page
          </span>
        </div>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(section.id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="block text-sm text-foreground/60 hover:text-indigo-500 transition-colors py-1 px-3 rounded-lg hover:bg-indigo-500/5 border-l-2 border-transparent hover:border-indigo-400/30"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}
