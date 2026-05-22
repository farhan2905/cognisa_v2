'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Activity, ArrowRight, CheckCircle2, Gauge, Layers3 } from 'lucide-react';
import EnterpriseButton from '@/components/shared/EnterpriseButton';
import SectionTag from '@/components/shared/SectionTag';

const stats = [
  {
    value: 200,
    suffix: '+',
    label: 'Projects Delivered',
    description: 'Web platforms, workflow tools, and managed improvements shipped across client and internal work.',
    accent: 'text-cyan-600',
    bar: 'from-cyan-500 to-sky-500',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Businesses Supported',
    description: 'Teams served through software delivery, automation, web systems, and growth-focused engineering.',
    accent: 'text-emerald-600',
    bar: 'from-emerald-500 to-teal-500',
  },
  {
    value: 5,
    suffix: '+',
    label: 'Years Experience',
    description: 'Founder-led delivery shaped by production projects, iteration, and post-launch system improvement.',
    accent: 'text-amber-600',
    bar: 'from-amber-500 to-orange-500',
  },
  {
    value: 4,
    suffix: '',
    label: 'Core Delivery Tracks',
    description: 'Software, AI automation, architecture, and cloud operations working as one delivery layer.',
    accent: 'text-teal-600',
    bar: 'from-teal-500 to-emerald-500',
  },
];

const deliverySignals = [
  'Discovery before build',
  'Architecture-led implementation',
  'Production-ready deployment',
  'Managed improvement after launch',
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView) return;

    const controls = animate(motionValue, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, motionValue, value]);

  useEffect(() => {
    return rounded.on('change', (latest) => setDisplayValue(latest));
  }, [rounded]);

  return (
    <span className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
      {displayValue}
      <span className="text-slate-400">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stats" ref={ref} className="section-anchor relative overflow-hidden bg-white/70 px-4 py-14 sm:px-6 md:py-20 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:sticky lg:top-8"
          >
            <SectionTag text="THE NUMBERS" variant="light" />
            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              Delivery signals without the fake dashboard noise.
            </h2>
            <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-slate-600">
              These numbers support Cognisa&apos;s actual positioning: practical delivery, founder-led architecture, and software systems that keep improving after launch.
            </p>
            <div className="mt-8">
              <EnterpriseButton href="/contact" variant="primary">
                Discuss your workflow
              </EnterpriseButton>
            </div>
          </motion.div>

          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-6"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                      <Activity className={`h-5 w-5 ${stat.accent}`} />
                    </div>
                    <span className="font-mono text-xs font-black text-slate-300">0{index + 1}</span>
                  </div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                  <h3 className="mt-4 text-base font-black text-slate-950">{stat.label}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{stat.description}</p>
                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${64 + index * 9}%` } : { width: 0 }}
                      transition={{ delay: 0.2 + index * 0.08, duration: 0.8, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${stat.bar}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]"
            >
              <div className="grid gap-0 lg:grid-cols-[1fr_0.8fr]">
                <div className="p-5 sm:p-6 lg:p-8">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-black uppercase text-cyan-100">
                    <Gauge className="h-4 w-4" />
                    Delivery model
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">A controlled path from bottleneck to managed system.</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">
                    The emphasis is not volume for its own sake. Cognisa starts with one concrete workflow, proves the build, then expands the operating layer responsibly.
                  </p>
                </div>
                <div className="border-t border-white/10 bg-white/[0.04] p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
                  <div className="mb-5 flex items-center gap-2">
                    <Layers3 className="h-5 w-5 text-emerald-300" />
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-white/50">Operating path</span>
                  </div>
                  <div className="space-y-3">
                    {deliverySignals.map((signal) => (
                      <div key={signal} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                        <span className="text-sm font-bold text-white/80">{signal}</span>
                      </div>
                    ))}
                  </div>
                  <LinkLike href="/process" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LinkLike({ href }: { href: string }) {
  return (
    <a href={href} className="group mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-100">
      See the process
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}
