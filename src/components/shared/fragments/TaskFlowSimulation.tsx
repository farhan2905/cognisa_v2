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
    <div className="w-full h-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 font-mono text-[10px] sm:text-xs text-slate-800 flex flex-col justify-between overflow-hidden relative shadow-sm">
      {/* Background terminal watermark */}
      <div className="absolute top-3 right-3 text-cyan-500/5 pointer-events-none">
        <Terminal className="w-16 h-16" />
      </div>

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          <span className="w-2 h-2 rounded-full bg-slate-500" />
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
              className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center border border-cyan-200 text-cyan-700 shrink-0">
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
              className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center border border-cyan-200 text-cyan-700 shrink-0">
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex-grow">
                <div className="text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-2">
                  LLM Classification
                  <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 text-[9px] font-bold border border-cyan-200/50">
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
              className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center border border-cyan-200 text-cyan-700 shrink-0">
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
              className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center border border-cyan-200 text-cyan-700 shrink-0">
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
              step === i ? 'bg-cyan-600 w-4' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
