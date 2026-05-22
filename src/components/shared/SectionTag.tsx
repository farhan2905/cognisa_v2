'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionTagProps {
  text: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export default function SectionTag({ text, variant = 'light', className }: SectionTagProps) {
  const isLight = variant === 'light';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45 }}
      className={cn('flex items-center gap-3 mb-6 group', className)}
    >
      <div className={cn(
        'inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border backdrop-blur-md transition-all duration-300',
        isLight 
          ? 'bg-slate-950/[0.04] border-slate-950/10 hover:border-slate-950/20 shadow-sm'
          : 'bg-white/[0.04] border-white/10 hover:border-white/20 shadow-sm'
      )}>
        <span className={cn(
          'w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-300',
          isLight ? 'bg-slate-950' : 'bg-white'
        )} />
        <span
          className={cn(
            'text-[11px] md:text-xs font-mono uppercase tracking-[0.22em] font-black',
            isLight ? 'text-slate-950' : 'text-white'
          )}
        >
          {text}
        </span>
      </div>
    </motion.div>
  );
}
