'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Cpu,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import Logo from '@/components/shared/Logo';
import EnterpriseButton from '@/components/shared/EnterpriseButton';

const capabilities = [
  { label: 'AI agents', icon: Cpu, tone: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
  { label: 'Custom software', icon: Workflow, tone: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { label: 'Workflow orchestration', icon: Network, tone: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { label: 'Managed delivery', icon: ShieldCheck, tone: 'text-amber-600 bg-amber-50 border-amber-200' },
];

const runtimeSteps = [
  'Customer request',
  'Agent routing',
  'System action',
  'Human approval',
  'Outcome logged',
];

const heroStats = [
  { value: '4-6 wk', label: 'MVP delivery windows' },
  { value: '24/7', label: 'Automation and monitoring' },
  { value: '1 team', label: 'Strategy, build, launch, support' },
];

function AgentRuntimeVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[620px] mx-auto lg:ml-auto"
    >
      <div className="absolute inset-x-8 top-8 h-40 rounded-lg bg-gradient-to-r from-cyan-100 via-white to-amber-100 blur-3xl opacity-70" />
      <div className="relative rounded-lg border border-slate-200/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
          </div>
          <span className="text-[11px] font-semibold uppercase text-slate-500">
            Cognisa runtime
          </span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_1.05fr]">
          <div className="border-b border-slate-200/80 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-indigo-100 bg-white shadow-sm">
                <Logo className="h-7 w-auto" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950">Agent platform blueprint</p>
                <p className="text-xs font-medium text-slate-500">Designed around your business systems</p>
              </div>
            </div>

            <div className="space-y-2">
              {runtimeSteps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.45 + index * 0.08 }}
                  className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50/80 px-3 py-2"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-[11px] font-bold text-slate-600 shadow-sm">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[320px] p-5 sm:p-6">
            <div className="absolute inset-6 rounded-lg border border-dashed border-slate-200" />
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100 bg-cyan-50/60" />
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-100" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
              className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2"
            >
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                const positions = [
                  'left-1/2 top-0 -translate-x-1/2',
                  'right-0 top-1/2 -translate-y-1/2',
                  'bottom-0 left-1/2 -translate-x-1/2',
                  'left-0 top-1/2 -translate-y-1/2',
                ];

                return (
                  <div
                    key={item.label}
                    className={`absolute ${positions[index]} flex h-12 w-12 items-center justify-center rounded-lg border bg-white shadow-md`}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                    >
                      <Icon className="h-5 w-5 text-slate-700" />
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.12)]">
              <Sparkles className="h-8 w-8 text-indigo-600" />
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-emerald-200 bg-emerald-50/90 p-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-emerald-900">Production-ready outcome</p>
                  <p className="text-xs leading-5 text-emerald-800/75">
                    Automated workflow, audit trail, alerts, and human controls in one managed system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="section-anchor relative overflow-hidden px-4 pb-8 pt-8 sm:px-6 md:pb-10 lg:min-h-[calc(100svh-2rem)] lg:px-10 lg:pt-10"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:52px_52px] opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/72 via-cyan-50/38 to-amber-50/28" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-8 lg:min-h-[calc(100svh-7rem)] lg:justify-center">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-between gap-4"
        >
          <Link href="#hero" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/80 bg-white/75 shadow-sm backdrop-blur">
              <Logo className="h-7 w-auto" />
            </span>
            <span className="text-sm font-bold text-slate-900">Cognisa</span>
          </Link>
          <EnterpriseButton href="/contact" variant="secondary" className="hidden px-4 py-2 sm:inline-flex">
            Talk to an expert
          </EnterpriseButton>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/75 px-3 py-1.5 text-xs font-bold uppercase text-slate-600 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              AI automation · software platforms · managed growth
            </div>

            <h1 className="max-w-4xl text-[2.75rem] font-black leading-[1.02] text-slate-950 sm:text-[4.1rem] lg:text-[5.4rem]">
              Build AI systems ready for the work your business actually runs.
            </h1>

            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
              Cognisa designs, builds, and manages custom software and AI agents that connect to your tools, automate repeatable work, and create measurable operating leverage.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <EnterpriseButton href="/contact">
                Get a demo
              </EnterpriseButton>
              <EnterpriseButton href="#marquee" variant="secondary">
                Explore our technology
              </EnterpriseButton>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-slate-200 bg-white/68 p-4 shadow-sm backdrop-blur">
                  <p className="text-xl font-black text-slate-950">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <AgentRuntimeVisual />
        </div>
      </div>
    </section>
  );
}
