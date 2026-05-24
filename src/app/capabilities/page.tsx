'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Database,
  ShieldCheck,
  Search,
  ArrowRight,
  Workflow,
  Eye,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Calendar,
  Clock,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import SectionTag from '@/components/shared/SectionTag';
import EnterpriseButton from '@/components/shared/EnterpriseButton';
import PageCTA from '@/components/shared/PageCTA';

// ── SIMULATOR MOCK STEPS ──
const SIMULATOR_STEPS: any[] = [
  {
    title: '1. Ingest Request',
    subtitle: 'Extracting data',
    icon: Search,
    detail: 'An unstructured request arrives via email or upload.',
    visual: {
      type: 'email',
      from: 'partner@example.com',
      body: 'Hi Cognisa, can you update order #1084 to include 5 extra license seats and invoice us? Thanks!',
    }
  },
  {
    title: '2. Intent Routing',
    subtitle: 'Understanding need',
    icon: Brain,
    detail: 'AI extracts parameters and queries internal database systems.',
    visual: {
      intent: 'Order Modification',
      extracted: {
        orderId: '#1084',
        change: '+5 seats',
        billing: 'Invoice required'
      },
      dbCheck: 'Order found. Customer status: Active Tier-1 partner.'
    }
  },
  {
    title: '3. Action Drafting',
    subtitle: 'Planning updates',
    icon: Workflow,
    detail: 'AI plans data payloads and drafts the billing update.',
    visual: {
      apiPayload: 'POST /v2/orders/1084/seats { addCount: 5 }',
      invoiceDraft: 'Drafting QuickBooks Invoice #INV-2026-9284 for $250.00'
    }
  },
  {
    title: '4. Human Approval',
    subtitle: 'Safety check',
    icon: ShieldCheck,
    detail: 'High-risk database changes pause here for a founder or team member check.',
    visual: {
      requiresApproval: true,
      actionDesc: 'Add 5 seats & Send $250.00 invoice to partner@example.com'
    }
  },
  {
    title: '5. Commit & Log',
    subtitle: 'Process complete',
    icon: CheckCircle2,
    detail: 'Action is committed, records synced, and team notified.',
    visual: {
      status: 'Success',
      log: 'Order #1084 updated. Invoice sent. Slack notification dispatched.'
    }
  }
];

// ── MEETUP AGENDA TOPICS ──
const MEETING_TOPICS = [
  {
    id: 'crm',
    title: 'CRM & Tool Sync',
    desc: 'Connecting disjointed tools (Salesforce, Stripe, custom database) so they update automatically without human copy-pasting.',
    agenda: [
      'Audit current manual handoffs between systems',
      'Select best API routes for stable real-time synchronization',
      'Define error logging and alerts to catch system sync issues'
    ]
  },
  {
    id: 'invoices',
    title: 'Invoice & Document Auditing',
    desc: 'Automating invoice intake, line-item reading, database reconciliation, and draft ledger posting.',
    agenda: [
      'Analyze typical PDF/document layouts you handle weekly',
      'Establish confidence-score limits to automatically flag discrepancies',
      'Design the draft approval interface for your accounting team'
    ]
  },
  {
    id: 'support',
    title: 'Support Inbox Automation',
    desc: 'Routing client emails, reading contract databases, and drafting perfect contextual replies.',
    agenda: [
      'Map incoming support categories (billing, login, bugs)',
      'Design safety guardrails so AI never emails clients directly without review',
      'Connect internal FAQ and docs databases for context injection'
    ]
  }
];

export default function CapabilitiesPage() {
  // Simulator State
  const [activeStep, setActiveStep] = useState(0);
  const [approvedAction, setApprovedAction] = useState(false);
  const [simulatorKey, setSimulatorKey] = useState(0);

  // Meetup Planner State
  const [selectedTopic, setSelectedTopic] = useState(MEETING_TOPICS[0].id);
  const activeTopic = MEETING_TOPICS.find((t) => t.id === selectedTopic) || MEETING_TOPICS[0];

  const resetSimulator = () => {
    setActiveStep(0);
    setApprovedAction(false);
    setSimulatorKey((k) => k + 1);
  };

  const handleNextStep = () => {
    if (activeStep < SIMULATOR_STEPS.length - 1) {
      setActiveStep((s) => s + 1);
    }
  };

  const handleApprove = () => {
    setApprovedAction(true);
    setTimeout(() => {
      setActiveStep(4);
    }, 800);
  };

  return (
    <>
      {/* Hero */}
      <PageHero
        tagText="HOW WE HELP"
        title="We build systems that execute,"
        titleAccent="not just chat."
        description="Stop copying and pasting data between systems. We connect AI models to your databases, tools, and workflows with strict human-in-the-loop guardrails so your business runs smoothly."
        orbColor="#0891b2"
        orbColor2="#10b981"
      />

      {/* ── INTERACTIVE WORKFLOW SIMULATOR ── */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <SectionTag text="LIVE AUTOMATION BLUEPRINT" variant="light" className="lg:justify-start justify-center" />
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-6 tracking-tight">
              See how a governed AI process works
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl font-medium text-base">
              Click through the steps below to see how our systems capture an email, extract client requests, prepare updates, request human approval, and log the action.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
            {/* Steps Navigation */}
            <div className="space-y-3">
              {SIMULATOR_STEPS.map((step, idx) => {
                const StepIcon = step.icon;
                const isCurrent = idx === activeStep;
                const isPassed = idx < activeStep;

                return (
                  <button
                    key={step.title}
                    onClick={() => {
                      if (idx <= activeStep || approvedAction) {
                        setActiveStep(idx);
                      }
                    }}
                    className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                      isCurrent
                        ? 'border-slate-900 bg-slate-950 text-white shadow-md'
                        : isPassed
                          ? 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                          : 'border-slate-200/50 bg-white/50 text-slate-400 cursor-not-allowed'
                    }`}
                    disabled={idx > activeStep && !approvedAction}
                  >
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                      isCurrent 
                        ? 'border-slate-800 bg-slate-900 text-white' 
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}>
                      <StepIcon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight">{step.title}</h3>
                      <p className={`text-xs mt-0.5 font-medium ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                        {step.detail}
                      </p>
                    </div>
                  </button>
                );
              })}

              <div className="pt-2 flex gap-3">
                {activeStep < SIMULATOR_STEPS.length - 2 && (
                  <button
                    onClick={handleNextStep}
                    className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-black text-white shadow-sm hover:bg-slate-800"
                  >
                    Next Step
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
                {(activeStep === SIMULATOR_STEPS.length - 1 || approvedAction) && (
                  <button
                    onClick={resetSimulator}
                    className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-700 shadow-sm hover:bg-slate-50"
                  >
                    Reset Simulator
                  </button>
                )}
              </div>
            </div>

            {/* Live Interactive Preview Screen */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-md p-6">
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                    <span className="h-2 w-2 rounded-full bg-slate-200" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Simulator Terminal
                  </span>
                </div>
                <span className="rounded-full bg-cyan-50 border border-cyan-200 px-2 py-0.5 text-[9px] font-mono font-bold text-cyan-700">
                  {SIMULATOR_STEPS[activeStep].subtitle.toUpperCase()}
                </span>
              </div>

              {/* Terminal View Body */}
              <div className="min-h-[220px] font-mono text-xs text-slate-700 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep + '-' + simulatorKey}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {activeStep === 0 && (
                      <div className="space-y-2">
                        <p className="text-slate-450 border-b border-slate-100 pb-1.5 font-bold">INCOMING INBOX REQUEST:</p>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 font-sans">
                          <p className="text-[11px] font-bold text-slate-800">From: {SIMULATOR_STEPS[0].visual.from}</p>
                          <p className="mt-2 text-xs text-slate-600 leading-relaxed italic">
                            &ldquo;{SIMULATOR_STEPS[0].visual.body}&rdquo;
                          </p>
                        </div>
                      </div>
                    )}

                    {activeStep === 1 && (
                      <div className="space-y-2">
                        <p className="text-slate-450 font-bold">AI INTENT PARSING LOGS:</p>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-1.5">
                          <p><span className="text-cyan-700 font-bold">&gt; Intent:</span> {SIMULATOR_STEPS[1].visual.intent}</p>
                          <p><span className="text-cyan-700 font-bold">&gt; Target Order:</span> {SIMULATOR_STEPS[1].visual.extracted.orderId}</p>
                          <p><span className="text-cyan-700 font-bold">&gt; Change Action:</span> {SIMULATOR_STEPS[1].visual.extracted.change}</p>
                          <p className="text-slate-500 italic mt-2 border-t border-slate-200/60 pt-1.5">
                            Checking database: {SIMULATOR_STEPS[1].visual.dbCheck}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeStep === 2 && (
                      <div className="space-y-2">
                        <p className="text-slate-450 font-bold">API PAYLOAD DRAFT:</p>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
                          <p className="font-bold text-slate-800">1. ERP DB Payload Drafted:</p>
                          <p className="bg-slate-200/65 px-2 py-1 rounded text-[11px] text-slate-600">
                            {SIMULATOR_STEPS[2].visual.apiPayload}
                          </p>
                          <p className="font-bold text-slate-800 mt-2">2. Billing Ledger Drafted:</p>
                          <p className="bg-slate-200/65 px-2 py-1 rounded text-[11px] text-slate-600">
                            {SIMULATOR_STEPS[2].visual.invoiceDraft}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeStep === 3 && (
                      <div className="space-y-3">
                        <div className="flex items-start gap-2 text-amber-600 bg-amber-50 border border-amber-200 p-2.5 rounded-lg font-sans">
                          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                          <p className="text-xs font-bold leading-normal">
                            System Gate: Human verification required before updating billing ledger and updating CRM seats.
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4 font-sans shadow-sm">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Approval Queue</p>
                          <p className="text-sm font-bold text-slate-900 mt-1">{SIMULATOR_STEPS[3].visual.actionDesc}</p>
                          
                          <div className="mt-4 flex gap-3">
                            <button
                              onClick={handleApprove}
                              disabled={approvedAction}
                              className={`flex-1 inline-flex justify-center items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-black text-white transition-all shadow-sm ${
                                approvedAction 
                                  ? 'bg-emerald-600 cursor-not-allowed'
                                  : 'bg-slate-950 hover:bg-slate-800'
                              }`}
                            >
                              {approvedAction ? (
                                <>
                                  <UserCheck className="h-4 w-4" />
                                  Approved
                                </>
                              ) : (
                                'Approve Action'
                              )}
                            </button>
                            <button
                              disabled={approvedAction}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                            >
                              Deny
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeStep === 4 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg font-sans">
                          <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                          <p className="text-xs font-bold">Action executed successfully and logged in ERP system.</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-1 text-slate-500">
                          <p>&gt; Connection status: Commit confirmed</p>
                          <p>&gt; Sync status: 200 OK</p>
                          <p>&gt; {SIMULATOR_STEPS[4].visual.log}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {activeStep < 3 && (
                  <p className="text-[10px] text-slate-400 italic font-sans border-t border-slate-100 pt-3">
                    Click the next step or navigation buttons to advance this mock flow.
                  </p>
                )}
                {activeStep === 3 && !approvedAction && (
                  <p className="text-[10px] text-slate-400 italic font-sans border-t border-slate-100 pt-3 animate-pulse">
                    Click &ldquo;Approve Action&rdquo; to execute the automated processes.
                  </p>
                )}
                {activeStep === 4 && (
                  <p className="text-[10px] text-slate-400 italic font-sans border-t border-slate-100 pt-3">
                    This completes the flow. This exact safety pattern secures all high-value tasks we build.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DYNAMIC DISCOVERY MEETUP AGENDA PLANNER ── */}
      <section className="relative py-12 md:py-20 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-12">
            <SectionTag text="FOUNDER-LED DISCOVERY WORKSHOP" variant="light" className="justify-center" />
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-6 tracking-tight">
              Plan your discovery meetup
            </h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto font-medium text-base">
              Select your biggest operational bottleneck below. We will customize a 30-minute founder-led meetup agenda specifically around your tools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 items-stretch">
            {/* Bottleneck selectors */}
            <div className="flex flex-col gap-3.5 justify-center">
              {MEETING_TOPICS.map((topic) => {
                const isSelected = selectedTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-slate-900 bg-white shadow-md scale-[1.01]'
                        : 'border-slate-200 bg-white/60 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center justify-between">
                      {topic.title}
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-cyan-600 shadow-[0_0_6px_rgba(6,182,212,0.4)]" />}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2 font-medium">
                      {topic.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Meetup Agenda Preview Box */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-md p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="mb-6 flex items-center gap-3 text-slate-400">
                  <Calendar className="h-5 w-5 text-cyan-600 shrink-0" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                    Interactive Meetup Blueprint
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                  Workshop focus: {activeTopic.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2 font-medium">
                  Here is what we will walk through during our 30-minute developer call:
                </p>

                <div className="mt-6 space-y-4 border-l border-slate-100 pl-4">
                  {activeTopic.agenda.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full border border-slate-200 bg-white" />
                      <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                  <Clock className="h-4 w-4 shrink-0 text-slate-400" />
                  <span>30 Min Call</span>
                  <span className="text-slate-300">•</span>
                  <span>Founder Led</span>
                </div>

                <EnterpriseButton
                  href={`/contact?topic=${activeTopic.id}`}
                  className="inline-flex justify-center items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-black text-white shadow-sm hover:bg-slate-800"
                >
                  Schedule Meetup
                  <ArrowRight className="h-3.5 w-3.5" />
                </EnterpriseButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="Ready to automate"
        titleAccent="your operations?"
        description="Let's build a safe, governed system. Book your discovery session with the founder today."
      />
    </>
  );
}
