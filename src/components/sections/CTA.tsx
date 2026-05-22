'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, CheckCircle2, Gauge, Layers3 } from 'lucide-react';
import EnterpriseButton from '@/components/shared/EnterpriseButton';

const readinessItems = [
  {
    label: 'Workflow selected',
    description: 'Start with one bottleneck that is expensive, repetitive, or hard to control.',
  },
  {
    label: 'System mapped',
    description: 'Define the users, data, integrations, and handoffs before implementation begins.',
  },
  {
    label: 'Launch path clear',
    description: 'Ship the first reliable version, then improve the operating layer with real feedback.',
  },
];

export default function CTA() {
  return (
    <section id="cta" className="section-anchor relative overflow-hidden bg-white/70 px-4 py-14 sm:px-6 md:py-20 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]"
        >
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:54px_54px] opacity-25" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-300/12 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />

          <div className="relative z-10 grid gap-0 lg:grid-cols-[1fr_440px]">
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-black uppercase text-cyan-200">
                <BadgeCheck className="h-4 w-4" />
                Let&apos;s talk
              </div>
              <h2 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">
                Ready to turn one bottleneck into a managed AI-powered system?
              </h2>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-300">
                Bring the workflow that slows your team down. Cognisa will help map the operating layer, build the software, and keep improving it after launch.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <EnterpriseButton href="/contact" variant="secondary" className="border-white/15 bg-white text-slate-950 hover:bg-cyan-100">
                  Get a free consultation
                </EnterpriseButton>
                <EnterpriseButton href="mailto:hello@cognisa.in" variant="ghost" className="border-white/10 text-white hover:bg-white/10 hover:text-white">
                  hello@cognisa.in
                </EnterpriseButton>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:border-l lg:border-t-0">
              <div className="mb-5 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-emerald-300" />
                <span className="text-xs font-black uppercase tracking-[0.16em] text-white/60">Delivery readiness</span>
              </div>

              <div className="space-y-3">
                {readinessItems.map((item, index) => (
                  <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-black text-white/80">{item.label}</span>
                      <span className="font-mono text-xs font-black text-white/30">0{index + 1}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <span className="text-sm font-bold leading-6 text-emerald-50">
                  No marketplace claims, fake live counters, or generic agency handoff. Just the first workflow and the system needed to run it better.
                </span>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
                <Layers3 className="h-5 w-5 text-cyan-200" />
                <span className="text-sm font-bold text-cyan-50">Software, automation, and managed delivery under one architecture.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
