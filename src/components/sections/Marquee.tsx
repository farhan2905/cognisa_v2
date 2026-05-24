'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Braces,
  LifeBuoy,
  Network,
  ShieldCheck,
} from 'lucide-react';

const technologyPanels = [
  {
    title: 'AI Automation',
    label: 'Autonomous workflows',
    href: '/services',
    icon: Bot,
    accent: 'bg-cyan-500',
    copy: 'Deploy agents that triage requests, update systems, draft responses, and escalate when humans need control.',
    checks: ['Support agents', 'Ops assistants', 'Data entry flows'],
  },
  {
    title: 'Software Platforms',
    label: 'Custom systems',
    href: '/work',
    icon: Braces,
    accent: 'bg-teal-500',
    copy: 'Build portals, dashboards, SaaS products, and internal tools around your real process instead of generic templates.',
    checks: ['Next.js apps', 'APIs', 'Role-based portals'],
  },
  {
    title: 'Orchestration',
    label: 'Connected operations',
    href: '/process',
    icon: Network,
    accent: 'bg-emerald-500',
    copy: 'Connect CRM, spreadsheets, email, databases, and approval steps into one reliable operating layer.',
    checks: ['Integrations', 'Audit trails', 'Human approvals'],
  },
  {
    title: 'Managed Growth',
    label: 'Launch and support',
    href: '/contact',
    icon: LifeBuoy,
    accent: 'bg-amber-500',
    copy: 'Keep the system live, monitored, improved, and aligned to the next version of your business.',
    checks: ['Monitoring', 'Iteration', 'SLA support'],
  },
];

export default function Marquee() {
  return (
    <section id="marquee" className="section-anchor relative overflow-hidden border-y border-slate-200/80 bg-white/58 px-4 py-10 backdrop-blur-xl sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase text-cyan-700">Explore our technology</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-slate-950 md:text-4xl">
              One delivery partner for the systems, agents, and workflows behind growth.
            </h2>
          </div>
          <p className="max-w-md text-sm font-medium leading-7 text-slate-600">
            Start with a focused capability, connect it to the systems your team already uses, then expand the platform as the return becomes visible.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {technologyPanels.map((panel, index) => {
            const Icon = panel.icon;

            return (
              <motion.div
                key={panel.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <Link
                  href={panel.href}
                  className="group flex h-full min-h-[240px] sm:min-h-[280px] lg:min-h-[330px] flex-col rounded-lg border border-slate-200 bg-white/82 px-5 py-7 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)]"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`h-10 w-1.5 rounded-full ${panel.accent}`} />
                      <div>
                        <p className="text-xs font-bold uppercase text-slate-500">{panel.label}</p>
                        <h3 className="text-xl font-black text-slate-950">{panel.title}</h3>
                      </div>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 transition group-hover:bg-slate-950">
                      <Icon className="h-5 w-5 text-slate-700 transition group-hover:text-white" />
                    </span>
                  </div>

                  <p className="text-sm font-medium leading-7 text-slate-600">{panel.copy}</p>

                  <div className="mt-auto pt-6">
                    <div className="mb-5 flex flex-wrap gap-2">
                      {panel.checks.map((check) => (
                        <span
                          key={check}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600"
                        >
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          {check}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-black text-slate-950">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
