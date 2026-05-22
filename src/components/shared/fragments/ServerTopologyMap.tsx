'use client';

import { useEffect, useState } from 'react';
import { Database, ShieldAlert, Cpu } from 'lucide-react';

export default function ServerTopologyMap() {
  const [dbLoad, setDbLoad] = useState(24);
  const [apiLatency, setApiLatency] = useState(14);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDbLoad(Math.floor(20 + Math.random() * 25));
      setApiLatency(Math.floor(10 + Math.random() * 10));
      // Re-trigger svg dot travel animations
      setPulseKey((p) => p + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 font-mono text-[10px] sm:text-xs text-slate-800 flex flex-col justify-between overflow-hidden relative shadow-sm">
      {/* Topology Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
        <span className="flex items-center gap-1.5 text-[10px] sm:text-xs text-emerald-600 font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Gateway Live
        </span>
        <span className="text-[10px] sm:text-xs text-slate-400">
          API: {apiLatency}ms • CPU: 12%
        </span>
      </div>

      {/* SVG Network Visualizer */}
      <div className="flex-grow relative flex items-center justify-center py-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 240 100">
          <defs>
            <linearGradient id="netLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Connection Lines */}
          {/* Client to Load Balancer */}
          <path d="M 30,50 Q 75,15 120,25" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="1.5" />
          <path d="M 30,50 Q 75,85 120,75" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="1.5" />
          {/* App Servers to DB */}
          <path d="M 120,25 Q 165,25 210,50" fill="none" stroke="rgba(20,184,166,0.15)" strokeWidth="1.5" />
          <path d="M 120,75 Q 165,75 210,50" fill="none" stroke="rgba(20,184,166,0.15)" strokeWidth="1.5" />

          {/* Request pulse travels */}
          <circle r="2.5" fill="#06b6d4" className="shadow-lg">
            <animateMotion
              key={`p1-${pulseKey}`}
              dur="1.8s"
              repeatCount="indefinite"
              path="M 30,50 Q 75,15 120,25"
            />
          </circle>
          <circle r="2.5" fill="#14b8a6" className="shadow-lg">
            <animateMotion
              key={`p2-${pulseKey}`}
              dur="2.2s"
              begin="0.6s"
              repeatCount="indefinite"
              path="M 30,50 Q 75,85 120,75"
            />
          </circle>

          {/* Database Response travel */}
          <circle r="2" fill="#10b981" className="shadow-lg">
            <animateMotion
              key={`p3-${pulseKey}`}
              dur="1.5s"
              begin="0.4s"
              repeatCount="indefinite"
              path="M 210,50 Q 165,25 120,25"
            />
          </circle>

          {/* Nodes */}
          {/* Edge Ingress */}
          <g transform="translate(30, 50)">
            <circle r="10" fill="rgba(6,182,212,0.06)" stroke="#06b6d4" strokeWidth="1.5" />
            <circle r="4" fill="#06b6d4" />
          </g>

          {/* Server A */}
          <g transform="translate(120, 25)">
            <circle r="12" fill="rgba(6,182,212,0.06)" stroke="#0891b2" strokeWidth="1.5" />
            <foreignObject x="-6" y="-6" width="12" height="12">
              <Cpu className="w-3 h-3 text-cyan-655" />
            </foreignObject>
          </g>

          {/* Server B */}
          <g transform="translate(120, 75)">
            <circle r="12" fill="rgba(20,184,166,0.06)" stroke="#14b8a6" strokeWidth="1.5" />
            <foreignObject x="-6" y="-6" width="12" height="12">
              <Cpu className="w-3 h-3 text-teal-600" />
            </foreignObject>
          </g>

          {/* Cluster Database */}
          <g transform="translate(210, 50)">
            <circle r="14" fill="rgba(16,185,129,0.06)" stroke="#10b981" strokeWidth="1.5" />
            <foreignObject x="-7" y="-7" width="14" height="14">
              <Database className="w-3.5 h-3.5 text-emerald-500" />
            </foreignObject>
          </g>

          {/* Text Labels inside SVG */}
          <text x="30" y="70" textAnchor="middle" fill="rgba(6,182,212,0.5)" fontSize="8" fontWeight="bold">DNS</text>
          <text x="120" y="44" textAnchor="middle" fill="rgba(8,145,178,0.5)" fontSize="8" fontWeight="bold">APP_01</text>
          <text x="120" y="94" textAnchor="middle" fill="rgba(13,148,136,0.5)" fontSize="8" fontWeight="bold">APP_02</text>
          <text x="210" y="72" textAnchor="middle" fill="rgba(16,185,129,0.5)" fontSize="8" fontWeight="bold">DB_SQL</text>
        </svg>
      </div>

      {/* Database Metrics Indicator */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-2 mt-2 text-[10px] sm:text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold">DB LOAD</span>
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000"
              style={{ width: `${dbLoad}%` }}
            />
          </div>
        </div>
        <span className="text-[10px] text-slate-500 font-semibold">{dbLoad}% NOMINAL</span>
      </div>
    </div>
  );
}
