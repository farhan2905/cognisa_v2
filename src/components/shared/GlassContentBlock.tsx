'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
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
        "relative overflow-hidden rounded-lg bg-white/86 p-6 md:p-8 lg:p-10",
        "border border-slate-200 shadow-sm backdrop-blur-xl",
        hoverEffect && "transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)]",
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
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(8, 145, 178, 0.12), transparent 80%)`,
          }}
        />
      )}

      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 opacity-80 pointer-events-none z-0" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
