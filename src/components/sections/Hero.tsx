'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Logo from '@/components/shared/Logo';

/* ═══════════════════════════════════════════════
   NEURAL CONSTELLATION — Canvas visualization
   Mirrors the Cognisa logo's dendrite / synapse 
   visual language in blue→purple gradient.
   ═══════════════════════════════════════════════ */

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  phase: number;
  speed: number;
  layer: number; // 0=core, 1=mid, 2=outer
}

interface Branch {
  from: number;
  to: number;
  thickness: number;
  opacity: number;
}

function NeuralConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const nodesRef = useRef<Node[]>([]);
  const branchesRef = useRef<Branch[]>([]);
  const frameRef = useRef(0);

  const initNetwork = useCallback((w: number, h: number) => {
    const nodes: Node[] = [];
    const branches: Branch[] = [];

    // Center of the constellation — offset right like the mockup
    const cx = w * 0.62;
    const cy = h * 0.42;

    // Core nodes — the central "synapse" cluster
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.3;
      const dist = 15 + Math.random() * 35;
      nodes.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        baseX: cx + Math.cos(angle) * dist,
        baseY: cy + Math.sin(angle) * dist,
        vx: 0, vy: 0,
        radius: 4 + Math.random() * 3,
        hue: 220 + Math.random() * 15, // bright blue core
        phase: Math.random() * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.35,
        layer: 0,
      });
    }

    // Mid-layer nodes — branching dendrites
    for (let i = 0; i < 22; i++) {
      const angle = (i / 22) * Math.PI * 2 + Math.random() * 0.4;
      const dist = 70 + Math.random() * 140;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;
      nodes.push({
        x: px, y: py, baseX: px, baseY: py,
        vx: 0, vy: 0,
        radius: 2.5 + Math.random() * 2.5,
        hue: 235 + Math.random() * 35, // indigo-violet
        phase: Math.random() * Math.PI * 2,
        speed: 0.18 + Math.random() * 0.28,
        layer: 1,
      });
    }

    // Outer nodes — terminal synaptic endpoints (like the logo's dots)
    for (let i = 0; i < 35; i++) {
      const angle = (i / 35) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 160 + Math.random() * 250;
      // Bias toward top-right quadrant like the mockup's dendrite spread
      const bias = (angle > -Math.PI * 0.4 && angle < Math.PI * 0.9) ? 1.35 : 0.75;
      const px = cx + Math.cos(angle) * dist * bias;
      const py = cy + Math.sin(angle) * dist * bias;
      nodes.push({
        x: px, y: py, baseX: px, baseY: py,
        vx: 0, vy: 0,
        radius: 2 + Math.random() * 3.5,
        hue: 255 + Math.random() * 50, // violet-purple-pink
        phase: Math.random() * Math.PI * 2,
        speed: 0.12 + Math.random() * 0.18,
        layer: 2,
      });
    }

    // Build organic branches — connect layers like dendrites
    const coreCount = 6;
    const midStart = coreCount;
    const midEnd = midStart + 22;
    const outerStart = midEnd;

    // Core-to-core connections
    for (let i = 0; i < coreCount; i++) {
      for (let j = i + 1; j < coreCount; j++) {
        if (Math.random() > 0.25) {
          branches.push({ from: i, to: j, thickness: 1.5, opacity: 0.3 });
        }
      }
    }

    // Core-to-mid connections (main dendrite branches)
    for (let i = midStart; i < midEnd; i++) {
      const closest = findClosest(nodes[i], nodes.slice(0, coreCount));
      branches.push({ from: closest, to: i, thickness: 1.0, opacity: 0.22 });
      // Cross-connections between mid-layer nodes
      if (Math.random() > 0.55) {
        const other = midStart + Math.floor(Math.random() * 22);
        if (other !== i) {
          branches.push({ from: i, to: other, thickness: 0.6, opacity: 0.1 });
        }
      }
    }

    // Mid-to-outer connections (terminal dendrites)
    for (let i = outerStart; i < nodes.length; i++) {
      const closest = findClosest(nodes[i], nodes.slice(midStart, midEnd)) + midStart;
      branches.push({ from: closest, to: i, thickness: 0.5, opacity: 0.15 });
    }

    nodesRef.current = nodes;
    branchesRef.current = branches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNetwork(w, h);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const draw = (time: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const branches = branchesRef.current;
      const t = time * 0.001;

      // Animate nodes — gentle organic drift
      nodes.forEach((node) => {
        const drift = Math.sin(t * node.speed + node.phase);
        const driftY = Math.cos(t * node.speed * 0.7 + node.phase + 1);
        const amplitude = node.layer === 0 ? 3 : node.layer === 1 ? 6 : 10;

        node.x = node.baseX + drift * amplitude;
        node.y = node.baseY + driftY * amplitude * 0.8;

        // Mouse interaction — nodes are attracted toward cursor
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 280) {
            const force = (1 - dist / 280) * 0.2;
            node.x += dx * force * (node.layer === 0 ? 0.2 : 1);
            node.y += dy * force * (node.layer === 0 ? 0.2 : 1);
          }
        }
      });

      // Draw branches — curved organic lines like dendrites
      branches.forEach((branch) => {
        const from = nodes[branch.from];
        const to = nodes[branch.to];
        if (!from || !to) return;

        // Pulsing opacity
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + branch.from * 0.5);
        const alpha = branch.opacity * (0.6 + 0.4 * pulse);

        // Curved line (quadratic bezier with organic midpoint)
        const mx = (from.x + to.x) / 2 + Math.sin(t + branch.from) * 8;
        const my = (from.y + to.y) / 2 + Math.cos(t + branch.to) * 8;

        // Gradient along the branch: blue→purple
        const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        grad.addColorStop(0, `hsla(${from.hue}, 70%, 65%, ${alpha})`);
        grad.addColorStop(1, `hsla(${to.hue}, 70%, 65%, ${alpha})`);

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(mx, my, to.x, to.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = branch.thickness;
        ctx.stroke();
      });

      // Draw nodes — glowing synaptic dots (like the logo's luminous endpoints)
      nodes.forEach((node) => {
        const pulse = 0.7 + 0.3 * Math.sin(t * 2 + node.phase);
        const r = node.radius * pulse;

        // Outer glow halo
        const glowRadius = r * 5;
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
        glow.addColorStop(0, `hsla(${node.hue}, 85%, 72%, ${0.25 * pulse})`);
        glow.addColorStop(0.5, `hsla(${node.hue}, 80%, 70%, ${0.08 * pulse})`);
        glow.addColorStop(1, `hsla(${node.hue}, 80%, 70%, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot — brighter, more saturated
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        const sat = node.layer === 0 ? 90 : 75;
        const light = node.layer === 0 ? 62 : 68;
        ctx.fillStyle = `hsla(${node.hue}, ${sat}%, ${light}%, ${0.7 + 0.3 * pulse})`;
        ctx.fill();

        // Bright center highlight (for core nodes)
        if (node.layer === 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${node.hue}, 100%, 85%, ${0.8 * pulse})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    animId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initNetwork]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-[1]"
    />
  );
}

/** Find the index of the closest node in a subset */
function findClosest(target: { x: number; y: number }, candidates: Node[]): number {
  let minDist = Infinity;
  let minIdx = 0;
  candidates.forEach((c, i) => {
    const d = Math.hypot(target.x - c.x, target.y - c.y);
    if (d < minDist) { minDist = d; minIdx = i; }
  });
  return minIdx;
}

/* ═══════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════ */

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = Date.now();
          const duration = 1800;
          const tick = () => {
            const progress = Math.min((Date.now() - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = `${Math.floor(eased * value)}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ═══════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ═══════════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════════ */

const STATS = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
  { value: 24, suffix: '/7', label: 'Support & Monitoring' },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const networkOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const networkScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.15]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="section-anchor relative min-h-screen flex items-center bg-transparent overflow-hidden"
    >
      {/* ── Logo (desktop) ── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-6 left-6 md:top-8 md:left-8 z-30 hidden lg:block"
      >
        <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Logo className="h-14 md:h-18 w-auto origin-top-left scale-125" />
        </a>
      </motion.div>

      {/* ── Neural Constellation Canvas ── */}
      <motion.div
        style={{ opacity: networkOpacity, scale: networkScale }}
        className="absolute inset-0 z-[1] lg:left-[25%] lg:origin-left"
      >
        <NeuralConstellation />
      </motion.div>

      {/* ── Subtle dot-grid texture ── */}
      <div
        className="absolute inset-0 z-[0] opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 0.8px, transparent 0.8px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Ambient gradient wash (very subtle) ── */}
      <div className="absolute inset-0 z-[0] pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-gradient-to-bl from-indigo-100/40 via-violet-50/20 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-gradient-to-tr from-blue-50/30 via-transparent to-transparent rounded-full blur-[100px]" />
      </div>

      {/* ── Main Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 w-full max-w-[1400px] mx-auto px-5 md:px-8 lg:px-16 min-h-screen flex items-center"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="w-full max-w-4xl mx-auto lg:mx-0 lg:max-w-xl flex flex-col items-center text-center lg:items-start lg:text-left">

          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-foreground/[0.06] bg-white/60 backdrop-blur-sm shadow-[0_2px_12px_rgba(99,102,241,0.06)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[#1a1a2e]/50 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold">
                Software · Development · Automation · AI
              </span>
            </div>
          </motion.div>

          {/* ── Headline ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            {/* Line 1: We think, */}
            <motion.h1 className="flex items-baseline justify-center lg:justify-start gap-[0.3em] text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[1.05] tracking-[-0.04em]">
              <motion.span variants={wordReveal} className="text-[#1a1a2e]">
                We
              </motion.span>
              <motion.span variants={wordReveal}>
                <span className="bg-gradient-to-r from-[#4f8bfa] via-[#6366f1] to-[#a78bfa] bg-clip-text text-transparent">
                  think,
                </span>
              </motion.span>
            </motion.h1>

            {/* Line 2: you grow */}
            <motion.h1 className="flex items-baseline justify-center lg:justify-start gap-[0.3em] text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[1.05] tracking-[-0.04em] -mt-2 md:-mt-3">
              <motion.span variants={wordReveal} className="text-[#1a1a2e]">
                you
              </motion.span>
              <motion.span variants={wordReveal}>
                <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#c084fc] bg-clip-text text-transparent">
                  grow
                </span>
              </motion.span>
            </motion.h1>

            {/* Line 3: — that's the deal. */}
            <motion.p
              variants={wordReveal}
              className="text-[clamp(1.1rem,2.2vw,1.75rem)] font-medium text-[#1a1a2e]/30 mt-2 tracking-[-0.01em]"
            >
              — that&apos;s the deal.
            </motion.p>
          </motion.div>

          {/* ── Subheadline ── */}
          <motion.p
            custom={1.0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-base md:text-lg text-[#1a1a2e]/50 mb-12 max-w-xl leading-[1.7] font-medium"
          >
            End-to-end{' '}
            <span className="text-[#1a1a2e]/75 font-semibold">AI automation</span> and{' '}
            <span className="text-[#1a1a2e]/75 font-semibold">software development</span>{' '}
            that transforms your business.
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div
            custom={1.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-16"
          >
            {/* Primary */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-white text-[15px] bg-gradient-to-r from-[#4f46e5] via-[#6366f1] to-[#7c3aed] shadow-[0_6px_30px_rgba(99,102,241,0.35)] hover:shadow-[0_10px_40px_rgba(99,102,241,0.45)] transition-shadow duration-500 overflow-hidden"
            >
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 w-[18px] h-[18px] transition-transform group-hover:translate-x-1" />
            </motion.a>

            {/* Secondary */}
            <motion.a
              href="#work"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-[#1a1a2e]/70 text-[15px] border border-foreground/[0.1] bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:border-foreground/[0.18] transition-all duration-300"
            >
              View Our Work
              <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all" />
            </motion.a>
          </motion.div>

          {/* ── Stats ── */}
          <motion.div
            custom={1.6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-12"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center lg:items-start gap-1 relative">
                {/* Divider (between stats) */}
                {i > 0 && (
                  <div className="absolute -left-2 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-px h-8 bg-foreground/[0.08] hidden sm:block" />
                )}
                <span className="text-xl md:text-2xl font-bold text-[#1a1a2e]/70 tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-[10px] md:text-[11px] font-medium text-[#1a1a2e]/35 tracking-wider uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#1a1a2e]/25">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[18px] h-7 border border-foreground/[0.12] rounded-full flex justify-center pt-1"
        >
          <motion.div
            animate={{ opacity: [0.2, 0.8, 0.2], scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[2px] h-[6px] bg-indigo-400/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
