'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SectionTag from './SectionTag';

interface DetailHeroProps {
  tagText: string;
  title: string;
  description: string;
  icon?: React.ElementType;
  emoji?: string;
  color?: string;
  backHref?: string;
  backText?: string;
}

export default function DetailHero({ 
  tagText, 
  title, 
  description, 
  icon: Icon, 
  emoji,
  color = '#6366f1',
  backHref = '/',
  backText = 'Back to Home'
}: DetailHeroProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-50" style={{ backgroundColor: color }} />
      
      <div className="w-full max-w-[1000px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <Link 
          href={backHref}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 md:mb-12 bg-gradient-to-br from-blue-600/[0.04] via-indigo-500/[0.015] to-transparent border border-indigo-300/40 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground transition-all hover:from-blue-600/[0.08] hover:via-indigo-500/[0.035] ring-1 ring-indigo-400/15 shadow-[0_4px_12px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(255,255,255,1)]"
        >
          <ArrowLeft className="w-4 h-4" />
          {backText}
        </Link>

        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
          {Icon ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent backdrop-blur-xl flex flex-shrink-0 items-center justify-center border border-indigo-300/40 shadow-[0_10px_30px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-indigo-400/15"
            >
              <Icon className="w-10 h-10 drop-shadow-sm" style={{ color }} />
            </motion.div>
          ) : emoji ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent backdrop-blur-xl flex flex-shrink-0 items-center justify-center border border-indigo-300/40 shadow-[0_10px_30px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-indigo-400/15"
            >
              <span className="text-4xl md:text-5xl">{emoji}</span>
            </motion.div>
          ) : null}
          
          <div>
            <SectionTag text={tagText} variant="light" className="mb-4 md:mb-6" />
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6"
            >
              {title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium max-w-3xl"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
