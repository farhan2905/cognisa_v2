'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Palette, Sparkles } from 'lucide-react';

export default function WebPreviewFrame() {
  const [styleMode, setStyleMode] = useState<'glass' | 'neon' | 'cyber'>('glass');

  return (
    <div className="w-full h-full rounded-2xl border border-indigo-100 bg-white/45 backdrop-blur-md p-4 sm:p-5 font-mono text-[10px] sm:text-xs text-slate-800 flex flex-col justify-between overflow-hidden relative shadow-[0_8px_30px_rgba(99,102,241,0.02),inset_0_1px_0_rgba(255,255,255,0.8)]">
      {/* Top control bar */}
      <div className="flex items-center justify-between border-b border-indigo-100 pb-2 mb-2">
        <span className="flex items-center gap-1.5 font-bold text-[10px] sm:text-xs text-indigo-600">
          <Layout className="w-3.5 h-3.5" />
          INTERACTIVE MOCKUP
        </span>
        <div className="flex gap-1.5">
          {(['glass', 'neon', 'cyber'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setStyleMode(mode)}
              className={`px-2.5 py-1 rounded text-[8px] sm:text-[9px] font-bold uppercase transition-all border ${
                styleMode === mode
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-100 text-slate-500 border-indigo-50/50 hover:bg-slate-200'
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
            styleMode === 'glass'
              ? 'bg-indigo-50/40 backdrop-blur-md border-indigo-200/50 shadow-[0_10px_25px_rgba(99,102,241,0.04)]'
              : styleMode === 'neon'
              ? 'bg-white border-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
              : 'bg-slate-900 border-pink-500 shadow-[4px_4px_0_rgba(236,72,153,0.2)]'
          }`}
        >
          {/* Ambient overlay */}
          {styleMode === 'neon' && (
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none" />
          )}

          <div className="flex items-center justify-between z-10">
            <span
              className={`text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full ${
                styleMode === 'cyber'
                  ? 'bg-pink-500 text-black'
                  : 'bg-indigo-600/10 text-indigo-600'
              }`}
            >
              PREVIEW
            </span>
            <Sparkles
              className={`w-3.5 h-3.5 ${
                styleMode === 'cyber' ? 'text-pink-500 animate-spin' : 'text-indigo-500'
              }`}
            />
          </div>

          <div className="z-10">
            <div
              className={`w-20 h-3 rounded mb-2 ${
                styleMode === 'cyber' ? 'bg-pink-500' : 'bg-slate-700'
              }`}
            />
            <div
              className={`w-32 h-2 rounded ${
                styleMode === 'cyber' ? 'bg-pink-500/50' : 'bg-slate-400'
              }`}
            />
          </div>
        </motion.div>
      </div>

      {/* Output indicator */}
      <div className="flex items-center gap-1.5 border-t border-indigo-100 pt-2 mt-2 text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">
        <Palette className="w-3 h-3 text-indigo-500" />
        RENDER: {styleMode === 'glass' ? 'translucent_glass.css' : styleMode === 'neon' ? 'glowing_nodes.css' : 'brutalist_cyber.css'}
      </div>
    </div>
  );
}
