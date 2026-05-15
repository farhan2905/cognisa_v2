'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home as HomeIcon, LayoutGrid, Cog, FolderOpen, Mail, Menu, X } from 'lucide-react';
import Logo from '@/components/shared/Logo';

const mobileIcons = [
  { icon: HomeIcon, label: 'Home', id: 'hero', color: '238,130,238', shadow: 'from-[#6366f1] to-[#a855f7]' },
  { icon: Cog, label: 'Approach', id: 'solutions', color: '245,158,11', shadow: 'from-[#f59e0b] to-[#ef4444]' },
  { icon: LayoutGrid, label: 'Services', id: 'services', color: '16,185,129', shadow: 'from-[#10b981] to-[#3b82f6]' },
  { icon: FolderOpen, label: 'Work', id: 'work', color: '6,182,212', shadow: 'from-[#06b6d4] to-[#3b82f6]' },
  { icon: Mail, label: 'Contact', id: 'cta', color: '236,72,153', shadow: 'from-[#ec4899] to-[#8b5cf6]' },
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -70% 0px',
      }
    );

    setTimeout(() => {
      mobileIcons.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setActiveId(id);
    setIsOpen(false);
    
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
    <div className="lg:hidden">
      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)] px-4 py-3"
      >
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          {/* Logo */}
          <button
            type="button"
            className="cursor-pointer flex items-center"
            onClick={() => handleClick('hero')}
            aria-label="Cognisa home"
          >
            <Logo className="h-7 md:h-8 w-auto" />
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-4 right-4 z-40 bg-white/15 backdrop-blur-3xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.2)] rounded-2xl p-4 space-y-2"
          >
            {mobileIcons.map(({ icon: Icon, label, id, color, shadow }) => {
              const isActive = activeId === id;
              return (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  className={`relative w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? `bg-white/15 border border-white/30 shadow-[0_0_15px_rgba(${color},0.25)]`
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {isActive && (
                    <div className={`absolute left-0 w-1 h-8 bg-gradient-to-b ${shadow} rounded-r`} />
                  )}
                  <Icon
                    className="w-5 h-5 shrink-0 transition-colors duration-300"
                    strokeWidth={isActive ? 2.5 : 1.5}
                    style={isActive ? { color: `rgb(${color})` } : {}}
                  />
                  <span className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-foreground/60'}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
