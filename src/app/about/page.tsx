'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  CheckCircle2,
  Users,
} from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import PageCTA from '@/components/shared/PageCTA';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import SectionTag from '@/components/shared/SectionTag';
import MiniNeuralConstellation from '@/components/shared/fragments/MiniNeuralConstellation';
import ApplicationPathCards from '@/components/shared/ApplicationPathCards';
import EnterpriseButton from '@/components/shared/EnterpriseButton';

/* ── Stats Data ── */
const stats = [
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 4, suffix: '', label: 'Core Delivery Tracks' },
];

const deliveryStandards = [
  'Discovery before build',
  'Founder-led architecture',
  'Production-ready deployment',
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
      <span className="text-cyan-600">{suffix}</span>
    </span>
  );
}

export default function AboutPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <>
      {/* Hero */}
      <div className="relative">
        <MiniNeuralConstellation className="z-10 opacity-40" />
        <PageHero
          tagText="ABOUT US"
          title="We don't just write code. We build"
          titleAccent="systems that scale."
          description="Managed solely by the founder of Cognisa, we specialize in delivering high-performance custom web applications and AI-driven automation. We partner closely with businesses to transform manual bottlenecks into scalable, automated tech solutions."
          orbColor="#0891b2"
          orbColor2="#10b981"
          align="left"
        />
      </div>

      {/* ── Brand Story ── */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <GlassContentBlock>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
                The <span className="text-cyan-650">Anti-Agency</span> Expert
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
                Our <span className="text-cyan-650">Mission</span>
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

      {/* ── Delivery Paths ── */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-slate-50/70" />
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <SectionTag text="HOW WE HELP" variant="light" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-4xl font-black text-slate-950 leading-tight mt-6 mb-5"
          >
            Choose the right delivery path for the system your business needs.
          </motion.h2>
          <p className="mb-10 max-w-3xl text-base font-semibold leading-8 text-slate-600">
            Cognisa focuses on custom web applications, practical AI automation, and managed delivery support. The structure is repeatable, but every system is shaped around your workflow.
          </p>
          <ApplicationPathCards />
        </div>
      </section>

      {/* ── Founder Section ── */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <GlassContentBlock className="p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Avatar */}
              <div className="flex justify-center lg:justify-start">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/20 via-emerald-500/10 to-transparent border border-cyan-350 flex items-center justify-center shadow-[0_10px_30px_rgba(8,145,178,0.12)]">
                  <span className="text-5xl md:text-7xl font-bold text-gradient">C</span>
                </div>
              </div>

              {/* Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-cyan-650" />
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
                  <EnterpriseButton href="/contact">
                    Work with us
                  </EnterpriseButton>
                  <EnterpriseButton href="/work" variant="secondary">
                    View our work
                  </EnterpriseButton>
                </div>
              </div>
            </div>
          </GlassContentBlock>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative py-12 md:py-20 overflow-hidden" ref={statsRef}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-100 rounded-full blur-[200px] opacity-[0.06]" />
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="mb-8 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
            {deliveryStandards.map((standard) => (
              <div key={standard} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm font-bold text-slate-700">{standard}</span>
              </div>
            ))}
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
    </>
  );
}
