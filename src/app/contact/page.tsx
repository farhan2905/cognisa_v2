'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import GlassContentBlock from '@/components/shared/GlassContentBlock';
import ContactForm from '@/components/shared/ContactForm';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@cognisa.in', href: 'mailto:hello@cognisa.in', color: '#6366f1' },
  { icon: Phone, label: 'Phone', value: '+1 (234) 567-890', href: 'tel:+1234567890', color: '#8b5cf6' },
  { icon: MapPin, label: 'Location', value: 'New York, NY', href: null, color: '#3b82f6' },
  { icon: Clock, label: 'Working Hours', value: 'Mon — Fri, 9am — 6pm IST', href: null, color: '#06b6d4' },
];

const faqs = [
  { question: 'What happens after I submit?', answer: 'We review every inquiry within 24 hours. You\'ll receive a response with a preliminary assessment and next steps for a discovery call.' },
  { question: 'Do you offer free consultations?', answer: 'Yes. Our initial discovery call is completely free. We use it to understand your needs and determine if we\'re the right fit.' },
  { question: 'What is the typical project timeline?', answer: 'Most projects range from 4–12 weeks depending on complexity. We provide a detailed timeline during the proposal phase.' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <PageHero
        tagText="CONTACT US"
        title="Let's Start a"
        titleAccent="Conversation."
        description="Whether you have a clear project in mind or just want to explore possibilities, we're here to help. Tell us about your goals and we'll map out the best path forward."
        orbColor="#8b5cf6"
        orbColor2="#6366f1"
      />

      <section className="relative py-8 md:py-16 overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <GlassContentBlock>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
                  Send us a message
                </h2>
                <p className="text-foreground/60 mb-8 font-medium">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
                <ContactForm />
              </GlassContentBlock>
            </div>

            {/* Contact Info Cards */}
            <div className="flex flex-col gap-5">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <GlassContentBlock hoverEffect className="p-5 md:p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center border border-indigo-300/40 bg-gradient-to-br from-blue-600/[0.08] via-indigo-500/[0.04] to-transparent flex-shrink-0"
                          style={{ boxShadow: `0 4px 12px ${info.color}20` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: info.color }} />
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-1">
                            {info.label}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-foreground/80 font-semibold text-sm hover:text-indigo-500 transition-colors inline-flex items-center gap-1"
                            >
                              {info.value}
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          ) : (
                            <p className="text-foreground/80 font-semibold text-sm">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </GlassContentBlock>
                  </motion.div>
                );
              })}

              {/* Social Links */}
              <GlassContentBlock className="p-5 md:p-6">
                <p className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-4">Follow Us</p>
                <div className="flex items-center gap-3">
                  {['X', 'Li', 'Ig', 'Dr'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/50 text-xs font-bold hover:border-indigo-500/30 hover:text-indigo-500 hover:bg-indigo-500/5 transition-all duration-300"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </GlassContentBlock>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-12 md:py-20">
        <div className="w-full max-w-[900px] mx-auto px-4 md:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight text-center"
          >
            Common <span className="bg-indigo-500 text-white px-2 rounded-lg">Questions</span>
          </motion.h2>
          <div className="flex flex-col gap-5">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <GlassContentBlock className="p-6 md:p-8">
                  <h3 className="text-lg font-bold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-foreground/70 leading-relaxed font-medium">{faq.answer}</p>
                </GlassContentBlock>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
