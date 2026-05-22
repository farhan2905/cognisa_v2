'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, CornerDownLeft, Sparkles, Monitor, FileCode, CheckCircle2 } from 'lucide-react';
import FloatingTopNav from '@/components/sections/FloatingTopNav';
import GlobalAmbientBackground from '@/components/shared/GlobalAmbientBackground';

// Types for the console logs
interface LogEntry {
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
}

// Available themes
type ThemeColor = 'green' | 'cyan' | 'amber' | 'slate';

const themeStyles = {
  green: {
    text: 'text-emerald-400 font-mono',
    border: 'border-emerald-500/20',
    accent: 'bg-emerald-500/10 text-emerald-400',
    caret: 'bg-emerald-400',
    prompt: 'text-emerald-500',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    textLight: 'text-emerald-300',
  },
  cyan: {
    text: 'text-cyan-400 font-mono',
    border: 'border-cyan-500/20',
    accent: 'bg-cyan-500/10 text-cyan-400',
    caret: 'bg-cyan-400',
    prompt: 'text-cyan-500',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
    textLight: 'text-cyan-300',
  },
  amber: {
    text: 'text-amber-400 font-mono',
    border: 'border-amber-500/20',
    accent: 'bg-amber-500/10 text-amber-400',
    caret: 'bg-amber-400',
    prompt: 'text-amber-500',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    textLight: 'text-amber-300',
  },
  slate: {
    text: 'text-slate-300 font-mono',
    border: 'border-slate-700/50',
    accent: 'bg-slate-700/20 text-slate-300',
    caret: 'bg-slate-300',
    prompt: 'text-slate-400',
    glow: 'shadow-[0_0_20px_rgba(148,163,184,0.05)]',
    textLight: 'text-slate-200',
  },
};

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

export default function NotFound() {
  const router = useRouter();
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'system', text: 'Cognisa System Shell [Version 2.4.0]' },
    { type: 'system', text: '(c) Cognisa. All rights reserved. Type "help" to start.' },
    { type: 'system', text: ' ' },
    { type: 'error', text: 'ERROR: Node path resolution failed.' },
    { type: 'error', text: 'HTTP 404: Resource not found in filesystem.' },
    { type: 'output', text: 'Suggest: Type "ls" to view directories, or "cd home" to return.' },
    { type: 'system', text: ' ' }
  ]);
  
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState<ThemeColor>('slate');
  const [showMatrix, setShowMatrix] = useState(false);

  const consoleBodyRef = useRef<HTMLDivElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Force scroll to top on mount and set scroll restoration to manual
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.history && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

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
    inputRef.current?.focus();
  };

  // Matrix Rain canvas effect
  useEffect(() => {
    if (!showMatrix) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
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
      ctx.fillStyle = 'rgba(11, 15, 23, 0.08)';
      ctx.fillRect(0, 0, width, height);

      let fillStyle = 'rgba(16, 185, 129, 0.28)'; // default green
      if (theme === 'cyan') fillStyle = 'rgba(6, 182, 212, 0.28)';
      else if (theme === 'amber') fillStyle = 'rgba(245, 158, 11, 0.28)';
      else if (theme === 'slate') fillStyle = 'rgba(148, 163, 184, 0.22)';
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
          { type: 'output', text: '  ping              Ping Cognisa\'s autonomous neural cluster' },
          { type: 'output', text: '  system, neofetch  Display system configurations & status' },
          { type: 'output', text: '  matrix, rain      Toggle futuristic terminal screen matrix rain' },
          { type: 'output', text: '  theme <color>     Change accent colors (cyan, green, amber, slate)' },
          { type: 'output', text: '  clear, cls        Clear console screen buffer' },
          { type: 'output', text: '  home              Return to landing homepage' }
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
          setHistory((prev) => [...prev, { type: 'success', text: 'Redirecting to homepage...' }]);
          setTimeout(() => router.push('/'), 600);
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
          { type: 'output', text: '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=45.1 ms' },
          { type: 'output', text: '64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=41.3 ms' },
          { type: 'output', text: '64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=43.8 ms' },
          { type: 'success', text: '--- cognisa.sh ping statistics ---' },
          { type: 'success', text: '3 packets transmitted, 3 received, 0% packet loss, RTT avg = 43.4ms' }
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

      case 'home':
        setHistory((prev) => [...prev, { type: 'success', text: 'Returning to homepage...' }]);
        setTimeout(() => router.push('/'), 600);
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
    executeCommand(cmdText);
  };

  const activeStyle = themeStyles[theme];

  return (
    <main className="min-h-screen pt-0 pb-10 px-4 md:px-6 flex flex-col justify-between items-center overflow-x-clip text-slate-800 relative bg-white">
      {/* Global Background Layer */}
      <GlobalAmbientBackground />

      {/* Navigation menu */}
      <FloatingTopNav />

      {/* Main Panel Content */}
      <div className="relative z-10 w-full max-w-[760px] mx-auto pt-28 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {/* Header Description */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[10px] tracking-widest uppercase font-bold text-slate-500 shadow-sm">
              <Terminal className="w-3.5 h-3.5" />
              SYSTEM NODE NOT RESOLVED
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-4 tracking-tight">
              Error 404 — Node Offline
            </h1>
            <p className="text-sm font-semibold text-slate-500 mt-2 max-w-md mx-auto">
              The requested directory route could not be found. Use the terminal console below to inspect paths or navigate.
            </p>
          </div>

          {/* Terminal Window Frame */}
          <div 
            onClick={focusInput}
            className={`w-full bg-[#0B0F17]/96 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden cursor-text transition-all duration-300 relative ${activeStyle.glow}`}
          >
            {/* Matrix rain canvas overlay */}
            {showMatrix && (
              <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full pointer-events-none opacity-45 mix-blend-screen rounded-2xl"
              />
            )}

            {/* Title Bar Chrome */}
            <div className="bg-[#121824] px-4 py-3.5 border-b border-slate-800/80 flex items-center justify-between select-none relative z-20">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
                <Monitor className="w-3 h-3 text-slate-600" />
                guest@cognisa.sh: ~
              </span>
              <span className="text-[10px] font-mono text-slate-600 uppercase font-black">
                sh v1.0
              </span>
            </div>

            {/* Shell Content Panel */}
            <div ref={consoleBodyRef} className="p-4 sm:p-5 h-[340px] md:h-[380px] overflow-y-auto flex flex-col gap-1 relative z-10 scrollbar-thin">
              {history.map((entry, idx) => {
                let colorClass = 'text-slate-300';
                if (entry.type === 'input') colorClass = activeStyle.textLight + ' font-bold';
                else if (entry.type === 'error') colorClass = 'text-rose-400 font-semibold';
                else if (entry.type === 'success') colorClass = 'text-emerald-400 font-semibold';
                else if (entry.type === 'system') colorClass = 'text-slate-500 text-xs';

                return (
                  <div key={idx} className="whitespace-pre-wrap leading-relaxed select-text font-mono text-xs sm:text-sm">
                    {entry.type === 'input' && (
                      <span className={`${activeStyle.prompt} mr-2`}>guest@cognisa.sh:~$</span>
                    )}
                    <span className={colorClass}>{entry.text}</span>
                  </div>
                );
              })}
              
              {/* Dynamic blinking cursor line */}
              <div className="flex items-center text-xs sm:text-sm font-mono text-slate-300 mt-1 relative">
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
                    className="w-full bg-transparent text-slate-100 border-none outline-none caret-transparent p-0 m-0 font-mono focus:ring-0"
                  />
                  {/* Virtual cursor placeholder */}
                  <span 
                    className="absolute font-mono text-slate-100 pointer-events-none select-none"
                    style={{ left: `${inputVal.length * 8.4}px` }}
                  >
                    {inputVal}
                    <span className={`inline-block w-2 h-4 ml-0.5 align-middle animate-pulse ${activeStyle.caret}`} />
                  </span>
                </span>
              </div>
              <div ref={consoleEndRef} />
            </div>
          </div>

          {/* Quick Click Diagnostic Commands */}
          <div className="mt-5 text-center relative z-20">
            <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
              Quick Command Diagnostics
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
              {[
                { label: 'help', cmd: 'help' },
                { label: 'cd services', cmd: 'cd services' },
                { label: 'cd work', cmd: 'cd work' },
                { label: 'cd process', cmd: 'cd process' },
                { label: 'cd insights', cmd: 'cd insights' },
                { label: 'cd about', cmd: 'cd about' },
                { label: 'cd contact', cmd: 'cd contact' },
                { label: 'show_manifest', cmd: 'cat manifest.json' },
                { label: 'go_home', cmd: 'cd home' }
              ].map((pill) => (
                <button
                  key={pill.label}
                  onClick={() => runPresetCommand(pill.cmd)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 bg-slate-50/80 hover:bg-slate-100 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-all shadow-sm flex items-center gap-1 font-mono hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5 text-cyan-600" />
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Standard Navigation Tags Below */}
          <div className="mt-8 flex justify-center items-center gap-6 border-t border-slate-100 pt-6 max-w-md mx-auto">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider cursor-pointer"
            >
              Return Home
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <button
              onClick={() => router.push('/contact')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider cursor-pointer"
            >
              Contact Us
            </button>
          </div>

        </motion.div>
      </div>

      {/* Footer copy */}
      <div className="w-full text-center py-2 text-[10px] font-semibold tracking-widest text-slate-400 uppercase relative z-10 border-t border-slate-50">
        Cognisa Neural Cluster node_404 // online
      </div>
    </main>
  );
}
