import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassContentBlockProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function GlassContentBlock({ children, className, hoverEffect = false }: GlassContentBlockProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-[2rem] backdrop-blur-2xl p-6 md:p-8 lg:p-10",
      "bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent",
      "border border-indigo-300/40 ring-1 ring-indigo-400/15",
      "shadow-[0_10px_30px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(255,255,255,1)]",
      hoverEffect && "transition-all duration-500 hover:from-blue-600/[0.12] hover:via-indigo-500/[0.05] hover:border-indigo-300/60 hover:ring-indigo-400/30",
      className
    )}>
      {/* Glossy specular highlight layer for extra fidelity */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent rounded-[2rem] pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
