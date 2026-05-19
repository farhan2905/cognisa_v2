'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import SectionTag from '@/components/shared/SectionTag';
import { ShieldCheck, Target, TrendingUp, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const solutions = [
  {
    icon: Target,
    title: 'We speak human, not jargon',
    description: 'No confusing acronyms or bloated tech talk — just clear, plain-English explanations of how the software will solve your actual business problems.',
    color: '#6366f1',
  },
  {
    icon: TrendingUp,
    title: 'We build for business results',
    description: "We don't build shiny tools just for the sake of it. Every line of code or automation we write is designed to save you time or increase your bottom line.",
    color: '#8b5cf6',
  },
  {
    icon: ShieldCheck,
    title: 'We pick the right tools',
    description: 'With hands-on experience across modern development and AI, we bypass the hype and select the exact technology that fits your budget and goals.',
    color: '#a78bfa',
  },
  {
    icon: Users,
    title: 'Your dedicated tech partner',
    description: 'From the first blueprint to managing the servers long after launch, we handle all the technical heavy lifting so you can focus on running your business.',
    color: '#818cf8',
  },
];

function TiltCard({
  solution,
  index,
  isInView,
}: {
  solution: (typeof solutions)[0];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -6);
    setRotateY((x - 0.5) * 6);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const Icon = solution.icon;
  const isOffset = index % 2 === 1;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${isOffset ? 'lg:mt-10' : ''}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent backdrop-blur-2xl p-6 md:p-7 lg:p-9 min-h-[220px] md:min-h-[260px] lg:min-h-[280px] flex flex-col justify-between rounded-[2rem] border border-indigo-300/40 ring-1 ring-indigo-400/15 shadow-[0_10px_30px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-700 group hover:-translate-y-2 md:hover:-translate-y-4 hover:from-blue-600/[0.12] hover:via-indigo-500/[0.05] hover:border-indigo-300/60 hover:ring-indigo-400/30 hover:shadow-[0_16px_40px_rgba(59,130,246,0.20),inset_0_1px_0_rgba(255,255,255,1)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Subtle light sweep & glow on hover */}
        <div className="absolute top-0 left-[-100%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/35 to-transparent rotate-[30deg] opacity-0 group-hover:opacity-100 group-hover:left-[200%] transition-all duration-1000 pointer-events-none" />

        {/* Circuit node dot */}
        <div
          className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: solution.color, boxShadow: `0 0 8px ${solution.color}` }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/[0.20] via-indigo-500/[0.10] to-transparent backdrop-blur-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-50/40 transition-all duration-500 border border-indigo-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-7 h-7 text-indigo-500 transition-colors drop-shadow-sm" />
          </motion.div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 transition-colors tracking-tight leading-tight">
              {solution.title}
            </h3>
            <p className="text-foreground/75 leading-relaxed text-lg md:text-xl font-medium relative">
              {solution.description}
              <span className="block mt-3 text-[10px] font-mono text-indigo-400/30 tracking-wide">
                {index === 0 && '// clear communication protocol'}
                {index === 1 && '// optimize: business_impact'}
                {index === 2 && '// select(stack, budget, goals)'}
                {index === 3 && '// partner_mode: dedicated'}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CircuitLines({ isInView }: { isInView: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M25,25 L50,25 L50,50 L75,50"
        fill="none"
        stroke="url(#circuitGrad)"
        strokeWidth="0.3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
        transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M25,75 L50,75 L50,50"
        fill="none"
        stroke="url(#circuitGrad)"
        strokeWidth="0.3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
        transition={{ duration: 2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <defs>
        <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

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
            Removing the technical roadblocks to your{' '}
            <span className="text-indigo-500 bg-transparent">growth.</span>
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600/[0.08] via-indigo-500/[0.04] to-transparent border border-indigo-300/40 rounded-full font-semibold text-foreground hover:from-blue-600/[0.15] hover:via-indigo-500/[0.08] transition-all shadow-[0_4px_12px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(255,255,255,1)] group"
            >
              See Our Process
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="relative">
          <CircuitLines isInView={isInView} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
            {solutions.map((solution, i) => (
              <TiltCard key={solution.title} solution={solution} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
