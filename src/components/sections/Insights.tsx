'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTag from '@/components/shared/SectionTag';
import { ArrowRight, Clock } from 'lucide-react';

const articles = [
  { category: 'Branding', readTime: '5 min read', title: 'The complete guide to building a brand that scales in 2025', description: 'From positioning to visual identity, we break down the exact framework we use to build brands that grow from zero to millions.', link: '#' },
  { category: 'Technology', readTime: '7 min read', title: 'How AI is transforming content marketing — and what it means for your brand', description: 'AI tools are changing the game. Here is how to leverage them for content creation, audience targeting, and campaign optimization.', link: '#' },
  { category: 'Growth', readTime: '4 min read', title: '5 growth strategies we used to help a startup reach $1M in revenue', description: 'Real strategies, real results. We share the exact playbook we used to help one of our clients scale from zero to seven figures.', link: '#' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Insights() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-anchor bg-transparent py-16 md:py-24" id="insights">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <SectionTag text="INSIGHTS & RESOURCES" variant="dark" />
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-2xl md:text-4xl font-bold text-foreground mt-6 leading-tight">
              Your pocket-sized library of tips, tricks, and <span className="text-indigo-500 bg-transparent font-serif italic font-medium">&apos;why didn&apos;t I think of that?&apos;</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }} transition={{ delay: 0.3, duration: 0.7 }}>
            <a href="#" className="inline-flex items-center gap-2 text-foreground hover:text-indigo-500 transition-colors group text-lg font-medium">
              Read all articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.a key={article.title} href={article.link} custom={i} variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="group flex flex-col h-full glass-card rounded-3xl p-6 border border-foreground/10 hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/10 group-hover:to-transparent transition-colors duration-500 pointer-events-none" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <span className="bg-foreground/10 text-foreground px-3 py-1 rounded-full text-xs font-mono tracking-wide">{article.category}</span>
                <span className="flex items-center gap-1.5 text-foreground/40 text-xs font-mono"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-indigo-500 transition-colors leading-snug relative z-10">{article.title}</h3>
              <p className="text-foreground/80 leading-relaxed mt-auto relative z-10">{article.description}</p>
              <div className="mt-8 flex items-center gap-2 text-foreground/50 group-hover:text-indigo-500 transition-colors relative z-10 font-medium">
                <span className="text-sm">Read more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
