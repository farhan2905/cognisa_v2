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
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 shadow-sm mb-6">
            <span className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Continue Exploring
            </span>
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
                className="group flex flex-col h-full relative overflow-hidden bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:border-slate-350 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-cyan-700 transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
                    {item.description}
                  </p>
                )}
                <div className="mt-auto flex items-center gap-2 text-foreground/45 group-hover:text-cyan-700 transition-colors">
                  <span className="text-xs font-semibold">Explore</span>
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
