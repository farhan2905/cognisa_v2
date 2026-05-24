'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import ContactForm from '@/components/shared/ContactForm';
import IridescentBlobBackground from '@/components/shared/fragments/IridescentBlobBackground';
import SectionTag from '@/components/shared/SectionTag';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@cognisa.in', href: 'mailto:hello@cognisa.in', color: '#06b6d4' },
  { icon: MapPin, label: 'Location', value: 'New York, NY', href: null, color: '#10b981' },
  { icon: Clock, label: 'Response window', value: 'Within 1 business day', href: null, color: '#0891b2' },
];

const goodFitSignals = [
  'A workflow is slowing your team down',
  'Your tools do not connect cleanly',
  'You need custom software with post-launch ownership',
];

const faqs = [
  { question: 'What happens after I submit?', answer: 'We review every inquiry within 24 hours. You\'ll receive a response with a preliminary assessment and next steps for a discovery call.' },
  { question: 'Do you offer free consultations?', answer: 'Yes. Our initial discovery call is completely free. We use it to understand your needs and determine if we\'re the right fit.' },
  { question: 'What is the typical project timeline?', answer: 'Most projects range from 4–12 weeks depending on complexity. We provide a detailed timeline during the proposal phase.' },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <IridescentBlobBackground size="xl" opacity={0.4} className="top-0 right-[-20%]" />
        <IridescentBlobBackground size="lg" opacity={0.25} className="bottom-0 left-[-10%]" />
        <PageHero
          tagText="GET IN TOUCH"
          title="Let's build something"
          titleAccent="exceptional."
          description="Every great project starts with a conversation. Tell us about your vision, and we'll map out a clear path forward."
          orbColor="#0891b2"
          orbColor2="#10b981"
        />
      </div>

      {/* ── Contact Form + Info ── */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form - 2/3 */}
            <div className="lg:col-span-2">
              <GlassContentBlock className="p-8 md:p-10 lg:p-12">
                <ContactForm />
              </GlassContentBlock>
            </div>

            {/* Info Cards - 1/3 */}
            <div className="flex flex-col gap-6">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 group hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="w-12 h-12 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${info.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: info.color }} />
                      </motion.div>
                      <div>
                        <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider mb-1">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm font-bold text-slate-700 hover:text-cyan-700 transition-colors inline-flex items-center gap-1 group/item"
                          >
                            {info.value}
                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <p className="text-sm font-bold text-slate-700">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_48px_rgba(15,23,42,0.14)]">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100/80">
                  Best fit
                </p>
                <div className="mt-5 space-y-3">
                  {goodFitSignals.map((signal) => (
                    <div key={signal} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <span className="text-sm font-bold leading-6 text-white/80">{signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12 flex flex-col items-center">
            <SectionTag text="FAQ" className="justify-center mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Quick answers to common questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <GlassContentBlock key={i} className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
              </GlassContentBlock>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
