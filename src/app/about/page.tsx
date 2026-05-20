'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  Target,
  Zap,
  BarChart3,
  Lightbulb,
  Users,
  Globe,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import SubPageShell from '@/components/shared/SubPageShell';
import PageHero from '@/components/shared/PageHero';
import PageCTA from '@/components/shared/PageCTA';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import SectionTag from '@/components/shared/SectionTag';
import MiniNeuralConstellation from '@/components/shared/fragments/MiniNeuralConstellation';
import LiveMetric from '@/components/shared/LiveMetric';

/* ── Values Data ── */
const values = [
  {
    icon: Target,
    title: 'Architecture First',
    description:
      'Every system is designed with robust architecture for maximum scalability and performance.',
  },
  {
    icon: Zap,
    title: 'Rapid Execution',
    description:
      'Agile development cycles that deliver fully functional software without compromising quality.',
  },
  {
    icon: BarChart3,
    title: 'Automated Workflows',
    description:
      'Replace manual tasks with intelligent AI agents and seamless data integrations.',
  },
  {
    icon: Lightbulb,
    title: 'Code Quality',
    description:
      'Clean, maintainable, and modern codebases that future-proof your digital product.',
  },
];

/* ── Stats Data ── */
const stats = [
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 5, suffix: '+', label: 'Years Experience' },
];

/* ── Animated Counter ── */
function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, { duration: 2, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => { setDisplayValue(latest); });
    return unsubscribe;
  }, [rounded]);

  return (
    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tabular-nums">
      {displayValue}
      <span className="text-indigo-500">{suffix}</span>
    </span>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function AboutPage() {
  const valuesRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <SubPageShell showFooter={false}>
      {/* Hero */}
      <div className="relative">
        <MiniNeuralConstellation className="z-10 opacity-40" />
        <PageHero
          tagText="ABOUT US"
          title="We don't just write code. We build"
          titleAccent="systems that scale."
          description="Managed solely by the founder of Cognisa, we specialize in delivering high-performance custom web applications and AI-driven automation. We partner closely with businesses to transform manual bottlenecks into scalable, automated tech solutions."
          orbColor="#6366f1"
          orbColor2="#a78bfa"
          align="left"
        />
      </div>

      {/* ── Brand Story ── */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <GlassContentBlock>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
                The <span className="text-indigo-500">Anti-Agency</span> Expert
              </h2>
              <div className="space-y-5 text-foreground/75 leading-relaxed font-medium text-base">
                <p>
                  Cognisa was born from a simple frustration: why do digital agencies overcomplicate
                  everything? We saw businesses drowning in jargon, paying for bloated teams, and
                  receiving cookie-cutter solutions that didn&apos;t fit.
                </p>
                <p>
                  We took a different path. Instead of scaling a massive team, we focused on deep
                  expertise. Every project is personally architected and overseen by the founder,
                  ensuring a level of quality and attention that large agencies simply cannot match.
                </p>
                <p>
                  The result? Faster delivery, cleaner code, and solutions that are built to scale —
                  not just to look good in a pitch deck.
                </p>
              </div>
            </GlassContentBlock>

            <GlassContentBlock>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
                Our <span className="text-indigo-500">Mission</span>
              </h2>
              <div className="space-y-5 text-foreground/75 leading-relaxed font-medium text-base">
                <p>
                  To democratize enterprise-grade technology for growing businesses. We believe every
                  company — from a 5-person startup to a 500-person enterprise — deserves software
                  that is engineered to the same standard as the best products in the world.
                </p>
                <p>
                  We achieve this through a combination of modern frameworks (Next.js, React),
                  advanced AI tooling (LangChain, custom LLMs), and a relentless focus on
                  performance, security, and user experience.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Next.js', 'React', 'TypeScript', 'AI/LLMs', 'Node.js', 'PostgreSQL'].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm font-medium bg-foreground/5 border border-foreground/10 rounded-xl text-foreground/70"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </GlassContentBlock>
          </div>
        </div>
      </section>

      {/* ── Values Grid ── */}
      <section className="relative py-12 md:py-20 overflow-hidden" ref={valuesRef}>
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none animate-orb-2" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-violet-200/30 rounded-full blur-[120px] pointer-events-none animate-orb-3" />

        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <SectionTag text="OUR VALUES" variant="light" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-4xl font-bold text-foreground leading-tight tracking-tight mt-6 mb-12"
          >
            The principles that guide{' '}
            <span className="bg-indigo-500/10 border border-indigo-300/40 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-2 py-0.5 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">every project.</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate={valuesInView ? 'visible' : 'hidden'}
                  className="relative overflow-hidden bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent backdrop-blur-2xl p-6 md:p-7 lg:p-9 min-h-[220px] md:min-h-[260px] flex flex-col justify-between rounded-[2rem] border border-indigo-300/40 ring-1 ring-indigo-400/15 shadow-[0_10px_30px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-700 group hover:-translate-y-2 hover:from-blue-600/[0.12] hover:via-indigo-500/[0.05] hover:border-indigo-300/60 hover:ring-indigo-400/30 hover:shadow-[0_16px_40px_rgba(59,130,246,0.20),inset_0_1px_0_rgba(255,255,255,1)]"
                >
                  <div className="absolute top-0 left-[-100%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/25 to-transparent rotate-[30deg] opacity-0 group-hover:opacity-100 group-hover:left-[200%] transition-all duration-1000 pointer-events-none" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-50 transition-all duration-500 border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                      <Icon className="w-6 h-6 text-indigo-500 drop-shadow-sm" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 tracking-tight leading-tight">
                        {val.title}
                      </h3>
                      <p className="text-foreground/75 text-base leading-relaxed font-medium">
                        {val.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Founder Section ── */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <GlassContentBlock className="p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Avatar */}
              <div className="flex justify-center lg:justify-start">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent border border-indigo-300/40 flex items-center justify-center shadow-[0_10px_30px_rgba(99,102,241,0.15)]">
                  <span className="text-5xl md:text-7xl font-bold text-gradient">C</span>
                </div>
              </div>

              {/* Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-indigo-500" />
                  <span className="text-xs font-mono uppercase tracking-widest text-foreground/50 font-bold">
                    Founder & Lead Engineer
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight">
                  Building systems, not just software.
                </h3>
                <div className="space-y-4 text-foreground/70 leading-relaxed font-medium text-base">
                  <p>
                    With over 5 years of hands-on experience in full-stack engineering and AI
                    integration, the founder of Cognisa has personally architected and delivered
                    200+ production systems for clients across travel, e-commerce, SaaS, and
                    enterprise sectors.
                  </p>
                  <p>
                    Every Cognisa project receives direct, senior-level attention — from the initial
                    architecture blueprint to the final deployment. No handoffs to junior developers,
                    no communication gaps, no surprises.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600/[0.08] via-indigo-500/[0.04] to-transparent border border-indigo-300/40 rounded-full font-semibold text-foreground hover:from-blue-600/[0.15] hover:via-indigo-500/[0.08] transition-all shadow-[0_4px_12px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(255,255,255,1)]"
                  >
                    Work With Us
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/15 rounded-full font-medium text-foreground/70 hover:text-foreground hover:border-foreground/25 transition-all"
                  >
                    View Our Work
                  </Link>
                </div>
              </div>
            </div>
          </GlassContentBlock>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative py-12 md:py-20 overflow-hidden" ref={statsRef}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200 rounded-full blur-[200px] opacity-[0.06]" />
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          {/* Live metrics bar */}
          <div className="glass-surface rounded-[2rem] p-4 mb-8 flex flex-wrap items-center justify-center gap-6 border border-indigo-300/40 ring-1 ring-indigo-400/15">
            <LiveMetric label="Active Projects" baseValue={12} variance={2} />
            <LiveMetric label="Deploys Today" baseValue={8} variance={3} />
            <LiveMetric label="AI Agents Online" baseValue={5} variance={1} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
                <p className="text-foreground/55 text-sm mt-3 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="Ready to build"
        titleAccent="together?"
        description="Let's discuss how Cognisa can help transform your business with custom software and AI-driven solutions."
      />
    </SubPageShell>
  );
}
