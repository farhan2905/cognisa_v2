'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, BrainCircuit, Server, Code2, Cpu, Layers, MessageSquare, Zap, Shield, BarChart3 } from 'lucide-react';

/* ═══════════════════════════════════════════════
   HERO SHOWCASE CARDS
   Kore.ai-inspired animated cards with cycling
   internal content for the hero section.
   ═══════════════════════════════════════════════ */

/* ─── Card 1: Custom Web Apps ─── */

const webAppScreens = [
  {
    label: 'E-Commerce Platform',
    gradient: 'from-blue-600/20 via-indigo-500/10 to-transparent',
    accent: '#6366f1',
    metrics: [
      { label: 'Page Speed', value: '98', unit: 'ms' },
      { label: 'Conversion', value: '4.2', unit: '%' },
    ],
    techStack: ['Next.js', 'Prisma', 'Stripe'],
  },
  {
    label: 'SaaS Dashboard',
    gradient: 'from-violet-600/20 via-purple-500/10 to-transparent',
    accent: '#8b5cf6',
    metrics: [
      { label: 'Uptime', value: '99.9', unit: '%' },
      { label: 'API Calls', value: '2.4M', unit: '/mo' },
    ],
    techStack: ['React', 'Node.js', 'Redis'],
  },
  {
    label: 'Travel Portal',
    gradient: 'from-sky-600/20 via-blue-500/10 to-transparent',
    accent: '#38bdf8',
    metrics: [
      { label: 'Load Time', value: '0.8', unit: 's' },
      { label: 'Bookings', value: '340', unit: '/day' },
    ],
    techStack: ['Next.js', 'PostgreSQL', 'AWS'],
  },
];

function WebAppCard() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveIdx((p) => (p + 1) % webAppScreens.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const screen = webAppScreens[activeIdx];

  return (
    <div className="flex flex-col h-full">
      {/* Mini browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-indigo-300/20">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400/70" />
          <div className="w-2 h-2 rounded-full bg-amber-400/70" />
          <div className="w-2 h-2 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-foreground/5 rounded-md px-2 py-0.5 text-[8px] font-mono text-foreground/35 text-center truncate">
            cognisa.io/projects/{screen.label.toLowerCase().replace(/\s+/g, '-')}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 p-3 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-3"
          >
            {/* Screen gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${screen.gradient} rounded-lg`} />
            
            {/* Fake UI skeleton */}
            <div className="relative z-10 h-full flex flex-col gap-2">
              {/* Nav bar mockup */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-1.5 rounded-full bg-foreground/15" />
                <div className="flex gap-2">
                  <div className="w-6 h-1.5 rounded-full bg-foreground/10" />
                  <div className="w-6 h-1.5 rounded-full bg-foreground/10" />
                  <div className="w-8 h-1.5 rounded-full" style={{ backgroundColor: `${screen.accent}40` }} />
                </div>
              </div>

              {/* Hero block mockup */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '5rem' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-2 rounded-full mx-auto"
                    style={{ backgroundColor: `${screen.accent}50` }}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '3.5rem' }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="h-1.5 rounded-full bg-foreground/10 mx-auto"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="w-10 h-3 rounded-full mx-auto text-[6px] font-bold text-white flex items-center justify-center"
                    style={{ backgroundColor: screen.accent }}
                  >
                    GO →
                  </motion.div>
                </div>
              </div>

              {/* Metrics row */}
              <div className="flex gap-2">
                {screen.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="flex-1 bg-white/30 backdrop-blur-sm rounded-md p-1.5 border border-white/20"
                  >
                    <div className="text-[7px] text-foreground/40 font-medium">{m.label}</div>
                    <div className="text-[10px] font-bold text-foreground/80">
                      {m.value}<span className="text-foreground/40 text-[7px] ml-0.5">{m.unit}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tech stack footer */}
      <div className="px-3 pb-2.5 pt-1 flex items-center gap-1 border-t border-indigo-300/10">
        {screen.techStack.map((tech) => (
          <span key={tech} className="text-[7px] font-mono px-1.5 py-0.5 bg-indigo-500/8 border border-indigo-300/20 text-indigo-600/70 rounded font-bold">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Card 2: AI & Automation ─── */

const agentConversations = [
  {
    label: 'Customer Support Agent',
    messages: [
      { role: 'user', text: 'Track order #4829' },
      { role: 'ai', text: 'Order shipped via DHL — arriving tomorrow by 3 PM. Here\'s your tracking link.' },
    ],
    status: 'Resolved in 1.2s',
  },
  {
    label: 'Data Processing Pipeline',
    messages: [
      { role: 'user', text: 'Process Q4 invoices' },
      { role: 'ai', text: '247 invoices parsed. 12 flagged for review. Report exported to dashboard.' },
    ],
    status: 'Processed 247 docs',
  },
  {
    label: 'Lead Qualification Bot',
    messages: [
      { role: 'user', text: 'Score new signup batch' },
      { role: 'ai', text: '34 leads scored. 8 high-intent leads routed to sales. CRM updated.' },
    ],
    status: '8 hot leads found',
  },
];

function AIAgentCard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    const convo = agentConversations[activeIdx];
    const aiText = convo.messages[1].text;
    setTypedText('');
    setShowResponse(false);

    // Show response after a brief delay
    const responseTimer = setTimeout(() => {
      setShowResponse(true);
      let charIdx = 0;
      const typeTimer = setInterval(() => {
        if (charIdx < aiText.length) {
          setTypedText(aiText.substring(0, charIdx + 1));
          charIdx++;
        } else {
          clearInterval(typeTimer);
        }
      }, 18);
      return () => clearInterval(typeTimer);
    }, 800);

    const cycleTimer = setTimeout(() => {
      setActiveIdx((p) => (p + 1) % agentConversations.length);
    }, 4500);

    return () => {
      clearTimeout(responseTimer);
      clearTimeout(cycleTimer);
    };
  }, [activeIdx]);

  const convo = agentConversations[activeIdx];

  return (
    <div className="flex flex-col h-full">
      {/* Agent header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-indigo-300/20">
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Cpu className="w-2.5 h-2.5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIdx}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="text-[9px] font-bold text-foreground/70 truncate"
          >
            {convo.label}
          </motion.span>
        </AnimatePresence>
        <span className="ml-auto text-[7px] font-mono text-emerald-500/70">● Active</span>
      </div>

      {/* Chat area */}
      <div className="flex-1 p-2.5 flex flex-col gap-2 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 flex-1"
          >
            {/* User message */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="self-end"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[9px] px-2.5 py-1.5 rounded-xl rounded-br-sm max-w-[85%] font-medium">
                {convo.messages[0].text}
              </div>
            </motion.div>

            {/* AI response */}
            {showResponse && (
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="self-start"
              >
                <div className="bg-white/50 backdrop-blur-sm border border-indigo-200/30 text-foreground/70 text-[9px] px-2.5 py-1.5 rounded-xl rounded-bl-sm max-w-[90%] font-medium leading-relaxed">
                  {typedText}
                  <span className="inline-block w-0.5 h-2.5 bg-indigo-400 ml-0.5 animate-pulse" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Status footer */}
      <div className="px-3 pb-2.5 pt-1 flex items-center justify-between border-t border-indigo-300/10">
        <span className="text-[7px] font-mono text-foreground/35">
          <Zap className="w-2.5 h-2.5 inline mr-0.5 text-amber-500" />
          {convo.status}
        </span>
        <div className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                i === activeIdx ? 'bg-indigo-500 scale-125' : 'bg-foreground/15'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Card 3: System Architecture ─── */

const architectures = [
  {
    label: 'Microservice Cluster',
    nodes: [
      { name: 'API Gateway', x: 50, y: 15, size: 'lg', color: '#6366f1' },
      { name: 'Auth', x: 20, y: 50, size: 'sm', color: '#8b5cf6' },
      { name: 'Core', x: 50, y: 50, size: 'md', color: '#4f46e5' },
      { name: 'DB', x: 80, y: 50, size: 'sm', color: '#06b6d4' },
      { name: 'Cache', x: 35, y: 82, size: 'sm', color: '#f59e0b' },
      { name: 'CDN', x: 65, y: 82, size: 'sm', color: '#10b981' },
    ],
    connections: [[0, 1], [0, 2], [0, 3], [2, 4], [2, 5], [1, 2], [3, 2]],
    stat: '99.99% uptime',
  },
  {
    label: 'AI Pipeline',
    nodes: [
      { name: 'Ingest', x: 15, y: 30, size: 'md', color: '#6366f1' },
      { name: 'Process', x: 40, y: 15, size: 'md', color: '#8b5cf6' },
      { name: 'LLM', x: 65, y: 30, size: 'lg', color: '#7c3aed' },
      { name: 'Vector DB', x: 85, y: 55, size: 'sm', color: '#06b6d4' },
      { name: 'Output', x: 50, y: 78, size: 'md', color: '#10b981' },
      { name: 'Monitor', x: 15, y: 70, size: 'sm', color: '#f59e0b' },
    ],
    connections: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [5, 0]],
    stat: '2.4M requests/day',
  },
  {
    label: 'Edge Network',
    nodes: [
      { name: 'Origin', x: 50, y: 20, size: 'lg', color: '#4f46e5' },
      { name: 'US-East', x: 15, y: 45, size: 'sm', color: '#38bdf8' },
      { name: 'EU-West', x: 40, y: 60, size: 'sm', color: '#38bdf8' },
      { name: 'AP-South', x: 85, y: 45, size: 'sm', color: '#38bdf8' },
      { name: 'US-West', x: 60, y: 60, size: 'sm', color: '#38bdf8' },
      { name: 'DNS', x: 50, y: 85, size: 'md', color: '#10b981' },
    ],
    connections: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 5], [3, 5], [4, 5]],
    stat: '<50ms global latency',
  },
];

function ArchitectureCard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [pulsingNode, setPulsingNode] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveIdx((p) => (p + 1) % architectures.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulsingNode((p) => (p + 1) % architectures[activeIdx].nodes.length);
    }, 600);
    return () => clearInterval(timer);
  }, [activeIdx]);

  const arch = architectures[activeIdx];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-indigo-300/20">
        <Server className="w-3 h-3 text-indigo-500" />
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-[9px] font-bold text-foreground/70"
          >
            {arch.label}
          </motion.span>
        </AnimatePresence>
        <span className="ml-auto text-[7px] font-mono text-foreground/35">{arch.stat}</span>
      </div>

      {/* Topology visualization */}
      <div className="flex-1 p-2 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.svg
            key={activeIdx}
            viewBox="0 0 100 100"
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Connection lines */}
            {arch.connections.map(([from, to], i) => {
              const f = arch.nodes[from];
              const t = arch.nodes[to];
              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={f.x}
                  y1={f.y}
                  x2={t.x}
                  y2={t.y}
                  stroke="rgba(99,102,241,0.2)"
                  strokeWidth="0.5"
                  strokeDasharray="2 1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                />
              );
            })}

            {/* Nodes */}
            {arch.nodes.map((node, i) => {
              const r = node.size === 'lg' ? 5 : node.size === 'md' ? 3.5 : 2.5;
              const isPulsing = pulsingNode === i;
              return (
                <g key={node.name}>
                  {/* Pulse ring */}
                  {isPulsing && (
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={r}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="0.5"
                      initial={{ r, opacity: 0.6 }}
                      animate={{ r: r + 4, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={r}
                    fill={`${node.color}30`}
                    stroke={node.color}
                    strokeWidth="0.6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 300 }}
                  />
                  <text
                    x={node.x}
                    y={node.y + r + 5}
                    textAnchor="middle"
                    fill="currentColor"
                    className="text-foreground/50"
                    fontSize="3"
                    fontFamily="monospace"
                    fontWeight="600"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </motion.svg>
        </AnimatePresence>
      </div>

      {/* Footer with progress dots */}
      <div className="px-3 pb-2.5 pt-1 flex items-center justify-between border-t border-indigo-300/10">
        <div className="flex items-center gap-1">
          <Shield className="w-2.5 h-2.5 text-emerald-500" />
          <span className="text-[7px] font-mono text-foreground/35">All nodes healthy</span>
        </div>
        <div className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                i === activeIdx ? 'bg-indigo-500 scale-125' : 'bg-foreground/15'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Showcase Cards Container ─── */

const CARDS = [
  {
    icon: Globe,
    title: 'Custom Web Apps',
    subtitle: 'Full-stack engineering for scalable platforms',
    Component: WebAppCard,
    delay: 0,
  },
  {
    icon: BrainCircuit,
    title: 'AI & Automation',
    subtitle: 'Intelligent agents that work 24/7',
    Component: AIAgentCard,
    delay: 0.15,
  },
  {
    icon: Layers,
    title: 'System Architecture',
    subtitle: 'Infrastructure built for millions',
    Component: ArchitectureCard,
    delay: 0.3,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92, filter: 'blur(8px)' },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: 1.2 + delay,
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  }),
};

export default function HeroShowcaseCards() {
  const [coords, setCoords] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [hovered, setHovered] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords((prev) => ({ ...prev, [idx]: { x: e.clientX - rect.left, y: e.clientY - rect.top } }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full">
      {CARDS.map((card, idx) => {
        const Icon = card.icon;
        const CardContent = card.Component;
        const isHovered = hovered === idx;
        const c = coords[idx] || { x: 0, y: 0 };

        return (
          <motion.div
            key={card.title}
            custom={card.delay}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onMouseMove={(e) => handleMouseMove(e, idx)}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className="relative overflow-hidden rounded-2xl border border-indigo-300/30 bg-gradient-to-br from-blue-600/[0.04] via-indigo-500/[0.015] to-transparent backdrop-blur-2xl ring-1 ring-indigo-400/10 shadow-[0_10px_30px_rgba(99,102,241,0.04),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-500 hover:border-indigo-300/50 hover:shadow-[0_16px_40px_rgba(99,102,241,0.08),inset_0_1px_0_rgba(255,255,255,0.55)] hover:-translate-y-1 group/card"
          >
            {/* Spotlight overlay */}
            {isHovered && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
                style={{
                  background: `radial-gradient(250px circle at ${c.x}px ${c.y}px, rgba(99, 102, 241, 0.12), transparent 80%)`,
                }}
              />
            )}

            {/* Card header with icon + title */}
            <div className="px-3 pt-3 pb-2 flex items-center gap-2 relative z-10">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500/15 to-violet-500/10 border border-indigo-300/30 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                <Icon className="w-3 h-3 text-indigo-500" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] font-extrabold text-foreground/85 tracking-tight leading-none">
                  {card.title}
                </h4>
                <p className="text-[8px] text-foreground/40 font-medium mt-0.5 truncate">
                  {card.subtitle}
                </p>
              </div>
            </div>

            {/* Animated content area */}
            <div className="relative z-10 h-[140px] sm:h-[160px] md:h-[180px]">
              <CardContent />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
