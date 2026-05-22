'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import EnterpriseButton from '@/components/shared/EnterpriseButton';
import SectionTag from '@/components/shared/SectionTag';
import { insightsData } from '@/data/insights';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

function InsightCard({ article, index }: { article: (typeof insightsData)[number]; index: number }) {
  const Icon = article.icon;

  return (
    <motion.article custom={index} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
      <Link
        href={`/insights/${article.slug}`}
        className="group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-6"
      >
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full blur-3xl"
          style={{ backgroundColor: `${article.color}20` }}
        />

        <div className="relative z-10 mb-8 flex items-start justify-between gap-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
            <Icon className="h-5 w-5" style={{ color: article.color }} />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </span>
        </div>

        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{article.category}</p>
          <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-950 transition-colors group-hover:text-cyan-700">
            {article.title}
          </h3>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{article.shortDescription}</p>
        </div>

        <div className="relative z-10 mt-auto pt-8">
          <span className="inline-flex items-center gap-2 text-sm font-black text-slate-950 transition-colors group-hover:text-cyan-700">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Insights() {
  return (
    <section className="section-anchor bg-slate-50/80 px-4 py-14 sm:px-6 md:py-20 lg:px-10" id="insights">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionTag text="INSIGHTS & RESOURCES" variant="light" />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl"
            >
              Practical notes on AI, architecture, and software ROI.
            </motion.h2>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600">
              Short reads for teams deciding what to automate, what to build, and how to keep custom software scalable.
            </p>
          </div>
          <EnterpriseButton href="/insights" variant="secondary" className="w-fit">
            Read all articles
          </EnterpriseButton>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {insightsData.map((article, index) => (
            <InsightCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
