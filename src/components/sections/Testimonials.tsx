'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import EnterpriseButton from '@/components/shared/EnterpriseButton';
import SectionTag from '@/components/shared/SectionTag';
import { worksData } from '@/data/work';

const proofCards = worksData.slice(0, 3).map((work) => ({
  slug: work.slug,
  title: work.title,
  category: work.category,
  description: work.shortDescription,
  outcomes: work.outcomes.slice(0, 2),
  techStack: work.techStack.slice(0, 3),
  color: work.color,
}));

const deliveryHighlights = [
  'Founder-led architecture and implementation direction',
  'Custom systems built around your exact workflow',
  'AI automation where it removes real operational friction',
  'Post-launch improvement instead of handoff-only delivery',
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-anchor relative overflow-hidden bg-slate-50/80 px-4 py-14 sm:px-6 md:py-20 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionTag text="PROJECT PROOF" variant="light" />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl"
            >
              Outcome notes from shipped Cognisa systems.
            </motion.h2>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600">
              Instead of invented testimonials, this section highlights real project categories, measurable delivery notes, and the type of operating improvements Cognisa builds toward.
            </p>
          </div>
          <EnterpriseButton href="/work" variant="secondary" className="w-fit">
            Explore project work
          </EnterpriseButton>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_0.76fr]">
          <div className="grid gap-5 md:grid-cols-3 lg:col-span-1">
            {proofCards.map((card, index) => (
              <motion.article
                key={card.slug}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
              >
                <div
                  className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full blur-3xl"
                  style={{ backgroundColor: `${card.color}22` }}
                />
                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                      <Sparkles className="h-5 w-5 text-cyan-600" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{card.category}</span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-slate-950">{card.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{card.description}</p>
                </div>

                <div className="relative z-10 mt-6 space-y-3">
                  {card.outcomes.map((outcome) => (
                    <div key={`${card.slug}-${outcome.label}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <p className="text-2xl font-black text-slate-950">{outcome.metric}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{outcome.label}</p>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-6">
                  {card.techStack.map((tech) => (
                    <span key={tech} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:p-6 lg:p-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-black uppercase text-cyan-100">
                <ShieldCheck className="h-4 w-4" />
                Delivery standard
              </div>
              <h3 className="text-2xl font-black tracking-tight md:text-3xl">Built to reduce handoff risk.</h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">
                Cognisa is positioned as a founder-managed delivery partner. That means fewer layers, tighter technical decisions, and clearer ownership from the first workflow map to post-launch improvement.
              </p>

              <div className="mt-8 space-y-3">
                {deliveryHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    <span className="text-sm font-bold text-white/80">{item}</span>
                  </div>
                ))}
              </div>

              <a href="/about" className="group mt-8 inline-flex items-center gap-2 text-sm font-black text-cyan-100">
                More about Cognisa
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
