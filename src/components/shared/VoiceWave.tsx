'use client';

import { motion } from 'framer-motion';

interface VoiceWaveProps {
  color?: string;
  className?: string;
}

export default function VoiceWave({ color = '#6366f1', className = '' }: VoiceWaveProps) {
  const paths = [
    'M0,20 Q25,5 50,20 T100,20',
    'M0,20 Q25,35 50,20 T100,20',
    'M0,20 Q25,10 50,20 T100,20',
  ];

  return (
    <svg
      viewBox="0 0 100 40"
      className={`w-full h-12 ${className}`}
      preserveAspectRatio="none"
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 + i * 0.15 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: i * 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </svg>
  );
}
