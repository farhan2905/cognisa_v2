'use client';

import { motion } from 'framer-motion';
import EnterpriseButton from '@/components/shared/EnterpriseButton';

interface PageCTAProps {
  tagText?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export default function PageCTA({
  tagText = "Let's Talk",
  title = 'Ready to Transform Your',
  titleAccent = 'Digital Presence?',
  description = "Let's start a conversation about your goals. Our team is ready to craft a custom strategy that drives real, measurable results for your business.",
  primaryText = 'Get a Free Consultation',
  primaryHref = '/contact',
  secondaryText = 'hello@cognisa.in',
  secondaryHref = 'mailto:hello@cognisa.in',
}: PageCTAProps) {
  return (
    <section className="relative overflow-hidden bg-white/70 px-4 py-14 sm:px-6 md:py-20 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_22px_70px_rgba(15,23,42,0.20)] sm:p-8 lg:p-12"
        >
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:54px_54px] opacity-25" />
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-cyan-300/12 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-black uppercase text-cyan-200">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                {tagText}
              </div>
              <h2 className="max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                {title}{' '}
                <span className="text-cyan-200">{titleAccent}</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-300">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <EnterpriseButton href={primaryHref} variant="secondary" className="border-white/15 bg-white text-slate-950 hover:bg-cyan-100">
                {primaryText}
              </EnterpriseButton>
              <EnterpriseButton href={secondaryHref} variant="ghost" className="border-white/10 text-white hover:bg-white/10 hover:text-white">
                {secondaryText}
              </EnterpriseButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
