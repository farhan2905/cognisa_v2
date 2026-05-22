'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgeCheck,
  Bot,
  Blocks,
  Brain,
  ChevronRight,
  ClipboardCheck,
  CloudCog,
  Code2,
  DatabaseZap,
  GitMerge,
  Layers3,
  LockKeyhole,
  Rocket,
  SearchCheck,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TestTubeDiagonal,
  Workflow,
} from 'lucide-react';
import EnterpriseButton from '@/components/shared/EnterpriseButton';

const appTabs = [
  {
    key: 'webapps',
    label: 'Custom Web Apps',
    title: 'Build the product your workflow needs.',
    copy: 'Cognisa creates websites, portals, dashboards, SaaS MVPs, and internal tools with the right architecture from the start.',
    icon: Code2,
    points: ['Fast interfaces', 'Dashboards', 'Role-based portals', 'Production APIs'],
  },
  {
    key: 'automation',
    label: 'AI Automation',
    title: 'Turn repetitive work into connected workflows.',
    copy: 'We add AI where it saves time: support triage, follow-ups, reporting, data entry, approvals, and operational handoffs.',
    icon: Bot,
    points: ['AI agents', 'Task routing', 'Data extraction', 'Human review'],
  },
  {
    key: 'systems',
    label: 'Systems & Support',
    title: 'Connect the tools your team already uses.',
    copy: 'From launch to iteration, Cognisa helps your systems stay stable, observable, and easier for your team to operate.',
    icon: CloudCog,
    points: ['Integrations', 'Deployment', 'Monitoring', 'Iteration'],
  },
];

const platformWays = [
  {
    label: 'Discover',
    title: 'Map the bottleneck before writing code.',
    copy: 'Clarify the workflow, users, current tools, data sources, and measurable outcome before the build starts.',
    icon: ClipboardCheck,
    proof: 'Clear scope',
  },
  {
    label: 'Architect',
    title: 'Design the system behind the screen.',
    copy: 'Plan the data model, roles, APIs, integrations, and deployment path so the product can grow cleanly.',
    icon: Layers3,
    proof: 'Stronger foundation',
  },
  {
    label: 'Build',
    title: 'Ship the web application with focus.',
    copy: 'Create the frontend, backend, dashboards, forms, portals, and workflows your users need first.',
    icon: Sparkles,
    proof: 'Working product',
  },
  {
    label: 'Automate',
    title: 'Use AI only where it removes real work.',
    copy: 'Add agents, extraction, routing, summaries, and decision support around repetitive operational tasks.',
    icon: Workflow,
    proof: 'Less manual effort',
  },
  {
    label: 'Integrate',
    title: 'Connect the tools already in the business.',
    copy: 'Sync forms, CRMs, email, spreadsheets, databases, payment tools, and internal systems where needed.',
    icon: DatabaseZap,
    proof: 'Cleaner handoffs',
  },
  {
    label: 'Test',
    title: 'Check the real user paths.',
    copy: 'Test core flows, responsive layouts, failure states, and handoff cases before launch.',
    icon: TestTubeDiagonal,
    proof: 'Fewer surprises',
  },
  {
    label: 'Deploy',
    title: 'Launch with the operational basics covered.',
    copy: 'Ship production code with hosting, environment setup, monitoring hooks, and a clean handover.',
    icon: Rocket,
    proof: 'Production ready',
  },
  {
    label: 'Secure',
    title: 'Keep access and approvals intentional.',
    copy: 'Use permissions, validation, logs, and human approval gates around sensitive flows.',
    icon: ShieldCheck,
    proof: 'Controlled access',
  },
  {
    label: 'Improve',
    title: 'Use real usage to guide the next version.',
    copy: 'Monitor adoption, gather feedback, identify bottlenecks, and iterate on what creates leverage.',
    icon: Brain,
    proof: 'Continuous gains',
  },
];

export default function PlatformTabs() {
  const [activeApp, setActiveApp] = useState(appTabs[0].key);
  const [activeWay, setActiveWay] = useState(platformWays[0].label);
  const [autoPlay, setAutoPlay] = useState(true);

  const currentApp = appTabs.find((tab) => tab.key === activeApp) ?? appTabs[0];
  const CurrentAppIcon = currentApp.icon;
  const currentWay = platformWays.find((way) => way.label === activeWay) ?? platformWays[0];
  const CurrentWayIcon = currentWay.icon;

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => {
      setActiveWay((current) => {
        const index = platformWays.findIndex((way) => way.label === current);
        return platformWays[(index + 1) % platformWays.length].label;
      });
    }, 4800);
    return () => window.clearInterval(timer);
  }, [autoPlay]);

  return (
    <section id="platform" className="section-anchor relative overflow-hidden bg-slate-950 px-4 py-14 text-white sm:px-6 md:py-18 lg:px-10">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:54px_54px] opacity-20" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase text-cyan-300">Explore how Cognisa works</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              Design, build, automate, and improve the software your business actually runs.
            </h2>
          </div>
          <EnterpriseButton href="/contact" variant="secondary" className="w-fit border-white/15 bg-white/10 text-white hover:bg-white hover:text-slate-950">
            Get demo
          </EnterpriseButton>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-4 grid gap-2">
              {appTabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeApp === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveApp(tab.key)}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-4 text-left transition ${
                      isActive
                        ? 'border-cyan-300/35 bg-white text-slate-950'
                        : 'border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isActive ? 'bg-slate-950 text-white' : 'bg-white/10 text-cyan-200'}`}>
                      <TabIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-black">{tab.label}</span>
                      <span className={`mt-1 block text-xs font-semibold ${isActive ? 'text-slate-500' : 'text-white/55'}`}>
                        Cognisa delivery track
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentApp.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="rounded-lg border border-white/10 bg-white/[0.06] p-5"
              >
                <CurrentAppIcon className="mb-5 h-7 w-7 text-cyan-300" />
                <h3 className="text-2xl font-black leading-tight">{currentApp.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{currentApp.copy}</p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {currentApp.points.map((point) => (
                    <span key={point} className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-black text-slate-200">
                      {point}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {platformWays.map((way) => {
                const isActive = activeWay === way.label;
                return (
                  <button
                    key={way.label}
                    onClick={() => {
                      setActiveWay(way.label);
                      setAutoPlay(false);
                    }}
                    className={`relative min-h-16 rounded-lg border px-2 text-xs font-black transition ${
                      isActive
                        ? 'border-emerald-300/50 bg-emerald-300 text-slate-950'
                        : 'border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {way.label}
                    {isActive && autoPlay && (
                      <span className="absolute inset-x-2 bottom-1.5 h-0.5 overflow-hidden rounded-full bg-slate-950/15">
                        <span className="block h-full bg-slate-950 progress-bar-fill" style={{ '--duration': '4.8s' } as CSSProperties} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentWay.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
                className="grid min-h-[360px] gap-6 rounded-lg border border-white/10 bg-white p-6 text-slate-950 md:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="flex flex-col">
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-lg bg-slate-950 text-white">
                    <CurrentWayIcon className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-black uppercase text-emerald-700">Cognisa method · {currentWay.label}</p>
                  <h3 className="mt-3 text-3xl font-black leading-tight">{currentWay.title}</h3>
                  <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{currentWay.copy}</p>
                </div>

                <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <div>
                    <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase text-slate-500">
                      <LockKeyhole className="h-4 w-4 text-slate-700" />
                      Runtime controls
                    </div>
                    {['Permissions', 'Logs', 'Fallbacks', 'Human review'].map((item) => (
                      <div key={item} className="mb-2 flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700">
                        {item}
                        <BadgeCheck className="h-4 w-4 text-emerald-600" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-md bg-slate-950 p-4 text-white">
                    <p className="text-xs font-black uppercase text-cyan-200">Outcome</p>
                    <p className="mt-2 text-2xl font-black">{currentWay.proof}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white/65">
                      Explore capability
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
