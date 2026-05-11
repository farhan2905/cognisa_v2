'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const stats = [
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 5, suffix: '+', label: 'Years Experience' },
];

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
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stats" ref={ref} className="section-anchor relative bg-transparent py-16 md:py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200 rounded-full blur-[200px] opacity-[0.06]" />
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl border backdrop-blur-[100px] bg-gradient-to-r from-white/8 via-white/4 to-white/2 border-white/20 hover:border-white/35 shadow-[inset_0_2px_2px_rgba(255,255,255,0.3),0_8px_24px_rgba(31,38,135,0.1)] mb-6 group">
            <span className="w-4 h-4 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-md group-hover:scale-110 transition-transform" />
            <span className="text-sm md:text-base font-mono uppercase tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
              The Numbers
            </span>
            <span className="h-1 w-12 md:w-16 rounded-full bg-gradient-to-r from-indigo-400/60 to-transparent" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Results that <span className="bg-indigo-500 text-white px-2 rounded-lg">speak</span> for themselves
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} custom={i} variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
              <p className="text-foreground/55 text-sm mt-3 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
