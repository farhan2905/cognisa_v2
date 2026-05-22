'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Palette, Sparkles } from 'lucide-react';

export default function WebPreviewFrame() {
  const [styleMode, setStyleMode] = useState<'light' | 'dark' | 'accent'>('light');

  return (
    <div className="w-full h-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 font-mono text-[10px] sm:text-xs text-slate-800 flex flex-col justify-between overflow-hidden relative shadow-sm">
      {/* Top control bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
        <span className="flex items-center gap-1.5 font-bold text-[10px] sm:text-xs text-slate-700">
          <Layout className="w-3.5 h-3.5 text-cyan-600" />
          INTERACTIVE MOCKUP
        </span>
        <div className="flex gap-1.5">
          {(['light', 'dark', 'accent'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setStyleMode(mode)}
              className={`px-2.5 py-1 rounded text-[8px] sm:text-[9px] font-bold uppercase transition-all border ${
                styleMode === mode
                  ? 'bg-slate-950 text-white border-slate-950'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Mock Container */}
      <div className="flex-grow flex items-center justify-center relative">
        <motion.div
          layout
          className={`w-48 p-4 rounded-xl transition-all duration-500 flex flex-col justify-between h-32 relative overflow-hidden border ${
            styleMode === 'light'
              ? 'bg-white border-slate-200 shadow-sm'
              : styleMode === 'dark'
              ? 'bg-slate-900 border-slate-800 text-white shadow-sm'
              : 'bg-white border-cyan-200 shadow-[0_4px_12px_rgba(6,182,212,0.04)]'
          }`}
        >
          {/* Accent indicator bar */}
          {styleMode === 'accent' && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-600" />
          )}

          <div className="flex items-center justify-between z-10">
            <span
              className={`text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full ${
                styleMode === 'light'
                  ? 'bg-slate-100 text-slate-700'
                  : styleMode === 'dark'
                  ? 'bg-slate-800 text-slate-300'
                  : 'bg-cyan-50 text-cyan-700 border border-cyan-100/50'
              }`}
            >
              PREVIEW
            </span>
            <Sparkles
              className={`w-3.5 h-3.5 ${
                styleMode === 'accent' ? 'text-cyan-600' : 'text-slate-400'
              }`}
            />
          </div>

          <div className="z-10">
            <div
              className={`w-20 h-3 rounded mb-2 ${
                styleMode === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
              }`}
            />
            <div
              className={`w-32 h-2 rounded ${
                styleMode === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
              }`}
            />
          </div>
        </motion.div>
      </div>

      {/* Output indicator */}
      <div className="flex items-center gap-1.5 border-t border-slate-200 pt-2 mt-2 text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">
        <Palette className="w-3 h-3 text-cyan-600" />
        RENDER: {styleMode === 'light' ? 'theme_light.css' : styleMode === 'dark' ? 'theme_dark.css' : 'theme_accent.css'}
      </div>
    </div>
  );
}
