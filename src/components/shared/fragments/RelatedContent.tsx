'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RelatedItem {
  slug: string;
  title: string;
  description?: string;
  color?: string;
  icon?: React.ElementType;
}

interface RelatedContentProps {
  items: RelatedItem[];
  type: 'services' | 'work' | 'insights';
  currentSlug: string;
  className?: string;
}

export default function RelatedContent({
  items,
  type,
  currentSlug,
  className = '',
}: RelatedContentProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const basePath = `/${type}`;
  const related = items.filter((item) => item.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section ref={ref} className={`py-16 md:py-24 ${className}`}>
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl border backdrop-blur-[100px] bg-gradient-to-r from-white/8 via-white/4 to-white/2 border-indigo-300/40 shadow-[inset_0_2px_2px_rgba(255,255,255,0.3),0_8px_24px_rgba(31,38,135,0.1)] mb-6">
            <span className="w-4 h-4 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-md" />
            <span className="text-sm font-mono uppercase tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
              Continue Exploring
            </span>
            <span className="h-1 w-12 rounded-full bg-gradient-to-r from-indigo-400/60 to-transparent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Related {type === 'services' ? 'Services' : type === 'work' ? 'Projects' : 'Articles'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`${basePath}/${item.slug}`}
                className="group flex flex-col h-full relative overflow-hidden bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent backdrop-blur-2xl rounded-2xl p-6 border border-indigo-300/40 ring-1 ring-indigo-400/15 shadow-[0_10px_30px_rgba(59,130,246,0.12),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-500 hover:-translate-y-2 hover:border-indigo-300/60 hover:ring-indigo-400/30"
              >
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-indigo-500 transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
                    {item.description}
                  </p>
                )}
                <div className="mt-auto flex items-center gap-2 text-foreground/40 group-hover:text-indigo-500 transition-colors">
                  <span className="text-xs font-medium">Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
