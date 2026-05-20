'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';
import WebPreviewFrame from '@/components/shared/fragments/WebPreviewFrame';
import TaskFlowSimulation from '@/components/shared/fragments/TaskFlowSimulation';
import ServerTopologyMap from '@/components/shared/fragments/ServerTopologyMap';
import CICDPipelineSimulator from '@/components/shared/fragments/CICDPipelineSimulator';

interface ServiceInteractiveShowcaseProps {
  slug: string;
  title: string;
  category: string;
  description: string;
  subservices: string[];
  color: string;
}

export default function ServiceInteractiveShowcase({
  slug,
  title,
  category,
  description,
  subservices,
  color,
}: ServiceInteractiveShowcaseProps) {
  // Spotlight coordinates states
  const [leftCoords, setLeftCoords] = useState({ x: 0, y: 0 });
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightCoords, setRightCoords] = useState({ x: 0, y: 0 });
  const [rightHovered, setRightHovered] = useState(false);

  const handleLeftMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLeftCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleRightMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRightCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className="w-full glass-surface-strong rounded-[2rem] flex flex-col overflow-hidden border border-indigo-100 shadow-[0_20px_50px_rgba(99,102,241,0.03)]"
      style={{
        boxShadow: `0 24px 60px rgba(99,102,241,0.03), 0 0 25px ${color}08, inset 0 1px 0 rgba(255, 255, 255, 0.75)`
      }}
    >
      {/* Decorative ambient color blur inside card */}
      <div
        className="absolute -top-32 -left-32 w-64 h-64 rounded-full blur-[90px] opacity-15 pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {/* Browser Top Bar */}
      <div className="w-full flex items-center justify-between px-6 py-4 bg-white/60 backdrop-blur-md border-b border-indigo-100">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="text-[10px] font-mono text-slate-400 ml-4 truncate max-w-[250px] sm:max-w-none">
            cognisa.io/services/{slug}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[8px] font-mono font-bold px-2 py-0.5 rounded-md border border-indigo-100 bg-white/70 text-slate-500 shadow-sm">
          <Terminal className="w-3 h-3 text-indigo-500" />
          <span>interactive - playground</span>
        </div>
      </div>

      {/* Card Content Row */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch p-6 md:p-10 lg:p-12 pb-8 lg:pb-12 h-full flex-grow relative">
        {/* Left Content */}
        <div
          onMouseMove={handleLeftMouseMove}
          onMouseEnter={() => setLeftHovered(true)}
          onMouseLeave={() => setLeftHovered(false)}
          className="w-full lg:w-[48%] text-left relative z-10 flex flex-col justify-between h-full p-4 sm:p-6 rounded-2xl border border-indigo-100 bg-white/35 backdrop-blur-md shadow-sm transition-all duration-500 overflow-hidden"
        >
          {leftHovered && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
              style={{
                background: `radial-gradient(280px circle at ${leftCoords.x}px ${leftCoords.y}px, rgba(99, 102, 241, 0.05), transparent 80%)`,
              }}
            />
          )}

          <div className="relative z-10 flex flex-col">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-600 mb-6 w-fit shadow-sm">
              {category}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              {title}
            </h3>

            <p className="text-sm text-slate-650 mb-8 leading-relaxed font-medium">
              {description}
            </p>

            {/* Subservices List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {subservices.map((sub, idx) => {
                const formattedNum = String(idx + 1).padStart(2, '0');
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-indigo-100/60 bg-white/50 hover:bg-white hover:border-indigo-200 shadow-[0_2px_8px_rgba(99,102,241,0.015)] hover:shadow-[0_4px_12px_rgba(99,102,241,0.03)] transition-all duration-300 group/item"
                  >
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50/50 w-7 h-7 flex items-center justify-center rounded-lg border border-indigo-100 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all">
                      {formattedNum}
                    </span>
                    <span className="text-xs font-bold text-slate-700 group-hover/item:text-slate-900 transition-colors">
                      {sub}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-auto block relative z-10 pt-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-[0_4px_12px_rgba(99,102,241,0.25)]"
            >
              Explore {title}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Graphic Area (Bento Visual Simulator) */}
        <div
          onMouseMove={handleRightMouseMove}
          onMouseEnter={() => setRightHovered(true)}
          onMouseLeave={() => setRightHovered(false)}
          className="w-full lg:w-[52%] min-h-[300px] sm:min-h-[340px] lg:h-auto rounded-2xl flex flex-col relative overflow-hidden p-6 bg-indigo-50/10 border border-indigo-100 shadow-[inset_0_2px_4px_rgba(99,102,241,0.01)] transition-all duration-500 hover:border-indigo-200 group/right"
        >
          {rightHovered && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
              style={{
                background: `radial-gradient(350px circle at ${rightCoords.x}px ${rightCoords.y}px, rgba(99, 102, 241, 0.08), transparent 80%)`,
              }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col h-full w-full justify-between items-stretch">
            {/* Simulation Header label */}
            <div className="flex items-center justify-between mb-4 border-b border-indigo-100 pb-3">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live Simulation Screen
              </span>
            </div>

            {/* Interactive Simulation Block */}
            <div className="w-full flex-grow flex items-center justify-center">
              {slug === 'web-development' && <WebPreviewFrame />}
              {slug === 'ai-automation' && <TaskFlowSimulation />}
              {slug === 'system-architecture' && <ServerTopologyMap />}
              {slug === 'cloud-infrastructure' && <CICDPipelineSimulator />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
