'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, Cpu, Play, Terminal } from 'lucide-react';

export default function TaskFlowSimulation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full rounded-2xl border border-indigo-100 bg-white/45 backdrop-blur-md p-4 sm:p-5 font-mono text-[10px] sm:text-xs text-slate-800 flex flex-col justify-between overflow-hidden relative shadow-[0_8px_30px_rgba(99,102,241,0.02),inset_0_1px_0_rgba(255,255,255,0.8)]">
      {/* Background terminal watermark */}
      <div className="absolute top-3 right-3 text-indigo-500/5 pointer-events-none">
        <Terminal className="w-16 h-16" />
      </div>

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-indigo-100 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[10px] sm:text-xs text-slate-400 font-semibold tracking-wider uppercase">
          AI_Pipeline_Engine.exe
        </span>
      </div>

      {/* Step Visualizer */}
      <div className="flex-grow flex flex-col justify-center gap-3.5 relative">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-4 p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 shadow-[0_4px_12px_rgba(99,102,241,0.02)]"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-200/50 text-indigo-600 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-slate-950 text-xs sm:text-sm font-bold">Incoming customer inquiry</div>
                <div className="text-slate-500 text-[10px] sm:text-xs">"Need to integrate billing..."</div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-4 p-3.5 rounded-xl bg-pink-50/60 border border-pink-100 shadow-[0_4px_12px_rgba(219,39,119,0.02)]"
            >
              <div className="w-9 h-9 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-200/40 text-pink-600 shrink-0">
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex-grow">
                <div className="text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-2">
                  LLM Classification
                  <span className="px-2 py-0.5 rounded bg-pink-100 text-pink-700 text-[9px] font-bold">
                    99.4%
                  </span>
                </div>
                <div className="text-slate-500 text-[10px] sm:text-xs">Categorized: Integrations / Sales</div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-4 p-3.5 rounded-xl bg-violet-50/60 border border-violet-100 shadow-[0_4px_12px_rgba(139,92,246,0.02)]"
            >
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-200/40 text-violet-600 shrink-0">
                <Play className="w-5 h-5" />
              </div>
              <div>
                <div className="text-slate-950 text-xs sm:text-sm font-bold">Trigger CRM Pipeline</div>
                <div className="text-slate-500 text-[10px] sm:text-xs">Hubspot record updated & slack notify</div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-4 p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 shadow-[0_4px_12px_rgba(16,185,129,0.02)]"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-200/40 text-emerald-600 shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <div className="text-slate-950 text-xs sm:text-sm font-bold">Auto-drafted response sent</div>
                <div className="text-slate-500 text-[10px] sm:text-xs">Executed in 240ms • Saved 12m</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              step === i ? 'bg-indigo-500 w-4' : 'bg-indigo-500/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
