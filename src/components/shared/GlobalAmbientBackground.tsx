'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * GlobalAmbientBackground
 * 
 * Fixed-position ambient layer behind the entire homepage.
 * Combines the /work page's interactive warping grid net with
 * floating gradient orbs and a mouse-following spotlight.
 */
export default function GlobalAmbientBackground() {
  // ─── Spotlight lerp ───
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const spotlightRaf = useRef<number>(0);
  const spotlightTarget = useRef({ x: 50, y: 50 });
  const spotlightCurrent = useRef({ x: 50, y: 50 });

  // ─── Warping grid canvas ───
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridMouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    // ── Spotlight smooth follow ──
    const handleMouseMove = (e: MouseEvent) => {
      spotlightTarget.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
      // Also feed the grid canvas
      gridMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animateSpotlight = () => {
      spotlightCurrent.current.x += (spotlightTarget.current.x - spotlightCurrent.current.x) * 0.05;
      spotlightCurrent.current.y += (spotlightTarget.current.y - spotlightCurrent.current.y) * 0.05;
      setMousePos({ x: spotlightCurrent.current.x, y: spotlightCurrent.current.y });
      spotlightRaf.current = requestAnimationFrame(animateSpotlight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    spotlightRaf.current = requestAnimationFrame(animateSpotlight);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(spotlightRaf.current);
    };
  }, []);

  // ── Warping grid canvas ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GRID_SIZE = 55;
    const INFLUENCE_RADIUS = 220;
    const PULL_STRENGTH = 0.3;
    const LINE_COLOR = 'rgba(99, 102, 241, 0.11)';
    const DOT_COLOR = 'rgba(99, 102, 241, 0.19)';

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    interface Point {
      x: number; y: number; ox: number; oy: number; vx: number; vy: number;
    }

    let points: Point[][] = [];

    const initPoints = (w: number, h: number) => {
      points = [];
      const cols = Math.ceil(w / GRID_SIZE) + 2;
      const rows = Math.ceil(h / GRID_SIZE) + 2;
      for (let r = 0; r < rows; r++) {
        const row: Point[] = [];
        for (let c = 0; c < cols; c++) {
          const x = (c - 1) * GRID_SIZE;
          const y = (r - 1) * GRID_SIZE;
          row.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
        points.push(row);
      }
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initPoints(width, height);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = gridMouseRef.current;
      const rowCount = points.length;
      if (rowCount === 0) { animationFrameId = requestAnimationFrame(render); return; }
      const colCount = points[0].length;

      // Spring physics update
      for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
          const p = points[r][c];

          const dxHome = p.ox - p.x;
          const dyHome = p.oy - p.y;

          let ax = dxHome * 0.06;
          let ay = dyHome * 0.06;

          // Mouse attraction
          const dxMouse = mouse.x - p.x;
          const dyMouse = mouse.y - p.y;
          const dist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (dist < INFLUENCE_RADIUS) {
            const force = (1 - dist / INFLUENCE_RADIUS) * PULL_STRENGTH;
            ax += dxMouse * force * 0.1;
            ay += dyMouse * force * 0.1;
          }

          p.vx = (p.vx + ax) * 0.88;
          p.vy = (p.vy + ay) * 0.88;
          p.x += p.vx;
          p.y += p.vy;
        }
      }

      // Draw horizontal lines
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1;
      for (let r = 0; r < rowCount; r++) {
        ctx.beginPath();
        for (let c = 0; c < colCount; c++) {
          const p = points[r][c];
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let c = 0; c < colCount; c++) {
        ctx.beginPath();
        for (let r = 0; r < rowCount; r++) {
          const p = points[r][c];
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Intersection dots
      ctx.fillStyle = DOT_COLOR;
      for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
          const p = points[r][c];
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0 opacity-20" />

      {/* Base gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1400px ellipse at 20% 15%, rgba(56, 189, 248, 0.12) 0%, transparent 55%),
            radial-gradient(1200px ellipse at 80% 25%, rgba(99, 102, 241, 0.14) 0%, transparent 50%),
            radial-gradient(1000px ellipse at 50% 85%, rgba(168, 85, 247, 0.10) 0%, transparent 50%),
            radial-gradient(800px ellipse at 70% 60%, rgba(236, 72, 153, 0.06) 0%, transparent 45%)
          `,
        }}
      />

      {/* Interactive warping grid net (from /work page) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* Mouse-following spotlight */}
      <div
        className="absolute inset-0 transition-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.04), transparent 70%)`,
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-20"
        style={{ backgroundColor: 'rgba(99, 102, 241, 0.3)' }}
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, -60, 40, -20, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ top: '5%', left: '10%' }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
        style={{ backgroundColor: 'rgba(168, 85, 247, 0.25)' }}
        animate={{
          x: [0, -60, 50, -30, 0],
          y: [0, 50, -30, 40, 0],
          scale: [1, 0.95, 1.1, 1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ bottom: '10%', right: '5%' }}
      />

      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-10"
        style={{ backgroundColor: 'rgba(56, 189, 248, 0.2)' }}
        animate={{
          x: [0, 40, -60, 20, 0],
          y: [0, -40, 20, -60, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ top: '40%', left: '50%' }}
      />
    </div>
  );
}
