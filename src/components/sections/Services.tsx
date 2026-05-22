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
    accent: 'indigo',
    tone: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    dot: 'bg-indigo-500',
    line: 'from-indigo-500 to-violet-500',
    glow: 'rgba(99, 102, 241, 0.16)',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
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
        'group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-lg border bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)]',
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

        <div className="relative z-10 flex flex-col gap-8">
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

          <div className="grid gap-3 sm:grid-cols-2">
            {service.subservices.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
                className="rounded-lg border border-white/10 bg-white/[0.06] p-4"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className={cn('h-2 w-2 rounded-full', service.dot)} />
                  <span className="text-xs font-black uppercase text-white/50">Capability</span>
                </div>
                <p className="text-sm font-bold text-white">{item}</p>
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
