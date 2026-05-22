'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Globe, Layers } from 'lucide-react';
import { worksData } from '@/data/work';
import WorkBrowserPreview from './WorkBrowserPreview';
import SpatialWorkPreview from './SpatialWorkPreview';

interface DetailWorkShowcaseProps {
  work: typeof worksData[0];
}

export default function DetailWorkShowcase({ work }: DetailWorkShowcaseProps) {
  const [activeMode, setActiveMode] = useState<'live' | 'architecture'>('live');

  return (
    <div className="md:col-span-2 min-h-[450px] md:min-h-[500px] flex flex-col relative group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Browser Bar Header */}
      <div className="h-12 w-full bg-slate-50 border-b border-slate-200 flex items-center px-6 justify-between absolute top-0 left-0 right-0 z-30">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </div>

        {/* Dynamic Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveMode('live')}
            className={`px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeMode === 'live'
                ? 'bg-white text-cyan-600 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Live App
          </button>
          <button
            onClick={() => setActiveMode('architecture')}
            className={`px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeMode === 'architecture'
                ? 'bg-white text-cyan-600 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            3D Schema
          </button>
        </div>

        {/* Domain name */}
        <div className="text-[10px] font-mono text-slate-400 font-semibold max-w-[30%] truncate hidden sm:block">
          {work.link.replace('https://', '')}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="absolute inset-0 top-12 bottom-0 bg-white">
        <AnimatePresence mode="wait">
          {activeMode === 'live' ? (
            <motion.div
              key="live-sandbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <WorkBrowserPreview work={work} />
            </motion.div>
          ) : (
            <motion.div
              key="3d-schematic"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="absolute inset-0"
            >
              <SpatialWorkPreview work={work} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
