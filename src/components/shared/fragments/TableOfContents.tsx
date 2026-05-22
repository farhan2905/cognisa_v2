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
      <div className="sticky top-32 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
          <Hash className="w-4 h-4 text-cyan-600" />
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
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
                className="block text-xs font-semibold text-slate-500 hover:text-cyan-700 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-50 border-l-2 border-transparent hover:border-cyan-500"
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
