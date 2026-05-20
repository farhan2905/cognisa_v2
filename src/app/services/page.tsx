'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import PageHero from '@/components/shared/PageHero';
import PageCTA from '@/components/shared/PageCTA';
import GlassContentBlock from '@/components/shared/GlassContentBlock';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ServicesListingPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <>
      <PageHero
        tagText="OUR SERVICES"
        title="End-to-end solutions from"
        titleAccent="software to AI."
        description="No running around for different experts. We handle it all — from custom software to AI automation, we build the systems that scale your business."
        orbColor="#6366f1"
        orbColor2="#8b5cf6"
      />

      {/* Services Grid */}
      <section className="relative py-8 md:py-16 overflow-hidden" ref={ref}>
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none animate-orb-1" />
        <div className="absolute bottom-1/4 right-[-10%] w-[400px] h-[400px] bg-violet-200/30 rounded-full blur-[120px] pointer-events-none animate-orb-2" />

        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesData.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="block h-full group hover:-translate-y-2 transition-transform duration-500"
                  >
                    <GlassContentBlock hoverEffect className="p-6 md:p-8 lg:p-10 h-full flex flex-col">
                      {/* Ambient orb */}
                      <div
                        className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[50px] opacity-15 pointer-events-none z-0"
                        style={{ backgroundColor: service.color }}
                      />

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center border border-indigo-300/40 bg-gradient-to-br from-blue-600/[0.08] via-indigo-500/[0.04] to-transparent backdrop-blur-xl group-hover:scale-110 transition-transform duration-500"
                            style={{ boxShadow: `0 4px 16px ${service.color}20` }}
                          >
                            <Icon className="w-7 h-7" style={{ color: service.color }} />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-widest bg-foreground/10 px-3 py-1 rounded-full text-foreground/60">
                            {service.category}
                          </span>
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight group-hover:text-indigo-500 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-foreground/70 leading-relaxed font-medium mb-6 flex-grow">
                          {service.shortDescription}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-medium bg-foreground/5 border border-foreground/10 rounded-lg text-foreground/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-foreground/50 group-hover:text-indigo-500 transition-colors font-semibold text-sm mt-auto">
                          <span>Explore Service</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </GlassContentBlock>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <PageCTA
        title="Need a custom"
        titleAccent="solution?"
        description="Tell us about your project and we'll recommend the right combination of services to achieve your goals."
      />
    </>
  );
}
