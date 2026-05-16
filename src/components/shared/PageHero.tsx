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
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PageHero({
  tagText,
  title,
  titleAccent,
  description,
  align = 'center',
  orbColor = '#6366f1',
  orbColor2 = '#8b5cf6',
}: PageHeroProps) {
  const isCenter = align === 'center';

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Dynamic Background Orbs */}
      <div
        className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[160px] pointer-events-none opacity-30 animate-orb-1"
        style={{ backgroundColor: orbColor }}
      />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20 animate-orb-2"
        style={{ backgroundColor: orbColor2 }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 z-[0] opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 0.8px, transparent 0.8px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div
        className={`w-full max-w-[1000px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 ${
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
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mt-6 mb-6"
        >
          {title}
          {titleAccent && (
            <>
              {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500">
                {titleAccent}
              </span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`text-lg md:text-xl text-foreground/70 leading-relaxed font-medium ${
            isCenter ? 'max-w-2xl mx-auto' : 'max-w-3xl'
          }`}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
