'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionTag from '@/components/shared/SectionTag';

const faqs = [
  { question: "What makes your approach different from other agencies?", answer: "We don't believe in cookie-cutter solutions or endless jargon. Our approach is entirely data-driven and tailored specifically to your goals. We act as an extension of your team, providing complete transparency and measurable results from day one." },
  { question: "How long does it take to see tangible results?", answer: "While every business is unique, our agile methodologies typically deliver initial quick wins within the first 30-45 days. Long-term, sustainable growth strategies usually mature around the 3-6 month mark, depending on market conditions and your industry." },
  { question: "Do you work with startups or established enterprises?", answer: "Both. We have scaled startups from zero to seven figures and have helped established enterprises optimize their operations and revitalize their digital presence. Our strategies scale and adapt to your current stage of growth." },
  { question: "What is your pricing structure?", answer: "We offer flexible, value-based pricing rather than strict hourly billing. Depending on the project scope, we provide clear milestone-based pricing or monthly retainers for ongoing growth partnerships. Everything is transparent before we start." },
  { question: "Can you help integrate AI into our existing workflows?", answer: "Absolutely. We specialize in identifying bottlenecks and implementing custom AI solutions that automate repetitive tasks, enhance data analysis, and improve overall operational efficiency without disrupting your core business." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-anchor bg-transparent py-16 md:py-24" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionTag text="FAQ" variant="light" className="justify-center" />
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-2xl md:text-4xl font-bold text-foreground mt-6 leading-tight">
            Got questions? <br/>We&apos;ve got <span className="bg-indigo-500 text-white px-2 rounded-lg">answers.</span>
          </motion.h2>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.2, duration: 0.7 }} className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl transition-all duration-300 backdrop-blur-2xl border ring-1 shadow-[0_10px_30px_rgba(59,130,246,0.15),inset_0_1px_0_rgba(255,255,255,0.25)] ${
                  isOpen
                    ? 'bg-gradient-to-br from-blue-600/15 via-indigo-500/5 to-transparent border-indigo-400/60 ring-indigo-500/30'
                    : 'bg-gradient-to-br from-blue-600/5 via-indigo-500/[0.02] to-transparent border-indigo-300/50 ring-indigo-400/20 hover:from-blue-600/15 hover:via-indigo-500/5 hover:border-indigo-400/60 hover:ring-indigo-500/30'
                }`}
              >
                <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full flex items-center justify-between p-5 text-left focus:outline-none">
                  <span className={`font-bold text-base md:text-lg transition-colors ${isOpen ? 'text-indigo-500' : 'text-foreground/80'}`}>{faq.question}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'bg-indigo-500/20 rotate-180 border border-indigo-500/30' : 'bg-foreground/5 border border-foreground/10'}`}>
                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-indigo-500' : 'text-foreground/50'}`} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                      <div className="px-5 pb-5 pt-0 text-foreground/80 text-base leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
