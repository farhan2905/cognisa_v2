'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import EnterpriseButton from '@/components/shared/EnterpriseButton';
import Logo from '@/components/shared/Logo';

const footerLinks = {
  services: [
    { label: 'Website & Web Apps', href: '/services/web-development' },
    { label: 'AI & Automation', href: '/services/ai-automation' },
    { label: 'System Architecture', href: '/services/system-architecture' },
    { label: 'Cloud Infrastructure', href: '/services/cloud-infrastructure' },
    { label: 'All Services', href: '/services' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Work', href: '/work' },
    { label: 'Our Process', href: '/process' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
};

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-[0_14px_38px_rgba(15,23,42,0.12)] transition-all hover:border-cyan-200 hover:text-cyan-700"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function FooterLinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-slate-400">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="group inline-flex items-center gap-1 text-sm font-bold text-slate-600 transition-colors hover:text-cyan-700">
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <BackToTop />
      <footer className="bg-white/70 px-4 pb-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr] lg:p-12">
              <div>
                <Link href="/" className="inline-flex items-center">
                  <Logo className="h-9 w-auto md:h-10" />
                </Link>
                <p className="mt-5 max-w-sm text-sm font-semibold leading-7 text-slate-600">
                  Cognisa builds custom software, AI automation, cloud systems, and managed delivery layers for businesses that need cleaner operations.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <EnterpriseButton href="/contact" variant="primary" className="w-fit">
                    Start a project
                  </EnterpriseButton>
                  <EnterpriseButton href="mailto:hello@cognisa.in" variant="secondary" className="w-fit">
                    Email Cognisa
                  </EnterpriseButton>
                </div>
              </div>

              <FooterLinkList title="Services" links={footerLinks.services} />
              <FooterLinkList title="Company" links={footerLinks.company} />

              <div>
                <h4 className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-slate-400">Contact</h4>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@cognisa.in"
                    className="group flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all hover:border-cyan-200 hover:bg-cyan-50/60"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
                    <span>
                      <span className="block text-xs font-black uppercase tracking-[0.14em] text-slate-400">Email</span>
                      <span className="mt-1 block text-sm font-black text-slate-800 group-hover:text-cyan-700">hello@cognisa.in</span>
                    </span>
                  </a>
                  <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span>
                      <span className="block text-xs font-black uppercase tracking-[0.14em] text-slate-400">Location</span>
                      <span className="mt-1 block text-sm font-black text-slate-800">New York, NY</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 px-6 py-5 sm:px-8 lg:px-12">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p className="text-xs font-semibold text-slate-500">&copy; {new Date().getFullYear()} Cognisa. All rights reserved.</p>
                <div className="flex items-center gap-5">
                  <Link href="/privacy" className="text-xs font-bold text-slate-500 transition-colors hover:text-slate-800">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-xs font-bold text-slate-500 transition-colors hover:text-slate-800">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
