'use client';

import type { CSSProperties, ElementType } from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  Headphones,
  HeartPulse,
  Landmark,
  LineChart,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import EnterpriseButton from '@/components/shared/EnterpriseButton';

type IndustryKey = 'operations' | 'finance' | 'healthcare' | 'commerce';

const industries: Record<IndustryKey, {
  label: string;
  headline: string;
  copy: string;
  icon: ElementType;
  accent: string;
  metrics: { value: string; label: string }[];
  workflows: string[];
  signals: string[];
}> = {
  operations: {
    label: 'Operations',
    headline: 'Turn scattered manual work into a managed operating system.',
    copy: 'For founders and teams running on inboxes, spreadsheets, and disconnected tools, Cognisa builds the layer that routes work, captures decisions, and keeps delivery visible.',
    icon: Building2,
    accent: 'bg-cyan-500',
    metrics: [
      { value: '35%', label: 'less repetitive admin' },
      { value: '2x', label: 'faster handoffs' },
    ],
    workflows: ['Request intake', 'Approvals', 'Task routing', 'Status reporting'],
    signals: ['CRM', 'Email', 'Sheets', 'Slack'],
  },
  finance: {
    label: 'Finance',
    headline: 'Automate finance workflows without losing human control.',
    copy: 'Invoice checks, payment follow-ups, reporting packs, and exception handling become structured flows with permissions, audit trails, and clear escalation paths.',
    icon: Landmark,
    accent: 'bg-indigo-500',
    metrics: [
      { value: '24/7', label: 'invoice visibility' },
      { value: '99%', label: 'audit-ready history' },
    ],
    workflows: ['Invoice review', 'Payment reminders', 'Ledger sync', 'Exception queues'],
    signals: ['QuickBooks', 'ERP', 'Bank feeds', 'Dashboards'],
  },
  healthcare: {
    label: 'Healthcare',
    headline: 'Create patient and staff workflows that feel calm, clear, and reliable.',
    copy: 'Build appointment, intake, support, and document workflows that reduce coordination load while keeping sensitive actions governed and traceable.',
    icon: HeartPulse,
    accent: 'bg-emerald-500',
    metrics: [
      { value: '40%', label: 'fewer status calls' },
      { value: '1 view', label: 'for follow-ups' },
    ],
    workflows: ['Patient intake', 'Follow-ups', 'Document routing', 'Support queues'],
    signals: ['Forms', 'Calendar', 'EHR exports', 'Notifications'],
  },
  commerce: {
    label: 'Commerce',
    headline: 'Connect customer experience with the systems behind every order.',
    copy: 'From product inquiries to returns, fulfilment updates, and campaign workflows, Cognisa helps teams move faster without widening the support backlog.',
    icon: ShoppingBag,
    accent: 'bg-amber-500',
    metrics: [
      { value: '3x', label: 'faster response loops' },
      { value: '1 hub', label: 'for order context' },
    ],
    workflows: ['Support triage', 'Order updates', 'Returns', 'Campaign ops'],
    signals: ['Shopify', 'Helpdesk', 'Inventory', 'Analytics'],
  },
};

const tabs = Object.entries(industries) as [IndustryKey, typeof industries[IndustryKey]][];

export default function Challenges() {
  const [active, setActive] = useState<IndustryKey>('operations');
  const [autoPlay, setAutoPlay] = useState(true);
  const activeIndustry = industries[active];
  const ActiveIcon = activeIndustry.icon;

  useEffect(() => {
    if (!autoPlay) return;

    const timer = window.setInterval(() => {
      setActive((current) => {
        const keys = tabs.map(([key]) => key);
        const next = (keys.indexOf(current) + 1) % keys.length;
        return keys[next];
      });
    }, 7000);

    return () => window.clearInterval(timer);
  }, [autoPlay]);

  return (
    <section id="challenges" className="section-anchor relative overflow-hidden bg-gradient-to-b from-white/64 to-slate-50/70 px-4 py-12 sm:px-6 md:py-16 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase text-indigo-700">Built for real teams</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 md:text-5xl">
              Enterprise-grade workflows without enterprise bloat.
            </h2>
          </div>
          <p className="max-w-2xl text-base font-medium leading-8 text-slate-600 lg:ml-auto">
            Choose an operating area and see how Cognisa maps industry work into software, agents, integrations, and measurable outcomes.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
          <div className="rounded-lg border border-slate-200 bg-white/82 p-3 shadow-sm backdrop-blur">
            {tabs.map(([key, industry]) => {
              const Icon = industry.icon;
              const isActive = active === key;

              return (
                <button
                  key={key}
                  onClick={() => {
                    setActive(key);
                    setAutoPlay(false);
                  }}
                  className={`relative mb-2 flex w-full items-center gap-3 rounded-lg border px-4 py-4 text-left transition last:mb-0 ${
                    isActive
                      ? 'border-slate-300 bg-slate-950 text-white shadow-md'
                      : 'border-transparent bg-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isActive ? 'bg-white/12' : 'bg-white border border-slate-200'}`}>
                    <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-700'}`} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black">{industry.label}</span>
                    <span className={`mt-1 block text-xs font-semibold ${isActive ? 'text-white/70' : 'text-slate-500'}`}>
                      {industry.workflows.slice(0, 2).join(' · ')}
                    </span>
                  </span>
                  {isActive && autoPlay && (
                    <span className="absolute inset-x-4 bottom-2 h-0.5 overflow-hidden rounded-full bg-white/12">
                      <span className="block h-full bg-cyan-300 progress-bar-fill" style={{ '--duration': '7s' } as CSSProperties} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-slate-200 bg-white/82 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.38 }}
                className="grid h-full gap-0 lg:grid-cols-[1fr_0.82fr]"
              >
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${activeIndustry.accent}`} />
                    <span className="text-xs font-black uppercase text-slate-600">{activeIndustry.label} transformation</span>
                  </div>

                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
                    <ActiveIcon className="h-7 w-7 text-slate-800" />
                  </div>

                  <h3 className="max-w-2xl text-3xl font-black leading-tight text-slate-950 md:text-4xl">
                    {activeIndustry.headline}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">
                    {activeIndustry.copy}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {activeIndustry.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <p className="text-3xl font-black text-slate-950">{metric.value}</p>
                        <p className="mt-1 text-sm font-bold text-slate-500">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  <EnterpriseButton href="/contact" className="mt-8">
                    Plan this workflow
                  </EnterpriseButton>
                </div>

                <div className="border-t border-slate-200 bg-slate-50/80 p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <div className="mb-5 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cyan-600" />
                    <p className="text-xs font-black uppercase text-slate-600">Workflow map</p>
                  </div>

                  <div className="space-y-3">
                    {activeIndustry.workflows.map((workflow, index) => (
                      <motion.div
                        key={workflow}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.06 }}
                        className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-950 text-xs font-black text-white">
                          {index + 1}
                        </span>
                        <span className="text-sm font-bold text-slate-700">{workflow}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <div className="mb-3 flex items-center gap-2">
                      <LineChart className="h-4 w-4 text-emerald-600" />
                      <p className="text-xs font-black uppercase text-slate-600">Connected signals</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {activeIndustry.signals.map((signal) => (
                        <div
                          key={signal}
                          className="flex min-h-16 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-center text-sm font-black text-slate-700 shadow-sm"
                        >
                          {signal}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 rounded-lg border border-cyan-200 bg-cyan-50 p-4">
                    <div className="flex items-start gap-3">
                      <Headphones className="mt-1 h-5 w-5 shrink-0 text-cyan-700" />
                      <p className="text-sm font-semibold leading-7 text-cyan-950">
                        Every workflow ships with support paths, observability, and clear handover so your team can run it confidently.
                      </p>
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
