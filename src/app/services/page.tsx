'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import PageHero from '@/components/shared/PageHero';
import PageCTA from '@/components/shared/PageCTA';
import SpatialServicePreview from '@/components/shared/SpatialServicePreview';

function ServiceRowCard({
  service,
  index,
  isInView,
}: {
  service: (typeof servicesData)[0];
  index: number;
  isInView: boolean;
}) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Moderate tilt for the large combined card
    setRotateX((y - 0.5) * -6);
    setRotateY((x - 0.5) * 6);
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1500 }}
    >
      <Link href={`/services/${service.slug}`} className="block">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          animate={{ rotateX, rotateY }}
          transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-500 p-6 md:p-8 lg:p-10 group"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Spotlight background overlay */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(6, 182, 212, 0.02), transparent 80%)`,
              }}
            />
          )}

          {/* Light Sweep Effect */}
          <div className="absolute top-0 left-[-100%] w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[35deg] opacity-0 group-hover:opacity-100 group-hover:left-[200%] transition-all duration-1000 pointer-events-none z-0" />

          {/* Ambient color gradient orb */}
          <div
            className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-0"
            style={{ backgroundColor: service.color }}
          />

          {/* Bento grid inside the card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 items-center">
            
            {/* Left Column: All Service Content Data (Always Visible) */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full" style={{ transform: 'translateZ(30px)' }}>
              <div>
                {/* Icon & Category */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-200 bg-slate-50 group-hover:scale-105 group-hover:border-slate-300 transition-all duration-500"
                    style={{
                      transform: 'translateZ(40px)',
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] bg-slate-100 px-3.5 py-1.5 rounded-full text-slate-600 font-bold">
                    {service.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight group-hover:text-cyan-600 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base mb-6">
                  {service.fullDescription || service.shortDescription}
                </p>

                {/* Subservices list */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.subservices.map((sub) => (
                    <span
                      key={sub}
                      className="px-3 py-1.5 text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-650 rounded-xl shadow-sm uppercase tracking-wider"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-full font-bold text-xs hover:bg-cyan-700 transition-all w-fit shadow-sm">
                <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: service.color }} />
                Explore Service <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Right Column: 3D Spatial Unfolding Frame (Interactive Graphic) */}
            <div className="lg:col-span-6 relative min-h-[320px] md:min-h-[380px] bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden group-hover:border-slate-300 transition-colors">
              {/* Fake Frame Top bar */}
              <div className="h-8 w-full bg-slate-100/80 border-b border-slate-200 flex items-center px-4 justify-between absolute top-0 left-0 right-0 z-20">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400/70" />
                </div>
                <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-cyan-600" />
                  Interactive Engine
                </span>
              </div>

              {/* Unfolding layers */}
              <SpatialServicePreview service={service} />
            </div>

          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

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
        orbColor="#06b6d4"
        orbColor2="#10b981"
      />

      {/* Services Grid */}
      <section className="relative py-8 md:py-16 overflow-hidden" ref={ref}>


        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col gap-12">
            {servicesData.map((service, i) => (
              <ServiceRowCard key={service.slug} service={service} index={i} isInView={isInView} />
            ))}
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
