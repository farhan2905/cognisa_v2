'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="section-anchor relative bg-transparent py-16 md:py-24 overflow-hidden">
      <div className="noise-overlay absolute inset-0 z-[1]" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-200 rounded-full blur-[150px] opacity-[0.10] animate-orb-1" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-violet-200 rounded-full blur-[150px] opacity-[0.08] animate-orb-2" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl border backdrop-blur-[100px] bg-gradient-to-r from-white/8 via-white/4 to-white/2 border-white/20 hover:border-white/35 shadow-[inset_0_2px_2px_rgba(255,255,255,0.3),0_8px_24px_rgba(31,38,135,0.1)] mb-8 group">
            <span className="w-4 h-4 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-md group-hover:scale-110 transition-transform" />
            <span className="text-sm md:text-base font-mono uppercase tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
              Let&apos;s Talk
            </span>
            <span className="h-1 w-12 md:w-16 rounded-full bg-gradient-to-r from-indigo-400/60 to-transparent" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight mb-6">
            Ready to Transform Your{' '}<span className="text-indigo-500">Digital Presence?</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Let&apos;s start a conversation about your goals. Our team is ready to craft a custom strategy that drives real, measurable results for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a href="#" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="group inline-flex items-center gap-2 bg-indigo-500 text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-indigo-600 transition-all duration-300 hover:gap-3 shadow-[0_4px_14px_rgba(99,102,241,0.35)]">
              Get a Free Consultation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <a href="#" className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-10 py-4 rounded-full text-base font-medium hover:bg-foreground/5 hover:border-foreground/30 transition-all duration-300">
              hello@cognisa.in
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
