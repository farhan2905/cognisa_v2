'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'AI capabilities', href: '/capabilities', id: 'capabilities' },
  { label: 'Services', href: '/services', id: 'services' },
  { label: 'Work', href: '/work', id: 'work' },
  { label: 'Process', href: '/process', id: 'process' },
  { label: 'Insights', href: '/insights', id: 'insights' },
  { label: 'About us', href: '/about', id: 'about' },
];

function getPathActiveId(pathname: string) {
  if (pathname.startsWith('/capabilities')) return 'capabilities';
  if (pathname.startsWith('/services')) return 'services';
  if (pathname.startsWith('/work')) return 'work';
  if (pathname.startsWith('/process')) return 'process';
  if (pathname.startsWith('/insights')) return 'insights';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'hero';
}

export default function FloatingTopNav() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(getPathActiveId(pathname));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [afterDelay, setAfterDelay] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Track scroll position and scrolled state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timer for initial delay (1 second after page loads)
  useEffect(() => {
    const timer = setTimeout(() => {
      setAfterDelay(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') {
      setActiveId(getPathActiveId(pathname));
      return;
    }

    const ids = ['hero', 'capabilities', 'services', 'work', 'insights', 'cta'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-24% 0px -68% 0px', threshold: [0.08, 0.2, 0.4] }
    );

    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isHomepage = pathname === '/';
  
  // On homepage, minimize only when scrolled past the hero (second section reached)
  const hasReachedMinimizeZone = isHomepage 
    ? (scrollY > 450)
    : (scrolled || afterDelay);

  const isMinimized = hasReachedMinimizeZone && !isInteracting && !mobileOpen;

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed left-4 right-4 top-4 z-50 lg:left-6 lg:right-6',
          scrolled && 'top-3'
        )}
        aria-label="Primary navigation"
      >
        <div
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
          className={cn(
            'mx-auto flex max-w-[1500px] items-center justify-between rounded-[1.4rem] border px-4 py-3 transition-all duration-300',
            isMinimized
              ? 'border-slate-200/[0.06] bg-white/[0.02] shadow-none backdrop-blur-[2px]'
              : scrolled
                ? 'border-slate-200/90 bg-white/92 shadow-[0_18px_54px_rgba(15,23,42,0.12)] backdrop-blur-2xl'
                : 'border-slate-200/60 bg-white/80 shadow-[0_12px_36px_rgba(15,23,42,0.06)] backdrop-blur-xl'
          )}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3" aria-label="Cognisa home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-100 bg-white shadow-sm">
              <Logo className="h-6 w-auto" />
            </span>
            <span className="text-sm md:text-base font-black tracking-tight text-black select-none">Cognisa</span>
          </Link>

          {/* Desktop navigation pills */}
          <div className="hidden lg:flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1">
            {navItems.map((item) => {
              const active = activeId === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'group relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-xs font-black transition-colors',
                    active ? 'text-slate-950' : 'text-slate-500 hover:text-slate-950'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="floatingTopNavActive"
                      className="absolute inset-0 rounded-full border border-slate-200 bg-white shadow-sm"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  {item.id === 'services' && (
                    <ChevronDown className="relative z-10 h-3.5 w-3.5 opacity-55" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex group items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-xs font-black text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-cyan-700"
          >
            Get in touch
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ─── Mobile drawer overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[55] bg-slate-950/20 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-4 right-4 top-[5.2rem] z-[56] rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_24px_64px_rgba(15,23,42,0.14)] backdrop-blur-2xl lg:hidden"
            >
              <nav className="flex flex-col gap-1">
                {[
                  { label: 'Home', href: '/', id: 'hero' },
                  ...navItems,
                  { label: 'Contact', href: '/contact', id: 'contact' },
                ].map((item, index) => {
                  const active = activeId === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all',
                          active
                            ? 'bg-slate-950 text-white shadow-sm'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                        )}
                      >
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                        )}
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-md transition hover:bg-cyan-700"
                >
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
