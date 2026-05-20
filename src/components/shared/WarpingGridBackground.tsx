'use client';

import { useEffect, useRef } from 'react';

interface WarpingGridBackgroundProps {
  gridSize?: number;
  influenceRadius?: number;
  pullStrength?: number;
  lineColor?: string;
  dotColor?: string;
}

export default function WarpingGridBackground({
  gridSize = 45,
  influenceRadius = 180,
  pullStrength = 0.35,
  lineColor = 'rgba(99, 102, 241, 0.05)',
  dotColor = 'rgba(99, 102, 241, 0.12)',
}: WarpingGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Track points
    interface Point {
      x: number;
      y: number;
      ox: number; // original X
      oy: number; // original Y
      vx: number;
      vy: number;
    }

    let points: Point[][] = [];

    const initPoints = (w: number, h: number) => {
      points = [];
      const cols = Math.ceil(w / gridSize) + 2;
      const rows = Math.ceil(h / gridSize) + 2;

      for (let r = 0; r < rows; r++) {
        const row: Point[] = [];
        for (let c = 0; c < cols; c++) {
          const x = (c - 1) * gridSize;
          const y = (r - 1) * gridSize;
          row.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
          });
        }
        points.push(row);
      }
    };

    const resize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initPoints(width, height);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.parentElement?.addEventListener('mousemove', onMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const rows = points.length;
      if (rows === 0) return;
      const cols = points[0].length;

      // Update positions using spring physics
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];

          // Vector to home position
          const dxHome = p.ox - p.x;
          const dyHome = p.oy - p.y;

          // Spring force back home
          let ax = dxHome * 0.08;
          let ay = dyHome * 0.08;

          // Mouse attraction/repulsion
          if (mouse.active) {
            const dxMouse = mouse.x - p.x;
            const dyMouse = mouse.y - p.y;
            const dist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            if (dist < influenceRadius) {
              const force = (1 - dist / influenceRadius) * pullStrength;
              // Pull towards mouse slightly
              ax += dxMouse * force * 0.12;
              ay += dyMouse * force * 0.12;
            }
          }

          // Friction & update velocity
          p.vx = (p.vx + ax) * 0.85;
          p.vy = (p.vy + ay) * 0.85;

          p.x += p.vx;
          p.y += p.vy;
        }
      }

      // Draw grid lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          if (c === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }

      // Vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const p = points[r][c];
          if (r === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }

      // Draw intersections as micro-dots
      ctx.fillStyle = dotColor;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [gridSize, influenceRadius, pullStrength, lineColor, dotColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
