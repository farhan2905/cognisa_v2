'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useInView, animate } from 'framer-motion';
import GlassContentBlock from './GlassContentBlock';

interface OutcomeCardProps {
  metric: string;
  label: string;
  color: string;
}

export default function OutcomeCard({ metric, label, color }: OutcomeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  // Extract number and suffix
  const numMatch = metric.match(/^([<>\s]*)([\d.]+)(.*)$/);
  const prefix = numMatch ? numMatch[1] : '';
  const numVal = numMatch ? parseFloat(numMatch[2]) : null;
  const suffix = numMatch ? numMatch[3] : metric;

  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    // If it has decimals, preserve them
    if (numVal && numVal % 1 !== 0) {
      return parseFloat(latest.toFixed(1));
    }
    return Math.round(latest);
  });

  useEffect(() => {
    if (inView && numVal !== null) {
      const controls = animate(motionValue, numVal, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, numVal, motionValue]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <div ref={cardRef} className="flex-1 w-full">
      <GlassContentBlock className="h-full flex flex-col justify-center items-center text-center p-6 md:p-8 border-indigo-150 relative overflow-hidden" hoverEffect>
        {/* Decorative circular graph background */}
        <div className="w-24 h-24 relative mb-4 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="rgba(99, 102, 241, 0.05)"
              strokeWidth="5"
            />
            {/* Animated foreground dial */}
            {numVal !== null && (
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="transparent"
                stroke={color}
                strokeWidth="5"
                strokeDasharray="263.8"
                initial={{ strokeDashoffset: 263.8 }}
                animate={inView ? { strokeDashoffset: 263.8 - (263.8 * Math.min(numVal, 100)) / 100 } : {}}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                strokeLinecap="round"
              />
            )}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-mono">
            <span className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter tabular-nums">
              {numVal !== null ? `${prefix}${displayValue}${suffix}` : metric}
            </span>
          </div>
        </div>

        <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 max-w-[150px] leading-tight">
          {label}
        </div>
      </GlassContentBlock>
    </div>
  );
}
