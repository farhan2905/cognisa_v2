'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Logo from '@/components/shared/Logo';

const footerLinks = {
  services: [
    { label: 'Digital Marketing', href: '#' },
    { label: 'Growth Strategy', href: '#' },
    { label: 'Web Development', href: '#' },
    { label: 'AI Solutions', href: '#' },
    { label: 'Brand Identity', href: '#' },
    { label: 'IT Services', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Work', href: '#stats' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#cta' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-foreground/10">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-indigo-300/50 ring-1 ring-indigo-400/20 shadow-[0_8px_32px_rgba(31,38,135,0.08),inset_0_1px_0_rgba(255,255,255,0.35)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="lg:col-span-1">
              <a href="/" className="inline-flex items-center">
                <Logo className="h-9 md:h-10 w-auto" />
              </a>
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
                  <li key={link.label}><a href={link.href} className="text-foreground/40 text-sm hover:text-foreground/70 transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} onClick={(e) => { if (link.href.startsWith('#') && link.href !== '#') { e.preventDefault(); const el = document.querySelector(link.href); if (el) el.scrollIntoView({ behavior: 'smooth' }); } }} className="text-foreground/40 text-sm hover:text-foreground/70 transition-colors">{link.label}</a>
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
          <div className="bg-white/15 backdrop-blur-2xl rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-indigo-300/50 ring-1 ring-indigo-400/20 shadow-[0_8px_32px_rgba(31,38,135,0.08),inset_0_1px_0_rgba(255,255,255,0.35)]">
            <p className="text-foreground/30 text-xs">&copy; {new Date().getFullYear()} Cognisa. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-foreground/30 text-xs hover:text-foreground/50 transition-colors">Privacy Policy</a>
              <a href="#" className="text-foreground/30 text-xs hover:text-foreground/50 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
