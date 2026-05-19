'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionTag from '@/components/shared/SectionTag';
import RadarScanner from '@/components/shared/RadarScanner';
import TerminalTyping from '@/components/shared/TerminalTyping';

interface Question {
  id: string;
  category: 'website' | 'ai' | 'cost';
  question: string;
  answer: string;
}

const questions: Question[] = [
  {
    id: 'Q01',
    category: 'website',
    question: 'What kind of website does my business actually need?',
    answer: 'We audit your goals, audience, and growth stage to recommend the exact architecture — from landing pages to full SaaS platforms.',
  },
  {
    id: 'Q02',
    category: 'website',
    question: 'How long does it take to build a custom website or app?',
    answer: 'Most MVPs ship in 4–6 weeks. Complex platforms typically take 8–12 weeks with weekly deliverables you can test.',
  },
  {
    id: 'Q03',
    category: 'website',
    question: 'Do I need a simple webpage, or a full custom application?',
    answer: 'If you have users logging in, processing data, or making payments — you need an application. We help you decide in the first call.',
  },
  {
    id: 'Q04',
    category: 'website',
    question: 'What features are actually important for my customers?',
    answer: 'We run user-journey mapping and competitor teardowns to prioritize features that drive conversion, not vanity.',
  },
  {
    id: 'Q05',
    category: 'ai',
    question: 'Everyone is talking about AI, but how does it help ME?',
    answer: 'AI automates the repetitive tasks draining your team — customer support, data entry, scheduling, and reporting — 24/7.',
  },
  {
    id: 'Q06',
    category: 'ai',
    question: 'Can software really do the boring tasks my team hates?',
    answer: 'Yes. We build custom agents that handle emails, forms, invoices, and follow-ups with human-level accuracy.',
  },
  {
    id: 'Q07',
    category: 'ai',
    question: 'Will this "automation" thing be too complicated for us to use?',
    answer: 'We design every interface for non-technical users. If your team can use Slack, they can use our systems.',
  },
  {
    id: 'Q08',
    category: 'ai',
    question: 'Does adding AI mean I have to rebuild my whole business?',
    answer: 'No. We integrate AI into your existing stack — CRMs, spreadsheets, websites — without disruption.',
  },
  {
    id: 'Q09',
    category: 'cost',
    question: 'How much is all of this tech actually going to cost me?',
    answer: 'We provide fixed-price proposals based on scope, not open-ended hourly billing. No surprises.',
  },
  {
    id: 'Q10',
    category: 'cost',
    question: 'Who manages the website and software after it\'s built?',
    answer: 'We offer managed hosting, monitoring, and updates. Your site stays secure, fast, and current — hands-free.',
  },
  {
    id: 'Q11',
    category: 'cost',
    question: 'What if something breaks — how do we get it fixed?',
    answer: '24/7 monitoring catches issues before you do. Our SLA guarantees response within 2 hours for critical bugs.',
  },
  {
    id: 'Q12',
    category: 'cost',
    question: 'Do I need to hire my own IT guy to run this?',
    answer: 'No. We are your IT team. One partner for strategy, build, launch, and maintenance.',
  },
];

const categoryConfig = {
  website: { color: 'from-blue-500 to-indigo-500', border: 'border-blue-300/40', bg: 'from-blue-600/[0.06] via-indigo-500/[0.025]', label: 'Website & Apps' },
  ai: { color: 'from-violet-500 to-purple-500', border: 'border-violet-300/40', bg: 'from-violet-600/[0.06] via-purple-500/[0.025]', label: 'AI & Automation' },
  cost: { color: 'from-amber-500 to-orange-500', border: 'border-amber-300/40', bg: 'from-amber-600/[0.06] via-orange-500/[0.025]', label: 'Cost & Management' },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Challenges() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section ref={ref} className="section-anchor bg-transparent py-16 md:py-24" id="challenges">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="glass-surface rounded-[2.5rem] p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left Column - Scanner */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <SectionTag text="THE CHALLENGE" variant="light" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-48 h-48 md:w-56 md:h-56 mx-auto lg:mx-0 my-8"
                >
                  <RadarScanner className="w-full h-full" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight mt-6 mb-6"
                >
                  Scanning business{' '}
                  <span className="bg-indigo-500 text-white px-2 rounded-lg">bottlenecks.</span>
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="font-mono text-xs text-foreground/40 mb-4 h-6"
                >
                  <TerminalTyping
                    commands={[
                      '> scan --target business --depth full',
                      '> analyze --category growth_blockers',
                      '> detect --issues manual_workflows',
                    ]}
                    typingSpeed={45}
                    deleteSpeed={20}
                    pauseDuration={2000}
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="text-foreground/80 text-lg leading-relaxed max-w-md"
                >
                  Every business faces hurdles. Here are the questions our clients bring to us — and the clarity we provide to help them scale without the guesswork.
                </motion.p>
              </div>
            </div>

            {/* Right Column - Masonry Pills */}
            <div className="lg:col-span-7">
              <div className="flex flex-col gap-3">
                {questions.map((q, i) => {
                  const config = categoryConfig[q.category];
                  const isExpanded = expandedId === q.id;
                  const isOffset = i % 3 === 1;

                  return (
                    <motion.div
                      key={q.id}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                      className={`${isOffset ? 'lg:ml-8' : ''}`}
                    >
                      <motion.button
                        onClick={() => setExpandedId(isExpanded ? null : q.id)}
                        className={`w-full text-left relative overflow-hidden bg-gradient-to-br ${config.bg} to-transparent backdrop-blur-2xl rounded-2xl p-4 md:p-5 border ${config.border} ring-1 ring-indigo-400/10 shadow-[0_4px_16px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] transition-all duration-500 group hover:shadow-[0_8px_24px_rgba(59,130,246,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]`}
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {/* Category badge */}
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r ${config.color} text-white`}>
                            {q.id}
                          </span>
                          <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider">
                            {config.label}
                          </span>
                        </div>

                        <div className="flex items-start justify-between gap-4">
                          <p className="text-sm md:text-base text-foreground/80 group-hover:text-foreground transition-colors font-medium leading-relaxed">
                            {q.question}
                          </p>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-500/10 transition-colors"
                          >
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-foreground/40 group-hover:text-indigo-500 transition-colors">
                              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </motion.div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 mt-3 border-t border-indigo-300/20">
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                  {q.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
