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
    color: '#0891b2',
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
    color: '#0ea5e9',
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
    color: '#14b8a6',
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
    color: '#10b981',
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
    color: '#059669',
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
      ease: [0.22, 1, 0.36, 1] as any,
    },
  }),
};

function PhaseCard({ 
  phase, 
  index, 
  isInView, 
  isActive, 
  onClick 
}: { 
  phase: typeof phases[0]; 
  index: number; 
  isInView: boolean; 
  isActive: boolean; 
  onClick: () => void; 
}) {
  const Icon = phase.icon;

  return (
    <div 
      onClick={onClick}
      className={`flex-1 relative overflow-hidden p-6 md:p-8 lg:p-10 rounded-[2rem] border transition-all duration-500 cursor-pointer group ${
        isActive 
          ? 'bg-white border-slate-900 shadow-md scale-[1.01]' 
          : 'bg-white border-slate-200 shadow-sm hover:border-slate-350 hover:shadow-md'
      }`}
    >
      {/* Active pulse dot on the top right */}
      {isActive && (
        <span className="absolute top-6 right-6 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-cyan-400" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500" />
        </span>
      )}

      <div className="relative z-10">
        {/* Mobile icon */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 mb-4 md:hidden ${
          isActive 
            ? 'border-slate-900 bg-slate-950 text-white shadow-md' 
            : 'border-slate-200 bg-slate-50 text-slate-500'
        }`}>
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span
            className={`text-xs font-mono font-bold uppercase tracking-widest ${isActive ? 'text-cyan-600' : 'text-slate-400'}`}
          >
            Phase {phase.number} {isActive && '• ACTIVE'}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {phase.duration}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          {phase.title}
        </h3>

        <p className="text-slate-650 leading-relaxed mb-6 font-medium text-base">
          {phase.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {phase.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-sm text-slate-500 font-medium"
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-slate-300 group-hover:bg-cyan-500 transition-colors duration-300"
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProcessTimelineProps {
  activePhaseIndex?: number;
  onPhaseSelect?: (idx: number) => void;
}

export default function ProcessTimeline({ activePhaseIndex = 0, onPhaseSelect }: ProcessTimelineProps) {
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
      <div className="absolute left-6 md:left-[27px] top-6 bottom-6 w-0.5 bg-slate-200 hidden md:block" />
      
      {/* Scroll-linked glowing line */}
      <motion.div 
        className="absolute left-6 md:left-[27px] top-6 bottom-6 w-0.5 bg-slate-950 origin-top hidden md:block"
        style={{ height: heightSpring }}
      />

      <div className="flex flex-col gap-8 md:gap-12">
        {phases.map((phase, i) => {
          const Icon = phase.icon;
          const isActive = i === activePhaseIndex;
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
              <div 
                className="flex-shrink-0 relative z-10 hidden md:flex flex-col items-center cursor-pointer"
                onClick={() => onPhaseSelect?.(i)}
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                    isActive 
                      ? 'border-slate-900 bg-slate-950 text-white shadow-md scale-110' 
                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              {/* Phase Card */}
              <PhaseCard 
                phase={phase} 
                index={i} 
                isInView={isInView} 
                isActive={isActive}
                onClick={() => onPhaseSelect?.(i)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
