'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnterpriseButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export default function EnterpriseButton({
  href,
  children,
  variant = 'primary',
  className,
}: EnterpriseButtonProps) {
  const variants = {
    primary:
      'bg-slate-950 text-white border-slate-950 shadow-[0_16px_38px_rgba(15,23,42,0.18)] hover:bg-cyan-700 hover:border-cyan-700',
    secondary:
      'bg-white/86 text-slate-900 border-slate-200 shadow-sm hover:border-cyan-200 hover:text-cyan-700 hover:bg-white',
    ghost:
      'bg-transparent text-slate-700 border-transparent hover:bg-white/70 hover:border-slate-200',
  };

  return (
    <Link
      href={href}
      className={cn(
        'group/enterprise-button relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border px-6 py-3 text-sm font-black transition-all duration-300 hover:-translate-y-0.5',
        variants[variant],
        className
      )}
    >
      <span className="pointer-events-none absolute inset-y-0 left-0 w-10 -translate-x-14 rotate-12 bg-white/25 blur-md transition-transform duration-700 group-hover/enterprise-button:translate-x-56" />
      <span>{children}</span>
      <span className="relative inline-flex h-4 w-4 overflow-hidden">
        <ArrowRight className="absolute inset-0 h-4 w-4 transition-transform duration-300 group-hover/enterprise-button:translate-x-5 group-hover/enterprise-button:opacity-0" />
        <ArrowRight className="absolute inset-0 h-4 w-4 -translate-x-5 opacity-0 transition-transform duration-300 group-hover/enterprise-button:translate-x-0 group-hover/enterprise-button:opacity-100" />
      </span>
    </Link>
  );
}
