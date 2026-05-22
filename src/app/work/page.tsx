'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { worksData } from '@/data/work';
import PageHero from '@/components/shared/PageHero';
import PageCTA from '@/components/shared/PageCTA';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import WorkBrowserPreview from '@/components/shared/WorkBrowserPreview';
import WarpingGridBackground from '@/components/shared/WarpingGridBackground';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const categories = ['All', 'Web Portals', 'E-Commerce', 'Systems & UI'];

export default function WorkListingPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredWorks = worksData.filter((work) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Web Portals') return work.category.includes('Portal') || work.category.includes('Platform');
    if (selectedCategory === 'E-Commerce') return work.category.includes('E-Commerce');
    if (selectedCategory === 'Systems & UI') return work.category.includes('UI') || work.category.includes('Catalog') || work.category.includes('B2B');
    return true;
  });

  return (
    <>
      <PageHero
        tagText="OUR WORK"
        title="Digital systems built for"
        titleAccent="real businesses."
        description="Every project is a case study in performance, design fidelity, and scalable architecture. Here's what we've built for our clients."
        orbColor="#3b82f6"
        orbColor2="#6366f1"
      />

      {/* Portfolio Grid */}
      <section className="relative py-8 md:py-16 overflow-hidden" ref={ref}>
        {/* Warping speculative math grid background */}
        <WarpingGridBackground />



        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          
          {/* sliding category selector */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-sm relative z-20">
              {categories.map((cat) => {
                const isActive = cat === selectedCategory;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
                      isActive ? 'text-cyan-600' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-white border border-slate-200 rounded-xl shadow-sm z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {filteredWorks.map((work, i) => {
              const isWide = i % 3 === 0;
              return (
                <motion.div
                  key={work.slug}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <div className={`grid grid-cols-1 ${isWide ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
                    {/* Browser Preview */}
                    <div
                      className={`${isWide ? 'lg:col-span-2' : ''} min-h-[280px] md:min-h-[350px] relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm group`}
                    >
                      {/* Browser Header */}
                      <div className="h-10 w-full bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-2 absolute top-0 left-0 right-0 z-20">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 mx-auto max-w-[50%] truncate">
                          {work.link.replace('https://', '')}
                        </div>
                      </div>

                      {/* Showcase Live Site (Interactive) */}
                      <WorkBrowserPreview work={work} />
                    </div>

                    {/* Info Card */}
                    <GlassContentBlock className="flex flex-col justify-between" hoverEffect>
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xl">{work.icon}</span>
                          <span className="text-[10px] font-mono uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full text-slate-600 font-bold">
                            {work.category}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                          {work.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed font-medium text-sm mb-6">
                          {work.shortDescription}
                        </p>

                        {/* Key metrics */}
                        <div className="flex flex-wrap gap-4 mb-6">
                          {work.outcomes.slice(0, 2).map((outcome, idx) => (
                            <div key={idx} className="text-center">
                              <div className="text-xl font-bold" style={{ color: work.color }}>
                                {outcome.metric}
                              </div>
                              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                                {outcome.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-full font-bold text-xs hover:bg-cyan-700 transition-all w-fit shadow-sm"
                      >
                        Visit Website <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </GlassContentBlock>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <PageCTA
        title="Ready to build something"
        titleAccent="similar?"
        description="We apply the exact same rigorous engineering standards to every project. Let's discuss yours."
      />
    </>
  );
}
