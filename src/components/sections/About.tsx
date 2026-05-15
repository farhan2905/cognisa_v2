'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Target,
  Zap,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import SectionTag from '@/components/shared/SectionTag';

const benefits = [
  {
    icon: Target,
    title: 'Architecture First',
    description: 'Every system is designed with robust architecture for maximum scalability and performance.',
  },
  {
    icon: Zap,
    title: 'Rapid Execution',
    description: 'Agile development cycles that deliver fully functional software without compromising quality.',
  },
  {
    icon: BarChart3,
    title: 'Automated Workflows',
    description: 'Replace manual tasks with intelligent AI agents and seamless data integrations.',
  },
  {
    icon: Lightbulb,
    title: 'Code Quality',
    description: 'Clean, maintainable, and modern codebases that future-proof your digital product.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: -300 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="section-anchor relative bg-transparent py-16 md:py-24 overflow-hidden"
    >
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-indigo-200/50 rounded-full blur-[120px] pointer-events-none animate-orb-2" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-violet-200/40 rounded-full blur-[120px] pointer-events-none animate-orb-3" />
      
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 md:mb-20">
          {/* Left: Heading */}
          <div>
            <SectionTag text="WHY CHOOSE US" variant="light" />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight"
            >
              We don&apos;t just write code. We build{' '}
              <span className="bg-indigo-500 text-white px-2 rounded-lg">systems</span> that scale.
            </motion.h2>
          </div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end"
          >
            <p className="text-foreground/80 text-lg md:text-xl leading-relaxed">
              Managed solely by the founder of <strong>Cognisa</strong>, we specialize in delivering high-performance custom web applications and AI-driven automation. We partner closely with businesses to transform manual bottlenecks into scalable, automated tech solutions.
            </p>
          </motion.div>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 via-indigo-500/5 to-transparent backdrop-blur-2xl p-6 md:p-7 lg:p-9 min-h-[240px] md:min-h-[260px] flex flex-col justify-between rounded-[2rem] border border-indigo-300/50 ring-1 ring-indigo-400/20 shadow-[0_10px_30px_rgba(59,130,246,0.15),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-700 group hover:-translate-y-2 md:hover:-translate-y-3 hover:from-blue-600/20 hover:via-indigo-500/10 hover:border-indigo-400/60 hover:ring-indigo-500/30 hover:shadow-[0_20px_60px_rgba(99,102,241,0.18),inset_0_1px_0_rgba(255,255,255,0.5)]"
              >
                {/* Subtle light sweep & glow on hover */}
                <div className="absolute top-0 left-[-100%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/25 to-transparent rotate-[30deg] opacity-0 group-hover:opacity-100 group-hover:left-[200%] transition-all duration-1000 pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-50 transition-all duration-500 border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                    <Icon className="w-6 h-6 text-indigo-500 transition-colors drop-shadow-sm" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 transition-colors tracking-tight leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-foreground/75 text-base md:text-lg leading-relaxed font-medium">
                      {benefit.description}
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
