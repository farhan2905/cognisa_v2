'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Globe,
  Server,
  TrendingUp,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import EnterpriseButton from '@/components/shared/EnterpriseButton';
import SectionTag from '@/components/shared/SectionTag';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Globe,
    number: '01',
    category: 'Engineering',
    slug: 'web-development',
    title: 'Website & Web Apps',
    description:
      'Custom web applications, portals, dashboards, and commerce systems designed around the way your business actually operates.',
    subservices: ['Custom web apps', 'Portals', 'API integrations', 'Commerce workflows'],
    proof: ['Fast user journeys', 'Maintainable codebases', 'Scalable product foundations'],
    accent: 'cyan',
    tone: 'border-cyan-200 bg-cyan-50 text-cyan-700',
    dot: 'bg-cyan-500',
    line: 'from-cyan-500 to-sky-500',
    glow: 'rgba(6, 182, 212, 0.16)',
  },
  {
    icon: BrainCircuit,
    number: '02',
    category: 'Automation',
    slug: 'ai-automation',
    title: 'AI & Automation',
    description:
      'AI agents and workflow automations that remove repetitive work, connect your tools, and keep key processes moving.',
    subservices: ['AI agents', 'Data extraction', 'Workflow routing', 'Automated support'],
    proof: ['Less manual handoff', 'Cleaner operating data', 'Faster response loops'],
    accent: 'emerald',
    tone: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
    line: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16, 185, 129, 0.16)',
  },
  {
    icon: TrendingUp,
    number: '03',
    category: 'Architecture',
    slug: 'system-architecture',
    title: 'System Architecture',
    description:
      'Reliable technical foundations for products that need clean data flow, predictable performance, and room to grow.',
    subservices: ['System design', 'Databases', 'Microservices', 'API architecture'],
    proof: ['Clear ownership boundaries', 'Lower scaling risk', 'Better release confidence'],
    accent: 'amber',
    tone: 'border-amber-200 bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
    line: 'from-amber-500 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.17)',
  },
  {
    icon: Server,
    number: '04',
    category: 'DevOps',
    slug: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    description:
      'Managed deployment, hosting, CI/CD, security, and cloud operations for teams that need software to stay dependable.',
    subservices: ['Managed hosting', 'CI/CD', 'Monitoring', 'Security hardening'],
    proof: ['Repeatable deployments', 'Cost-aware hosting', 'Production support'],
    accent: 'teal',
    tone: 'border-teal-200 bg-teal-50 text-teal-700',
    dot: 'bg-teal-500',
    line: 'from-teal-500 to-emerald-500',
    glow: 'rgba(13, 148, 136, 0.16)',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

type Service = (typeof services)[number];

function ServiceCard({
  service,
  index,
  active,
  onSelect,
}: {
  service: Service;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = service.icon;

  return (
    <motion.button
      type="button"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      onClick={onSelect}
      className={cn(
        'group relative flex h-full min-h-[240px] sm:min-h-[260px] lg:min-h-[320px] flex-col overflow-hidden rounded-lg border bg-white px-5 py-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)]',
        active ? 'border-slate-300 shadow-[0_20px_55px_rgba(15,23,42,0.10)]' : 'border-slate-200'
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r"
        style={{ backgroundImage: `linear-gradient(90deg, ${service.glow}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: service.glow, opacity: active ? 1 : 0.45 }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-lg border', service.tone)}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-xs font-black text-slate-300">{service.number}</span>
      </div>

      <div className="relative z-10 mt-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{service.category}</p>
        <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">{service.title}</h3>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{service.description}</p>
      </div>

      <div className="relative z-10 mt-6 flex flex-wrap gap-2">
        {service.subservices.slice(0, 3).map((item) => (
          <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
            {item}
          </span>
        ))}
      </div>

      <div className="relative z-10 mt-auto pt-6">
        <span className="inline-flex items-center gap-2 text-sm font-black text-slate-950">
          Explore service
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.button>
  );
}

function ActiveServicePreview({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={service.slug}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:p-6 lg:p-8"
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />
        <div
          className="absolute right-0 top-0 h-72 w-72 rounded-full blur-3xl"
          style={{ backgroundColor: service.glow }}
        />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-black uppercase text-cyan-100">
                <Workflow className="h-4 w-4" />
                Delivery layer
              </div>
              <h3 className="text-2xl font-black tracking-tight sm:text-3xl">{service.title}</h3>
              <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-slate-300">{service.description}</p>
            </div>
            <div className={cn('hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg border sm:flex', service.tone)}>
              <Icon className="h-5 w-5" />
            </div>
          </div>

          {/* Domain-specific visual diagram */}
          {service.slug === 'web-development' && (
            <div className="relative h-32 w-full rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden p-3 flex flex-col font-mono text-[9px]">
              <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 mb-2 shrink-0">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
                </div>
                <div className="bg-white/5 rounded px-2 py-0.5 text-white/30 text-[7px] truncate flex-1 max-w-[150px]">
                  cognisa.ai/dashboard
                </div>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-2">
                <div className="border border-white/10 bg-white/5 rounded p-2 flex flex-col justify-between">
                  <span className="text-white/45 text-[7px] uppercase">users</span>
                  <span className="text-xs font-black text-white">12,450</span>
                </div>
                <div className="border border-white/10 bg-white/5 rounded p-2 flex flex-col justify-between">
                  <span className="text-white/45 text-[7px] uppercase">sales</span>
                  <span className="text-xs font-black text-cyan-300">$48.2k</span>
                </div>
                <div className="border border-white/10 bg-white/5 rounded p-2 flex flex-col justify-between">
                  <span className="text-white/45 text-[7px] uppercase">uptime</span>
                  <span className="text-xs font-black text-emerald-300">99.98%</span>
                </div>
              </div>
            </div>
          )}

          {service.slug === 'ai-automation' && (
            <div className="relative h-32 w-full rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden p-3 flex items-center justify-between font-mono text-[9px]">
              <div className="flex flex-col items-center justify-center border border-white/10 bg-white/5 rounded p-2 text-center shrink-0">
                <span className="text-white font-bold">Email Intake</span>
                <span className="text-white/45 text-[6px] uppercase mt-0.5">Triggers</span>
              </div>
              
              <div className="flex-1 relative h-full flex items-center justify-center px-4">
                <div className="absolute inset-x-0 h-0.5 bg-white/10" />
                <motion.div
                  animate={{ x: [-40, 40] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"
                />
              </div>

              <div className="flex flex-col items-center justify-center border border-emerald-500/20 bg-emerald-500/10 rounded p-2 text-center shrink-0">
                <span className="text-emerald-300 font-bold">AI Agent</span>
                <span className="text-emerald-400/80 text-[6px] uppercase mt-0.5">Router</span>
              </div>

              <div className="flex-1 relative h-full flex items-center justify-center px-4">
                <div className="absolute inset-x-0 h-0.5 bg-white/10" />
                <motion.div
                  animate={{ x: [-40, 40] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', delay: 1.25 }}
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"
                />
              </div>

              <div className="flex flex-col items-center justify-center border border-white/10 bg-white/5 rounded p-2 text-center shrink-0">
                <span className="text-white font-bold">ERP Sync</span>
                <span className="text-white/45 text-[6px] uppercase mt-0.5">Actions</span>
              </div>
            </div>
          )}

          {service.slug === 'system-architecture' && (
            <div className="relative h-32 w-full rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden p-3 flex flex-col justify-between font-mono text-[9px]">
              <div className="border-b border-white/10 pb-1 flex justify-between items-center text-white/50 text-[7px] tracking-wider shrink-0">
                <span>SYSTEM SCHEMA: CORE_DB</span>
                <span className="text-amber-400">STATUS: SYNCED</span>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-3 py-1 items-center">
                <div className="border border-white/10 bg-white/5 rounded p-1.5 text-slate-300">
                  <div className="font-bold text-white border-b border-white/10 pb-0.5 mb-1 text-[7px] uppercase tracking-wide">users</div>
                  <div>id: SERIAL (PK)</div>
                  <div>email: VARCHAR</div>
                </div>
                <div className="border border-white/10 bg-white/5 rounded p-1.5 text-slate-300">
                  <div className="font-bold text-white border-b border-white/10 pb-0.5 mb-1 text-[7px] uppercase tracking-wide">orders</div>
                  <div>id: UUID (PK)</div>
                  <div>total: NUMERIC</div>
                </div>
              </div>
            </div>
          )}

          {service.slug === 'cloud-infrastructure' && (
            <div className="relative h-32 w-full rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden p-3 flex flex-col justify-between font-mono text-[9px]">
              <div className="border-b border-white/10 pb-1 flex justify-between items-center text-white/50 text-[7px] tracking-wider shrink-0">
                <span>INFRA: AWS CLOUD</span>
                <span className="text-teal-400 flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-teal-400 animate-ping" />
                  ONLINE
                </span>
              </div>
              <div className="flex-1 flex justify-between items-center gap-2 py-1">
                <div className="flex-1 border border-white/10 bg-white/5 rounded p-1.5 text-slate-300 flex flex-col gap-1">
                  <span className="text-white/45 text-[7px] uppercase">CPU Load</span>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 rounded-full" style={{ width: '42%' }} />
                  </div>
                  <span className="text-white text-[8px] font-bold">42%</span>
                </div>
                <div className="flex-1 border border-white/10 bg-white/5 rounded p-1.5 text-slate-300 flex flex-col gap-1">
                  <span className="text-white/45 text-[7px] uppercase">Memory</span>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 rounded-full" style={{ width: '68%' }} />
                  </div>
                  <span className="text-white text-[8px] font-bold">68%</span>
                </div>
                <div className="flex-1 border border-white/10 bg-white/5 rounded p-1.5 text-slate-300 flex flex-col justify-center">
                  <span className="text-white/45 text-[7px] uppercase">Traffic</span>
                  <span className="text-white text-[9px] font-black mt-0.5">1.2k/s</span>
                  <span className="text-white/45 text-[6px]">req rate</span>
                </div>
              </div>
            </div>
          )}

          {/* Cleaned Inline subservices (removed Capability repetition) */}
          <div className="grid gap-2 sm:grid-cols-2">
            {service.subservices.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-slate-300"
              >
                <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', service.dot)} />
                <span className="text-xs font-bold text-white/90">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-white/50">What this improves</p>
            <div className="grid gap-3 md:grid-cols-3">
              {service.proof.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm font-semibold text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href={`/services/${service.slug}`}
            className="group inline-flex w-fit items-center gap-2 text-sm font-black text-cyan-100"
          >
            View {service.title}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  return (
    <section id="services" className="section-anchor relative overflow-hidden bg-white/70 px-4 py-14 sm:px-6 md:py-20 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionTag text="OUR SERVICES" variant="light" />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl"
            >
              Services that become operating systems, not one-off deliverables.
            </motion.h2>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600">
              Cognisa handles the product thinking, engineering, automation, and managed delivery needed to turn business bottlenecks into reliable software.
            </p>
          </div>
          <EnterpriseButton href="/services" variant="secondary" className="w-fit">
            View all services
          </EnterpriseButton>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                active={activeIndex === index}
                onSelect={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <div className="lg:sticky lg:top-8">
            <ActiveServicePreview service={activeService} />
          </div>
        </div>
      </div>
    </section>
  );
}
