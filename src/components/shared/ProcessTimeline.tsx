'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Search,
  Layers,
  Code2,
  ShieldCheck,
  Rocket,
} from 'lucide-react';

const phases = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery & Strategy',
    description:
      'We start by deeply understanding your business, your users, and your goals. Through structured interviews and research, we map out the technical strategy that aligns with your vision.',
    deliverables: [
      'Stakeholder interviews',
      'Technical requirements document',
      'Competitive analysis',
      'Project roadmap & timeline',
    ],
    color: '#6366f1',
    duration: '1–2 weeks',
  },
  {
    icon: Layers,
    number: '02',
    title: 'Architecture & Design',
    description:
      'We design the system architecture and user interfaces simultaneously. Every wireframe, every database schema is crafted for performance and scalability from day one.',
    deliverables: [
      'System architecture diagram',
      'UI/UX wireframes & prototypes',
      'Database schema design',
      'API contract definitions',
    ],
    color: '#8b5cf6',
    duration: '2–3 weeks',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Engineering & Development',
    description:
      'Our engineers build your product using modern frameworks and clean code practices. Agile sprints with weekly demos ensure you see real progress every single week.',
    deliverables: [
      'Frontend implementation',
      'Backend API development',
      'Third-party integrations',
      'Weekly sprint demos',
    ],
    color: '#3b82f6',
    duration: '4–8 weeks',
  },
  {
    icon: ShieldCheck,
    number: '04',
    title: 'Testing & QA',
    description:
      'Every feature goes through rigorous testing — unit tests, integration tests, performance audits, and cross-browser validation to ensure production-grade quality.',
    deliverables: [
      'Automated test suites',
      'Performance benchmarks',
      'Security audit',
      'Cross-browser/device testing',
    ],
    color: '#06b6d4',
    duration: '1–2 weeks',
  },
  {
    icon: Rocket,
    number: '05',
    title: 'Launch & Ongoing Support',
    description:
      'We handle the deployment, monitor performance, and provide ongoing support. Your product doesn\'t just launch — it thrives with continuous optimization.',
    deliverables: [
      'Production deployment',
      'CI/CD pipeline setup',
      'Performance monitoring',
      '24/7 support & maintenance',
    ],
    color: '#10b981',
    duration: 'Ongoing',
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function PhaseCard({ phase, index, isInView }: { phase: typeof phases[0]; index: number; isInView: boolean }) {
  const Icon = phase.icon;
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-1 relative overflow-hidden bg-gradient-to-br from-blue-600/[0.04] via-indigo-500/[0.015] to-transparent backdrop-blur-2xl p-6 md:p-8 lg:p-10 rounded-[2rem] border border-indigo-300/30 ring-1 ring-indigo-400/10 shadow-[0_10px_30px_rgba(99,102,241,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-700 group hover:border-indigo-300/50 hover:shadow-[0_16px_40px_rgba(99,102,241,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]"
    >
      {/* Spotlight overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Light sweep */}
      <div className="absolute top-0 left-[-100%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-[30deg] opacity-0 group-hover:opacity-100 group-hover:left-[200%] transition-all duration-1000 pointer-events-none z-0" />

      {/* Ambient orb */}
      <div
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[50px] opacity-15 pointer-events-none z-0"
        style={{ backgroundColor: phase.color }}
      />

      <div className="relative z-10">
        {/* Mobile icon */}
        <div className="md:hidden w-12 h-12 rounded-2xl flex items-center justify-center border border-indigo-300/40 bg-gradient-to-br from-blue-600/[0.08] via-indigo-500/[0.04] to-transparent backdrop-blur-xl mb-4">
          <Icon className="w-6 h-6" style={{ color: phase.color }} />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span
            className="text-xs font-mono font-bold uppercase tracking-widest"
            style={{ color: phase.color }}
          >
            Phase {phase.number}
          </span>
          <span className="text-xs text-foreground/45 font-mono">
            {phase.duration}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 tracking-tight">
          {phase.title}
        </h3>

        <p className="text-foreground/70 leading-relaxed mb-6 font-medium text-base">
          {phase.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {phase.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-sm text-foreground/60 font-medium"
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: phase.color }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 60%']
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const heightSpring = useSpring(heightTransform, { stiffness: 120, damping: 25, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative">
      {/* Background tracking line */}
      <div className="absolute left-6 md:left-[27px] top-6 bottom-6 w-0.5 bg-indigo-100/50 hidden md:block" />
      
      {/* Scroll-linked glowing line */}
      <motion.div 
        className="absolute left-6 md:left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-400 origin-top hidden md:block"
        style={{ height: heightSpring }}
      />

      <div className="flex flex-col gap-8 md:gap-12">
        {phases.map((phase, i) => {
          const Icon = phase.icon;
          return (
            <motion.div
              key={phase.number}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="relative flex gap-6 md:gap-10"
            >
              {/* Timeline node */}
              <div className="flex-shrink-0 relative z-10 hidden md:flex flex-col items-center">
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border border-indigo-300/40 bg-gradient-to-br from-blue-600/[0.08] via-indigo-500/[0.04] to-transparent backdrop-blur-xl transition-colors duration-500"
                  style={{
                    boxShadow: `0 4px 16px ${phase.color}25, inset 0 1px 0 rgba(255,255,255,1)`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: phase.color }} />
                </div>
              </div>

              {/* Phase Card with Spotlight hover effect */}
              <PhaseCard phase={phase} index={i} isInView={isInView} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
