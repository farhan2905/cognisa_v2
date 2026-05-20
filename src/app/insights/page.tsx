'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { insightsData } from '@/data/insights';
import PageHero from '@/components/shared/PageHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import IridescentBlobBackground from '@/components/shared/fragments/IridescentBlobBackground';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function InsightsListingPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const featured = insightsData[0];
  const rest = insightsData.slice(1);

  return (
    <>
      <PageHero
        tagText="INSIGHTS & RESOURCES"
        title="Your pocket-sized library of"
        titleAccent="tips & strategies."
        description="Deep dives into AI automation, modern web architecture, and business strategy — written by engineers who actually build the stuff."
        orbColor="#3b82f6"
        orbColor2="#8b5cf6"
      />

      {/* Featured Article */}
      <section className="relative py-4 md:py-8">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          <Link href={`/insights/${featured.slug}`} className="block group">
            <GlassContentBlock className="p-8 md:p-12" hoverEffect>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-indigo-500/10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                      Featured
                    </span>
                    <span className="text-foreground/40 text-xs font-mono flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight group-hover:text-indigo-500 transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-foreground/70 leading-relaxed font-medium mb-6 text-base md:text-lg">
                    {featured.shortDescription}
                  </p>
                  <div className="flex items-center gap-2 text-foreground/50 group-hover:text-indigo-500 transition-colors font-semibold">
                    Read article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="relative h-[200px] md:h-[280px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent border border-indigo-300/30 flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{ background: `radial-gradient(circle at center, ${featured.color}, transparent 70%)` }}
                  />
                  <featured.icon className="w-20 h-20 opacity-20" style={{ color: featured.color }} />
                </div>
              </div>
            </GlassContentBlock>
          </Link>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="relative py-8 md:py-16 overflow-hidden" ref={ref}>
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article, i) => (
              <motion.div
                key={article.slug}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <Link
                  href={`/insights/${article.slug}`}
                  className="block h-full group hover:-translate-y-2 transition-transform duration-500"
                >
                  <GlassContentBlock hoverEffect className="p-6 h-full flex flex-col rounded-3xl">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="bg-foreground/10 text-foreground px-3 py-1 rounded-full text-xs font-mono tracking-wide">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-foreground/40 text-xs font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-indigo-500 transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed mt-auto text-sm">
                      {article.shortDescription}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-foreground/50 group-hover:text-indigo-500 transition-colors font-medium text-sm">
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlassContentBlock>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-12 md:py-20">
        <div className="w-full max-w-[700px] mx-auto px-4 md:px-8">
          <GlassContentBlock className="text-center p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
              Stay in the loop
            </h3>
            <p className="text-foreground/60 mb-8 font-medium">
              Get the latest insights on AI, web development, and growth strategy delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-gradient-to-br from-blue-600/[0.04] via-indigo-500/[0.015] to-transparent border border-indigo-300/40 ring-1 ring-indigo-400/10 text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-indigo-400/60 transition-all text-sm font-medium"
              />
              <button className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white rounded-full font-semibold text-sm hover:opacity-95 transition-all shadow-[0_4px_16px_rgba(99,102,241,0.25)]">
                Subscribe
              </button>
            </div>
          </GlassContentBlock>
        </div>
      </section>
    </>
  );
}
