'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import MiniNeuralConstellation from '@/components/shared/fragments/MiniNeuralConstellation';
import TerminalTyping from '@/components/shared/TerminalTyping';
import { ArrowRight, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden">
      <MiniNeuralConstellation className="z-0 opacity-20" />
      <div className="absolute inset-0 z-[0] pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-gradient-to-bl from-indigo-100/40 via-violet-50/20 to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[600px] mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-foreground/[0.06] bg-white/40 backdrop-blur-sm mb-8">
            <Terminal className="w-4 h-4 text-indigo-500" />
            <span className="text-[#1a1a2e]/40 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold">
              cognisa@dev:~$
            </span>
          </div>

          <div className="glass-surface-strong rounded-[2.5rem] p-8 md:p-12 border border-indigo-300/40 ring-1 ring-indigo-400/15 shadow-[0_16px_48px_rgba(99,102,241,0.12)]">
            <span className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 block mb-6">
              404
            </span>

            <div className="mb-6 font-mono text-xs text-foreground/40 h-10 flex items-center justify-center">
              <TerminalTyping
                commands={[
                  '> cd /requested-page',
                  '> Error: 404 — Page not found in filesystem',
                  '> suggest: cd /',
                ]}
                typingSpeed={35}
                deleteSpeed={20}
                pauseDuration={2000}
              />
            </div>

            <p className="text-foreground/60 text-base md:text-lg mb-8">
              The page you&apos;re looking for doesn&apos;t exist in our filesystem. It may have been moved, renamed, or never existed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-[#4f46e5] via-[#6366f1] to-[#7c3aed] shadow-[0_6px_30px_rgba(99,102,241,0.35)] hover:shadow-[0_10px_40px_rgba(99,102,241,0.45)] transition-shadow duration-500"
              >
                Return Home
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-foreground/70 border border-foreground/10 bg-white/40 backdrop-blur-sm hover:border-foreground/20 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
