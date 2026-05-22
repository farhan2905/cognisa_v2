'use client';

import type { CSSProperties, ElementType } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Camera,
  CheckCircle2,
  FileText,
  GitBranch,
  Mic2,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import EnterpriseButton from '@/components/shared/EnterpriseButton';

type CapabilityKey = 'vision' | 'documents' | 'voice' | 'routing';

const capabilities: Record<CapabilityKey, {
  label: string;
  eyebrow: string;
  title: string;
  copy: string;
  icon: ElementType;
  accent: string;
  tint: string;
  signals: string[];
  outcomes: string[];
}> = {
  vision: {
    label: 'Vision',
    eyebrow: 'Computer vision',
    title: 'Inspect images, screens, and real-world context.',
    copy: 'Prototype AI workflows that read screenshots, identify objects, classify documents, and route visual evidence into the right business action.',
    icon: Camera,
    accent: '#06b6d4',
    tint: 'from-cyan-500/18 to-sky-500/10',
    signals: ['Screenshot review', 'Object detection', 'Visual QA'],
    outcomes: ['Faster triage', 'Less manual inspection', 'Clearer evidence'],
  },
  documents: {
    label: 'Documents',
    eyebrow: 'Document intelligence',
    title: 'Extract decisions from forms, PDFs, and messy files.',
    copy: 'Turn invoices, intake forms, contracts, and operational documents into structured data with review checkpoints before anything sensitive moves.',
    icon: FileText,
    accent: '#10b981',
    tint: 'from-emerald-500/18 to-teal-500/10',
    signals: ['Invoice parsing', 'Contract notes', 'Form intake'],
    outcomes: ['Cleaner data', 'Audit history', 'Human approval'],
  },
  voice: {
    label: 'Voice',
    eyebrow: 'Voice and conversation',
    title: 'Capture calls and turn conversations into next steps.',
    copy: 'Use voice notes, call summaries, transcripts, and follow-up generation to keep sales, support, and operations moving without losing context.',
    icon: Mic2,
    accent: '#0f766e',
    tint: 'from-teal-500/18 to-cyan-500/10',
    signals: ['Call summary', 'Intent capture', 'Follow-up draft'],
    outcomes: ['Faster response', 'Better handoffs', 'Less admin'],
  },
  routing: {
    label: 'Model routing',
    eyebrow: 'Multi-model orchestration',
    title: 'Route each task to the right AI capability.',
    copy: 'Design front-end prototypes and system plans that choose between fast models, reasoning models, vision, retrieval, tools, and human review.',
    icon: GitBranch,
    accent: '#1d4ed8',
    tint: 'from-blue-500/18 to-cyan-500/10',
    signals: ['Task router', 'Tool calls', 'Fallback logic'],
    outcomes: ['Lower risk', 'Better accuracy', 'Cost control'],
  },
};

const capabilityEntries = Object.entries(capabilities) as [CapabilityKey, typeof capabilities[CapabilityKey]][];

function CapabilityPreview({ active }: { active: CapabilityKey }) {
  const item = capabilities[active];
  const Icon = item.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, scale: 0.985 }}
        transition={{ duration: 0.36, ease: 'easeOut' }}
        className="relative min-h-[520px] overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.10)] sm:p-6"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${item.tint}`} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-5 flex items-center justify-between gap-4 rounded-full border border-slate-200 bg-white/82 px-3 py-2 shadow-sm backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 heartbeat-glow" />
              <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Prototype mode</span>
            </div>
            <span className="font-mono text-[10px] font-black uppercase text-slate-400">No live model calls</span>
          </div>

          <div className="grid flex-1 gap-5 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="flex flex-col rounded-[1.1rem] border border-slate-200 bg-white/88 p-5 shadow-sm backdrop-blur">
              <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-950 text-white shadow-sm">
                <Icon className="h-6 w-6" />
              </span>
              <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: item.accent }}>
                {item.eyebrow}
              </p>
              <h3 className="mt-3 text-3xl font-black leading-tight text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{item.copy}</p>

              <div className="mt-auto pt-7">
                <div className="grid gap-2">
                  {item.signals.map((signal, index) => (
                    <motion.div
                      key={signal}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.28 }}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                    >
                      <span className="text-sm font-black text-slate-700">{signal}</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.1rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:38px_38px] opacity-20" />
              <div className="absolute right-[-12%] top-[-12%] h-64 w-64 rounded-full blur-3xl" style={{ backgroundColor: `${item.accent}32` }} />

              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-mono text-[10px] font-black uppercase text-white/45">
                    Cognisa multimodal canvas
                  </span>
                </div>

                <div className="grid gap-4">
                  <div className="relative min-h-[210px] overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="absolute inset-x-6 top-8 h-24 rounded-full blur-3xl" style={{ backgroundColor: `${item.accent}2b` }} />
                    <div className="scan-sweep absolute left-0 right-0 top-0 h-16 bg-gradient-to-b from-cyan-200/0 via-cyan-200/24 to-cyan-200/0" />
                    <div className="relative z-10 grid h-full gap-3 sm:grid-cols-3">
                      {['input', 'reason', 'action'].map((node, index) => (
                        <motion.div
                          key={node}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08, duration: 0.32 }}
                          className="flex min-h-36 flex-col justify-between rounded-lg border border-white/10 bg-white/[0.08] p-4"
                        >
                          <span className="font-mono text-[10px] font-black uppercase text-white/40">0{index + 1}</span>
                          <div>
                            <p className="text-lg font-black capitalize text-white">{node}</p>
                            <p className="mt-2 text-xs font-semibold leading-5 text-white/55">
                              {index === 0 && 'Capture business signal'}
                              {index === 1 && 'Route to model/tool'}
                              {index === 2 && 'Return governed output'}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {item.outcomes.map((outcome, index) => (
                      <motion.div
                        key={outcome}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 + index * 0.07, duration: 0.3 }}
                        className="rounded-lg border border-white/10 bg-white/[0.06] p-4"
                      >
                        <span className="mb-3 block h-1.5 w-10 rounded-full" style={{ backgroundColor: item.accent }} />
                        <p className="text-sm font-black text-white">{outcome}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                      <p className="text-sm font-semibold leading-6 text-emerald-50">
                        The demo is intentionally front-end only: it sells the capability clearly without pretending to run a paid AI backend.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function MultimodalShowcase() {
  const [active, setActive] = useState<CapabilityKey>('vision');
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => {
      setActive((current) => {
        const keys = capabilityEntries.map(([key]) => key);
        return keys[(keys.indexOf(current) + 1) % keys.length];
      });
    }, 6200);
    return () => window.clearInterval(timer);
  }, [autoPlay]);

  return (
    <section id="multimodal" className="section-anchor relative overflow-hidden bg-gradient-to-b from-white/74 via-cyan-50/38 to-white/76 px-4 py-14 sm:px-6 md:py-20 lg:px-10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(700px_circle_at_12%_0%,rgba(6,182,212,0.12),transparent_60%),radial-gradient(760px_circle_at_88%_24%,rgba(16,185,129,0.10),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-9 grid gap-6 lg:grid-cols-[0.84fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Multimodal AI layer</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              Show the AI capability without overbuilding the backend.
            </h2>
          </div>
          <div className="max-w-2xl lg:ml-auto">
            <p className="text-base font-semibold leading-8 text-slate-600">
              Cognisa can present vision, documents, voice, and model-routing as credible product demos first, then connect real APIs when the business case is proven.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <EnterpriseButton href="/services/ai-automation">Explore AI automation</EnterpriseButton>
              <EnterpriseButton href="/contact" variant="secondary">Scope a prototype</EnterpriseButton>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[330px_1fr]">
          <div className="rounded-[1.35rem] border border-slate-200 bg-white/82 p-3 shadow-sm backdrop-blur-xl">
            {capabilityEntries.map(([key, item]) => {
              const Icon = item.icon;
              const isActive = active === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActive(key);
                    setAutoPlay(false);
                  }}
                  className={`relative mb-2 flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition last:mb-0 ${
                    isActive
                      ? 'border-slate-300 bg-slate-950 text-white shadow-[0_14px_34px_rgba(15,23,42,0.16)]'
                      : 'border-transparent bg-white/40 text-slate-700 hover:border-slate-200 hover:bg-white'
                  }`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${isActive ? 'border-white/10 bg-white/10' : 'border-slate-200 bg-slate-50'}`}>
                    <Icon className="h-5 w-5" style={{ color: isActive ? '#ffffff' : item.accent }} />
                  </span>
                  <span>
                    <span className="block text-sm font-black">{item.label}</span>
                    <span className={`mt-1 block text-xs font-semibold ${isActive ? 'text-white/62' : 'text-slate-500'}`}>
                      {item.eyebrow}
                    </span>
                  </span>
                  {isActive && autoPlay && (
                    <span className="absolute inset-x-4 bottom-2 h-0.5 overflow-hidden rounded-full bg-white/12">
                      <span className="block h-full bg-cyan-300 progress-bar-fill" style={{ '--duration': '6.2s' } as CSSProperties} />
                    </span>
                  )}
                </button>
              );
            })}

            <div className="mt-3 rounded-xl border border-cyan-200 bg-cyan-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4 text-cyan-700" />
                <span className="text-xs font-black uppercase text-cyan-900">Cognisa context</span>
              </div>
              <p className="text-sm font-semibold leading-6 text-cyan-950/80">
                Use these blocks across services, process, and contact pages to make AI integration feel tangible.
              </p>
            </div>
          </div>

          <CapabilityPreview active={active} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { icon: Workflow, title: 'Workflow-first', copy: 'The AI demo starts from a real bottleneck, not a generic chatbot.' },
            { icon: Sparkles, title: 'Interactive but honest', copy: 'Prototype visuals communicate capability without fake live outputs.' },
            { icon: ShieldCheck, title: 'Ready for real APIs later', copy: 'The section can evolve into a live model demo when scope and costs are clear.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="enterprise-ice-card rounded-[1.2rem] p-5">
                <Icon className="mb-5 h-6 w-6 text-cyan-700" />
                <h3 className="text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{item.copy}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                  Capability note
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
