'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  MonitorUp,
} from 'lucide-react';
import EnterpriseButton from '@/components/shared/EnterpriseButton';
import SectionTag from '@/components/shared/SectionTag';
import { worksData } from '@/data/work';
import { cn } from '@/lib/utils';

const workTabs = [
  { key: 'travel', label: 'Travel', match: ['Travel'] },
  { key: 'systems', label: 'Systems + UI', match: ['UI', 'Catalog', 'B2B'] },
  { key: 'commerce', label: 'Commerce', match: ['E-Commerce'] },
  { key: 'all', label: 'All Work', match: [] },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

type Work = (typeof worksData)[number];
type WorkTabKey = (typeof workTabs)[number]['key'];

function getWorksForTab(tabKey: WorkTabKey) {
  const tab = workTabs.find((item) => item.key === tabKey);
  if (!tab || tab.key === 'all') return worksData;

  return worksData.filter((work) => tab.match.some((token) => work.category.includes(token)));
}

function LiveWebsitePreview({ work }: { work: Work }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={work.slug}
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, scale: 0.985 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
      >
        <div className="flex h-11 items-center gap-3 border-b border-white/10 bg-white/[0.06] px-4">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="mx-auto max-w-[58%] truncate rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-center font-mono text-[10px] text-white/55">
            {work.link.replace('https://', '')}
          </div>
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${work.title}`}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/55 transition-colors hover:border-cyan-200/40 hover:text-cyan-100"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="relative h-[360px] overflow-hidden bg-white sm:h-[430px] lg:h-[560px]">
          <iframe
            src={work.link}
            title={`${work.title} live website preview`}
            className="h-full w-full border-none bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5">
            <div className="pointer-events-auto flex flex-col gap-3 rounded-lg border border-white/10 bg-slate-950/90 p-4 text-white shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100/80">Live project</p>
                <p className="mt-1 text-base font-black">{work.title}</p>
              </div>
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-xs font-black text-slate-950 transition-all hover:bg-cyan-100"
              >
                Open live site
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectSelector({
  work,
  index,
  active,
  onSelect,
}: {
  work: Work;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const primaryOutcome = work.outcomes[0];

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
        'group relative overflow-hidden rounded-lg border bg-white p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)]',
        active ? 'border-slate-400 shadow-[0_18px_48px_rgba(15,23,42,0.10)]' : 'border-slate-200'
      )}
    >
      <div
        className="absolute -right-12 -top-16 h-32 w-32 rounded-full blur-3xl"
        style={{ backgroundColor: `${work.color}20` }}
      />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">{work.category}</p>
          <h3 className="mt-2 text-lg font-black tracking-tight text-slate-950">{work.title}</h3>
        </div>
        <span className="font-mono text-xs font-black text-slate-300">{work.number}</span>
      </div>
      <p className="relative z-10 mt-3 text-sm font-semibold leading-6 text-slate-600">{work.shortDescription}</p>
      {primaryOutcome && (
        <div className="relative z-10 mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xl font-black text-slate-950">{primaryOutcome.metric}</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{primaryOutcome.label}</p>
        </div>
      )}
    </motion.button>
  );
}

export default function Process() {
  const [activeTab, setActiveTab] = useState<WorkTabKey>('travel');
  const tabWorks = useMemo(() => getWorksForTab(activeTab), [activeTab]);
  const [activeSlug, setActiveSlug] = useState(worksData[0].slug);

  const availableWorks = tabWorks.length > 0 ? tabWorks : worksData;
  const activeWork = availableWorks.find((work) => work.slug === activeSlug) ?? availableWorks[0];

  const handleTabChange = (tabKey: WorkTabKey) => {
    const nextWorks = getWorksForTab(tabKey);
    setActiveTab(tabKey);
    setActiveSlug((nextWorks[0] ?? worksData[0]).slug);
  };

  return (
    <section id="work" className="section-anchor relative overflow-hidden bg-slate-50/80 px-4 py-14 sm:px-6 md:py-20 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <SectionTag text="OUR WORK" variant="light" />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl"
            >
              Live systems built for real business workflows.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
            className="lg:justify-self-end"
          >
            <p className="max-w-2xl text-base font-semibold leading-8 text-slate-600 lg:text-right">
              Switch by work category, review the project context, and inspect the actual live websites Cognisa has built.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:justify-end">
              <EnterpriseButton href="/work" variant="secondary">
                View all work
              </EnterpriseButton>
              <EnterpriseButton href="/contact" variant="primary">
                Let&apos;s talk
              </EnterpriseButton>
            </div>
          </motion.div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {workTabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabChange(tab.key)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-black transition-all duration-300',
                  isActive
                    ? 'border-slate-950 bg-slate-950 text-white shadow-[0_14px_34px_rgba(15,23,42,0.14)]'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-200 hover:text-cyan-700'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-200 bg-cyan-50 text-cyan-700">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Selected category</p>
                  <p className="text-lg font-black text-slate-950">{workTabs.find((tab) => tab.key === activeTab)?.label}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {availableWorks.map((work, index) => (
                  <ProjectSelector
                    key={work.slug}
                    work={work}
                    index={index}
                    active={activeWork.slug === work.slug}
                    onSelect={() => setActiveSlug(work.slug)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <LiveWebsitePreview work={activeWork} />

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="grid gap-5 md:grid-cols-[1fr_0.85fr]"
            >
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-2">
                  <MonitorUp className="h-5 w-5 text-cyan-700" />
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Project context</p>
                </div>
                <h3 className="text-2xl font-black tracking-tight text-slate-950">{activeWork.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{activeWork.fullDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeWork.techStack.map((tech) => (
                    <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_48px_rgba(15,23,42,0.14)] sm:p-6">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100/80">Delivery outcomes</p>
                <div className="mt-5 space-y-3">
                  {activeWork.outcomes.map((outcome) => (
                    <div key={`${activeWork.slug}-${outcome.label}`} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <div>
                        <p className="text-xl font-black">{outcome.metric}</p>
                        <p className="text-sm font-semibold leading-6 text-slate-300">{outcome.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href={`/work/${activeWork.slug}`} className="group mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-100">
                  View case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
