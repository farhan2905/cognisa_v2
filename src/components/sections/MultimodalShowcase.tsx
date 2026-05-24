'use client';

import type { CSSProperties, ElementType } from 'react';
import { useEffect, useState, useRef } from 'react';
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
  steps: {
    label: string;
    text: string;
  }[];
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
    steps: [
      { label: 'Frame Capture', text: 'Grabs screenshot or camera viewport' },
      { label: 'Layout Analysis', text: 'Identifies buttons, forms, and visual coordinates' },
      { label: 'Action Trigger', text: 'Fires browser click event or extracts visual text' },
    ],
  },
  documents: {
    label: 'Documents',
    eyebrow: 'Document intelligence',
    title: 'Extract decisions from forms, PDFs, and messy files.',
    copy: 'Turn invoices, intake forms, contracts, and operational documents into structured data with review checkpoints before anything sensitive moves.',
    icon: FileText,
    accent: '#10b981',
    tint: 'from-emerald-500/18 to-teal-500/10',
    signals: ['Invoice parsing', 'Form intake', 'Contract review'],
    outcomes: ['Cleaner data', 'Audit history', 'Human approval'],
    steps: [
      { label: 'PDF Intake', text: 'Receives invoice, contract, or form file' },
      { label: 'Schema Parse', text: 'Extracts tables, numbers, and key-value fields' },
      { label: 'Review Sync', text: 'Flags discrepancies and pushes to CRM/ERP' },
    ],
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
    steps: [
      { label: 'Audio Stream', text: 'Captures microphone input or call recording' },
      { label: 'Intent Capture', text: 'Transcribes speech and categorizes caller intent' },
      { label: 'CRM Update', text: 'Drafts response email and logs follow-up actions' },
    ],
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
    steps: [
      { label: 'Complex Query', text: 'User submits unstructured, multi-step prompt' },
      { label: 'Dynamic Routing', text: 'Dispatches task between fast or reasoning LLMs' },
      { label: 'Tool Orchestrate', text: 'Combines LLM outputs, executes code, returns final data' },
    ],
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
        className="relative min-h-[580px] overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.10)] sm:p-6"
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
                  {/* Dynamic Visual Mockup Panel based on Capability Domain */}
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] p-4 min-h-[140px] flex flex-col justify-center">
                    <div className="absolute inset-x-6 top-8 h-24 rounded-full blur-3xl" style={{ backgroundColor: `${item.accent}2b` }} />
                    
                    {active === 'vision' && (
                      <div className="relative w-full flex flex-col justify-center py-2">
                        <motion.div
                          animate={{ y: [-15, 60, -15] }}
                          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                          className="absolute inset-x-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_#06b6d4] z-20"
                        />
                        <div className="flex gap-3 justify-center items-center relative z-10">
                          <div className="relative border border-cyan-400/50 bg-cyan-500/10 px-2.5 py-1.5 rounded text-[9px] font-mono text-cyan-300">
                            Hero_Header
                            <span className="absolute -top-2 left-0 text-[6px] bg-cyan-500 text-white px-1 rounded-sm uppercase">Header 98%</span>
                          </div>
                          <div className="relative border border-amber-400/50 bg-amber-500/10 px-2.5 py-1.5 rounded text-[9px] font-mono text-amber-300">
                            CTA_Button
                            <span className="absolute -top-2 left-0 text-[6px] bg-amber-500 text-white px-1 rounded-sm uppercase">Button 99%</span>
                          </div>
                          <div className="relative border border-red-400/50 bg-red-500/10 px-2.5 py-1.5 rounded text-[9px] font-mono text-red-300">
                            Sidebar_Nav
                            <span className="absolute -top-2 left-0 text-[6px] bg-red-500 text-white px-1 rounded-sm uppercase">Nav 95%</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {active === 'documents' && (
                      <div className="relative w-full flex flex-col justify-between font-mono text-[9px] gap-2 py-1.5">
                        <div className="border-b border-white/10 pb-1.5 flex justify-between items-center text-white/50 text-[7px] tracking-wider">
                          <span>DOC_TYPE: INVOICE_PDF</span>
                          <span className="text-emerald-400">SCHEMA_MATCH: 100%</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                            <span className="text-white/60">vendor_name</span>
                            <span className="text-emerald-300 font-bold">"Bhairav Steel"</span>
                          </div>
                          <div className="flex justify-between items-center bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                            <span className="text-white/60">invoice_total</span>
                            <span className="text-emerald-300 font-bold">$14,250.00</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {active === 'voice' && (
                      <div className="relative w-full flex items-center justify-between gap-4 py-1">
                        <div className="flex-1 flex flex-col justify-center gap-1 font-mono text-[9px]">
                          <div className="text-white/40 text-[7px] uppercase tracking-wider">TRANSCRIPT_LIVE:</div>
                          <div className="text-teal-300 font-bold truncate">"I need to adjust my shipping address..."</div>
                          <div className="text-white/60 text-[8px]">Intent: <span className="text-cyan-300 uppercase font-black">address_change</span></div>
                        </div>
                        <div className="flex items-center gap-1 h-10 px-2 border-l border-white/10 shrink-0">
                          {[0.4, 0.9, 0.5, 0.7, 0.3, 0.8, 0.6, 0.9, 0.4, 0.7, 0.3, 0.5].map((scaleVal, i) => (
                            <motion.div
                              key={i}
                              animate={{ scaleY: [1, scaleVal * 1.8, 1] }}
                              transition={{
                                repeat: Infinity,
                                duration: 1.2 + (i % 3) * 0.2,
                                ease: 'easeInOut',
                                delay: i * 0.05,
                              }}
                              className="w-0.5 bg-teal-400 rounded-full origin-center"
                              style={{ height: '20px' }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {active === 'routing' && (
                      <div className="relative w-full flex items-center justify-between font-mono text-[9px] py-1.5">
                        <div className="flex flex-col items-center justify-center border border-white/15 bg-white/5 rounded px-2 py-1 shrink-0 z-10">
                          <span className="text-white font-bold">Query</span>
                          <span className="text-white/40 text-[6px] uppercase tracking-wider">Router</span>
                        </div>
                        
                        <div className="flex-1 relative h-full flex flex-col justify-between py-1 px-4">
                          <div className="absolute inset-0 flex flex-col justify-between py-2">
                            <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20 animate-pulse" />
                            <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20 animate-pulse" />
                            <div className="h-0.5 w-full bg-gradient-to-r from-purple-500/20 via-purple-500 to-purple-500/20 animate-pulse" />
                          </div>
                        </div>

                        <div className="flex flex-col justify-between h-full shrink-0 text-[7px] gap-1">
                          <div className="border border-blue-500/30 bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <span>Haiku</span>
                            <span className="text-white/40">(Fast)</span>
                          </div>
                          <div className="border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <span>Sonnet</span>
                            <span className="text-white/40">(Deep)</span>
                          </div>
                          <div className="border border-purple-500/30 bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <span>Tools</span>
                            <span className="text-white/40">(Python)</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Flow Nodes Row */}
                  <div className="relative z-10 grid gap-3 sm:grid-cols-3">
                    {item.steps.map((node, index) => (
                      <motion.div
                        key={node.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.32 }}
                        className="flex min-h-[96px] flex-col justify-between rounded-lg border border-white/10 bg-white/[0.04] p-3"
                      >
                        <span className="font-mono text-[9px] font-black uppercase text-white/40">0{index + 1}</span>
                        <div>
                          <p className="text-xs font-black capitalize text-white">{node.label}</p>
                          <p className="mt-1 text-[10px] font-semibold leading-4 text-white/55">
                            {node.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
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
    }, 10000); // Slow down transition speed to 10 seconds
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
              <EnterpriseButton href="/capabilities">Explore AI automation</EnterpriseButton>
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
                      <span className="block h-full bg-cyan-300 progress-bar-fill" style={{ '--duration': '10s' } as CSSProperties} />
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
