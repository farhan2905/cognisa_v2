'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, MapPin, Sparkles, UserRound } from 'lucide-react';
import SectionTag from '@/components/shared/SectionTag';
import ApplicationPathCards from '@/components/shared/ApplicationPathCards';
import EnterpriseButton from '@/components/shared/EnterpriseButton';
import Logo from '@/components/shared/Logo';

const founderSignals = [
  'Founder-led architecture',
  'Custom AI automation',
  'Production software delivery',
  'Managed improvement after launch',
];

export default function About() {
  return (
    <section
      id="about"
      className="section-anchor relative overflow-hidden bg-gradient-to-b from-white/72 to-slate-50/70 px-4 py-12 sm:px-6 md:py-16 lg:px-10"
    >
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-9 grid gap-6 lg:grid-cols-[0.84fr_1fr] lg:items-end">
          <div>
            <SectionTag text="WHY CHOOSE US" variant="light" />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="mt-5 max-w-3xl text-3xl font-black leading-tight text-slate-950 md:text-5xl"
            >
              Start with the real bottleneck, then build the software around it.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:ml-auto lg:max-w-xl"
          >
            <p className="text-base font-semibold leading-8 text-slate-600 md:text-lg">
              Managed solely by the founder of <strong className="text-black font-black">Cognisa</strong>, we turn manual work into custom web applications, AI automations, and reliable internal systems.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <EnterpriseButton href="/about" variant="secondary">
                More about us
              </EnterpriseButton>
              <EnterpriseButton href="/contact">
                Talk to an expert
              </EnterpriseButton>
            </div>
          </motion.div>
        </div>

        <ApplicationPathCards />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]"
        >
          <div className="grid gap-0 lg:grid-cols-[380px_1fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white">
                  <Logo className="h-8 w-auto" />
                </span>
                <div>
                  <p className="text-2xl font-black">Cognisa</p>
                  <p className="mt-1 text-xs font-bold uppercase text-white/50">Est. 2020</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-white/70">
                <MapPin className="h-4 w-4 text-cyan-300" />
                New York, NY
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase text-cyan-200">
                <UserRound className="h-4 w-4" />
                Founder-managed delivery
              </div>
              <h3 className="max-w-3xl text-2xl font-black leading-tight md:text-3xl">
                You get senior-level product thinking from roadmap to launch, without the handoff-heavy agency layer.
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {founderSignals.map((signal) => (
                  <div key={signal} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-bold text-white/82">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-300" />
                    {signal}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-md border border-cyan-300/20 bg-cyan-300/10 p-4">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
                <p className="text-sm font-semibold leading-7 text-cyan-50">
                  The goal is not more software for its own sake. It is a clear operating layer that helps your team move faster with better controls.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
