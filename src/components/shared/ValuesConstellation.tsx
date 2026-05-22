'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ValueNode {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
}

interface ValuesConstellationProps {
  values: ValueNode[];
}

interface NodePosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
}

export default function ValuesConstellation({ values }: ValuesConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<NodePosition[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ w: 800, h: 500 });

  const NODE_RADIUS = 48;
  const ORBIT_RADIUS_X_FACTOR = 0.32;
  const ORBIT_RADIUS_Y_FACTOR = 0.32;

  // Particle system for floating dots
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number;
  }>>([]);

  const initParticles = useCallback((w: number, h: number) => {
    const particles = [] as any[];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        life: Math.random() * 200,
        maxLife: 150 + Math.random() * 150,
        size: 1 + Math.random() * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  const initNodePositions = useCallback((w: number, h: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const radiusX = w * ORBIT_RADIUS_X_FACTOR;
    const radiusY = h * ORBIT_RADIUS_Y_FACTOR;

    nodesRef.current = values.map((_, i) => {
      const angle = (i / values.length) * Math.PI * 2 - Math.PI / 2;
      const tx = cx + Math.cos(angle) * radiusX;
      const ty = cy + Math.sin(angle) * radiusY;
      return {
        x: tx,
        y: ty,
        vx: 0,
        vy: 0,
        targetX: tx,
        targetY: ty,
      };
    });
  }, [values]);

  // Handle resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ w: width, h: height });
          initNodePositions(width, height);
          initParticles(width, height);
        }
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [initNodePositions, initParticles]);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.w * 2; // 2x for retina
    canvas.height = dimensions.h * 2;
    ctx.scale(2, 2);

    const render = () => {
      ctx.clearRect(0, 0, dimensions.w, dimensions.h);
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const cx = dimensions.w / 2;
      const cy = dimensions.h / 2;

      // --- 1. Floating particles ---
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife || p.x < -10 || p.x > dimensions.w + 10 || p.y < -10 || p.y > dimensions.h + 10) {
          // Respawn
          p.x = Math.random() * dimensions.w;
          p.y = Math.random() * dimensions.h;
          p.life = 0;
          p.maxLife = 150 + Math.random() * 150;
        }

        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.25;
        ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- 2. Update node positions with spring physics ---
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Spring to target
        const dxTarget = n.targetX - n.x;
        const dyTarget = n.targetY - n.y;
        let ax = dxTarget * 0.04;
        let ay = dyTarget * 0.04;

        // Mouse attraction (gentle orbit distortion)
        const dxMouse = mouse.x - n.x;
        const dyMouse = mouse.y - n.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 200) {
          const force = (1 - distMouse / 200) * 0.015;
          ax += dxMouse * force;
          ay += dyMouse * force;
        }

        // Gentle orbital drift
        const time = Date.now() * 0.0005 + i * 1.5;
        ax += Math.cos(time) * 0.02;
        ay += Math.sin(time) * 0.02;

        n.vx = (n.vx + ax) * 0.92;
        n.vy = (n.vy + ay) * 0.92;
        n.x += n.vx;
        n.y += n.vy;
      }

      // --- 3. Connection lines between nodes ---
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = Math.max(dimensions.w, dimensions.h) * 0.7;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // --- 4. Connection lines from nodes to center ---
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = cx - n.x;
        const dy = cy - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        ctx.strokeStyle = `rgba(99, 102, 241, 0.06)`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // --- 5. Central glow ---
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
      gradient.addColorStop(0.6, 'rgba(99, 102, 241, 0.03)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.fill();

      // Center dot
      ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // --- 6. Node halos ---
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const isHov = hoveredIndex === i || selectedIndex === i;
        const haloGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, isHov ? 60 : 40);
        haloGrad.addColorStop(0, isHov ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.06)');
        haloGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, isHov ? 60 : 40, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- 7. Lines from mouse to nearby nodes ---
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          const alpha = (1 - dist / 250) * 0.12;
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [dimensions, hoveredIndex, selectedIndex]);

  // Mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    // Hit test for hover
    const nodes = nodesRef.current;
    let found = -1;
    for (let i = 0; i < nodes.length; i++) {
      const dx = mouseRef.current.x - nodes[i].x;
      const dy = mouseRef.current.y - nodes[i].y;
      if (Math.sqrt(dx * dx + dy * dy) < NODE_RADIUS) {
        found = i;
        break;
      }
    }
    setHoveredIndex(found >= 0 ? found : null);
  };

  const handleClick = () => {
    if (hoveredIndex !== null) {
      setSelectedIndex(selectedIndex === hoveredIndex ? null : hoveredIndex);
    } else {
      setSelectedIndex(null);
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
    setHoveredIndex(null);
  };

  const activeIndex = selectedIndex ?? hoveredIndex;
  const activeValue = activeIndex !== null ? values[activeIndex] : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-[2.5rem] border border-indigo-100 bg-white/30 backdrop-blur-md shadow-[0_20px_50px_rgba(99,102,241,0.04),inset_0_1px_0_rgba(255,255,255,0.7)]"
      style={{ cursor: hoveredIndex !== null ? 'pointer' : 'default' }}
    >
      {/* Canvas layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ width: dimensions.w, height: dimensions.h }}
      />

      {/* HTML node overlays */}
      {values.map((val, i) => {
        const node = nodesRef.current[i];
        if (!node) return null;
        const Icon = val.icon;
        const isActive = activeIndex === i;

        return (
          <motion.div
            key={val.title}
            className={`absolute flex flex-col items-center pointer-events-none z-10 transition-transform duration-300 ${
              isActive ? 'scale-110' : 'scale-100'
            }`}
            style={{
              left: node.x,
              top: node.y,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              left: node.x,
              top: node.y,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          >
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                isActive
                  ? 'bg-white border-indigo-300 shadow-[0_8px_30px_rgba(99,102,241,0.18)]'
                  : 'bg-white/60 border-indigo-200/50 shadow-[0_4px_16px_rgba(99,102,241,0.06)] backdrop-blur-xl'
              }`}
            >
              <Icon className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-300 ${
                isActive ? 'text-indigo-600' : 'text-indigo-400'
              }`} />
            </div>
            <span className={`mt-2 text-[10px] md:text-xs font-bold tracking-wide text-center max-w-[100px] transition-colors duration-300 ${
              isActive ? 'text-slate-800' : 'text-slate-500'
            }`}>
              {val.title}
            </span>
          </motion.div>
        );
      })}

      {/* Active value detail tooltip */}
      <AnimatePresence>
        {activeValue && (
          <motion.div
            key={activeValue.title}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-xs bg-white/80 backdrop-blur-md border border-indigo-100 rounded-2xl px-6 py-4 shadow-[0_16px_40px_rgba(99,102,241,0.08),inset_0_1px_0_rgba(255,255,255,0.85)]"
          >
            <h4 className="text-sm font-bold text-slate-800 mb-1">{activeValue.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{activeValue.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Central label */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center">
        <span className="text-[9px] font-mono tracking-[0.2em] text-indigo-400/60 font-bold uppercase">
          Cognisa
        </span>
      </div>
    </div>
  );
}
