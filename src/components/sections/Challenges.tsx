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
  Check,
  AlertCircle,
  ShieldCheck,
  Activity,
  Clock,
  Workflow,
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
  workflows: { title: string; desc: string }[];
  signals: string[];
  handoffSteps: string[];
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
    workflows: [
      { title: 'Request intake', desc: 'Collect payloads via webhook, form, or email' },
      { title: 'Approvals', desc: 'Escalate jobs to manager sign-off queues' },
      { title: 'Task routing', desc: 'Dispatch tasks to specific operational systems' },
      { title: 'Status reporting', desc: 'Sync progress metrics back to live dashboards' },
    ],
    signals: ['CRM', 'Email', 'Sheets', 'Slack'],
    handoffSteps: ['Form Intake', 'Task Dispatch', 'Manager Check', 'System Synced'],
  },
  finance: {
    label: 'Finance',
    headline: 'Automate finance workflows without losing human control.',
    copy: 'Invoice checks, payment follow-ups, reporting packs, and exception handling become structured flows with permissions, audit trails, and clear escalation paths.',
    icon: Landmark,
    accent: 'bg-teal-500',
    metrics: [
      { value: '24/7', label: 'invoice visibility' },
      { value: '99%', label: 'audit-ready history' },
    ],
    workflows: [
      { title: 'Invoice review', desc: 'OCR vendor PDFs and check invoice math' },
      { title: 'Payment reminders', desc: 'Send automated notices to overdue accounts' },
      { title: 'Ledger sync', desc: 'Sync matched transactions to QuickBooks/ERP' },
      { title: 'Exception queues', desc: 'Flag discrepancies for human ledger review' },
    ],
    signals: ['QuickBooks', 'ERP', 'Bank feeds', 'Dashboards'],
    handoffSteps: ['PDF Scan', 'Rule Route', 'CFO Approval', 'Ledger Write'],
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
    workflows: [
      { title: 'Patient intake', desc: 'Capture patient details and insurance data' },
      { title: 'Follow-ups', desc: 'Send schedule links and check-in checklist notes' },
      { title: 'Document routing', desc: 'Move records to physician queues for approval' },
      { title: 'Support queues', desc: 'Triage inquiries and flag urgent medical files' },
    ],
    signals: ['Forms', 'Calendar', 'EHR exports', 'Notifications'],
    handoffSteps: ['Intake Form', 'Triage Class', 'MD Verify', 'EHR Export'],
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
    workflows: [
      { title: 'Support triage', desc: 'Classify incoming buyer messages and questions' },
      { title: 'Order updates', desc: 'Deliver shipment notifications and tracking' },
      { title: 'Returns', desc: 'Verify return policy rules and generate labels' },
      { title: 'Campaign ops', desc: 'Segment analytics data to optimize email workflows' },
    ],
    signals: ['Shopify', 'Helpdesk', 'Inventory', 'Analytics'],
    handoffSteps: ['Order Alert', 'Policy Route', 'Support QA', 'Refund Hook'],
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
            <p className="text-xs font-black uppercase text-cyan-700">Built for real teams</p>
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
                      {industry.workflows.slice(0, 2).map((w) => w.title).join(' · ')}
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

          <div className="relative min-h-[520px] overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white/86 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
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

                <div className="border-t border-slate-200 bg-slate-50/80 p-6 sm:p-8 lg:border-l lg:border-t-0 flex flex-col justify-between">
                  {/* Operations Visualizer */}
                  {active === 'operations' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-cyan-600 animate-pulse" />
                          <p className="text-xs font-black uppercase text-slate-600">Operational Queue Board</p>
                        </div>
                        <span className="flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-200 px-2.5 py-0.5 text-[10px] font-black uppercase text-cyan-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping" />
                          Live Dispatch
                        </span>
                      </div>

                      {/* Swimlane/Kanban Columns */}
                      <div className="grid grid-cols-3 gap-2.5 font-mono text-[9px] sm:text-[10px]">
                        {/* Column 1: Intake */}
                        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
                          <p className="font-black text-slate-400 uppercase text-[8px] mb-2 border-b pb-1">Intake (2)</p>
                          <div className="space-y-2">
                            <div className="rounded border border-slate-200 bg-slate-50 p-2 flex flex-col gap-1">
                              <span className="font-bold text-slate-800 truncate">CRM Lead #9403</span>
                              <span className="text-[7px] text-slate-400 uppercase">Webhook</span>
                            </div>
                            <div className="rounded border border-slate-200 bg-slate-50 p-2 flex flex-col gap-1">
                              <span className="font-bold text-slate-800 truncate">Customer Form</span>
                              <span className="text-[7px] text-slate-400 uppercase">Input</span>
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Routing */}
                        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
                          <p className="font-black text-slate-400 uppercase text-[8px] mb-2 border-b pb-1">Routing (1)</p>
                          <div className="rounded border border-cyan-200 bg-cyan-50/50 p-2 flex flex-col gap-1">
                            <span className="font-bold text-cyan-950 truncate">Slack Notify</span>
                            <span className="text-[7px] text-cyan-600 font-bold uppercase animate-pulse">Routing...</span>
                          </div>
                        </div>

                        {/* Column 3: Done */}
                        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
                          <p className="font-black text-slate-400 uppercase text-[8px] mb-2 border-b pb-1">Done (4)</p>
                          <div className="rounded border border-slate-200 bg-slate-100 p-2 flex flex-col gap-1 opacity-70">
                            <span className="font-bold text-slate-600 line-through truncate">Sheets Sync</span>
                            <span className="text-[7px] text-emerald-600 font-bold uppercase">Success</span>
                          </div>
                        </div>
                      </div>

                      {/* Connected Signals */}
                      <div>
                        <div className="mb-2 flex items-center gap-1.5">
                          <Workflow className="h-3.5 w-3.5 text-cyan-600" />
                          <p className="text-xs font-black uppercase text-slate-600">Connected integration signals</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeIndustry.signals.map((signal) => (
                            <span key={signal} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                              {signal}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Process flow path */}
                      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs font-black uppercase text-slate-600">Agent handoff preview</p>
                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase text-emerald-700">
                            Governed
                          </span>
                        </div>
                        <div className="relative h-20 flex justify-between items-center px-2">
                          <div className="absolute inset-x-8 h-0.5 bg-slate-100 top-5" />
                          {activeIndustry.handoffSteps.map((step, idx) => (
                            <div key={step} className="relative z-10 flex flex-col items-center gap-1.5">
                              <span className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                                {idx + 1}
                              </span>
                              <span className="text-[8px] font-black uppercase text-slate-500 tracking-wider text-center max-w-[65px]">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Finance Visualizer */}
                  {active === 'finance' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Workflow className="h-4 w-4 text-teal-600" />
                          <p className="text-xs font-black uppercase text-slate-600">Invoice Audit Desk</p>
                        </div>
                        <span className="flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-[10px] font-black uppercase text-teal-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-ping" />
                          Strict Audit Mode
                        </span>
                      </div>

                      {/* Mock Invoice PDF Overlay Card */}
                      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm font-mono text-[9px] sm:text-[10px]">
                        <div className="border-b pb-2 mb-2 flex justify-between items-center">
                          <span className="font-bold text-slate-800">DOCUMENT: INV-2026-9041</span>
                          <span className="rounded bg-teal-100 text-teal-800 px-1 py-0.2 text-[8px] font-bold">OCR VALID</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-slate-600">
                          <div>
                            <p className="text-[7px] uppercase text-slate-400">Vendor</p>
                            <p className="font-bold text-slate-800 truncate">Acme Industrial Systems</p>
                          </div>
                          <div>
                            <p className="text-[7px] uppercase text-slate-400">Total Amount</p>
                            <p className="font-bold text-slate-800">$24,850.00</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-[8px] sm:text-[9px]">
                          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                            <Check className="h-3 w-3 shrink-0" />
                            <span>OCR Confidence: 99.8%</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                            <Check className="h-3 w-3 shrink-0" />
                            <span>Ledger Math Verified ($22,500 base + $2,350 tax)</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-amber-600 font-bold">
                            <AlertCircle className="h-3 w-3 shrink-0 animate-pulse" />
                            <span>Discrepancy: Exceeds standard auto-release limit ($10k)</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 font-bold pl-4">
                            <span>→ Escalated to CFO Approval Queue</span>
                          </div>
                        </div>
                      </div>

                      {/* Connected Signals */}
                      <div>
                        <div className="mb-2 flex items-center gap-1.5">
                          <LineChart className="h-3.5 w-3.5 text-teal-600" />
                          <p className="text-xs font-black uppercase text-slate-600">Sync Signal Integrations</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeIndustry.signals.map((signal) => (
                            <span key={signal} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                              {signal}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Process flow path */}
                      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs font-black uppercase text-slate-600">Finance Approval Loop</p>
                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase text-emerald-700">
                            Governed
                          </span>
                        </div>
                        <div className="relative h-20 flex justify-between items-center px-2">
                          <div className="absolute inset-x-8 h-0.5 bg-slate-100 top-5" />
                          {activeIndustry.handoffSteps.map((step, idx) => (
                            <div key={step} className="relative z-10 flex flex-col items-center gap-1.5">
                              <span className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                                {idx + 1}
                              </span>
                              <span className="text-[8px] font-black uppercase text-slate-500 tracking-wider text-center max-w-[65px]">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Healthcare Visualizer */}
                  {active === 'healthcare' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-emerald-600" />
                          <p className="text-xs font-black uppercase text-slate-600">Clinical Coordination Hub</p>
                        </div>
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                          HIPAA Governed
                        </span>
                      </div>

                      {/* Patient Timeline / Intake Progress */}
                      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm font-mono text-[9px] sm:text-[10px]">
                        <div className="border-b pb-2 mb-2 flex justify-between items-center">
                          <span className="font-bold text-slate-800">PATIENT ID: PT-4029 (John Doe)</span>
                          <span className="rounded bg-emerald-100 text-emerald-800 px-1 py-0.2 text-[8px] font-bold">SECURED</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                            <span className="text-slate-500">1. Intake Form Data</span>
                            <span className="text-emerald-600 font-bold uppercase">Decrypted</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                            <span className="text-slate-500">2. Insurance Provider</span>
                            <span className="text-emerald-600 font-bold uppercase">Aetna Validated</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                            <span className="text-slate-500">3. MD Triage Assignment</span>
                            <span className="text-emerald-600 font-bold uppercase">Dr. Smith Queue</span>
                          </div>
                          <div className="flex items-center justify-between pb-0.5">
                            <span className="text-slate-500">4. EHR Epic Export</span>
                            <span className="text-slate-400 font-bold flex items-center gap-1">
                              <span className="h-1 w-1 rounded-full bg-slate-400 animate-ping" />
                              Queuing HL7...
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Connected Signals */}
                      <div>
                        <div className="mb-2 flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-emerald-600" />
                          <p className="text-xs font-black uppercase text-slate-600">Healthcare APIs</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeIndustry.signals.map((signal) => (
                            <span key={signal} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              {signal}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Process flow path */}
                      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs font-black uppercase text-slate-600">Governed Care Route</p>
                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase text-emerald-700">
                            Governed
                          </span>
                        </div>
                        <div className="relative h-20 flex justify-between items-center px-2">
                          <div className="absolute inset-x-8 h-0.5 bg-slate-100 top-5" />
                          {activeIndustry.handoffSteps.map((step, idx) => (
                            <div key={step} className="relative z-10 flex flex-col items-center gap-1.5">
                              <span className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                                {idx + 1}
                              </span>
                              <span className="text-[8px] font-black uppercase text-slate-500 tracking-wider text-center max-w-[65px]">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Commerce Visualizer */}
                  {active === 'commerce' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="h-4 w-4 text-amber-600" />
                          <p className="text-xs font-black uppercase text-slate-600">Support Triage Room</p>
                        </div>
                        <span className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-black uppercase text-amber-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                          Shopify Connected
                        </span>
                      </div>

                      {/* E-commerce Ticket & Refund Validation Window */}
                      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm font-mono text-[9px] sm:text-[10px]">
                        <div className="border-b pb-2 mb-2 flex justify-between items-center">
                          <span className="font-bold text-slate-800 text-[9px] truncate">TICKET: RETURN_REQUEST_#8892</span>
                          <span className="rounded bg-amber-100 text-amber-800 px-1 py-0.2 text-[8px] font-bold uppercase shrink-0">Processing</span>
                        </div>
                        <div className="rounded bg-slate-50 p-2 text-slate-600 leading-relaxed text-[9px] mb-3 border border-slate-200">
                          "Hi, I received the wrong size for order #8892. Can I get a replacement?"
                        </div>
                        <div className="space-y-1.5 text-[8px] sm:text-[9px]">
                          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                            <Check className="h-3 w-3 shrink-0" />
                            <span>Intent: Returns/Replacements (94% conf)</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                            <Check className="h-3 w-3 shrink-0" />
                            <span>Policy Check: Within 30-day window (Passed)</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-amber-600 font-bold">
                            <Activity className="h-3 w-3 shrink-0 animate-pulse" />
                            <span>ERP Action: Register return & generate UPS label</span>
                          </div>
                        </div>
                      </div>

                      {/* Connected Signals */}
                      <div>
                        <div className="mb-2 flex items-center gap-1.5">
                          <Workflow className="h-3.5 w-3.5 text-amber-600" />
                          <p className="text-xs font-black uppercase text-slate-600">Store Integration Signals</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeIndustry.signals.map((signal) => (
                            <span key={signal} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-700 shadow-sm flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                              {signal}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Process flow path */}
                      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs font-black uppercase text-slate-600">Commerce Action Loop</p>
                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black uppercase text-emerald-700">
                            Governed
                          </span>
                        </div>
                        <div className="relative h-20 flex justify-between items-center px-2">
                          <div className="absolute inset-x-8 h-0.5 bg-slate-100 top-5" />
                          {activeIndustry.handoffSteps.map((step, idx) => (
                            <div key={step} className="relative z-10 flex flex-col items-center gap-1.5">
                              <span className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                                {idx + 1}
                              </span>
                              <span className="text-[8px] font-black uppercase text-slate-500 tracking-wider text-center max-w-[65px]">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* support note */}
                  <div className={`mt-8 rounded-lg border p-4 transition-all duration-300 ${
                    active === 'operations' ? 'border-cyan-200 bg-cyan-50/50 text-cyan-950' :
                    active === 'finance' ? 'border-teal-200 bg-teal-50/50 text-teal-950' :
                    active === 'healthcare' ? 'border-emerald-200 bg-emerald-50/50 text-emerald-950' :
                    'border-amber-200 bg-amber-50/50 text-amber-950'
                  }`}>
                    <div className="flex items-start gap-3">
                      <Headphones className={`mt-1 h-5 w-5 shrink-0 ${
                        active === 'operations' ? 'text-cyan-700' :
                        active === 'finance' ? 'text-teal-700' :
                        active === 'healthcare' ? 'text-emerald-700' :
                        'text-amber-700'
                      }`} />
                      <p className="text-sm font-semibold leading-7">
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
