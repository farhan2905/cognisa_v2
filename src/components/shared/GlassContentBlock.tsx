'use client';

import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlassContentBlockProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassContentBlock({ children, className, hoverEffect = false }: GlassContentBlockProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffect) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] backdrop-blur-2xl p-6 md:p-8 lg:p-10",
        "bg-gradient-to-br from-blue-600/[0.04] via-indigo-500/[0.015] to-transparent",
        "border border-indigo-300/30 ring-1 ring-indigo-400/10",
        "shadow-[0_10px_30px_rgba(99,102,241,0.05),inset_0_1px_0_rgba(255,255,255,0.8)]",
        hoverEffect && "transition-all duration-500 hover:border-indigo-300/50 hover:shadow-[0_15px_40px_rgba(99,102,241,0.08)]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => hoverEffect && setIsHovered(true)}
      onMouseLeave={() => hoverEffect && setIsHovered(false)}
    >
      {/* Spotlight overlay */}
      {hoverEffect && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.09), transparent 80%)`,
          }}
        />
      )}

      {/* Glossy specular highlight layer for extra fidelity */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent rounded-[2rem] pointer-events-none z-0" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
