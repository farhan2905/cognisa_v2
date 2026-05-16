'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import SectionTag from '@/components/shared/SectionTag';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const works = [
  { slug: 'desh-yatraa', number: '01', title: 'Desh Yatraa', description: 'We engineered a comprehensive travel booking and exploration portal for Desh Yatraa. The platform features an intuitive search architecture, seamless booking workflows, and an optimized mobile experience.', detail: 'Travel & Tourism Portal', icon: '✈️', color: '#6366f1', color2: '#a855f7', link: 'https://deshyatraa.com' },
  { slug: 'proxyui', number: '02', title: 'ProxyUI', description: 'A modern UI component showcase with reusable sections and patterns to help teams ship clean interfaces faster.', detail: 'UI Component Library', icon: '🧩', color: '#3b82f6', color2: '#06b6d4', link: 'https://proxyui.vercel.app' },
  { slug: 'voyage-horizon', number: '03', title: 'Voyage Horizon', description: 'Developed a modern digital storefront for Voyage Horizon to showcase their premium travel packages. We focused on high-performance media delivery, lead generation forms, and a custom CMS.', detail: 'Travel Agency Platform', icon: '🌊', color: '#f97316', color2: '#f43f5e', link: 'https://voyagehorizon.co.in' },
  { slug: 'kuch-nahi', number: '04', title: 'Kuch Nahi', description: 'Built a blazing-fast, custom e-commerce solution for Kuch Nahi. The architecture was designed from the ground up to minimize cart abandonment, featuring a hyper-optimized checkout flow and secure payment gateways.', detail: 'E-Commerce Experience', icon: '🛒', color: '#ec4899', color2: '#d946ef', link: 'https://kuchnahi.co.in' },
  { slug: 'bhairav-steel', number: '05', title: 'Bhairav Steel', description: 'Transformed Bhairav Steel\'s traditional business into a powerful digital catalog. We developed a robust B2B platform that handles complex product specifications and quote request automation.', detail: 'B2B Industrial Catalog', icon: '🏗️', color: '#10b981', color2: '#14b8a6', link: 'https://bhairavsteel.in' },
];

export default function Process() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.floor(latest * 5);
    if (index >= 5) index = 4;
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const activeColor1 = works[activeIndex].color;
  const activeColor2 = works[activeIndex].color2;
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

  return (
    <section id="work" ref={targetRef} className="section-anchor relative h-[340vh] md:h-[400vh] bg-transparent">
      
      <div className="sticky top-0 h-[100vh] flex flex-col justify-center overflow-hidden z-10">
        
        {/* Dynamic color-changing background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="noise-overlay absolute inset-0 opacity-30 z-[1]" />
          <motion.div 
            animate={{ backgroundColor: activeColor1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-[10%] left-[10%] -translate-x-1/4 -translate-y-1/4 w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] rounded-full blur-[140px] opacity-[0.22] pointer-events-none" 
          />
          <motion.div 
            animate={{ backgroundColor: activeColor2 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute bottom-[10%] right-[10%] translate-x-1/4 translate-y-1/4 w-[70vw] h-[70vw] md:w-[55vw] md:h-[55vw] rounded-full blur-[140px] opacity-[0.20] pointer-events-none" 
          />
        </div>
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 mb-8 mt-12 md:mt-6 lg:mt-10 flex-shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
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
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}>
            <Link 
              href="/work" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-600/[0.08] via-indigo-500/[0.04] to-transparent border border-indigo-300/40 rounded-full font-semibold text-foreground hover:from-blue-600/[0.15] hover:via-indigo-500/[0.08] transition-all shadow-[0_4px_12px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(255,255,255,1)] group"
            >
              View All Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
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
            <Link href={`/work/${work.slug}`} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full font-medium text-sm hover:scale-105 hover:bg-indigo-500 hover:text-white transition-all md:mt-6 shadow-sm">
              View Case Study <ArrowUpRight className="w-3 h-3" />
            </Link>
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
