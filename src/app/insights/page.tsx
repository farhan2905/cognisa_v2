'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import EnterpriseButton from '@/components/shared/EnterpriseButton';
import PageHero from '@/components/shared/PageHero';
import { insightsData } from '@/data/insights';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

export default function InsightsListingPage() {
  const featured = insightsData[0];
  const rest = insightsData.slice(1);
  const FeaturedIcon = featured.icon;

  return (
    <>
      <PageHero
        tagText="INSIGHTS & RESOURCES"
        title="Practical thinking for"
        titleAccent="better systems."
        description="Notes on AI automation, scalable web architecture, and the build-versus-buy decisions behind custom software."
        orbColor="#06b6d4"
        orbColor2="#10b981"
      />

      <section className="relative bg-white/70 px-4 py-8 sm:px-6 md:py-12 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Link href={`/insights/${featured.slug}`} className="group block">
            <article className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
                style={{ backgroundColor: `${featured.color}20` }}
              />
              <div className="grid gap-0 lg:grid-cols-[1fr_0.72fr]">
                <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-cyan-700">
                      Featured
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{featured.category}</p>
                  <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-slate-950 transition-colors group-hover:text-cyan-700 md:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600">{featured.shortDescription}</p>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-black text-slate-950 transition-colors group-hover:text-cyan-700">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                <div className="relative z-10 border-t border-slate-200 bg-slate-950 p-6 text-white sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                  <div className="flex h-full min-h-[240px] sm:min-h-[260px] lg:min-h-[310px] flex-col justify-between rounded-lg border border-white/10 bg-white/[0.05] px-5 py-7">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                      <FeaturedIcon className="h-7 w-7" style={{ color: featured.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-white/50">Focus area</p>
                      <p className="mt-3 text-2xl font-black leading-tight text-white">AI, architecture, and business workflow decisions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      <section className="relative bg-slate-50/80 px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {rest.map((article, index) => {
              const Icon = article.icon;

              return (
                <motion.article
                  key={article.slug}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <Link
                    href={`/insights/${article.slug}`}
                    className="group relative flex h-full min-h-[280px] sm:min-h-[300px] lg:min-h-[360px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white px-6 py-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
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
                    <p className="relative z-10 text-xs font-black uppercase tracking-[0.18em] text-slate-400">{article.category}</p>
                    <h3 className="relative z-10 mt-3 text-2xl font-black leading-tight tracking-tight text-slate-950 transition-colors group-hover:text-cyan-700">
                      {article.title}
                    </h3>
                    <p className="relative z-10 mt-4 text-sm font-semibold leading-7 text-slate-600">{article.shortDescription}</p>
                    <div className="relative z-10 mt-auto pt-8">
                      <span className="inline-flex items-center gap-2 text-sm font-black text-slate-950 transition-colors group-hover:text-cyan-700">
                        Read article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-white/70 px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        <div className="mx-auto max-w-[900px] rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8 lg:p-10">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Need a build decision?</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            Turn one software question into a clear implementation path.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-8 text-slate-600">
            Bring the workflow, integration, or AI automation idea you are weighing. Cognisa can help separate what should be built, bought, automated, or left alone.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <EnterpriseButton href="/contact" variant="primary">
              Talk to Cognisa
            </EnterpriseButton>
            <EnterpriseButton href="/services" variant="secondary">
              View services
            </EnterpriseButton>
          </div>
        </div>
      </section>
    </>
  );
}
