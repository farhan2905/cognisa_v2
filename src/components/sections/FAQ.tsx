'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';
import SectionTag from '@/components/shared/SectionTag';
import TerminalTyping from '@/components/shared/TerminalTyping';

interface FAQItem {
  question: string;
  answer: string;
  category: 'services' | 'process' | 'pricing';
}

const faqs: FAQItem[] = [
  {
    question: "What makes your approach different from other agencies?",
    answer: "We don't believe in cookie-cutter solutions or endless jargon. Our approach is entirely data-driven and tailored specifically to your goals. We act as an extension of your team, providing complete transparency and measurable results from day one.",
    category: 'services',
  },
  {
    question: "How long does it take to see tangible results?",
    answer: "While every business is unique, our agile methodologies typically deliver initial quick wins within the first 30-45 days. Long-term, sustainable growth strategies usually mature around the 3-6 month mark, depending on market conditions and your industry.",
    category: 'process',
  },
  {
    question: "Do you work with startups or established enterprises?",
    answer: "Both. We have scaled startups from zero to seven figures and have helped established enterprises optimize their operations and revitalize their digital presence. Our strategies scale and adapt to your current stage of growth.",
    category: 'services',
  },
  {
    question: "What is your pricing structure?",
    answer: "We offer flexible, value-based pricing rather than strict hourly billing. Depending on the project scope, we provide clear milestone-based pricing or monthly retainers for ongoing growth partnerships. Everything is transparent before we start.",
    category: 'pricing',
  },
  {
    question: "Can you help integrate AI into our existing workflows?",
    answer: "Absolutely. We specialize in identifying bottlenecks and implementing custom AI solutions that automate repetitive tasks, enhance data analysis, and improve overall operational efficiency without disrupting your core business.",
    category: 'services',
  },
];

const categories = [
  { key: 'all' as const, label: 'All Questions' },
  { key: 'services' as const, label: 'Services' },
  { key: 'process' as const, label: 'Process' },
  { key: 'pricing' as const, label: 'Pricing' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'services' | 'process' | 'pricing'>('all');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, 'up' | 'down' | null>>({});
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  const handleVote = (index: number, vote: 'up' | 'down') => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [index]: prev[index] === vote ? null : vote,
    }));
  };

  return (
    <section ref={ref} className="section-anchor bg-transparent py-16 md:py-24" id="faq">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <SectionTag text="FAQ" variant="light" className="justify-center" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-4xl font-bold text-foreground mt-6 leading-tight"
          >
            Got questions? <br />We&apos;ve got <span className="bg-indigo-500 text-white px-2 rounded-lg">answers.</span>
          </motion.h2>

          {/* Terminal intro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 h-5 flex justify-center"
          >
            <TerminalTyping
              commands={[
                '> cognisa help --topic faq',
                '> cat ./faq/services.md',
                '> cat ./faq/process.md',
              ]}
              typingSpeed={40}
              deleteSpeed={20}
              pauseDuration={2500}
            />
          </motion.div>
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_4px_14px_rgba(99,102,241,0.35)]'
                  : 'bg-gradient-to-br from-blue-600/[0.04] via-indigo-500/[0.02] to-transparent text-foreground/60 border border-indigo-300/30 hover:border-indigo-300/50 hover:text-foreground/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col gap-4"
        >
          {filteredFaqs.map((faq, index) => {
              const globalIndex = faqs.indexOf(faq);
              const isOpen = openIndex === globalIndex;
              const vote = helpfulVotes[globalIndex];

              return (
                <motion.div
                  key={globalIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`relative overflow-hidden rounded-2xl transition-all duration-300 backdrop-blur-2xl border ring-1 shadow-[0_10px_30px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(255,255,255,1)] ${
                    isOpen
                      ? 'bg-gradient-to-br from-blue-600/[0.12] via-indigo-500/[0.06] to-transparent border-indigo-300/60 ring-indigo-400/30 border-l-4 border-l-indigo-500'
                      : 'bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent border-indigo-300/40 ring-indigo-400/20 hover:from-blue-600/[0.12] hover:via-indigo-500/[0.05] hover:border-indigo-300/60 hover:ring-indigo-400/30'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold text-indigo-500/60 bg-indigo-500/10 px-2 py-1 rounded-md">
                        &gt; Q{String(globalIndex + 1).padStart(2, '0')}
                      </span>
                      <span className={`font-bold text-base md:text-lg transition-colors ${isOpen ? 'text-indigo-500' : 'text-foreground/80'}`}>
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ml-4 ${
                        isOpen ? 'bg-indigo-500/20 rotate-180 border border-indigo-500/30' : 'bg-foreground/5 border border-foreground/10'
                      }`}
                    >
                      <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-indigo-500' : 'text-foreground/50'}`} />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0">
                          <div className="pl-12">
                            <p className="text-foreground/80 text-base leading-relaxed">
                              {faq.answer}
                            </p>
                            {/* Helpful vote */}
                            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-indigo-300/15">
                              <span className="text-[11px] font-mono text-foreground/40 uppercase tracking-wider">
                                Was this helpful?
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleVote(globalIndex, 'up');
                                }}
                                className={`p-1.5 rounded-md transition-all ${
                                  vote === 'up'
                                    ? 'bg-emerald-500/15 text-emerald-500'
                                    : 'text-foreground/30 hover:text-foreground/60 hover:bg-foreground/5'
                                }`}
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleVote(globalIndex, 'down');
                                }}
                                className={`p-1.5 rounded-md transition-all ${
                                  vote === 'down'
                                    ? 'bg-red-500/15 text-red-500'
                                    : 'text-foreground/30 hover:text-foreground/60 hover:bg-foreground/5'
                                }`}
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </section>
  );
}
