'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Cpu,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
  Terminal,
  ArrowRight,
  Monitor,
  FileCode,
} from 'lucide-react';
import Logo from '@/components/shared/Logo';
import EnterpriseButton from '@/components/shared/EnterpriseButton';

const capabilities = [
  { label: 'AI agents', icon: Cpu, tone: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
  { label: 'Custom software', icon: Workflow, tone: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { label: 'Workflow orchestration', icon: Network, tone: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { label: 'Managed delivery', icon: ShieldCheck, tone: 'text-amber-600 bg-amber-50 border-amber-200' },
];

const runtimeSteps = [
  'Customer request',
  'Agent routing',
  'System action',
  'Human approval',
  'Outcome logged',
];

const heroStats = [
  { value: '4-6 wk', label: 'MVP delivery windows' },
  { value: '24/7', label: 'Automation and monitoring' },
  { value: '1 team', label: 'Strategy, build, launch, support' },
];

const mockFilesystem: Record<string, string> = {
  'about': 'cd about',
  'contact': 'cd contact',
  'insights': 'cd insights',
  'process': 'cd process',
  'services': 'cd services',
  'work': 'cd work',
  'manifest.json': `{
  "name": "Cognisa Core Engine",
  "version": "2.4.0",
  "founder": "Pratik Jagdishbhai",
  "focus": "Custom Software & AI Automation",
  "philosophies": [
    "No-nonsense architectures",
    "High-performance operations",
    "Stunning developer-centric design"
  ],
  "technologies": ["Next.js 16", "Tailwind v4", "React", "TypeScript", "Node.js"]
}`,
  'cognisa.json': `{
  "status": "fully_operational",
  "nodes": {
    "frontend_mesh": "active",
    "agentic_core": "active",
    "webhook_intake": "listening"
  },
  "uptime": "99.98%"
}`
};

type ThemeColor = 'green' | 'cyan' | 'amber' | 'slate';

const themeStyles = {
  green: {
    text: 'text-emerald-700 font-mono',
    border: 'border-emerald-200',
    accent: 'bg-emerald-50 text-emerald-700',
    caret: 'bg-emerald-600',
    prompt: 'text-emerald-600',
    glow: 'shadow-[0_8px_30px_rgba(16,185,129,0.08)]',
    textLight: 'text-emerald-600',
  },
  cyan: {
    text: 'text-cyan-700 font-mono',
    border: 'border-cyan-200',
    accent: 'bg-cyan-50 text-cyan-700',
    caret: 'bg-cyan-600',
    prompt: 'text-cyan-600',
    glow: 'shadow-[0_8px_30px_rgba(6,182,212,0.08)]',
    textLight: 'text-cyan-600',
  },
  amber: {
    text: 'text-amber-700 font-mono',
    border: 'border-amber-200',
    accent: 'bg-amber-50 text-amber-700',
    caret: 'bg-amber-600',
    prompt: 'text-amber-600',
    glow: 'shadow-[0_8px_30px_rgba(245,158,11,0.08)]',
    textLight: 'text-amber-600',
  },
  slate: {
    text: 'text-slate-700 font-mono',
    border: 'border-slate-200',
    accent: 'bg-slate-100 text-slate-700',
    caret: 'bg-slate-700',
    prompt: 'text-slate-500',
    glow: 'shadow-[0_8px_30px_rgba(148,163,184,0.06)]',
    textLight: 'text-slate-700',
  },
};

/* ─── Droplet Intro Layer — Kore.ai-inspired cinematic reveal ─── */
function HeroDropletIntro() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Concentric rings and pulse centered behind headline/text */}
      <div className="absolute left-1/2 top-[40%] md:left-[30%] md:top-[38%] w-0 h-0 flex items-center justify-center">
        {/* Central glow pulse — appears first */}
        <div className="hero-droplet-center" />

        {/* Expanding ripple rings — staggered outward */}
        <div className="hero-droplet-ring hero-droplet-ring--1" />
        <div className="hero-droplet-ring hero-droplet-ring--2" />
        <div className="hero-droplet-ring hero-droplet-ring--3" />
        <div className="hero-droplet-ring hero-droplet-ring--4" />
        <div className="hero-droplet-ring hero-droplet-ring--5" />
      </div>

      {/* Large radial gradient bloom — builds up slowly behind hero content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="absolute left-[30%] top-[42%] w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(8,145,178,0.07) 0%, rgba(16,185,129,0.035) 35%, transparent 65%)',
        }}
      />

      {/* Secondary bloom — offset right for the runtime visual side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 3.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        className="absolute left-[65%] top-[45%] w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, rgba(6,182,212,0.025) 40%, transparent 65%)',
        }}
      />

      {/* Shimmer sweep line — horizontal scan like Kore.ai */}
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: '200%', opacity: [0, 0.6, 0.6, 0] }}
        transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        className="absolute top-[38%] left-0 w-[40%] h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(8,145,178,0.25), rgba(16,185,129,0.15), transparent)',
        }}
      />

      {/* Vertical shimmer sweep */}
      <motion.div
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: '300%', opacity: [0, 0.4, 0.4, 0] }}
        transition={{ duration: 3.4, ease: 'easeInOut', delay: 1.2 }}
        className="absolute left-[30%] top-0 h-[30%] w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(8,145,178,0.2), rgba(6,182,212,0.1), transparent)',
        }}
      />

      {/* Floating micro-particles */}
      {[
        { left: '18%', top: '25%', delay: 0.5, dur: 4.5 },
        { left: '42%', top: '30%', delay: 0.8, dur: 4 },
        { left: '72%', top: '20%', delay: 1.1, dur: 4.8 },
        { left: '85%', top: '55%', delay: 1.4, dur: 4.2 },
        { left: '28%', top: '65%', delay: 1.7, dur: 5.2 },
        { left: '55%', top: '70%', delay: 2.0, dur: 3.8 },
      ].map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0.7, 0],
            scale: [0, 1, 1, 0.5],
            y: [0, -20, -40, -60],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            ease: 'easeOut',
          }}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/40"
          style={{ left: p.left, top: p.top }}
        />
      ))}
    </div>
  );
}

/* ─── Stagger Orchestration — spread over 5.5-6.0s total ─── */
const stagger = {
  droplet: 0,         // t=0.0s — rings start expanding
  eyebrow: 1.2,       // t=1.2s — badge fades in
  headline: 2.0,      // t=2.0s — main title reveals (blur-in)
  text: 3.0,          // t=3.0s — description
  ctas: 3.8,          // t=3.8s — CTA buttons
  stats: 4.6,         // t=4.6s — stat cards start
  runtime: 2.2,       // t=2.2s — runtime visual starts
};

/* ─── Animation durations — longer, more cinematic ─── */
const dur = {
  eyebrow: 1.0,
  headline: 1.4,
  text: 1.2,
  ctas: 0.9,
  stats: 0.9,
  runtime: 1.4,
  runtimeStep: 0.6,
  signal: 0.55,
};

interface LogEntry {
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
}

function AgentRuntimeVisual() {
  const router = useRouter();
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'system', text: 'Cognisa System Shell v2.4.0 (node_hero // online)' },
    { type: 'system', text: 'Designed around your business systems' },
    { type: 'system', text: ' ' },
    { type: 'output', text: 'Directories (use "cd <name>" to navigate):' },
    { type: 'success', text: '  about/' },
    { type: 'success', text: '  contact/' },
    { type: 'success', text: '  insights/' },
    { type: 'success', text: '  process/' },
    { type: 'success', text: '  services/' },
    { type: 'success', text: '  work/' },
    { type: 'system', text: ' ' },
    { type: 'output', text: 'Type "help" to list utility commands, or "run" to simulate blueprint.' },
    { type: 'system', text: ' ' }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState<ThemeColor>('slate');
  const [showMatrix, setShowMatrix] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const consoleBodyRef = useRef<HTMLDivElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto scroll to bottom of console container
  useEffect(() => {
    if (consoleBodyRef.current) {
      consoleBodyRef.current.scrollTo({
        top: consoleBodyRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);

  // Focus input on console click
  const focusInput = () => {
    if (!isSimulating) {
      inputRef.current?.focus();
    }
  };

  // Matrix Rain canvas effect
  useEffect(() => {
    if (!showMatrix) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const cols = Math.floor(width / 16) + 1;
    const ypos = Array(cols).fill(0);

    const chars = '0101010101010101ABCDEF';
    ctx.font = '11px monospace';

    const draw = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, width, height);

      let fillStyle = 'rgba(16, 185, 129, 0.15)'; // default green
      if (theme === 'cyan') fillStyle = 'rgba(6, 182, 212, 0.15)';
      else if (theme === 'amber') fillStyle = 'rgba(245, 158, 11, 0.15)';
      else if (theme === 'slate') fillStyle = 'rgba(148, 163, 184, 0.12)';
      ctx.fillStyle = fillStyle;

      ypos.forEach((y, ind) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = ind * 16;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 16;
      });
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [showMatrix, theme]);

  // Handle command execution
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, { type: 'input', text: trimmed }]);
    
    // Add to command history list
    const newCmdHistory = [...commandHistory, trimmed];
    setCommandHistory(newCmdHistory);
    setHistoryIndex(-1);

    const args = trimmed.split(' ');
    const command = args[0].toLowerCase();
    const arg = args.slice(1).join(' ').trim();

    // Direct routing support if they type the directory name directly
    const checkPath = command.replace('/', '').toLowerCase();
    if (mockFilesystem[checkPath] && !checkPath.includes('.')) {
      setHistory((prev) => [...prev, { type: 'success', text: `Establishing link to /${checkPath}... Navigating.` }]);
      setTimeout(() => router.push(`/${checkPath}`), 600);
      return;
    }

    switch (command) {
      case 'help':
      case '?':
        setHistory((prev) => [
          ...prev,
          { type: 'output', text: 'Available Command Utilities:' },
          { type: 'output', text: '  ls, dir           List files and route directories' },
          { type: 'output', text: '  cd <route>        Navigate to a route (e.g., cd services)' },
          { type: 'output', text: '  cat <file>        Print file content (e.g., cat manifest.json)' },
          { type: 'output', text: '  run, blueprint    Execute the 5-step agent platform blueprint sequence' },
          { type: 'output', text: '  ping              Ping Cognisa\'s neural nodes' },
          { type: 'output', text: '  system, neofetch  Display system configurations & status' },
          { type: 'output', text: '  matrix, rain      Toggle futuristic terminal screen matrix rain' },
          { type: 'output', text: '  theme <color>     Change accent colors (cyan, green, amber, slate)' },
          { type: 'output', text: '  clear, cls        Clear console screen buffer' }
        ]);
        break;

      case 'ls':
      case 'dir':
        setHistory((prev) => [
          ...prev,
          { type: 'success', text: 'Directories (use "cd <name>" to navigate):' },
          { type: 'success', text: '  about/' },
          { type: 'success', text: '  contact/' },
          { type: 'success', text: '  insights/' },
          { type: 'success', text: '  process/' },
          { type: 'success', text: '  services/' },
          { type: 'success', text: '  work/' },
          { type: 'output', text: 'System Files (use "cat <name>" to read):' },
          { type: 'output', text: '  manifest.json' },
          { type: 'output', text: '  cognisa.json' }
        ]);
        break;

      case 'cd':
        if (!arg) {
          setHistory((prev) => [...prev, { type: 'error', text: 'Error: Specify directory path. Usage: cd <directory>' }]);
          break;
        }
        
        const path = arg.replace('/', '').toLowerCase();
        if (path === 'home' || path === '') {
          setHistory((prev) => [...prev, { type: 'success', text: 'Already at homepage.' }]);
        } else if (mockFilesystem[path] && !path.includes('.')) {
          setHistory((prev) => [...prev, { type: 'success', text: `Establishing link to /${path}... Navigating.` }]);
          setTimeout(() => router.push(`/${path}`), 600);
        } else {
          setHistory((prev) => [...prev, { type: 'error', text: `cd: no such file or directory: ${arg}` }]);
        }
        break;

      case 'cat':
        if (!arg) {
          setHistory((prev) => [...prev, { type: 'error', text: 'Error: Specify filename. Usage: cat <file>' }]);
          break;
        }
        if (mockFilesystem[arg]) {
          const lines = mockFilesystem[arg].split('\n');
          setHistory((prev) => [
            ...prev,
            ...lines.map((line) => ({ type: 'output' as const, text: line }))
          ]);
        } else {
          setHistory((prev) => [...prev, { type: 'error', text: `cat: ${arg}: No such file or directory` }]);
        }
        break;

      case 'ping':
        setHistory((prev) => [
          ...prev,
          { type: 'output', text: 'PING cognisa.sh (127.0.0.1) 56(84) bytes of data.' },
          { type: 'output', text: '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=12.4 ms' },
          { type: 'output', text: '64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=10.9 ms' },
          { type: 'output', text: '64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=11.2 ms' },
          { type: 'success', text: '--- cognisa.sh ping statistics ---' },
          { type: 'success', text: '3 packets transmitted, 3 received, 0% packet loss, RTT avg = 11.5ms' }
        ]);
        break;

      case 'system':
      case 'neofetch':
        setHistory((prev) => [
          ...prev,
          { type: 'success', text: 'OS: Cognisa Neural Core v2.4.0' },
          { type: 'success', text: 'Kernel: Next.js 16 + Turbopack' },
          { type: 'success', text: 'Uptime: 4 days, 12 hours, 14 mins' },
          { type: 'success', text: 'Environment: Vercel Edge Server' },
          { type: 'success', text: 'Status: Fully Operational (100% Core Load)' },
          { type: 'success', text: 'Accent Theme: ' + theme.toUpperCase() },
          { type: 'success', text: 'Target Port: HTTP/3000' }
        ]);
        break;

      case 'matrix':
      case 'rain':
        setShowMatrix(!showMatrix);
        setHistory((prev) => [
          ...prev,
          { type: 'success', text: !showMatrix ? 'Matrix rain stream initialized. Background activated.' : 'Matrix rain stream disabled. Background cleared.' }
        ]);
        break;

      case 'theme':
        if (!arg) {
          setHistory((prev) => [...prev, { type: 'error', text: 'Usage: theme <green|cyan|amber|slate>' }]);
          break;
        }
        if (arg === 'green' || arg === 'cyan' || arg === 'amber' || arg === 'slate') {
          setTheme(arg as ThemeColor);
          setHistory((prev) => [...prev, { type: 'success', text: `Console tint accent modified to: ${arg.toUpperCase()}` }]);
        } else {
          setHistory((prev) => [...prev, { type: 'error', text: `Unknown theme accent: ${arg}. Select green, cyan, amber, or slate.` }]);
        }
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        break;

      case 'run':
      case 'blueprint':
        if (isSimulating) {
          setHistory((prev) => [...prev, { type: 'error', text: 'Error: A simulation is already running.' }]);
          break;
        }
        setIsSimulating(true);
        setHistory((prev) => [
          ...prev,
          { type: 'system', text: ' ' },
          { type: 'success', text: '▶ STARTING COGNISA CORE ENGINE BLUEPRINT SEQUENCE...' },
          { type: 'system', text: ' ' }
        ]);

        const steps = [
          {
            delay: 500,
            logs: [
              { type: 'system', text: '[STEP 1/5] Customer Request Received' },
              { type: 'input', text: 'INTAKE: [POST] /api/webhook/request' },
              { type: 'output', text: 'PAYLOAD: { type: "sync_leads", priority: "high" }' },
              { type: 'success', text: 'SYSTEM: intent classified as CRM_Sync (99.2% confidence)' }
            ]
          },
          {
            delay: 1800,
            logs: [
              { type: 'system', text: '[STEP 2/5] Intelligent Agent Routing' },
              { type: 'input', text: 'ROUTING: match found in workflow index' },
              { type: 'output', text: 'RESOLVED: agent node "hubspot_sync_worker"' },
              { type: 'success', text: 'MODEL: invoking LLM routing engine gpt-4o-mini' }
            ]
          },
          {
            delay: 3100,
            logs: [
              { type: 'system', text: '[STEP 3/5] Autonomous System Action' },
              { type: 'input', text: 'EXECUTE: mapping payload to CRM schema' },
              { type: 'output', text: 'API_WRITE: posting new client record (ID: hs_8492a)' },
              { type: 'success', text: 'CONFIRMED: database write status 201 Created (122ms)' }
            ]
          },
          {
            delay: 4400,
            logs: [
              { type: 'system', text: '[STEP 4/5] Human-in-the-loop Approval' },
              { type: 'input', text: 'PENDING: verification required (policy #manager_signoff)' },
              { type: 'output', text: 'DISPATCH: approval token sent to channel #agent-alerts' },
              { type: 'success', text: 'APPROVED: token confirmed by admin (founder_pratik)' }
            ]
          },
          {
            delay: 5700,
            logs: [
              { type: 'system', text: '[STEP 5/5] Secure Outcome Logged' },
              { type: 'input', text: 'COMMIT: execution ledger record write success' },
              { type: 'output', text: 'AUDIT: ledger_hash_aef891b29fc3021ec89b09f...' },
              { type: 'success', text: 'NOTIFY: broadcast slack sync complete. node idle.' }
            ]
          },
          {
            delay: 7000,
            logs: [
              { type: 'system', text: ' ' },
              { type: 'success', text: '✔ BLUEPRINT SIMULATION COMPLETED SUCCESSFULLY.' },
              { type: 'system', text: ' ' }
            ]
          }
        ];

        steps.forEach((s) => {
          setTimeout(() => {
            setHistory((prev) => [
              ...prev,
              ...s.logs.map(log => ({ type: log.type as any, text: log.text }))
            ]);
            if (s.delay === 7000) {
              setIsSimulating(false);
            }
          }, s.delay);
        });
        break;

      default:
        setHistory((prev) => [
          ...prev,
          { type: 'error', text: `Command not recognized: "${command}".` },
          { type: 'output', text: 'Type "help" to view a list of available command logs.' }
        ]);
    }
  };

  // Keyboard navigation for command history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? -1 : historyIndex + 1;
      if (nextIndex >= commandHistory.length || nextIndex === -1) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
  };

  // Helper trigger for click buttons
  const runPresetCommand = (cmdText: string) => {
    if (!isSimulating) {
      executeCommand(cmdText);
    }
  };

  const activeStyle = themeStyles[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: dur.runtime, delay: stagger.runtime, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[620px] mx-auto lg:ml-auto"
    >
      {/* Background Glow */}
      <div className="absolute inset-x-8 top-8 h-40 rounded-lg bg-gradient-to-r from-cyan-50 via-white to-emerald-50 blur-3xl opacity-50 pointer-events-none" />
      
      {/* Terminal Window Frame (Whitish Light Theme) */}
      <div 
        onClick={focusInput}
        className={`w-full bg-white/92 border border-slate-200/80 rounded-2xl shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl overflow-hidden cursor-text transition-all duration-300 relative ${activeStyle.glow}`}
      >
        {/* Matrix rain canvas overlay */}
        {showMatrix && (
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none opacity-25 mix-blend-multiply rounded-2xl"
          />
        )}

        {/* Title Bar Chrome */}
        <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-200/80 flex items-center justify-between select-none relative z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-slate-650 uppercase flex items-center gap-1.5">
            <Monitor className="w-3 h-3 text-slate-500" />
            guest@cognisa.sh: ~
          </span>
          <span className="text-[10px] font-mono text-slate-650 uppercase font-black">
            sh v1.0
          </span>
        </div>

        {/* Shell Content Panel */}
        <div ref={consoleBodyRef} className="p-4 sm:p-5 h-[340px] md:h-[380px] overflow-y-auto flex flex-col gap-1 relative z-10 scrollbar-thin">
          {history.map((entry, idx) => {
            let colorClass = 'text-slate-600';
            if (entry.type === 'input') colorClass = activeStyle.textLight + ' font-bold';
            else if (entry.type === 'error') colorClass = 'text-rose-600 font-semibold';
            else if (entry.type === 'success') colorClass = 'text-emerald-600 font-semibold';
            else if (entry.type === 'system') colorClass = 'text-slate-600 text-xs font-semibold';

            return (
              <div key={idx} className="whitespace-pre-wrap leading-relaxed select-text font-mono text-[11px] sm:text-xs">
                {entry.type === 'input' && (
                  <span className={`${activeStyle.prompt} mr-2 font-bold`}>guest@cognisa.sh:~$</span>
                )}
                <span className={colorClass}>{entry.text}</span>
              </div>
            );
          })}
          
          {/* Dynamic blinking cursor line */}
          {!isSimulating && (
            <div className="flex items-center text-[11px] sm:text-xs font-mono text-slate-800 mt-1 relative">
              <span className={`${activeStyle.prompt} mr-2 font-bold`}>guest@cognisa.sh:~$</span>
              <span className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck="false"
                  className="w-full bg-transparent text-slate-800 border-none outline-none caret-transparent p-0 m-0 font-mono focus:ring-0"
                />
                {/* Virtual cursor placeholder */}
                <span 
                  className="absolute font-mono text-slate-850 pointer-events-none select-none"
                  style={{ left: `${inputVal.length * 7.2}px` }}
                >
                  {inputVal}
                  <span className={`inline-block w-1.5 h-3 ml-0.5 align-middle animate-pulse ${activeStyle.caret}`} />
                </span>
              </span>
            </div>
          )}
          <div ref={consoleEndRef} />
        </div>
      </div>

      {/* Route Navigation Pills */}
      <div className="mt-4 relative z-20 text-center">
        <div className="flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
          {[
            { label: 'cd services', cmd: 'cd services' },
            { label: 'cd work', cmd: 'cd work' },
            { label: 'cd process', cmd: 'cd process' },
            { label: 'cd insights', cmd: 'cd insights' },
            { label: 'cd about', cmd: 'cd about' },
            { label: 'cd contact', cmd: 'cd contact' },
          ].map((pill) => (
            <button
              key={pill.label}
              disabled={isSimulating}
              onClick={() => runPresetCommand(pill.cmd)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 bg-white/80 hover:bg-slate-50 text-[10px] font-bold text-slate-700 hover:text-slate-900 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-sm flex items-center gap-1 font-mono hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <FileCode className="w-3 h-3 text-cyan-600" />
              {pill.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="section-anchor relative overflow-hidden px-4 pb-8 pt-8 sm:px-6 md:pb-10 lg:min-h-[calc(100svh-2rem)] lg:px-10 lg:pt-28"
    >
      {/* Subtle background grid and gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:52px_52px] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-cyan-50/15 to-emerald-50/10" />
      </div>

      {/* ── Droplet Intro Layer ── */}
      <HeroDropletIntro />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-8 lg:min-h-[calc(100svh-7rem)] lg:justify-center">
        {/* Mobile Logo bar */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: stagger.eyebrow }}
          className="flex items-center justify-between gap-4 lg:hidden"
        >
          <Link href="#hero" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/80 bg-white/75 shadow-sm backdrop-blur">
              <Logo className="h-7 w-auto" />
            </span>
            <span className="text-sm md:text-base font-black tracking-tight text-black select-none">Cognisa</span>
          </Link>
          <EnterpriseButton href="/contact" variant="secondary" className="hidden px-4 py-2 sm:inline-flex">
            Talk to an expert
          </EnterpriseButton>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: dur.eyebrow, delay: stagger.eyebrow, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200/60 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase text-slate-600 shadow-sm backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              AI automation / software platforms / managed growth
            </motion.div>

            {/* Headline — dramatic blur-in with scale */}
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)', scale: 0.97 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              transition={{ duration: dur.headline, delay: stagger.headline, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl text-[2.75rem] font-black leading-[1.02] text-slate-950 sm:text-[4.1rem] lg:text-[5.4rem]"
            >
              Build AI systems ready for the work your business actually runs.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: dur.text, delay: stagger.text, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg"
            >
              Cognisa designs, builds, and manages custom software and AI agents that connect to your tools, automate repeatable work, and create measurable operating leverage.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur.ctas, delay: stagger.ctas, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <EnterpriseButton href="/contact">
                Get a demo
              </EnterpriseButton>
              <EnterpriseButton href="#marquee" variant="secondary">
                Explore our technology
              </EnterpriseButton>
            </motion.div>

            {/* Stats — stagger each card individually */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.65,
                    delay: stagger.stats + index * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="enterprise-ice-card rounded-lg p-4"
                >
                  <p className="text-xl font-black text-slate-950">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <AgentRuntimeVisual />
        </div>
      </div>
    </section>
  );
}
