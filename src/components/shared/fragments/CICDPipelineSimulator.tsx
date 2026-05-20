'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, RefreshCw, CheckCircle2 } from 'lucide-react';

const LOG_LINES = [
  { text: 'git clone https://github.com/farhan2905/cognisa.git', type: 'command' },
  { text: 'npm ci --prefer-offline --no-audit', type: 'command' },
  { text: 'npm run build', type: 'command' },
  { text: 'info  - Creating an optimized production build...', type: 'info' },
  { text: 'info  - Compiled successfully', type: 'success' },
  { text: 'info  - Route (app) /services pre-rendered (SSG)', type: 'info' },
  { text: 'deploying built assets to global edge network...', type: 'info' },
  { text: 'Deployment is live! URL: https://cognisa.io', type: 'ready' }
];

export default function CICDPipelineSimulator() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= LOG_LINES.length) {
          return 0; // Reset loop
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-56 sm:h-64 md:h-72 rounded-2xl border border-indigo-100 bg-white/45 backdrop-blur-md p-4 sm:p-5 font-mono text-[10px] sm:text-xs text-slate-800 flex flex-col justify-between overflow-hidden relative shadow-[0_8px_30px_rgba(99,102,241,0.02),inset_0_1px_0_rgba(255,255,255,0.8)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-indigo-100 pb-2 mb-2">
        <span className="flex items-center gap-1.5 font-bold text-[10px] sm:text-xs text-indigo-600">
          <Terminal className="w-3.5 h-3.5" />
          CI/CD DEPLOY PIPELINE
        </span>
        <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-500">
          {visibleLines < LOG_LINES.length ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
              BUILDING...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              STABLE
            </>
          )}
        </span>
      </div>

      {/* Output screen */}
      <div className="flex-grow flex flex-col justify-end gap-2 overflow-hidden text-left py-2 pr-1 border border-indigo-100 rounded-lg bg-indigo-50/20 p-3 font-mono h-32 sm:h-40">
        {LOG_LINES.slice(0, visibleLines).map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-1.5 font-mono tracking-wide ${
              line.type === 'command'
                ? 'text-indigo-600 font-semibold'
                : line.type === 'success'
                ? 'text-emerald-600 font-bold'
                : line.type === 'ready'
                ? 'text-cyan-700 font-bold bg-cyan-50/50 border border-cyan-200/40 p-1.5 rounded w-full'
                : 'text-slate-600'
            }`}
          >
            {line.type === 'command' && <span className="text-indigo-300 select-none">$</span>}
            <span className="truncate">{line.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-indigo-50 h-1.5 rounded-full overflow-hidden border border-indigo-100/50 mt-2.5">
        <motion.div
          className="h-full bg-cyan-500"
          animate={{ width: `${(visibleLines / LOG_LINES.length) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
