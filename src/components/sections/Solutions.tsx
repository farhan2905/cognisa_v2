'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTag from '@/components/shared/SectionTag';
import { ShieldCheck, Target, TrendingUp, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const solutions = [
  {
    icon: Target,
    title: 'We speak human, not jargon',
    description: 'No confusing acronyms or bloated tech talk — just clear, plain-English explanations of how the software will solve your actual business problems.',
  },
  {
    title: 'We build for business results',
    icon: TrendingUp,
    description: "We don't build shiny tools just for the sake of it. Every line of code or automation we write is designed to save you time or increase your bottom line.",
  },
  {
    title: 'We pick the right tools',
    icon: ShieldCheck,
    description: 'With hands-on experience across modern development and AI, we bypass the hype and select the exact technology that fits your budget and goals.',
  },
  {
    title: 'Your dedicated tech partner',
    icon: Users,
    description: 'From the first blueprint to managing the servers long after launch, we handle all the technical heavy lifting so you can focus on running your business.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Solutions() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-anchor bg-transparent py-16 md:py-24 relative overflow-hidden" id="solutions">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-indigo-200/60 rounded-full blur-[120px] pointer-events-none animate-orb-1" />
      <div className="absolute bottom-1/4 right-[-10%] w-[400px] h-[400px] bg-violet-200/50 rounded-full blur-[120px] pointer-events-none animate-orb-2" />
      
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <SectionTag text="OUR APPROACH" variant="dark" className="justify-center" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-4xl font-bold text-foreground mt-6 mb-6 leading-tight"
          >
            Removing the technical roadblocks to your <span className="text-indigo-500 bg-transparent">growth.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <p className="text-foreground/80 text-lg mb-8">
              It&apos;s easy to get overwhelmed by &quot;AI integrations,&quot; &quot;cloud servers,&quot; and confusing software agency pitches. We filter out the tech jargon, focus entirely on what your business actually needs, and build systems that just work.
            </p>
            <Link 
              href="/process" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 rounded-full font-semibold text-sm hover:bg-indigo-500 hover:text-white transition-all group"
            >
              See Our Process
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative overflow-hidden bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent backdrop-blur-2xl p-6 md:p-7 lg:p-9 min-h-[220px] md:min-h-[260px] lg:min-h-[280px] flex flex-col justify-between rounded-[2rem] border border-indigo-300/40 ring-1 ring-indigo-400/15 shadow-[0_10px_30px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-700 group hover:-translate-y-2 md:hover:-translate-y-4 hover:from-blue-600/[0.12] hover:via-indigo-500/[0.05] hover:border-indigo-300/60 hover:ring-indigo-400/30 hover:shadow-[0_16px_40px_rgba(59,130,246,0.20),inset_0_1px_0_rgba(255,255,255,1)]"
              >
                {/* Subtle light sweep & glow on hover */}
                <div className="absolute top-0 left-[-100%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/35 to-transparent rotate-[30deg] opacity-0 group-hover:opacity-100 group-hover:left-[200%] transition-all duration-1000 pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/[0.20] via-indigo-500/[0.10] to-transparent backdrop-blur-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-50/40 transition-all duration-500 border border-indigo-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                    <Icon className="w-7 h-7 text-indigo-500 transition-colors drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 transition-colors tracking-tight leading-tight">
                      {solution.title}
                    </h3>
                    <p className="text-foreground/75 leading-relaxed text-lg md:text-xl font-medium">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
