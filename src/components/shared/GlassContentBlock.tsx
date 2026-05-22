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
        "relative overflow-hidden rounded-[1.2rem] border border-slate-200 bg-white p-6 md:p-8 lg:p-10 shadow-sm",
        hoverEffect && "transition-all duration-500 hover:-translate-y-1 hover:border-slate-350 hover:shadow-md",
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
            background: `radial-gradient(380px circle at ${coords.x}px ${coords.y}px, rgba(6, 182, 212, 0.06), transparent 80%)`,
          }}
        />
      )}


      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
