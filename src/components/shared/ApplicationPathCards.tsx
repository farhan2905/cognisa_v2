'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Blocks,
  Building2,
  ChartNoAxesCombined,
  CloudCog,
  Code2,
  DatabaseZap,
  GitBranch,
  PlugZap,
  Sparkles,
  Wrench,
} from 'lucide-react';

const applicationPaths = [
  {
    title: 'Custom Web Applications',
    eyebrow: 'Product engineering',
    description:
      'We build high-performance websites, dashboards, portals, and web apps around the way your business actually works.',
    href: '/services',
    icon: Code2,
    accent: 'bg-cyan-500',
    items: [
      { label: 'SaaS MVPs', icon: Blocks },
      { label: 'Client portals', icon: Building2 },
      { label: 'Dashboards', icon: ChartNoAxesCombined },
      { label: 'Admin tools', icon: Wrench },
    ],
  },
  {
    title: 'AI Workflow Automation',
    eyebrow: 'Manual work removal',
    description:
      'We replace repetitive tasks with practical AI agents, data flows, and integrations that your team can trust.',
    href: '/process',
    icon: Bot,
    accent: 'bg-indigo-500',
    items: [
      { label: 'AI agents', icon: Sparkles },
      { label: 'Lead routing', icon: GitBranch },
      { label: 'Data sync', icon: DatabaseZap },
      { label: 'Approvals', icon: PlugZap },
    ],
  },
  {
    title: 'Managed Delivery Partner',
    eyebrow: 'Founder-led build support',
    description:
      'From planning to deployment and iteration, Cognisa gives you senior execution without a bloated agency layer.',
    href: '/contact',
    icon: CloudCog,
    accent: 'bg-emerald-500',
    items: [
      { label: 'Discovery', icon: Building2 },
      { label: 'Architecture', icon: GitBranch },
      { label: 'Launch', icon: CloudCog },
      { label: 'Iteration', icon: ChartNoAxesCombined },
    ],
  },
];

interface ApplicationPathCardsProps {
  className?: string;
}

function ApplicationPathCard({
  path,
  index,
}: {
  path: (typeof applicationPaths)[number];
  index: number;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = path.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
    >
      <Link
        href={path.href}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setCoords({ x: event.clientX - rect.left, y: event.clientY - rect.top });
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white/86 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_52px_rgba(15,23,42,0.11)]"
      >
        {isHovered && (
          <span
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: `radial-gradient(420px circle at ${coords.x}px ${coords.y}px, rgba(8,145,178,0.12), transparent 72%)`,
            }}
          />
        )}
        <span className={`absolute inset-x-0 top-0 h-1.5 ${path.accent}`} />

        <span className="relative z-10 mb-8 flex items-start justify-between gap-4">
          <span>
            <span className="block text-xs font-black uppercase text-slate-500">
              {path.eyebrow}
            </span>
            <span className="mt-2 block text-2xl font-black leading-tight text-slate-950">
              {path.title}
            </span>
          </span>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 transition group-hover:bg-slate-950">
            <Icon className="h-6 w-6 text-slate-800 transition group-hover:text-white" />
          </span>
        </span>

        <p className="relative z-10 text-sm font-semibold leading-7 text-slate-600">
          {path.description}
        </p>

        <div className="relative z-10 mt-8 grid grid-cols-2 gap-2">
          {path.items.map((item) => {
            const ItemIcon = item.icon;
            return (
              <span
                key={item.label}
                className="flex min-h-14 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 text-xs font-black text-slate-700"
              >
                <ItemIcon className="h-4 w-4 shrink-0 text-slate-500" />
                {item.label}
              </span>
            );
          })}
        </div>

        <span className="relative z-10 mt-auto inline-flex items-center gap-2 pt-8 text-sm font-black text-slate-950">
          Explore path
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}

export default function ApplicationPathCards({ className }: ApplicationPathCardsProps) {
  return (
    <div className={className}>
      <div className="grid gap-4 lg:grid-cols-3">
        {applicationPaths.map((path, index) => (
          <ApplicationPathCard key={path.title} path={path} index={index} />
        ))}
      </div>
    </div>
  );
}
