'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTag from '@/components/shared/SectionTag';

const categories = [
  {
    title: 'Website & Apps',
    questions: [
      "What kind of website does my business actually need?",
      "How long does it take to build a custom website or app?",
      "Do I need a simple webpage, or a full custom application?",
      "What features are actually important for my customers?",
    ],
  },
  {
    title: 'AI & Automation',
    questions: [
      "Everyone is talking about AI, but how does it help ME?",
      "Can software really do the boring tasks my team hates?",
      "Will this 'automation' thing be too complicated for us to use?",
      "Does adding AI mean I have to rebuild my whole business?",
    ],
  },
  {
    title: 'Cost & Management',
    questions: [
      "How much is all of this tech actually going to cost me?",
      "Who manages the website and software after it's built?",
      "What if something breaks—how do we get it fixed?",
      "Do I need to hire my own IT guy to run this?",
    ],
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Challenges() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-anchor bg-transparent py-16 md:py-24" id="challenges">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="glass-surface rounded-[2.5rem] p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Left Column - Heading */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <SectionTag text="THE CHALLENGE" variant="light" />
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight mt-6 mb-6"
                >
                  Questions we hear <span className="bg-indigo-500 text-white px-2 rounded-lg">every day.</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="text-foreground/80 text-lg leading-relaxed max-w-md"
                >
                  Every business faces hurdles. Here are the questions our clients bring to us — and the clarity we provide to help them scale without the guesswork.
                </motion.p>
              </div>
            </div>

            {/* Right Column - Questions List */}
            <div className="lg:col-span-7 lg:pl-12">
              <div className="flex flex-col gap-8">
                {categories.map((category, catIdx) => (
                  <motion.div
                    key={category.title}
                    custom={catIdx}
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="relative overflow-hidden bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-indigo-300/40 ring-1 ring-indigo-400/15 shadow-[0_10px_30px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(255,255,255,1)]"
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-6">
                      {category.title}
                    </h3>
                    <ul className="space-y-4">
                      {category.questions.map((question, qIdx) => (
                        <li key={qIdx} className="flex items-start gap-4 group cursor-default">
                          <span className="font-mono text-sm text-foreground/50 mt-1.5 transition-colors group-hover:text-indigo-500">
                            Q{String(qIdx + 1 + (catIdx * 4)).padStart(2, '0')}
                          </span>
                          <p className="text-lg text-foreground/80 group-hover:text-foreground transition-colors">
                            {question}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
