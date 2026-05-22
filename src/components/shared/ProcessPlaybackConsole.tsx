'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  ChevronRight,
  FastForward,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

const PHASE_LOGS = [
  {
    phase: '01',
    title: 'Intake & Strategy',
    color: '#0891b2',
    commands: [
      { text: 'intake.scan --workflow=bottleneck --priority=high', type: 'command' },
      { text: 'mapping users, tools, data sources, and current handoffs...', type: 'info' },
      { text: 'detecting automation risk and human approval points...', type: 'info' },
      { text: 'ready: scope generated with measurable operating outcome', type: 'success' },
    ],
  },
  {
    phase: '02',
    title: 'Architecture & Design',
    color: '#0f766e',
    commands: [
      { text: 'system.design --roles --data-model --integrations', type: 'command' },
      { text: 'building interface map, data model, and API contracts...', type: 'info' },
      { text: 'adding logs, fallbacks, permissions, and review gates...', type: 'info' },
      { text: 'ready: architecture approved for build and automation', type: 'success' },
    ],
  },
  {
    phase: '03',
    title: 'Engineering & Development',
    color: '#0d9488',
    commands: [
      { text: 'build.ship --frontend --backend --dashboards', type: 'command' },
      { text: 'creating product UI, APIs, forms, and admin workflows...', type: 'info' },
      { text: 'connecting CRM, email, database, and notification layer...', type: 'info' },
      { text: 'ready: working system prepared for automation passes', type: 'success' },
    ],
  },
  {
    phase: '04',
    title: 'Automation & QA',
    color: '#06b6d4',
    commands: [
      { text: 'agent.route --vision --docs --voice --human-review', type: 'command' },
      { text: 'simulating intake, routing, approval, action, and report states...', type: 'info' },
      { text: 'testing empty states, error paths, and permission boundaries...', type: 'info' },
      { text: 'ready: governed automation paths passed review', type: 'success' },
    ],
  },
  {
    phase: '05',
    title: 'Launch & Improve',
    color: '#10b981',
    commands: [
      { text: 'release.deploy --monitoring --iteration-loop', type: 'command' },
      { text: 'shipping production build with alerts and support controls...', type: 'info' },
      { text: 'capturing adoption signals and next bottleneck candidates...', type: 'info' },
      { text: 'ready: managed operating layer live and improving', type: 'success' },
    ],
  },
];

interface ProcessPlaybackConsoleProps {
  activePhaseIndex?: number;
  setActivePhaseIndex?: (idx: number | ((prev: number) => number)) => void;
  isPlaying?: boolean;
  setIsPlaying?: (playing: boolean) => void;
}

export default function ProcessPlaybackConsole({
  activePhaseIndex: externalActivePhaseIndex,
  setActivePhaseIndex: externalSetActivePhaseIndex,
  isPlaying: externalIsPlaying,
  setIsPlaying: externalSetIsPlaying,
}: ProcessPlaybackConsoleProps = {}) {
  const [localActivePhaseIndex, localSetActivePhaseIndex] = useState(0);
  const [localIsPlaying, localSetIsPlaying] = useState(true);
  const [visibleLinesCount, setVisibleLinesCount] = useState(1);
  const timerRef = useRef<any>(null);
  const lineTimerRef = useRef<any>(null);

  const activePhaseIndex = externalActivePhaseIndex ?? localActivePhaseIndex;
  const setActivePhaseIndex = externalSetActivePhaseIndex ?? localSetActivePhaseIndex;
  const isPlaying = externalIsPlaying ?? localIsPlaying;
  const setIsPlaying = externalSetIsPlaying ?? localSetIsPlaying;
  const activePhase = PHASE_LOGS[activePhaseIndex];

  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = window.setInterval(() => {
      setVisibleLinesCount(1);
      setActivePhaseIndex((prev) => (prev >= PHASE_LOGS.length - 1 ? 0 : prev + 1));
    }, 9200);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isPlaying, setActivePhaseIndex]);

  useEffect(() => {
    setVisibleLinesCount(1);
    if (lineTimerRef.current) window.clearInterval(lineTimerRef.current);

    const maxLines = PHASE_LOGS[activePhaseIndex].commands.length;
    lineTimerRef.current = window.setInterval(() => {
      setVisibleLinesCount((prev) => {
        if (prev >= maxLines) {
          if (lineTimerRef.current) window.clearInterval(lineTimerRef.current);
          return maxLines;
        }
        return prev + 1;
      });
    }, 1450);

    return () => {
      if (lineTimerRef.current) window.clearInterval(lineTimerRef.current);
    };
  }, [activePhaseIndex]);

  const handleRewind = () => {
    setVisibleLinesCount(1);
    setActivePhaseIndex(0);
  };

  const handleForward = () => {
    setVisibleLinesCount(1);
    setActivePhaseIndex((prev) => (prev < PHASE_LOGS.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="enterprise-ice-card mx-auto w-full max-w-[980px] rounded-[2rem] p-4 sm:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
        <div>
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-cyan-600">
            interactive delivery pipeline
          </span>
          <h4 className="text-lg font-black tracking-tight text-slate-950 sm:text-xl">
            Process simulation console
          </h4>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRewind}
            title="Rewind to phase 1"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 shadow-sm transition-all hover:border-slate-350 hover:bg-slate-50 hover:text-slate-800"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause auto-play' : 'Play auto-play'}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm transition-all hover:bg-slate-850"
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="ml-0.5 h-5 w-5 fill-white" />}
          </button>
          <button
            onClick={handleForward}
            title="Next phase"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 shadow-sm transition-all hover:border-slate-350 hover:bg-slate-50 hover:text-slate-800"
          >
            <FastForward className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-5 gap-1.5 sm:gap-2">
        {PHASE_LOGS.map((phase, idx) => {
          const isActive = idx === activePhaseIndex;
          return (
            <button
              key={phase.phase}
              onClick={() => {
                setIsPlaying(false);
                setActivePhaseIndex(idx);
              }}
              className={`relative flex flex-col items-center justify-center rounded-xl border p-1.5 text-center transition-all sm:p-3 group ${
                isActive
                  ? 'border-slate-900 bg-slate-950 text-white shadow-sm'
                  : 'border-slate-200 bg-transparent text-slate-500 hover:border-slate-350 hover:text-slate-850'
              }`}
            >
              <span
                className={`text-[8.5px] font-mono font-bold sm:text-[10px] ${
                  isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-800'
                }`}
              >
                PHASE {phase.phase}
              </span>
              <span className="mt-1 hidden max-w-[84px] truncate text-[7.5px] font-bold uppercase tracking-wider md:block">
                {phase.title.split(' ')[0]}
              </span>
              {isActive && isPlaying && (
                <span className="absolute inset-x-2 bottom-1 h-0.5 overflow-hidden rounded-full bg-slate-800">
                  <span className="block h-full bg-cyan-400 progress-bar-fill" style={{ '--duration': '9.2s' } as CSSProperties} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="relative flex h-64 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            </div>
            <span className="ml-2 flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500">
              <Terminal className="h-3.5 w-3.5 text-cyan-600" />
              pipeline-simulator
            </span>
          </div>

          <span className="hidden rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[8px] font-mono font-bold text-slate-650 sm:inline-flex">
            ACTIVE: {activePhase.title}
          </span>
        </div>

        <div className="custom-scrollbar flex flex-grow flex-col justify-start gap-2 overflow-y-auto p-5 text-left font-mono text-[9.5px] leading-relaxed text-slate-700">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhaseIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2 font-mono"
            >
              {activePhase.commands.slice(0, visibleLinesCount).map((cmd, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-start gap-1.5 font-mono tracking-wide ${
                    cmd.type === 'command'
                      ? 'font-bold text-cyan-700'
                      : cmd.type === 'success'
                        ? 'font-bold text-emerald-700'
                        : 'text-slate-500'
                  }`}
                >
                  {cmd.type === 'command' ? (
                    <>
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-cyan-600" />
                      <span>{cmd.text}</span>
                    </>
                  ) : cmd.type === 'success' ? (
                    <>
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
                      <span>{cmd.text}</span>
                    </>
                  ) : (
                    <>
                      <span className="flex-shrink-0 text-slate-300">::</span>
                      <span>{cmd.text}</span>
                    </>
                  )}
                </motion.div>
              ))}

              {visibleLinesCount < activePhase.commands.length && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                  className="ml-5 block h-3 w-1.5 flex-shrink-0 bg-cyan-600"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[auto_1fr_auto] md:items-center">
        <ShieldCheck className="h-5 w-5 text-slate-700" />
        <p className="text-sm font-semibold leading-6 text-slate-650">
          Every phase follows a rigorous path to ensure seamless transition from scoping to live operation: workflow intake, architecture design, system engineering, governed QA, and continuous improvement.
        </p>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-black uppercase text-slate-700">
          Human in loop
        </span>
      </div>
    </div>
  );
}
