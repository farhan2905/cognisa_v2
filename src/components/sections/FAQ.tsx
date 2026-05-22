'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ChevronDown, HelpCircle, Search, X } from 'lucide-react';
import EnterpriseButton from '@/components/shared/EnterpriseButton';
import SectionTag from '@/components/shared/SectionTag';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category: 'services' | 'process' | 'pricing';
}

const faqs: FAQItem[] = [
  {
    question: 'What does Cognisa actually build?',
    answer:
      'Cognisa builds custom web applications, AI workflow automations, system architecture, and managed cloud infrastructure. The work usually starts with one operational bottleneck and turns it into a reliable software layer.',
    category: 'services',
  },
  {
    question: 'Do you only make websites, or do you handle internal tools too?',
    answer:
      'Both. Public websites, portals, dashboards, e-commerce experiences, internal tools, and automation systems can all fit when they solve a real workflow problem for the business.',
    category: 'services',
  },
  {
    question: 'How do you decide where AI should be used?',
    answer:
      'AI is used when it removes manual work, improves routing, processes unstructured data, or helps a team respond faster. If a normal software workflow is more reliable than AI, the system should use that instead.',
    category: 'services',
  },
  {
    question: 'What does the project process look like?',
    answer:
      'The process starts with discovery and workflow mapping, then moves into architecture, interface design, implementation, testing, deployment, and managed improvement after launch.',
    category: 'process',
  },
  {
    question: 'Can you work with an existing codebase or tool stack?',
    answer:
      'Yes. Cognisa can extend existing Next.js, React, API, database, automation, and cloud setups when the current foundation is usable. If the system needs cleanup first, that is scoped before new feature work begins.',
    category: 'process',
  },
  {
    question: 'Do we own the source code and project assets?',
    answer:
      'Yes. Project ownership, repository access, deployment handoff, and any third-party service responsibilities are clarified before launch so the business is not locked into unclear ownership.',
    category: 'process',
  },
  {
    question: 'How is pricing handled?',
    answer:
      'Pricing depends on the workflow, integration depth, design complexity, automation requirements, and support needs. Cognisa usually scopes a defined build phase first, then offers managed improvement or maintenance separately when needed.',
    category: 'pricing',
  },
  {
    question: 'Are hosting, APIs, and third-party tools included?',
    answer:
      'Third-party costs are identified during discovery and kept transparent. Cognisa can manage implementation and deployment, but external platform fees are usually billed directly to the client account.',
    category: 'pricing',
  },
];

const categories = [
  { key: 'all' as const, label: 'All Questions' },
  { key: 'services' as const, label: 'Services' },
  { key: 'process' as const, label: 'Process' },
  { key: 'pricing' as const, label: 'Pricing' },
];

function FAQCard({
  faq,
  index,
  openIndex,
  setOpenIndex,
}: {
  faq: FAQItem;
  index: number;
  openIndex: number | null;
  setOpenIndex: (idx: number | null) => void;
}) {
  const isOpen = openIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn(
        'overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300',
        isOpen ? 'border-slate-300 shadow-[0_18px_48px_rgba(15,23,42,0.08)]' : 'border-slate-200 hover:border-slate-300'
      )}
    >
      <button
        type="button"
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
      >
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-0.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-black text-slate-400">
            Q{String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-base font-black leading-7 text-slate-950 md:text-lg">{faq.question}</span>
        </div>
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
            isOpen ? 'rotate-180 border-cyan-200 bg-cyan-50 text-cyan-700' : 'border-slate-200 bg-slate-50 text-slate-500'
          )}
        >
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <p className="border-l-2 border-cyan-400 pl-4 text-sm font-semibold leading-7 text-slate-600">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'services' | 'process' | 'pricing'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredFaqs = faqs
    .map((faq, index) => ({ faq, index }))
    .filter(({ faq }) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query || faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

  return (
    <section ref={ref} className="section-anchor bg-white/70 px-4 py-14 sm:px-6 md:py-20 lg:px-10" id="faq">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <SectionTag text="FAQ" variant="light" />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl"
            >
              Clear answers before you scope the build.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
            className="text-base font-semibold leading-8 text-slate-600"
          >
            A practical view of how Cognisa approaches services, ownership, AI automation, pricing, and post-launch delivery.
          </motion.p>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                type="button"
                onClick={() => {
                  setActiveCategory(category.key);
                  setOpenIndex(null);
                }}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-black transition-all duration-300',
                  activeCategory === category.key
                    ? 'border-slate-950 bg-slate-950 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-200 hover:text-cyan-700'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setOpenIndex(null);
              }}
              className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm font-bold text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100/70"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
            <HelpCircle className="mx-auto h-8 w-8 text-slate-400" />
            <h3 className="mt-4 text-lg font-black text-slate-950">No matching questions found</h3>
            <p className="mt-2 text-sm font-semibold text-slate-600">Try another keyword or reset the filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 transition-all hover:border-cyan-200 hover:text-cyan-700"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map(({ faq, index }) => (
              <FAQCard key={faq.question} faq={faq} index={index} openIndex={openIndex} setOpenIndex={setOpenIndex} />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">Still deciding?</p>
            <p className="mt-2 text-lg font-black text-slate-950">Bring one workflow. Cognisa can help scope the first practical build.</p>
          </div>
          <EnterpriseButton href="/contact" variant="primary" className="shrink-0">
            Talk to Cognisa
          </EnterpriseButton>
        </div>
      </div>
    </section>
  );
}
