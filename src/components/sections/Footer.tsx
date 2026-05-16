'use client';

import { ArrowUpRight } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import Link from 'next/link';

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

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-foreground/10">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-[4.6rem] md:py-[5.75rem]">
        <div className="bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent backdrop-blur-2xl rounded-3xl p-6 md:p-[3.45rem] border border-indigo-300/40 ring-1 ring-indigo-400/15 shadow-[0_10px_30px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(255,255,255,1)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="lg:col-span-1">
              <Link href="/" className="inline-flex items-center">
                <Logo className="h-9 md:h-10 w-auto" />
              </Link>
              <p className="text-foreground/40 text-sm leading-relaxed mt-4 max-w-xs">
                We build digital experiences that drive growth. Strategy, design, development, and marketing — all under one roof.
              </p>
              <div className="flex items-center gap-4 mt-6">
                {['X', 'Li', 'Ig', 'Dr'].map((social) => (
                  <a key={social} href="#" className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/50 text-xs font-bold hover:border-indigo-500/30 hover:text-indigo-500 transition-all duration-300">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-foreground/40 text-sm hover:text-foreground/70 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-foreground/40 text-sm hover:text-foreground/70 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-6">Contact</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-foreground/30 text-xs font-mono uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:hello@cognisa.in" className="text-foreground/60 text-sm hover:text-indigo-500 transition-colors inline-flex items-center gap-1">hello@cognisa.in<ArrowUpRight className="w-3 h-3" /></a>
                </div>
                <div>
                  <p className="text-foreground/30 text-xs font-mono uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:+1234567890" className="text-foreground/60 text-sm hover:text-indigo-500 transition-colors">+1 (234) 567-890</a>
                </div>
                <div>
                  <p className="text-foreground/30 text-xs font-mono uppercase tracking-wider mb-1">Location</p>
                  <p className="text-foreground/60 text-sm">New York, NY</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-foreground/10">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-6">
          <div className="bg-gradient-to-br from-blue-600/[0.08] via-indigo-500/[0.04] to-transparent backdrop-blur-2xl rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-indigo-300/40 ring-1 ring-indigo-400/15 shadow-[0_8px_32px_rgba(31,38,135,0.08),inset_0_1px_0_rgba(255,255,255,0.35)]">
            <p className="text-foreground/30 text-xs">&copy; {new Date().getFullYear()} Cognisa. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-foreground/30 text-xs hover:text-foreground/50 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-foreground/30 text-xs hover:text-foreground/50 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
