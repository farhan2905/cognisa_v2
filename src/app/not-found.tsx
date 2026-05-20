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
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-indigo-300/40 bg-gradient-to-r from-white/8 via-white/4 to-white/2 shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.3),0_8px_24px_rgba(31,38,135,0.05)] backdrop-blur-sm mb-8">
            <Terminal className="w-4 h-4 text-indigo-500" />
            <span className="text-foreground/45 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold">
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
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_6px_30px_rgba(99,102,241,0.25)] hover:opacity-95 transition-all duration-300"
              >
                Return Home
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-foreground/70 border border-indigo-300/40 bg-gradient-to-br from-blue-600/[0.04] via-indigo-500/[0.015] to-transparent backdrop-blur-sm hover:border-indigo-300/60 hover:text-foreground transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
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
