'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

const budgetOptions = [
  'Under $5,000',
  '$5,000 — $15,000',
  '$15,000 — $50,000',
  '$50,000+',
  'Not sure yet',
];

const serviceOptions = [
  'Website & Web Apps',
  'AI & Automation',
  'System Architecture',
  'Cloud Infrastructure',
  'Other',
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — integrate with API/Formspree
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Message Sent!</h3>
        <p className="text-foreground/60 max-w-md leading-relaxed">
          Thank you for reaching out. We&apos;ll review your message and get back to you within 24
          hours.
        </p>
      </motion.div>
    );
  }

  const inputClasses =
    'w-full px-5 py-3.5 rounded-xl bg-gradient-to-br from-cyan-600/[0.04] via-teal-500/[0.015] to-transparent border border-cyan-300/40 ring-1 ring-teal-400/10 text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-cyan-400/60 focus:ring-cyan-400/25 transition-all duration-300 backdrop-blur-sm text-sm font-medium';

  const labelClasses = 'block text-sm font-semibold text-foreground/70 mb-2';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Full Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email Address *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="john@company.com"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-company" className={labelClasses}>
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            placeholder="Acme Inc."
            value={formData.company}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-service" className={labelClasses}>
            Service Needed
          </label>
          <select
            id="contact-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-budget" className={labelClasses}>
          Estimated Budget
        </label>
        <select
          id="contact-budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">Select a range</option>
          {budgetOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          Project Details *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project, goals, and timeline..."
          value={formData.message}
          onChange={handleChange}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white text-base bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-600 shadow-[0_6px_30px_rgba(6,182,212,0.35)] hover:shadow-[0_10px_40px_rgba(6,182,212,0.45)] transition-shadow duration-500 overflow-hidden w-full sm:w-auto self-start"
      >
        {/* Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        <span className="relative z-10">Send Message</span>
        <Send className="relative z-10 w-[18px] h-[18px] transition-transform group-hover:translate-x-1" />
      </motion.button>
    </form>
  );
}
