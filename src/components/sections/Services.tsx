'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Code2, BrainCircuit, TrendingUp, Server, ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Globe,
    number: '01',
    category: 'Engineering',
    slug: 'web-development',
    title: 'Website & Web Apps',
    description:
      'Build fast, scalable, and custom web applications that solve your precise business bottlenecks. We deliver clean, maintainable code engineered for high performance.',
    subservices: ['Custom Web Applications', 'API Integration', 'Legacy System Modernization', 'E-Commerce & Portals'],
    color: '#4f46e5', // indigo-600
  },
  {
    icon: BrainCircuit,
    number: '02',
    category: 'Intelligence',
    slug: 'ai-automation',
    title: 'AI & Automation',
    description:
      'Replace manual data entry and repetitive workflows with intelligent AI agents. We build custom software solutions that operate 24/7 without fatiguing.',
    subservices: ['Workflow Automation', 'Custom AI Agents', 'Data Processing Pipelines', 'Automated Support'],
    color: '#7c3aed', // violet-600
  },
  {
    icon: TrendingUp,
    number: '03',
    category: 'Infrastructure',
    slug: 'system-architecture',
    title: 'System Architecture',
    description:
      'Robust system design ensuring zero downtime and infinite scalability. We design and deploy robust architectures that can handle millions of requests.',
    subservices: ['Scalable Databases', 'Microservices', 'API Development', 'Load Balancing'],
    color: '#6366f1', // indigo-500
  },
  {
    icon: Server,
    number: '04',
    category: 'DevOps',
    slug: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    description:
      'Secure, managed cloud deployments optimized for cost and speed. Keep your custom infrastructure secure and running smoothly with zero downtime.',
    subservices: ['Managed Hosting', 'CI/CD Pipelines', 'Security & Compliance', 'Edge Networks'],
    color: '#818cf8', // indigo-400
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let index = Math.floor(latest * 4);
    if (index >= 4) index = 3;
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const activeService = services[activeIndex];

  return (
    <section id="services" ref={containerRef} className="section-anchor relative h-[360vh] md:h-[400vh] bg-transparent">
      {/* Sticky visible area */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center pt-16 pb-8 md:pt-20 md:pb-10">
        
        {/* Background ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="noise-overlay absolute inset-0 opacity-30" />
          <motion.div 
            animate={{ 
              background: `radial-gradient(circle at 50% 50%, ${activeService.color}15 0%, transparent 50%)`
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center">
          
          {/* Header Area */}
          <div className="text-center max-w-3xl mx-auto px-4 mb-12 md:mb-16 w-full">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl border backdrop-blur-[100px] bg-gradient-to-r from-white/8 via-white/4 to-white/2 border-indigo-300/40 hover:border-white/35 shadow-[inset_0_2px_2px_rgba(255,255,255,0.3),0_8px_24px_rgba(31,38,135,0.1)] mb-6 group">
              <span className="w-4 h-4 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-md group-hover:scale-110 transition-transform" />
              <span className="text-sm md:text-base font-mono uppercase tracking-[0.2em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
                OUR SERVICES
              </span>
              <span className="h-1 w-12 md:w-16 rounded-full bg-gradient-to-r from-indigo-400/60 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] drop-shadow-sm mb-4 leading-tight tracking-tight">
              Services that drive growth.
            </h2>
            <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-4 font-medium hidden md:block">
              No running around for different experts. We handle it all. From custom software to AI automation, we build the systems that scale your business.
            </p>
          </div>

          {/* Cards Area */}
          <div className="w-full relative h-[380px] sm:h-[420px] md:h-[420px] lg:h-[450px] mb-4 md:mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 w-full glass-surface-strong rounded-[1.5rem] md:rounded-[2rem] flex flex-col overflow-hidden"
              >
                {/* Decorative ambient color blur inside card */}
                <div 
                  className="absolute -top-32 -left-32 w-64 h-64 rounded-full blur-[90px] opacity-30 pointer-events-none" 
                  style={{ backgroundColor: activeService.color }} 
                />
                
                {/* Browser Top Bar */}
                <div className="w-full flex items-center gap-2 px-6 py-3 md:py-4 glass-surface border-b border-indigo-300/40 border-x-0 border-t-0">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <div className="text-[10px] sm:text-[10px] font-mono text-foreground/40 ml-4 truncate max-w-[50%]">cognisa.io/services/{activeService.slug}</div>
                </div>

                {/* Card Content Row */}
                <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-12 items-stretch p-4 md:p-10 lg:p-12 pb-6 md:pb-12 h-full flex-grow">
                  
                  {/* Left Content */}
                  <div className="w-full md:w-[50%] text-left relative z-10 flex flex-col justify-center h-full">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-br from-blue-600/[0.05] via-indigo-500/[0.02] to-transparent border border-indigo-300/30 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/60 mb-4 md:mb-6 w-fit shadow-sm">
                      {activeService.category}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
                      {activeService.title}
                    </h3>
                    
                    <p className="text-sm md:text-base text-foreground/70 mb-6 leading-relaxed font-medium">
                      {activeService.description}
                    </p>
                    
                    <div className="mt-auto block">
                      <Link href={`/services/${activeService.slug}`} className="group inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-br from-blue-600/[0.05] via-indigo-500/[0.02] to-transparent hover:bg-gradient-to-br from-blue-600/[0.08] via-indigo-500/[0.04] to-transparent border border-indigo-300/30 rounded-[1.25rem] text-xs md:text-sm font-semibold transition-all text-foreground/80 hover:text-foreground">
                        Explore {activeService.title}
                        <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Graphic Area (Subservices List) */}
                  <div className="w-full md:w-[50%] h-[160px] md:h-full rounded-[1rem] md:rounded-[1.5rem] flex flex-col relative overflow-hidden p-4 md:p-8 bg-gradient-to-br from-blue-600/[0.06] via-indigo-500/[0.025] to-transparent border border-indigo-300/40 ring-1 ring-indigo-400/15 shadow-[0_10px_30px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(255,255,255,1)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full opacity-[0.95]">
                      <ul className="flex flex-col gap-4 md:gap-5 w-full h-full justify-between">
                        {activeService.subservices.map((sub, idx) => (
                          <li key={idx} className="flex items-center gap-4 py-2 border-b border-indigo-300/30 last:border-0 group">
                            <span className="text-xs md:text-sm font-mono font-bold w-6 opacity-50 group-hover:opacity-90 transition-opacity" style={{ color: activeService.color }}>
                              0{idx + 1}
                            </span>
                            <span className="text-sm md:text-base text-foreground/85 font-medium group-hover:text-foreground transition-colors">
                              {sub}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arched Pagination Overlay */}
          <div className="flex flex-col items-center justify-center relative w-full h-[140px] pointer-events-none mt-4">
            <div className="relative w-full h-full flex justify-center items-start">
              {services.map((service, i) => {
                const distance = Math.abs(activeIndex - i);
                const isActive = activeIndex === i;
                
                // Arch math: Creates an umbrella curve shape
                const xOffset = (i - activeIndex) * (typeof window !== 'undefined' && window.innerWidth < 640 ? 60 : 90); // horizontal separation
                const yOffset = distance * distance * (typeof window !== 'undefined' && window.innerWidth < 640 ? 10 : 15); // parabolic arch downward
                const scale = Math.max(0.4, 1 - distance * 0.25);
                const opacity = Math.max(0.1, 1 - distance * 0.6);
                const rotate = (i - activeIndex) * 15; // outward rotation
                
                return (
                  <motion.div
                    key={service.number}
                    className="absolute top-0 flex flex-col items-center"
                    animate={{
                      x: xOffset,
                      y: yOffset,
                      scale: isActive ? 1.2 : scale,
                      opacity: isActive ? 1 : opacity,
                      rotate: rotate,
                      zIndex: isActive ? 10 : 5 - distance
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                      <div 
                        className={`rounded-full flex items-center justify-center font-bold text-sm md:text-xl transition-colors duration-300 ${isActive ? 'w-16 h-16 md:w-20 md:h-20 bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white' : 'w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-600/[0.05] via-indigo-500/[0.02] to-transparent backdrop-blur-sm border border-indigo-300/30 text-foreground/60'}`}
                      >
                        {service.number}
                      </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="absolute bottom-2 text-foreground/30 text-[10px] md:text-xs font-mono tracking-[0.2em] font-bold uppercase">
              Service {activeIndex + 1} of 4
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
