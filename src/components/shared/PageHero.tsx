'use client';

import { motion } from 'framer-motion';
import SectionTag from './SectionTag';

interface PageHeroProps {
  tagText: string;
  title: string;
  titleAccent?: string;
  description: string;
  align?: 'center' | 'left';
  orbColor?: string;
  orbColor2?: string;
}

const wordReveal = {
  hidden: { opacity: 0, y: 34, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' as any },
  },
};

export default function PageHero({
  tagText,
  title,
  titleAccent,
  description,
  align = 'center',
  orbColor = '#06b6d4',
  orbColor2 = '#10b981',
}: PageHeroProps) {
  const isCenter = align === 'center';

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-white/86 via-cyan-50/45 to-slate-50/80 px-4 pb-14 pt-24 sm:px-6 md:pb-20 md:pt-32 lg:px-12 lg:pt-36">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:54px_54px] opacity-45" />
      <div
        className="absolute right-[-8%] top-[-18%] h-72 w-72 rounded-full blur-3xl opacity-[0.16]"
        style={{ backgroundColor: orbColor }}
      />
      <div
        className="absolute bottom-[-18%] left-[-8%] h-72 w-72 rounded-full blur-3xl opacity-[0.12]"
        style={{ backgroundColor: orbColor2 }}
      />

      <div
        className={`relative z-10 mx-auto w-full max-w-[1120px] ${
          isCenter ? 'text-center' : 'text-left'
        }`}
      >
        <SectionTag
          text={tagText}
          variant="light"
          className={isCenter ? 'justify-center' : ''}
        />

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={wordReveal}
          className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] text-slate-950 md:text-6xl"
        >
          {title}
          {titleAccent && (
            <>
              {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-emerald-600">
                {titleAccent}
              </span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
          className={`mt-6 text-base font-semibold leading-8 text-slate-600 md:text-lg ${
            isCenter ? 'mx-auto max-w-3xl' : 'max-w-3xl'
          }`}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
