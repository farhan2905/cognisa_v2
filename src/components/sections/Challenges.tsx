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
  website: { color: 'from-blue-500 to-indigo-500', border: 'border-blue-300/30', bg: 'from-blue-600/[0.04] via-indigo-500/[0.015]', label: 'Website & Apps' },
  ai: { color: 'from-violet-500 to-purple-500', border: 'border-violet-300/30', bg: 'from-violet-600/[0.04] via-purple-500/[0.015]', label: 'AI & Automation' },
  cost: { color: 'from-amber-500 to-orange-500', border: 'border-amber-300/30', bg: 'from-amber-600/[0.04] via-orange-500/[0.015]', label: 'Cost & Management' },
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

function QuestionItem({ 
  q, 
  index, 
  isInView, 
  expandedId, 
  setExpandedId 
}: { 
  q: Question; 
  index: number; 
  isInView: boolean; 
  expandedId: string | null; 
  setExpandedId: (id: string | null) => void;
}) {
  const config = categoryConfig[q.category];
  const isExpanded = expandedId === q.id;
  const isOffset = index % 3 === 1;

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`${isOffset ? 'lg:ml-8' : ''}`}
    >
      <motion.button
        onClick={() => setExpandedId(isExpanded ? null : q.id)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full text-left relative overflow-hidden bg-gradient-to-br ${config.bg} to-transparent backdrop-blur-2xl rounded-2xl p-4 md:p-5 border ${config.border} ring-1 ring-indigo-400/10 shadow-[0_4px_16px_rgba(99,102,241,0.03),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-500 group hover:shadow-[0_8px_24px_rgba(99,102,241,0.06),inset_0_1px_0_rgba(255,255,255,0.55)]`}
        whileHover={{ scale: 1.01, y: -1 }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Spotlight overlay */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.12), transparent 80%)`,
            }}
          />
        )}

        {/* Category badge & Chevron */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r ${config.color} text-white`}>
              {q.id}
            </span>
            <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider font-bold">
              {config.label}
            </span>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/10 transition-colors"
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-foreground/40 group-hover:text-indigo-500 transition-colors">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        <div className="relative z-10">
          <p className="text-sm md:text-base text-foreground/80 group-hover:text-foreground transition-colors font-semibold pr-4 leading-relaxed">
            {q.question}
          </p>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-indigo-300/20">
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed font-medium pl-1 border-l-2 border-indigo-500/30">
                    {q.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </motion.div>
  );
}

export default function Challenges() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section ref={ref} className="section-anchor bg-transparent py-10 md:py-16 lg:py-24" id="challenges">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="glass-surface rounded-[1.5rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-10 border border-white/40 shadow-[0_15px_40px_rgba(99,102,241,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left Column - Scanner */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <SectionTag text="THE CHALLENGE" variant="light" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-36 h-36 md:w-56 md:h-56 mx-auto lg:mx-0 my-4 md:my-8"
                >
                  <RadarScanner className="w-full h-full" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-2xl md:text-4xl font-bold text-foreground leading-tight tracking-tight mt-4 mb-4 md:mt-6 md:mb-6"
                >
                  Scanning business{' '}
                  <span className="bg-indigo-500/10 border border-indigo-300/40 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-2 py-0.5 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">bottlenecks.</span>
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
                {questions.map((q, i) => (
                  <QuestionItem 
                    key={q.id}
                    q={q} 
                    index={i} 
                    isInView={isInView} 
                    expandedId={expandedId} 
                    setExpandedId={setExpandedId} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
