'use client';

import { motion } from 'framer-motion';
import {
  BadgeCheck,
  CircleAlert,
  Gauge,
  GitMerge,
  Layers3,
  LineChart,
  MoveRight,
  Sparkles,
  TimerReset,
} from 'lucide-react';
import EnterpriseButton from '@/components/shared/EnterpriseButton';

const outcomeColumns = [
  {
    eyebrow: '01 · Roadblocks',
    title: 'Teams lose momentum inside manual work.',
    copy: 'Growth slows when every customer request, report, approval, and handoff depends on people copying context between tools.',
    icon: CircleAlert,
    accent: 'text-amber-700 bg-amber-50 border-amber-200',
    points: ['Scattered inboxes', 'Slow approvals', 'Invisible status', 'Repeated data entry'],
  },
  {
    eyebrow: '02 · Cognisa system',
    title: 'We design the agent and software layer around the work.',
    copy: 'AI agents, interfaces, APIs, and human approval points are built together so automation is useful, governed, and easy to operate.',
    icon: Sparkles,
    accent: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    points: ['Agent workflows', 'Custom dashboards', 'System integrations', 'Support controls'],
  },
  {
    eyebrow: '03 · Outcomes',
    title: 'The result is a business that moves with less friction.',
    copy: 'Your team gets cleaner data, faster response loops, fewer repetitive tasks, and a managed system that keeps improving after launch.',
    icon: BadgeCheck,
    accent: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    points: ['Faster cycles', 'Measurable savings', 'Cleaner ownership', 'Managed iteration'],
  },
];

const proofMetrics = [
  { value: '6', label: 'core systems connected', icon: GitMerge },
  { value: '42%', label: 'admin effort removed', icon: TimerReset },
  { value: '3.4x', label: 'faster customer loops', icon: Gauge },
];

export default function Solutions() {
  return (
    <section id="solutions" className="section-anchor relative overflow-hidden bg-white/70 px-4 py-12 sm:px-6 md:py-16 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase text-emerald-700">From friction to leverage</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              A practical path from business bottlenecks to managed AI systems.
            </h2>
          </div>
          <EnterpriseButton href="/process" variant="secondary" className="w-fit">
            View our process
          </EnterpriseButton>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {outcomeColumns.map((column, index) => {
            const Icon = column.icon;

            return (
              <motion.article
                key={column.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="relative flex min-h-[430px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 opacity-80" />
                <div className="mb-7 flex items-center justify-between gap-4">
                  <span className="text-xs font-black uppercase text-slate-500">{column.eyebrow}</span>
                  <span className={`flex h-11 w-11 items-center justify-center rounded-lg border ${column.accent}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <h3 className="text-2xl font-black leading-tight text-slate-950">{column.title}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{column.copy}</p>

                <div className="mt-auto pt-7">
                  <div className="space-y-2.5">
                    {column.points.map((point) => (
                      <div key={point} className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                        <MoveRight className="h-4 w-4 shrink-0 text-slate-400" />
                        <span className="text-sm font-bold text-slate-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)]"
        >
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-bold uppercase text-cyan-200">
                <Layers3 className="h-3.5 w-3.5" />
                Managed delivery snapshot
              </div>
              <h3 className="text-2xl font-black leading-tight md:text-3xl">
                Strategy, build, automation, and support stay connected after launch.
              </h3>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-300">
                Cognisa works like a product team for your operations: we map the workflow, ship the system, measure adoption, and keep improving the parts that create leverage.
              </p>
            </div>

            <div className="grid gap-0 sm:grid-cols-3">
              {proofMetrics.map((metric) => {
                const Icon = metric.icon;

                return (
                  <div key={metric.label} className="border-b border-white/10 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                    <Icon className="mb-5 h-6 w-6 text-cyan-300" />
                    <p className="text-4xl font-black">{metric.value}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">{metric.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="mt-6 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white/82 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <LineChart className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
            <p className="text-sm font-semibold leading-7 text-slate-700">
              Start with one workflow, prove the return, then expand the system into the next bottleneck.
            </p>
          </div>
          <EnterpriseButton href="/contact" className="shrink-0">
            Start planning
          </EnterpriseButton>
        </div>
      </div>
    </section>
  );
}
