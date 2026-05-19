'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LiveMetricProps {
  label: string;
  baseValue: number;
  variance?: number;
  suffix?: string;
  interval?: number;
  className?: string;
}

export default function LiveMetric({
  label,
  baseValue,
  variance = 2,
  suffix = '',
  interval = 3000,
  className = '',
}: LiveMetricProps) {
  const [value, setValue] = useState(baseValue);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const change = Math.floor(Math.random() * (variance * 2 + 1)) - variance;
      const newValue = Math.max(1, baseValue + change);
      if (newValue !== value) {
        setIsChanging(true);
        setValue(newValue);
        setTimeout(() => setIsChanging(false), 400);
      }
    }, interval + Math.random() * 2000);

    return () => clearInterval(timer);
  }, [baseValue, variance, interval, value]);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-60" />
      </div>
      <span className="text-[10px] sm:text-[11px] font-mono text-foreground/40 uppercase tracking-wider">
        {label}
      </span>
      <motion.span
        className="text-[11px] sm:text-xs font-mono font-bold text-foreground/70 tabular-nums"
        animate={isChanging ? { opacity: [1, 0.5, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {value}{suffix}
      </motion.span>
    </div>
  );
}
