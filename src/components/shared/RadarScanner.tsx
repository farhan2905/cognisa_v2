'use client';

import { motion } from 'framer-motion';

interface Blip {
  angle: number;
  distance: number;
  delay: number;
  duration: number;
}

const blips: Blip[] = [
  { angle: 45, distance: 35, delay: 0.5, duration: 2.5 },
  { angle: 120, distance: 55, delay: 1.2, duration: 2.8 },
  { angle: 200, distance: 42, delay: 0.8, duration: 2.2 },
];

export default function RadarScanner({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-indigo-300/20" />
      <div className="absolute inset-[15%] rounded-full border border-indigo-300/15" />
      <div className="absolute inset-[30%] rounded-full border border-indigo-300/10" />
      <div className="absolute inset-[45%] rounded-full border border-indigo-300/10" />

      {/* Crosshairs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-indigo-300/10" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-px bg-indigo-300/10" />
      </div>

      {/* Rotating sweep */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(99,102,241,0.15) 360deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-400/60" />

      {/* Blips */}
      {blips.map((blip, i) => {
        const rad = (blip.angle * Math.PI) / 180;
        const x = 50 + blip.distance * Math.cos(rad);
        const y = 50 + blip.distance * Math.sin(rad);
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-emerald-400/80"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1.2, 0],
            }}
            transition={{
              duration: blip.duration,
              delay: blip.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
          </motion.div>
        );
      })}

      {/* Glass overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/[0.03] to-transparent backdrop-blur-[2px]" />
    </div>
  );
}
