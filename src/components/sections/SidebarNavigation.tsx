'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home as HomeIcon, LayoutGrid, Cog, FolderOpen, Mail, Info } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import Link from 'next/link';

const sidebarItems = [
  { icon: HomeIcon, label: 'Home', id: 'hero', href: '/', color: '8,145,178', shadow: 'from-[#0891b2] to-[#22d3ee]' },
  { icon: Cog, label: 'Process', id: 'solutions', href: '/process', color: '15,118,110', shadow: 'from-[#0f766e] to-[#10b981]' },
  { icon: Info, label: 'About', id: 'about', href: '/about', color: '29,78,216', shadow: 'from-[#1d4ed8] to-[#06b6d4]' },
  { icon: LayoutGrid, label: 'Services', id: 'services', href: '/services', color: '16,185,129', shadow: 'from-[#10b981] to-[#06b6d4]' },
  { icon: FolderOpen, label: 'Work', id: 'work', href: '/work', color: '6,182,212', shadow: 'from-[#06b6d4] to-[#0891b2]' },
  { icon: Mail, label: 'Contact', id: 'cta', href: '/contact', color: '2,132,199', shadow: 'from-[#0284c7] to-[#14b8a6]' },
];

export default function SidebarNavigation() {
  const [activeId, setActiveId] = useState('hero');
  const pathname = usePathname();
  const router = useRouter();

  // Determine active item based on pathname
  useEffect(() => {
    if (pathname === '/') {
      // On homepage, use scroll-based detection
    } else if (pathname.startsWith('/services')) {
      setActiveId('services');
    } else if (pathname.startsWith('/work')) {
      setActiveId('work');
    } else if (pathname.startsWith('/about')) {
      setActiveId('about');
    } else if (pathname.startsWith('/contact')) {
      setActiveId('cta');
    } else if (pathname.startsWith('/process')) {
      setActiveId('solutions');
    } else if (pathname.startsWith('/insights')) {
      setActiveId('hero'); // no specific icon for insights
    }
  }, [pathname]);

  // Scroll-based section tracking on homepage only
  useEffect(() => {
    if (pathname !== '/') return;

    const homeSectionIds = ['hero', 'solutions', 'about', 'services', 'work', 'cta'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    setTimeout(() => {
      homeSectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, [pathname]);

  const handleClick = (item: typeof sidebarItems[0]) => {
    setActiveId(item.id);

    // If on homepage, scroll to section for home-based items
    if (pathname === '/' && item.href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Navigate to the page
    router.push(item.href);
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex fixed left-3 top-1/2 -translate-y-1/2 z-50 flex-col items-center py-7 px-4 bg-white/72 backdrop-blur-2xl border border-cyan-200/50 ring-1 ring-white/70 shadow-[0_18px_44px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.72)] rounded-[2.5rem] h-auto gap-8"
      suppressHydrationWarning
    >
      {/* Logo Area */}
      <Link
        href="/"
        className="cursor-pointer group flex items-center justify-center h-28"
        aria-label="Cognisa home"
      >
        <Logo variant="icon" className="h-[4.2rem] w-[4.2rem] md:h-[5.4rem] md:w-[5.4rem]" />
      </Link>

      {/* Navigation Icons */}
      <div className="flex flex-col gap-3 w-full items-center">
        {sidebarItems.map(({ icon: Icon, label, id, color, shadow, href }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => handleClick({ icon: Icon, label, id, color, shadow, href })}
              className={`relative flex items-center justify-center w-12 h-12 rounded-[1rem] transition-all duration-500 overflow-hidden ${
                isActive
                  ? `border border-white/20 shadow-[0_0_20px_rgba(${color},0.3)] scale-110 translate-x-1`
                  : 'text-slate-500 bg-white/40 hover:text-slate-950 hover:bg-white/80 border border-white/50'
              }`}
              title={label}
            >
              {isActive && (
                <div className={`absolute inset-0 bg-gradient-to-br ${shadow} opacity-20`} />
              )}
              {isActive && (
                <span className="absolute -right-1 top-1/2 h-7 w-1 -translate-y-1/2 rounded-full bg-cyan-500 shadow-[0_0_18px_rgba(6,182,212,0.7)]" />
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
    </motion.aside>
  );
}
