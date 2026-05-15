'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home as HomeIcon, LayoutGrid, Cog, FolderOpen, Mail } from 'lucide-react';
import Logo from '@/components/shared/Logo';

const sidebarIcons = [
  { icon: HomeIcon, label: 'Home', id: 'hero', color: '238,130,238', shadow: 'from-[#6366f1] to-[#a855f7]' }, // Purple-ish
  { icon: Cog, label: 'Approach', id: 'solutions', color: '245,158,11', shadow: 'from-[#f59e0b] to-[#ef4444]' }, // Amber to Red
  { icon: LayoutGrid, label: 'Services', id: 'services', color: '16,185,129', shadow: 'from-[#10b981] to-[#3b82f6]' }, // Emerald to Blue
  { icon: FolderOpen, label: 'Work', id: 'work', color: '6,182,212', shadow: 'from-[#06b6d4] to-[#3b82f6]' }, // Cyan to Blue
  { icon: Mail, label: 'Contact', id: 'cta', color: '236,72,153', shadow: 'from-[#ec4899] to-[#8b5cf6]' }, // Pink to Purple
];

export default function SidebarNavigation() {
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // We only care about intersecting entries to update the active state
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -70% 0px', // Trigger when section is near top half of screen
      }
    );

    // Give it a tiny timeout to ensure DOM is ready
    setTimeout(() => {
      sidebarIcons.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setActiveId(id); // Optimistically update
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex fixed left-3 top-1/2 -translate-y-1/2 z-50 flex-col items-center py-7 px-4 bg-gradient-to-br from-blue-600/10 via-indigo-500/5 to-transparent backdrop-blur-2xl border border-indigo-300/40 ring-1 ring-indigo-400/15 shadow-[0_10px_30px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(255,255,255,0.2)] rounded-[2.5rem] h-auto gap-8"
      suppressHydrationWarning
    >
      {/* Logo Area */}
      <button 
        type="button"
        className="cursor-pointer group flex items-center justify-center h-28"
        onClick={() => handleClick('hero')}
        aria-label="Cognisa home"
      >
        <Logo variant="icon" className="h-14 w-14 md:h-18 md:w-18" />
      </button>

      {/* Navigation Icons */}
      <div className="flex flex-col gap-3 w-full items-center">
        {sidebarIcons.map(({ icon: Icon, label, id, color, shadow }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`relative flex items-center justify-center w-12 h-12 rounded-[1rem] transition-all duration-500 overflow-hidden ${
                isActive
                  ? `border border-white/20 shadow-[0_0_20px_rgba(${color},0.3)] scale-110 translate-x-1`
                  : 'text-foreground/40 bg-white/5 hover:text-foreground/80 hover:bg-white/10 border border-white/5'
              }`}
              title={label}
            >
              {isActive && (
                <div className={`absolute inset-0 bg-gradient-to-br ${shadow} opacity-20`} />
              )}
              <Icon 
                className="w-[21px] h-[21px] shrink-0 relative z-10 transition-colors duration-500" 
                strokeWidth={isActive ? 2.5 : 1.5} 
                style={isActive ? { color: `rgb(${color})` } : {}}
              />
            </button>
          );
        })}
      </div>

      {/* Bottom Logo */}
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-[0_4px_14px_rgba(99,102,241,0.4)] mt-2">
        C
      </div>
    </motion.aside>
  );
}
