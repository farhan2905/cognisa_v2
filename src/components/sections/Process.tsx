'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTag from '@/components/shared/SectionTag';
import { ArrowUpRight } from 'lucide-react';

const works = [
  { number: '01', title: 'Desh Yatraa', description: 'We engineered a comprehensive travel booking and exploration portal for Desh Yatraa. The platform features an intuitive search architecture, seamless booking workflows, and an optimized mobile experience.', detail: 'Travel & Tourism Portal', icon: '✈️', color: '#6366f1', link: 'https://deshyatraa.com' },
  { number: '02', title: 'ProxyUI', description: 'A modern UI component showcase with reusable sections and patterns to help teams ship clean interfaces faster.', detail: 'UI Component Library', icon: '🧩', color: '#60a5fa', link: 'https://proxyui.vercel.app' },
  { number: '03', title: 'Voyage Horizon', description: 'Developed a modern digital storefront for Voyage Horizon to showcase their premium travel packages. We focused on high-performance media delivery, lead generation forms, and a custom CMS.', detail: 'Travel Agency Platform', icon: '🌊', color: '#818cf8', link: 'https://voyagehorizon.co.in' },
  { number: '04', title: 'Kuch Nahi', description: 'Built a blazing-fast, custom e-commerce solution for Kuch Nahi. The architecture was designed from the ground up to minimize cart abandonment, featuring a hyper-optimized checkout flow and secure payment gateways.', detail: 'E-Commerce Experience', icon: '🛒', color: '#4f46e5', link: 'https://kuchnahi.co.in' },
  { number: '05', title: 'Bhairav Steel', description: 'Transformed Bhairav Steel\'s traditional business into a powerful digital catalog. We developed a robust B2B platform that handles complex product specifications and quote request automation.', detail: 'B2B Industrial Catalog', icon: '🏗️', color: '#7c3aed', link: 'https://bhairavsteel.in' },
];

export default function Process() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

  return (
    <section id="work" ref={targetRef} className="section-anchor relative h-[340vh] md:h-[400vh] bg-transparent">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="noise-overlay absolute inset-0 opacity-30 z-[1]" />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-indigo-200 rounded-full blur-[150px] opacity-[0.08] pointer-events-none" />
      </div>
      
      <div className="sticky top-0 h-[100vh] flex flex-col justify-center overflow-hidden z-10">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 mb-8 mt-12 md:mt-6 lg:mt-10 flex-shrink-0">
          <SectionTag text="OUR WORK" variant="dark" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 leading-tight tracking-tight drop-shadow-sm mt-4"
          >
            Digital <span className="text-gradient-accent drop-shadow-sm">systems</span> built for real businesses.
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex gap-6 md:gap-24 lg:gap-32 px-4 md:px-12 lg:px-20 w-fit pb-12 items-center">
          {works.map((work, idx) => (
            <WorkCard key={work.number} work={work} index={idx} total={works.length} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WorkCard({ work, index, total }: { work: typeof works[0], index: number, total: number }) {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div className="flex flex-col gap-4 md:gap-8 w-[85vw] md:w-[55vw] lg:w-[42vw] flex-shrink-0 relative group items-center">
      {/* Website Information Card (Above the browser) */}
      <div className="w-full relative overflow-hidden bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent backdrop-blur-2xl p-5 md:p-8 rounded-2xl md:rounded-3xl border border-indigo-300/40 ring-1 ring-indigo-400/15 shadow-[0_10px_30px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-500 hover:from-blue-600/[0.12] hover:via-indigo-500/[0.05] hover:border-indigo-300/60 hover:ring-indigo-400/30 hover:shadow-[0_16px_40px_rgba(59,130,246,0.20),inset_0_1px_0_rgba(255,255,255,1)]">
        {/* Decorative ambient color blur matching the project */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none" style={{ backgroundColor: work.color }} />
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/6 via-white/3 to-transparent opacity-70 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{work.icon}</span>
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest bg-foreground/10 px-3 py-1 rounded-full text-foreground/80">{work.detail}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">{work.title}</h3>
            <p className="text-sm md:text-base text-foreground/70 max-w-xl">{work.description}</p>
          </div>
          <div className="flex-shrink-0 flex items-center justify-between md:flex-col md:items-end md:justify-start">
            <span className="text-4xl md:text-5xl font-bold opacity-10">{work.number}</span>
            <a href={work.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full font-medium text-sm hover:scale-105 hover:bg-indigo-500 hover:text-white transition-all md:mt-6 shadow-sm">
              Visit Site <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Browser Window Card */}
      <div 
        className="w-full h-[35vh] sm:h-[42vh] md:h-[55vh] rounded-[1.5rem] md:rounded-[2rem] border border-indigo-300/40 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden bg-zinc-950"
        onMouseLeave={() => setIsInteractive(false)}
      >
        {/* Browser Header */}
        <div className="absolute top-0 left-0 right-0 h-10 glass-surface border-b border-indigo-300/40 border-x-0 border-t-0 flex items-center px-6 gap-2 z-30">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <div className="ml-4 flex-1 flex justify-center">
            <div className="bg-black/30 backdrop-blur-md px-4 py-1 rounded-md text-xs text-white/50 w-1/2 max-w-[200px] truncate text-center border border-white/5 shadow-inner">
              {work.link.replace('https://', '')}
            </div>
          </div>
        </div>

        {/* Browser Body / Iframe */}
        <div className="w-full h-full pt-10 relative z-10 bg-background/50">
          <iframe src={work.link} className="w-full h-full border-none scale-[1.01]" sandbox="allow-scripts allow-same-origin" title={work.title} />
          
          <div 
            className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-300 ${isInteractive ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-background/20 cursor-pointer pointer-events-auto backdrop-blur-[2px]'}`} 
            onClick={() => setIsInteractive(true)}
          >
            {!isInteractive && (
              <span className="px-6 py-3 glass-surface text-white shadow-2xl text-sm font-medium rounded-full flex items-center gap-2 transform transition-transform hover:scale-105">
                Tap to interact
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
